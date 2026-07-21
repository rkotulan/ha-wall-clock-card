import {ReactiveControllerHost} from 'lit';
import {HomeAssistant} from 'custom-card-helpers';
import {BaseController} from '../../utils/controllers';
import {BottomBarRequestUpdateMessage, Messenger} from '../../utils';
import {
    CalendarEventItem,
    CalendarSourceConfig,
    CalendarWidgetSettings,
    HaCalendarEvent,
} from '../../widgets/calendar/calendar-types';
import {calendarRequestWindow, normalizeCalendarEvent} from '../../widgets/calendar/calendar-data';

export interface CalendarControllerConfig extends CalendarWidgetSettings {
    timeZone?: string;
}

interface CalendarFetchResult {
    source: CalendarSourceConfig;
    events?: HaCalendarEvent[];
    error?: unknown;
}

export class CalendarController extends BaseController {
    private config: CalendarControllerConfig = {};
    private hass?: HomeAssistant;
    private intervalId?: number;
    private connected = false;
    private configSignature = '';
    private requestSequence = 0;

    private _events: CalendarEventItem[] = [];
    private _loading = false;
    private _error?: string;

    constructor(host: ReactiveControllerHost) {
        super(host, 'calendar-controller');
    }

    get events(): CalendarEventItem[] {
        return this._events;
    }

    get loading(): boolean {
        return this._loading;
    }

    get error(): string | undefined {
        return this._error;
    }

    protected onHostConnected(): void {
        this.connected = true;
        this.setupInterval();
        void this.fetchEvents();
    }

    protected onHostDisconnected(): void {
        this.connected = false;
        this.requestSequence += 1;
        this.clearInterval();
    }

    updateConfig(config: CalendarControllerConfig, hass?: HomeAssistant): void {
        const hassBecameAvailable = !this.hass && Boolean(hass);
        this.hass = hass;
        this.config = config;
        const signature = JSON.stringify({
            entities: config.entities ?? [],
            daysAhead: config.daysAhead ?? 7,
            updateInterval: config.updateInterval ?? 300,
            timeZone: config.timeZone,
        });
        if (signature === this.configSignature && !hassBecameAvailable) return;

        if (signature !== this.configSignature) {
            this.configSignature = signature;
            this.setupInterval();
        }
        if (this.connected) void this.fetchEvents();
    }

    async refresh(): Promise<void> {
        await this.fetchEvents();
    }

    private setupInterval(): void {
        this.clearInterval();
        if (!this.connected) return;
        const seconds = Math.max(60, Number(this.config.updateInterval) || 300);
        this.intervalId = window.setInterval(() => void this.fetchEvents(), seconds * 1000);
    }

    private clearInterval(): void {
        if (this.intervalId !== undefined) {
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    private async fetchEvents(): Promise<void> {
        const hass = this.hass;
        const sources = (this.config.entities ?? [])
            .filter(source => Boolean(source.entity))
            .map(source => ({
                ...source,
                label: source.label?.trim()
                    || String(hass?.states[source.entity]?.attributes.friendly_name ?? source.entity),
            }));
        if (!hass || sources.length === 0) {
            this._events = [];
            this._loading = false;
            this._error = undefined;
            this.host.requestUpdate();
            Messenger.getInstance().publish(new BottomBarRequestUpdateMessage());
            return;
        }

        const sequence = ++this.requestSequence;
        this._loading = true;
        this._error = undefined;
        this.host.requestUpdate();
        Messenger.getInstance().publish(new BottomBarRequestUpdateMessage());

        const windowRange = calendarRequestWindow(new Date(), this.config.daysAhead ?? 7);
        const query = `start=${encodeURIComponent(windowRange.start)}&end=${encodeURIComponent(windowRange.end)}`;
        const results = await Promise.all(sources.map(async (source): Promise<CalendarFetchResult> => {
            try {
                const events = await hass.callApi<HaCalendarEvent[]>(
                    'GET',
                    `calendars/${encodeURIComponent(source.entity)}?${query}`,
                );
                return {source, events};
            } catch (error) {
                return {source, error};
            }
        }));

        if (sequence !== this.requestSequence || !this.connected) return;

        const successful = results.filter(result => result.events !== undefined);
        if (successful.length > 0) {
            this._events = successful.flatMap(result => (result.events ?? [])
                .map(event => normalizeCalendarEvent(event, result.source, this.config.timeZone))
                .filter((event): event is CalendarEventItem => event !== undefined));
        }

        const failed = results.filter(result => result.error !== undefined);
        this._error = failed.length > 0
            ? `${failed.length} of ${results.length} calendars could not be loaded.`
            : undefined;
        this._loading = false;
        this.host.requestUpdate();
        Messenger.getInstance().publish(new BottomBarRequestUpdateMessage());
    }
}

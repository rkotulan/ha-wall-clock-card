import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {CalendarController} from './calendar-controller';
import './calendar-event-dialog';
import {buildCalendarAgenda, addDaysToKey, dayKey} from '../../widgets/calendar/calendar-data';
import {localize} from '../../utils/localize';
import {
    CalendarAgenda,
    CalendarEventItem,
    CalendarWidgetSettings,
} from '../../widgets/calendar/calendar-types';

@customElement('wcc-calendar-agenda')
export class CalendarComponent extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config: CalendarWidgetSettings = {};
    @property({type: String}) fontColor = '#fff';
    @property({type: String}) language = 'en';
    @property({type: String}) timeZone?: string;
    @property({type: Boolean}) hour12 = false;

    @state() private selectedEvent?: CalendarEventItem;

    private controller = new CalendarController(this);

    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            color: var(--wcc-calendar-color, #fff);
        }

        .agenda {
            display: grid;
            grid-template-columns: 50px fit-content(30rem);
            column-gap: 6px;
            row-gap: 14px;
            width: 100%;
            min-width: 0;
            padding: 14px 0;
            box-sizing: border-box;
        }

        .day-group {
            display: contents;
        }

        .day-date {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: start;
            width: 100%;
            padding-top: 3px;
            color: currentColor;
            font-size: var(--wcc-calendar-date-size, 1em);
            line-height: 1;
            text-align: center;
            text-transform: uppercase;
        }

        .day-weekday {
            font-size: 0.78em;
            font-weight: 700;
            opacity: 0.86;
        }

        .day-number {
            margin: 2px 0 1px;
            font-size: 2em;
            font-weight: 450;
            letter-spacing: -0.04em;
        }

        .day-month {
            font-size: 0.69em;
            font-weight: 700;
            letter-spacing: 0.04em;
            opacity: 0.78;
        }

        .events {
            display: flex;
            flex-direction: column;
            gap: 7px;
            width: 100%;
            min-width: 0;
            max-width: 100%;
        }

        .event {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            padding: 8px 10px 8px 12px;
            border: 0;
            border-left: 3px solid var(--event-color);
            border-radius: 0 8px 8px 0;
            box-sizing: border-box;
            background: color-mix(
                in srgb,
                var(--wcc-calendar-event-background, var(--card-background-color, #202020))
                var(--wcc-calendar-event-opacity, 76%),
                transparent
            );
            color: inherit;
            font: inherit;
            text-align: left;
            cursor: pointer;
            overflow: hidden;
        }

        .event-body {
            display: block;
            min-width: 0;
            max-width: 100%;
            overflow: hidden;
        }

        .event-summary {
            display: block;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            color: var(--event-color);
            font-size: var(--wcc-calendar-title-size, 1em);
            font-weight: 650;
            line-height: 1.35;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .event-detail,
        .event-description {
            display: flex;
            align-items: center;
            gap: 5px;
            min-width: 0;
            margin-top: 3px;
            color: var(--wcc-calendar-color, #fff);
            font-size: var(--wcc-calendar-detail-size, 0.82em);
            font-weight: 400;
            line-height: 1.35;
            opacity: 0.76;
        }

        .event-detail ha-icon {
            --mdc-icon-size: 15px;
            flex: 0 0 auto;
        }

        .event-detail-text {
            display: block;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .event-description {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        .status {
            grid-column: 1 / -1;
            padding: 10px 12px;
            border: 1px solid color-mix(in srgb, currentColor 22%, transparent);
            border-radius: 7px;
            background: color-mix(in srgb, var(--card-background-color, #111) 65%, transparent);
            color: currentColor;
            font-size: 0.82em;
            opacity: 0.78;
        }

        .error {
            border-color: color-mix(in srgb, var(--error-color, #db4437) 55%, transparent);
        }

        .loading {
            padding-inline: 0;
            border: 0;
            background: transparent;
        }

        @media (max-width: 520px) {
            .agenda {
                grid-template-columns: 46px fit-content(30rem);
                column-gap: 5px;
                padding: 12px 0;
            }
        }
    `;

    get isActive(): boolean {
        return !this.config.hideWhenEmpty || this.controller.loading || this.agenda.visibleCount > 0;
    }

    private get agenda(): CalendarAgenda {
        return buildCalendarAgenda(this.controller.events, {
            timeZone: this.timeZone,
            daysAhead: this.config.daysAhead,
            maxEvents: this.config.maxEvents,
            displayMode: this.config.displayMode,
            showAllDay: this.config.showAllDay,
            hidePastTodayEvents: this.config.hidePastTodayEvents,
        });
    }

    updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('config') || changed.has('hass') || changed.has('timeZone')) {
            this.controller.updateConfig({...this.config, timeZone: this.timeZone}, this.hass);
        }
        if (changed.has('fontColor')) {
            this.style.setProperty('--wcc-calendar-color', this.fontColor);
        }
        if (changed.has('config')) {
            const backgroundColor = this.config.eventBackgroundColor?.trim();
            if (backgroundColor && /^#[0-9a-fA-F]{6}$/.test(backgroundColor)) {
                this.style.setProperty('--wcc-calendar-event-background', backgroundColor);
            } else {
                this.style.removeProperty('--wcc-calendar-event-background');
            }
            const configuredOpacity = Number(this.config.eventBackgroundOpacity);
            const opacity = Number.isFinite(configuredOpacity)
                ? Math.min(1, Math.max(0, configuredOpacity))
                : 0.76;
            this.style.setProperty('--wcc-calendar-event-opacity', `${Math.round(opacity * 100)}%`);
            const sizeProperties: Array<[string, string | undefined]> = [
                ['--wcc-calendar-date-size', this.config.calendarDateSize],
                ['--wcc-calendar-title-size', this.config.eventTitleSize],
                ['--wcc-calendar-detail-size', this.config.eventDetailSize],
            ];
            sizeProperties.forEach(([propertyName, value]) => {
                if (value?.trim()) this.style.setProperty(propertyName, value.trim());
                else this.style.removeProperty(propertyName);
            });
        }
    }

    private dayLabel(value: string): string {
        const today = dayKey(new Date(), this.timeZone);
        const offset = value === today ? 0 : value === addDaysToKey(today, 1) ? 1 : undefined;
        if (offset !== undefined) {
            try {
                const label = new Intl.RelativeTimeFormat(this.language, {numeric: 'auto'}).format(offset, 'day');
                return label.charAt(0).toUpperCase() + label.slice(1);
            } catch {
                return offset === 0
                    ? localize('forecast.today', this.language, 'Today')
                    : localize('forecast.tomorrow', this.language, 'Tomorrow');
            }
        }
        const [year, month, date] = value.split('-').map(Number);
        return new Intl.DateTimeFormat(this.language, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        }).format(new Date(Date.UTC(year, month - 1, date, 12)));
    }

    private dayParts(value: string): {weekday: string; day: string; month: string} {
        const [year, month, date] = value.split('-').map(Number);
        const calendarDate = new Date(Date.UTC(year, month - 1, date, 12));
        const format = (options: Intl.DateTimeFormatOptions): string =>
            new Intl.DateTimeFormat(this.language, {...options, timeZone: 'UTC'})
                .format(calendarDate)
                .replace('.', '');
        return {
            weekday: format({weekday: 'short'}),
            day: String(date).padStart(2, '0'),
            month: format({month: 'short'}),
        };
    }

    private eventTime(event: CalendarEventItem): string {
        if (event.allDay) {
            const label = localize('editor.calendar.all_day', this.language, 'All day');
            const inclusiveEndDayKey = addDaysToKey(event.endDayKey, -1);
            if (inclusiveEndDayKey === event.startDayKey) return label;

            const includeYear = event.startDayKey.slice(0, 4) !== inclusiveEndDayKey.slice(0, 4);
            return `${this.formatShortDayKey(event.startDayKey, includeYear)} – ` +
                `${this.formatShortDayKey(inclusiveEndDayKey, includeYear)} · ${label}`;
        }

        const timeFormatter = new Intl.DateTimeFormat(this.language, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: this.hour12,
            timeZone: this.timeZone,
        });
        if (event.startDayKey === event.endDayKey) {
            return `${timeFormatter.format(event.start)} – ${timeFormatter.format(event.end)}`;
        }

        const includeYear = event.startDayKey.slice(0, 4) !== event.endDayKey.slice(0, 4);
        const dateFormatter = new Intl.DateTimeFormat(this.language, {
            day: 'numeric',
            month: 'numeric',
            year: includeYear ? 'numeric' : undefined,
            timeZone: this.timeZone,
        });
        return `${dateFormatter.format(event.start)} ${timeFormatter.format(event.start)} – ` +
            `${dateFormatter.format(event.end)} ${timeFormatter.format(event.end)}`;
    }

    private formatShortDayKey(value: string, includeYear: boolean): string {
        const [year, month, day] = value.split('-').map(Number);
        return new Intl.DateTimeFormat(this.language, {
            day: 'numeric',
            month: 'numeric',
            year: includeYear ? 'numeric' : undefined,
            timeZone: 'UTC',
        }).format(new Date(Date.UTC(year, month - 1, day, 12)));
    }

    private eventSpansMultipleDays(event: CalendarEventItem): boolean {
        const effectiveEndDayKey = event.allDay
            ? addDaysToKey(event.endDayKey, -1)
            : event.endDayKey;
        return event.startDayKey !== effectiveEndDayKey;
    }

    private openEvent(event: CalendarEventItem): void {
        this.selectedEvent = event;
    }

    private renderEvent(event: CalendarEventItem) {
        return html`
            <button
                    class="event"
                    style=${`--event-color:${event.color}`}
                    type="button"
                    @click=${() => this.openEvent(event)}>
                <span class="event-body">
                    <span class="event-summary">${event.summary}</span>
                    <span class="event-detail">
                        <ha-icon icon=${this.eventSpansMultipleDays(event) ? 'mdi:calendar-range' : 'mdi:clock-outline'}></ha-icon>
                        <span class="event-detail-text">${this.eventTime(event)}</span>
                    </span>
                    ${this.config.showLocation !== false && event.location ? html`
                        <span class="event-detail">
                            <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                            <span class="event-detail-text">${event.location}</span>
                        </span>
                    ` : ''}
                    ${this.config.showDescription && event.description
                        ? html`<span class="event-description">${event.description}</span>` : ''}
                </span>
            </button>
        `;
    }

    render() {
        const agenda = this.agenda;
        if (this.controller.loading && this.controller.events.length === 0) {
            return html`<div class="status loading">${localize('editor.calendar.loading', this.language, 'Loading calendar…')}</div>`;
        }
        if (agenda.visibleCount === 0 && this.config.hideWhenEmpty) return html``;

        return html`
            <div class="agenda">
                ${agenda.groups.map(group => {
                    const date = this.dayParts(group.dayKey);
                    return html`
                    <section class="day-group">
                        <div class="day-date" title=${this.dayLabel(group.dayKey)}>
                            <span class="day-weekday">${date.weekday}</span>
                            <span class="day-number">${date.day}</span>
                            <span class="day-month">${date.month}</span>
                        </div>
                        <div class="events">${group.events.map(event => this.renderEvent(event))}</div>
                    </section>
                `;})}
                ${agenda.visibleCount === 0
                    ? html`<div class="status">${localize('editor.calendar.no_events', this.language, 'No upcoming events.')}</div>` : ''}
                ${this.controller.error ? html`<div class="status error">${this.controller.error}</div>` : ''}
            </div>
            <wcc-calendar-event-dialog
                    .event=${this.selectedEvent}
                    .open=${this.selectedEvent !== undefined}
                    .language=${this.language}
                    .timeZone=${this.timeZone}
                    .hour12=${this.hour12}
                    @wcc-calendar-dialog-close=${() => { this.selectedEvent = undefined; }}>
            </wcc-calendar-event-dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-calendar-agenda': CalendarComponent;
    }
}

import {
    BuildCalendarAgendaOptions,
    CalendarAgenda,
    CalendarEventGroup,
    CalendarEventItem,
    CalendarSourceConfig,
    HaCalendarEvent,
} from './calendar-types';

const DEFAULT_EVENT_COLOR = '#4fc3f7';

function boundedInteger(value: number | undefined, fallback: number, minimum: number, maximum: number): number {
    if (value === undefined || !Number.isFinite(value)) return fallback;
    return Math.min(maximum, Math.max(minimum, Math.trunc(value)));
}

export function dayKey(date: Date, timeZone?: string): string {
    try {
        const parts = new Intl.DateTimeFormat('en-CA', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).formatToParts(date);
        const value = (type: string): string => parts.find(part => part.type === type)?.value ?? '';
        return `${value('year')}-${value('month')}-${value('day')}`;
    } catch {
        return date.toISOString().slice(0, 10);
    }
}

export function addDaysToKey(value: string, days: number): string {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function boundaryDate(value: {date?: string; dateTime?: string}): Date | undefined {
    const raw = value.dateTime ?? (value.date ? `${value.date}T00:00:00Z` : undefined);
    if (!raw) return undefined;
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function normalizeCalendarEvent(
    event: HaCalendarEvent,
    source: CalendarSourceConfig,
    timeZone?: string,
): CalendarEventItem | undefined {
    const start = boundaryDate(event.start);
    const end = boundaryDate(event.end);
    if (!start || !end) return undefined;

    const allDay = Boolean(event.start.date && !event.start.dateTime);
    const startDayKey = allDay && event.start.date ? event.start.date : dayKey(start, timeZone);
    const endDayKey = allDay && event.end.date ? event.end.date : dayKey(end, timeZone);

    return {
        entity: source.entity,
        sourceLabel: source.label?.trim() || source.entity,
        color: source.color || DEFAULT_EVENT_COLOR,
        summary: event.summary?.trim() || 'Untitled event',
        description: event.description?.trim() || undefined,
        location: event.location?.trim() || undefined,
        start,
        end,
        allDay,
        startDayKey,
        endDayKey,
    };
}

function compareEvents(left: CalendarEventItem, right: CalendarEventItem): number {
    if (left.allDay !== right.allDay) return left.allDay ? -1 : 1;
    const byStart = left.start.getTime() - right.start.getTime();
    if (byStart !== 0) return byStart;
    return left.summary.localeCompare(right.summary);
}

export function buildCalendarAgenda(
    events: CalendarEventItem[],
    options: BuildCalendarAgendaOptions = {},
): CalendarAgenda {
    const now = options.now ?? new Date();
    const todayKey = dayKey(now, options.timeZone);
    const daysAhead = options.displayMode === 'today'
        ? 1
        : boundedInteger(options.daysAhead, 7, 1, 31);
    const lastDayKey = addDaysToKey(todayKey, daysAhead - 1);
    const maxEvents = boundedInteger(options.maxEvents, 8, 1, 100);
    const showAllDay = options.showAllDay !== false;
    const hidePast = options.hidePastTodayEvents !== false;

    const groupKey = (event: CalendarEventItem): string =>
        event.startDayKey < todayKey ? todayKey : event.startDayKey;

    const eligible = events
        .filter(event => showAllDay || !event.allDay)
        .filter(event => {
            const eventGroupKey = groupKey(event);
            if (eventGroupKey < todayKey || eventGroupKey > lastDayKey) return false;
            if (hidePast && eventGroupKey === todayKey && !event.allDay && event.end.getTime() <= now.getTime()) {
                return false;
            }
            // HA uses an exclusive all-day end date. Events ending today no longer overlap today.
            if (event.allDay && event.endDayKey <= todayKey) return false;
            return true;
        })
        .sort((left, right) => {
            const byDay = groupKey(left).localeCompare(groupKey(right));
            return byDay !== 0 ? byDay : compareEvents(left, right);
        });

    const visible = eligible.slice(0, maxEvents);
    const grouped = new Map<string, CalendarEventItem[]>();
    visible.forEach(event => {
        const key = groupKey(event);
        const group = grouped.get(key) ?? [];
        group.push(event);
        grouped.set(key, group);
    });

    const groups: CalendarEventGroup[] = Array.from(grouped.entries())
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, groupEvents]) => ({dayKey: key, events: groupEvents.sort(compareEvents)}));

    return {
        groups,
        visibleCount: visible.length,
        hiddenCount: Math.max(0, eligible.length - visible.length),
    };
}

export function calendarRequestWindow(now: Date, daysAhead: number): {start: string; end: string} {
    const safeDays = boundedInteger(daysAhead, 7, 1, 31);
    return {
        start: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        end: new Date(now.getTime() + (safeDays + 1) * 24 * 60 * 60 * 1000).toISOString(),
    };
}

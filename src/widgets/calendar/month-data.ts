import {addDaysToKey, dayKey} from './calendar-data';
import type {CalendarEventItem, CalendarSourceConfig} from './calendar-types';

export interface MonthSettings {
    entities?: CalendarSourceConfig[];
    firstDayOfWeek?: number; // 0 Sunday ... 6 Saturday; omitted follows locale
    eventsPerDay?: number;
    showAllDay?: boolean;
    updateInterval?: number;
    cellMinHeight?: number;
    eventTitleSize?: string;
    wrapEventTitles?: boolean;
    grayOutPastEvents?: boolean;
    calendarDateSize?: string;
    gridColor?: string;
    eventBackgroundOpacity?: number;
    /** Opacity of the whole calendar's dark surface; 0 preserves a transparent widget. */
    backgroundOpacity?: number;
}
export function calendarBackgroundOpacity(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
}
/** All-day end dates are exclusive local dates, not UTC instants. */
export function isCalendarEventPast(event: CalendarEventItem, now: Date, timeZone?: string): boolean {
    return event.allDay ? event.endDayKey <= dayKey(now, timeZone) : event.end.getTime() <= now.getTime();
}
export function weekStart(language: string, override?: number): number {
    if (Number.isInteger(override) && override! >= 0 && override! <= 6) return override!;
    try {
        const locale = new Intl.Locale(language) as any;
        const info = locale.getWeekInfo?.() ?? locale.weekInfo;
        if (info) return info.firstDay % 7;
        const region = locale.maximize().region;
        return ['US', 'CA', 'JP', 'PH', 'TW', 'TH', 'MX', 'BR', 'IL'].includes(region) ? 0 : 1;
    } catch { return 1; }
}
export function shiftMonth(month: string, delta: number): string {
    const [year, number] = month.split('-').map(Number);
    return new Date(Date.UTC(year, number - 1 + delta, 1)).toISOString().slice(0, 7);
}
export function monthGrid(month: string, firstDay: number): string[] {
    const first = `${month}-01`;
    const weekday = new Date(`${first}T12:00:00Z`).getUTCDay();
    const start = addDaysToKey(first, -((weekday - firstDay + 7) % 7));
    const last = addDaysToKey(`${shiftMonth(month, 1)}-01`, -1);
    const result: string[] = [];
    for (let date = start; date <= last || result.length % 7 !== 0; date = addDaysToKey(date, 1)) result.push(date);
    return result;
}
/** Pad the API range to cover every timezone and DST boundary; cells filter exact local days. */
export function monthRequestWindow(days: string[]): {start: string; end: string} {
    return {start: `${addDaysToKey(days[0], -1)}T00:00:00Z`, end: `${addDaysToKey(days[days.length - 1], 2)}T00:00:00Z`};
}
export function eventsOnDay(events: CalendarEventItem[], date: string, timeZone?: string, showAllDay = true): CalendarEventItem[] {
    return events.filter(event => {
        if (!showAllDay && event.allDay) return false;
        const last = event.allDay ? addDaysToKey(event.endDayKey, -1)
            : dayKey(new Date(Math.max(event.start.getTime(), event.end.getTime() - 1)), timeZone);
        return event.startDayKey <= date && last >= date;
    }).sort((a, b) => Number(b.allDay) - Number(a.allDay) || a.start.getTime() - b.start.getTime() || a.summary.localeCompare(b.summary));
}

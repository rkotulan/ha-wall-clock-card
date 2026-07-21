export type CalendarDisplayMode = 'agenda' | 'today';

export interface CalendarSourceConfig {
    entity: string;
    color?: string;
    label?: string;
}

export interface CalendarWidgetSettings {
    entities?: CalendarSourceConfig[];
    displayMode?: CalendarDisplayMode;
    daysAhead?: number;
    maxEvents?: number;
    showAllDay?: boolean;
    showLocation?: boolean;
    showDescription?: boolean;
    hidePastTodayEvents?: boolean;
    hideWhenEmpty?: boolean;
    updateInterval?: number;
    eventBackgroundColor?: string;
    /** Event background opacity from 0 (transparent) to 1 (opaque). */
    eventBackgroundOpacity?: number;
    calendarDateSize?: string;
    eventTitleSize?: string;
    eventDetailSize?: string;
}

export interface HaCalendarEventBoundary {
    date?: string;
    dateTime?: string;
}

export interface HaCalendarEvent {
    summary: string;
    start: HaCalendarEventBoundary;
    end: HaCalendarEventBoundary;
    description?: string;
    location?: string;
    uid?: string;
}

export interface CalendarEventItem {
    entity: string;
    sourceLabel: string;
    color: string;
    summary: string;
    description?: string;
    location?: string;
    start: Date;
    end: Date;
    allDay: boolean;
    startDayKey: string;
    endDayKey: string;
}

export interface CalendarEventGroup {
    dayKey: string;
    events: CalendarEventItem[];
}

export interface CalendarAgenda {
    groups: CalendarEventGroup[];
    visibleCount: number;
    hiddenCount: number;
}

export interface BuildCalendarAgendaOptions {
    now?: Date;
    timeZone?: string;
    daysAhead?: number;
    maxEvents?: number;
    displayMode?: CalendarDisplayMode;
    showAllDay?: boolean;
    hidePastTodayEvents?: boolean;
}

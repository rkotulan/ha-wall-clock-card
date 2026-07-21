import {
    addDaysToKey,
    buildCalendarAgenda,
    calendarRequestWindow,
    normalizeCalendarEvent,
} from '../src/widgets/calendar/calendar-data';
import {CalendarEventItem, CalendarSourceConfig, HaCalendarEvent} from '../src/widgets/calendar/calendar-types';

const source: CalendarSourceConfig = {
    entity: 'calendar.family',
    label: 'Family',
    color: '#ff0000',
};

function normalize(event: HaCalendarEvent): CalendarEventItem {
    const result = normalizeCalendarEvent(event, source, 'Europe/Prague');
    if (!result) throw new Error('Expected event to normalize');
    return result;
}

describe('calendar data', () => {
    it('normalizes a timed event with its source metadata', () => {
        const event = normalize({
            summary: '  Dentist  ',
            start: {dateTime: '2026-07-19T10:00:00+02:00'},
            end: {dateTime: '2026-07-19T11:00:00+02:00'},
            location: ' Clinic ',
        });

        expect(event.summary).toBe('Dentist');
        expect(event.location).toBe('Clinic');
        expect(event.sourceLabel).toBe('Family');
        expect(event.color).toBe('#ff0000');
        expect(event.allDay).toBe(false);
        expect(event.startDayKey).toBe('2026-07-19');
    });

    it('treats an all-day end date as exclusive', () => {
        const event = normalize({
            summary: 'Holiday',
            start: {date: '2026-07-19'},
            end: {date: '2026-07-20'},
        });

        expect(event.allDay).toBe(true);
        expect(event.startDayKey).toBe('2026-07-19');
        expect(event.endDayKey).toBe('2026-07-20');
    });

    it('sorts all-day events before timed events and groups by day', () => {
        const events = [
            normalize({
                summary: 'Lunch',
                start: {dateTime: '2026-07-19T12:00:00+02:00'},
                end: {dateTime: '2026-07-19T13:00:00+02:00'},
            }),
            normalize({
                summary: 'Holiday',
                start: {date: '2026-07-19'},
                end: {date: '2026-07-20'},
            }),
            normalize({
                summary: 'Tomorrow',
                start: {dateTime: '2026-07-20T09:00:00+02:00'},
                end: {dateTime: '2026-07-20T10:00:00+02:00'},
            }),
        ];

        const agenda = buildCalendarAgenda(events, {
            now: new Date('2026-07-19T08:00:00+02:00'),
            timeZone: 'Europe/Prague',
            daysAhead: 7,
        });

        expect(agenda.groups.map(group => group.dayKey)).toEqual(['2026-07-19', '2026-07-20']);
        expect(agenda.groups[0].events.map(event => event.summary)).toEqual(['Holiday', 'Lunch']);
    });

    it('keeps today events ahead of future all-day events when applying the limit', () => {
        const events = [
            normalize({
                summary: 'Today meeting',
                start: {dateTime: '2026-07-19T12:00:00+02:00'},
                end: {dateTime: '2026-07-19T13:00:00+02:00'},
            }),
            normalize({
                summary: 'Tomorrow all day',
                start: {date: '2026-07-20'},
                end: {date: '2026-07-21'},
            }),
        ];

        const agenda = buildCalendarAgenda(events, {
            now: new Date('2026-07-19T08:00:00+02:00'),
            timeZone: 'Europe/Prague',
            maxEvents: 1,
        });

        expect(agenda.groups[0].events[0].summary).toBe('Today meeting');
    });

    it('hides past timed events today but keeps ongoing events', () => {
        const events = [
            normalize({
                summary: 'Past',
                start: {dateTime: '2026-07-19T08:00:00+02:00'},
                end: {dateTime: '2026-07-19T09:00:00+02:00'},
            }),
            normalize({
                summary: 'Ongoing',
                start: {dateTime: '2026-07-19T09:30:00+02:00'},
                end: {dateTime: '2026-07-19T10:30:00+02:00'},
            }),
        ];

        const agenda = buildCalendarAgenda(events, {
            now: new Date('2026-07-19T10:00:00+02:00'),
            timeZone: 'Europe/Prague',
            hidePastTodayEvents: true,
        });

        expect(agenda.groups[0].events.map(event => event.summary)).toEqual(['Ongoing']);
    });

    it('supports today-only mode and hiding all-day events', () => {
        const events = [
            normalize({
                summary: 'All day',
                start: {date: '2026-07-19'},
                end: {date: '2026-07-20'},
            }),
            normalize({
                summary: 'Today',
                start: {dateTime: '2026-07-19T12:00:00+02:00'},
                end: {dateTime: '2026-07-19T13:00:00+02:00'},
            }),
            normalize({
                summary: 'Tomorrow',
                start: {dateTime: '2026-07-20T12:00:00+02:00'},
                end: {dateTime: '2026-07-20T13:00:00+02:00'},
            }),
        ];

        const agenda = buildCalendarAgenda(events, {
            now: new Date('2026-07-19T08:00:00+02:00'),
            timeZone: 'Europe/Prague',
            displayMode: 'today',
            showAllDay: false,
        });

        expect(agenda.visibleCount).toBe(1);
        expect(agenda.groups[0].events[0].summary).toBe('Today');
    });

    it('caps visible events and reports how many remain', () => {
        const events = ['A', 'B', 'C'].map((summary, index) => normalize({
            summary,
            start: {dateTime: `2026-07-19T1${index}:00:00+02:00`},
            end: {dateTime: `2026-07-19T1${index}:30:00+02:00`},
        }));

        const agenda = buildCalendarAgenda(events, {
            now: new Date('2026-07-19T08:00:00+02:00'),
            timeZone: 'Europe/Prague',
            maxEvents: 2,
        });

        expect(agenda.visibleCount).toBe(2);
        expect(agenda.hiddenCount).toBe(1);
    });

    it('creates a deliberately broad REST request window', () => {
        const now = new Date('2026-07-19T12:00:00Z');
        const range = calendarRequestWindow(now, 7);
        expect(range.start).toBe('2026-07-18T12:00:00.000Z');
        expect(range.end).toBe('2026-07-27T12:00:00.000Z');
        expect(addDaysToKey('2026-07-31', 1)).toBe('2026-08-01');
    });
});

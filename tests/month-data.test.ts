import {monthGrid, fourWeekGrid, shiftMonth, weekStart, eventsOnDay, monthRequestWindow, isCalendarEventPast} from '../src/widgets/calendar/month-data';
import {normalizeCalendarEvent} from '../src/widgets/calendar/calendar-data';

describe('monthly overview', () => {
    it('shows four complete weeks across the year boundary', () => {
        const days = fourWeekGrid(new Date('2026-12-31T12:00:00Z'), 1, 'Europe/Prague');
        expect(days).toHaveLength(28);
        expect(days[0]).toBe('2026-12-28');
        expect(days[27]).toBe('2027-01-24');
        expect(new Set(days).size).toBe(28);
        expect(monthRequestWindow(days)).toEqual({start:'2026-12-27T00:00:00Z',end:'2027-01-26T00:00:00Z'});
    });
    it('rolls over at the local week boundary and honors the configured first day', () => {
        const now = new Date('2026-09-06T22:00:00Z');
        expect(fourWeekGrid(now, 1, 'Europe/Prague')[0]).toBe('2026-09-07');
        expect(fourWeekGrid(new Date(now.getTime() - 1), 1, 'Europe/Prague')[0]).toBe('2026-08-31');
        expect(fourWeekGrid(now, 1, 'America/Los_Angeles')[0]).toBe('2026-08-31');
        expect(fourWeekGrid(now, 0, 'America/Los_Angeles')[0]).toBe('2026-09-06');
    });
    it('keeps local dates continuous across leap days and DST', () => {
        expect(fourWeekGrid(new Date('2024-02-28T12:00:00Z'), 1, 'Europe/Prague')).toContain('2024-02-29');
        const days = fourWeekGrid(new Date('2026-03-28T12:00:00Z'), 1, 'Europe/Prague');
        expect(days[0]).toBe('2026-03-23');
        expect(days[27]).toBe('2026-04-19');
        expect(days.slice(5,8)).toEqual(['2026-03-28','2026-03-29','2026-03-30']);
    });
    it('grays timed events only when they finish, including overnight DST events', () => {
        const event = normalizeCalendarEvent({summary:'Night',start:{dateTime:'2026-03-28T23:00:00+01:00'},end:{dateTime:'2026-03-29T04:00:00+02:00'}},{entity:'calendar.home'},'Europe/Prague')!;
        expect(isCalendarEventPast(event,new Date('2026-03-28T20:00:00Z'))).toBe(false);
        expect(isCalendarEventPast(event,new Date('2026-03-29T01:59:59Z'))).toBe(false);
        expect(isCalendarEventPast(event,new Date('2026-03-29T02:00:00Z'))).toBe(true);
    });
    it('keeps all-day trips colored until the exclusive local end date', () => {
        const event = normalizeCalendarEvent({summary:'Trip',start:{date:'2026-09-01'},end:{date:'2026-09-03'}},{entity:'calendar.home'},'America/Los_Angeles')!;
        expect(isCalendarEventPast(event,new Date('2026-09-03T06:59:59Z'),'America/Los_Angeles')).toBe(false);
        expect(isCalendarEventPast(event,new Date('2026-09-03T07:00:00Z'),'America/Los_Angeles')).toBe(true);
        expect(isCalendarEventPast(event,new Date('2026-09-02T22:00:00Z'),'Europe/Prague')).toBe(true);
    });
    it('builds complete weeks across years and leap days', () => {
        expect(monthGrid('2026-02', 0)).toHaveLength(28);
        expect(monthGrid('2024-02', 1)).toContain('2024-02-29');
        const january = monthGrid('2026-01', 1);
        expect(january[0]).toBe('2025-12-29');
        expect(january[january.length - 1]).toBe('2026-02-01');
        expect(monthGrid('2026-08', 1)).toHaveLength(42);
        expect(shiftMonth('2026-12', 1)).toBe('2027-01');
        expect(shiftMonth('2026-01', -1)).toBe('2025-12');
    });
    it('respects locale and explicit week starts', () => {
        expect(weekStart('cs-CZ')).toBe(1);
        expect(weekStart('en-US')).toBe(0);
        expect(weekStart('en-US', 6)).toBe(6);
    });
    it('requests every visible day with timezone padding', () => {
        expect(monthRequestWindow(monthGrid('2026-03', 1))).toEqual({start:'2026-02-22T00:00:00Z',end:'2026-04-07T00:00:00Z'});
    });
    it('spans all-day events with an exclusive end date', () => {
        const event = normalizeCalendarEvent({summary:'Trip',start:{date:'2026-08-31'},end:{date:'2026-09-03'}},{entity:'calendar.home'},'America/Los_Angeles')!;
        for (const date of ['2026-08-31','2026-09-01','2026-09-02']) expect(eventsOnDay([event],date)).toHaveLength(1);
        expect(eventsOnDay([event],'2026-09-03')).toHaveLength(0);
        expect(eventsOnDay([event],'2026-09-01',undefined,false)).toHaveLength(0);
    });
    it('splits overnight DST events without adding a day at midnight', () => {
        const event = normalizeCalendarEvent({summary:'Night',start:{dateTime:'2026-03-28T23:00:00+01:00'},end:{dateTime:'2026-03-30T00:00:00+02:00'}},{entity:'calendar.home'},'Europe/Prague')!;
        expect(eventsOnDay([event],'2026-03-28','Europe/Prague')).toHaveLength(1);
        expect(eventsOnDay([event],'2026-03-29','Europe/Prague')).toHaveLength(1);
        expect(eventsOnDay([event],'2026-03-30','Europe/Prague')).toHaveLength(0);
    });
});

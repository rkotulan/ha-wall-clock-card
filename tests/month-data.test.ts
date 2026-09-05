import {monthGrid, shiftMonth, weekStart, eventsOnDay, monthRequestWindow} from '../src/widgets/calendar/month-data';
import {normalizeCalendarEvent} from '../src/widgets/calendar/calendar-data';

describe('monthly overview', () => {
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

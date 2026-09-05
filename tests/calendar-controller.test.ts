import {CalendarController} from '../src/components/calendar/calendar-controller';

describe('calendar range loading', () => {
    const oldWindow = (global as any).window;
    let controller: CalendarController;
    beforeEach(() => {
        (global as any).window = global;
        jest.useFakeTimers();
        controller = new CalendarController({addController: jest.fn(), requestUpdate: jest.fn(), updateComplete: Promise.resolve(true)} as any);
        controller.hostConnected();
    });
    afterEach(() => {controller.hostDisconnected(); jest.useRealTimers(); (global as any).window = oldWindow;});
    it('discards an older month response after a newer request', async () => {
        let oldResolve: (events: any[]) => void = () => {};
        const old = new Promise<any[]>(resolve => oldResolve = resolve);
        const event = (summary: string) => ({summary,start:{date:'2026-09-01'},end:{date:'2026-09-02'}});
        const hass = {states:{}, callApi:jest.fn().mockReturnValueOnce(old).mockResolvedValue([event('New')])} as any;
        const settings = {entities:[{entity:'calendar.test'}],requestWindow:{start:'2026-08-01T00:00:00Z',end:'2026-09-01T00:00:00Z'}};
        controller.updateConfig(settings,hass);
        controller.updateConfig({...settings,requestWindow:{start:'2026-09-01T00:00:00Z',end:'2026-10-01T00:00:00Z'}},hass);
        await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
        oldResolve([event('Old')]);
        await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
        expect(controller.events.map(e=>e.summary)).toEqual(['New']);
        expect(hass.callApi.mock.calls[1][1]).toContain('start=2026-09-01');
    });
    it('invalidates an in-flight request when all sources are removed', async () => {
        let resolve: (events: any[]) => void = () => {};
        const hass = {states:{},callApi:()=>new Promise<any[]>(r=>resolve=r)} as any;
        controller.updateConfig({entities:[{entity:'calendar.test'}]},hass);
        controller.updateConfig({entities:[]},hass);
        resolve([{summary:'Stale',start:{date:'2026-09-01'},end:{date:'2026-09-02'}}]);
        await Promise.resolve(); await Promise.resolve(); await Promise.resolve();
        expect(controller.events).toEqual([]);
        expect(controller.loading).toBe(false);
    });
});

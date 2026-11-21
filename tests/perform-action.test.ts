import { HomeAssistant } from 'custom-card-helpers';
import { executeAction, ModuleActionConfig } from '../src/components/action-bar/types';
import { haActionHandler } from '../src/components/action-bar/plugins/ha-action/ha-action-plugin';

// Exercise the real helper. Mocking handleAction hides unsupported action names.
describe('perform-action compatibility', () => {
    const callService = jest.fn();
    const hass = { callService } as unknown as HomeAssistant;
    const element = {} as HTMLElement;
    const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');
    const confirmDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'confirm');
    const confirmAction = jest.fn();

    beforeAll(() => {
        Object.defineProperty(globalThis, 'window', {
            configurable: true,
            value: { dispatchEvent: jest.fn() },
        });
        Object.defineProperty(globalThis, 'confirm', {
            configurable: true,
            value: confirmAction,
        });
    });

    afterAll(() => {
        if (windowDescriptor) Object.defineProperty(globalThis, 'window', windowDescriptor);
        else Reflect.deleteProperty(globalThis, 'window');
        if (confirmDescriptor) Object.defineProperty(globalThis, 'confirm', confirmDescriptor);
        else Reflect.deleteProperty(globalThis, 'confirm');
    });

    beforeEach(() => {
        callService.mockClear();
        confirmAction.mockReset().mockReturnValue(true);
    });

    it.each(['tap', 'hold', 'double_tap'] as const)('calls the snooze service on %s using the issue #70 config', gesture => {
        const target = { entity_id: 'button.ralarm_snooze' };
        const action: ModuleActionConfig = Object.freeze({
            actionId: 'action-ha',
            title: 'Snooze',
            icon: 'mdi:alarm-snooze',
            entity: 'button.ralarm_snooze',
            [`${gesture}_action`]: Object.freeze({
                action: 'perform-action',
                perform_action: 'alarm_clocks.snooze',
                target,
            }),
        });

        executeAction(action, hass, element, gesture);

        expect(callService).toHaveBeenCalledTimes(1);
        expect(callService).toHaveBeenCalledWith('alarm_clocks', 'snooze', undefined, target);
    });

    it('preserves service data and targets for modern light actions', () => {
        const data = { brightness: 100 };
        const target = { entity_id: ['light.bedroom', 'light.hall'] };
        executeAction({
            actionId: 'light-toggle', title: 'Lights', icon: 'mdi:lightbulb',
            tap_action: { action: 'perform-action', perform_action: 'light.toggle', data, target },
        }, hass, element);

        expect(callService).toHaveBeenCalledWith('light', 'toggle', data, target);
    });

    it.each([true, false])('honors confirmation with response %s', confirmed => {
        confirmAction.mockReturnValue(confirmed);
        executeAction({
            actionId: 'action-ha', title: 'Dismiss', icon: 'mdi:alarm-off',
            tap_action: {
                action: 'perform-action', perform_action: 'alarm_clocks.dismiss',
                confirmation: { text: 'Dismiss this alarm?' },
            },
        }, hass, element);

        expect(confirmAction).toHaveBeenCalledWith('Dismiss this alarm?');
        expect(callService).toHaveBeenCalledTimes(confirmed ? 1 : 0);
    });

    it('keeps legacy service calls working', () => {
        const target = { entity_id: 'light.bedroom' };
        const data = { brightness: 100 };
        executeAction({
            actionId: 'action-ha', title: 'Lights', icon: 'mdi:lightbulb',
            tap_action: { action: 'call-service', service: 'light.toggle', service_data: data, target },
        }, hass, element);

        expect(callService).toHaveBeenCalledWith('light', 'toggle', data, target);
    });

    it('supports invoking the HA plugin handler directly', () => {
        haActionHandler({
            actionId: 'action-ha', title: 'Snooze', icon: 'mdi:alarm-snooze',
            tap_action: { action: 'perform-action', perform_action: 'alarm_clocks.snooze' },
        }, hass, element);

        expect(callService).toHaveBeenCalledWith('alarm_clocks', 'snooze', undefined, undefined);
    });
});

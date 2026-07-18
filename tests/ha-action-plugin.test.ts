import { handleAction } from 'custom-card-helpers';
import {
    haActionHandler,
    HaActionPlugin,
    registerHaActionPlugin,
} from '../src/components/action-bar/plugins/ha-action/ha-action-plugin';
import { HA_ACTION, HaActionConfig } from '../src/components/action-bar/plugins/ha-action/types';
import { ActionRegistry } from '../src/components/action-bar/types';
import { HomeAssistant } from 'custom-card-helpers';

// Mock custom-card-helpers so we can assert the handler delegates to HA's
// handleAction() with the right config.
jest.mock('custom-card-helpers', () => ({
    handleAction: jest.fn(),
}));

const mockHandleAction = handleAction as jest.Mock;

describe('HA Action Plugin', () => {
    const fakeElement = {} as unknown as HTMLElement;
    const mockHass = { callService: jest.fn() } as unknown as HomeAssistant;

    beforeEach(() => {
        mockHandleAction.mockClear();
    });

    it('should have the correct action ID', () => {
        expect(new HaActionPlugin().actionId).toBe(HA_ACTION);
    });

    it('should create a default action config that navigates', () => {
        expect(new HaActionPlugin().defaultActionConfig()).toEqual({
            actionId: HA_ACTION,
            title: 'Action',
            icon: 'mdi:gesture-tap',
            tap_action: { action: 'navigate', navigation_path: '/config' },
        });
    });

    it('should register its handler', () => {
        registerHaActionPlugin();
        expect(ActionRegistry.getInstance().getHandler(HA_ACTION)).toBeDefined();
    });

    it('should delegate to handleAction with entity and tap_action on tap', () => {
        const action: HaActionConfig = {
            actionId: HA_ACTION,
            title: 'Toggle',
            icon: 'mdi:x',
            entity: 'light.kitchen',
            tap_action: { action: 'toggle' },
        };

        haActionHandler(action, mockHass, fakeElement);

        expect(mockHandleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            { entity: 'light.kitchen', tap_action: { action: 'toggle' } },
            'tap'
        );
    });

    it('should pass a navigate tap_action through to handleAction', () => {
        const action: HaActionConfig = {
            actionId: HA_ACTION,
            title: 'History',
            icon: 'mdi:x',
            tap_action: { action: 'navigate', navigation_path: '/history' },
        };

        haActionHandler(action, mockHass, fakeElement);

        expect(mockHandleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            { entity: undefined, tap_action: { action: 'navigate', navigation_path: '/history' } },
            'tap'
        );
    });
});

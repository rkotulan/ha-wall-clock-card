// Import directly from types (not the action-bar barrel): the barrel pulls in
// LitElement components whose ESM Jest cannot load.
import {
    ActionRegistry,
    executeAction,
    ModuleActionConfig,
} from '../src/components/action-bar/types';
import { HomeAssistant, handleAction } from 'custom-card-helpers';

// handleAction touches the DOM; mock it out for the node test environment.
jest.mock('custom-card-helpers', () => ({
    handleAction: jest.fn(),
}));

const mockHass = {} as HomeAssistant;
const fakeElement = {} as HTMLElement;

describe('executeAction', () => {
    beforeEach(() => {
        (ActionRegistry as any).instance = undefined;
        (handleAction as jest.Mock).mockClear();
    });

    it('routes any action with tap_action through handleAction', () => {
        const registryHandler = jest.fn();
        ActionRegistry.getInstance().registerHandler('some-plugin', registryHandler);

        const action: ModuleActionConfig = {
            actionId: 'some-plugin',
            title: 'Test',
            icon: 'mdi:test',
            tap_action: { action: 'navigate', navigation_path: '/config' },
        };

        executeAction(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({
                tap_action: { action: 'navigate', navigation_path: '/config' },
            }),
            'tap',
        );
        expect(registryHandler).not.toHaveBeenCalled();
    });

    it('falls back to the registered plugin handler without tap_action', () => {
        const registryHandler = jest.fn();
        ActionRegistry.getInstance().registerHandler('some-plugin', registryHandler);

        const action: ModuleActionConfig = {
            actionId: 'some-plugin',
            title: 'Test',
            icon: 'mdi:test',
        };

        executeAction(action, mockHass, fakeElement);

        expect(registryHandler).toHaveBeenCalledWith(action, mockHass, fakeElement);
        expect(handleAction).not.toHaveBeenCalled();
    });

    it('copies an entity nested in tap_action to the top level for handleAction', () => {
        const action: ModuleActionConfig = {
            actionId: 'action-ha',
            title: 'Test',
            icon: 'mdi:test',
            tap_action: { action: 'more-info', entity: 'light.living_room' } as any,
        };

        executeAction(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({ entity: 'light.living_room' }),
            'tap',
        );
    });

    it('keeps an explicit top-level entity', () => {
        const action: ModuleActionConfig = {
            actionId: 'action-ha',
            title: 'Test',
            icon: 'mdi:test',
            entity: 'switch.top_level',
            tap_action: { action: 'toggle', entity: 'switch.nested' } as any,
        };

        executeAction(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({ entity: 'switch.top_level' }),
            'tap',
        );
    });
});

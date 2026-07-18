// Import directly from plugin/types files (not the action-bar barrel):
// the barrel pulls in LitElement components whose ESM Jest cannot load.
import { ActionRegistry, ActionHandler, ModuleActionConfig } from '../src/components/action-bar/types';
import { registerNavigationPlugin } from '../src/components/action-bar/plugins/navigator/navigation-plugin';
import { NAVIGATION_ACTION } from '../src/components/action-bar/plugins/navigator/types';
import { registerServiceCallPlugin, SERVICE_CALL_ACTION } from '../src/components/action-bar/plugins/service-call/service-call-plugin';
import { HomeAssistant } from 'custom-card-helpers';

// Plugin handlers touch the DOM through custom-card-helpers; mock it out.
jest.mock('custom-card-helpers', () => ({
    navigate: jest.fn(),
    handleAction: jest.fn(),
}));

// Mock HomeAssistant
const mockHass = {
    callService: jest.fn(),
    states: {
        'weather.home': {
            state: 'sunny',
            attributes: {
                friendly_name: 'Weather',
                temperature: 25
            }
        }
    }
} as unknown as HomeAssistant;

describe('Action Bar Plugins', () => {
    let registry: ActionRegistry;
    let testActionExecuted = false;

    beforeEach(() => {
        // Reset the registry instance for each test
        // This is a hack to reset the singleton instance
        (ActionRegistry as any).instance = undefined;
        registry = ActionRegistry.getInstance();
        testActionExecuted = false;
    });

    it('should register and execute a custom action handler', () => {
        // Define a custom action type
        const TEST_ACTION_TYPE = 'test-action';

        // Create a handler function
        const testActionHandler: ActionHandler = (action, hass) => {
            expect(action.actionId).toBe(TEST_ACTION_TYPE);
            expect(hass).toBe(mockHass);
            testActionExecuted = true;
        };

        // Register the handler
        registry.registerHandler(TEST_ACTION_TYPE, testActionHandler);

        // Create an action config
        const testAction: ModuleActionConfig = {
            actionId: TEST_ACTION_TYPE,
            title: 'Test Action',
            icon: 'mdi:test'
        };

        // Execute the action
        const handler = registry.getHandler(TEST_ACTION_TYPE);
        expect(handler).toBeDefined();
        handler!(testAction, mockHass);

        // Verify the action was executed
        expect(testActionExecuted).toBe(true);
    });

    it('should handle built-in action types', () => {
        // Built-in plugins register themselves via their register functions
        registerNavigationPlugin();
        registerServiceCallPlugin();

        const navigateHandler = registry.getHandler(NAVIGATION_ACTION);
        expect(navigateHandler).toBeDefined();

        const callServiceHandler = registry.getHandler(SERVICE_CALL_ACTION);
        expect(callServiceHandler).toBeDefined();
    });

    it('should return undefined for unregistered action types', () => {
        const handler = registry.getHandler('non-existent-action');
        expect(handler).toBeUndefined();
    });

    it('should allow overriding built-in action handlers', () => {
        // Create a custom navigate handler
        let customNavigateExecuted = false;
        const customNavigateHandler: ActionHandler = () => {
            customNavigateExecuted = true;
        };

        // Override the built-in navigate handler
        registry.registerHandler('navigate', customNavigateHandler);

        // Execute the action
        const handler = registry.getHandler('navigate');
        expect(handler).toBeDefined();
        handler!({ actionId: 'navigate', title: 'Test', icon: 'mdi:test', path: '/test' }, mockHass);

        // Verify the custom handler was executed
        expect(customNavigateExecuted).toBe(true);
    });
});

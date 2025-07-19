import { ActionRegistry } from '../src/components/action-bar/types';
import { HomeAssistant } from 'custom-card-helpers';
import { 
    navigationHandler,
    registerNavigationPlugin, 
    createNavigationAction 
} from '../src/components/action-bar/plugins/navigator/navigation-plugin';
import {NAVIGATION_ACTION, NavigationActionConfig} from "../src/components/action-bar";

// Mock window.open and window.history.pushState
const mockOpen = jest.fn();
const mockPushState = jest.fn();
const mockDispatchEvent = jest.fn();

// Save original functions
const originalOpen = window.open;
const originalPushState = window.history.pushState;
const originalDispatchEvent = window.dispatchEvent;

// Mock HomeAssistant
const mockHass = {} as HomeAssistant;

describe('Navigation Plugin', () => {
    let registry: ActionRegistry;

    beforeEach(() => {
        // Reset the registry instance for each test
        (ActionRegistry as any).instance = undefined;
        registry = ActionRegistry.getInstance();

        // Mock window functions
        window.open = mockOpen;
        window.history.pushState = mockPushState;
        window.dispatchEvent = mockDispatchEvent;

        // Clear mocks
        mockOpen.mockClear();
        mockPushState.mockClear();
        mockDispatchEvent.mockClear();
    });

    afterEach(() => {
        // Restore original functions
        window.open = originalOpen;
        window.history.pushState = originalPushState;
        window.dispatchEvent = originalDispatchEvent;
    });

    it('should register the navigation handler', () => {
        // Register the navigation plugin
        registerNavigationPlugin();

        // Get the handler
        const handler = registry.getHandler(NAVIGATION_ACTION);

        // Verify the handler is registered
        expect(handler).toBeDefined();
    });

    it('should navigate to a path in the current tab', () => {
        // Create a navigation action
        const action: NavigationActionConfig = {
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: '/test-path'
        };

        // Execute the handler
        navigationHandler(action, mockHass);

        // Verify window.history.pushState was called
        expect(mockPushState).toHaveBeenCalledWith(null, '', '/test-path');

        // Verify window.dispatchEvent was called with a location-changed event
        expect(mockDispatchEvent).toHaveBeenCalled();
        const event = mockDispatchEvent.mock.calls[0][0];
        expect(event.type).toBe('location-changed');
        expect(event.composed).toBe(true);

        // Verify window.open was not called
        expect(mockOpen).not.toHaveBeenCalled();
    });

    it('should open a path in a new tab', () => {
        // Create a navigation action with target _blank
        const action: NavigationActionConfig = {
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: '/test-path',
            target: '_blank'
        };

        // Execute the handler
        navigationHandler(action, mockHass);

        // Verify window.open was called
        expect(mockOpen).toHaveBeenCalledWith('/test-path', '_blank');

        // Verify window.history.pushState was not called
        expect(mockPushState).not.toHaveBeenCalled();

        // Verify window.dispatchEvent was not called
        expect(mockDispatchEvent).not.toHaveBeenCalled();
    });

    it('should create a navigation action configuration', () => {
        // Create a navigation action
        const action = createNavigationAction(
            'Test Navigation',
            'mdi:test',
            '/test-path',
            '_blank'
        );

        // Verify the action configuration
        expect(action).toEqual({
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: '/test-path',
            target: '_blank'
        });
    });
});

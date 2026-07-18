import { navigate } from 'custom-card-helpers';
import { ActionRegistry } from '../src/components/action-bar/types';
import {
    navigationHandler,
    registerNavigationPlugin,
    createNavigationAction,
} from '../src/components/action-bar/plugins/navigator/navigation-plugin';
import { NAVIGATION_ACTION, NavigationActionConfig } from '../src/components/action-bar/plugins/navigator/types';

// Mock custom-card-helpers so we can assert the handler delegates to HA's
// navigate() helper (which is what makes all HA routes work).
jest.mock('custom-card-helpers', () => ({
    navigate: jest.fn(),
}));

const mockNavigate = navigate as jest.Mock;

describe('Navigation Plugin', () => {
    // Handlers reference window.open / document.body; provide minimal stubs since
    // the Jest environment is 'node'.
    const fakeElement = {} as unknown as HTMLElement;

    beforeEach(() => {
        mockNavigate.mockClear();
        (global as any).window = { open: jest.fn() };
    });

    afterEach(() => {
        delete (global as any).window;
    });

    it('should register the navigation handler', () => {
        registerNavigationPlugin();
        const handler = ActionRegistry.getInstance().getHandler(NAVIGATION_ACTION);
        expect(handler).toBeDefined();
    });

    it('should navigate in the current tab via HA navigate() helper', () => {
        const action: NavigationActionConfig = {
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: '/config',
        };

        navigationHandler(action, {} as any, fakeElement);

        // navigate() fires a bubbling, composed location-changed event that the HA
        // router listens for, so routes like /config work.
        expect(mockNavigate).toHaveBeenCalledWith(fakeElement, '/config');
        expect((global as any).window.open).not.toHaveBeenCalled();
    });

    it('should open an external path in a new tab', () => {
        const action: NavigationActionConfig = {
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: 'https://example.com',
            target: '_blank',
        };

        navigationHandler(action, {} as any, fakeElement);

        expect((global as any).window.open).toHaveBeenCalledWith('https://example.com', '_blank');
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should create a navigation action configuration', () => {
        const action = createNavigationAction('Test Navigation', 'mdi:test', '/test-path', '_blank');

        expect(action).toEqual({
            actionId: NAVIGATION_ACTION,
            title: 'Test Navigation',
            icon: 'mdi:test',
            path: '/test-path',
            target: '_blank',
        });
    });
});

import { ActionHandler, ModuleActionConfig, ACTION_TYPE } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';

/**
 * Navigation plugin for the action bar
 * This plugin provides a way to navigate to different pages in Home Assistant
 */

// Use the built-in navigation action type from ACTION_TYPE
// This is preferred over defining a new constant for built-in action types
export const NAVIGATION_ACTION = ACTION_TYPE.NAVIGATE;

/**
 * Configuration for a navigation action
 */
export interface NavigationActionConfig extends ModuleActionConfig {
    actionId: typeof NAVIGATION_ACTION;
    path: string;
    target?: '_blank' | '_self'; // Optional target for the navigation
}

/**
 * Handler for navigation actions
 * @param action The navigation action configuration
 */
export const navigationHandler: ActionHandler<NavigationActionConfig> = (action) => {
    // Get the path and target from the action configuration
    const { path, target } = action;

    if (target === '_blank') {
        // Open in a new tab/window
        window.open(path, '_blank');
    } else {
        // Navigate to the specified path in the current tab
        window.history.pushState(null, '', path);
        const event = new Event('location-changed', { composed: true });
        window.dispatchEvent(event);
    }
};

/**
 * Navigation Plugin class that implements the ActionPlugin interface
 */
export class NavigationPlugin implements ActionPlugin<NavigationActionConfig> {
    readonly actionId = NAVIGATION_ACTION;
    readonly name = 'Navigate to Page';
    readonly description = 'Navigate to a different page in Home Assistant';
    readonly icon = 'mdi:arrow-right';
    readonly handler: ActionHandler<NavigationActionConfig> = navigationHandler;

    readonly editorComponent = 'navigation-editor-plugin';

    createActionConfig(title: string, icon: string, path: string, target?: '_blank' | '_self'): NavigationActionConfig {
        return createNavigationAction(title, icon, path, target);
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the navigation handler with the PluginRegistry
 */
export function registerNavigationPlugin(): void {
    const plugin = new NavigationPlugin();
    plugin.register();
}

/**
 * Create a navigation action configuration
 * @param title The title to display on the button
 * @param icon The icon to display on the button
 * @param path The path to navigate to
 * @param target Optional target for the navigation
 * @returns A navigation action configuration
 */
export function createNavigationAction(
    title: string,
    icon: string,
    path: string,
    target?: '_blank' | '_self'
): NavigationActionConfig {
    return {
        actionId: NAVIGATION_ACTION,
        title,
        icon,
        path,
        target
    };
}

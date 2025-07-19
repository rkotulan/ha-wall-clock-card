import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import {NAVIGATION_ACTION, NavigationActionConfig} from "./types";

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
    readonly editorTag = 'navigation-editor-plugin';

    defaultActionConfig(): NavigationActionConfig {
        return {
            actionId: NAVIGATION_ACTION,
            title: 'Navigate',
            icon: this.icon,
            path: '/'
        };
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

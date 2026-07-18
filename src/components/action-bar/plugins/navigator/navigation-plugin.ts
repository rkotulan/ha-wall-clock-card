import { navigate } from 'custom-card-helpers';
import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import {NAVIGATION_ACTION, NavigationActionConfig} from "./types";

/**
 * Handler for navigation actions
 * @param action The navigation action configuration
 * @param _hass The Home Assistant instance (unused)
 * @param element Optional HTML element that triggered the action
 */
export const navigationHandler: ActionHandler<NavigationActionConfig> = (action, _hass, element) => {
    // Get the path and target from the action configuration
    const { path, target } = action;

    if (target === '_blank') {
        // Open in a new tab/window
        window.open(path, '_blank');
        return;
    }

    // Use Home Assistant's navigate() helper for in-app navigation. Unlike a raw
    // history.pushState + non-bubbling Event, navigate() fires a bubbling,
    // composed `location-changed` event that the HA router listens for, so all
    // routes work (e.g. /config, /history, /logbook), not just dashboard views.
    navigate(element || document.body, path);
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

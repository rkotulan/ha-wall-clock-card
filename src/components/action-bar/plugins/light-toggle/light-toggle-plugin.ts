import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {LightToggleActionConfig} from "./types";

/**
 * Light Toggle plugin for the action bar
 * This plugin provides a way to toggle a light on button press
 */

// Define the action type
export const LIGHT_TOGGLE_ACTION = 'light-toggle';

/**
 * Handler for light toggle actions
 * @param action The light toggle action configuration
 * @param hass The Home Assistant instance
 */
export const lightToggleHandler: ActionHandler<LightToggleActionConfig> = (action, hass) => {
    const {entity_id} = action;

    if (!entity_id) {
        console.warn('No entity_id specified for light toggle action');
        return;
    }

    // Get the current state of the light
    const state = hass.states[entity_id];
    if (!state) {
        console.warn(`Entity ${entity_id} not found`);
        return;
    }

    // Call the light.toggle service
    hass.callService('light', 'toggle', {entity_id});
};

/**
 * Light Toggle Plugin class that implements the ActionPlugin interface
 */
export class LightTogglePlugin implements ActionPlugin<LightToggleActionConfig> {
    readonly actionId = LIGHT_TOGGLE_ACTION;
    readonly name = 'Toggle Light';
    readonly description = 'Toggle a light on or off';
    readonly icon = 'mdi:lightbulb';
    readonly handler: ActionHandler<LightToggleActionConfig> = lightToggleHandler;

    readonly editorTag = 'light-toggle-editor-plugin';

    /**
     * Get the appropriate icon based on the light state
     * @param action The light toggle action configuration
     * @param hass The Home Assistant instance
     * @returns The icon to use
     */
    getIconForState(action: LightToggleActionConfig, hass: any): string {
        const {entity_id} = action;

        // If no entity_id is specified, use the default icon
        if (!entity_id) {
            return action.icon || this.icon;
        }

        // Get the current state of the light
        const state = hass.states[entity_id];
        if (!state) {
            return action.icon || this.icon;
        }

        // Store the active state in a separate property that we'll check later
        this._lastActiveState = state.state === 'on';

        // Use the appropriate icon based on the state
        if (this._lastActiveState) {
            return action.icon_on || this.icon;
        } else {
            return action.icon || this.icon;
        }
    }

    // Property to store the last active state
    private _lastActiveState: boolean = false;

    /**
     * Get the active state of the last checked light
     * @returns Whether the light is active (on)
     */
    getActiveState(): boolean {
        return this._lastActiveState;
    }

    defaultActionConfig(): LightToggleActionConfig {
        return {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: '',
            title: 'Toggle Light',
            icon: this.icon,
            icon_on: 'mdi:lightbulb-on'
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the light toggle handler with the PluginRegistry
 */
export function registerLightTogglePlugin(): void {
    const plugin = new LightTogglePlugin();
    plugin.register();
}

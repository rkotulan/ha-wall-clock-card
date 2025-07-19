import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {SwitchToggleActionConfig} from "./types";

/**
 * Switch Toggle plugin for the action bar
 * This plugin provides a way to toggle a switch on button press
 */

// Define the action type
export const SWITCH_TOGGLE_ACTION = 'switch-toggle';

/**
 * Handler for switch toggle actions
 * @param action The switch toggle action configuration
 * @param hass The Home Assistant instance
 */
export const switchToggleHandler: ActionHandler<SwitchToggleActionConfig> = (action, hass) => {
    const {entity_id} = action;

    if (!entity_id) {
        console.warn('No entity_id specified for switch toggle action');
        return;
    }

    // Get the current state of the switch
    const state = hass.states[entity_id];
    if (!state) {
        console.warn(`Entity ${entity_id} not found`);
        return;
    }

    // Call the switch.toggle service
    hass.callService('switch', 'toggle', {entity_id});
};

/**
 * Switch Toggle Plugin class that implements the ActionPlugin interface
 */
export class SwitchTogglePlugin implements ActionPlugin<SwitchToggleActionConfig> {
    readonly actionId = SWITCH_TOGGLE_ACTION;
    readonly name = 'Toggle Switch';
    readonly description = 'Toggle a switch on or off';
    readonly icon = 'mdi:toggle-switch-variant-off';
    readonly handler: ActionHandler<SwitchToggleActionConfig> = switchToggleHandler;

    readonly editorTag = 'switch-toggle-editor-plugin';

    /**
     * Get the appropriate icon based on the switch state
     * @param action The switch toggle action configuration
     * @param hass The Home Assistant instance
     * @returns The icon to use
     */
    getIconForState(action: SwitchToggleActionConfig, hass: any): string {
        const {entity_id} = action;

        // If no entity_id is specified, use the default icon
        if (!entity_id) {
            return action.icon || this.icon;
        }

        // Get the current state of the switch
        const state = hass.states[entity_id];
        if (!state) {
            return action.icon || this.icon;
        }

        // Store the active state in a separate property that we'll check later
        this._lastActiveState = state.state === 'on';

        // Use the appropriate icon based on the state
        if (this._lastActiveState) {
            return action.icon_on || 'mdi:toggle-switch-on';
        } else {
            return action.icon || this.icon;
        }
    }

    // Property to store the last active state
    private _lastActiveState: boolean = false;

    /**
     * Get the active state of the last checked switch
     * @returns Whether the switch is active (on)
     */
    getActiveState(): boolean {
        return this._lastActiveState;
    }

    defaultActionConfig(): SwitchToggleActionConfig {
        return {
            actionId: SWITCH_TOGGLE_ACTION,
            entity_id: '',
            title: 'Toggle Switch',
            icon: this.icon,
            icon_on: 'mdi:toggle-switch-variant'
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the switch toggle handler with the PluginRegistry
 */
export function registerSwitchTogglePlugin(): void {
    const plugin = new SwitchTogglePlugin();
    plugin.register();
}
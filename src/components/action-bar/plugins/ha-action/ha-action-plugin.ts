import { handleAction } from 'custom-card-helpers';
import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { HA_ACTION, HaActionConfig } from './types';

/**
 * Handler for Home Assistant standard actions.
 *
 * Delegates to HA's handleAction() so navigate / call-service / more-info / url /
 * toggle behave exactly like they do in native HA cards. The entity (used by
 * more-info and toggle) is passed at the top level, as handleAction expects.
 *
 * @param action The HA action configuration
 * @param hass The Home Assistant instance
 * @param element Optional HTML element that triggered the action
 */
export const haActionHandler: ActionHandler<HaActionConfig> = (action, hass, element) => {
    handleAction(
        element || document.body,
        hass,
        {
            entity: action.entity,
            tap_action: action.tap_action,
        },
        'tap'
    );
};

/**
 * HA Action Plugin class that implements the ActionPlugin interface
 */
export class HaActionPlugin implements ActionPlugin<HaActionConfig> {
    readonly actionId = HA_ACTION;
    readonly name = 'Home Assistant Action';
    readonly description = 'Run a standard Home Assistant action (navigate, call service, more info, url, toggle)';
    readonly icon = 'mdi:gesture-tap';
    readonly handler: ActionHandler<HaActionConfig> = haActionHandler;
    readonly editorTag = 'ha-action-editor-plugin';

    defaultActionConfig(): HaActionConfig {
        return {
            actionId: HA_ACTION,
            title: 'Action',
            icon: this.icon,
            tap_action: { action: 'navigate', navigation_path: '/config' },
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the HA action handler with the PluginRegistry
 */
export function registerHaActionPlugin(): void {
    const plugin = new HaActionPlugin();
    plugin.register();
}

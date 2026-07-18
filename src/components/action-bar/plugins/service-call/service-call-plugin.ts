import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {ServiceCallActionConfig} from "./types";
import {handleAction} from 'custom-card-helpers';

/**
 * Service Call plugin for the action bar
 * This plugin provides a way to call Home Assistant services on button press
 */

// Use the built-in call service action type from ACTION_TYPE
export const SERVICE_CALL_ACTION = 'call-service';


/**
 * Handler for service call actions
 * @param action The service call action configuration
 * @param hass The Home Assistant instance
 * @param element Optional HTML element that triggered the action
 */
export const serviceCallHandler: ActionHandler<ServiceCallActionConfig> = (action, hass, element) => {
    const {service, service_data, target, confirmation, confirmation_text} = action;

    // Route through HA's standard action handling; confirmation uses HA's
    // native confirm dialog instead of window.confirm.
    handleAction(element || document.body, hass, {
        tap_action: {
            action: 'call-service',
            service: service,
            service_data: service_data,
            target: target,
            confirmation: confirmation
                ? {text: confirmation_text || `Are you sure you want to call ${service}?`}
                : undefined,
        }
    } as any, 'tap');
};

/**
 * Service Call Plugin class that implements the ActionPlugin interface
 */
export class ServiceCallPlugin implements ActionPlugin<ServiceCallActionConfig> {
    readonly actionId = SERVICE_CALL_ACTION;
    readonly name = 'Call Service';
    readonly description = 'Call a Home Assistant service';
    readonly icon = 'mdi:lightbulb';
    readonly handler: ActionHandler<ServiceCallActionConfig> = serviceCallHandler;

    readonly editorTag = 'service-call-editor-plugin';

    defaultActionConfig(): ServiceCallActionConfig {
        return {
            actionId: SERVICE_CALL_ACTION,
            service: 'light.toggle',
            service_data: {entity_id: 'light.living_room'},
            title: 'Toggle Light',
            icon: this.icon
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the service call handler with the PluginRegistry
 */
export function registerServiceCallPlugin(): void {
    const plugin = new ServiceCallPlugin();
    plugin.register();
}

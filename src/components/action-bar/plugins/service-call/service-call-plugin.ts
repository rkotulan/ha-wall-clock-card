import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {ServiceCallActionConfig} from "./types";

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
 */
export const serviceCallHandler: ActionHandler<ServiceCallActionConfig> = (action, hass) => {
    // Get the service and service_data from the action configuration
    const {service, service_data, confirmation, confirmation_text} = action;

    // If confirmation is required, show a confirmation dialog
    if (confirmation) {
        const message = confirmation_text || `Are you sure you want to call ${service}?`;
        if (!confirm(message)) {
            return;
        }
    }

    // Split the service string into domain and service
    const [domain, serviceMethod] = service.split('.');

    // Call the service
    hass.callService(domain, serviceMethod, service_data);
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

import { ActionHandler, ModuleActionConfig, ACTION_TYPE } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';

/**
 * Service Call plugin for the action bar
 * This plugin provides a way to call Home Assistant services on button press
 */

// Use the built-in call service action type from ACTION_TYPE
export const SERVICE_CALL_ACTION = ACTION_TYPE.CALL_SERVICE;

/**
 * Configuration for a service call action
 */
export interface ServiceCallActionConfig extends ModuleActionConfig {
    actionId: typeof SERVICE_CALL_ACTION;
    service: string;
    service_data?: Record<string, any>;
    confirmation?: boolean;
    confirmation_text?: string;
}

/**
 * Handler for service call actions
 * @param action The service call action configuration
 * @param hass The Home Assistant instance
 */
export const serviceCallHandler: ActionHandler<ServiceCallActionConfig> = (action, hass) => {
    // Get the service and service_data from the action configuration
    const { service, service_data, confirmation, confirmation_text } = action;

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
    readonly icon = 'mdi:flash';
    readonly handler: ActionHandler<ServiceCallActionConfig> = serviceCallHandler;

    readonly editorComponent = 'service-call-editor-plugin';

    createActionConfig(
        title: string,
        icon: string,
        service: string,
        service_data?: Record<string, any>,
        confirmation?: boolean,
        confirmation_text?: string
    ): ServiceCallActionConfig {
        return createServiceCallAction(title, icon, service, service_data, confirmation, confirmation_text);
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

/**
 * Create a service call action configuration
 * @param title The title to display on the button
 * @param icon The icon to display on the button
 * @param service The service to call (format: domain.service)
 * @param service_data Optional data to pass to the service
 * @param confirmation Optional flag to show a confirmation dialog
 * @param confirmation_text Optional custom confirmation message
 * @returns A service call action configuration
 */
export function createServiceCallAction(
    title: string,
    icon: string,
    service: string,
    service_data?: Record<string, any>,
    confirmation?: boolean,
    confirmation_text?: string
): ServiceCallActionConfig {
    return {
        actionId: SERVICE_CALL_ACTION,
        title,
        icon,
        service,
        service_data,
        confirmation,
        confirmation_text
    };
}

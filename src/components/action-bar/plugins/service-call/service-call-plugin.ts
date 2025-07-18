import { ActionHandler, ModuleActionConfig, ACTION_TYPE } from '../../types';
import { ActionRegistry } from '../../types';

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
    type: typeof SERVICE_CALL_ACTION;
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
 * Register the service call handler with the ActionRegistry
 */
export function registerServiceCallPlugin(): void {
    const registry = ActionRegistry.getInstance();
    registry.registerHandler<ServiceCallActionConfig>(SERVICE_CALL_ACTION, serviceCallHandler);
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
        type: SERVICE_CALL_ACTION,
        title,
        icon,
        service,
        service_data,
        confirmation,
        confirmation_text
    };
}
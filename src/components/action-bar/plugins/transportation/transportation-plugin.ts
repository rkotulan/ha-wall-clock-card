import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { TransportationActionConfig, TRANSPORTATION_ACTION } from './types';
import { TransportationComponent } from '../../../../components/transportation';
import { createLogger, findComponentInDocument } from '../../../../utils';

/**
 * Transportation plugin for the action bar
 * This plugin provides a way to show transportation information on button press
 */

// Create a logger instance
const logger = createLogger('transportation-plugin');

/**
 * Handler for transportation actions
 * @param action The transportation action configuration
 * @param hass The Home Assistant instance
 */
export const transportationHandler: ActionHandler<TransportationActionConfig> = (_action, _hass) => {
    // Try to find the card element using the utility function
    const card = findComponentInDocument('wall-clock-card');

    if (!card) {
        logger.warn('Wall Clock Card not found');
        return;
    }

    // Access the transportation component from the card
    // @ts-ignore - Accessing private property
    const transportationComponent = card.transportationComponent as TransportationComponent;
    if (!transportationComponent) {
        logger.warn('Transportation component not found');
        return;
    }

    // Access the action bar component from the card
    // @ts-ignore - Accessing private property
    const actionBarComponent = card.actionBarComponent;
    if (!actionBarComponent) {
        logger.warn('Action bar component not found');
    } else {
        logger.info('Triggering transportation display');
        // Request an update to ensure UI is updated immediately
        actionBarComponent.requestUpdate();
    }

    // Trigger transportation display
    transportationComponent.controller.handleTransportationClick()
        .then(() => {
            logger.info('Transportation display triggered successfully');
        })
        .catch((error) => {
            logger.error('Error triggering transportation display:', error);
        });
};

/**
 * Transportation Plugin class that implements the ActionPlugin interface
 */
export class TransportationPlugin implements ActionPlugin<TransportationActionConfig> {
    readonly actionId = TRANSPORTATION_ACTION;
    readonly name = 'Show Transportation';
    readonly description = 'Show transportation information';
    readonly icon = 'mdi:bus';
    readonly handler: ActionHandler<TransportationActionConfig> = transportationHandler;

    // No editor needed for now
    readonly editorTag = '';

    defaultActionConfig(): TransportationActionConfig {
        return {
            actionId: TRANSPORTATION_ACTION,
            title: 'Transportation',
            icon: this.icon
        };
    }

    /**
     * Check if the plugin should be available
     * Only show if transportation is enabled
     */
    isAvailable(): boolean {
        // Try to find the card element
        const card = findComponentInDocument('wall-clock-card');
        if (!card) {
            return false;
        }

        // @ts-ignore - Accessing private property
        const transportationComponent = card.transportationComponent as TransportationComponent;
        if (!transportationComponent) {
            return false;
        }

        // Check if transportation is enabled in the configuration
        return transportationComponent.controller.isTransportationEnabled;
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the transportation handler with the PluginRegistry
 */
export function registerTransportationPlugin(): void {
    const plugin = new TransportationPlugin();
    plugin.register();
}

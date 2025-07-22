import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { TransportationActionConfig, TRANSPORTATION_ACTION } from './types';
import {createLogger, Messenger, ShowTransportationMessage} from '../../../../utils';

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
    logger.info('Transportation clicked');

    Messenger.getInstance().publish(new ShowTransportationMessage());
};

/**
 * Transportation Plugin class that implements the ActionPlugin interface
 */
export class TransportationPlugin implements ActionPlugin<TransportationActionConfig> {
    readonly actionId = TRANSPORTATION_ACTION;
    readonly name = 'Transportation';
    readonly description = 'Show transportation information';
    readonly icon = 'mdi:bus-clock';
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

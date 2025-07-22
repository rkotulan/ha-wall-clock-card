import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { BackgroundNextActionConfig, BACKGROUND_NEXT_ACTION } from './types';
import { createLogger, FetchNextImageMessage, Messenger } from '../../../../utils';

/**
 * Background Next plugin for the action bar
 * This plugin provides a way to change to the next background image on button press
 */

// Create a logger instance
const logger = createLogger('background-next-plugin');

/**
 * Handler for background next actions
 * @param _action The background next action configuration
 * @param _hass The Home Assistant instance
 */
export const backgroundNextHandler: ActionHandler<BackgroundNextActionConfig> = (_action, _hass) => {
    logger.info('Background next clicked');
    Messenger.getInstance().publish(new FetchNextImageMessage());
};

/**
 * Background Next Plugin class that implements the ActionPlugin interface
 */
export class BackgroundNextPlugin implements ActionPlugin<BackgroundNextActionConfig> {
    readonly actionId = BACKGROUND_NEXT_ACTION;
    readonly name = 'Next Background';
    readonly description = 'Show next background image';
    readonly icon = 'mdi:image-refresh';
    readonly handler: ActionHandler<BackgroundNextActionConfig> = backgroundNextHandler;

    // No editor needed for now
    readonly editorTag = '';

    defaultActionConfig(): BackgroundNextActionConfig {
        return {
            actionId: BACKGROUND_NEXT_ACTION,
            title: 'Next Background',
            icon: this.icon
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the background next handler with the PluginRegistry
 */
export function registerBackgroundNextPlugin(): void {
    const plugin = new BackgroundNextPlugin();
    plugin.register();
}
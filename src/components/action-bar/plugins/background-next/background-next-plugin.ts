import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { BackgroundNextActionConfig, BACKGROUND_NEXT_ACTION } from './types';
import { BackgroundImageComponent } from '../../../../components/background-image';
import { createLogger, findComponentInDocument } from '../../../../utils';

/**
 * Background Next plugin for the action bar
 * This plugin provides a way to change to the next background image on button press
 */

// Create a logger instance
const logger = createLogger('background-next-plugin');

/**
 * Handler for background next actions
 * @param action The background next action configuration
 * @param hass The Home Assistant instance
 */
export const backgroundNextHandler: ActionHandler<BackgroundNextActionConfig> = (_action, _hass) => {
    // Try to find the card element using the utility function
    const card = findComponentInDocument('wall-clock-card');

    if (!card) {
        logger.warn('Wall Clock Card not found');
        return;
    }

    // Access the background image component from the card
    // @ts-ignore - Accessing private property
    const backgroundImageComponent = card.backgroundImageComponent as BackgroundImageComponent;
    if (!backgroundImageComponent) {
        logger.warn('Background image component not found');
        return;
    }

    // Trigger next background image
    backgroundImageComponent.controller.fetchNextImageAsync()
        .then(() => {
            logger.info('Next background image triggered successfully');
        })
        .catch((error) => {
            logger.error('Error triggering next background image:', error);
        });
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

    /**
     * Check if the plugin should be available
     * Only show if background image is enabled
     */
    isAvailable(): boolean {
        // Try to find the card element
        const card = findComponentInDocument('wall-clock-card');
        if (!card) {
            return false;
        }

        // @ts-ignore - Accessing private property
        const backgroundImageComponent = card.backgroundImageComponent as BackgroundImageComponent;
        if (!backgroundImageComponent) {
            return false;
        }

        // Check if background image is initialized
        return backgroundImageComponent.controller.isInitialized;
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
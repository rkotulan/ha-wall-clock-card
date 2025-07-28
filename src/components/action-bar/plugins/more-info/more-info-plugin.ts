import { ActionHandler } from '../../types';
import { registerPlugin, ActionPlugin } from '../../plugin-registry';
import { MORE_INFO_ACTION, MoreInfoActionConfig } from "./types";
import { fireEvent } from 'custom-card-helpers';
import { createLogger } from '../../../../utils/logger';

const logger = createLogger('more-info-plugin');

/**
 * Handler for more-info actions
 * @param action The more-info action configuration
 * @param hass The Home Assistant instance
 * @param element Optional HTML element that triggered the action
 */
export const moreInfoHandler: ActionHandler<MoreInfoActionConfig> = (action, hass, element) => {
    // Get the entity_id from the action configuration
    const { entity_id } = action;

    if (!entity_id) {
        logger.warn('No entity_id specified for more-info action');
        return;
    }

    // Check if the entity exists
    const state = hass.states[entity_id];
    if (!state) {
        logger.warn(`Entity ${entity_id} not found`);
        return;
    }

    logger.info(`Opening more-info for entity ${entity_id} (${state.entity_id})`)

    // Method 1: Use the fireEvent method with hass-more-info event
    // This is the standard way to open entity modal windows in Home Assistant
    try {
        // Use type assertion to include the view property while satisfying TypeScript
        const eventDetail = { entityId: entity_id, view: 'info' } as any;
        // Use the provided element if available, otherwise fall back to document.body
        fireEvent(element || document.body, 'hass-more-info', eventDetail);
    } catch (e) {
        logger.warn('Error using fireEvent method:', e);
    }
};

/**
 * More Info Plugin class that implements the ActionPlugin interface
 */
export class MoreInfoPlugin implements ActionPlugin<MoreInfoActionConfig> {
    readonly actionId = MORE_INFO_ACTION;
    readonly name = 'Entity More Info';
    readonly description = 'Open the default modal window of an entity';
    readonly icon = 'mdi:information-outline';
    readonly handler: ActionHandler<MoreInfoActionConfig> = moreInfoHandler;
    readonly editorTag = 'more-info-editor-plugin';

    defaultActionConfig(): MoreInfoActionConfig {
        return {
            actionId: MORE_INFO_ACTION,
            title: 'More Info',
            icon: this.icon,
            entity_id: ''
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the more-info handler with the PluginRegistry
 */
export function registerMoreInfoPlugin(): void {
    const plugin = new MoreInfoPlugin();
    plugin.register();
}

/**
 * Create a more-info action configuration
 * @param title The title to display on the button
 * @param icon The icon to display on the button
 * @param entity_id The entity ID to show more info for
 * @returns A more-info action configuration
 */
export function createMoreInfoAction(
    title: string,
    icon: string,
    entity_id: string
): MoreInfoActionConfig {
    return {
        actionId: MORE_INFO_ACTION,
        title,
        icon,
        entity_id
    };
}

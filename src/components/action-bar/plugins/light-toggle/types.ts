import {ModuleActionConfig} from '../../types';

/**
 * Configuration for a light toggle action
 */
export interface LightToggleActionConfig extends ModuleActionConfig {
    /**
     * The entity ID of the light to toggle
     */
    entity_id: string;

    /**
     * The icon to use when the light is on
     * If not provided, a default icon will be used
     */
    icon_on?: string;
}

import {ModuleActionConfig} from '../../types';

/**
 * Configuration for a switch toggle action
 */
export interface SwitchToggleActionConfig extends ModuleActionConfig {
    /**
     * The entity ID of the switch to toggle
     */
    entity_id: string;

    /**
     * The icon to use when the switch is on
     * If not provided, a default icon will be used
     */
    icon_on?: string;
}
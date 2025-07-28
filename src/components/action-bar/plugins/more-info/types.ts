import {ModuleActionConfig} from '../../types';

// Action type for opening entity more-info modal
export const MORE_INFO_ACTION = 'action-more-info';

/**
 * Configuration for a more-info action
 */
export interface MoreInfoActionConfig extends ModuleActionConfig {
    /**
     * The entity ID to show more info for
     */
    entity_id: string;
}
import { BaseActionConfig, ACTION_TYPE } from '../../types';

/**
 * Configuration for a navigation action
 */
export interface NavigateActionConfig extends BaseActionConfig {
    actionId: typeof ACTION_TYPE.NAVIGATE;
    path: string;
}

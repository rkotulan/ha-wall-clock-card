import { BaseActionConfig, ACTION_TYPE } from '../../types';

/**
 * Configuration for a service call action
 */
export interface CallServiceActionConfig extends BaseActionConfig {
    actionId: typeof ACTION_TYPE.CALL_SERVICE;
    service: string;
    service_data?: Record<string, any>;
}

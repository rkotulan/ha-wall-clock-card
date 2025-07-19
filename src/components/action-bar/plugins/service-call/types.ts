import {ModuleActionConfig} from '../../types';


/**
 * Configuration for a service call action
 */
export interface ServiceCallActionConfig extends ModuleActionConfig {
    service: string;
    service_data?: Record<string, any>;
    confirmation?: boolean;
    confirmation_text?: string;
}
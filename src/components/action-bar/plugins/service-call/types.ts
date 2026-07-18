import {ModuleActionConfig} from '../../types';


/**
 * Configuration for a service call action
 */
export interface ServiceCallActionConfig extends ModuleActionConfig {
    service: string;
    service_data?: Record<string, any>;
    /** Ask for confirmation (HA native dialog) before calling the service */
    confirmation?: boolean;
    confirmation_text?: string;
}

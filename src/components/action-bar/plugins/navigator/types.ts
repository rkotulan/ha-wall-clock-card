import {ModuleActionConfig} from '../../types';


// Use the built-in navigation action type from ACTION_TYPE
// This is preferred over defining a new constant for built-in action types
export const NAVIGATION_ACTION = 'action-navigate';

/**
 * Configuration for a navigation action
 */
export interface NavigationActionConfig extends ModuleActionConfig {
    path: string;
    target?: '_blank' | '_self'; // Optional target for the navigation
}
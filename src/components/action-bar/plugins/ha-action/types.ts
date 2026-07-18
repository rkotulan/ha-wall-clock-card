import { ActionConfig } from 'custom-card-helpers';
import { ModuleActionConfig } from '../../types';

// Action type for a standard Home Assistant action executed via handleAction()
export const HA_ACTION = 'action-ha';

/**
 * Configuration for a Home Assistant standard action.
 *
 * Wraps the standard HA `tap_action` (ActionConfig) so the action bar can run
 * any native HA action — navigate, call-service, more-info, url, toggle — using
 * the same handleAction() implementation HA's own cards use.
 */
export interface HaActionConfig extends ModuleActionConfig {
    /**
     * Entity id used by the `more-info` and `toggle` actions.
     * (HA's handleAction reads the entity from the top-level config, not from
     * tap_action.)
     */
    entity?: string;

    /**
     * The standard Home Assistant action to run on tap.
     */
    tap_action?: ActionConfig;
}

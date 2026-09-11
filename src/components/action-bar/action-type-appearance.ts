import type {ModuleActionConfig} from './types';
import type {ActionPlugin} from './plugin-registry';

type AppearancePlugin = Pick<ActionPlugin<ModuleActionConfig>, 'name' | 'icon' | 'defaultActionConfig'>;

/** Update automatic appearance fields independently, preserving custom values. */
export function changeActionTypeAppearance(
    action: ModuleActionConfig,
    actionId: string,
    previousPlugin?: AppearancePlugin,
    nextPlugin?: AppearancePlugin,
    previousLabel?: string,
    nextLabel?: string,
): ModuleActionConfig {
    if (action.actionId === actionId) return action;
    const updated = {...action, actionId};
    if (!nextPlugin) return updated;

    const previousDefaults = previousPlugin?.defaultActionConfig();
    const nextDefaults = nextPlugin.defaultActionConfig();
    const defaultTitles = [previousDefaults?.title, previousPlugin?.name, previousLabel];
    const defaultIcons = [previousDefaults?.icon, previousPlugin?.icon];

    if (!action.title?.trim() || defaultTitles.includes(action.title)) {
        updated.title = nextLabel || nextPlugin.name;
    }
    if (!action.icon?.trim() || defaultIcons.includes(action.icon)) {
        updated.icon = nextDefaults.icon || nextPlugin.icon || action.icon;
    }
    return updated;
}

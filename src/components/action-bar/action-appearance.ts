import type {ModuleActionConfig} from './types';

export interface ActionAppearance {
    icon: string;
    color?: string;
}

/** Appearance never mutates action config or changes gesture targets. */
export function resolveActionAppearance(
    action: ModuleActionConfig,
    states: Record<string, {state: string}> | undefined,
    fallback: ActionAppearance
): ActionAppearance {
    if (!action.stateEntity || !states || !Array.isArray(action.stateRules)) return fallback;
    // A removed/missing entity must not retain its last known appearance.
    const state = states[action.stateEntity]?.state ?? 'unavailable';
    const rule = action.stateRules.find(rule => rule && rule.state !== '' && rule.state === state);
    if (!rule) return fallback;
    return {
        icon: rule.icon || fallback.icon,
        color: rule.color || fallback.color,
    };
}

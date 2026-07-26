export type LayoutAutosaveTrigger = 'timer' | 'focusout' | 'commit';

export interface LayoutAutosaveContext {
    textEditPending: boolean;
    explicitDesignerOpen: boolean;
}

/**
 * Home Assistant recreates a card after saveConfig().
 *
 * Panel placements can tolerate that recreation because their designer opens
 * automatically. The promoted designer used by every other placement cannot:
 * recreation would close it and return the user to the dashboard. Keep those
 * changes local until the designer's Done action commits the complete session.
 */
export function shouldDeferLayoutAutosave(
    trigger: LayoutAutosaveTrigger,
    context: LayoutAutosaveContext,
): boolean {
    if (trigger === 'commit') {
        return false;
    }
    if (context.explicitDesignerOpen) {
        return true;
    }
    return trigger === 'timer' && context.textEditPending;
}

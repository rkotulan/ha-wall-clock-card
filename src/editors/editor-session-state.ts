/**
 * Transient editor state that must survive Home Assistant recreating the card
 * after autosave, but must be discarded when the dashboard edit session ends.
 */
const editorSessionState = new Map<string, Map<string, unknown>>();

interface EditorAccordionState {
    expandedIndex: number | null;
}

export function getEditorSessionState<T>(
    sessionKey: string | undefined,
    stateKey: string,
): T | undefined {
    return sessionKey
        ? editorSessionState.get(sessionKey)?.get(stateKey) as T | undefined
        : undefined;
}

export function setEditorSessionState<T>(
    sessionKey: string | undefined,
    stateKey: string,
    value: T,
): void {
    if (!sessionKey) return;
    const session = editorSessionState.get(sessionKey) ?? new Map<string, unknown>();
    session.set(stateKey, value);
    editorSessionState.set(sessionKey, session);
}

export function clearEditorSessionState(sessionKey: string | undefined): void {
    if (sessionKey) editorSessionState.delete(sessionKey);
}

/** Restores one accordion selection; missing/invalid state means fully collapsed. */
export function getEditorExpandedIndex(
    sessionKey: string | undefined,
    stateKey: string,
): number | null {
    const retained = getEditorSessionState<EditorAccordionState>(sessionKey, stateKey)?.expandedIndex;
    if (retained === null) return null;
    return typeof retained === 'number' && Number.isInteger(retained) && retained >= 0
        ? retained
        : null;
}

/** Retains a single expanded item for an editor list across HA card recreation. */
export function setEditorExpandedIndex(
    sessionKey: string | undefined,
    stateKey: string,
    expandedIndex: number | null,
): void {
    setEditorSessionState(sessionKey, stateKey, {expandedIndex} satisfies EditorAccordionState);
}

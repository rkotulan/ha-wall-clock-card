import {
    clearEditorSessionState,
    getEditorExpandedIndex,
    getEditorSessionState,
    setEditorExpandedIndex,
    setEditorSessionState,
} from '../src/editors/editor-session-state';

describe('editor session state', () => {
    it('retains transient state only inside the selected card edit session', () => {
        setEditorSessionState('card-a', 'transportation', {expanded: 2});
        setEditorSessionState('card-a', 'sensors.expansion', {sensorIndex: 1});

        expect(getEditorSessionState('card-a', 'transportation')).toEqual({expanded: 2});
        expect(getEditorSessionState('card-a', 'sensors.expansion')).toEqual({sensorIndex: 1});
        expect(getEditorSessionState('card-b', 'transportation')).toBeUndefined();

        clearEditorSessionState('card-a');
        expect(getEditorSessionState('card-a', 'transportation')).toBeUndefined();
        expect(getEditorSessionState('card-a', 'sensors.expansion')).toBeUndefined();
    });

    it('does not retain state when no session key is available', () => {
        setEditorSessionState(undefined, 'transportation', {expanded: 1});
        expect(getEditorSessionState(undefined, 'transportation')).toBeUndefined();
    });

    it('uses one collapsed-by-default accordion contract for every editor list', () => {
        expect(getEditorExpandedIndex('card-a', 'actions')).toBeNull();

        setEditorExpandedIndex('card-a', 'actions', 2);
        expect(getEditorExpandedIndex('card-a', 'actions')).toBe(2);

        setEditorExpandedIndex('card-a', 'actions', null);
        expect(getEditorExpandedIndex('card-a', 'actions')).toBeNull();
        expect(getEditorExpandedIndex('card-b', 'actions')).toBeNull();
    });
});

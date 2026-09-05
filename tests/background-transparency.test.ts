import {migrateToLayout} from '../src/core/migrate-config';
import {toBackgroundEditorConfig, fromBackgroundEditorConfig} from '../src/editors/widget-editor-adapters';

describe('background transparency', () => {
    it.each([true, false, undefined])('preserves %p through the background editor', transparent => {
        const background = {source: 'none', opacity: 0, transparent, blur: 3, grayscale: .2};
        const editor = toBackgroundEditorConfig({type: 'custom:wall-clock-card', layout: {zones: {}}, background});
        expect(editor.backgroundTransparent).toBe(transparent);
        expect(fromBackgroundEditorConfig(editor)).toEqual(background);
    });

    it('migrates explicit transparency without enabling it for existing cards', () => {
        expect(migrateToLayout({imageSource: 'none', backgroundTransparent: true}).background?.transparent).toBe(true);
        expect(migrateToLayout({imageSource: 'none', backgroundOpacity: 0}).background?.transparent).toBeUndefined();
    });
});

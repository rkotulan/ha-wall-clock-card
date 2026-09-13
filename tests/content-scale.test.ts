import {normalizeContentScale} from '../src/core/content-scale';
import {applyGeneralSetting} from '../src/editors/layout-editor-logic';
import {migrateToLayout} from '../src/core/migrate-config';

describe('content scale', () => {
    it.each([undefined, null, '', '120', NaN, Infinity, {}])('defaults invalid YAML %p to 100%', value => {
        expect(normalizeContentScale(value)).toBe(100);
    });
    it.each([[0, 50], [-20, 50], [50, 50], [120, 120], [122.5, 122.5], [200, 200], [300, 200]])(
        'bounds %p to %p percent', (input, expected) => expect(normalizeContentScale(input)).toBe(expected),
    );
    it('persists independently from explicit widget sizes and restores 100%', () => {
        const config = {layout: {zones: {center: {widgets: [{type: 'clock', clockSize: '72px'}]}}},
            appearance: {fontFamily: 'serif'}};
        const scaled = applyGeneralSetting(config, 'contentScale', 120);
        expect(scaled.appearance).toEqual({fontFamily: 'serif', contentScale: 120});
        expect(scaled.layout).toEqual(config.layout);
        expect(config.appearance).not.toHaveProperty('contentScale');
        expect(migrateToLayout(JSON.parse(JSON.stringify(scaled))).appearance?.contentScale).toBe(120);
        expect(applyGeneralSetting(scaled, 'contentScale', 100).appearance?.contentScale).toBe(100);
    });
    it('migrates the legacy editor setting into appearance', () => {
        const migrated = migrateToLayout({contentScale: 120});
        expect(migrated.appearance?.contentScale).toBe(120);
        expect(migrated).not.toHaveProperty('contentScale');
    });
});

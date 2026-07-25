import {
    layoutGridDefinition,
    layoutPanelEdge,
    layoutSplitAnchor,
    layoutSplitAxis,
    layoutSplitCanonicalZone,
    layoutSplitGroupZones,
    layoutSplitPanel,
    layoutZonePanelEdge,
    layoutZonePlacement,
    resolveLayoutFormat,
    resolveLayoutVisualPreset,
} from '../src/core/layout-format';

describe('layout formats', () => {
    it('keeps the original grid as the backwards-compatible default', () => {
        expect(resolveLayoutFormat({zones: {}})).toBe('grid-3x3');
        expect(resolveLayoutVisualPreset({zones: {}})).toBe('none');
        expect(resolveLayoutFormat({zones: {}, format: 'unknown' as never})).toBe('grid-3x3');
        expect(resolveLayoutVisualPreset({zones: {}, preset: 'unknown' as never})).toBe('none');
        expect(layoutPanelEdge('grid-3x3')).toBeUndefined();
    });

    it('defines both vertical split ratios', () => {
        expect(layoutGridDefinition('vertical-2-1').columns).toBe('minmax(0, 2fr) minmax(0, 1fr)');
        expect(layoutPanelEdge('vertical-2-1')).toBe('right');
        expect(layoutSplitAxis('vertical-2-1')).toBe('vertical');
        expect(layoutSplitPanel('vertical-2-1', 'top-left')).toBe(1);
        expect(layoutSplitPanel('vertical-2-1', 'bottom-right')).toBe(2);
        expect(layoutSplitAnchor('vertical-2-1', 'top-left')).toBe('start');
        expect(layoutSplitAnchor('vertical-2-1', 'bottom-left')).toBe('end');
        expect(layoutZonePlacement('vertical-2-1', 'center')).toMatchObject({row: 2, column: 1});
        expect(layoutZonePlacement('vertical-2-1', 'middle-right')).toMatchObject({row: 2, column: 2});

        expect(layoutGridDefinition('vertical-1-2').columns).toBe('minmax(0, 1fr) minmax(0, 2fr)');
        expect(layoutPanelEdge('vertical-1-2')).toBe('left');
        expect(layoutSplitPanel('vertical-1-2', 'middle-left')).toBe(1);
        expect(layoutSplitPanel('vertical-1-2', 'center')).toBe(2);
        expect(layoutSplitGroupZones('vertical-1-2', 2, 'start')).toEqual(['top-center', 'top-right']);
        expect(layoutSplitCanonicalZone('vertical-1-2', 2, 'start')).toBe('top-center');
        expect(layoutZonePlacement('vertical-1-2', 'middle-left')).toMatchObject({row: 2, column: 1});
        expect(layoutZonePlacement('vertical-1-2', 'center')).toMatchObject({row: 2, column: 2});
    });

    it('defines both horizontal split ratios', () => {
        expect(layoutGridDefinition('horizontal-2-1').rows).toBe('minmax(0, 2fr) minmax(0, 1fr)');
        expect(layoutPanelEdge('horizontal-2-1')).toBe('bottom');
        expect(layoutSplitAxis('horizontal-2-1')).toBe('horizontal');
        expect(layoutSplitPanel('horizontal-2-1', 'top-right')).toBe(1);
        expect(layoutSplitPanel('horizontal-2-1', 'bottom-right')).toBe(2);
        expect(layoutSplitAnchor('horizontal-2-1', 'middle-left')).toBe('start');
        expect(layoutSplitAnchor('horizontal-2-1', 'middle-right')).toBe('end');
        expect(layoutSplitGroupZones('horizontal-2-1', 1, 'center')).toEqual(['top-center', 'center']);
        expect(layoutSplitCanonicalZone('horizontal-2-1', 1, 'center')).toBe('top-center');
        expect(layoutZonePlacement('horizontal-2-1', 'center')).toMatchObject({row: 1, column: 2});
        expect(layoutZonePlacement('horizontal-2-1', 'bottom-center')).toMatchObject({row: 2, column: 2});

        expect(layoutGridDefinition('horizontal-1-2').rows).toBe('minmax(0, 1fr) minmax(0, 2fr)');
        expect(layoutPanelEdge('horizontal-1-2')).toBe('top');
        expect(layoutZonePlacement('horizontal-1-2', 'top-center')).toMatchObject({row: 1, column: 2});
        expect(layoutZonePlacement('horizontal-1-2', 'center')).toMatchObject({row: 2, column: 2});
    });

    it('does not assign split metadata to the original grid', () => {
        expect(layoutSplitAxis('grid-3x3')).toBeUndefined();
        expect(layoutSplitPanel('grid-3x3', 'center')).toBeUndefined();
        expect(layoutSplitAnchor('grid-3x3', 'center')).toBeUndefined();
        expect(layoutSplitGroupZones('grid-3x3', 1, 'center')).toEqual([]);
        expect(layoutSplitCanonicalZone('grid-3x3', 1, 'center')).toBeUndefined();
    });

    it('identifies only zones that belong to the narrow split panel', () => {
        expect(layoutZonePanelEdge('vertical-1-2', 'top-left')).toBe('left');
        expect(layoutZonePanelEdge('vertical-1-2', 'center')).toBeUndefined();
        expect(layoutZonePanelEdge('vertical-2-1', 'bottom-right')).toBe('right');
        expect(layoutZonePanelEdge('vertical-2-1', 'bottom-left')).toBeUndefined();
        expect(layoutZonePanelEdge('horizontal-1-2', 'top-center')).toBe('top');
        expect(layoutZonePanelEdge('horizontal-1-2', 'bottom-center')).toBeUndefined();
        expect(layoutZonePanelEdge('horizontal-2-1', 'bottom-right')).toBe('bottom');
        expect(layoutZonePanelEdge('grid-3x3', 'top-left')).toBeUndefined();
    });
});

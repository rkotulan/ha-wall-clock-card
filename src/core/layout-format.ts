import {
    LAYOUT_FORMATS,
    LAYOUT_VISUAL_PRESETS,
    LayoutConfig,
    LayoutFormat,
    LayoutVisualPreset,
    ZoneId,
} from './layout-types';

export interface LayoutGridDefinition {
    columns: string;
    rows: string;
}

export interface LayoutZonePlacement {
    row: number;
    column: number;
    alignSelf: 'start' | 'center' | 'end';
}

export type LayoutPanelEdge = 'left' | 'right' | 'top' | 'bottom';

export function resolveLayoutFormat(layout?: LayoutConfig): LayoutFormat {
    const format = layout?.format;
    return format && LAYOUT_FORMATS.includes(format) ? format : 'grid-3x3';
}

export function resolveLayoutVisualPreset(layout?: LayoutConfig): LayoutVisualPreset {
    const preset = layout?.preset;
    return preset && LAYOUT_VISUAL_PRESETS.includes(preset) ? preset : 'none';
}

export function layoutGridDefinition(format: LayoutFormat): LayoutGridDefinition {
    switch (format) {
        case 'vertical-2-1':
            return {
                columns: 'minmax(0, 2fr) minmax(0, 1fr)',
                rows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            };
        case 'vertical-1-2':
            return {
                columns: 'minmax(0, 1fr) minmax(0, 2fr)',
                rows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            };
        case 'horizontal-2-1':
            return {
                columns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
                rows: 'minmax(0, 2fr) minmax(0, 1fr)',
            };
        case 'horizontal-1-2':
            return {
                columns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
                rows: 'minmax(0, 1fr) minmax(0, 2fr)',
            };
        case 'grid-3x3':
        default:
            return {
                columns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
                rows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            };
    }
}

function zoneCoordinates(zoneId: ZoneId): {
    row: 'top' | 'middle' | 'bottom';
    column: 'left' | 'center' | 'right';
} {
    if (zoneId === 'center') {
        return {row: 'middle', column: 'center'};
    }
    const [row, column] = zoneId.split('-') as [
        'top' | 'middle' | 'bottom',
        'left' | 'center' | 'right',
    ];
    return {row, column};
}

/**
 * Maps the original nine anchors into the selected geometry. Split formats
 * deliberately let neighbouring anchors share a large region: the zone still
 * controls its own alignment and widgets remain independently configurable.
 */
export function layoutZonePlacement(format: LayoutFormat, zoneId: ZoneId): LayoutZonePlacement {
    const {row, column} = zoneCoordinates(zoneId);
    const verticalAlign = row === 'top' ? 'start' : row === 'bottom' ? 'end' : 'center';

    if (format === 'vertical-2-1') {
        return {
            row: row === 'top' ? 1 : row === 'middle' ? 2 : 3,
            column: column === 'right' ? 2 : 1,
            alignSelf: verticalAlign,
        };
    }
    if (format === 'vertical-1-2') {
        return {
            row: row === 'top' ? 1 : row === 'middle' ? 2 : 3,
            column: column === 'left' ? 1 : 2,
            alignSelf: verticalAlign,
        };
    }
    if (format === 'horizontal-2-1') {
        return {
            row: row === 'bottom' ? 2 : 1,
            column: column === 'left' ? 1 : column === 'center' ? 2 : 3,
            alignSelf: verticalAlign,
        };
    }
    if (format === 'horizontal-1-2') {
        return {
            row: row === 'top' ? 1 : 2,
            column: column === 'left' ? 1 : column === 'center' ? 2 : 3,
            alignSelf: verticalAlign,
        };
    }

    return {
        row: row === 'top' ? 1 : row === 'middle' ? 2 : 3,
        column: column === 'left' ? 1 : column === 'center' ? 2 : 3,
        alignSelf: verticalAlign,
    };
}

/** The narrow one-third panel used by visual presets. */
export function layoutPanelEdge(format: LayoutFormat): LayoutPanelEdge | undefined {
    switch (format) {
        case 'vertical-2-1':
            return 'right';
        case 'vertical-1-2':
            return 'left';
        case 'horizontal-2-1':
            return 'bottom';
        case 'horizontal-1-2':
            return 'top';
        default:
            return undefined;
    }
}

/**
 * Returns the physical edge of the narrow panel when the zone belongs to it.
 * Zones mapped to the large two-thirds surface return undefined.
 */
export function layoutZonePanelEdge(format: LayoutFormat, zoneId: ZoneId): LayoutPanelEdge | undefined {
    const edge = layoutPanelEdge(format);
    if (!edge) return undefined;

    const placement = layoutZonePlacement(format, zoneId);
    if (edge === 'left' && placement.column === 1) return edge;
    if (edge === 'right' && placement.column === 2) return edge;
    if (edge === 'top' && placement.row === 1) return edge;
    if (edge === 'bottom' && placement.row === 2) return edge;
    return undefined;
}

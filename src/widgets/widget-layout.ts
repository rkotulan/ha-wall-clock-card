import {
    defaultZoneAlignment,
    WidgetAlignment,
    WidgetOrientation,
    WidgetWidthMode,
    ZoneConfig,
    ZoneId,
} from '../core/layout-types';

export type ResolvedWidgetOrientation = Exclude<WidgetOrientation, 'auto'>;
export type ResolvedWidgetAlignment = Exclude<WidgetAlignment, 'auto'>;
export type ResolvedWidgetWidthMode = Exclude<WidgetWidthMode, 'auto'>;

const DEFAULT_ROW_GROW: Record<string, number> = {
    weather: 3,
    calendar: 3,
    transportation: 3,
    'action-bar': 2,
};

/** Auto keeps compact widgets intrinsic and lets information panels share the remainder. */
export function resolveWidgetWidthMode(
    type?: string,
    widthMode: WidgetWidthMode = 'auto',
): ResolvedWidgetWidthMode {
    if (widthMode !== 'auto') return widthMode;
    return type && DEFAULT_ROW_GROW[type] ? 'fill' : 'content';
}

/**
 * Recommended proportions for the common horizontal information strip.
 * An explicit positive value always wins; widgets outside the strip keep
 * their intrinsic width unless the user assigns a ratio.
 */
export function resolveWidgetRowGrow(
    type?: string,
    grow?: number,
    widthMode: WidgetWidthMode = 'auto',
): number | undefined {
    if (widthMode === 'content') return undefined;
    const explicit = Number(grow);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;
    if (widthMode === 'fill') return type ? DEFAULT_ROW_GROW[type] ?? 1 : 1;
    return type ? DEFAULT_ROW_GROW[type] : undefined;
}

/**
 * Content-sized widgets need an intrinsic width in row zones. Sensors need the
 * same treatment in center-column zones, whose grid track is content-sized:
 * their percentage-width wrapper otherwise contributes zero intrinsic width
 * and collapses the complete zone.
 */
export function requiresWidgetIntrinsicWidth(
    type: string | undefined,
    widthMode: WidgetWidthMode = 'auto',
    zoneDirection?: ZoneConfig['direction'],
    zoneId?: ZoneId,
): boolean {
    if (zoneDirection === 'row') {
        return resolveWidgetWidthMode(type, widthMode) === 'content';
    }
    return type === 'sensors' && (zoneId === 'center' || zoneId?.endsWith('-center') === true);
}

/** A row-hosted action bar defaults to a compact two-column grid. */
export function resolveActionBarColumns(columns?: number, zoneDirection?: ZoneConfig['direction']): number | undefined {
    return columns ?? (zoneDirection === 'row' ? 2 : undefined);
}

/** Widgets whose host can be width-bounded without clipping their internal layout. */
export function supportsWidgetMaxWidth(type?: string): boolean {
    return !['sensors', 'calendar'].includes(type ?? '');
}

/** Center-column zones favor a row; side columns favor a compact vertical list. */
export function resolveWidgetOrientation(
    orientation: WidgetOrientation | undefined,
    zoneId?: ZoneId,
): ResolvedWidgetOrientation {
    if (orientation && orientation !== 'auto') return orientation;
    return zoneId === 'center' || zoneId?.endsWith('-center') ? 'horizontal' : 'vertical';
}

/** Resolve the widget override, falling back to the hosting zone alignment. */
export function resolveWidgetAlignment(
    alignment: WidgetAlignment | undefined,
    zoneId?: ZoneId,
    zoneAlignment?: NonNullable<ZoneConfig['align']>,
): ResolvedWidgetAlignment {
    if (alignment && alignment !== 'auto') return alignment;
    const resolvedZoneAlignment = zoneAlignment ?? defaultZoneAlignment(zoneId);
    if (resolvedZoneAlignment === 'start') return 'left';
    if (resolvedZoneAlignment === 'end') return 'right';
    return 'center';
}

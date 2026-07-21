import {
    defaultZoneAlignment,
    WidgetAlignment,
    WidgetOrientation,
    ZoneConfig,
    ZoneId,
} from '../core/layout-types';

export type ResolvedWidgetOrientation = Exclude<WidgetOrientation, 'auto'>;
export type ResolvedWidgetAlignment = Exclude<WidgetAlignment, 'auto'>;

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

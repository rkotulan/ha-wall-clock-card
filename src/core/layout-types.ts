// Types for the 3.0 zone layout system.
// Design: docs/developer/design-3.0-zones.md

// Type-only imports from concrete files (not barrels) so that node-based Jest
// tests importing this module never pull in LitElement components.
import type {BackgroundImage, ImageSourceConfig} from '../image-sources/types';
import type {Size} from './types';

/** The nine named zones of the 3×3 layout grid. */
export type ZoneId =
    | 'top-left' | 'top-center' | 'top-right'
    | 'middle-left' | 'center' | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';

export const ZONE_IDS: ZoneId[] = [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right',
];

/** Layout of repeated items inside widgets that support it. */
export type WidgetOrientation = 'auto' | 'horizontal' | 'vertical';

/** Horizontal placement of a widget's own content. */
export type WidgetAlignment = 'auto' | 'left' | 'center' | 'right';

/**
 * Reserved for HA-style visibility conditions (state / time / user / ...).
 * The key is accepted in configs but NOT evaluated yet; evaluation lands after 3.0.0-beta.
 */
export interface WidgetCondition {
    condition: string;
    [key: string]: unknown;
}

/** Small set of safe per-widget style overrides. */
export interface WidgetStyle {
    fontSize?: string;
    /** CSS font-family value; the font itself must be available in HA/browser. */
    fontFamily?: string;
    color?: string;
    maxWidth?: string;
    maxHeight?: string;
    /** Per-instance escape hatch (CSS margin shorthand). Widgets must not ship their own outer margins. */
    margin?: string;
}

/** Common fields every widget instance shares; widget-specific keys ride along untyped. */
export interface WidgetConfig {
    /** Widget plugin id ('clock', 'weather', ...). */
    type: string;
    /** Stable key for the editor; generated when missing. */
    id?: string;
    /** Only meaningful in mode: 'exclusive' zones. */
    priority?: number;
    style?: WidgetStyle;
    /** Reserved — not evaluated yet. */
    visibility?: WidgetCondition[];
    [key: string]: unknown;
}

export interface ZoneConfig {
    widgets: WidgetConfig[];
    /**
     * 'stack' renders all widgets; 'exclusive' renders the highest-priority
     * widget whose isActive is true (generalized BottomBarManager behavior).
     */
    mode?: 'stack' | 'exclusive';
    direction?: 'column' | 'row';
    align?: 'start' | 'center' | 'end';
    /** Overrides the spacing preset's widgetGap for this zone. */
    gap?: string;
    /** Inner inset of the zone box. */
    padding?: string;
    /** CSS length translating the complete zone vertically; negative moves it up. */
    offsetY?: string;
}

/** Horizontal default follows the grid column unless the zone overrides it. */
export function defaultZoneAlignment(zoneId?: ZoneId): NonNullable<ZoneConfig['align']> {
    if (zoneId?.endsWith('-left')) return 'start';
    if (zoneId?.endsWith('-right')) return 'end';
    return 'center';
}

export type SpacingPreset = 'compact' | 'normal' | 'spacious';

export interface SpacingConfig {
    /** Inset between the card edge and the 3×3 grid. */
    padding?: string;
    /** Gap between zone tracks (rows and columns). */
    zoneGap?: string;
    /** Default gap between widgets inside every zone. */
    widgetGap?: string;
}

/** Preset values; 'normal' matches the pre-3.0 visual density. */
export const SPACING_PRESETS: Record<SpacingPreset, Required<SpacingConfig>> = {
    compact: {padding: '8px', zoneGap: '8px', widgetGap: '4px'},
    normal: {padding: '16px', zoneGap: '16px', widgetGap: '8px'},
    spacious: {padding: '32px', zoneGap: '24px', widgetGap: '16px'},
};

export interface LayoutConfig {
    zones: Partial<Record<ZoneId, ZoneConfig>>;
    spacing?: SpacingPreset | SpacingConfig;
}

/** Card-level background layer (not a widget). Groups the v2 image* keys. */
export interface BackgroundConfig {
    /** Image source plugin id ('none', 'local', 'picsum', ...). */
    source?: string;
    config?: ImageSourceConfig;
    images?: BackgroundImage[];
    opacity?: number;
    rotationInterval?: number;
    objectFit?: string;
}

/** Card-wide appearance defaults; widgets may override via WidgetStyle. */
export interface AppearanceConfig {
    fontColor?: string;
    /** Card-wide CSS font-family value inherited by widgets. */
    fontFamily?: string;
    language?: string;
    timeZone?: string;
    size?: Size;
}

/** The normalized v3 configuration shape all rendering code consumes. */
export interface WallClockConfigV3 {
    layout: LayoutConfig;
    background?: BackgroundConfig;
    appearance?: AppearanceConfig;
    logLevel?: string;
    /** Lovelace card type and any passthrough keys (e.g. grid_options). */
    [key: string]: unknown;
}

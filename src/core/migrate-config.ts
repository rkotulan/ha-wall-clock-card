// Pure v2 -> v3 configuration migration for the zone layout system.
// No DOM, no Lit, no hass access — fully unit-testable in the node Jest environment.
// Design: docs/developer/design-3.0-zones.md §5

import {createLogger} from '../utils/logger/logger';
import type {WallClockConfig} from './types';
import {
    LayoutConfig,
    SPACING_PRESETS,
    SpacingConfig,
    SpacingPreset,
    WallClockConfigV3,
    WidgetConfig,
    ZoneConfig,
    ZoneId,
} from './layout-types';

const logger = createLogger('migrate-config');

/** True when the config already uses the v3 layout shape. */
export function isV3Config(config: WallClockConfig | WallClockConfigV3): config is WallClockConfigV3 {
    return !!(config as WallClockConfigV3).layout?.zones;
}

/** Copies only the keys of `source` that are defined, so migrated configs stay minimal. */
function definedProps<T extends object>(source: T): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(source)) {
        if (value !== undefined) {
            (result as Record<string, unknown>)[key] = value;
        }
    }
    return result;
}

// v2 top-level keys that are consumed by the migration and must not ride along
// into the v3 passthrough (the rest — e.g. `type`, `grid_options` — is preserved).
const CONSUMED_V2_KEYS = [
    'timeFormat', 'dateFormat', 'sensors', 'showWeather', 'weatherProvider', 'weatherConfig',
    'weatherDisplayMode', 'weatherForecastDays', 'weatherTitle', 'weatherUpdateInterval',
    'weatherIconSet', 'transportation', 'actionBar', 'enableActionBar',
    'imageSource', 'imageConfig', 'backgroundImages', 'backgroundOpacity',
    'backgroundRotationInterval', 'objectFit',
    'fontColor', 'fontFamily', 'language', 'timeZone', 'size', 'customSizes',
];

/**
 * Migrates a legacy (v2) configuration to the v3 zone layout shape.
 * v3 configs pass through unchanged. Defaults are NOT invented here — they are
 * applied at consumption time, exactly as v2 did in applyConfig().
 *
 * Mapping (visual parity with the hard-coded v2 layout):
 *  - clock + date            -> center
 *  - sensors                 -> top-left
 *  - weather (all modes)     -> top-right
 *  - transportation (prio 10) + action-bar (prio 5) -> bottom-center, mode: exclusive
 */
export function migrateToLayout(config: WallClockConfig): WallClockConfigV3 {
    if (isV3Config(config)) {
        return config;
    }

    const zones: Partial<Record<ZoneId, ZoneConfig>> = {};
    const push = (zone: ZoneId, widget: WidgetConfig, zoneDefaults?: Partial<ZoneConfig>) => {
        const existing = zones[zone];
        if (existing) {
            existing.widgets.push(widget);
        } else {
            zones[zone] = {...zoneDefaults, widgets: [widget]};
        }
    };

    // Center: clock + date (v2 always rendered both inside ClockComponent).
    push('center', definedWidget({
        type: 'clock',
        id: 'clock',
        timeFormat: config.timeFormat,
        clockSize: config.customSizes?.clockSize,
    }));
    push('center', definedWidget({
        type: 'date',
        id: 'date',
        dateFormat: config.dateFormat,
        dateSize: config.customSizes?.dateSize,
    }));
    if (config.customSizes?.clockTopMargin) {
        logger.info(`customSizes.clockTopMargin ('${config.customSizes.clockTopMargin}') is obsolete in the zone layout and was dropped`);
    }

    // Top-left: sensors.
    if (config.sensors && config.sensors.length > 0) {
        push('top-left', definedWidget({
            type: 'sensors',
            id: 'sensors',
            sensors: config.sensors,
            labelSize: config.customSizes?.labelSize,
            valueSize: config.customSizes?.valueSize,
        }));
    }

    // Top-right: weather (current, forecast and both all rendered top-right in v2).
    if (config.showWeather) {
        push('top-right', definedWidget({
            type: 'weather',
            id: 'weather',
            provider: config.weatherProvider,
            providerConfig: config.weatherConfig,
            displayMode: config.weatherDisplayMode,
            forecastDays: config.weatherForecastDays,
            title: config.weatherTitle,
            updateInterval: config.weatherUpdateInterval,
            iconSet: config.weatherIconSet ?? config.weatherConfig?.iconSet,
            labelSize: config.customSizes?.labelSize,
            valueSize: config.customSizes?.valueSize,
        }));
    }

    // Bottom-center (exclusive): transportation (10) over action-bar (5) —
    // exactly the BottomBarManager priorities from v2.
    if (config.transportation) {
        push('bottom-center',
            definedWidget({
                type: 'transportation',
                id: 'transportation',
                ...config.transportation,
                priority: 10,
            }),
            {mode: 'exclusive'});
    }

    // Normalize the action bar exactly as v2 applyConfig() did: actionBar.enabled
    // wins; the legacy top-level enableActionBar is honored as fallback.
    const actionBarEnabled = config.actionBar?.enabled ?? (config.enableActionBar === true);
    if (actionBarEnabled) {
        push('bottom-center',
            definedWidget({
                type: 'action-bar',
                id: 'action-bar',
                actions: [],
                ...config.actionBar,
                enabled: true,
                iconSize: config.customSizes?.actionBarIconSize,
                priority: 5,
            }),
            {mode: 'exclusive'});
    }

    const background = definedProps({
        source: config.imageSource,
        config: config.imageConfig,
        images: config.backgroundImages,
        opacity: config.backgroundOpacity,
        rotationInterval: config.backgroundRotationInterval,
        objectFit: config.objectFit,
    });

    const appearance = definedProps({
        fontColor: config.fontColor,
        fontFamily: config.fontFamily,
        language: config.language,
        timeZone: config.timeZone,
        size: config.size,
    });

    const passthrough: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(config)) {
        if (!CONSUMED_V2_KEYS.includes(key) && value !== undefined) {
            passthrough[key] = value;
        }
    }

    const result: WallClockConfigV3 = {
        ...passthrough,
        layout: {zones},
    };
    if (Object.keys(background).length > 0) {
        result.background = background;
    }
    if (Object.keys(appearance).length > 0) {
        result.appearance = appearance;
    }
    return result;
}

/** Builds a WidgetConfig with undefined keys stripped (keeps migrated YAML minimal). */
function definedWidget(widget: WidgetConfig): WidgetConfig {
    return definedProps(widget) as WidgetConfig;
}

// Single CSS length ('16px', '1.5rem', '0') or a 1-4 value shorthand for padding/margin.
const CSS_LENGTH = /^(0|-?\d+(\.\d+)?(px|rem|em|%|vh|vw))$/;

function isValidCssShorthand(value: string, maxParts: number): boolean {
    const parts = value.trim().split(/\s+/);
    return parts.length >= 1 && parts.length <= maxParts && parts.every(p => CSS_LENGTH.test(p));
}

/** Validates a value exactly as resolveSpacing() will consume it. */
export function isValidSpacingValue(key: keyof SpacingConfig, value: string): boolean {
    return isValidCssShorthand(value, key === 'padding' ? 4 : 1);
}

/**
 * Resolves the effective spacing values from preset + explicit overrides.
 * Invalid CSS lengths log a warning and fall back to the preset value
 * (same "ignore invalid, don't break the card" policy as invalid tap actions).
 */
export function resolveSpacing(layout?: LayoutConfig): Required<SpacingConfig> {
    const spacing = layout?.spacing;
    const preset: SpacingPreset = typeof spacing === 'string' && spacing in SPACING_PRESETS
        ? spacing
        : 'normal';
    if (typeof spacing === 'string' && !(spacing in SPACING_PRESETS)) {
        logger.warn(`Unknown spacing preset '${spacing}', falling back to 'normal'`);
    }
    const resolved = {...SPACING_PRESETS[preset]};

    if (spacing && typeof spacing === 'object') {
        const overrides: (keyof SpacingConfig)[] = ['padding', 'zoneGap', 'widgetGap'];
        for (const key of overrides) {
            const value = spacing[key];
            if (value === undefined) continue;
            if (typeof value === 'string' && isValidSpacingValue(key, value)) {
                resolved[key] = value;
            } else {
                logger.warn(`Invalid spacing.${key} value '${value}', falling back to '${resolved[key]}'`);
            }
        }
    }
    return resolved;
}

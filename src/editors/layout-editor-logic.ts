// Pure data operations for the zone layout editor. No DOM, no Lit — fully
// unit-testable in the node Jest environment.
import {
    LayoutConfig,
    LayoutFormat,
    LayoutVisualPreset,
    SpacingConfig,
    SpacingPreset,
    WallClockConfigV3,
    WidgetConfig,
    ZoneConfig,
    ZoneId,
} from '../core/layout-types';

function clone<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
}

/** All widget ids currently used in the layout. */
export function collectWidgetIds(layout: LayoutConfig): Set<string> {
    const ids = new Set<string>();
    for (const zone of Object.values(layout.zones)) {
        zone?.widgets?.forEach(widget => {
            if (widget.id) ids.add(widget.id);
        });
    }
    return ids;
}

/** Whether a widget type is already present anywhere in the card layout. */
export function hasWidgetType(layout: LayoutConfig, type: string): boolean {
    return Object.values(layout.zones).some(zone =>
        zone?.widgets?.some(widget => widget.type === type)
    );
}

/**
 * Removes duplicate instances of singleton widget types. The canonical id
 * (`type`) wins over generated ids (`type-2`), so an accidentally added copy
 * never replaces the user's original configured widget.
 */
export function deduplicateWidgetTypes(layout: LayoutConfig, singletonTypes: Iterable<string>): LayoutConfig {
    const singleton = new Set(singletonTypes);
    const owner = new Map<string, {zone: ZoneId; index: number; canonical: boolean}>();

    for (const [zoneId, zone] of Object.entries(layout.zones) as [ZoneId, ZoneConfig | undefined][]) {
        zone?.widgets.forEach((widget, index) => {
            if (!singleton.has(widget.type)) return;
            const canonical = widget.id === widget.type;
            const current = owner.get(widget.type);
            if (!current || (canonical && !current.canonical)) {
                owner.set(widget.type, {zone: zoneId, index, canonical});
            }
        });
    }

    const result = clone(layout);
    for (const [zoneId, sourceZone] of Object.entries(layout.zones) as [ZoneId, ZoneConfig | undefined][]) {
        if (!sourceZone) continue;
        const targetZone = result.zones[zoneId];
        if (!targetZone) continue;
        targetZone.widgets = sourceZone.widgets
            .filter((widget, index) => {
                if (!singleton.has(widget.type)) return true;
                const selected = owner.get(widget.type);
                return selected?.zone === zoneId && selected.index === index;
            })
            .map(widget => clone(widget));
        if (targetZone.widgets.length === 0) delete result.zones[zoneId];
    }
    return result;
}

/** Generates a unique widget id derived from the widget type ('clock', 'clock-2', ...). */
export function uniqueWidgetId(layout: LayoutConfig, type: string): string {
    const ids = collectWidgetIds(layout);
    if (!ids.has(type)) {
        return type;
    }
    let counter = 2;
    while (ids.has(`${type}-${counter}`)) {
        counter++;
    }
    return `${type}-${counter}`;
}

/** Finds a widget by its stable editor id, regardless of its current zone/order. */
export function findWidgetById(
    layout: LayoutConfig,
    widgetId: string,
): {zone: ZoneId; index: number; widget: WidgetConfig} | undefined {
    for (const [zone, zoneConfig] of Object.entries(layout.zones) as [ZoneId, ZoneConfig | undefined][]) {
        const index = zoneConfig?.widgets.findIndex(widget => widget.id === widgetId) ?? -1;
        if (index >= 0 && zoneConfig) {
            return {zone, index, widget: zoneConfig.widgets[index]};
        }
    }
    return undefined;
}

/** Adds a widget to a zone (at `index`, or appended). Assigns a unique id. */
export function addWidget(layout: LayoutConfig, zoneId: ZoneId, widget: WidgetConfig, index?: number): LayoutConfig {
    const result = clone(layout);
    const added: WidgetConfig = {...clone(widget), id: uniqueWidgetId(layout, widget.type)};
    const zone: ZoneConfig = result.zones[zoneId] ?? {widgets: []};
    const at = index === undefined ? zone.widgets.length : Math.max(0, Math.min(index, zone.widgets.length));
    zone.widgets.splice(at, 0, added);
    result.zones[zoneId] = zone;
    return result;
}

function zoneSettings(zone?: ZoneConfig): Omit<ZoneConfig, 'widgets'> {
    if (!zone) return {};
    const {widgets: _widgets, ...settings} = zone;
    return settings;
}

function clearGroupedZoneWidgets(result: LayoutConfig, zones: ZoneId[], canonical: ZoneId): void {
    for (const zoneId of zones) {
        if (zoneId === canonical) continue;
        const zone = result.zones[zoneId];
        if (!zone) continue;
        const settings = zoneSettings(zone);
        if (Object.keys(settings).length > 0) {
            result.zones[zoneId] = {...settings, widgets: []};
        } else {
            delete result.zones[zoneId];
        }
    }
}

/**
 * Adds a widget to one physical split area. Legacy logical zones are merged
 * into their canonical zone only after this explicit editor action.
 */
export function addWidgetToZoneGroup(
    layout: LayoutConfig,
    zones: ZoneId[],
    widget: WidgetConfig,
    index?: number,
): LayoutConfig {
    const canonical = zones[0];
    if (!canonical) return clone(layout);

    const result = clone(layout);
    const owner = layout.zones[canonical] ?? zones.map(zone => layout.zones[zone]).find(Boolean);
    const widgets = zones.flatMap(zone => result.zones[zone]?.widgets ?? []);
    const added: WidgetConfig = {...clone(widget), id: uniqueWidgetId(layout, widget.type)};
    const at = index === undefined ? widgets.length : Math.max(0, Math.min(index, widgets.length));
    widgets.splice(at, 0, added);
    result.zones[canonical] = {...zoneSettings(owner), widgets};
    clearGroupedZoneWidgets(result, zones, canonical);
    return result;
}

/** Removes the widget at zone/index; empty zones are dropped from the config. */
export function removeWidget(layout: LayoutConfig, zoneId: ZoneId, index: number): LayoutConfig {
    const result = clone(layout);
    const zone = result.zones[zoneId];
    if (!zone || index < 0 || index >= zone.widgets.length) {
        return result;
    }
    zone.widgets.splice(index, 1);
    if (zone.widgets.length === 0) {
        delete result.zones[zoneId];
    }
    return result;
}

/** Moves a widget between zones (or within one); empty source zones are dropped. */
export function moveWidget(
    layout: LayoutConfig,
    fromZone: ZoneId,
    fromIndex: number,
    toZone: ZoneId,
    toIndex: number,
): LayoutConfig {
    const result = clone(layout);
    const source = result.zones[fromZone];
    if (!source || fromIndex < 0 || fromIndex >= source.widgets.length) {
        return result;
    }
    const [widget] = source.widgets.splice(fromIndex, 1);
    const target: ZoneConfig = fromZone === toZone
        ? source
        : (result.zones[toZone] ?? {widgets: []});
    const at = Math.max(0, Math.min(toIndex, target.widgets.length));
    target.widgets.splice(at, 0, widget);
    result.zones[toZone] = target;
    if (fromZone !== toZone && source.widgets.length === 0) {
        delete result.zones[fromZone];
    }
    return result;
}

/** Replaces the widget config at zone/index (id and type are preserved). */
export function updateWidgetAt(layout: LayoutConfig, zoneId: ZoneId, index: number, widget: WidgetConfig): LayoutConfig {
    const result = clone(layout);
    const zone = result.zones[zoneId];
    if (!zone || index < 0 || index >= zone.widgets.length) {
        return result;
    }
    zone.widgets[index] = {...clone(widget), type: zone.widgets[index].type, id: zone.widgets[index].id};
    return result;
}

/** Updates zone-level settings; undefined or an empty string removes the key. */
export function updateZoneSettings(
    layout: LayoutConfig,
    zoneId: ZoneId,
    settings: Partial<Omit<ZoneConfig, 'widgets'>>,
): LayoutConfig {
    const result = clone(layout);
    const zone = result.zones[zoneId] ?? {widgets: []};
    const zoneRecord = zone as unknown as Record<string, unknown>;
    for (const [key, value] of Object.entries(settings)) {
        if (value === undefined || value === '') {
            delete zoneRecord[key];
        } else {
            zoneRecord[key] = value;
        }
    }
    const hasSettings = Object.keys(zoneRecord).some(key => key !== 'widgets');
    if (zone.widgets.length > 0 || hasSettings) {
        result.zones[zoneId] = zone;
    } else {
        delete result.zones[zoneId];
    }
    return result;
}

/** Sets the layout spacing (preset name or explicit values); undefined clears it. */
export function setSpacing(layout: LayoutConfig, spacing: SpacingPreset | SpacingConfig | undefined): LayoutConfig {
    const result = clone(layout);
    if (spacing === undefined) {
        delete result.spacing;
    } else {
        result.spacing = spacing;
    }
    return result;
}

/** Sets the canvas geometry; the original grid is represented by an omitted key. */
export function setLayoutFormat(layout: LayoutConfig, format: LayoutFormat): LayoutConfig {
    const result = clone(layout);
    if (format === 'grid-3x3') {
        delete result.format;
    } else {
        result.format = format;
    }
    return result;
}

/**
 * Moves a widget into a physical split area and consolidates that area's
 * ordered widgets into its canonical zone.
 */
export function moveWidgetToZoneGroup(
    layout: LayoutConfig,
    fromZone: ZoneId,
    fromIndex: number,
    targetZones: ZoneId[],
    toIndex: number,
): LayoutConfig {
    const canonical = targetZones[0];
    const source = layout.zones[fromZone];
    if (!canonical || !source || fromIndex < 0 || fromIndex >= source.widgets.length) {
        return clone(layout);
    }

    const result = clone(layout);
    const widget = result.zones[fromZone]!.widgets[fromIndex];
    const owner = layout.zones[canonical] ?? targetZones.map(zone => layout.zones[zone]).find(Boolean);

    result.zones[fromZone]!.widgets.splice(fromIndex, 1);
    if (!targetZones.includes(fromZone) && result.zones[fromZone]!.widgets.length === 0) {
        delete result.zones[fromZone];
    }

    const widgets = targetZones.flatMap(zone => result.zones[zone]?.widgets ?? []);
    const at = Math.max(0, Math.min(toIndex, widgets.length));
    widgets.splice(at, 0, widget);
    result.zones[canonical] = {...zoneSettings(owner), widgets};
    clearGroupedZoneWidgets(result, targetZones, canonical);
    return result;
}

/** Sets a visual preset without changing widget placement or functional config. */
export function setLayoutVisualPreset(layout: LayoutConfig, preset: LayoutVisualPreset): LayoutConfig {
    const result = clone(layout);
    if (preset === 'none') {
        delete result.preset;
    } else {
        result.preset = preset;
    }
    return result;
}

/** Updates every widget of the given type with the given key/value. */
function setOnWidgetsOfType(config: WallClockConfigV3, type: string, key: string, value: unknown): void {
    for (const zone of Object.values(config.layout.zones)) {
        zone?.widgets?.forEach(widget => {
            if (widget.type === type) {
                if (value === undefined || value === '') {
                    delete widget[key];
                } else {
                    widget[key] = value;
                }
            }
        });
    }
}

/**
 * Applies a General-section setting (v2 property path) to a v3 config:
 * appearance keys move under appearance.*, customSizes.* distribute into the
 * widgets that own them, logLevel stays top-level.
 */
export function applyGeneralSetting(config: WallClockConfigV3, propertyPath: string, value: unknown): WallClockConfigV3 {
    const result = clone(config);
    switch (propertyPath) {
        case 'fontColor':
        case 'fontFamily':
        case 'textShadow':
        case 'language':
        case 'size':
            result.appearance = {...result.appearance, [propertyPath]: value};
            return result;
        case 'logLevel':
            result.logLevel = value as string;
            return result;
        case 'customSizes.clockSize':
            setOnWidgetsOfType(result, 'clock', 'clockSize', value);
            return result;
        case 'customSizes.dateSize':
            setOnWidgetsOfType(result, 'date', 'dateSize', value);
            return result;
        case 'customSizes.labelSize':
            setOnWidgetsOfType(result, 'sensors', 'labelSize', value);
            setOnWidgetsOfType(result, 'weather', 'labelSize', value);
            return result;
        case 'customSizes.valueSize':
            setOnWidgetsOfType(result, 'sensors', 'valueSize', value);
            setOnWidgetsOfType(result, 'weather', 'valueSize', value);
            return result;
        case 'customSizes.actionBarIconSize':
            setOnWidgetsOfType(result, 'action-bar', 'iconSize', value);
            return result;
        default:
            // Unknown path (e.g. obsolete customSizes.clockTopMargin): ignore.
            return result;
    }
}

// Adapters that let the existing v2 section editors (weather-editor, sensors-editor,
// ...) edit widget configs unchanged: the widget config is mapped to the v2 root
// keys the editor expects, and the editor's output is mapped back onto the widget.
// Pure data mapping — node-testable. This is the most fragile spot of the editor
// (see the design doc); keep ALL key mappings in this one file.
import {BackgroundConfig, WallClockConfigV3, WidgetConfig} from '../core/layout-types';

type EditorConfig = Record<string, unknown>;

/** Common widget fields that must survive a round-trip through an editor. */
function preservedFields(widget: WidgetConfig): Partial<WidgetConfig> {
    const preserved: Partial<WidgetConfig> = {type: widget.type};
    if (widget.id !== undefined) preserved.id = widget.id;
    if (widget.priority !== undefined) preserved.priority = widget.priority;
    if (widget.style !== undefined) preserved.style = widget.style;
    if (widget.visibility !== undefined) preserved.visibility = widget.visibility;
    return preserved;
}

function defined(obj: EditorConfig): EditorConfig {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}

/** Maps a widget config to the pseudo-v2 config shape its section editor edits. */
export function toEditorConfig(widget: WidgetConfig): EditorConfig {
    switch (widget.type) {
        case 'clock':
            return defined({timeFormat: widget.timeFormat});
        case 'date':
            return defined({dateFormat: widget.dateFormat});
        case 'sensors':
            return defined({
                sensors: widget.sensors ?? [],
                orientation: widget.orientation,
                alignment: widget.alignment,
            });
        case 'weather':
            return defined({
                showWeather: widget.enabled !== false,
                weatherProvider: widget.provider,
                weatherConfig: widget.providerConfig,
                weatherDisplayMode: widget.displayMode,
                weatherForecastDays: widget.forecastDays,
                weatherTitle: widget.title,
                weatherUpdateInterval: widget.updateInterval,
                weatherIconSet: widget.iconSet,
            });
        case 'transportation': {
            const {type, id, priority, style, visibility, ...transportation} = widget;
            return {transportation: {enabled: true, ...transportation}};
        }
        case 'action-bar':
            return {
                actionBar: defined({
                    enabled: widget.enabled ?? true,
                    actions: widget.actions ?? [],
                    alignment: widget.alignment,
                    orientation: widget.orientation,
                    backgroundOpacity: widget.backgroundOpacity,
                    buttonGap: widget.buttonGap,
                    padding: widget.padding,
                }),
            };
        default:
            // Custom widgets: their editor works on the widget config directly.
            return widget;
    }
}

/** Maps a section editor's (pseudo-v2) output back onto the widget config. */
export function fromEditorConfig(widget: WidgetConfig, editorConfig: EditorConfig): WidgetConfig {
    switch (widget.type) {
        case 'clock':
            return defined({
                ...preservedFields(widget),
                clockSize: widget.clockSize,
                timeFormat: editorConfig.timeFormat,
            }) as WidgetConfig;
        case 'date':
            return defined({
                ...preservedFields(widget),
                dateSize: widget.dateSize,
                dateFormat: editorConfig.dateFormat,
            }) as WidgetConfig;
        case 'sensors':
            return defined({
                ...preservedFields(widget),
                labelSize: widget.labelSize,
                valueSize: widget.valueSize,
                sensors: editorConfig.sensors ?? [],
                orientation: editorConfig.orientation,
                alignment: editorConfig.alignment,
            }) as WidgetConfig;
        case 'weather':
            return defined({
                ...preservedFields(widget),
                enabled: editorConfig.showWeather === false || editorConfig.weatherProvider === 'none'
                    ? false
                    : undefined,
                labelSize: widget.labelSize,
                valueSize: widget.valueSize,
                provider: editorConfig.weatherProvider,
                providerConfig: editorConfig.weatherConfig,
                displayMode: editorConfig.weatherDisplayMode,
                forecastDays: editorConfig.weatherForecastDays,
                title: editorConfig.weatherTitle,
                updateInterval: editorConfig.weatherUpdateInterval,
                iconSet: editorConfig.weatherIconSet,
            }) as WidgetConfig;
        case 'transportation': {
            if (!editorConfig.transportation) {
                return {...widget, stops: []};
            }
            const transportation = editorConfig.transportation as Record<string, unknown>;
            const {enabled, ...rest} = transportation;
            return {...preservedFields(widget), ...rest, stops: rest.stops ?? []} as WidgetConfig;
        }
        case 'action-bar': {
            const actionBar = (editorConfig.actionBar ?? {}) as Record<string, unknown>;
            return defined({
                ...preservedFields(widget),
                iconSize: widget.iconSize,
                enabled: actionBar.enabled ?? true,
                actions: actionBar.actions ?? [],
                alignment: actionBar.alignment,
                orientation: actionBar.orientation,
                backgroundOpacity: actionBar.backgroundOpacity,
                buttonGap: actionBar.buttonGap,
                padding: actionBar.padding,
            }) as WidgetConfig;
        }
        default:
            return {...(editorConfig as WidgetConfig), ...preservedFields(widget)};
    }
}

/** Maps a v3 background config to the v2 keys background-editor edits. */
export function toBackgroundEditorConfig(config: WallClockConfigV3): EditorConfig {
    const background = config.background ?? {};
    return defined({
        imageSource: background.source,
        imageConfig: background.config,
        backgroundImages: background.images,
        backgroundOpacity: background.opacity,
        backgroundRotationInterval: background.rotationInterval,
        objectFit: background.objectFit,
    });
}

/** Maps background-editor output back to the v3 background config. */
export function fromBackgroundEditorConfig(editorConfig: EditorConfig): BackgroundConfig {
    return defined({
        source: editorConfig.imageSource,
        config: editorConfig.imageConfig,
        images: editorConfig.backgroundImages,
        opacity: editorConfig.backgroundOpacity,
        rotationInterval: editorConfig.backgroundRotationInterval,
        objectFit: editorConfig.objectFit,
    }) as BackgroundConfig;
}

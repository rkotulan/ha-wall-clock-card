// Tests for the zone layout editor data operations and the editor adapters.
// Direct file imports (no barrels) — see the Jest/lit constraint.
import {
    addWidget,
    applyGeneralSetting,
    deduplicateWidgetTypes,
    findWidgetById,
    hasWidgetType,
    moveWidget,
    removeWidget,
    setSpacing,
    uniqueWidgetId,
    updateWidgetAt,
    updateZoneSettings,
} from '../src/editors/layout-editor-logic';
import {
    fromBackgroundEditorConfig,
    fromEditorConfig,
    toBackgroundEditorConfig,
    toEditorConfig,
} from '../src/editors/widget-editor-adapters';
import {defaultZoneAlignment, LayoutConfig, WallClockConfigV3} from '../src/core/layout-types';
import {TimeOfDay, Weather} from '../src/image-sources/types';
import {resolveWidgetAlignment, resolveWidgetOrientation} from '../src/widgets/widget-layout';

const layout = (): LayoutConfig => ({
    zones: {
        center: {widgets: [{type: 'clock', id: 'clock'}, {type: 'date', id: 'date'}]},
        'bottom-center': {mode: 'exclusive', widgets: [{type: 'transportation', id: 'transportation', priority: 10}]},
    },
});

describe('layout editor logic', () => {
    it('derives horizontal alignment from the zone column', () => {
        expect(defaultZoneAlignment('middle-left')).toBe('start');
        expect(defaultZoneAlignment('center')).toBe('center');
        expect(defaultZoneAlignment('top-right')).toBe('end');
    });

    it('moves a widget between zones and drops the emptied source zone', () => {
        const result = moveWidget(layout(), 'bottom-center', 0, 'top-left', 0);

        expect(result.zones['bottom-center']).toBeUndefined();
        expect(result.zones['top-left']?.widgets).toEqual([
            {type: 'transportation', id: 'transportation', priority: 10},
        ]);
    });

    it('reorders widgets within a zone and preserves the zone mode', () => {
        const result = moveWidget(layout(), 'center', 0, 'center', 1);

        expect(result.zones.center?.widgets.map(w => w.type)).toEqual(['date', 'clock']);
        expect(result.zones['bottom-center']?.mode).toBe('exclusive');
    });

    it('does not mutate the input layout', () => {
        const input = layout();
        moveWidget(input, 'center', 0, 'top-left', 0);
        removeWidget(input, 'center', 0);
        addWidget(input, 'center', {type: 'weather'});

        expect(input).toEqual(layout());
    });

    it('adds a widget with a unique generated id', () => {
        const withClock2 = addWidget(layout(), 'top-right', {type: 'clock'});

        expect(withClock2.zones['top-right']?.widgets[0].id).toBe('clock-2');
        expect(uniqueWidgetId(withClock2, 'clock')).toBe('clock-3');
        expect(uniqueWidgetId(layout(), 'weather')).toBe('weather');
    });

    it('detects widget types anywhere in the layout', () => {
        expect(hasWidgetType(layout(), 'transportation')).toBe(true);
        expect(hasWidgetType(layout(), 'weather')).toBe(false);
    });

    it('deduplicates singleton types and keeps the canonical configured instance', () => {
        const duplicated: LayoutConfig = {
            zones: {
                'top-center': {widgets: [
                    {type: 'transportation', id: 'transportation-2', stops: []},
                    {type: 'action-bar', id: 'action-bar-2', actions: []},
                ]},
                'bottom-center': {mode: 'exclusive', widgets: [
                    {type: 'transportation', id: 'transportation', stops: [{stopId: 123}]},
                    {type: 'action-bar', id: 'action-bar', actions: [{actionId: 'transportation'}]},
                ]},
            },
        };

        const result = deduplicateWidgetTypes(duplicated, ['transportation']);

        expect(result.zones['top-center']?.widgets).toEqual([
            {type: 'action-bar', id: 'action-bar-2', actions: []},
        ]);
        expect(result.zones['bottom-center']).toEqual(duplicated.zones['bottom-center']);
        expect(duplicated.zones['top-center']?.widgets).toHaveLength(2);
    });

    it('finds a selected widget by stable id after it moves', () => {
        const moved = moveWidget(layout(), 'center', 0, 'top-right', 0);

        expect(findWidgetById(moved, 'clock')).toEqual({
            zone: 'top-right',
            index: 0,
            widget: {type: 'clock', id: 'clock'},
        });
    });

    it('inserts at the requested index and clamps out-of-range indices', () => {
        const result = addWidget(layout(), 'center', {type: 'weather'}, 1);
        expect(result.zones.center?.widgets.map(w => w.type)).toEqual(['clock', 'weather', 'date']);

        const clamped = addWidget(layout(), 'center', {type: 'weather'}, 99);
        expect(clamped.zones.center?.widgets.map(w => w.type)).toEqual(['clock', 'date', 'weather']);
    });

    it('removes a widget and drops the emptied zone', () => {
        const result = removeWidget(layout(), 'bottom-center', 0);
        expect(result.zones['bottom-center']).toBeUndefined();
    });

    it('updates a widget config while preserving its id and type', () => {
        const result = updateWidgetAt(layout(), 'center', 0, {
            type: 'hacked', id: 'hacked', timeFormat: {hour12: true},
        });

        expect(result.zones.center?.widgets[0]).toEqual({
            type: 'clock', id: 'clock', timeFormat: {hour12: true},
        });
    });

    it('updates and clears zone settings', () => {
        const withGap = updateZoneSettings(layout(), 'center', {gap: '0px', mode: 'exclusive'});
        expect(withGap.zones.center?.gap).toBe('0px');
        expect(withGap.zones.center?.mode).toBe('exclusive');

        const cleared = updateZoneSettings(withGap, 'center', {gap: undefined, mode: undefined});
        expect(cleared.zones.center?.gap).toBeUndefined();
        expect(cleared.zones.center?.mode).toBeUndefined();
    });

    it('sets and clears spacing', () => {
        expect(setSpacing(layout(), 'spacious').spacing).toBe('spacious');
        expect(setSpacing(layout(), {padding: '24px'}).spacing).toEqual({padding: '24px'});
        expect(setSpacing(setSpacing(layout(), 'compact'), undefined).spacing).toBeUndefined();
    });
});

describe('widget internal layout', () => {
    it('uses horizontal auto orientation in center-column zones', () => {
        expect(resolveWidgetOrientation(undefined, 'top-center')).toBe('horizontal');
        expect(resolveWidgetOrientation('auto', 'center')).toBe('horizontal');
        expect(resolveWidgetOrientation('auto', 'bottom-center')).toBe('horizontal');
    });

    it('uses vertical auto orientation in side-column zones', () => {
        expect(resolveWidgetOrientation(undefined, 'top-left')).toBe('vertical');
        expect(resolveWidgetOrientation('auto', 'middle-right')).toBe('vertical');
        expect(resolveWidgetOrientation('horizontal', 'top-left')).toBe('horizontal');
    });

    it('resolves auto alignment from the zone and honors widget overrides', () => {
        expect(resolveWidgetAlignment('auto', 'top-left')).toBe('left');
        expect(resolveWidgetAlignment(undefined, 'top-right')).toBe('right');
        expect(resolveWidgetAlignment('auto', 'top-left', 'end')).toBe('right');
        expect(resolveWidgetAlignment('center', 'top-right', 'end')).toBe('center');
    });
});

describe('applyGeneralSetting', () => {
    const v3 = (): WallClockConfigV3 => ({
        layout: layout(),
        appearance: {fontColor: '#FFF'},
    });

    it('routes appearance keys under appearance.*', () => {
        const result = applyGeneralSetting(v3(), 'language', 'cs');
        expect(result.appearance).toEqual({fontColor: '#FFF', language: 'cs'});
    });

    it('routes the card font family under appearance.*', () => {
        const result = applyGeneralSetting(v3(), 'fontFamily', 'Inter, sans-serif');
        expect(result.appearance).toEqual({fontColor: '#FFF', fontFamily: 'Inter, sans-serif'});
    });

    it('keeps logLevel top-level', () => {
        expect(applyGeneralSetting(v3(), 'logLevel', 'debug').logLevel).toBe('debug');
    });

    it('distributes customSizes into the owning widgets', () => {
        const result = applyGeneralSetting(v3(), 'customSizes.clockSize', '10rem');
        expect(result.layout.zones.center?.widgets[0]).toEqual({type: 'clock', id: 'clock', clockSize: '10rem'});
        expect(result.layout.zones.center?.widgets[1].clockSize).toBeUndefined();
    });

    it('ignores obsolete paths', () => {
        expect(applyGeneralSetting(v3(), 'customSizes.clockTopMargin', '1rem')).toEqual(v3());
    });
});

describe('widget editor adapters', () => {
    it('round-trips a weather widget through the weather-editor keys', () => {
        const widget = {
            type: 'weather', id: 'weather', priority: 3,
            provider: 'openweathermap',
            providerConfig: {apiKey: 'abc'},
            displayMode: 'both',
            forecastDays: 5,
            labelSize: '1rem',
        };

        const editorConfig = toEditorConfig(widget);
        expect(editorConfig).toEqual({
            showWeather: true,
            weatherProvider: 'openweathermap',
            weatherConfig: {apiKey: 'abc'},
            weatherDisplayMode: 'both',
            weatherForecastDays: 5,
        });

        // Editor changes the provider and adds a title
        const roundTripped = fromEditorConfig(widget, {
            ...editorConfig,
            weatherProvider: 'homeassistant',
            weatherTitle: 'Počasí',
        });
        expect(roundTripped).toEqual({
            type: 'weather', id: 'weather', priority: 3,
            provider: 'homeassistant',
            providerConfig: {apiKey: 'abc'},
            displayMode: 'both',
            forecastDays: 5,
            title: 'Počasí',
            labelSize: '1rem',
        });
    });

    it('preserves the weather visibility switch and treats provider none as disabled', () => {
        const disabled = {type: 'weather', id: 'weather', enabled: false, provider: 'homeassistant'};
        expect(toEditorConfig(disabled)).toMatchObject({showWeather: false, weatherProvider: 'homeassistant'});

        expect(fromEditorConfig(disabled, {
            showWeather: true,
            weatherProvider: 'none',
        })).toEqual({
            type: 'weather', id: 'weather', enabled: false, provider: 'none',
        });
    });

    it('round-trips a transportation widget (flat widget keys <-> nested transportation)', () => {
        const widget = {
            type: 'transportation', id: 'transportation', priority: 10,
            provider: 'idsjmk', stops: [{stopId: 1}],
        };

        const editorConfig = toEditorConfig(widget);
        expect(editorConfig).toEqual({
            transportation: {enabled: true, provider: 'idsjmk', stops: [{stopId: 1}]},
        });

        const roundTripped = fromEditorConfig(widget, {
            transportation: {enabled: true, provider: 'idsjmk', stops: [{stopId: 1}, {stopId: 2}], maxDepartures: 3},
        });
        expect(roundTripped).toEqual({
            type: 'transportation', id: 'transportation', priority: 10,
            provider: 'idsjmk', stops: [{stopId: 1}, {stopId: 2}], maxDepartures: 3,
        });
    });

    it('keeps transportation settings when the last stop is removed', () => {
        const widget = {
            type: 'transportation', id: 'transportation',
            provider: 'idsjmk', maxDepartures: 2, stops: [{stopId: 1}],
        };

        expect(fromEditorConfig(widget, {transportation: undefined})).toEqual({
            type: 'transportation', id: 'transportation',
            provider: 'idsjmk', maxDepartures: 2, stops: [],
        });
    });

    it('round-trips an action-bar widget and preserves iconSize', () => {
        const widget = {
            type: 'action-bar', id: 'action-bar', priority: 5,
            enabled: true, actions: [], iconSize: '48px',
        };

        const roundTripped = fromEditorConfig(widget, {
            actionBar: {enabled: false, actions: [{actionId: 'more-info', title: 'i', icon: 'mdi:i'}], alignment: 'left'},
        });
        expect(roundTripped).toEqual({
            type: 'action-bar', id: 'action-bar', priority: 5,
            enabled: false, actions: [{actionId: 'more-info', title: 'i', icon: 'mdi:i'}],
            alignment: 'left', iconSize: '48px',
        });
    });

    it('round-trips sensor and action-bar internal layout settings', () => {
        const sensors = {
            type: 'sensors', id: 'sensors', sensors: [],
            orientation: 'horizontal', alignment: 'right',
        };
        expect(toEditorConfig(sensors)).toEqual({
            sensors: [], orientation: 'horizontal', alignment: 'right',
        });
        expect(fromEditorConfig(sensors, {
            sensors: [], orientation: 'vertical', alignment: 'center',
        })).toEqual({
            type: 'sensors', id: 'sensors', sensors: [],
            orientation: 'vertical', alignment: 'center',
        });

        const actions = {
            type: 'action-bar', id: 'actions', enabled: true, actions: [],
            orientation: 'vertical', alignment: 'left', buttonGap: '12px', padding: '8px 16px',
        };
        expect(toEditorConfig(actions)).toEqual({
            actionBar: {
                enabled: true, actions: [], orientation: 'vertical', alignment: 'left',
                buttonGap: '12px', padding: '8px 16px',
            },
        });
        expect(fromEditorConfig(actions, {
            actionBar: {
                enabled: true, actions: [], orientation: 'horizontal', alignment: 'right',
                buttonGap: '20px', padding: '4px',
            },
        })).toEqual({
            type: 'action-bar', id: 'actions', enabled: true, actions: [],
            orientation: 'horizontal', alignment: 'right', buttonGap: '20px', padding: '4px',
        });
    });

    it('passes custom widget configs through unchanged', () => {
        const widget = {type: 'my-custom', id: 'my-custom', foo: 'bar'};
        expect(toEditorConfig(widget)).toEqual(widget);
        expect(fromEditorConfig(widget, {type: 'my-custom', foo: 'baz'})).toEqual({
            type: 'my-custom', id: 'my-custom', foo: 'baz',
        });
    });

    it('round-trips every v2 background setting through background.*', () => {
        const config: WallClockConfigV3 = {
            layout: layout(),
            background: {
                source: 'unsplash',
                config: {category: 'nature', count: 7},
                images: [{url: '/local/a.jpg', weather: Weather.All, timeOfDay: TimeOfDay.Unspecified}],
                opacity: 0,
                rotationInterval: 60,
                objectFit: 'contain',
            },
        };

        const editorConfig = toBackgroundEditorConfig(config);
        expect(editorConfig).toEqual({
            imageSource: 'unsplash',
            imageConfig: {category: 'nature', count: 7},
            backgroundImages: [{url: '/local/a.jpg', weather: Weather.All, timeOfDay: TimeOfDay.Unspecified}],
            backgroundOpacity: 0,
            backgroundRotationInterval: 60,
            objectFit: 'contain',
        });
        expect(fromBackgroundEditorConfig(editorConfig)).toEqual(config.background);
    });
});

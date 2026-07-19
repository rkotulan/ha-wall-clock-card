// Tests for the zone layout editor data operations and the editor adapters.
// Direct file imports (no barrels) — see the Jest/lit constraint.
import {
    addWidget,
    applyGeneralSetting,
    moveWidget,
    removeWidget,
    setSpacing,
    uniqueWidgetId,
    updateWidgetAt,
    updateZoneSettings,
} from '../src/editors/layout-editor-logic';
import {toEditorConfig, fromEditorConfig} from '../src/editors/widget-editor-adapters';
import {LayoutConfig, WallClockConfigV3} from '../src/core/layout-types';

const layout = (): LayoutConfig => ({
    zones: {
        center: {widgets: [{type: 'clock', id: 'clock'}, {type: 'date', id: 'date'}]},
        'bottom-center': {mode: 'exclusive', widgets: [{type: 'transportation', id: 'transportation', priority: 10}]},
    },
});

describe('layout editor logic', () => {
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

describe('applyGeneralSetting', () => {
    const v3 = (): WallClockConfigV3 => ({
        layout: layout(),
        appearance: {fontColor: '#FFF'},
    });

    it('routes appearance keys under appearance.*', () => {
        const result = applyGeneralSetting(v3(), 'language', 'cs');
        expect(result.appearance).toEqual({fontColor: '#FFF', language: 'cs'});
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

    it('passes custom widget configs through unchanged', () => {
        const widget = {type: 'my-custom', id: 'my-custom', foo: 'bar'};
        expect(toEditorConfig(widget)).toEqual(widget);
        expect(fromEditorConfig(widget, {type: 'my-custom', foo: 'baz'})).toEqual({
            type: 'my-custom', id: 'my-custom', foo: 'baz',
        });
    });
});

// Tests for the zone layout editor data operations and the editor adapters.
// Direct file imports (no barrels) — see the Jest/lit constraint.
import {
    addWidget,
    addWidgetToZoneGroup,
    applyGeneralSetting,
    deduplicateWidgetTypes,
    findWidgetById,
    hasWidgetType,
    moveWidget,
    moveWidgetToZoneGroup,
    removeWidget,
    setLayoutFormat,
    setLayoutVisualPreset,
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
import {
    resolveActionBarColumns,
    resolveWidgetAlignment,
    resolveWidgetOrientation,
    resolveWidgetRowGrow,
    resolveWidgetWidthMode,
    supportsWidgetMaxWidth,
} from '../src/widgets/widget-layout';
import {widgetEditorSections, widgetHasEditorSection} from '../src/editors/widget-settings-sections';

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

    it('uses balanced automatic row shares while preserving explicit overrides', () => {
        expect(resolveWidgetRowGrow('weather')).toBe(3);
        expect(resolveWidgetRowGrow('sensors')).toBeUndefined();
        expect(resolveWidgetRowGrow('calendar')).toBe(3);
        expect(resolveWidgetRowGrow('action-bar')).toBe(2);
        expect(resolveWidgetRowGrow('separator')).toBeUndefined();
        expect(resolveWidgetRowGrow('sensors', 4.5)).toBe(4.5);
        expect(resolveWidgetRowGrow('weather', 4.5, 'content')).toBeUndefined();
        expect(resolveWidgetRowGrow('ha-card', undefined, 'fill')).toBe(1);
        expect(resolveWidgetWidthMode('sensors')).toBe('content');
        expect(resolveWidgetWidthMode('calendar')).toBe('fill');
    });

    it('uses a two-column action grid automatically in row zones', () => {
        expect(resolveActionBarColumns(undefined, 'row')).toBe(2);
        expect(resolveActionBarColumns(undefined, 'column')).toBeUndefined();
        expect(resolveActionBarColumns(3, 'row')).toBe(3);
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

    it('merges legacy split zones into one ordered physical area on move', () => {
        const input: LayoutConfig = {
            format: 'vertical-1-2',
            zones: {
                'top-center': {
                    gap: '4px',
                    widgets: [{type: 'weather', id: 'weather'}],
                },
                'top-right': {
                    widgets: [{type: 'calendar', id: 'calendar'}],
                },
            },
        };

        const result = moveWidgetToZoneGroup(
            input,
            'top-right',
            0,
            ['top-center', 'top-right'],
            0,
        );

        expect(result.zones['top-center']).toEqual({
            gap: '4px',
            widgets: [
                {type: 'calendar', id: 'calendar'},
                {type: 'weather', id: 'weather'},
            ],
        });
        expect(result.zones['top-right']).toBeUndefined();
        expect(input.zones['top-right']?.widgets).toHaveLength(1);
    });

    it('adds into a merged split area and preserves canonical zone settings', () => {
        const input: LayoutConfig = {
            format: 'vertical-1-2',
            zones: {
                'bottom-center': {
                    mode: 'exclusive',
                    widgets: [{type: 'transportation', id: 'transportation'}],
                },
                'bottom-right': {
                    widgets: [{type: 'separator', id: 'separator'}],
                },
            },
        };

        const result = addWidgetToZoneGroup(
            input,
            ['bottom-center', 'bottom-right'],
            {type: 'action-bar'},
            1,
        );

        expect(result.zones['bottom-center']?.mode).toBe('exclusive');
        expect(result.zones['bottom-center']?.widgets.map(widget => widget.type)).toEqual([
            'transportation', 'action-bar', 'separator',
        ]);
        expect(result.zones['bottom-right']).toBeUndefined();
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
        const withGap = updateZoneSettings(layout(), 'center', {
            gap: '0px',
            mode: 'exclusive',
            offsetY: '-8vh',
            span: 'panel',
        });
        expect(withGap.zones.center?.gap).toBe('0px');
        expect(withGap.zones.center?.mode).toBe('exclusive');
        expect(withGap.zones.center?.offsetY).toBe('-8vh');
        expect(withGap.zones.center?.span).toBe('panel');

        const cleared = updateZoneSettings(withGap, 'center', {
            gap: undefined,
            mode: undefined,
            offsetY: '',
            span: undefined,
        });
        expect(cleared.zones.center?.gap).toBeUndefined();
        expect(cleared.zones.center?.mode).toBeUndefined();
        expect(cleared.zones.center?.offsetY).toBeUndefined();
        expect(cleared.zones.center?.span).toBeUndefined();
    });

    it('creates settings for an empty physical area and removes it when cleared', () => {
        const configured = updateZoneSettings({zones: {}}, 'top-center', {align: 'end'});
        expect(configured.zones['top-center']).toEqual({widgets: [], align: 'end'});

        const cleared = updateZoneSettings(configured, 'top-center', {align: undefined});
        expect(cleared.zones['top-center']).toBeUndefined();
    });

    it('sets and clears spacing', () => {
        expect(setSpacing(layout(), 'spacious').spacing).toBe('spacious');
        expect(setSpacing(layout(), {padding: '24px'}).spacing).toEqual({padding: '24px'});
        expect(setSpacing(setSpacing(layout(), 'compact'), undefined).spacing).toBeUndefined();
    });

    it('sets split formats and keeps the original grid implicit', () => {
        const split = setLayoutFormat(layout(), 'vertical-2-1');
        expect(split.format).toBe('vertical-2-1');
        expect(split.zones).toEqual(layout().zones);

        expect(setLayoutFormat(split, 'grid-3x3').format).toBeUndefined();
    });

    it('sets visual presets without changing widget placement', () => {
        const glass = setLayoutVisualPreset(layout(), 'glass');
        expect(glass.preset).toBe('glass');
        expect(glass.zones).toEqual(layout().zones);

        expect(setLayoutVisualPreset(glass, 'none').preset).toBeUndefined();
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

    it('allows weather width constraints while protecting fixed-layout widgets', () => {
        expect(supportsWidgetMaxWidth('weather')).toBe(true);
        expect(supportsWidgetMaxWidth('clock')).toBe(true);
        expect(supportsWidgetMaxWidth('sensors')).toBe(false);
        expect(supportsWidgetMaxWidth('calendar')).toBe(false);
    });
});

describe('widget editor sections', () => {
    it('places feature-specific settings on the intended logical tabs', () => {
        expect(widgetEditorSections('weather')).toEqual(['content', 'appearance', 'behavior']);
        expect(widgetEditorSections('calendar')).toEqual(['content', 'appearance', 'behavior']);
        expect(widgetEditorSections('transportation')).toEqual(['content', 'appearance', 'behavior']);
        expect(widgetEditorSections('action-bar')).toEqual(['content', 'behavior']);
        expect(widgetEditorSections('ha-card')).toEqual(['content', 'appearance']);
        expect(widgetEditorSections('separator')).toEqual(['appearance']);
        expect(widgetEditorSections('sensors')).toEqual(['content']);
        expect(widgetHasEditorSection('separator', 'content')).toBe(false);
        expect(widgetHasEditorSection('separator', 'appearance')).toBe(true);
        expect(widgetEditorSections('my-custom')).toEqual(['content']);
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
            showTitle: false,
            iconSet: 'wall-clock',
            animateIcons: false,
            labelSize: '1rem',
            orientation: 'horizontal',
        };

        const editorConfig = toEditorConfig(widget);
        expect(editorConfig).toEqual({
            showWeather: true,
            weatherProvider: 'openweathermap',
            weatherConfig: {apiKey: 'abc'},
            weatherDisplayMode: 'both',
            weatherForecastDays: 5,
            weatherShowTitle: false,
            weatherIconSet: 'wall-clock',
            weatherIconAnimation: false,
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
            showTitle: false,
            iconSet: 'wall-clock',
            animateIcons: false,
            title: 'Počasí',
            labelSize: '1rem',
            orientation: 'horizontal',
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
            provider: 'idsjmk', displayMode: 'modal', stops: [{stopId: 1}],
        };

        const editorConfig = toEditorConfig(widget);
        expect(editorConfig).toEqual({
            transportation: {
                enabled: true,
                provider: 'idsjmk',
                displayMode: 'modal',
                stops: [{stopId: 1}],
            },
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
            orientation: 'horizontal', alignment: 'right', itemGap: '12px',
            showIcons: false, iconSize: '32px', showSeparator: true,
            separatorColor: '#ffffff', separatorOpacity: 0.4,
        };
        expect(toEditorConfig(sensors)).toEqual({
            sensors: [], orientation: 'horizontal', alignment: 'right', itemGap: '12px',
            showIcons: false, iconSize: '32px', showSeparator: true,
            separatorColor: '#ffffff', separatorOpacity: 0.4,
        });
        expect(fromEditorConfig(sensors, {
            sensors: [], orientation: 'vertical', alignment: 'center', itemGap: '20px',
            showIcons: true, iconSize: '40px', showSeparator: false,
            separatorColor: '#00ffff', separatorOpacity: 0.65,
        })).toEqual({
            type: 'sensors', id: 'sensors', sensors: [],
            orientation: 'vertical', alignment: 'center', itemGap: '20px',
            showIcons: true, iconSize: '40px', showSeparator: false,
            separatorColor: '#00ffff', separatorOpacity: 0.65,
        });

        const actions = {
            type: 'action-bar', id: 'actions', enabled: true, actions: [],
            orientation: 'vertical', alignment: 'left', columns: 2, showButtonBackground: false,
            buttonGap: '12px', padding: '8px 16px',
        };
        expect(toEditorConfig(actions)).toEqual({
            actionBar: {
                enabled: true, actions: [], orientation: 'vertical', alignment: 'left', columns: 2,
                showButtonBackground: false,
                buttonGap: '12px', padding: '8px 16px',
            },
        });
        expect(fromEditorConfig(actions, {
            actionBar: {
                enabled: true, actions: [], orientation: 'horizontal', alignment: 'right', columns: 3,
                showButtonBackground: true, buttonGap: '20px', padding: '4px',
            },
        })).toEqual({
            type: 'action-bar', id: 'actions', enabled: true, actions: [],
            orientation: 'horizontal', alignment: 'right', columns: 3, showButtonBackground: true,
            buttonGap: '20px', padding: '4px',
        });
    });

    it('preserves every calendar setting when the tab-specific editor updates one group', () => {
        const widget = {
            type: 'calendar', id: 'calendar', style: {grow: 3},
            entities: [{entity: 'calendar.family', label: 'Family', color: '#4fc3f7'}],
            displayMode: 'agenda', daysAhead: 7, maxEvents: 8,
            showAllDay: true, showLocation: true, showDescription: false,
            hidePastTodayEvents: true, hideWhenEmpty: false, updateInterval: 300,
            eventBackgroundColor: '#202020', eventBackgroundOpacity: 0.76,
            calendarDateSize: '1rem', eventTitleSize: '1.1rem', eventDetailSize: '0.82rem',
        };
        expect(toEditorConfig(widget)).toEqual(widget);
        expect(fromEditorConfig(widget, {
            ...widget,
            eventBackgroundColor: '#303030',
            eventBackgroundOpacity: 0.5,
        })).toEqual({
            ...widget,
            eventBackgroundColor: '#303030',
            eventBackgroundOpacity: 0.5,
        });
    });

    it('passes custom widget configs through unchanged', () => {
        const widget = {type: 'my-custom', id: 'my-custom', foo: 'bar'};
        expect(toEditorConfig(widget)).toEqual(widget);
        expect(fromEditorConfig(widget, {type: 'my-custom', foo: 'baz'})).toEqual({
            type: 'my-custom', id: 'my-custom', foo: 'baz',
        });
    });

    it('round-trips separator appearance settings through its editor', () => {
        const widget = {
            type: 'separator', id: 'separator',
            orientation: 'horizontal', color: '#7dd3fc',
            opacity: 0.45, thickness: '2px', length: '85%',
        };
        expect(toEditorConfig(widget)).toEqual(widget);
        expect(fromEditorConfig(widget, {
            ...widget,
            color: '#ffffff',
            opacity: 0.25,
        })).toEqual({
            ...widget,
            color: '#ffffff',
            opacity: 0.25,
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

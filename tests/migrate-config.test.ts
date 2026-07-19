// Golden tests for the v2 -> v3 zone layout migration.
// Import directly from the source files (not barrels): the barrels pull in
// LitElement components whose ESM Jest cannot load in the node environment.
import {migrateToLayout, isV3Config, resolveSpacing} from '../src/core/migrate-config';
import {SPACING_PRESETS, WallClockConfigV3} from '../src/core/layout-types';
import {Size} from '../src/core/types';

describe('migrateToLayout', () => {
    it('migrates an empty v2 config to clock + date in the center zone', () => {
        const result = migrateToLayout({});

        expect(result).toEqual({
            layout: {
                zones: {
                    center: {
                        widgets: [
                            {type: 'clock', id: 'clock'},
                            {type: 'date', id: 'date'},
                        ],
                    },
                },
            },
        });
    });

    it('migrates a full v2 config to the layout mirroring the hard-coded v2 placement', () => {
        const result = migrateToLayout({
            timeFormat: {hour: '2-digit', minute: '2-digit', hour12: false},
            dateFormat: {weekday: 'long', day: 'numeric', month: 'long'},
            sensors: [{entity: 'sensor.indoor_temp', label: 'Doma'}],
            showWeather: true,
            weatherProvider: 'openweathermap',
            weatherConfig: {apiKey: 'abc', iconSet: 'fill'},
            weatherDisplayMode: 'both',
            weatherForecastDays: 5,
            weatherTitle: 'Počasí',
            weatherUpdateInterval: 300,
            transportation: {provider: 'idsjmk', stops: [{stopId: '123', name: 'Zastávka'}]},
            actionBar: {enabled: true, actions: [{actionId: 'navigator', title: 'Domů', icon: 'mdi:home'}]},
            imageSource: 'picsum',
            imageConfig: {category: 'nature'},
            backgroundOpacity: 0.5,
            backgroundRotationInterval: 60,
            objectFit: 'cover',
            fontColor: '#EEEEEE',
            language: 'cs',
            timeZone: 'Europe/Prague',
            size: Size.Large,
            customSizes: {
                clockSize: '10rem',
                dateSize: '3rem',
                labelSize: '1rem',
                valueSize: '2rem',
                actionBarIconSize: '48px',
            },
        });

        expect(result).toEqual({
            layout: {
                zones: {
                    center: {
                        widgets: [
                            {
                                type: 'clock', id: 'clock',
                                timeFormat: {hour: '2-digit', minute: '2-digit', hour12: false},
                                clockSize: '10rem',
                            },
                            {
                                type: 'date', id: 'date',
                                dateFormat: {weekday: 'long', day: 'numeric', month: 'long'},
                                dateSize: '3rem',
                            },
                        ],
                    },
                    'top-left': {
                        widgets: [{
                            type: 'sensors', id: 'sensors',
                            sensors: [{entity: 'sensor.indoor_temp', label: 'Doma'}],
                            labelSize: '1rem',
                            valueSize: '2rem',
                        }],
                    },
                    'top-right': {
                        widgets: [{
                            type: 'weather', id: 'weather',
                            provider: 'openweathermap',
                            providerConfig: {apiKey: 'abc', iconSet: 'fill'},
                            displayMode: 'both',
                            forecastDays: 5,
                            title: 'Počasí',
                            updateInterval: 300,
                            iconSet: 'fill',
                            labelSize: '1rem',
                            valueSize: '2rem',
                        }],
                    },
                    'bottom-center': {
                        mode: 'exclusive',
                        widgets: [
                            {
                                type: 'transportation', id: 'transportation',
                                provider: 'idsjmk',
                                stops: [{stopId: '123', name: 'Zastávka'}],
                                priority: 10,
                            },
                            {
                                type: 'action-bar', id: 'action-bar',
                                enabled: true,
                                actions: [{actionId: 'navigator', title: 'Domů', icon: 'mdi:home'}],
                                iconSize: '48px',
                                priority: 5,
                            },
                        ],
                    },
                },
            },
            background: {
                source: 'picsum',
                config: {category: 'nature'},
                opacity: 0.5,
                rotationInterval: 60,
                objectFit: 'cover',
            },
            appearance: {
                fontColor: '#EEEEEE',
                language: 'cs',
                timeZone: 'Europe/Prague',
                size: Size.Large,
            },
        });
    });

    it('honors the legacy top-level enableActionBar flag', () => {
        const result = migrateToLayout({
            enableActionBar: true,
            actionBar: {actions: [{actionId: 'more-info', title: 'Info', icon: 'mdi:information', entity: 'light.living'}]},
        });

        const bottomCenter = result.layout.zones['bottom-center'];
        expect(bottomCenter?.mode).toBe('exclusive');
        expect(bottomCenter?.widgets).toEqual([{
            type: 'action-bar', id: 'action-bar',
            enabled: true,
            actions: [{actionId: 'more-info', title: 'Info', icon: 'mdi:information', entity: 'light.living'}],
            priority: 5,
        }]);
    });

    it('lets actionBar.enabled=false win over legacy enableActionBar=true', () => {
        const result = migrateToLayout({
            enableActionBar: true,
            actionBar: {enabled: false, actions: []},
        });

        expect(result.layout.zones['bottom-center']).toBeUndefined();
    });

    it('passes an already-v3 config through unchanged (same reference)', () => {
        const v3: WallClockConfigV3 = {
            layout: {zones: {center: {widgets: [{type: 'clock'}]}}},
            appearance: {fontColor: '#FFF'},
        };

        expect(migrateToLayout(v3 as never)).toBe(v3);
        expect(isV3Config(v3)).toBe(true);
    });

    it('preserves unknown passthrough keys and strips consumed v2 keys', () => {
        const result = migrateToLayout({
            type: 'custom:wall-clock-card',
            grid_options: {rows: 4},
            logLevel: 'debug',
            fontColor: '#FFF',
        });

        expect(result.type).toBe('custom:wall-clock-card');
        expect(result.grid_options).toEqual({rows: 4});
        expect(result.logLevel).toBe('debug');
        expect(result.fontColor).toBeUndefined();
        expect(result.appearance).toEqual({fontColor: '#FFF'});
    });
});

describe('resolveSpacing', () => {
    it('defaults to the normal preset', () => {
        expect(resolveSpacing()).toEqual(SPACING_PRESETS.normal);
        expect(resolveSpacing({zones: {}})).toEqual(SPACING_PRESETS.normal);
    });

    it('resolves a named preset', () => {
        expect(resolveSpacing({zones: {}, spacing: 'spacious'})).toEqual(SPACING_PRESETS.spacious);
        expect(resolveSpacing({zones: {}, spacing: 'compact'})).toEqual(SPACING_PRESETS.compact);
    });

    it('lets explicit values override the defaults, including padding shorthand', () => {
        expect(resolveSpacing({zones: {}, spacing: {padding: '0 24px', widgetGap: '1.5rem'}})).toEqual({
            padding: '0 24px',
            zoneGap: '16px',
            widgetGap: '1.5rem',
        });
    });

    it('falls back to preset values for invalid CSS lengths', () => {
        expect(resolveSpacing({
            zones: {},
            spacing: {padding: 'lots', zoneGap: '12px', widgetGap: '10px 10px'},
        })).toEqual({
            padding: '16px',  // invalid keyword -> fallback
            zoneGap: '12px',
            widgetGap: '8px', // shorthand not allowed for a gap -> fallback
        });
    });

    it('falls back to normal for an unknown preset name', () => {
        expect(resolveSpacing({zones: {}, spacing: 'huge' as never})).toEqual(SPACING_PRESETS.normal);
    });
});

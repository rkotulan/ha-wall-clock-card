import { SensorController } from '../src/components/sensor/sensor-controller';
import { HomeAssistant } from 'custom-card-helpers';

describe('SensorController', () => {
    const mockHost = {
        addController: jest.fn(),
        removeController: jest.fn(),
        requestUpdate: jest.fn(),
        updateComplete: Promise.resolve(true),
    };

    let controller: SensorController;

    beforeEach(() => {
        controller = new SensorController(mockHost as any);
    });

    it('should format sensor value with default precision', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: '12.3456',
                    attributes: {
                        unit_of_measurement: '°C'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].value).toBe('12.3456 °C');
    });

    it('should respect display_precision attribute', () => {
        const hass = {
            locale: {
                language: 'en',
                number_format: 'none'
            },
            states: {
                'sensor.test': {
                    state: '12.3456',
                    attributes: {
                        unit_of_measurement: '°C',
                        display_precision: 1
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        // Should respect display_precision
        expect(controller.sensorValues[0].value).toMatch(/12[.,]3 °C/);
    });

    it('should respect display_precision from hass.entities', () => {
        const hass = {
            locale: {
                language: 'en',
                number_format: 'none'
            },
            entities: {
                'sensor.test': {
                    display_precision: 2
                }
            },
            states: {
                'sensor.test': {
                    state: '12.3456',
                    attributes: {
                        unit_of_measurement: '°C'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        // Should respect display_precision from entities registry
        expect(controller.sensorValues[0].value).toMatch(/12[.,]35 °C/);
    });

    it('should prioritize precision from config over hass.entities and attributes', () => {
        const hass = {
            locale: {
                language: 'en',
                number_format: 'none'
            },
            entities: {
                'sensor.test': {
                    display_precision: 2
                }
            },
            states: {
                'sensor.test': {
                    state: '12.3456',
                    attributes: {
                        unit_of_measurement: '°C',
                        display_precision: 1
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test', precision: 3 }]
        });
        controller.updateHass(hass);

        // Should prioritize config precision
        expect(controller.sensorValues[0].value).toMatch(/12[.,]346 °C/);
    });

    it('should prefer hass.formatEntityState when available', () => {
        const formatEntityState = jest.fn().mockReturnValue('21,5 °C');
        const hass = {
            formatEntityState,
            states: {
                'sensor.test': {
                    state: '21.51',
                    attributes: {
                        unit_of_measurement: '°C'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        expect(formatEntityState).toHaveBeenCalledWith(hass.states['sensor.test']);
        expect(controller.sensorValues[0].value).toBe('21,5 °C');
    });

    it('should bypass formatEntityState when config precision is set', () => {
        const formatEntityState = jest.fn().mockReturnValue('21,5 °C');
        const hass = {
            formatEntityState,
            locale: { language: 'en', number_format: 'none' },
            states: {
                'sensor.test': {
                    state: '21.51',
                    attributes: {
                        unit_of_measurement: '°C'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test', precision: 0 }]
        });
        controller.updateHass(hass);

        expect(formatEntityState).not.toHaveBeenCalled();
        expect(controller.sensorValues[0].value).toMatch(/^2[12] °C$/);
    });

    it('should fall back to friendly_name when no label is configured', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: '1',
                    attributes: {
                        friendly_name: 'Living Room Temperature'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].label).toBe('Living Room Temperature');
    });

    it('should keep an explicit empty label to hide it', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: '1',
                    attributes: {
                        friendly_name: 'Living Room Temperature'
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test', label: '' }]
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].label).toBe('');
    });

    it('uses the configured icon before the Home Assistant entity icon', () => {
        const hass = {
            states: {
                'sensor.test': {
                    entity_id: 'sensor.test',
                    state: '21',
                    attributes: {
                        device_class: 'temperature',
                        icon: 'mdi:home-thermometer',
                    },
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{entity: 'sensor.test', icon: 'mdi:thermometer-lines'}],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].icon).toBe('mdi:thermometer-lines');
    });

    it('derives the icon from the Home Assistant device class', () => {
        const hass = {
            states: {
                'sensor.test': {
                    entity_id: 'sensor.test',
                    state: '65',
                    attributes: {device_class: 'humidity'},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({sensors: [{entity: 'sensor.test'}]});
        controller.updateHass(hass);

        expect(controller.sensorValues[0].icon).toBe('mdi:water-percent');
    });

    it('should format value as a number if it is a numeric string', () => {
        const hass = {
            locale: {
                language: 'en',
                number_format: 'none'
            },
            states: {
                'sensor.test': {
                    state: '100',
                    attributes: {
                        unit_of_measurement: '%',
                        display_precision: 2
                    }
                }
            }
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{ entity: 'sensor.test' }]
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].value).toMatch(/100[.,]00 %/);
    });

    it.each([
        ['<', 21, 22],
        ['<=', 22, 22],
        ['>', 23, 22],
        ['>=', 22, 22],
        ['=', 22, 22],
        ['!=', 21, 22],
    ] as const)('applies the %s color rule to a matching numeric state', (operator, state, value) => {
        const hass = {
            states: {
                'sensor.test': {
                    state: String(state),
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: '#00ff00',
                colorRules: [{operator, value, color: '#ff0000'}],
            }],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].color).toBe('#ff0000');
    });

    it('uses the first matching color rule and falls back to the configured color', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: '75',
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'green',
                colorRules: [
                    {operator: '>=', value: 65, color: 'orange'},
                    {operator: '<=', value: 90, color: 'blue'},
                ],
            }],
        });
        controller.updateHass(hass);
        expect(controller.sensorValues[0].color).toBe('orange');

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'green',
                colorRules: [{operator: '>', value: 90, color: 'red'}],
            }],
        });
        expect(controller.sensorValues[0].color).toBe('green');
    });

    it('ignores color rules for a non-numeric state', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: 'unavailable',
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'gray',
                colorRules: [{operator: '!=', value: 0, color: 'red'}],
            }],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].color).toBe('gray');
    });

    it.each([
        ['=', 'good', 'green'],
        ['!=', 'moderate', 'red'],
    ] as const)('applies the %s color rule to a matching text state', (operator, value, color) => {
        const hass = {
            states: {
                'sensor.test': {
                    state: 'good',
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'gray',
                colorRules: [{operator, value, color}],
            }],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].color).toBe(color);
    });

    it('compares text states exactly and falls back when they do not match', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: 'Good',
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'gray',
                colorRules: [{operator: '=', value: 'good', color: 'green'}],
            }],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].color).toBe('gray');
    });

    it('ignores relational rules with a non-numeric configured value', () => {
        const hass = {
            states: {
                'sensor.test': {
                    state: 'good',
                    attributes: {},
                },
            },
        } as any as HomeAssistant;

        controller.updateConfig({
            sensors: [{
                entity: 'sensor.test',
                color: 'gray',
                colorRules: [{operator: '>', value: 'moderate', color: 'red'}],
            }],
        });
        controller.updateHass(hass);

        expect(controller.sensorValues[0].color).toBe('gray');
    });
});

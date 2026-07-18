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
});

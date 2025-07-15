import { ReactiveControllerHost } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';
import { BaseController } from '../../utils/controllers';

export interface SensorConfig {
    entity: string;
    label?: string;
}

export interface SensorValue {
    entity: string;
    label?: string;
    value: string;
}

export interface SensorControllerConfig {
    sensors?: SensorConfig[];
}

/**
 * A reactive controller that manages sensor data
 */
export class SensorController extends BaseController {
    private hass?: HomeAssistant;

    // Reactive property for sensor values
    private _sensorValues: SensorValue[] = [];

    // Configuration
    private config: SensorControllerConfig = {};

    constructor(host: ReactiveControllerHost, config: SensorControllerConfig = {}) {
        super(host, 'sensor-controller');
        this.config = config;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        // No initialization needed
    }

    protected onHostDisconnected(): void {
        // No cleanup needed
    }

    /**
     * Update the configuration
     */
    updateConfig(config: SensorControllerConfig): void {
        this.logger.debug('Updating SensorController config:', config);
        this.config = { ...this.config, ...config };

        // Update sensor values if we have hass
        if (this.hass) {
            this.updateSensorValues();
        }
    }

    /**
     * Update the Home Assistant instance
     */
    updateHass(hass: HomeAssistant): void {
        this.hass = hass;
        this.updateSensorValues();
    }

    /**
     * Update the sensor values from hass
     */
    private updateSensorValues(): void {
        if (!this.hass || !this.config.sensors || this.config.sensors.length === 0) {
            this._sensorValues = [];
            return;
        }

        // Clear previous values
        this._sensorValues = [];

        // Process sensors array
        this.config.sensors.forEach(sensorConfig => {
            if (sensorConfig.entity && this.hass!.states[sensorConfig.entity]) {
                const state = this.hass!.states[sensorConfig.entity];
                let value = state.state;

                // If the entity has a unit_of_measurement attribute, append it
                if (state.attributes && state.attributes.unit_of_measurement) {
                    value += ` ${state.attributes.unit_of_measurement}`;
                }

                this._sensorValues.push({
                    entity: sensorConfig.entity,
                    label: sensorConfig.label,
                    value: value
                });
            } else if (sensorConfig.entity) {
                // Entity not found or unavailable
                this._sensorValues.push({
                    entity: sensorConfig.entity,
                    label: sensorConfig.label,
                    value: 'unavailable'
                });
            }
        });

        // Request an update from the host
        this.host.requestUpdate();
    }

    // Getter method for sensor values
    get sensorValues(): SensorValue[] {
        return this._sensorValues;
    }
}

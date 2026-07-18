import { ReactiveControllerHost } from 'lit';
import { HomeAssistant, formatNumber } from 'custom-card-helpers';
import { BaseController } from '../../utils/controllers';

export interface SensorConfig {
    entity: string;
    /** Custom label; unset falls back to the entity's friendly_name, '' hides the label */
    label?: string;
    /** Decimal places override; unset falls back to HA display precision */
    precision?: number;
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

        // Process sensors and update values
        this._sensorValues = this.config.sensors.map(sensorConfig => this.processSensor(sensorConfig));

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Process a single sensor configuration and return its value
     */
    private processSensor(sensorConfig: SensorConfig): SensorValue {
        const entityId = sensorConfig.entity;
        const entityState = this.hass?.states[entityId];

        if (!entityId || !entityState) {
            return {
                entity: entityId,
                label: sensorConfig.label,
                value: 'unavailable'
            };
        }

        return {
            entity: entityId,
            // Explicit label wins; unset falls back to the entity's friendly
            // name; an empty string deliberately hides the label.
            label: sensorConfig.label ?? entityState.attributes?.friendly_name,
            value: this.formatState(sensorConfig, entityState)
        };
    }

    /**
     * Format an entity state for display. Prefers HA's own formatEntityState
     * (localized state, device_class handling, units, display precision);
     * falls back to manual number formatting + unit concatenation on older
     * HA versions. An explicit precision in the sensor config always wins.
     */
    private formatState(sensorConfig: SensorConfig, entityState: any): string {
        const formatEntityState = (this.hass as any)?.formatEntityState;
        if (sensorConfig.precision === undefined && typeof formatEntityState === 'function') {
            try {
                return formatEntityState.call(this.hass, entityState);
            } catch (e) {
                this.logger.warn('formatEntityState failed, using fallback formatting', e);
            }
        }

        let value = entityState.state;
        const displayPrecision = this.getDisplayPrecision(sensorConfig, entityState);

        if (displayPrecision !== undefined && value !== null && value !== '' && !isNaN(Number(value))) {
            value = this.formatNumericValue(Number(value), displayPrecision);
        }

        // If the entity has a unit_of_measurement attribute, append it
        if (entityState.attributes?.unit_of_measurement) {
            value += ` ${entityState.attributes.unit_of_measurement}`;
        }

        return value;
    }

    /**
     * Get display precision for a sensor: card config, then the entity
     * registry (the user's HA override), then the entity's state attributes,
     * then the integration's suggested precision.
     */
    private getDisplayPrecision(sensorConfig: SensorConfig, entityState: any): number | undefined {
        if (sensorConfig.precision !== undefined) {
            return sensorConfig.precision;
        }

        // Entity registry (display_precision)
        const registryPrecision = (this.hass as any)?.entities?.[sensorConfig.entity]?.display_precision;
        if (registryPrecision !== undefined) {
            return registryPrecision;
        }

        if (entityState?.attributes?.display_precision !== undefined) {
            return entityState.attributes.display_precision;
        }

        if (entityState?.attributes?.suggested_display_precision !== undefined) {
            return entityState.attributes.suggested_display_precision;
        }

        return undefined;
    }

    /**
     * Format a numeric value with specified precision
     */
    private formatNumericValue(numericValue: number, precision: number): string {
        try {
            let formattedValue = formatNumber(numericValue, this.hass!.locale, {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision
            });

            // Verify if the formatted value actually contains the decimal part
            // Some versions of formatNumber might ignore fraction digits in tests
            if (precision > 0 && !formattedValue.includes('.') && !formattedValue.includes(',')) {
                return numericValue.toFixed(precision);
            }
            return formattedValue;
        } catch (e) {
            // Fallback
            return numericValue.toFixed(precision);
        }
    }

    // Getter method for sensor values
    get sensorValues(): SensorValue[] {
        return this._sensorValues;
    }
}

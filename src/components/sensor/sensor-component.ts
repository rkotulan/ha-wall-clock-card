import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { createLogger } from '../../utils';
import { SensorController, SensorConfig } from './sensor-controller';
import { Size } from '../../core/types';

export interface SensorComponentConfig {
    sensors?: SensorConfig[];
    fontColor?: string;
    size?: Size;
    labelSize?: string;
    valueSize?: string;
}

@customElement('ha-sensors')
export class SensorComponent extends LitElement {
    @property({ type: Array }) sensors?: SensorConfig[];
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;
    @property({ type: String }) size?: Size;
    @property({ type: String }) labelSize?: string;
    @property({ type: String }) valueSize?: string;

    private logger = createLogger('sensor-component');
    private sensorController: SensorController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.sensorController = new SensorController(this, {
            sensors: this.sensors
        });
    }

    get controller(): SensorController {
        return this.sensorController;
    }

    static styles = css`
        .sensor-container {
            position: absolute;
            top: 16px;
            left: 16px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            z-index: 3;
            max-width: 40%;
            max-height: 60%;
            overflow-y: auto;
            padding-right: 8px;
        }

        .sensor-item {
            margin-bottom: 16px;
            width: 100%;
        }

        .sensor-label {
            font-size: 1.0rem;
            font-weight: 300;
            opacity: 0.8;
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
        }

        /* Responsive adjustments */
        @media (min-width: 900px) {
            .sensor-label {
                font-size: 1.2rem;
            }

            .sensor-value {
                font-size: 2rem;
            }
        }

        @media (min-width: 1280px) {
            .sensor-label {
                font-size: 1.5rem;
            }

            .sensor-value {
                font-size: 2.5rem;
            }
        }
    `;

    getLabelSize(): string {
        if (this.size === Size.Custom && this.labelSize) {
            return this.labelSize;
        } else if (this.size === Size.Large) {
            return '1.8rem';
        } else {
            // Default to medium size
            return '1.2rem';
        }
    }

    getValueSize(): string {
        if (this.size === Size.Custom && this.valueSize) {
            return this.valueSize;
        } else if (this.size === Size.Large) {
            return '3rem';
        } else {
            // Default to medium size
            return '2rem';
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('sensors')) {
            this.logger.debug('Sensors changed, updating SensorController');

            // Update unified SensorController with new configuration
            this.sensorController.updateConfig({
                sensors: this.sensors
            });
        }

        if (changedProperties.has('hass') && this.hass) {
            // Update the hass instance in the controller
            this.sensorController.updateHass(this.hass);
        }

        if (changedProperties.has('size') ||
            changedProperties.has('labelSize') ||
            changedProperties.has('valueSize')) {

            this.logger.debug('Size properties changed');

            if (changedProperties.has('size')) {
                const oldSize = changedProperties.get('size');
                this.logger.debug(`Size changed: ${oldSize} -> ${this.size}`);
            }

            if (changedProperties.has('labelSize')) {
                const oldLabelSize = changedProperties.get('labelSize');
                this.logger.debug(`LabelSize changed: ${oldLabelSize} -> ${this.labelSize}`);
            }

            if (changedProperties.has('valueSize')) {
                const oldValueSize = changedProperties.get('valueSize');
                this.logger.debug(`ValueSize changed: ${oldValueSize} -> ${this.valueSize}`);
            }

            // Force re-render to apply new sizes
            this.requestUpdate();
        }
    }

    render() {
        const sensorValues = this.sensorController.sensorValues;

        if (sensorValues.length === 0) {
            return html``;
        }

        const labelSize = this.getLabelSize();
        const valueSize = this.getValueSize();

        this.logger.debug(`Rendering sensors - LabelSize: ${labelSize}, ValueSize: ${valueSize}`);

        return html`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${sensorValues.map(sensor => html`
                    <div class="sensor-item">
                        ${sensor.label ?
                            html`
                                <div class="sensor-label" style="color: ${this.fontColor}; font-size: ${labelSize};">
                                    ${sensor.label}
                                </div>` :
                            ''
                        }
                        <div class="sensor-value" style="color: ${this.fontColor}; font-size: ${valueSize};">
                            ${sensor.value}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { createLogger } from '../../utils/logger';
import { SensorController, SensorConfig } from './sensor-controller';

export interface SensorComponentConfig {
    sensors?: SensorConfig[];
    fontColor?: string;
}

@customElement('ha-sensors')
export class SensorComponent extends LitElement {
    @property({ type: Array }) sensors?: SensorConfig[];
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;

    private logger = createLogger('sensor-component');
    private sensorController: SensorController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.sensorController = new SensorController(this, {
            sensors: this.sensors
        });
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
            this.logger.debug('Hass changed, updating SensorController');

            // Update the hass instance in the controller
            this.sensorController.updateHass(this.hass);
        }
    }

    render() {
        const sensorValues = this.sensorController.sensorValues;

        if (sensorValues.length === 0) {
            return html``;
        }

        return html`
            <div class="sensor-container" style="color: ${this.fontColor};">
                ${sensorValues.map(sensor => html`
                    <div class="sensor-item">
                        ${sensor.label ?
                            html`
                                <div class="sensor-label" style="color: ${this.fontColor};">
                                    ${sensor.label}
                                </div>` :
                            ''
                        }
                        <div class="sensor-value" style="color: ${this.fontColor};">
                            ${sensor.value}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

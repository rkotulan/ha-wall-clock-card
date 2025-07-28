import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { SensorConfig } from '../../core/types';
import { LabelPosition } from '../ha-selector/types';

/**
 * Editor component for sensors settings
 */
@customElement('sensors-editor')
export class SensorsEditor extends BaseEditorSection {
    @property({ type: Array }) _sensors: SensorConfig[] = [];

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // Load sensors from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadSensors();
        }
    }

    private _loadSensors(): void {
        if (this.config?.sensors && this.config.sensors.length > 0) {
            this._sensors = [...this.config.sensors];
        } else {
            this._sensors = [];
        }
    }

    private _addSensor(): void {
        this._sensors = [...this._sensors, {entity: '', label: ''}];
        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));
            newConfig.sensors = [...this._sensors];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _removeSensor(index: number): void {
        this._sensors = this._sensors.filter((_, i) => i !== index);
        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));
            newConfig.sensors = [...this._sensors];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }

            .sensor-row {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
            }

            .sensor-entity {
                flex: 2;
                margin-right: 8px;
            }

            .sensor-label {
                flex: 1;
                margin-right: 8px;
            }

            .sensor-actions {
                flex: 0 0 40px;
                text-align: center;
                margin-top: 20px;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        return html`
            <div class="content">
                ${this._sensors.map((sensor, index) => html`
                    <div class="sensor-row">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${sensor.label || ''}
                                .label=${"Label"}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.label"
                                @value-changed=${this._handleFormValueChanged}
                                style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    entity: {
                                        filter: {
                                            domain: ["sensor", "binary_sensor", "input_text", "input_number", "input_datetime", "sun", "weather"]
                                        }
                                    }
                                }}
                                .value=${sensor.entity || ''}
                                .label=${"Entity"}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.entity"
                                @value-changed=${this._handleFormValueChanged}
                                style="flex: 0 0 60%; overflow: hidden;"
                        ></ha-row-selector>

                        <div class="sensor-actions">
                            <ha-icon-button
                                    .path=${'M19,13H5V11H19V13Z'}
                                    @click=${() => this._removeSensor(index)}
                            ></ha-icon-button>
                        </div>
                    </div>
                `)}

                <mwc-button @click=${this._addSensor}>Add Sensor</mwc-button>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'sensors-editor': SensorsEditor;
    }
}

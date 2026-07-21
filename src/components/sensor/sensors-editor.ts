import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { SensorConfig } from '../../core/types';
import { LabelPosition } from '../ha-selector/types';

/**
 * Editor component for sensors settings
 */
@customElement('sensors-editor')
export class SensorsEditor extends BaseEditorSection {
    @property({ type: Array }) _sensors: SensorConfig[] = [];
    @state() private _expandedSensorIndex: number | null = 0;

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
        if (this._sensors.length === 0) {
            this._expandedSensorIndex = null;
        } else if (this._expandedSensorIndex !== null) {
            this._expandedSensorIndex = Math.min(this._expandedSensorIndex, this._sensors.length - 1);
        }
    }

    private _addSensor(): void {
        this._expandedSensorIndex = this._sensors.length;
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
        if (this._sensors.length === 0) {
            this._expandedSensorIndex = null;
        } else if (this._expandedSensorIndex === index) {
            this._expandedSensorIndex = Math.min(index, this._sensors.length - 1);
        } else if (this._expandedSensorIndex !== null && this._expandedSensorIndex > index) {
            this._expandedSensorIndex -= 1;
        }
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

    private _toggleSensor(index: number): void {
        this._expandedSensorIndex = this._expandedSensorIndex === index ? null : index;
    }

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }

            .sensor-card {
                margin: 0 0 10px;
                padding: 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .sensor-card.collapsed .sensor-header {
                margin-bottom: 0;
            }

            .sensor-header {
                display: flex;
                align-items: center;
                min-height: 34px;
                margin-bottom: 4px;
            }

            .sensor-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .sensor-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .sensor-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .sensor-icon-button ha-icon {
                --mdc-icon-size: 18px;
            }

            .sensor-icon-button:hover,
            .sensor-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .sensor-icon-button.remove:hover {
                color: var(--error-color, #db4437);
            }

            .sensor-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .sensor-card ha-row-selector {
                display: block;
                width: 100%;
                padding: 2px 0;
            }

            .empty-sensors {
                margin: 0 0 10px;
                padding: 12px;
                border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
                border-radius: 8px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.85rem;
                text-align: center;
            }

            .add-sensor {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-sensor:hover,
            .add-sensor:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-sensor ha-icon {
                --mdc-icon-size: 19px;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        return html`
            <div class="content">
                ${this._sensors.length === 0 ? html`
                    <div class="empty-sensors">${this.t('editor.sensors.empty', 'No sensors configured.')}</div>
                ` : ''}
                ${this._sensors.map((sensor, index) => {
                    const expanded = this._expandedSensorIndex === index;
                    const title = sensor.label || sensor.entity || this.t('editor.sensors.sensor', 'Sensor {number}', {number: index + 1});
                    return html`
                    <div class="sensor-card ${expanded ? '' : 'collapsed'}">
                        <div class="sensor-header">
                            <button class="sensor-toggle" type="button"
                                    aria-expanded=${expanded}
                                    @click=${() => this._toggleSensor(index)}>
                                <span class="sensor-title">${title}</span>
                            </button>
                            <button class="sensor-icon-button remove" type="button"
                                    title=${this.t('editor.sensors.remove', 'Remove sensor')}
                                    aria-label=${this.t('editor.sensors.remove', 'Remove sensor')}
                                    @click=${() => this._removeSensor(index)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="sensor-icon-button" type="button"
                                    title=${expanded ? this.t('editor.sensors.collapse', 'Collapse sensor') : this.t('editor.sensors.expand', 'Expand sensor')}
                                    aria-label=${expanded ? this.t('editor.sensors.collapse', 'Collapse sensor') : this.t('editor.sensors.expand', 'Expand sensor')}
                                    @click=${() => this._toggleSensor(index)}>
                                <ha-icon icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                            </button>
                        </div>
                        ${expanded ? html`<div class="sensor-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${sensor.label || ''}
                                .label=${this.t('editor.sensors.label', 'Label')}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.label"
                                @value-changed=${this._handleFormValueChanged}
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
                                .label=${this.t('editor.sensors.entity', 'Entity')}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.entity"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        </div>` : ''}
                    </div>
                `;})}

                <button class="add-sensor" type="button" @click=${this._addSensor}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${this.t('editor.sensors.add', 'Add sensor')}
                </button>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'sensors-editor': SensorsEditor;
    }
}

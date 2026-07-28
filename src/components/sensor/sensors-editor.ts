import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import {getEditorSessionState, setEditorSessionState} from '../../editors/editor-session-state';
import {moveListItem, movedListIndex, SortableListController} from '../../editors/sortable-list';
import { SensorColorOperator, SensorColorRule, SensorConfig } from '../../core/types';
import { LabelPosition } from '../ha-selector/types';

const EXPANSION_STATE_KEY = 'sensors.expansion';

interface SensorsEditorExpansionState {
    sensorIndex: number | null;
}

/**
 * Editor component for sensors settings
 */
@customElement('sensors-editor')
export class SensorsEditor extends BaseEditorSection {
    @property({attribute: false}) editorSessionKey?: string;
    @property({ type: Array }) _sensors: SensorConfig[] = [];
    @state() private _expandedSensorIndex: number | null = null;
    private readonly sortableList = new SortableListController(this, {
        containerSelector: '.sensor-list',
        draggable: '.sensor-card',
        handle: '.sensor-drag-handle',
        ghostClass: 'sensor-card-ghost',
        onMove: (fromIndex, toIndex) => this._moveSensor(fromIndex, toIndex),
    });

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has('editorSessionKey')) {
            const retained = getEditorSessionState<SensorsEditorExpansionState>(
                this.editorSessionKey,
                EXPANSION_STATE_KEY,
            );
            this._expandedSensorIndex = retained?.sensorIndex ?? null;
        }
        // Load sensors from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadSensors();
        }
        this.sortableList.schedule();
    }

    disconnectedCallback(): void {
        this.sortableList.disconnect();
        super.disconnectedCallback();
    }

    private _retainExpansionState(): void {
        setEditorSessionState(
            this.editorSessionKey,
            EXPANSION_STATE_KEY,
            {sensorIndex: this._expandedSensorIndex} satisfies SensorsEditorExpansionState,
        );
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
        this._retainExpansionState();
    }

    private _addSensor(): void {
        this._expandedSensorIndex = this._sensors.length;
        this._retainExpansionState();
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
            this._expandedSensorIndex = null;
        } else if (this._expandedSensorIndex !== null && this._expandedSensorIndex > index) {
            this._expandedSensorIndex -= 1;
        }
        this._retainExpansionState();
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
        this._retainExpansionState();
    }

    private _moveSensor(fromIndex: number, toIndex: number): void {
        this._expandedSensorIndex = movedListIndex(
            this._expandedSensorIndex,
            fromIndex,
            toIndex,
        );
        this._retainExpansionState();
        this._sensors = moveListItem(this._sensors, fromIndex, toIndex);
        if (!this.config) return;
        const newConfig = JSON.parse(JSON.stringify(this.config));
        newConfig.sensors = [...this._sensors];
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: {config: newConfig},
        }));
    }

    private _commitSensors(sensors: SensorConfig[]): void {
        this._sensors = sensors;
        if (!this.config) return;

        const newConfig = JSON.parse(JSON.stringify(this.config));
        newConfig.sensors = [...this._sensors];
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: {config: newConfig},
        }));
    }

    private _addColorRule(sensorIndex: number): void {
        const sensors = this._sensors.map((sensor, index) => {
            if (index !== sensorIndex) return sensor;
            const rule: SensorColorRule = {operator: '<', value: 0, color: '#ffffff'};
            return {...sensor, colorRules: [...(sensor.colorRules ?? []), rule]};
        });
        this._commitSensors(sensors);
    }

    private _removeColorRule(sensorIndex: number, ruleIndex: number): void {
        const sensors = this._sensors.map((sensor, index) => {
            if (index !== sensorIndex) return sensor;
            const colorRules = (sensor.colorRules ?? []).filter((_, currentIndex) => currentIndex !== ruleIndex);
            const updated = {...sensor};
            if (colorRules.length > 0) {
                updated.colorRules = colorRules;
            } else {
                delete updated.colorRules;
            }
            return updated;
        });
        this._commitSensors(sensors);
    }

    private _moveColorRule(sensorIndex: number, fromIndex: number, toIndex: number): void {
        const sensors = this._sensors.map((sensor, index) => {
            if (index !== sensorIndex) return sensor;
            return {...sensor, colorRules: moveListItem(sensor.colorRules ?? [], fromIndex, toIndex)};
        });
        this._commitSensors(sensors);
    }

    private _operatorOptions(): Array<{value: SensorColorOperator; label: string}> {
        return [
            {value: '<', label: this.t('editor.sensors.operator_less_than', 'Less than (<)')},
            {value: '<=', label: this.t('editor.sensors.operator_less_or_equal', 'Less than or equal (≤)')},
            {value: '>', label: this.t('editor.sensors.operator_greater_than', 'Greater than (>)')},
            {value: '>=', label: this.t('editor.sensors.operator_greater_or_equal', 'Greater than or equal (≥)')},
            {value: '=', label: this.t('editor.sensors.operator_equal', 'Equal (=)')},
            {value: '!=', label: this.t('editor.sensors.operator_not_equal', 'Not equal (≠)')},
        ];
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

            .sensor-drag-handle {
                display: grid;
                place-items: center;
                flex: 0 0 30px;
                width: 30px;
                height: 32px;
                color: var(--secondary-text-color, #aaa);
                cursor: grab;
                touch-action: none;
            }

            .sensor-drag-handle:active { cursor: grabbing; }
            .sensor-drag-handle ha-icon { --mdc-icon-size: 19px; }
            .sensor-card-ghost { opacity: 0.35; }

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

            .color-rules {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .color-rules-header,
            .color-rule-actions {
                display: flex;
                align-items: center;
            }

            .color-rules-header {
                justify-content: space-between;
                gap: 8px;
                margin-bottom: 8px;
            }

            .color-rules-title {
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .color-rule {
                display: grid;
                grid-template-columns: minmax(120px, 1fr) minmax(90px, 0.8fr) minmax(120px, 1fr) auto;
                gap: 8px;
                align-items: end;
                margin-top: 8px;
                padding: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
                border-radius: 6px;
            }

            .color-rule-actions {
                align-self: center;
            }

            .color-rule-button {
                display: grid;
                place-items: center;
                width: 30px;
                height: 30px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .color-rule-button:hover:not(:disabled),
            .color-rule-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .color-rule-button.remove:hover {
                color: var(--error-color, #db4437);
            }

            .color-rule-button:disabled {
                opacity: 0.3;
                cursor: default;
            }

            .color-rule-button ha-icon {
                --mdc-icon-size: 18px;
            }

            .add-color-rule {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                min-height: 32px;
                padding: 0 9px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 6px;
                background: transparent;
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-size: 0.82rem;
                cursor: pointer;
            }

            .add-color-rule ha-icon {
                --mdc-icon-size: 17px;
            }

            @media (max-width: 600px) {
                .color-rule {
                    grid-template-columns: 1fr 1fr;
                }

                .color-rule-actions {
                    grid-column: 1 / -1;
                    justify-content: flex-end;
                }
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
                <div class="sensor-list">
                ${this._sensors.map((sensor, index) => {
                    const expanded = this._expandedSensorIndex === index;
                    const title = sensor.label || sensor.entity || this.t('editor.sensors.sensor', 'Sensor {number}', {number: index + 1});
                    return html`
                    <div class="sensor-card ${expanded ? '' : 'collapsed'}">
                        <div class="sensor-header">
                            <span class="sensor-drag-handle"
                                  title=${this.t('designer.drag_to_move', 'Drag to move')}
                                  aria-label=${this.t('designer.drag_to_move', 'Drag to move')}>
                                <ha-icon icon="mdi:drag"></ha-icon>
                            </span>
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

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{icon: {}}}
                                .value=${sensor.icon || ''}
                                .label=${this.t('editor.sensors.icon', 'Icon')}
                                .helper=${this.t('editor.sensors.icon_help', 'Empty uses the Home Assistant entity icon')}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.icon"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex: ''}}
                                .value=${sensor.color ?? ''}
                                .label=${this.t('editor.sensors.default_color', 'Default color')}
                                .helper=${this.t('editor.sensors.default_color_help', 'Used when no conditional rule matches; empty inherits the widget color.')}
                                .labelPosition=${LabelPosition.Top}
                                propertyName="sensors.${index}.color"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <div class="color-rules">
                            <div class="color-rules-header">
                                <span class="color-rules-title">
                                    ${this.t('editor.sensors.color_rules', 'Conditional colors')}
                                </span>
                                <button class="add-color-rule" type="button"
                                        @click=${() => this._addColorRule(index)}>
                                    <ha-icon icon="mdi:plus"></ha-icon>
                                    ${this.t('editor.sensors.add_color_rule', 'Add rule')}
                                </button>
                            </div>
                            ${(sensor.colorRules ?? []).map((rule, ruleIndex, rules) => html`
                                <div class="color-rule">
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${{select: {options: this._operatorOptions(), mode: 'dropdown'}}}
                                            .value=${rule.operator}
                                            .label=${this.t('editor.sensors.operator', 'Condition')}
                                            .labelPosition=${LabelPosition.Top}
                                            propertyName="sensors.${index}.colorRules.${ruleIndex}.operator"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${{number: {step: 'any', mode: 'box'}}}
                                            .value=${rule.value}
                                            .label=${this.t('editor.sensors.threshold', 'Value')}
                                            .labelPosition=${LabelPosition.Top}
                                            propertyName="sensors.${index}.colorRules.${ruleIndex}.value"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <ha-row-selector
                                            .hass=${this.hass}
                                            .selector=${{color_hex: ''}}
                                            .value=${rule.color}
                                            .label=${this.t('editor.sensors.rule_color', 'Color')}
                                            .labelPosition=${LabelPosition.Top}
                                            propertyName="sensors.${index}.colorRules.${ruleIndex}.color"
                                            @value-changed=${this._handleFormValueChanged}
                                    ></ha-row-selector>
                                    <div class="color-rule-actions">
                                        <button class="color-rule-button" type="button"
                                                ?disabled=${ruleIndex === 0}
                                                title=${this.t('editor.sensors.move_rule_up', 'Move rule up')}
                                                aria-label=${this.t('editor.sensors.move_rule_up', 'Move rule up')}
                                                @click=${() => this._moveColorRule(index, ruleIndex, ruleIndex - 1)}>
                                            <ha-icon icon="mdi:arrow-up"></ha-icon>
                                        </button>
                                        <button class="color-rule-button" type="button"
                                                ?disabled=${ruleIndex === rules.length - 1}
                                                title=${this.t('editor.sensors.move_rule_down', 'Move rule down')}
                                                aria-label=${this.t('editor.sensors.move_rule_down', 'Move rule down')}
                                                @click=${() => this._moveColorRule(index, ruleIndex, ruleIndex + 1)}>
                                            <ha-icon icon="mdi:arrow-down"></ha-icon>
                                        </button>
                                        <button class="color-rule-button remove" type="button"
                                                title=${this.t('editor.sensors.remove_color_rule', 'Remove rule')}
                                                aria-label=${this.t('editor.sensors.remove_color_rule', 'Remove rule')}
                                                @click=${() => this._removeColorRule(index, ruleIndex)}>
                                            <ha-icon icon="mdi:delete-outline"></ha-icon>
                                        </button>
                                    </div>
                                </div>
                            `)}
                        </div>
                        </div>` : ''}
                    </div>
                `;})}
                </div>

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

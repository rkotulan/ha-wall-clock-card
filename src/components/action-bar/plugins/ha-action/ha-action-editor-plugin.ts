import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BasePluginEditor } from '../editors';
import { LabelPosition } from '../../../ha-selector/types';
import { HaActionConfig } from './types';

/**
 * Editor component for Home Assistant standard actions.
 *
 * Uses HA's native tap-action editor (the `ui_action` selector renders
 * hui-action-editor, the same UI built-in cards use), so all standard actions
 * and their fields come straight from Home Assistant. The `entity` field is
 * stored at the top level of the action config, matching what handleAction()
 * reads for more-info/toggle.
 */
@customElement('ha-action-editor-plugin')
export class HaActionEditorPlugin extends BasePluginEditor {

    get haAction(): HaActionConfig {
        return this.actionConfig as HaActionConfig;
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ entity: {} }}
                    .value=${this.haAction.entity || ''}
                    .required=${false}
                    .label=${this.t('editor.action_plugin.entity', 'Entity')}
                    .helper=${this.t('editor.action_plugin.entity_more_info_help', 'Entity used by the more-info and toggle actions')}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this.haAction.tap_action}
                    .label=${this.t('editor.action_plugin.tap_action', 'Tap action')}
                    .helper=${this.t('editor.action_plugin.tap_help', 'Standard Home Assistant action to run on tap')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('tap_action', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this.haAction.hold_action}
                    .required=${false}
                    .label=${this.t('editor.action_plugin.hold_action', 'Hold action')}
                    .helper=${this.t('editor.action_plugin.hold_help', 'Standard Home Assistant action to run on hold')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('hold_action', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this.haAction.double_tap_action}
                    .required=${false}
                    .label=${this.t('editor.action_plugin.double_action', 'Double tap action')}
                    .helper=${this.t('editor.action_plugin.double_help', 'Standard Home Assistant action to run on double tap')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('double_tap_action', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ color_hex: '' }}
                    .value=${this.haAction.activeColor || '#ffeb3b'}
                    .label=${this.t('editor.action_plugin.active_color', 'Active color')}
                    .helper=${this.t('editor.action_plugin.active_color_help', 'Color to use when the action is active')}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('activeColor', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'ha-action-editor-plugin': HaActionEditorPlugin;
    }
}

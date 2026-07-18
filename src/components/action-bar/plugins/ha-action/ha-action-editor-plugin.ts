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
                    .label=${'Entity'}
                    .helper=${'Entity used by the more-info and toggle actions'}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ ui_action: {} }}
                    .value=${this.haAction.tap_action}
                    .label=${'Tap Action'}
                    .helper=${'Standard Home Assistant action to run on tap'}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('tap_action', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        color: {
                            type: 'rgb',
                        }
                    }}
                    .value=${this.haAction.activeColor || '#ffeb3b'}
                    .label=${'Active Color'}
                    .helper=${'Color to use when the action is active'}
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

import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {SwitchToggleActionConfig} from "./types";
import {LabelPosition} from "../../../ha-selector/types";

/**
 * Editor component for switch toggle actions
 * This component provides the UI for configuring switch toggle actions
 */
@customElement('switch-toggle-editor-plugin')
export class SwitchToggleEditorPlugin extends BasePluginEditor {
    static styles = css`
        .row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .entity {
            flex: 1;
            margin-right: 8px;
        }

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `;

    /**
     * Cast the action to SwitchToggleActionConfig
     */
    get switchToggleAction(): SwitchToggleActionConfig {
        return this.actionConfig as SwitchToggleActionConfig;
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        entity: {
                            domain: 'switch'
                        }
                    }}
                    .value=${this.switchToggleAction.entity_id || ''}
                    .label=${"Switch Entity"}
                    .helper=${"Select a switch entity to toggle"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity_id', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        icon: {
                            placeholder: "Icon for switch on state",
                        }
                    }}
                    .value=${this.switchToggleAction.icon_on || ''}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when switch is on"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('icon_on', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ color_hex: "" }}
                    .value=${this.switchToggleAction.activeColor || '#4CAF50'}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the switch is on (active state)"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('activeColor', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'switch-toggle-editor-plugin': SwitchToggleEditorPlugin;
    }
}
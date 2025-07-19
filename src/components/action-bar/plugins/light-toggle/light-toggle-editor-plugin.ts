import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {LightToggleActionConfig} from "./types";
import {LabelPosition} from "../../../ha-selector/types";

/**
 * Editor component for light toggle actions
 * This component provides the UI for configuring light toggle actions
 */
@customElement('light-toggle-editor-plugin')
export class LightToggleEditorPlugin extends BasePluginEditor {
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
     * Cast the action to LightToggleActionConfig
     */
    get lightToggleAction(): LightToggleActionConfig {
        return this.actionConfig as LightToggleActionConfig;
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        entity: {
                            domain: 'light'
                        }
                    }}
                    .value=${this.lightToggleAction.entity_id || ''}
                    .label=${"Light Entity"}
                    .helper=${"Select a light entity to toggle"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity_id', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        icon: {
                            placeholder: "mdi:lightbulb-on"
                        }
                    }}
                    .value=${this.lightToggleAction.icon_on || ''}
                    .label=${"Icon (On State)"}
                    .helper=${"Icon to show when light is on"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('icon_on', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'light-toggle-editor-plugin': LightToggleEditorPlugin;
    }
}

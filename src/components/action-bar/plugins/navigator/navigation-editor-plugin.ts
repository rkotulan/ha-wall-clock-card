import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';

import {LabelPosition} from "../../../ha-selector/types";
import {NavigationActionConfig} from "./types";

/**
 * Editor component for navigation actions
 * This component provides the UI for configuring navigation actions
 */
@customElement('navigation-editor-plugin')
export class NavigationEditorPlugin extends BasePluginEditor {

    /**
     * Cast the action to NavigationActionConfig
     */
    get navigationAction(): NavigationActionConfig {
        return this.actionConfig as NavigationActionConfig;
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        text: {
                            type: "text"
                        }
                    }}
                    .value=${this.navigationAction.path || ''}
                    .label= ${"Navigation Path"}
                    .labelPosition=${LabelPosition.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${(ev: CustomEvent) => this.handleInputChange('path', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        select: {
                            options: [
                                {value: '_self', label: 'Current Tab'},
                                {value: '_blank', label: 'New Tab'}
                            ],
                            mode: 'dropdown'
                        }
                    }}
                    .value=${this.navigationAction.target || '_self'}
                    .label= ${"Open In"}
                    .labelPosition=${LabelPosition.Hidden}
                    .helper= ${"Choose where to open the link"}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('target', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'navigation-editor-plugin': NavigationEditorPlugin;
    }
}
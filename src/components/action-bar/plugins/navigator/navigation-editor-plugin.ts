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
                    .label=${this.t('editor.action_plugin.navigation_path', 'Navigation path')}
                    .labelPosition=${LabelPosition.Hidden}
                    .helper=${this.t('editor.action_plugin.navigation_help', 'Path or URL to open')}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('path', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        select: {
                            options: [
                                {value: '_self', label: this.t('editor.action_plugin.current_tab', 'Current tab')},
                                {value: '_blank', label: this.t('editor.action_plugin.new_tab', 'New tab')}
                            ],
                            mode: 'dropdown'
                        }
                    }}
                    .value=${this.navigationAction.target || '_self'}
                    .label=${this.t('editor.action_plugin.open_in', 'Open in')}
                    .labelPosition=${LabelPosition.Hidden}
                    .helper=${this.t('editor.action_plugin.navigation_help', 'Path or URL to open')}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('target', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ color_hex: "" }}
                    .value=${this.navigationAction.activeColor || '#ffeb3b'}
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
        'navigation-editor-plugin': NavigationEditorPlugin;
    }
}

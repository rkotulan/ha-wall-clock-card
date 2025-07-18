import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BasePluginEditor } from '../editors/plugin-editor-interface';
import { NavigationActionConfig } from './navigation-plugin';

/**
 * Editor component for navigation actions
 * This component provides the UI for configuring navigation actions
 */
@customElement('navigation-editor-plugin')
export class NavigationEditorPlugin extends BasePluginEditor {
    static styles = css`
        .sensor-row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .sensor-entity {
            flex: 1;
            margin-right: 8px;
        }
    `;

    /**
     * Cast the action to NavigationActionConfig
     */
    get navigationAction(): NavigationActionConfig {
        return this.action as NavigationActionConfig;
    }

    render() {
        return html`
            <div class="sensor-row">
                <div class="sensor-entity" style="width: 100%;">
                    <ha-textfield
                        label="Navigation Path"
                        .value=${this.navigationAction.path || ''}
                        style="width: 100%;"
                        @input=${(ev: CustomEvent) => this.handleInputChange('path', ev)}
                    ></ha-textfield>
                </div>
            </div>
            <div class="sensor-row">
                <div class="sensor-entity" style="width: 100%;">
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
                        .label=${"Open In"}
                        .helper=${"Choose where to open the link"}
                        @value-changed=${(ev: CustomEvent) => this.handleValueChange('target', ev)}
                    ></ha-row-selector>
                </div>
            </div>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'navigation-editor-plugin': NavigationEditorPlugin;
    }
}
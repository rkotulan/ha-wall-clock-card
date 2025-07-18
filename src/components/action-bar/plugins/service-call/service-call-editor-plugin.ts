import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BasePluginEditor } from '../editors/plugin-editor-interface';
import { ServiceCallActionConfig } from './service-call-plugin';

/**
 * Editor component for service call actions
 * This component provides the UI for configuring service call actions
 */
@customElement('service-call-editor-plugin')
export class ServiceCallEditorPlugin extends BasePluginEditor {
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
     * Cast the action to ServiceCallActionConfig
     */
    get serviceCallAction(): ServiceCallActionConfig {
        return this.action as ServiceCallActionConfig;
    }

    render() {
        return html`
            <div class="sensor-row">
                <div class="sensor-entity" style="width: 100%;">
                    <ha-textfield
                        label="Service (domain.service)"
                        .value=${this.serviceCallAction.service || ''}
                        style="width: 100%;"
                        @input=${(ev: CustomEvent) => this.handleInputChange('service', ev)}
                    ></ha-textfield>
                </div>
            </div>

            <div class="sensor-row">
                <div class="sensor-entity" style="width: 100%;">
                    <ha-textfield
                        label="Service Data (JSON)"
                        .value=${this.serviceCallAction.service_data ? JSON.stringify(this.serviceCallAction.service_data) : '{}'}
                        style="width: 100%;"
                        @input=${(ev: CustomEvent) => {
                            ev.stopPropagation();
                            ev.preventDefault();
                            const target = ev.target as HTMLElement & { value?: string };
                            if (!target) return;
                            try {
                                const data = JSON.parse(target.value || '{}');
                                this.actionChanged(this.index, 'service_data', data);
                            } catch (e) {
                                // Invalid JSON, don't update
                            }
                        }}
                    ></ha-textfield>
                </div>
            </div>

            <div class="sensor-row">
                <div class="sensor-entity" style="width: 100%;">
                    <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            boolean: {}
                        }}
                        .value=${this.serviceCallAction.confirmation || false}
                        .label=${"Require Confirmation"}
                        .helper=${"Show a confirmation dialog before calling the service"}
                        @value-changed=${(ev: CustomEvent) => this.handleValueChange('confirmation', ev)}
                    ></ha-row-selector>
                </div>
            </div>

            ${this.serviceCallAction.confirmation ? html`
                <div class="sensor-row">
                    <div class="sensor-entity" style="width: 100%;">
                        <ha-textfield
                            label="Confirmation Message"
                            .value=${this.serviceCallAction.confirmation_text || ''}
                            style="width: 100%;"
                            @input=${(ev: CustomEvent) => this.handleInputChange('confirmation_text', ev)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ''}
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'service-call-editor-plugin': ServiceCallEditorPlugin;
    }
}
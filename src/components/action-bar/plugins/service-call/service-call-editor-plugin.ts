import {html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {ServiceCallActionConfig} from "./types";
import {LabelPosition} from "../../../ha-selector/types";

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

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `;

    /**
     * State property to store the list of available services
     */
    @state() private _services: { value: string, label: string }[] = [];

    /**
     * Cast the action to ServiceCallActionConfig
     */
    get serviceCallAction(): ServiceCallActionConfig {
        return this.actionConfig as ServiceCallActionConfig;
    }

    /**
     * When the component is first updated, load the services
     */
    firstUpdated() {
        this._loadServices();
    }

    /**
     * Load the list of available services from Home Assistant
     */
    private _loadServices() {
        if (!this.hass) return;

        const services = this.hass.services;
        if (!services) return;

        const serviceOptions: { value: string, label: string }[] = [];

        // Iterate through all domains and services
        Object.keys(services).forEach(domain => {
            Object.keys(services[domain]).forEach(service => {
                serviceOptions.push({
                    value: `${domain}.${service}`,
                    label: `${domain}.${service}`
                });
            });
        });

        // Sort services alphabetically
        serviceOptions.sort((a, b) => a.label.localeCompare(b.label));

        this._services = serviceOptions;
    }

    render() {
        return html`

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        select: {
                            options: this._services,
                            mode: 'dropdown',
                            custom_value: true
                        }
                    }}
                    .value=${this.serviceCallAction.service || ''}
                    .label=${"Service"}
                    .helper= ${"Select a service or enter a custom one (domain.service)"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('service', ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        text: {
                            multiline: false,
                            type: 'text'
                        }
                    }}
                    label="Service Data (JSON)"
                    .value=${this.serviceCallAction.service_data ? JSON.stringify(this.serviceCallAction.service_data) : '{}'}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => {
                        ev.stopPropagation();
                        ev.preventDefault();
                        const target = ev.target as HTMLElement & { value?: string };
                        if (!target) return;
                        try {
                            const data = JSON.parse(ev.detail.value || '{}');
                            this.actionChanged(this.index, 'service_data', data);
                        } catch (e) {
                            // Invalid JSON, don't update
                        }
                    }}
            ></ha-row-selector>

            <div class="helper-text">Example: {"entity_id": "light.living_room"} for light.toggle service</div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        color: {
                            type: "rgb",
                        }
                    }}
                    .value=${this.serviceCallAction.activeColor || '#ffeb3b'}
                    .label=${"Active Color"}
                    .helper=${"Color to use when the service call action is active"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('activeColor', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'service-call-editor-plugin': ServiceCallEditorPlugin;
    }
}

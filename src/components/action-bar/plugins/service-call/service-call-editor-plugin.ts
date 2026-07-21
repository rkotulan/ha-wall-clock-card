import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {ServiceCallActionConfig} from "./types";
import {LabelPosition} from "../../../ha-selector/types";

/**
 * Editor component for service call actions.
 *
 * Uses HA's native service UI (the `ui_action` selector pinned to
 * perform-action renders ha-service-control): service picker with
 * per-service fields and target selection, instead of a hand-rolled
 * dropdown + raw JSON input.
 */
@customElement('service-call-editor-plugin')
export class ServiceCallEditorPlugin extends BasePluginEditor {

    /**
     * Cast the action to ServiceCallActionConfig
     */
    get serviceCallAction(): ServiceCallActionConfig {
        return this.actionConfig as ServiceCallActionConfig;
    }

    /**
     * Card config -> HA ui_action value (modern perform-action shape)
     */
    private get uiActionValue(): Record<string, any> {
        const {service, service_data, target} = this.serviceCallAction;
        return {
            action: 'perform-action',
            perform_action: service || '',
            data: service_data,
            target: target,
        };
    }

    /**
     * HA ui_action value -> card config. Accepts both the modern
     * (perform_action/data) and legacy (service/service_data) shapes.
     */
    private _serviceChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        ev.preventDefault();
        const value = ev.detail.value || {};
        this.actionChanged(this.index, 'service', value.perform_action ?? value.service ?? '');
        this.actionChanged(this.index, 'service_data', value.data ?? value.service_data);
        this.actionChanged(this.index, 'target', value.target);
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        ui_action: {
                            actions: ['perform-action'],
                            default_action: 'perform-action',
                        }
                    }}
                    .value=${this.uiActionValue}
                    .label=${this.t('editor.action_plugin.service', 'Service')}
                    .helper=${this.t('editor.action_plugin.service_help', 'Service to call, including data and target')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this._serviceChanged(ev)}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ boolean: {} }}
                    .value=${this.serviceCallAction.confirmation || false}
                    .label=${this.t('editor.action_plugin.confirmation', 'Ask for confirmation')}
                    .helper=${this.t('editor.action_plugin.confirmation_help', 'Show a confirmation dialog before calling the service')}
                    .labelPosition=${LabelPosition.Left}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('confirmation', ev)}
            ></ha-row-selector>

            ${this.serviceCallAction.confirmation ? html`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{ text: { type: 'text' } }}
                        .value=${this.serviceCallAction.confirmation_text || ''}
                        .required=${false}
                        .label=${this.t('editor.action_plugin.confirmation_text', 'Confirmation text')}
                        .helper=${this.t('editor.action_plugin.confirmation_text_help', 'Custom text for the confirmation dialog')}
                        .labelPosition=${LabelPosition.Hidden}
                        @value-changed=${(ev: CustomEvent) => this.handleValueChange('confirmation_text', ev)}
                ></ha-row-selector>
            ` : ''}

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{ color_hex: "" }}
                    .value=${this.serviceCallAction.activeColor || '#ffeb3b'}
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
        'service-call-editor-plugin': ServiceCallEditorPlugin;
    }
}

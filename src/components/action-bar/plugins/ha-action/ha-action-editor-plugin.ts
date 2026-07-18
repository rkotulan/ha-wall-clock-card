import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BasePluginEditor } from '../editors';
import { LabelPosition } from '../../../ha-selector/types';
import { HaActionConfig } from './types';

/**
 * Editor component for Home Assistant standard actions.
 *
 * Lets the user pick a standard HA action (navigate / call-service / more-info /
 * url / toggle / none) and configure the relevant fields. The action is stored
 * as a nested `tap_action` object; `more-info`/`toggle` also store `entity` at
 * the top level, matching what handleAction() reads.
 */
@customElement('ha-action-editor-plugin')
export class HaActionEditorPlugin extends BasePluginEditor {

    private static readonly ACTION_OPTIONS = [
        { value: 'navigate', label: 'Navigate' },
        { value: 'call-service', label: 'Call Service' },
        { value: 'more-info', label: 'More Info' },
        { value: 'url', label: 'URL' },
        { value: 'toggle', label: 'Toggle' },
        { value: 'none', label: 'None' },
    ];

    get haAction(): HaActionConfig {
        return this.actionConfig as HaActionConfig;
    }

    /** The current tap_action, defaulting to a navigate action. */
    get tapAction(): any {
        return this.haAction.tap_action || { action: 'navigate' };
    }

    /** Reset tap_action to a fresh config of the chosen type. */
    private setActionType(ev: CustomEvent): void {
        ev.stopPropagation();
        ev.preventDefault();
        const action = ev.detail.value || 'navigate';
        this.actionChanged(this.index, 'tap_action', { action });
    }

    /** Merge a patch into the current tap_action. */
    private patchTapAction(patch: Record<string, any>): void {
        const next = { ...this.tapAction, ...patch };
        this.actionChanged(this.index, 'tap_action', next);
    }

    render() {
        const action = this.tapAction.action || 'navigate';

        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        select: {
                            options: HaActionEditorPlugin.ACTION_OPTIONS,
                            mode: 'dropdown',
                        }
                    }}
                    .value=${action}
                    .label=${'Action'}
                    .helper=${'Standard Home Assistant action to run on tap'}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.setActionType(ev)}
            ></ha-row-selector>

            ${this.renderActionFields(action)}

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

    private renderActionFields(action: string) {
        switch (action) {
            case 'navigate':
                return html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{ text: { type: 'text' } }}
                            .value=${this.tapAction.navigation_path || ''}
                            .label=${'Navigation Path'}
                            .helper=${'e.g. /config, /history, /lovelace/0'}
                            .labelPosition=${LabelPosition.Hidden}
                            @value-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.patchTapAction({ navigation_path: ev.detail.value });
                            }}
                    ></ha-row-selector>
                `;
            case 'url':
                return html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{ text: { type: 'url' } }}
                            .value=${this.tapAction.url_path || ''}
                            .label=${'URL'}
                            .helper=${'External URL to open in a new tab'}
                            .labelPosition=${LabelPosition.Hidden}
                            @value-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.patchTapAction({ url_path: ev.detail.value });
                            }}
                    ></ha-row-selector>
                `;
            case 'more-info':
            case 'toggle':
                return html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{ entity: {} }}
                            .value=${this.haAction.entity || ''}
                            .label=${'Entity'}
                            .helper=${'Entity for the ' + action + ' action'}
                            .labelPosition=${LabelPosition.Hidden}
                            @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity', ev)}
                    ></ha-row-selector>
                `;
            case 'call-service':
                return html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{ text: { type: 'text' } }}
                            .value=${this.tapAction.service || ''}
                            .label=${'Service'}
                            .helper=${'domain.service, e.g. light.toggle'}
                            .labelPosition=${LabelPosition.Hidden}
                            @value-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.patchTapAction({ service: ev.detail.value });
                            }}
                    ></ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{ text: { multiline: false, type: 'text' } }}
                            .value=${this.tapAction.service_data ? JSON.stringify(this.tapAction.service_data) : '{}'}
                            .label=${'Service Data (JSON)'}
                            .helper=${'e.g. {"entity_id": "light.living_room"}'}
                            .labelPosition=${LabelPosition.Hidden}
                            @value-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                try {
                                    const data = JSON.parse(ev.detail.value || '{}');
                                    this.patchTapAction({ service_data: data });
                                } catch (e) {
                                    // Invalid JSON, don't update
                                }
                            }}
                    ></ha-row-selector>
                `;
            default:
                return html``;
        }
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'ha-action-editor-plugin': HaActionEditorPlugin;
    }
}

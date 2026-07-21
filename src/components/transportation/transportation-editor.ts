import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { getAllTransportationProviders, StopConfig as TransportationStopConfig } from '../../transportation-providers';

/**
 * Editor component for transportation settings
 */
@customElement('transportation-editor')
export class TransportationEditor extends BaseEditorSection {
    @property({ type: Array }) _stops: TransportationStopConfig[] = [];
    @state() private _expandedStopIndex: number | null = 0;

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // Load stops from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadStops();
        }
    }

    private _loadStops(): void {
        if (!this.config?.transportation) {
            this._stops = [];
            this._expandedStopIndex = null;
            return;
        }

        if (this.config.transportation.stops && this.config.transportation.stops.length > 0) {
            // Load stops from configuration
            this._stops = [...this.config.transportation.stops];
        } else {
            // No stops configured
            this._stops = [];
        }
        if (this._stops.length === 0) {
            this._expandedStopIndex = null;
        } else if (this._expandedStopIndex !== null) {
            this._expandedStopIndex = Math.min(this._expandedStopIndex, this._stops.length - 1);
        }
    }

    private _addStop(): void {
        this._expandedStopIndex = this._stops.length;
        this._stops = [...this._stops, {stopId: 1793, postId: 3, name: ''}];
        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure transportation config exists
            if (!newConfig.transportation) {
                newConfig.transportation = {
                    provider: 'idsjmk', // Default to IDSJMK provider
                    stops: [],
                    maxDepartures: 2
                };
            }

            // Ensure stops array exists
            if (!newConfig.transportation.stops) {
                newConfig.transportation.stops = [];
            }

            // Update stops
            newConfig.transportation.stops = [...this._stops];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _removeStop(index: number): void {
        this._stops = this._stops.filter((_, i) => i !== index);
        if (this._stops.length === 0) {
            this._expandedStopIndex = null;
        } else if (this._expandedStopIndex === index) {
            this._expandedStopIndex = Math.min(index, this._stops.length - 1);
        } else if (this._expandedStopIndex !== null && this._expandedStopIndex > index) {
            this._expandedStopIndex -= 1;
        }
        // Update the config with a deep copy
        if (this.config && this.config.transportation) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure transportation config exists
            if (!newConfig.transportation) {
                newConfig.transportation = {
                    provider: 'idsjmk', // Default to IDSJMK provider
                    stops: [],
                    maxDepartures: 2
                };
            }

            // Ensure stops array exists
            if (!newConfig.transportation.stops) {
                newConfig.transportation.stops = [];
            }

            // Update stops
            newConfig.transportation.stops = [...this._stops];

            // If no stops left, remove transportation config
            if (this._stops.length === 0) {
                newConfig.transportation = undefined;
            }

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _stopChanged(index: number, property: string, value: any): void {
        this._stops = this._stops.map((stop, i) => {
            if (i === index) {
                return {...stop, [property]: value};
            }
            return stop;
        });

        // Update the config with a deep copy
        if (this.config && this.config.transportation) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure transportation config exists
            if (!newConfig.transportation) {
                newConfig.transportation = {
                    stops: [],
                    maxDepartures: 2
                };
            }

            // Ensure stops array exists
            if (!newConfig.transportation.stops) {
                newConfig.transportation.stops = [];
            }

            // Update stops
            newConfig.transportation.stops = [...this._stops];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _toggleStop(index: number): void {
        this._expandedStopIndex = this._expandedStopIndex === index ? null : index;
    }

    /** Stop/platform IDs may be numeric or textual depending on the provider. */
    private _normalizeStopId(value: unknown): number | string | undefined {
        const text = String(value ?? '').trim();
        if (!text) return undefined;
        return /^-?\d+$/.test(text) ? Number(text) : text;
    }

    // Transportation provider options
    private _getTransportationProviderOptions(): { value: string, label: string }[] {
        const providers = getAllTransportationProviders();
        return [
            ...providers.map(provider => ({
                value: provider.id,
                label: provider.name
            }))
        ];
    }

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 25px 0 5px 0;
            }
            
            .stop-card {
                margin: 10px 0;
                padding: 8px 10px 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--card-background-color, rgba(255, 255, 255, 0.04));
            }

            .stop-card.collapsed .stop-header {
                margin-bottom: 0;
            }

            .stop-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 2px;
            }

            .stop-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .stop-toggle strong {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
            }

            .stop-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .stop-icon-button ha-icon { --mdc-icon-size: 18px; }

            .stop-icon-button:hover,
            .stop-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .stop-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .stop-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .stop-card ha-row-selector {
                display: block;
                width: 100%;
                padding: 3px 0;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        // Only render if transportation is enabled
        if (!this.config.transportation?.enabled) {
            return html``;
        }

        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._getTransportationProviderOptions(),
                                mode: "dropdown"
                            }
                        }}
                        .value=${this.config.transportation?.provider || 'idsjmk'}
                        .label=${this.t('editor.transportation.provider', 'Transportation provider')}
                        propertyName="transportation.provider"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            number: {
                                min: 1,
                                max: 5,
                                step: 1,
                                mode: "slider"
                            }
                        }}
                        .value=${this.config.transportation?.maxDepartures || 2}
                        .label=${this.t('editor.transportation.max_departures', 'Global maximum departures')}
                        .helper=${this.t('editor.transportation.departures', '{count} departures', {count: this.config.transportation?.maxDepartures || 2})}
                        propertyName="transportation.maxDepartures"
                        @value-changed=${(ev: CustomEvent) => {
                            this._handleFormValueChanged(ev);
                            // Reload stops after the config has been updated
                            this._loadStops();
                        }}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            number: {
                                min: 1,
                                max: 10,
                                step: 1,
                                mode: "box"
                            }
                        }}
                        .value=${this.config.transportation?.autoHideTimeout || 5}
                        .label=${this.t('editor.transportation.auto_hide', 'Auto-hide timeout')}
                        .helper=${this.t('editor.transportation.auto_hide_help', 'Auto-hide timeout in minutes (1–10)')}
                        propertyName="transportation.autoHideTimeout"
                        .transformData=${(value: number) => {
                            // Ensure value is between 1 and 10 minutes
                            return Math.max(Math.min(value || 5, 10), 1);
                        }}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            number: {
                                min: 1,
                                step: 1,
                                mode: "box"
                            }
                        }}
                        .value=${Math.floor((this.config.transportation.updateInterval || 60) / 60)}
                        .label=${this.t('editor.transportation.update_interval', 'Update interval')}
                        .helper=${this.t('editor.transportation.update_help', 'Update interval in minutes (minimum 1)')}
                        propertyName="transportation.updateInterval"
                        .transformData=${(value: number) => {
                            // Ensure minimum of 1 minute
                            const intervalMinutes = Math.max(value || 1, 1);
                            // Convert minutes to seconds for internal storage
                            return intervalMinutes * 60;
                        }}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <div class="section-subheader">${this.t('editor.transportation.stops', 'Stops')}</div>

                ${this._stops.map((stop, index) => {
                    const expanded = this._expandedStopIndex === index;
                    return html`
                    <div class="stop-card ${expanded ? '' : 'collapsed'}">
                        <div class="stop-header">
                            <button class="stop-toggle" type="button"
                                    aria-expanded=${expanded}
                                    @click=${() => this._toggleStop(index)}>
                                <strong>${stop.name || this.t('editor.transportation.stop', 'Stop {number}', {number: index + 1})}</strong>
                            </button>
                            <button class="stop-icon-button remove" type="button"
                                    title=${this.t('editor.transportation.remove_stop', 'Remove stop')}
                                    aria-label=${this.t('editor.transportation.remove_stop', 'Remove stop')}
                                    @click=${() => this._removeStop(index)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="stop-icon-button" type="button"
                                    title=${expanded ? this.t('editor.transportation.collapse_stop', 'Collapse stop') : this.t('editor.transportation.expand_stop', 'Expand stop')}
                                    aria-label=${expanded ? this.t('editor.transportation.collapse_stop', 'Collapse stop') : this.t('editor.transportation.expand_stop', 'Expand stop')}
                                    @click=${() => this._toggleStop(index)}>
                                <ha-icon icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                            </button>
                        </div>
                        ${expanded ? html`<div class="stop-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text: {}}}
                                .value=${String(stop.stopId ?? '')}
                                .label=${this.t('editor.transportation.stop_id', 'Stop ID')}
                                @value-changed=${(ev: CustomEvent) =>
                                    this._stopChanged(index, 'stopId', this._normalizeStopId(ev.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text: {}}}
                                .value=${String(stop.postId ?? '')}
                                .label=${this.t('editor.transportation.post_id', 'Post ID')}
                                @value-changed=${(ev: CustomEvent) =>
                                    this._stopChanged(index, 'postId', this._normalizeStopId(ev.detail.value))}>
                        </ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{text: {}}}
                                .value=${stop.name ?? ''}
                                .label=${this.t('editor.transportation.stop_name', 'Stop name (optional)')}
                                @value-changed=${(ev: CustomEvent) =>
                                    this._stopChanged(index, 'name', ev.detail.value || '')}>
                        </ha-row-selector>
                        </div>` : ''}
                    </div>
                `;})}

                <mwc-button @click=${this._addStop}>${this.t('editor.transportation.add_stop', 'Add stop')}</mwc-button>

                <div class="info-text">
                    <a
                        href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/transportation.md"
                        target="_blank">${this.t('editor.transportation.documentation', 'Transportation configuration documentation')}</a>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'transportation-editor': TransportationEditor;
    }
}

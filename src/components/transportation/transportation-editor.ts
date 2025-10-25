import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { getAllTransportationProviders, StopConfig as TransportationStopConfig } from '../../transportation-providers';

/**
 * Editor component for transportation settings
 */
@customElement('transportation-editor')
export class TransportationEditor extends BaseEditorSection {
    @property({ type: Array }) _stops: TransportationStopConfig[] = [];

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
            return;
        }

        if (this.config.transportation.stops && this.config.transportation.stops.length > 0) {
            // Load stops from configuration
            this._stops = [...this.config.transportation.stops];
        } else {
            // No stops configured
            this._stops = [];
        }
    }

    private _addStop(): void {
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
            
            .sensor-row {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
            }
            
            .sensor-entity {
                flex: 2;
                margin-right: 8px;
            }
            
            .sensor-label {
                flex: 1;
                margin-right: 8px;
            }
            
            .sensor-actions {
                flex: 0 0 40px;
                text-align: center;
                margin-top: 20px;
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
                        .label= ${"Transportation Provider"}
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
                        .label= ${"Global Max Departures"}
                        .helper=${`${this.config.transportation?.maxDepartures || 2} departures`}
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
                        .label= ${"Auto-Hide Timeout"}
                        .helper= ${"Auto-hide timeout in minutes (1-10)"}
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
                        .label= ${"Update Interval"}
                        .helper= ${"Update interval in minutes (min: 1)"}
                        propertyName="transportation.updateInterval"
                        .transformData=${(value: number) => {
                            // Ensure minimum of 1 minute
                            const intervalMinutes = Math.max(value || 1, 1);
                            // Convert minutes to seconds for internal storage
                            return intervalMinutes * 60;
                        }}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <div class="section-subheader">Stops</div>

                ${this._stops.map((stop, index) => html`
                    <div class="sensor-row">
                        <div class="sensor-entity">
                            <ha-textfield
                                    label="Stop ID"
                                    type="number"
                                    .value=${stop.stopId || 1793}
                                    @input=${(ev: CustomEvent) => {
                                        ev.stopPropagation();
                                        ev.preventDefault();

                                        const target = ev.target as HTMLElement & { value?: string };
                                        if (!target) return;

                                        this._stopChanged(index, 'stopId', parseInt(target.value || '1793', 10));
                                    }}
                            ></ha-textfield>
                        </div>
                        <div class="sensor-label">
                            <ha-textfield
                                    label="Post ID"
                                    type="number"
                                    .value=${stop.postId || 3}
                                    @input=${(ev: CustomEvent) => {
                                        ev.stopPropagation();
                                        ev.preventDefault();

                                        const target = ev.target as HTMLElement & { value?: string };
                                        if (!target) return;

                                        this._stopChanged(index, 'postId', parseInt(target.value || '3', 10));
                                    }}
                            ></ha-textfield>
                        </div>
                    </div>
                    <div class="sensor-row" style="margin-bottom: 16px; padding-bottom: 16px;">
                        <div class="sensor-entity" style="width: 100%;">
                            <ha-textfield
                                    label="Stop Name (optional)"
                                    .value=${stop.name || ''}
                                    style="width: 100%;"
                                    @input=${(ev: CustomEvent) => {
                                        ev.stopPropagation();
                                        ev.preventDefault();

                                        const target = ev.target as HTMLElement & { value?: string };
                                        if (!target) return;

                                        this._stopChanged(index, 'name', target.value || '');
                                    }}
                            ></ha-textfield>
                        </div>
                        <div class="sensor-actions">
                            <ha-icon-button
                                    .path=${'M19,13H5V11H19V13Z'}
                                    @click=${() => this._removeStop(index)}
                            ></ha-icon-button>
                        </div>
                    </div>
                `)}

                <mwc-button @click=${this._addStop}>Add Stop</mwc-button>

                <div class="info-text">
                    For detailed documentation on transportation configuration, see <a
                        href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/transportation.md"
                        target="_blank">transportation.md</a>
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
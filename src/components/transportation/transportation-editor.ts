import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import {
    getAllTransportationProviders,
    HomeAssistantTransportationProfile,
    StopConfig as TransportationStopConfig,
} from '../../transportation-providers';

// The HA editor may recreate the custom card after every staged config change.
// Retain the open section across that recreation, just like the layout inspector
// retains its selected settings tab.
let retainedExpandedHaProfileIndex: number | null = 0;

/**
 * Editor component for transportation settings
 */
@customElement('transportation-editor')
export class TransportationEditor extends BaseEditorSection {
    @property({ type: Array }) _stops: TransportationStopConfig[] = [];
    @state() private _expandedStopIndex: number | null = 0;
    @state() private _haProfiles: HomeAssistantTransportationProfile[] = [];
    @state() private _expandedHaProfileIndex: number | null = retainedExpandedHaProfileIndex;

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // Load stops from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadStops();
            this._loadHaProfiles();
        }
    }

    private _loadHaProfiles(): void {
        const transportation = this.config?.transportation;
        const providerConfig = transportation?.providerConfig;
        const configuredProfiles = providerConfig?.profiles as HomeAssistantTransportationProfile[] | undefined;

        if (configuredProfiles?.length) {
            this._haProfiles = configuredProfiles.map(profile => ({
                ...profile,
                departureEntities: [...(profile.departureEntities || [])],
            }));
        } else {
            const buttons: string[] = providerConfig?.refreshButtonEntities?.length
                ? providerConfig.refreshButtonEntities
                : providerConfig?.refreshButtonEntity
                    ? [providerConfig.refreshButtonEntity]
                    : [];
            const entities: string[] = [...(providerConfig?.departureEntities || [])];

            if (buttons.length <= 1) {
                this._haProfiles = buttons.length || entities.length ? [{
                    refreshButtonEntity: buttons[0],
                    departureEntities: entities,
                }] : [];
            } else {
                // Legacy configuration stored two unrelated flat arrays. Their
                // display order is the only available association between them.
                const chunkSize = Math.ceil(entities.length / buttons.length);
                this._haProfiles = buttons.map((button, index) => ({
                    refreshButtonEntity: button,
                    departureEntities: chunkSize
                        ? entities.slice(index * chunkSize, (index + 1) * chunkSize)
                        : [],
                }));
            }
        }

        if (this._haProfiles.length === 0) {
            this._expandedHaProfileIndex = null;
        } else if (this._expandedHaProfileIndex !== null) {
            this._expandedHaProfileIndex = Math.min(
                this._expandedHaProfileIndex,
                this._haProfiles.length - 1,
            );
        }
        retainedExpandedHaProfileIndex = this._expandedHaProfileIndex;
    }

    private _saveHaProfiles(): void {
        if (!this.config?.transportation) return;

        const newConfig = JSON.parse(JSON.stringify(this.config));
        newConfig.transportation.providerConfig ||= {};
        newConfig.transportation.providerConfig.profiles = this._haProfiles.map(profile => {
            const {maxDepartures: _legacyMaxDepartures, ...profileConfig} = profile;
            return {
                ...profileConfig,
                departureEntities: [...(profile.departureEntities || [])],
            };
        });

        // Once edited, persist only the grouped format. The provider continues
        // to read these legacy keys for existing YAML configurations.
        delete newConfig.transportation.providerConfig.refreshButtonEntity;
        delete newConfig.transportation.providerConfig.refreshButtonEntities;
        delete newConfig.transportation.providerConfig.departureEntities;
        delete newConfig.transportation.maxDepartures;

        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: {config: newConfig},
        }));
    }

    private _addHaProfile(): void {
        this._expandedHaProfileIndex = this._haProfiles.length;
        retainedExpandedHaProfileIndex = this._expandedHaProfileIndex;
        this._haProfiles = [...this._haProfiles, {
            name: '',
            refreshButtonEntity: '',
            departureEntities: [],
        }];
        this._saveHaProfiles();
    }

    private _removeHaProfile(index: number): void {
        this._haProfiles = this._haProfiles.filter((_, profileIndex) => profileIndex !== index);
        if (this._haProfiles.length === 0) {
            this._expandedHaProfileIndex = null;
        } else if (this._expandedHaProfileIndex === index) {
            this._expandedHaProfileIndex = Math.min(index, this._haProfiles.length - 1);
        } else if (this._expandedHaProfileIndex !== null && this._expandedHaProfileIndex > index) {
            this._expandedHaProfileIndex -= 1;
        }
        retainedExpandedHaProfileIndex = this._expandedHaProfileIndex;
        this._saveHaProfiles();
    }

    private _haProfileChanged(
        index: number,
        property: keyof HomeAssistantTransportationProfile,
        value: unknown,
    ): void {
        this._haProfiles = this._haProfiles.map((profile, profileIndex) =>
            profileIndex === index ? {...profile, [property]: value} : profile,
        );
        this._saveHaProfiles();
    }

    private _toggleHaProfile(index: number): void {
        this._expandedHaProfileIndex = this._expandedHaProfileIndex === index ? null : index;
        retainedExpandedHaProfileIndex = this._expandedHaProfileIndex;
    }

    private _haProfileLabel(profile: HomeAssistantTransportationProfile, index: number): string {
        const configuredName = profile.name?.trim();
        if (configuredName) return configuredName;

        const friendlyName = profile.refreshButtonEntity
            ? this.hass?.states[profile.refreshButtonEntity]?.attributes.friendly_name
            : undefined;
        if (friendlyName) {
            const stopName = String(friendlyName)
                .replace(/\s+(Aktualizovat odjezdy|Refresh departures)$/iu, '')
                .trim();
            if (stopName) return stopName;
        }

        return this.t('editor.transportation.stop', 'Stop {number}', {number: index + 1});
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

            .add-stop {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-stop:hover,
            .add-stop:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-stop ha-icon {
                --mdc-icon-size: 19px;
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

        const isHomeAssistant = this.config.transportation.provider === 'homeassistant';

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

                ${isHomeAssistant ? html`
                    <div class="section-subheader">${this.t('editor.transportation.stops', 'Stops')}</div>

                    ${this._haProfiles.map((profile, index) => {
                        const expanded = this._expandedHaProfileIndex === index;
                        return html`
                        <div class="stop-card ${expanded ? '' : 'collapsed'}">
                            <div class="stop-header">
                                <button class="stop-toggle" type="button"
                                        aria-expanded=${expanded}
                                        @click=${() => this._toggleHaProfile(index)}>
                                    <strong>${this._haProfileLabel(profile, index)}</strong>
                                </button>
                                <button class="stop-icon-button remove" type="button"
                                        title=${this.t('editor.transportation.remove_stop', 'Remove stop')}
                                        aria-label=${this.t('editor.transportation.remove_stop', 'Remove stop')}
                                        @click=${() => this._removeHaProfile(index)}>
                                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                                </button>
                                <button class="stop-icon-button" type="button"
                                        title=${expanded ? this.t('editor.transportation.collapse_stop', 'Collapse stop') : this.t('editor.transportation.expand_stop', 'Expand stop')}
                                        aria-label=${expanded ? this.t('editor.transportation.collapse_stop', 'Collapse stop') : this.t('editor.transportation.expand_stop', 'Expand stop')}
                                        @click=${() => this._toggleHaProfile(index)}>
                                    <ha-icon icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                                </button>
                            </div>
                            ${expanded ? html`<div class="stop-body">
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{text: {}}}
                                        .value=${profile.name || ''}
                                        .label=${this.t('editor.transportation.stop_name', 'Stop name (optional)')}
                                        @value-changed=${(ev: CustomEvent) =>
                                            this._haProfileChanged(index, 'name', ev.detail.value || '')}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity: {domain: "button"}}}
                                        .value=${profile.refreshButtonEntity || ''}
                                        .label=${this.t('editor.transportation.refresh_button', 'Refresh button entity')}
                                        .helper=${this.t('editor.transportation.refresh_button_help', 'This profile is activated when departures are opened')}
                                        @value-changed=${(ev: CustomEvent) =>
                                            this._haProfileChanged(index, 'refreshButtonEntity', ev.detail.value || '')}>
                                </ha-row-selector>
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{entity: {domain: "sensor", device_class: "duration", multiple: true}}}
                                        .value=${profile.departureEntities || []}
                                        .label=${this.t('editor.transportation.departure_entities', 'Departure sensor entities')}
                                        .helper=${this.t('editor.transportation.departure_entities_help', 'Select the sensors in display order')}
                                        @value-changed=${(ev: CustomEvent) =>
                                            this._haProfileChanged(index, 'departureEntities', ev.detail.value || [])}>
                                </ha-row-selector>
                            </div>` : ''}
                        </div>
                    `;})}

                    <button class="add-stop" type="button" @click=${this._addHaProfile}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${this.t('editor.transportation.add_stop', 'Add stop')}
                    </button>

                    <div class="info-text">
                        ${this.t('editor.transportation.ha_provider_help', 'The refresh button activates server-side polling; sensor state updates are then pushed by Home Assistant.')}
                    </div>
                ` : ''}

                ${!isHomeAssistant ? html`<ha-row-selector
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
                        .label=${this.t('editor.transportation.max_departures', 'Maximum departures per stop')}
                        .helper=${this.t('editor.transportation.departures', '{count} departures', {count: this.config.transportation?.maxDepartures || 2})}
                        propertyName="transportation.maxDepartures"
                        @value-changed=${(ev: CustomEvent) => {
                            this._handleFormValueChanged(ev);
                            // Reload stops after the config has been updated
                            this._loadStops();
                        }}
                ></ha-row-selector>` : ''}

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

                ${!isHomeAssistant ? html`<ha-row-selector
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
                ></ha-row-selector>` : ''}

                ${!isHomeAssistant ? html`
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

                <button class="add-stop" type="button" @click=${this._addStop}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                    ${this.t('editor.transportation.add_stop', 'Add stop')}
                </button>
                ` : ''}

                <div class="info-text">
                    <a
                        href="https://github.com/rkotulan/ha-wall-clock-card/blob/main/docs/transportation.md"
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

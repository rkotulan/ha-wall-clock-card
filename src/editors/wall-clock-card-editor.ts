import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TemplateResult, CSSResult} from 'lit';
import {HomeAssistant, fireEvent, LovelaceCardEditor, LovelaceCardConfig} from 'custom-card-helpers';
import {WallClockConfig} from '../core/wall-clock-card';
import {SensorConfig} from '../core/types';
import {BackgroundImage} from '../image-sources';
import {StopConfig as TransportationStopConfig} from '../transportation-providers';
import {ModuleActionConfig} from '../components/action-bar';

// Import editor components
// These imports are needed for the custom elements to work
// even though TypeScript thinks they are unused
import '../components/editors';
import '../components/action-bar/plugins/navigator/navigation-editor-plugin';
import '../components/action-bar/plugins/service-call/service-call-editor-plugin';
import '../components/action-bar/plugins/weather-update/weather-update-editor-plugin';
import {getLanguageOptions, ExtendedDateTimeFormatOptions} from '../utils';
import {setPropertyByPath} from '../utils';

@customElement('wall-clock-card-editor')
export class WallClockCardEditor extends LitElement implements LovelaceCardEditor {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) _config?: WallClockConfig;
    @property({type: Array}) _sensors: SensorConfig[] = [];
    @property({type: Array}) _backgroundImages: BackgroundImage[] = [];
    @property({type: Array}) _stops: TransportationStopConfig[] = [];
    @property({type: Array}) _actions: ModuleActionConfig[] = [];

    // Language options from lokalify
    private _languageOptions: { value: string, label: string }[] = [];
    connectedCallback(): void {
        super.connectedCallback();
        // Color picker and other HA form elements are now automatically loaded

        // Initialize language options from lokalify
        this._languageOptions = getLanguageOptions();
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);
    }



    setConfig(config: LovelaceCardConfig): void {
        // Cast the config to WallClockConfig
        const wallClockConfig = config as WallClockConfig;

        // Set default imageSource if not provided
        const imageSource = wallClockConfig.imageSource || 'none';

        // Create a default timeFormat
        let timeFormat: ExtendedDateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        // If timeFormat is provided in the config, merge it with the default
        if (wallClockConfig.timeFormat) {
            timeFormat = {...timeFormat, ...wallClockConfig.timeFormat};

            // Explicitly handle the case when second is undefined
            if (wallClockConfig.timeFormat.second === undefined) {
                timeFormat.second = undefined;
            }
        }

        this._config = {
            ...wallClockConfig,
            timeFormat,
            dateFormat: wallClockConfig.dateFormat || {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            },
            backgroundOpacity: wallClockConfig.backgroundOpacity !== undefined ? wallClockConfig.backgroundOpacity : 0.3,
            imageSource: imageSource,
            imageConfig: wallClockConfig.imageConfig || {},
            backgroundRotationInterval: wallClockConfig.backgroundRotationInterval || 90,
            sensors: wallClockConfig.sensors || [],
            fontColor: wallClockConfig.fontColor || '#FFFFFF',
            // Weather settings
            showWeather: wallClockConfig.showWeather !== undefined ? wallClockConfig.showWeather : false,
            weatherProvider: wallClockConfig.weatherProvider || 'openweathermap',
            weatherConfig: wallClockConfig.weatherConfig || {},
            weatherDisplayMode: wallClockConfig.weatherDisplayMode || 'both',
            weatherForecastDays: wallClockConfig.weatherForecastDays || 3,
            // Transportation settings
            transportation: wallClockConfig.transportation || undefined
        };

        // Load sensors from config
        this._loadSensors();

        // Load unified background images from config
        this._loadBackgroundImages();

        // Load stops from config
        this._loadStops();

        // Load actions from config
        this._loadActions();
    }

    private _loadSensors(): void {
        if (this._config?.sensors && this._config.sensors.length > 0) {
            this._sensors = [...this._config.sensors];
        } else {
            this._sensors = [];
        }
    }

    private _loadStops(): void {
        if (!this._config?.transportation) {
            this._stops = [];
            return;
        }

        if (this._config.transportation.stops && this._config.transportation.stops.length > 0) {
            // Load stops from configuration
            this._stops = [...this._config.transportation.stops];
        } else {
            // No stops configured
            this._stops = [];
        }
    }

    private _loadActions(): void {
        if (!this._config?.actionBar) {
            this._actions = [];
            return;
        }

        if (this._config.actionBar.actions && this._config.actionBar.actions.length > 0) {
            // Load actions from configuration
            this._actions = [...this._config.actionBar.actions];
        } else {
            // No actions configured
            this._actions = [];
        }
    }


    private _loadBackgroundImages(): void {
        if (this._config?.backgroundImages && this._config.backgroundImages.length > 0) {
            // Use the structure if available
            this._backgroundImages = [...this._config.backgroundImages];
        } else {
            // Initialize empty array
            this._backgroundImages = [];
        }
    }





    // Handle form value changes
    private _handleFormValueChanged(ev: CustomEvent) {
        ev.stopPropagation();

        if (!this._config) return;

        // Create a deep copy of the config and set the property value
        const newConfig = setPropertyByPath(this._config, ev.detail.propertyName, ev.detail.value);

        // Update the local config reference
        this._config = newConfig;

        // Fire the config-changed event with the new config
        fireEvent(this, 'config-changed', {config: newConfig});
    };

    static get styles(): CSSResult {
        return css`
            .form-container {
                display: flex;
                flex-direction: column;
                padding: 16px;
            }

            .content {
                padding: 12px;
            }

            ha-expansion-panel {
                margin-bottom: 8px;
            }

            ha-selector, ha-textfield, ha-select {
                width: 100%;
            }
        `;
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <div class="form-container">
                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex: ""}}
                                .value=${this._config.fontColor}
                                .label= ${"Font Color"}
                                propertyName="fontColor"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._languageOptions,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.language || 'en'}
                                .label=${"Language"}
                                propertyName="language"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: [
                                            {value: "debug", label: "Debug"},
                                            {value: "info", label: "Info"},
                                            {value: "warn", label: "Warning"},
                                            {value: "error", label: "Error"},
                                            {value: "none", label: "None"}
                                        ],
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.logLevel || 'info'}
                                .label= ${"Log Level"}
                                propertyName="logLevel"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <time-format-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></time-format-editor>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <date-format-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></date-format-editor>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            // Update local background images array
                            this._loadBackgroundImages();
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></background-editor>
                </ha-expansion-panel>

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <sensors-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            // Update local sensors array
                            this._loadSensors();
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></sensors-editor>
                </ha-expansion-panel>

                <!-- Weather Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Weather Forecast</h3>
                    <weather-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></weather-editor>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${this._config.transportation?.enable === true ? html`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <transportation-editor
                            .hass=${this.hass}
                            .config=${this._config}
                            @config-changed=${(ev: CustomEvent) => {
                                this._config = ev.detail.config;
                                // Update local stops array
                                this._loadStops();
                                fireEvent(this, 'config-changed', {config: this._config});
                            }}
                        ></transportation-editor>
                    </ha-expansion-panel>
                ` : ''}

                <!-- Action Bar Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Action Bar</h3>
                    <action-bar-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            // Update local actions array
                            this._loadActions();
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></action-bar-editor>
                </ha-expansion-panel>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wall-clock-card-editor': WallClockCardEditor;
    }
}

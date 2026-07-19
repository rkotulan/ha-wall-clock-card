import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TemplateResult, CSSResult} from 'lit';
import {HomeAssistant, fireEvent, LovelaceCardEditor, LovelaceCardConfig} from 'custom-card-helpers';
import {WallClockConfig, Size} from '../core/types';
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
import './layout-editor';
import {getLanguageOptions, ExtendedDateTimeFormatOptions} from '../utils';
import {setPropertyByPath} from '../utils';
import {WallClockConfigV3} from '../core/layout-types';
import {applyGeneralSetting} from './layout-editor-logic';
import {fromBackgroundEditorConfig, toBackgroundEditorConfig} from './widget-editor-adapters';

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

        // v3 (zone layout) configs are stored as-is: the v2 defaulting below would
        // add legacy root keys that leak into the emitted YAML.
        if (wallClockConfig.layout) {
            this._config = wallClockConfig;
            return;
        }

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
            // Size settings
            size: wallClockConfig.size || Size.Medium,
            customSizes: wallClockConfig.customSizes
                ? {
                    clockSize: wallClockConfig.customSizes.clockSize ?? '16rem',
                    dateSize: wallClockConfig.customSizes.dateSize ?? '6rem',
                    labelSize: wallClockConfig.customSizes.labelSize ?? '1.5rem',
                    valueSize: wallClockConfig.customSizes.valueSize ?? '3rem',
                    actionBarIconSize: wallClockConfig.customSizes.actionBarIconSize ?? '72px',
                    clockTopMargin: wallClockConfig.customSizes.clockTopMargin ?? '0rem'
                }
                : {
                    clockSize: '16rem',
                    dateSize: '6rem',
                    labelSize: '1.5rem',
                    valueSize: '3rem',
                    actionBarIconSize: '72px',
                    clockTopMargin: '0rem'
                },
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





    /** True once the config uses the v3 zone layout shape. */
    private get _isV3(): boolean {
        return !!this._config?.layout;
    }

    /** General-section value: appearance.* for v3 configs, root key for v2. */
    private _generalValue(key: 'fontColor' | 'language' | 'size'): unknown {
        if (this._isV3) {
            return (this._config as unknown as WallClockConfigV3).appearance?.[key];
        }
        return this._config?.[key];
    }

    /** Custom-size field value: v2 reads customSizes.*, v3 reads the owning widget. */
    private _sizeValue(v2Key: string, widgetType: string, widgetKey: string, fallback: string): string {
        if (this._isV3) {
            // labelSize/valueSize live on both sensors and weather widgets
            const alternate = widgetType === 'sensors' ? this._widgetSizeValue('weather', widgetKey) : undefined;
            return this._widgetSizeValue(widgetType, widgetKey) ?? alternate ?? fallback;
        }
        const customSizes = (this._config?.customSizes ?? {}) as Record<string, string | undefined>;
        return customSizes[v2Key] ?? fallback;
    }

    /** Custom-size value for v3 configs: read from the first widget of the type. */
    private _widgetSizeValue(widgetType: string, key: string): string | undefined {
        const zones = (this._config as unknown as WallClockConfigV3).layout?.zones ?? {};
        for (const zone of Object.values(zones)) {
            for (const widget of zone?.widgets ?? []) {
                if (widget.type === widgetType && widget[key] !== undefined) {
                    return widget[key] as string;
                }
            }
        }
        return undefined;
    }

    // Handle form value changes
    private _handleFormValueChanged(ev: CustomEvent) {
        ev.stopPropagation();

        if (!this._config) return;

        // v3 configs route General settings into appearance.* / the owning widgets
        if (this._isV3) {
            const updated = applyGeneralSetting(
                this._config as unknown as WallClockConfigV3,
                ev.detail.propertyName,
                ev.detail.value,
            );
            this._config = updated as unknown as WallClockConfig;
            fireEvent(this, 'config-changed', {config: this._config});
            return;
        }

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
                <!-- Layout Section (zones + widgets + drag & drop) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Layout</h3>
                    <layout-editor
                        .hass=${this.hass}
                        .config=${this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            this._config = ev.detail.config;
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></layout-editor>
                </ha-expansion-panel>

                <!-- General Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">General</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{color_hex: ""}}
                                .value=${this._generalValue('fontColor')}
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
                                .value=${this._generalValue('language') || 'en'}
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

                        <!-- Size Settings -->
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: [
                                            {value: Size.Large, label: "Large"},
                                            {value: Size.Medium, label: "Medium"},
                                            {value: Size.Small, label: "Small"},
                                            {value: Size.Custom, label: "Custom"}
                                        ],
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._generalValue('size') || Size.Medium}
                                .label= ${"Size"}
                                propertyName="size"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${(this._generalValue('size') || Size.Medium) === Size.Custom ? html`
                            <h4>Custom Sizes</h4>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{ text: {} }}
                                    .value=${this._sizeValue('clockSize', 'clock', 'clockSize', '16rem')}
                                    .label= ${"Clock Size (e.g., 16rem)"}
                                    propertyName="customSizes.clockSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${!this._isV3 ? html`
                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{ text: {} }}
                                        .value=${this._config.customSizes?.clockTopMargin || '0rem'}
                                        .label= ${"Clock Top Margin (e.g., 0rem)"}
                                        propertyName="customSizes.clockTopMargin"
                                        @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            ` : ''}

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{ text: {} }}
                                    .value=${this._sizeValue('dateSize', 'date', 'dateSize', '6rem')}
                                    .label= ${"Date Size (e.g., 6rem)"}
                                    propertyName="customSizes.dateSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{ text: {} }}
                                    .value=${this._sizeValue('labelSize', 'sensors', 'labelSize', '1.5rem')}
                                    .label= ${"Label Size (e.g., 1.5rem)"}
                                    propertyName="customSizes.labelSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{ text: {} }}
                                    .value=${this._sizeValue('valueSize', 'sensors', 'valueSize', '3rem')}
                                    .label= ${"Value Size (e.g., 3rem)"}
                                    propertyName="customSizes.valueSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{ text: {} }}
                                    .value=${this._sizeValue('actionBarIconSize', 'action-bar', 'iconSize', '72px')}
                                    .label= ${"Action Bar Icon Size (e.g., 72px)"}
                                    propertyName="customSizes.actionBarIconSize"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>
                        ` : ''}
                    </div>
                </ha-expansion-panel>

                <!-- Background Section (v3: adapted to background.* keys) -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <background-editor
                        .hass=${this.hass}
                        .config=${this._isV3
                            ? toBackgroundEditorConfig(this._config as unknown as WallClockConfigV3)
                            : this._config}
                        @config-changed=${(ev: CustomEvent) => {
                            if (this._isV3) {
                                this._config = {
                                    ...this._config,
                                    background: fromBackgroundEditorConfig(ev.detail.config),
                                } as WallClockConfig;
                            } else {
                                this._config = ev.detail.config;
                                this._loadBackgroundImages();
                            }
                            fireEvent(this, 'config-changed', {config: this._config});
                        }}
                    ></background-editor>
                </ha-expansion-panel>

                ${!this._isV3 ? html`
                    <!-- Legacy sections: for zone layouts these settings are edited
                         per widget in the Layout section above -->

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
                    ${this._config.transportation?.enabled === true ? html`
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
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wall-clock-card-editor': WallClockCardEditor;
    }
}

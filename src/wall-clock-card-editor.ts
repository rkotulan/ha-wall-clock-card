import {LitElement, html, customElement, property, TemplateResult, CSSResult, css} from 'lit-element';
import {HomeAssistant, fireEvent, LovelaceCardEditor, LovelaceCardConfig} from 'custom-card-helpers';
import {WallClockConfig, SensorConfig} from './wall-clock-card';
import {BackgroundImage, TimeOfDay, Weather, FindAttributeInPath, ValidWeather, ValidTimeOfDay} from './image-sources/image-source';
import {
    getAllTransportationProviders,
    StopConfig as TransportationStopConfig
} from './transportation-providers';
import { getLanguageOptions, ExtendedDateTimeFormatOptions } from './lokalify';

@customElement('wall-clock-card-editor')
export class WallClockCardEditor extends LitElement implements LovelaceCardEditor {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) _config?: WallClockConfig;
    @property({type: Array}) _sensors: SensorConfig[] = [];
    @property({type: Array}) _backgroundImages: BackgroundImage[] = [];
    @property({type: Array}) _stops: TransportationStopConfig[] = [];

    connectedCallback(): void {
        super.connectedCallback();
        // Color picker and other HA form elements are now automatically loaded

        // Initialize language options from lokalify
        this._languageOptions = getLanguageOptions();
    }

    // Time format options
    private _timeFormatOptions = {
        hour12: [
            {value: true, label: '12-hour'},
            {value: false, label: '24-hour'},
        ],
        hour: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
        ],
        minute: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
        ],
        second: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
            {value: 'hidden', label: 'Hidden'},
        ],
    };

    // Date format options
    private _dateFormatOptions = {
        weekday: [
            {value: 'long', label: 'Long (Monday)'},
            {value: 'short', label: 'Short (Mon)'},
            {value: 'narrow', label: 'Narrow (M)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        month: [
            {value: 'long', label: 'Long (January)'},
            {value: 'short', label: 'Short (Jan)'},
            {value: 'narrow', label: 'Narrow (J)'},
            {value: 'numeric', label: 'Numeric (1)'},
            {value: '2-digit', label: '2-digit (01)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        day: [
            {value: 'numeric', label: 'Numeric (1)'},
            {value: '2-digit', label: '2-digit (01)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        year: [
            {value: 'numeric', label: 'Numeric (2025)'},
            {value: '2-digit', label: '2-digit (25)'},
            {value: 'hidden', label: 'Hidden'},
        ],
    };

    // Image source options
    private _imageSourceOptions = [
        {value: 'none', label: 'None (No Background Images)'},
        {value: 'picsum', label: 'Picsum Photos'},
        {value: 'local', label: 'Local Images'},
        {value: 'unsplash', label: 'Unsplash'},
        {value: 'sensor', label: 'Sensor Images'},
    ];

    // Weather provider options
    private _weatherProviderOptions = [
        {value: 'none', label: 'None (Disable Weather)'},
        {value: 'openweathermap', label: 'OpenWeatherMap'},
    ];

    // Language options from lokalify
    private _languageOptions: { value: string, label: string }[] = [];

    // Units options
    private _unitsOptions = [
        {value: 'metric', label: 'Metric (°C, m/s)'},
        {value: 'imperial', label: 'Imperial (°F, mph)'},
    ];

    // Weather display mode options
    private _weatherDisplayModeOptions = [
        {value: 'current', label: 'Current Weather Only'},
        {value: 'forecast', label: 'Forecast Only'},
        {value: 'both', label: 'Current and Forecast'},
    ];

    // Transportation provider options
    private _getTransportationProviderOptions(): { value: string, label: string }[] {
        const providers = getAllTransportationProviders();
        return [
            ...providers.map(provider => ({
                value: provider.id,
                label: provider.name
            }))
        ];
    };


    setConfig(config: LovelaceCardConfig): void {
        // Cast the config to WallClockConfig
        const wallClockConfig = config as unknown as WallClockConfig;

        // Handle legacy properties
        // If useOnlineImages is set but imageSource is not, convert it to imageSource
        let imageSource = wallClockConfig.imageSource;
        if (imageSource === undefined) {
            if (wallClockConfig.useOnlineImages === true) {
                imageSource = wallClockConfig.onlineImageSource || 'picsum';
            } else if (wallClockConfig.useOnlineImages === false) {
                // If useOnlineImages is false and there are backgroundImages, use 'local'
                // Otherwise, use 'none'
                if (wallClockConfig.backgroundImages && wallClockConfig.backgroundImages.length > 0) {
                    imageSource = 'local';
                } else {
                    imageSource = 'none';
                }
            } else {
                // Default to 'none' if neither is set
                imageSource = 'none';
            }
        }

        // Convert legacy string array backgroundImages to the new structure if needed
        if (Array.isArray(wallClockConfig.backgroundImages) &&
            wallClockConfig.backgroundImages.length > 0 &&
            typeof wallClockConfig.backgroundImages[0] === 'string') {
            // Create a new array of BackgroundImage objects
            const backgroundImages: BackgroundImage[] = [];
            for (const img of wallClockConfig.backgroundImages) {
                if (typeof img === 'string') {
                    backgroundImages.push({
                        url: img,
                        weather: Weather.All,
                        timeOfDay: TimeOfDay.Unspecified
                    });
                }
            }
            // Update the config with the new structure
            wallClockConfig.backgroundImages = backgroundImages;
        }

        // Create a default timeFormat
        let timeFormat: ExtendedDateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        // If timeFormat is provided in the config, merge it with the default
        if (wallClockConfig.timeFormat) {
            timeFormat = { ...timeFormat, ...wallClockConfig.timeFormat };

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
            imageConfig: wallClockConfig.imageConfig || wallClockConfig.onlineImageConfig || {},
            useOnlineImages: imageSource !== 'none' && imageSource !== 'local',
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
    }

    private _loadSensors(): void {
        if (this._config?.sensors && this._config.sensors.length > 0) {
            this._sensors = [...this._config.sensors];
        } else if (this._config?.sensorEntity) {
            // For backward compatibility
            this._sensors = [{
                entity: this._config.sensorEntity,
                label: this._config.sensorLabel || ''
            }];
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


    private _loadBackgroundImages(): void {
        if (this._config?.backgroundImages && this._config.backgroundImages.length > 0) {
            // Use the structure if available
            this._backgroundImages = [...this._config.backgroundImages];
        } else {
            // Initialize empty array
            this._backgroundImages = [];
        }
    }


    private _addSensor(): void {
        this._sensors = [...this._sensors, {entity: '', label: ''}];
        // Update the config with a deep copy
        if (this._config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));
            newConfig.sensors = [...this._sensors];

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }

    private _removeSensor(index: number): void {
        this._sensors = this._sensors.filter((_, i) => i !== index);
        // Update the config with a deep copy
        if (this._config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));
            newConfig.sensors = [...this._sensors];

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }

    private _sensorChanged(index: number, field: string, value: string): void {
        this._sensors = this._sensors.map((sensor, i) => {
            if (i === index) {
                return {...sensor, [field]: value};
            }
            return sensor;
        });
        // Update the config with a deep copy
        if (this._config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));
            newConfig.sensors = [...this._sensors];

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }

    private _addStop(): void {
        this._stops = [...this._stops, {stopId: 1793, postId: 3, name: ''}];
        // Update the config with a deep copy
        if (this._config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));

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

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }

    private _removeStop(index: number): void {
        this._stops = this._stops.filter((_, i) => i !== index);
        // Update the config with a deep copy
        if (this._config && this._config.transportation) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));

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

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
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
        if (this._config && this._config.transportation) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));

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

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }


    private _addBackgroundImage(): void {
        this._backgroundImages = [
            ...this._backgroundImages,
            {
                url: '',
                weather: Weather.All,
                timeOfDay: TimeOfDay.Unspecified
            }
        ];
        this._updateBackgroundImagesConfig();
    }

    private _removeBackgroundImage(index: number): void {
        this._backgroundImages = this._backgroundImages.filter((_, i) => i !== index);
        this._updateBackgroundImagesConfig();
    }

    private _updateBackgroundImage(index: number, updatedImage: Partial<BackgroundImage>): void {
        this._backgroundImages = this._backgroundImages.map((img, i) => {
            if (i === index) {
                const updatedImg = {...img, ...updatedImage};

                // If URL was updated and weather or timeOfDay are set to "all" or "unspecified",
                // try to auto-detect them from the URL
                if (updatedImage.url && updatedImg.url) {
                    // Auto-detect weather if it's set to "all"
                    if (updatedImg.weather === Weather.All) {
                        const detectedWeather = FindAttributeInPath(updatedImg.url, ValidWeather);
                        if (detectedWeather) {
                            updatedImg.weather = detectedWeather as Weather;
                            console.log(`[editor] Auto-detected weather: ${updatedImg.weather} from URL: ${updatedImg.url}`);
                        }
                    }

                    // Auto-detect timeOfDay if it's set to "unspecified"
                    if (updatedImg.timeOfDay === TimeOfDay.Unspecified) {
                        const detectedTimeOfDay = FindAttributeInPath(updatedImg.url, ValidTimeOfDay);
                        if (detectedTimeOfDay) {
                            updatedImg.timeOfDay = detectedTimeOfDay as TimeOfDay;
                            console.log(`[editor] Auto-detected timeOfDay: ${updatedImg.timeOfDay} from URL: ${updatedImg.url}`);
                        }
                    }
                }

                return updatedImg;
            }
            return img;
        });
        this._updateBackgroundImagesConfig();
    }

    private _updateBackgroundImagesConfig(): void {
        // Update the config with a deep copy
        if (this._config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this._config));
            newConfig.backgroundImages = [...this._backgroundImages];

            // Update the local config reference
            this._config = newConfig;

            // Fire the config-changed event with the new config
            fireEvent(this, 'config-changed', {config: newConfig});
        }
    }


    static get styles(): CSSResult {
        return css`
            .form-container {
                display: flex;
                flex-direction: column;
                padding: 16px;
            }

            .row {
                display: flex;
                margin-bottom: 12px;
                align-items: center;
            }

            .label {
                flex: 0 0 30%;
                font-weight: 500;
            }

            .value {
                flex: 1;
                display: flex;
                align-items: center;
            }


            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 15px 0 5px 0;
            }

            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
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
            }

            .image-row {
                display: flex;
                margin-bottom: 16px;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }

            .image-url {
                flex: 1 1 calc(100% - 60px);
            }

            .image-actions {
                flex: 0 0 40px;
                text-align: center;
            }

            .image-weather {
                flex: 1 1 45%;
            }

            .image-time {
                flex: 1 1 45%;
            }


            .weather-conditions {
                margin-top: 10px;
            }

            .weather-condition {
                border: 1px solid var(--divider-color, #e0e0e0);
                border-radius: 4px;
                padding: 10px;
                margin-bottom: 15px;
            }

            .condition-header {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }

            ha-expansion-panel > .content {
                padding: 12px;
            }

            ha-expansion-panel {
                margin-bottom: 8px;
            }

            .condition-header ha-textfield {
                flex: 1;
            }

            .condition-images {
                margin-left: 15px;
            }

            mwc-button {
                margin-top: 8px;
            }

            ha-switch {
                margin-right: 8px;
            }

            ha-textfield, ha-select {
                width: 100%;
            }
        `;
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        // Get all available entities for dropdown
        const entities = Object.keys(this.hass.states).sort();

        return html`
            <div class="form-container">
                <!-- Appearance Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Appearance</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Font Color</div>
                            <div class="value">
                                <ha-textfield
                                        label="Font Color (hex, rgb, or rgba)"
                                        .value=${this._config.fontColor || '#FFFFFF'}
                                        @input=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                            ev.preventDefault();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.fontColor = target.value || '#FFFFFF';

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                ></ha-textfield>
                                <div style="width: 32px; height: 32px; background-color: ${this._config.fontColor || '#FFFFFF'}; border: 1px solid #000; margin-left: 8px;"></div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Language</div>
                            <div class="value">
                                <ha-select
                                        label="Language"
                                        .value=${this._config.language || 'cs'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.language = target.value || 'cs';

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._languageOptions.map(
                                            (option) => html`
                                                <mwc-list-item .value=${option.value}>${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Time Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Time Format</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Time Format</div>
                            <div class="value">
                                <ha-select
                                        label="Hour Format"
                                        .value=${this._config.timeFormat?.hour12 ? 'true' : 'false'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.timeFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.timeFormat = {
                                                ...newConfig.timeFormat,
                                                hour12: target.value === 'true'
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._timeFormatOptions.hour12.map(
                                            (option) => html`
                                                <mwc-list-item .value=${String(option.value)}>${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Hour Display</div>
                            <div class="value">
                                <ha-select
                                        label="Hour Display"
                                        .value=${this._config.timeFormat?.hour || '2-digit'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.timeFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.timeFormat = {
                                                ...newConfig.timeFormat,
                                                hour: target.value as "numeric" | "2-digit" | undefined
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._timeFormatOptions.hour.map(
                                            (option) => html`
                                                <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Minute Display</div>
                            <div class="value">
                                <ha-select
                                        label="Minute Display"
                                        .value=${this._config.timeFormat?.minute || '2-digit'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.timeFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.timeFormat = {
                                                ...newConfig.timeFormat,
                                                minute: target.value as "numeric" | "2-digit" | undefined
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._timeFormatOptions.minute.map(
                                            (option) => html`
                                                <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Second Display</div>
                            <div class="value">
                                <ha-select
                                        label="Second Display"
                                        .value=${this._config.timeFormat?.second === undefined ? 'undefined' : this._config.timeFormat?.second}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.timeFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.timeFormat = {
                                                ...newConfig.timeFormat,
                                                second: (target.value === 'undefined' ? 'hidden' : target.value) as "numeric" | "2-digit" | "hidden"
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._timeFormatOptions.second.map(
                                            (option) => html`
                                                <mwc-list-item
                                                        .value=${option.value === undefined ? 'undefined' : option.value}>
                                                    ${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Weekday Display</div>
                            <div class="value">
                                <ha-select
                                        label="Weekday Display"
                                        .value=${this._config.dateFormat?.weekday || 'long'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.dateFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.dateFormat = {
                                                ...newConfig.dateFormat,
                                                weekday: (target.value === 'undefined' ? 'hidden' : target.value) as "long" | "short" | "narrow" | "hidden"
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._dateFormatOptions.weekday.map(
                                            (option) => html`
                                                <mwc-list-item
                                                        .value=${option.value === undefined ? 'undefined' : option.value}>
                                                    ${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Month Display</div>
                            <div class="value">
                                <ha-select
                                        label="Month Display"
                                        .value=${this._config.dateFormat?.month || 'long'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.dateFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.dateFormat = {
                                                ...newConfig.dateFormat,
                                                month: (target.value === 'undefined' ? 'hidden' : target.value) as "numeric" | "2-digit" | "long" | "short" | "narrow" | "hidden"
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._dateFormatOptions.month.map(
                                            (option) => html`
                                                <mwc-list-item
                                                        .value=${option.value === undefined ? 'undefined' : option.value}>
                                                    ${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Day Display</div>
                            <div class="value">
                                <ha-select
                                        label="Day Display"
                                        .value=${this._config.dateFormat?.day === undefined ? 'undefined' : this._config.dateFormat?.day}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.dateFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.dateFormat = {
                                                ...newConfig.dateFormat,
                                                day: (target.value === 'undefined' ? 'hidden' : target.value) as "numeric" | "2-digit" | "hidden"
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._dateFormatOptions.day.map(
                                            (option) => html`
                                                <mwc-list-item
                                                        .value=${option.value === undefined ? 'undefined' : option.value}>
                                                    ${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Year Display</div>
                            <div class="value">
                                <ha-select
                                        label="Year Display"
                                        .value=${this._config.dateFormat?.year === undefined ? 'undefined' : this._config.dateFormat?.year}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config || !this._config.dateFormat) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.dateFormat = {
                                                ...newConfig.dateFormat,
                                                year: (target.value === 'undefined' ? 'hidden' : target.value) as "numeric" | "2-digit" | "hidden"
                                            };

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._dateFormatOptions.year.map(
                                            (option) => html`
                                                <mwc-list-item
                                                        .value=${option.value === undefined ? 'undefined' : option.value}>
                                                    ${option.label}
                                                </mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Image Source</div>
                            <div class="value">
                                <ha-select
                                        label="Image Source"
                                        .value=${this._config.imageSource || 'none'}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.imageSource = target.value;

                                            // For backward compatibility
                                            newConfig.useOnlineImages = target.value !== 'none' && target.value !== 'local';

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                >
                                    ${this._imageSourceOptions.map(
                                            (option) => html`
                                                <mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
                                    )}
                                </ha-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">Background Opacity</div>
                            <div class="value">
                                <ha-slider
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        pin
                                        .value=${this._config.backgroundOpacity !== undefined ? this._config.backgroundOpacity : 0.5}
                                        @change=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                            ev.preventDefault();

                                            const target = ev.target as HTMLElement & { value?: string | number };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.backgroundOpacity = typeof target.value === 'string' ? parseFloat(target.value) : target.value;

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                ></ha-slider>
                                <span>${this._config.backgroundOpacity !== undefined ? this._config.backgroundOpacity : 0.5}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="label">Rotation Interval (seconds)</div>
                            <div class="value">
                                <ha-slider
                                        min="30"
                                        max="300"
                                        step="10"
                                        pin
                                        .value=${this._config.backgroundRotationInterval || 90}
                                        @change=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                            ev.preventDefault();

                                            const target = ev.target as HTMLElement & { value?: string | number };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.backgroundRotationInterval = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                ></ha-slider>
                                <span>${this._config.backgroundRotationInterval || 90} seconds</span>
                            </div>
                        </div>
                    </div>
                </ha-expansion-panel>

                ${this._config.imageSource === 'local' ? html`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((image, index) => html`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-textfield
                                                label="Image URL"
                                                .value=${image.url || ''}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target) return;
                                                    this._updateBackgroundImage(index, {url: target.value || ''});
                                                }}
                                        ></ha-textfield>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${'M19,13H5V11H19V13Z'}
                                                @click=${() => this._removeBackgroundImage(index)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-select
                                                label="Weather Condition"
                                                .value=${image.weather}
                                                @click=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @closed=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @selected=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();
                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target) return;
                                                    this._updateBackgroundImage(index, {weather: target.value as Weather});
                                                }}
                                        >
                                            ${Object.values(Weather).map(weather => html`
                                                <mwc-list-item .value=${weather}>${weather}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                    <div class="image-time">
                                        <ha-select
                                                label="Time of Day"
                                                .value=${image.timeOfDay}
                                                @click=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @closed=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @selected=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();
                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target) return;
                                                    this._updateBackgroundImage(index, {timeOfDay: target.value as TimeOfDay});
                                                }}
                                        >
                                            ${Object.values(TimeOfDay).map(timeOfDay => html`
                                                <mwc-list-item .value=${timeOfDay}>${timeOfDay}</mwc-list-item>
                                            `)}
                                        </ha-select>
                                    </div>
                                </div>
                            `)}

                            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
                        </div>
                    </ha-expansion-panel>
                ` : ''}

                ${this._config.imageSource === 'unsplash' ? html`
                    <!-- Unsplash Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Unsplash Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure Unsplash image source settings. You can use Unsplash with or without an API
                                key.
                                Using an API key provides better image quality and more reliable service.
                            </div>

                            <div class="row">
                                <div class="label">Category</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Category"
                                            .value=${this._config.imageConfig?.category || 'nature'}
                                            @input=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target || !this._config) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Ensure imageConfig exists
                                                if (!newConfig.imageConfig) {
                                                    newConfig.imageConfig = {};
                                                }

                                                // Update the category
                                                newConfig.imageConfig.category = target.value || 'nature';

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="info-text">
                                An API key is required for Unsplash to work properly.
                            </div>

                            ${true ? html`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="API Key"
                                                .value=${this._config.imageConfig?.apiKey || ''}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Ensure imageConfig exists
                                                    if (!newConfig.imageConfig) {
                                                        newConfig.imageConfig = {};
                                                    }

                                                    // Update the API key
                                                    newConfig.imageConfig.apiKey = target.value || '';

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Content Filter</div>
                                    <div class="value">
                                        <ha-select
                                                label="Content Filter"
                                                .value=${this._config.imageConfig?.contentFilter || 'high'}
                                                @click=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @closed=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Ensure imageConfig exists
                                                    if (!newConfig.imageConfig) {
                                                        newConfig.imageConfig = {};
                                                    }

                                                    // Update the content filter
                                                    newConfig.imageConfig.contentFilter = target.value || 'high';

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        >
                                            <mwc-list-item .value=${'low'}>Low</mwc-list-item>
                                            <mwc-list-item .value=${'high'}>High</mwc-list-item>
                                        </ha-select>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </ha-expansion-panel>
                ` : ''}

                ${this._config.imageSource === 'sensor' ? html`
                    <!-- Sensor Images Configuration Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Sensor Images Configuration</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure the sensor that provides the image list. The sensor should have a "files" attribute
                                that contains an array of image URLs.
                            </div>

                            <div class="row">
                                <div class="label">Sensor Entity</div>
                                <div class="value">
                                    <ha-select
                                        label="Entity"
                                        .value=${this._config.imageConfig?.entity || ''}
                                        @click=${(ev: CustomEvent) => {
                                            ev.stopPropagation();
                                        }}
                                        @closed=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { value?: string };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Ensure imageConfig exists
                                            if (!newConfig.imageConfig) {
                                                newConfig.imageConfig = {};
                                            }

                                            // Update the entity
                                            newConfig.imageConfig.entity = target.value || '';

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                    >
                                        ${entities.filter(entity => entity.startsWith('sensor.')).map(
                                            (entity) => html`
                                                <mwc-list-item .value=${entity}>${entity}</mwc-list-item>`
                                        )}
                                    </ha-select>
                                </div>
                            </div>

                            <div class="info-text">
                                The sensor should have a "files" attribute that contains an array of image URLs.
                                Images will be automatically categorized by weather condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day (sunrise-sunset, day, night) in your file paths.
                            </div>
                        </div>
                    </ha-expansion-panel>
                ` : ''}

                <!-- Sensors Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Sensors</h3>
                    <div class="content">
                        ${this._sensors.map((sensor, index) => html`
                            <div class="sensor-row">
                                <div class="sensor-entity">
                                    <ha-select
                                            label="Entity"
                                            .value=${sensor.entity || ''}
                                            @click=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                            }}
                                            @closed=${(ev: CustomEvent) => {
                                                ev.stopPropagation();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target) return;

                                                this._sensorChanged(index, 'entity', target.value || '');
                                            }}
                                    >
                                        ${entities.map(
                                                (entity) => html`
                                                    <mwc-list-item .value=${entity}>${entity}</mwc-list-item>`
                                        )}
                                    </ha-select>
                                </div>
                                <div class="sensor-label">
                                    <ha-textfield
                                            label="Label"
                                            .value=${sensor.label || ''}
                                            @input=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target) return;
                                                this._sensorChanged(index, 'label', target.value || '');
                                            }}
                                    ></ha-textfield>
                                </div>
                                <div class="sensor-actions">
                                    <ha-icon-button
                                            .path=${'M19,13H5V11H19V13Z'}
                                            @click=${() => this._removeSensor(index)}
                                    ></ha-icon-button>
                                </div>
                            </div>
                        `)}

                        <mwc-button @click=${this._addSensor}>Add Sensor</mwc-button>
                    </div>
                </ha-expansion-panel>

                <!-- Weather Settings Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Weather Forecast</h3>
                    <div class="content">
                        <div class="row">
                            <div class="label">Show Weather</div>
                            <div class="value">
                                <ha-switch
                                        .checked=${this._config.showWeather || false}
                                        @change=${(ev: CustomEvent) => {
                                            ev.stopPropagation();

                                            const target = ev.target as HTMLElement & { checked?: boolean };
                                            if (!target || !this._config) return;

                                            // Create a deep copy of the config
                                            const newConfig = JSON.parse(JSON.stringify(this._config));

                                            // Update the new config
                                            newConfig.showWeather = target.checked || false;

                                            // Update the local config reference
                                            this._config = newConfig;

                                            // Fire the config-changed event with the new config
                                            fireEvent(this, 'config-changed', {config: newConfig});
                                        }}
                                ></ha-switch>
                                <span>Display weather forecast</span>
                            </div>
                        </div>

                        ${this._config.showWeather ? html`
                            <div class="row">
                                <div class="label">Weather Title</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Title for weather section"
                                            .value=${this._config.weatherTitle || 'Weather'}
                                            @input=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target || !this._config) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.weatherTitle = target.value || 'Weather';

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    ></ha-textfield>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Weather Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${this._config.weatherProvider || 'openweathermap'}
                                            @click=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                            }}
                                            @closed=${(ev: CustomEvent) => {
                                                ev.stopPropagation();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target || !this._config) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.weatherProvider = target.value || 'openweathermap';

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    >
                                        ${this._weatherProviderOptions.map(
                                                (option) => html`
                                                    <mwc-list-item .value=${option.value}>${option.label}
                                                    </mwc-list-item>`
                                        )}
                                    </ha-select>
                                </div>
                            </div>

                            ${this._config.weatherProvider === 'openweathermap' ? html`
                                <div class="row">
                                    <div class="label">API Key</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="OpenWeatherMap API Key"
                                                .value=${this._config.weatherConfig?.apiKey || ''}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Update the new config
                                                    newConfig.weatherConfig = {
                                                        ...newConfig.weatherConfig || {},
                                                        apiKey: target.value || ''
                                                    };

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Location</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Latitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${this._config.weatherConfig?.latitude || 50.0755}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Update the new config
                                                    newConfig.weatherConfig = {
                                                        ...newConfig.weatherConfig || {},
                                                        latitude: parseFloat(target.value || '50.0755')
                                                    };

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                        <ha-textfield
                                                label="Longitude"
                                                type="number"
                                                step="0.0001"
                                                .value=${this._config.weatherConfig?.longitude || 14.4378}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Update the new config
                                                    newConfig.weatherConfig = {
                                                        ...newConfig.weatherConfig || {},
                                                        longitude: parseFloat(target.value || '14.4378')
                                                    };

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                    </div>
                                </div>

                            ` : ''}

                            ${this._config.weatherProvider === 'openweathermap' ? html`
                                <div class="row">
                                    <div class="label">Units</div>
                                    <div class="value">
                                        <ha-select
                                                label="Units"
                                                .value=${this._config.weatherConfig?.units || 'metric'}
                                                @click=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                }}
                                                @closed=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();

                                                    const target = ev.target as HTMLElement & { value?: string };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Update the new config
                                                    newConfig.weatherConfig = {
                                                        ...newConfig.weatherConfig || {},
                                                        units: target.value || 'metric'
                                                    };

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        >
                                            ${this._unitsOptions.map(
                                                    (option) => html`
                                                        <mwc-list-item .value=${option.value}>${option.label}
                                                        </mwc-list-item>`
                                            )}
                                        </ha-select>
                                    </div>
                                </div>
                            ` : ''}

                            <div class="row">
                                <div class="label">Display Mode</div>
                                <div class="value">
                                    <ha-select
                                            label="Display Mode"
                                            .value=${this._config.weatherDisplayMode || 'both'}
                                            @click=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                            }}
                                            @closed=${(ev: CustomEvent) => {
                                                ev.stopPropagation();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target || !this._config) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.weatherDisplayMode = target.value as 'current' | 'forecast' | 'both' || 'both';

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    >
                                        ${this._weatherDisplayModeOptions.map(
                                                (option) => html`
                                                    <mwc-list-item .value=${option.value}>${option.label}
                                                    </mwc-list-item>`
                                        )}
                                    </ha-select>
                                </div>
                            </div>

                            ${(this._config.weatherDisplayMode === 'forecast' || this._config.weatherDisplayMode === 'both') ? html`
                                <div class="row">
                                    <div class="label">Forecast Days</div>
                                    <div class="value">
                                        <ha-slider
                                                min="1"
                                                max="7"
                                                step="1"
                                                pin
                                                .value=${this._config.weatherForecastDays || 3}
                                                @change=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & {
                                                        value?: string | number
                                                    };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Update the new config
                                                    newConfig.weatherForecastDays = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-slider>
                                        <span>${this._config.weatherForecastDays || 3} days</span>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="label">Update Interval</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Update interval in minutes (min: 1)"
                                                type="number"
                                                min="1"
                                                .value=${Math.floor((this._config.weatherUpdateInterval || 1800) / 60)}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & {
                                                        value?: string | number
                                                    };
                                                    if (!target || !this._config) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Get the value as a number
                                                    let intervalMinutes = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                                                    // Ensure minimum of 1 minute
                                                    intervalMinutes = Math.max(intervalMinutes || 30, 1);

                                                    // Convert minutes to seconds for internal storage
                                                    const intervalSeconds = intervalMinutes * 60;

                                                    // Update the new config
                                                    newConfig.weatherUpdateInterval = intervalSeconds;

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            ` : ''}
                        ` : ''}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${this._config.enableTransportation === true ? html`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <div class="row">
                                <div class="label">Transportation Provider</div>
                                <div class="value">
                                    <ha-select
                                            label="Provider"
                                            .value=${this._config.transportation?.provider || 'idsjmk'}
                                            @click=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                            }}
                                            @closed=${(ev: CustomEvent) => {
                                                ev.stopPropagation();

                                                const target = ev.target as HTMLElement & { value?: string };
                                                if (!target || !this._config || !this._config.transportation) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.transportation = {
                                                    ...newConfig.transportation,
                                                    provider: target.value || 'idsjmk'
                                                };

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    >
                                        ${this._getTransportationProviderOptions().map(
                                                (option) => html`
                                                    <mwc-list-item .value=${option.value}>${option.label}
                                                    </mwc-list-item>`
                                        )}
                                    </ha-select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Global Max Departures</div>
                                <div class="value">
                                    <ha-slider
                                            min="1"
                                            max="5"
                                            step="1"
                                            pin
                                            .value=${this._config.transportation?.maxDepartures || 2}
                                            @change=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & {
                                                    value?: string | number
                                                };
                                                if (!target || !this._config || !this._config.transportation) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.transportation = {
                                                    ...newConfig.transportation,
                                                    maxDepartures: typeof target.value === 'string' ? parseInt(target.value, 10) : target.value
                                                };

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Reload stops
                                                this._loadStops();

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    ></ha-slider>
                                    <span>${this._config.transportation?.maxDepartures || 2} departures</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="label">Show on Demand</div>
                                <div class="value">
                                    <ha-switch
                                            .checked=${this._config.transportation?.onDemand === true}
                                            @change=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & {
                                                    checked?: boolean
                                                };
                                                if (!target || !this._config || !this._config.transportation) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Update the new config
                                                newConfig.transportation = {
                                                    ...newConfig.transportation,
                                                    onDemand: target.checked
                                                };

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    ></ha-switch>
                                    <span>Only show departures when clicked</span>
                                </div>
                            </div>

                            ${this._config.transportation?.onDemand === true ? html`
                                <div class="row">
                                    <div class="label">Auto-Hide Timeout</div>
                                    <div class="value">
                                        <ha-textfield
                                                label="Auto-hide timeout in minutes (1-10)"
                                                type="number"
                                                min="1"
                                                max="10"
                                                .value=${this._config.transportation?.autoHideTimeout || 5}
                                                @input=${(ev: CustomEvent) => {
                                                    ev.stopPropagation();
                                                    ev.preventDefault();

                                                    const target = ev.target as HTMLElement & {
                                                        value?: string | number
                                                    };
                                                    if (!target || !this._config || !this._config.transportation) return;

                                                    // Create a deep copy of the config
                                                    const newConfig = JSON.parse(JSON.stringify(this._config));

                                                    // Get the value as a number
                                                    let timeoutMinutes = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                                                    // Ensure value is between 1 and 10 minutes
                                                    timeoutMinutes = Math.max(Math.min(timeoutMinutes || 5, 10), 1);

                                                    // Update the new config
                                                    newConfig.transportation = {
                                                        ...newConfig.transportation,
                                                        autoHideTimeout: timeoutMinutes
                                                    };

                                                    // Update the local config reference
                                                    this._config = newConfig;

                                                    // Fire the config-changed event with the new config
                                                    fireEvent(this, 'config-changed', {config: newConfig});
                                                }}
                                        ></ha-textfield>
                                        <span>minutes</span>
                                    </div>
                                </div>
                            ` : ''}

                            <div class="row">
                                <div class="label">Update Interval</div>
                                <div class="value">
                                    <ha-textfield
                                            label="Update interval in minutes (min: 1)"
                                            type="number"
                                            min="1"
                                            .value=${Math.floor((this._config.transportationUpdateInterval || 60) / 60)}
                                            @input=${(ev: CustomEvent) => {
                                                ev.stopPropagation();
                                                ev.preventDefault();

                                                const target = ev.target as HTMLElement & {
                                                    value?: string | number
                                                };
                                                if (!target || !this._config || !this._config.transportation) return;

                                                // Create a deep copy of the config
                                                const newConfig = JSON.parse(JSON.stringify(this._config));

                                                // Get the value as a number
                                                let intervalMinutes = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                                                // Ensure minimum of 1 minute
                                                intervalMinutes = Math.max(intervalMinutes || 1, 1);

                                                // Convert minutes to seconds for internal storage
                                                const intervalSeconds = intervalMinutes * 60;

                                                // Update the new config
                                                newConfig.transportationUpdateInterval = intervalSeconds;

                                                // Update the local config reference
                                                this._config = newConfig;

                                                // Fire the config-changed event with the new config
                                                fireEvent(this, 'config-changed', {config: newConfig});
                                            }}
                                    ></ha-textfield>
                                    <span>minutes</span>
                                </div>
                            </div>

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
                    </ha-expansion-panel>
                ` : ''}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wall-clock-card-editor': WallClockCardEditor;
    }
}

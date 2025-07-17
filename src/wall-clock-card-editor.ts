import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TemplateResult, CSSResult} from 'lit';
import {HomeAssistant, fireEvent, LovelaceCardEditor, LovelaceCardConfig} from 'custom-card-helpers';
import {WallClockConfig, SensorConfig} from './wall-clock-card';
import {
    BackgroundImage,
    TimeOfDay,
    Weather
} from './image-sources/image-source';
import {
    getAllTransportationProviders,
    StopConfig as TransportationStopConfig
} from './transportation-providers';
import {getLanguageOptions, ExtendedDateTimeFormatOptions} from './utils/localize/lokalify';
import {setPropertyByPath} from './utils';
import {LabelPosition} from "./components/ha-selector/types";

@customElement('wall-clock-card-editor')
export class WallClockCardEditor extends LitElement implements LovelaceCardEditor {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) _config?: WallClockConfig;
    @property({type: Array}) _sensors: SensorConfig[] = [];
    @property({type: Array}) _backgroundImages: BackgroundImage[] = [];
    @property({type: Array}) _stops: TransportationStopConfig[] = [];
    @property({type: Array}) _sensorsWithFilesAttr: string[] = [];

    connectedCallback(): void {
        super.connectedCallback();
        // Color picker and other HA form elements are now automatically loaded

        // Initialize language options from lokalify
        this._languageOptions = getLanguageOptions();

        this._languageOptions.forEach(option => {
            console.log(option);
        })
    }

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // If hass changed, update the list of sensors with files attribute
        if (changedProps.has('hass') && this.hass) {
            this._updateSensorsWithFilesAttr();
        }
    }

    private _updateSensorsWithFilesAttr() {
        if (!this.hass) return;

        // Filter sensor entities that have a files attribute
        this._sensorsWithFilesAttr = Object.keys(this.hass.states)
            .filter(entityId => {
                // Check if it's a sensor
                if (!entityId.startsWith('sensor.')) return false;

                // Check if it has a files attribute
                const entity = this.hass!.states[entityId];
                return entity && entity.attributes && entity.attributes.files !== undefined;
            });
    }

    // Time format options
    private _timeFormatOptions = {
        hour12: [
            {value: 'true', label: '12-hour'},
            {value: 'false', label: '24-hour'},
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
                overflow: hidden;
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
                margin-top: 20px;
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
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._timeFormatOptions.hour12,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.timeFormat?.hour12 ? 'true' : 'false'}
                                .label= ${"Hour Format"}
                                propertyName="timeFormat.hour12"
                                .transformData=${(value: string) => value === 'true'}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._timeFormatOptions.hour,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.timeFormat?.hour || '2-digit'}
                                .label= ${"Hour Display"}
                                propertyName="timeFormat.hour"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._timeFormatOptions.minute,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.timeFormat?.minute || '2-digit'}
                                .label= ${"Minute Display"}
                                propertyName="timeFormat.minute"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._timeFormatOptions.second,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.timeFormat?.second === undefined ? 'undefined' : this._config.timeFormat?.second}
                                .label= ${"Second Display"}
                                propertyName="timeFormat.second"
                                .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Date Format Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Date Format</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._dateFormatOptions.weekday,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.dateFormat?.weekday || 'long'}
                                .label= ${"Weekday Display"}
                                propertyName="dateFormat.weekday"
                                .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._dateFormatOptions.month,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.dateFormat?.month || 'long'}
                                .label= ${"Month Display"}
                                propertyName="dateFormat.month"
                                .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._dateFormatOptions.day,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.dateFormat?.day === undefined ? 'undefined' : this._config.dateFormat?.day}
                                .label= ${"Day Display"}
                                propertyName="dateFormat.day"
                                .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._dateFormatOptions.year,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.dateFormat?.year === undefined ? 'undefined' : this._config.dateFormat?.year}
                                .label= ${"Year Display"}
                                propertyName="dateFormat.year"
                                .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                <!-- Background Section -->
                <ha-expansion-panel outlined>
                    <h3 slot="header">Background</h3>
                    <div class="content">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._imageSourceOptions,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.imageSource || 'none'}
                                .label= ${"Image Source"}
                                propertyName="imageSource"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: 0,
                                        max: 1,
                                        step: 0.05,
                                        mode: "slider",
                                        slider_ticks: true
                                    }
                                }}
                                .value=${this._config.backgroundOpacity !== undefined ? this._config.backgroundOpacity : 0.5}
                                .label= ${"Background Opacity"}
                                propertyName="backgroundOpacity"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: 30,
                                        max: 300,
                                        step: 10,
                                        mode: "slider",
                                        slider_ticks: true
                                    }
                                }}
                                .value=${this._config.backgroundRotationInterval || 90}
                                .label= ${"Rotation Interval (sec)"}
                                propertyName="backgroundRotationInterval"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </ha-expansion-panel>

                ${this._config.imageSource === 'local' ? html`
                    <!-- Background Images Section -->
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Local Background Images</h3>
                        <div class="content">
                            <div class="info-text">
                                Configure local image URLs. Images will be automatically categorized by weather
                                condition and time of day based on their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                                (sunrise-sunset, day, night) in your file paths.
                            </div>

                            <div class="section-subheader">Background Images</div>

                            ${this._backgroundImages.map((image, index) => html`
                                <div class="image-row">
                                    <div class="image-url">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{
                                                    text: {
                                                        type: "text"
                                                    }
                                                }}
                                                .value=${image.url || ''}
                                                .label= ${"Image URL"}
                                                propertyName="backgroundImages.${index}.url"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-actions">
                                        <ha-icon-button
                                                .path=${'M19,13H5V11H19V13Z'}
                                                @click=${() => this._removeBackgroundImage(index)}
                                        ></ha-icon-button>
                                    </div>
                                    <div class="image-weather">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{
                                                    select: {
                                                        options: Object.values(Weather).map(weather => ({
                                                            value: weather,
                                                            label: weather
                                                        }))
                                                    }
                                                }}
                                                .value=${image.weather}
                                                .label= ${"Weather Condition"}
                                                propertyName="backgroundImages.${index}.weather"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
                                    </div>
                                    <div class="image-time">
                                        <ha-row-selector
                                                .hass=${this.hass}
                                                .selector=${{
                                                    select: {
                                                        options: Object.values(TimeOfDay).map(timeOfDay => ({
                                                            value: timeOfDay,
                                                            label: timeOfDay
                                                        }))
                                                    }
                                                }}
                                                .value=${image.timeOfDay}
                                                .label= ${"Time of Day"}
                                                propertyName="backgroundImages.${index}.timeOfDay"
                                                @value-changed=${this._handleFormValueChanged}
                                        ></ha-row-selector>
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
                                Configure Unsplash image source settings. An API key is required to use Unsplash.
                                You can obtain a free API key from the Unsplash Developer portal.
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

                            <ha-row-selector
                                    min="1"
                                    max="30"
                                    .hass=${this.hass}
                                    .selector=${{
                                        text: {
                                            type: 'number',
                                        }
                                    }}
                                    .value=${this._config.imageConfig?.count || '5'}
                                    .label= ${"Number of Photos"}
                                    propertyName="imageConfig.count"
                                    transformData=${(value: any) => {
                                        // Parse the value as a number and ensure it's within range
                                        let count = parseInt(value || '5', 10);
                                        if (isNaN(count) || count < 1) count = 1;
                                        if (count > 30) count = 30;
                                        return count;
                                    }}
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="info-text">
                                An API key is required. Without a valid API key, the Unsplash image source will not
                                work.
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
                                Configure the sensor that provides the image list. The sensor should have a "files"
                                attribute
                                that contains an array of image URLs.
                            </div>

                            <ha-row-selector
                                    .hass=${this.hass}
                                    .labelPosition=${LabelPosition.Top}
                                    .selector=${{
                                        entity: {
                                            include_entities: this._sensorsWithFilesAttr
                                        }
                                    }}
                                    .value=${this._config.imageConfig?.entity || ''}
                                    .label= ${"Sensor Entity"}
                                    propertyName="imageConfig.entity"
                                    @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <div class="info-text">
                                The sensor should have a "files" attribute that contains an array of image URLs.
                                Images will be automatically categorized by weather condition and time of day based on
                                their file paths.
                                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                                (sunrise-sunset, day, night) in your file paths.
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

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{
                                            text: {
                                                type: "text"
                                            }
                                        }}
                                        .value=${sensor.label || ''}
                                        .label=${"Label"}
                                        .labelPosition=${LabelPosition.Top}
                                        propertyName="sensors.${index}.label"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 30%; margin-right: 8px; overflow: hidden;"
                                ></ha-row-selector>

                                <ha-row-selector
                                        .hass=${this.hass}
                                        .selector=${{
                                            entity: {
                                                filter: {
                                                    domain: ["sensor", "binary_sensor", "input_text", "input_number", "input_datetime", "sun", "weather"]
                                                }
                                            }
                                        }}
                                        .value=${sensor.entity || ''}
                                        .label=${"Entity"}
                                        .labelPosition=${LabelPosition.Top}
                                        propertyName="sensors.${index}.entity"
                                        @value-changed=${this._handleFormValueChanged}
                                        style="flex: 0 0 60%; overflow: hidden;"
                                ></ha-row-selector>

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
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${this._config.showWeather || false}
                            .label=${"Show Weather"}
                            .helper=${"Display weather forecast"}
                            propertyName="showWeather"
                            @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        ${this._config.showWeather ? html`
                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${this._config.weatherTitle || 'Weather'}
                                .label=${"Weather Title"}
                                propertyName="weatherTitle"
                                @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._weatherProviderOptions,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.weatherProvider || 'openweathermap'}
                                .label=${"Weather Provider"}
                                propertyName="weatherProvider"
                                @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${this._config.weatherProvider === 'openweathermap' ? html`
                                <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{
                                        text: {
                                            type: "text"
                                        }
                                    }}
                                    .value=${this._config.weatherConfig?.apiKey || ''}
                                    .label=${"API Key"}
                                    .helper=${"OpenWeatherMap API Key"}
                                    propertyName="weatherConfig.apiKey"
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{
                                        number: {
                                            min: -90,
                                            max: 90,
                                            step: 0.0001,
                                            mode: "box"
                                        }
                                    }}
                                    .value=${this._config.weatherConfig?.latitude || 50.0755}
                                    .label=${"Latitude"}
                                    propertyName="weatherConfig.latitude"
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{
                                        number: {
                                            min: -180,
                                            max: 180,
                                            step: 0.0001,
                                            mode: "box"
                                        }
                                    }}
                                    .value=${this._config.weatherConfig?.longitude || 14.4378}
                                    .label=${"Longitude"}
                                    propertyName="weatherConfig.longitude"
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>

                                <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{
                                        select: {
                                            options: this._unitsOptions,
                                            mode: 'dropdown'
                                        }
                                    }}
                                    .value=${this._config.weatherConfig?.units || 'metric'}
                                    .label=${"Units"}
                                    propertyName="weatherConfig.units"
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            ` : ''}

                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._weatherDisplayModeOptions,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this._config.weatherDisplayMode || 'both'}
                                .label=${"Display Mode"}
                                propertyName="weatherDisplayMode"
                                @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${(this._config.weatherDisplayMode === 'forecast' || this._config.weatherDisplayMode === 'both') ? html`
                                <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{
                                        number: {
                                            min: 1,
                                            max: 7,
                                            step: 1,
                                            mode: "slider"
                                        }
                                    }}
                                    .value=${this._config.weatherForecastDays || 3}
                                    .label=${"Forecast Days"}
                                    .helper=${`${this._config.weatherForecastDays || 3} days`}
                                    propertyName="weatherForecastDays"
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
                                    .value=${Math.floor((this._config.weatherUpdateInterval || 1800) / 60)}
                                    .label=${"Update Interval"}
                                    .helper=${"Update interval in minutes (min: 1)"}
                                    propertyName="weatherUpdateInterval"
                                    .transformData=${(value: number) => value * 60}
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            ` : ''}
                        ` : ''}
                    </div>
                </ha-expansion-panel>

                <!-- Transportation Settings Section -->
                ${this._config.enableTransportation === true ? html`
                    <ha-expansion-panel outlined>
                        <h3 slot="header">Transportation Departures</h3>
                        <div class="content">

                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._getTransportationProviderOptions(),
                                        mode: "dropdown"
                                    }
                                }}
                                .value=${this._config.transportation?.provider || 'idsjmk'}
                                .label=${"Transportation Provider"}
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
                                .value=${this._config.transportation?.maxDepartures || 2}
                                .label=${"Global Max Departures"}
                                .helper=${`${this._config.transportation?.maxDepartures || 2} departures`}
                                propertyName="transportation.maxDepartures"
                                @value-changed=${(ev: CustomEvent) => {
                                    this._handleFormValueChanged(ev);
                                    // Reload stops after the config has been updated
                                    this._loadStops();
                                }}
                            ></ha-row-selector>

                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean: {}}}
                                .value=${this._config.transportation?.onDemand === true}
                                .label=${"Show on Demand"}
                                .helper=${"Only show departures when clicked"}
                                propertyName="transportation.onDemand"
                                @value-changed=${this._handleFormValueChanged}
                            ></ha-row-selector>

                            ${this._config.transportation?.onDemand === true ? html`
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
                                    .value=${this._config.transportation?.autoHideTimeout || 5}
                                    .label=${"Auto-Hide Timeout"}
                                    .helper=${"Auto-hide timeout in minutes (1-10)"}
                                    propertyName="transportation.autoHideTimeout"
                                    .transformData=${(value: number) => {
                                        // Ensure value is between 1 and 10 minutes
                                        return Math.max(Math.min(value || 5, 10), 1);
                                    }}
                                    @value-changed=${this._handleFormValueChanged}
                                ></ha-row-selector>
                            ` : ''}

                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: 1,
                                        step: 1,
                                        mode: "box"
                                    }
                                }}
                                .value=${Math.floor((this._config.transportationUpdateInterval || 60) / 60)}
                                .label=${"Update Interval"}
                                .helper=${"Update interval in minutes (min: 1)"}
                                propertyName="transportationUpdateInterval"
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

import {LitElement, html, css, unsafeCSS, CSSResult, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {
    ImageSourceConfig,
    BackgroundImage,
    Weather
} from './image-sources';
import {WeatherProviderConfig, WeatherData, getWeatherProvider} from './weather-providers';
import {
    TransportationConfig,
    TransportationData,
    TransportationDeparture,
    getTransportationProvider
} from './transportation-providers';
import {
    translate,
    loadTranslationsAsync,
    formatDate,
    ExtendedDateTimeFormatOptions
} from './lokalify';
import { configureLogger, logger, getLogLevelFromString, LogLevel } from './utils/logger';
import { ClockComponent } from './components/clock';
import { SensorComponent } from './components/sensor';
import { BackgroundImageComponent } from './components/background-image';
import './wall-clock-card-editor';

// Global constant injected by webpack.DefinePlugin
declare const PACKAGE_VERSION: string;

// Interface for sensor configuration
export interface SensorConfig {
    entity: string;
    label?: string;
}

// Legacy interfaces for backward compatibility
export interface StopConfig {
    stopId: number;
    postId: number;
}

export interface WallClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    backgroundOpacity?: number;
    imageSource?: string; // ID of the image source plugin ('none', 'local', 'picsum', etc.)
    imageConfig?: ImageSourceConfig; // Configuration for the image source
    backgroundRotationInterval?: number;
    sensors?: SensorConfig[]; // Multiple sensors
    fontColor?: string; // Font color for all text elements
    language?: string; // Language for translations
    timeZone?: string; // Time zone for clock (e.g., 'America/New_York')
    logLevel?: string; // Log level for the logger (debug, info, warn, error, none)

    // Background images structure
    backgroundImages?: BackgroundImage[]; // Array of background images with weather and time-of-day information

    // Weather forecast settings
    showWeather?: boolean; // Whether to show weather forecast
    weatherProvider?: string; // ID of the weather provider plugin ('openweathermap', etc.)
    weatherConfig?: WeatherProviderConfig; // Configuration for the weather provider
    weatherDisplayMode?: 'current' | 'forecast' | 'both'; // What weather data to display
    weatherForecastDays?: number; // Number of days to show in forecast (1-7)
    weatherTitle?: string; // Custom title for the weather section (default: "Weather")
    weatherUpdateInterval?: number; // Interval in seconds to update weather data (minimum: 60)

    // Transportation departures settings
    enableTransportation?: boolean; // Whether to show transportation departures
    transportation?: TransportationConfig; // Configuration for transportation departures
    transportationUpdateInterval?: number; // Interval in seconds to update transportation data (minimum: 60)

    // Allow string indexing for dynamic property access
    [key: string]: any;
}


@customElement('wall-clock-card')
export class WallClockCard extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config: WallClockConfig = {};
    // Background image component reference
    private backgroundImageComponent?: BackgroundImageComponent;
    // Sensor values are now handled by the SensorComponent
    @property({type: Number}) consecutiveFailures = 0; // Track consecutive image loading failures
    @property({type: Boolean}) isRetrying = false; // Flag to track if we're in retry mode
    @property({type: Object}) weatherData?: WeatherData; // Weather data from provider
    @property({type: Boolean}) weatherLoading = false; // Flag to track if weather data is loading
    @property({type: Boolean}) weatherError = false; // Flag to track if there was an error loading weather data
    @property({type: String}) weatherErrorMessage = ''; // Error message if weather data loading failed
    @property({type: Object}) transportationData: TransportationData = {departures: [], loading: false}; // Transportation data
    @property({type: Date}) lastTransportationUpdate?: Date; // Last time transportation data was updated
    @property({type: Boolean}) transportationDataLoaded = false; // Whether transportation data has been loaded (for on-demand loading)


    private clockComponent: ClockComponent = document.createElement('ha-clock') as ClockComponent;
    private sensorComponent: SensorComponent = document.createElement('ha-sensors') as SensorComponent;
    private weatherUpdateTimer?: number;
    private transportationUpdateTimer?: number;
    private transportationAutoHideTimer?: number;

    constructor() {
        super();

        // Display version info
        logger.info(
            "%c WALL-CLOCK-CARD %c " + PACKAGE_VERSION + " ",
            "color: white; background: #3498db; font-weight: 700;",
            "color: #3498db; background: white; font-weight: 700;"
        );

        // Initialize the clock component
        this.clockComponent.timeFormat = this.config.timeFormat;
        this.clockComponent.dateFormat = this.config.dateFormat;
        this.clockComponent.language = this.config.language;
        this.clockComponent.timeZone = this.config.timeZone;
        this.clockComponent.fontColor = this.config.fontColor;

        // Initialize the sensor component
        this.sensorComponent.sensors = this.config.sensors;
        this.sensorComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.sensorComponent.hass = this.hass;
        }
    }

    connectedCallback(): void {
        super.connectedCallback();

        // Initialize the clock component with the latest configuration
        this.clockComponent.timeFormat = this.config.timeFormat;
        this.clockComponent.dateFormat = this.config.dateFormat;
        this.clockComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';
        this.clockComponent.timeZone = this.config.timeZone;
        this.clockComponent.fontColor = this.config.fontColor;

        // Initialize the sensor component with the latest configuration
        this.sensorComponent.sensors = this.config.sensors;
        this.sensorComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.sensorComponent.hass = this.hass;
        }

        this.initConnectCallbackAsync();
    }

    async initConnectCallbackAsync(): Promise<void> {
        // Configure the logger based on the configured log level
        const logLevelString = this.config.logLevel || 'info';
        const logLevel = getLogLevelFromString(logLevelString);

        configureLogger({
            level: logLevel,
            prefix: 'wall-clock',
            enableSourceTracking: true,
            enableTimestamps: true,
            logToConsole: true,
            logToStorage: false
        });

        // Load translations for all supported languages
        try {
            await loadTranslationsAsync();
            logger.debug('Loaded translations for all languages');
        } catch (error) {
            logger.error('Error loading translations:', error);
        }

        // Fetch weather data first if enabled
        if (this.config.showWeather) {
            await this.fetchWeatherDataAsync();

            // Get configured weather update interval or default to 30 minutes (1800 seconds)
            let weatherInterval = this.config.weatherUpdateInterval || 1800;

            // Ensure minimum interval of 60 seconds
            weatherInterval = Math.max(weatherInterval, 60);

            // Convert to milliseconds
            const weatherIntervalMs = weatherInterval * 1000;

            logger.debug(`Setting weather update interval to ${weatherInterval} seconds`);

            // Update weather data at the configured interval
            this.weatherUpdateTimer = window.setInterval(() => {
                // Use a self-executing async function to allow await
                (async () => {
                    try {
                        await this.fetchWeatherDataAsync();
                    } catch (error) {
                        logger.error('Error in weather update interval:', error);
                    }
                })();
            }, weatherIntervalMs);
        }

        // Fetch transportation data if enabled and not on-demand
        if (this.config.transportation) {
            // Only fetch data automatically if on-demand loading is not enabled
            if (!this.config.transportation?.onDemand) {
                await this.fetchTransportationDataAsync();
                this.transportationDataLoaded = true;

                // Get configured transportation update interval or default to 60 seconds
                let transportationInterval = this.config.transportationUpdateInterval || 60;

                // Ensure minimum interval of 60 seconds
                transportationInterval = Math.max(transportationInterval, 60);

                // Convert to milliseconds
                const transportationIntervalMs = transportationInterval * 1000;

                logger.info(`Setting transportation update interval to ${transportationInterval} seconds`);

                // Update transportation data at the configured interval
                this.transportationUpdateTimer = window.setInterval(() => {
                    // Use a self-executing async function to allow await
                    (async () => {
                        try {
                            await this.fetchTransportationDataAsync();
                        } catch (error) {
                            logger.error('Error in transportation update interval:', error);
                        }
                    })();
                }, transportationIntervalMs);
            } else {
                logger.debug('Transportation on-demand loading is enabled. Data will be loaded when requested.');
            }
        }
    }

    private initBackgroundImageComponent(): void {
        if (this.backgroundImageComponent) {
            return;
        }

        // Create the background image component
        this.backgroundImageComponent = document.createElement('ha-background-image') as BackgroundImageComponent;

        // Create the full ImageSourceConfig
        const imageSourceConfig: ImageSourceConfig = {
            imageSourceId: this.config.imageSource || 'picsum',
            backgroundImages: this.config.backgroundImages,
            entity: this.config.imageConfig?.entity,
            apiKey: this.config.imageConfig?.apiKey
        };

        // Set the properties
        this.backgroundImageComponent.backgroundOpacity = this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.5;
        this.backgroundImageComponent.weather = this.weatherData?.current?.conditionUnified ?? Weather.All;
        this.backgroundImageComponent.config = {
            imageSourceConfig: imageSourceConfig,
            backgroundRotationInterval: this.config.backgroundRotationInterval
        };

        logger.debug('Background image component initialized');
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        // Clear all timers when the component is removed
        // The ClockComponent and BackgroundImageComponent will clean up themselves when removed from the DOM

        if (this.weatherUpdateTimer) {
            clearInterval(this.weatherUpdateTimer);
        }
        if (this.transportationUpdateTimer) {
            clearInterval(this.transportationUpdateTimer);
        }
        if (this.transportationAutoHideTimer) {
            clearTimeout(this.transportationAutoHideTimer);
        }
    }

    /**
     * Fetch transportation data from the configured provider
     */
    private async fetchTransportationDataAsync(): Promise<void> {
        if (!this.config.transportation || this.config.enableTransportation === false) return;

        // Mark as loading
        this.transportationData = {
            ...this.transportationData,
            loading: true,
            error: undefined
        };

        try {
            const transportationConfig = this.config.transportation as TransportationConfig;

            // Default to IDSJMK provider if not specified
            if (!transportationConfig.provider) {
                transportationConfig.provider = 'idsjmk';
            }

            // Get the transportation provider
            const provider = getTransportationProvider(transportationConfig.provider);

            if (!provider) {
                throw new Error(`Transportation provider '${transportationConfig.provider}' not found`);
            }

            // Convert stops to the format expected by the provider
            const stops = transportationConfig.stops.map(stop => ({
                stopId: stop.stopId,
                postId: stop.postId,
                name: stop.name // Pass the custom name if provided
            }));

            // Fetch transportation data from the provider
            const providerConfig = transportationConfig.providerConfig || {};
            // Include maxDepartures in the provider config if it's defined in transportationConfig
            if (transportationConfig.maxDepartures !== undefined) {
                providerConfig.maxDepartures = transportationConfig.maxDepartures;
            }
            this.transportationData = await provider.fetchTransportationAsync(providerConfig, stops);

            // Update the last update timestamp
            this.lastTransportationUpdate = new Date();

            logger.debug(`Fetched transportation data from ${provider.name}:`, this.transportationData);
        } catch (error) {
            logger.error('Error fetching transportation data:', error);
            this.transportationData = {
                departures: [],
                error: error instanceof Error ? error.message : String(error),
                loading: false
            };
        }
    }

    /**
     * Fetch weather data from the configured provider
     */
    private async fetchWeatherDataAsync(): Promise<void> {
        if (this.weatherLoading || !this.config.showWeather) return;

        logger.debug(`Begin fetch weather data`);

        this.weatherLoading = true;
        this.weatherError = false;
        this.weatherErrorMessage = '';

        try {
            // Get the weather provider from config, default to openweathermap
            const providerId = this.config.weatherProvider || 'openweathermap';
            const provider = getWeatherProvider(providerId);

            if (!provider) {
                throw new Error(`Weather provider '${providerId}' not found`);
            }

            // Get the weather config from the card config and ensure it's properly processed
            let weatherConfig = provider.getDefaultConfig();

            if (this.config.weatherConfig) {
                // Create a new object to avoid reference issues
                weatherConfig = {...weatherConfig, ...this.config.weatherConfig};

                // Ensure units is properly set if specified
                if (this.config.weatherConfig.units) {
                    weatherConfig.units = this.config.weatherConfig.units;
                    logger.debug(`Using weather units: ${weatherConfig.units}`);
                }
            }

            // Fetch weather data from the provider
            this.weatherData = await provider.fetchWeatherAsync(weatherConfig);

            logger.info(`Fetched weather data from ${provider.name}:`, this.weatherData);
        } catch (error) {
            this.weatherError = true;
            this.weatherErrorMessage = error instanceof Error ? error.message : String(error);
            logger.error('Error fetching weather data:', error);
        } finally {
            this.weatherLoading = false;
        }
    }

    // Required for Home Assistant custom cards
    static getConfigElement() {
        return document.createElement('wall-clock-card-editor');
    }

    // Return the card size (1 unit = 50px height)
    getCardSize(): number {
        return 4; // Approximately 200px height
    }

    // Required for Home Assistant custom cards
    static getStubConfig(): WallClockConfig {
        return {
            timeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            },
            dateFormat: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        };
    }

    setConfig(config: WallClockConfig): void {
        if (!config) {
            throw new Error('Invalid configuration');
        }

        this.initAfterSetConfigAsync(config);
    }

    async initAfterSetConfigAsync(config: WallClockConfig): Promise<void> {
        // Set default imageSource if not provided
        const imageSource = config.imageSource || 'none';

        // Ensure timeFormat is properly processed
        let timeFormat: ExtendedDateTimeFormatOptions = {
            hour: '2-digit' as const,
            minute: '2-digit' as const,
            second: '2-digit' as const,
            hour12: false
        };

        if (config.timeFormat) {
            // Create a new object to avoid reference issues
            timeFormat = {...timeFormat, ...config.timeFormat};

            // Ensure hour12 is properly set if specified
            if (config.timeFormat.hour12 !== undefined) {
                timeFormat.hour12 = Boolean(config.timeFormat.hour12);
            }

            // Explicitly handle the case when second is undefined
            if (config.timeFormat.second === undefined) {
                timeFormat.second = undefined;
            }
        }

        // Ensure dateFormat is properly processed
        let dateFormat: ExtendedDateTimeFormatOptions = {
            weekday: 'long' as const,
            year: 'numeric' as const,
            month: 'long' as const,
            day: 'numeric' as const
        };

        if (config.dateFormat) {
            // Create a new object to avoid reference issues
            dateFormat = {...dateFormat, ...config.dateFormat};

            // Explicitly handle the case when year is undefined
            if (config.dateFormat.year === undefined) {
                dateFormat.year = undefined;
            }
        }

        // Try to get time zone from config, then from Home Assistant, then default to browser's time zone
        let timeZone = config.timeZone;
        if (!timeZone && this.hass && this.hass.config && this.hass.config.time_zone) {
            timeZone = this.hass.config.time_zone;
        }

        this.config = {
            ...config,
            timeFormat,
            dateFormat,
            backgroundOpacity: config.backgroundOpacity !== undefined ? config.backgroundOpacity : 0.3,
            imageSource,
            imageConfig: config.imageConfig || {},
            backgroundRotationInterval: config.backgroundRotationInterval || 90,
            sensors: config.sensors || [],
            fontColor: config.fontColor || '#FFFFFF', // Default to white
            timeZone: timeZone
        };

        // Fetch weather data first if enabled
        if (this.config.showWeather) {
            await this.fetchWeatherDataAsync();
        }

        // Initialize the background image component
        this.initBackgroundImageComponent();

        // Initialize the clock component with the new configuration
        this.clockComponent.timeFormat = this.config.timeFormat;
        this.clockComponent.dateFormat = this.config.dateFormat;
        this.clockComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';
        this.clockComponent.timeZone = this.config.timeZone;
        this.clockComponent.fontColor = this.config.fontColor;

        // Initialize the sensor component with the new configuration
        this.sensorComponent.sensors = this.config.sensors;
        this.sensorComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.sensorComponent.hass = this.hass;
        }
    }

    // Update when hass changes to get latest sensor values
    updated(changedProperties: Map<string, any>): void {
        if (changedProperties.has('hass') && this.hass) {
            // Update the sensor component with the new hass
            this.sensorComponent.hass = this.hass;

            // Update the background image component with the new weather condition if available
            if(this.backgroundImageComponent) {
                this.backgroundImageComponent.weather = this.weatherData?.current?.conditionUnified ?? Weather.All;
            }
        }

        // If weather data changed, update the background image component
        if (changedProperties.has('weatherData') && this.backgroundImageComponent && this.weatherData?.current?.condition) {
            this.backgroundImageComponent.weather = this.weatherData?.current?.conditionUnified ?? Weather.All;
        }

        // If config changed, update the log level
        if (changedProperties.has('config') && this.config) {
            // Configure the logger based on the configured log level
            const logLevelString = this.config.logLevel || 'info';
            const logLevel = getLogLevelFromString(logLevelString);

            logger.debug(`Updating log level to ${logLevelString} (${LogLevel[logLevel]})`);

            configureLogger({
                level: logLevel,
                prefix: 'wall-clock',
                enableSourceTracking: true,
                enableTimestamps: true,
                logToConsole: true,
                logToStorage: false
            });
        }
    }


    static get styles(): CSSResult {
        return css`
            /* Include ClockComponent styles */
            ${unsafeCSS(ClockComponent.styles)}
            /* Include SensorComponent styles */
            ${unsafeCSS(SensorComponent.styles)}
            /* Include BackgroundImageComponent styles */
            ${unsafeCSS(BackgroundImageComponent.styles)}
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                background-color: var(--card-background-color, var(--primary-background-color, #111));
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                padding: 0px;
                box-sizing: border-box;
            }

            ha-card {
                width: 100%;
                overflow: hidden;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            /* Background image styles are now in the BackgroundImageComponent */



            /* Sensor styles are now in the SensorComponent */

            /* Weather display styles */

            .weather-container {
                position: absolute;
                top: 16px;
                right: 16px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                z-index: 3;
                max-width: 40%;
                max-height: 60%;
                overflow-y: auto;
                padding-left: 8px;
            }

            .weather-title {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
                text-align: right;
            }

            .weather-current {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                margin-bottom: 16px;
            }

            .weather-temp-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
            }

            .weather-temp {
                font-size: 2.5rem;
                line-height: 2.5rem;
                font-weight: 400;
            }

            .weather-condition {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
            }

            .weather-icon {
                width: 50px;
                height: 50px;
                margin-left: 8px;
            }

            .weather-forecast {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .forecast-day {
                display: flex;
                align-items: center;
            }

            .forecast-date {
                font-size: 1.4rem;
                font-weight: 300;
                margin-right: 8px;
                opacity: 0.8;
                width: 2rem;
                text-align: right;
            }

            .forecast-icon {
                width: 50px;
                height: 50px;
                margin: 0 8px;
            }

            .forecast-temp {
                font-size: 1.4rem;
                font-weight: 400;
                width: 80px;
                text-align: right;
            }

            .forecast-condition {
                font-size: 0.9rem;
                margin-top: 0.2rem;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
            }

            .weather-error {
                color: #f44336;
                font-size: 1rem;
            }

            /* Transportation styles */

            .transportation-container {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 3;
                padding: 8px 16px;
                background-color: rgba(0, 0, 0, 0.1);
                border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            }

            .transportation-on-demand-button {
                position: absolute;
                bottom: 16px;
                left: 16px;
                width: 144px;
                height: 144px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.25);
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                z-index: 3;
                transition: all 0.3s ease;
            }

            .transportation-on-demand-button:hover {
                background-color: rgba(255, 255, 255, 0.4);
                transform: scale(1.1);
            }

            .transportation-on-demand-button svg {
                width: 72px;
                height: 72px;
                fill: white;
            }

            .transportation-title {
                font-size: 1.5rem;
                font-weight: 300;
                opacity: 0.8;
                margin-bottom: 8px;
            }

            .transportation-departures {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 16px;
            }

            .stop-group {
                display: flex;
                flex-direction: column;
                width: 100%;
            }

            /* Responsive layout for transportation stops */
            @media (max-width: 480px) {
                /* Force single column on very small screens */
                .transportation-departures {
                    flex-direction: column;
                }

                .stop-group {
                    width: 100%;
                }
            }

            @media (min-width: 481px) and (max-width: 599px) {
                /* Allow 2 columns on slightly larger screens if they fit */
                .transportation-departures {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .stop-group {
                    width: calc(50% - 8px);
                }
            }

            @media (min-width: 600px) {
                .transportation-departures {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .stop-group {
                    width: calc(50% - 8px);
                }
            }

            /* 3 columns for wider screens */
            @media (min-width: 900px) and (max-width: 1179px) {
                .stop-group {
                    width: calc(33% - 8px);
                }
            }

            /* 3 columns for 1180px resolution as requested */
            @media (min-width: 1180px) and (max-width: 1399px) {
                .stop-group {
                    width: calc(33% - 8px);
                }
            }

            /* 4 columns for very wide screens */
            @media (min-width: 1400px) {
                .stop-group {
                    width: calc(25% - 8px);
                }
            }

            .stop-name {
                font-size: 1.3rem;
                font-weight: 500;
                text-align: left;
                width: 100%;
                margin-top: 0;
                margin-bottom: 8px;
                margin-left: 12px;
                opacity: 0.8;
            }

            .stop-departures {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 8px;
            }

            .departure-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.3);
                padding: 8px 12px;
                border-radius: 4px;
                width: calc(100% - 24px);
            }

            .departure-line {
                font-size: 1.5rem;
                font-weight: 700;
                margin-right: 8px;
                min-width: 2rem;
                text-align: center;
            }

            .departure-destination {
                font-size: 1.2rem;
                margin-right: 8px;
            }

            .departure-time {
                font-size: 1.2rem;
                font-weight: 700;
                color: #4CAF50;
            }

            .departure-lowfloor {
                margin-left: 4px;
                font-size: 1.2rem;
            }

            .transportation-error {
                color: #f44336;
                font-size: 1rem;
            }

            .transportation-update-time {
                font-size: 0.8rem;
                opacity: 0.7;
                text-align: center;
                margin-top: 8px;
                width: 100%;
            }

            /* Responsive adjustments */
            @media (min-width: 900px) {
                .weather-temp {
                    font-size: 3rem;
                    line-height: 3rem;
                }

                .weather-icon {
                    width: 60px;
                    height: 60px;
                }
            }

            @media (min-width: 1280px) {
                .weather-temp {
                    font-size: 3rem;
                    line-height: 3rem;
                }

                .weather-icon {
                    width: 60px;
                    height: 60px;
                }

                .stop-group {
                    margin-bottom: 16px;
                }
            }
        `;
    }

    render() {
        // Initialize the background image component if it hasn't been initialized yet
        if (!this.backgroundImageComponent) {
            this.initBackgroundImageComponent();
        }

        return html`
            <ha-card style="color: ${this.config.fontColor};">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather && this.weatherData ?
                        html`
                            <div class="weather-container" style="color: ${this.config.fontColor};">
                                ${this.renderWeatherContent()}
                            </div>` :
                        ''
                }
                <div style="${this.config.transportation && this.config.enableTransportation !== false ? `margin-top: -${(this.config.transportation.maxDepartures || 3) * 30 + 80}px;` : ''}">
                    ${this.clockComponent}
                </div>
                ${this.config.transportation && this.config.enableTransportation !== false ?
                        this.config.transportation?.onDemand && !this.transportationDataLoaded ?
                                html`
                                    <div class="transportation-on-demand-button"
                                         @click=${this._handleTransportationClickAsync}>
                                        <svg viewBox="0 0 24 24">
                                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                                        </svg>
                                    </div>` :
                                html`
                                    <div class="transportation-container" style="color: ${this.config.fontColor};">
                                        ${this.renderTransportationContent()}
                                    </div>`
                        : ''
                }
            </ha-card>
        `;
    }

    /**
     * Render transportation content
     */
    private renderTransportationContent(): TemplateResult {
        if (this.transportationData.loading) {
            return html`
                <div>Loading transportation data...</div>`;
        }

        if (this.transportationData.error) {
            return html`
                <div class="transportation-error">${this.transportationData.error}</div>`;
        }

        if (!this.transportationData.departures || this.transportationData.departures.length === 0) {
            return html`
                <div>No departures available</div>`;
        }

        // Group departures by stop name and postId
        const departuresByStop: { [key: string]: TransportationDeparture[] } = {};

        for (const departure of this.transportationData.departures) {
            const key = `${departure.stopName}-${departure.postId}`;
            if (!departuresByStop[key]) {
                departuresByStop[key] = [];
            }
            departuresByStop[key].push(departure);
        }

        return html`
            <div class="transportation-departures">
                ${Object.entries(departuresByStop).map(([_key, departures]) => {
                    // Get the stop name from the first departure
                    const stopName = departures[0].stopName;

                    return html`
                        <div class="stop-group">
                            <h3 class="stop-name" style="color: ${this.config.fontColor};">
                                ${stopName}
                            </h3>
                            <div class="stop-departures">
                                ${departures.map(departure => html`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.config.fontColor};">
                                            ${departure.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.config.fontColor};">→
                                            ${departure.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.config.fontColor};">
                                            ${departure.timeMark}
                                        </div>
                                        ${departure.isLowFloor ? html`
                                            <div class="departure-lowfloor">♿</div>` : ''}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }

    /**
     * Render weather content based on display mode
     */
    private renderWeatherContent(): TemplateResult {
        if (this.weatherError) {
            return html`
                <div class="weather-error">${this.weatherErrorMessage}</div>`;
        }

        if (!this.weatherData || !this.weatherData.current) {
            return html`
                <div class="weather-loading">Loading weather data...</div>`;
        }

        const displayMode = this.config.weatherDisplayMode || 'both';
        const forecastDays = this.config.weatherForecastDays || 3;
        const weatherTitle = this.config.weatherTitle || 'Weather';

        // Limit forecast days to available data (max 7 days)
        const limitedForecastDays = Math.min(forecastDays, this.weatherData.daily.length);

        return html`
            <div class="weather-title" style="color: ${this.config.fontColor};">${weatherTitle}</div>

            ${(displayMode === 'current' || displayMode === 'both') ?
                    html`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${this.weatherData.current.icon}"
                                     alt="${this.weatherData.current.condition}">
                                <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition">
                                ${this.translateWeatherCondition(this.weatherData.current.condition)}
                            </div>
                        </div>
                    ` :
                    ''
            }

            ${(displayMode === 'forecast' || displayMode === 'both') ?
                    html`
                        <div class="weather-forecast">
                            ${this.weatherData.daily.slice(0, limitedForecastDays).map(day => html`
                                <div class="forecast-day">
                                    <div class="forecast-date">${this.formatForecastDate(day.date)}</div>
                                    <img class="forecast-icon" src="${day.icon}" alt="${day.condition}">
                                    <div class="forecast-temp">${Math.round(day.temperatureMin)}° -
                                        ${Math.round(day.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    ` :
                    ''
            }
        `;
    }

    /**
     * Handle click on the transportation button
     * This is called when the user clicks the bus icon to load transportation data on demand
     */
    private async _handleTransportationClickAsync(): Promise<void> {
        logger.debug('Transportation button clicked, loading data on demand');

        // Fetch transportation data
        await this.fetchTransportationDataAsync();

        // Mark as loaded so the button is replaced with the data
        this.transportationDataLoaded = true;

        // Set up an interval to update the data if configured
        if (this.config.transportationUpdateInterval) {
            // Get configured transportation update interval or default to 60 seconds
            let transportationInterval = this.config.transportationUpdateInterval || 60;

            // Ensure minimum interval of 60 seconds
            transportationInterval = Math.max(transportationInterval, 60);

            // Convert to milliseconds
            const transportationIntervalMs = transportationInterval * 1000;

            logger.debug(`Setting transportation update interval to ${transportationInterval} seconds`);

            // Clear any existing timeTimer
            if (this.transportationUpdateTimer) {
                clearInterval(this.transportationUpdateTimer);
            }

            // Update transportation data at the configured interval
            this.transportationUpdateTimer = window.setInterval(() => {
                // Use a self-executing async function to allow await
                (async () => {
                    try {
                        await this.fetchTransportationDataAsync();
                    } catch (error) {
                        logger.error('Error in transportation update interval:', error);
                    }
                })();
            }, transportationIntervalMs);
        }

        // Set up auto-hide timeTimer if configured
        if (this.config.transportation?.autoHideTimeout) {
            // Clear any existing auto-hide timeTimer
            if (this.transportationAutoHideTimer) {
                clearTimeout(this.transportationAutoHideTimer);
            }

            // Get configured auto-hide timeout or default to 5 minutes
            let autoHideTimeout = this.config.transportation.autoHideTimeout || 5;

            // Ensure timeout is between 1 and 10 minutes
            autoHideTimeout = Math.max(1, Math.min(10, autoHideTimeout));

            // Convert to milliseconds
            const autoHideTimeoutMs = autoHideTimeout * 60 * 1000;

            logger.debug(`Setting transportation auto-hide timeout to ${autoHideTimeout} minutes`);

            // Set timeTimer to hide departures and show bus button again after timeout
            this.transportationAutoHideTimer = window.setTimeout(() => {
                logger.debug(`Auto-hiding transportation departures after ${autoHideTimeout} minutes`);
                this.transportationDataLoaded = false;
            }, autoHideTimeoutMs);
        }
    }

    /**
     * Translate a weather condition
     * @param condition The weather condition to translate
     * @returns The translated weather condition
     */
    private translateWeatherCondition(condition: string): string {
        // Get language from config, or Home Assistant language, or default to Czech
        const language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';

        // Convert condition to a format suitable for path lookup (replace spaces with underscores)
        const normalizedCondition = condition.toLowerCase().replace(/ /g, '_');

        // Try to get the translation from the conditions section
        const conditionPath = `conditions.${normalizedCondition}`;
        const translation = translate(conditionPath, language, null);

        if (translation !== null) {
            return translation;
        }

        // Fall back to the original condition if no translation is found
        return condition;
    }

    /**
     * Format a date for display in the forecast
     */
    private formatForecastDate(date: Date): string {
        // Get language from config, or Home Assistant language, or default to Czech
        const language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';

        // Format: "Mon", "Tue", etc.
        return formatDate(date, language, {weekday: 'short'});
    }
}

// Add card to window for type checking
declare global {
    interface Window {
        customCards: any[];
    }
}

// Add card to window.customCards
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'wall-clock-card',
    name: 'Wall Clock Card',
    description: 'A card that displays a clock with seconds and the current date',
});

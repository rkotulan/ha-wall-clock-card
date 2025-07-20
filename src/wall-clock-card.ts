import {css, CSSResult, html, LitElement, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {BackgroundImage, ImageSourceConfig, Weather} from './image-sources';
import {WeatherProviderConfig} from './weather-providers';
import {
    TransportationConfig
} from './transportation-providers';
import { ActionBarConfig } from './components/action-bar';
import {ExtendedDateTimeFormatOptions, loadTranslationsAsync} from './utils/localize/lokalify';
import {configureLogger, getLogLevelFromString, logger, LogLevel} from './utils/logger/logger';
import {ClockComponent} from './components/clock';
import {SensorComponent} from './components/sensor';
import {BackgroundImageComponent} from './components/background-image';
import {WeatherComponent} from './components/weather';
import {TransportationComponent} from './components/transportation';
import {ActionBarComponent} from './components/action-bar';
import './wall-clock-card-editor';
import './components/ha-selector'; // Import the ha-selector components
import {WeatherSignalProvider} from "./signals/weather-signal";

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

    // Action bar settings
    enableActionBar?: boolean; // Whether to show action bar
    actionBar?: ActionBarConfig; // Configuration for action bar

    // Allow string indexing for dynamic property access
    [key: string]: any;
}


@customElement('wall-clock-card')
export class WallClockCard extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config: WallClockConfig = {};

    // Sensor values are now handled by the SensorComponent
    @property({type: Number}) consecutiveFailures = 0; // Track consecutive image loading failures
    @property({type: Boolean}) isRetrying = false; // Flag to track if we're in retry mode
    // Weather data is now handled by the WeatherComponent
    // Transportation data is now handled by the TransportationComponent

    // Components
    private clockComponent: ClockComponent = document.createElement('ha-clock') as ClockComponent;
    private sensorComponent: SensorComponent = document.createElement('ha-sensors') as SensorComponent;
    private weatherComponent: WeatherComponent = document.createElement('ha-weather') as WeatherComponent;
    private backgroundImageComponent: BackgroundImageComponent = document.createElement('ha-background-image') as BackgroundImageComponent;
    private transportationComponent: TransportationComponent = document.createElement('ha-transportation') as TransportationComponent;
    private actionBarComponent: ActionBarComponent = document.createElement('ha-action-bar') as ActionBarComponent;

    // Weather signal provider instance
    private weatherSignalProvider = new WeatherSignalProvider();

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

        // Initialize the weather component
        this.weatherComponent.showWeather = this.config.showWeather;
        this.weatherComponent.weatherProvider = this.config.weatherProvider;
        this.weatherComponent.weatherConfig = this.config.weatherConfig;
        this.weatherComponent.weatherDisplayMode = this.config.weatherDisplayMode;
        this.weatherComponent.weatherForecastDays = this.config.weatherForecastDays;
        this.weatherComponent.weatherTitle = this.config.weatherTitle;
        this.weatherComponent.weatherUpdateInterval = this.config.weatherUpdateInterval;
        this.weatherComponent.fontColor = this.config.fontColor;
        this.weatherComponent.language = this.config.language;

        // Initialize the transportation component
        this.transportationComponent.transportation = this.config.transportation;
        this.transportationComponent.transportationUpdateInterval = this.config.transportationUpdateInterval;
        this.transportationComponent.enableTransportation = this.config.enableTransportation === true;
        this.transportationComponent.fontColor = this.config.fontColor;
        this.transportationComponent.actionBarEnabled = this.config.enableActionBar === true;

        // Initialize the action bar component
        this.actionBarComponent.actionBar = this.config.actionBar;
        this.actionBarComponent.enableActionBar = this.config.enableActionBar === true;
        this.actionBarComponent.fontColor = this.config.fontColor;
    }

    connectedCallback(): void {
        super.connectedCallback();

        // Initialize the background image component
        this.initBackgroundImageComponent();

        // Initialize the clock component with the latest configuration
        this.clockComponent.timeFormat = this.config.timeFormat;
        this.clockComponent.dateFormat = this.config.dateFormat;
        this.clockComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'en';
        this.clockComponent.timeZone = this.config.timeZone;
        this.clockComponent.fontColor = this.config.fontColor;

        // Initialize the sensor component with the latest configuration
        this.sensorComponent.sensors = this.config.sensors;
        this.sensorComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.sensorComponent.hass = this.hass;
        }

        // Initialize the weather component with the latest configuration
        this.weatherComponent.showWeather = this.config.showWeather;
        this.weatherComponent.weatherProvider = this.config.weatherProvider;
        this.weatherComponent.weatherConfig = this.config.weatherConfig;
        this.weatherComponent.weatherDisplayMode = this.config.weatherDisplayMode;
        this.weatherComponent.weatherForecastDays = this.config.weatherForecastDays;
        this.weatherComponent.weatherTitle = this.config.weatherTitle;
        this.weatherComponent.weatherUpdateInterval = this.config.weatherUpdateInterval;
        this.weatherComponent.fontColor = this.config.fontColor;
        this.weatherComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'en';

        // Set the weather signal provider
        this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider);

        // Initialize the transportation component with the latest configuration
        this.transportationComponent.transportation = this.config.transportation;
        this.transportationComponent.transportationUpdateInterval = this.config.transportationUpdateInterval;
        this.transportationComponent.enableTransportation = this.config.enableTransportation === true;
        this.transportationComponent.fontColor = this.config.fontColor;
        this.transportationComponent.actionBarEnabled = this.config.enableActionBar === true;
        if (this.hass) {
            this.transportationComponent.hass = this.hass;
        }

        // Initialize the action bar component with the latest configuration
        this.actionBarComponent.actionBar = this.config.actionBar;
        this.actionBarComponent.enableActionBar = this.config.enableActionBar === true;
        this.actionBarComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.actionBarComponent.hass = this.hass;
        }

        this.initConnectCallbackAsync();
    }

    async initConnectCallbackAsync(): Promise<void> {

        // Wait for the components to be ready
        await this.weatherComponent.controller.ready;
        await this.backgroundImageComponent.controller.ready;
        await this.clockComponent.controller.ready;
        await this.sensorComponent.controller.ready;
        await this.transportationComponent.controller.ready;
        await this.actionBarComponent.controller.ready;

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

        if(!this.config.showWeather) {
            this.weatherSignalProvider.updateWeatherSignal(Weather.All);
        }

        // Transportation data is now handled by the TransportationComponent
    }

    private initBackgroundImageComponent(): void {

        // Create the full ImageSourceConfig
        const imageSourceConfig: ImageSourceConfig = {
            imageSourceId: this.config.imageSource || 'picsum',
            backgroundImages: this.config.backgroundImages,
            entity: this.config.imageConfig?.entity,
            apiKey: this.config.imageConfig?.apiKey,
            contentFilter: this.config.imageConfig?.contentFilter,
            category: this.config.imageConfig?.category,
            count: this.config.imageConfig?.count
        };

        // Set the properties
        this.backgroundImageComponent.backgroundOpacity = this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.5;
        this.backgroundImageComponent.config = {
            imageSourceConfig: imageSourceConfig,
            backgroundRotationInterval: this.config.backgroundRotationInterval
        };

        // Set the weather signal provider
        this.backgroundImageComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider);

        logger.debug('Background image component initialized');
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    // Transportation data is now handled by the TransportationComponent

    // Weather data is now handled by the WeatherComponent

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

        // Initialize the background image component
        this.initBackgroundImageComponent();

        // Initialize the clock component with the new configuration
        this.clockComponent.timeFormat = this.config.timeFormat;
        this.clockComponent.dateFormat = this.config.dateFormat;
        this.clockComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'en';
        this.clockComponent.timeZone = this.config.timeZone;
        this.clockComponent.fontColor = this.config.fontColor;

        // Initialize the sensor component with the new configuration
        this.sensorComponent.sensors = this.config.sensors;
        this.sensorComponent.fontColor = this.config.fontColor;
        if (this.hass) {
            this.sensorComponent.hass = this.hass;
        }

        // Initialize the weather component with the new configuration
        this.weatherComponent.showWeather = this.config.showWeather;
        this.weatherComponent.weatherProvider = this.config.weatherProvider;
        this.weatherComponent.weatherConfig = this.config.weatherConfig;
        this.weatherComponent.weatherDisplayMode = this.config.weatherDisplayMode;
        this.weatherComponent.weatherForecastDays = this.config.weatherForecastDays;
        this.weatherComponent.weatherTitle = this.config.weatherTitle;
        this.weatherComponent.weatherUpdateInterval = this.config.weatherUpdateInterval;
        this.weatherComponent.fontColor = this.config.fontColor;
        this.weatherComponent.language = this.config.language || (this.hass ? this.hass.language : null) || 'en';

        // Set the weather signal provider
        this.weatherComponent.controller.setWeatherSignalProvider(this.weatherSignalProvider);

        // Initialize the transportation component with the new configuration
        this.transportationComponent.transportation = this.config.transportation;
        this.transportationComponent.transportationUpdateInterval = this.config.transportationUpdateInterval;
        this.transportationComponent.enableTransportation = this.config.enableTransportation === true;
        this.transportationComponent.fontColor = this.config.fontColor;
        this.transportationComponent.actionBarEnabled = this.config.enableActionBar === true;

        // Initialize the action bar component with the new configuration
        this.actionBarComponent.actionBar = this.config.actionBar;
        this.actionBarComponent.enableActionBar = this.config.enableActionBar === true;
        this.actionBarComponent.fontColor = this.config.fontColor;

        if(!this.config.showWeather) {
            this.backgroundImageComponent.controller.ready.then(() => {

                this.weatherSignalProvider.updateWeatherSignal(Weather.All);
            });
        }
    }

    // Update when hass changes to get latest sensor values
    updated(changedProperties: Map<string, any>): void {
        if (changedProperties.has('hass') && this.hass) {
            // Update the sensor component with the new hass
            this.sensorComponent.hass = this.hass;

            // Update the transportation component with the new hass
            this.transportationComponent.hass = this.hass;

            // Update the action bar component with the new hass
            this.actionBarComponent.hass = this.hass;
        }

        // If config changed, update the action bar status in the transportation component
        if (changedProperties.has('config') && this.config) {
            this.transportationComponent.actionBarEnabled = this.config.enableActionBar === true;
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
            /* Include WeatherComponent styles */
            ${unsafeCSS(WeatherComponent.styles)}
            /* Include TransportationComponent styles */
            ${unsafeCSS(TransportationComponent.styles)}
            /* Include ActionBarComponent styles */
            ${unsafeCSS(ActionBarComponent.styles)}
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

        `;
    }

    render() {
        // Calculate margin adjustment for clock based on transportation and action bar
        const hasTransportation = this.config.transportation && this.config.enableTransportation === true;
        const hasActionBar = this.config.actionBar && this.config.enableActionBar === true;

        // Check if transportation data is loaded and should be displayed
        const isTransportationDisplayed = hasTransportation && this.transportationComponent.controller.isActive;

        // Action bar takes precedence over transportation for margin adjustments
        let clockMarginStyle = '';

        if (hasActionBar || isTransportationDisplayed) {
            // Adjust for action bar (approximately 80px)
            clockMarginStyle = 'margin-top: -140px;';
        }

        return html`
            <ha-card style="color: rgb( ${this.config.fontColor});">
                ${this.backgroundImageComponent}
                ${this.sensorComponent}
                ${this.config.showWeather ?
                        html`<div style="position: absolute; top: 16px; right: 16px; max-width: 40%; max-height: 60%; z-index: 3; padding-left: 8px;">
                            ${this.weatherComponent}
                        </div>` :
                        ''
                }
                <div style="${clockMarginStyle}">
                    ${this.clockComponent}
                </div>
                ${this.transportationComponent}
                ${!isTransportationDisplayed ? this.actionBarComponent : ''}
            </ha-card>
        `;
    }

    // Transportation content is now handled by the TransportationComponent

    // Weather content is now handled by the WeatherComponent

    // Transportation button click is now handled by the TransportationComponent

    // Weather-related methods are now handled by the WeatherComponent
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

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WeatherData, WeatherProviderConfig } from '../../weather-providers';
import {createLogger, formatDate, Messenger, translate, WeatherMessage} from '../../utils';
import { WeatherController, WeatherControllerConfig } from './weather-controller';
import { Size } from '../../core/types';

export interface WeatherComponentConfig {
    showWeather?: boolean;
    weatherProvider?: string;
    weatherConfig?: WeatherProviderConfig;
    weatherDisplayMode?: 'current' | 'forecast' | 'both';
    weatherForecastDays?: number;
    weatherTitle?: string;
    weatherUpdateInterval?: number;
    fontColor?: string;
    language?: string;
    size?: Size;
    labelSize?: string;
    valueSize?: string;
}

@customElement('ha-weather')
export class WeatherComponent extends LitElement {
    @property({ type: Boolean }) showWeather?: boolean;
    @property({ type: String }) weatherProvider?: string;
    @property({ type: Object }) weatherConfig?: WeatherProviderConfig;
    @property({ type: String }) weatherDisplayMode?: 'current' | 'forecast' | 'both';
    @property({ type: Number }) weatherForecastDays?: number;
    @property({ type: String }) weatherTitle?: string;
    @property({ type: Number }) weatherUpdateInterval?: number;
    @property({ type: String }) fontColor?: string;
    @property({ type: String }) language?: string;
    @property({ type: String }) size?: Size;
    @property({ type: String }) labelSize?: string;
    @property({ type: String }) valueSize?: string;

    private logger = createLogger('weather-component');
    private weatherController: WeatherController;

    constructor() {
        super();
        // Initialize the controller with the host (this component)
        this.weatherController = new WeatherController(this, {
            showWeather: this.showWeather,
            weatherProvider: this.weatherProvider,
            weatherConfig: this.weatherConfig,
            weatherDisplayMode: this.weatherDisplayMode,
            weatherForecastDays: this.weatherForecastDays,
            weatherTitle: this.weatherTitle,
            weatherUpdateInterval: this.weatherUpdateInterval
        });
    }

    get controller(): WeatherController {
        return this.weatherController;
    }

    static styles = css`
        .weather-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            z-index: 3;
            max-width: 100%;
            max-height: 100%;
            overflow-y: auto;
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
            font-size: 3rem; /* Medium size (default) */
            line-height: 3rem;
            font-weight: 400;
        }

        .weather-condition {
            font-size: 1.5rem; /* Medium size (default) */
            font-weight: 300;
            opacity: 0.8;
        }

        .weather-icon {
            width: 60px; /* Medium size (default) */
            height: 60px;
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
            font-size: 1.4rem; /* Medium size (default) */
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
            font-size: 1.4rem; /* Medium size (default) */
            font-weight: 400;
            width: 80px;
            text-align: right;
        }

        .forecast-condition {
            font-size: 0.9rem; /* Medium size (default) */
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
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('showWeather') || 
            changedProperties.has('weatherProvider') || 
            changedProperties.has('weatherConfig') || 
            changedProperties.has('weatherDisplayMode') || 
            changedProperties.has('weatherForecastDays') || 
            changedProperties.has('weatherTitle') || 
            changedProperties.has('weatherUpdateInterval')) {

            this.logger.debug('Weather properties changed, updating WeatherController');

            // Update WeatherController with new configuration
            const config: WeatherControllerConfig = {
                showWeather: this.showWeather,
                weatherProvider: this.weatherProvider,
                weatherConfig: this.weatherConfig,
                weatherDisplayMode: this.weatherDisplayMode,
                weatherForecastDays: this.weatherForecastDays,
                weatherTitle: this.weatherTitle,
                weatherUpdateInterval: this.weatherUpdateInterval
            };

            this.weatherController.updateConfigAsync(config);
        }

        if (changedProperties.has('size') ||
            changedProperties.has('labelSize') ||
            changedProperties.has('valueSize')) {

            this.logger.debug('Size properties changed');

            if (changedProperties.has('size')) {
                const oldSize = changedProperties.get('size');
                this.logger.debug(`Size changed: ${oldSize} -> ${this.size}`);
            }

            if (changedProperties.has('labelSize')) {
                const oldLabelSize = changedProperties.get('labelSize');
                this.logger.debug(`LabelSize changed: ${oldLabelSize} -> ${this.labelSize}`);
            }

            if (changedProperties.has('valueSize')) {
                const oldValueSize = changedProperties.get('valueSize');
                this.logger.debug(`ValueSize changed: ${oldValueSize} -> ${this.valueSize}`);
            }

            // Force re-render to apply new sizes
            this.requestUpdate();
        }
    }

    /**
     * Translate a weather condition
     * @param condition The weather condition to translate
     * @returns The translated weather condition
     */
    private translateWeatherCondition(condition: string): string {
        // Get language from config or default to English
        const language = this.language || 'en';

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
        // Get language from config or default to English
        const language = this.language || 'en';

        // Format: "Mon", "Tue", etc.
        return formatDate(date, language, {weekday: 'short'});
    }

    // Public getter for weather data
    get weatherData(): WeatherData | undefined {
        const weatherData = this.weatherController.weatherData;

        // Update the weather signal if we have weather data with a condition
        if (weatherData && weatherData.current && weatherData.current.conditionUnified) {
            Messenger.getInstance().publish(new WeatherMessage(weatherData.current.conditionUnified));
        }

        return weatherData;
    }

    getLabelSize(): string {
        if (this.size === Size.Custom && this.labelSize) {
            return this.labelSize;
        } else if (this.size === Size.Large) {
            return '1.8rem';
        } else {
            // Default to medium size
            return '1.5rem';
        }
    }

    getValueSize(): string {
        if (this.size === Size.Custom && this.valueSize) {
            return this.valueSize;
        } else if (this.size === Size.Large) {
            return '3.5rem';
        } else {
            // Default to medium size
            return '3rem';
        }
    }

    getForecastTempWidth(): string {
        if (this.size === Size.Large) {
            return '120px'; // Wider for large size to prevent wrapping
        } else {
            return '80px'; // Default width
        }
    }

    render() {
        const weatherData: WeatherData | undefined = this.weatherController.weatherData;

        if (this.weatherController.hasError) {
            return html`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-error">${this.weatherController.errorMessage}</div>
                </div>`;
        }

        if (this.weatherController.isLoading || !weatherData) {
            return html`
                <div class="weather-container" style="color: ${this.fontColor};">
                    <div class="weather-loading">Loading weather data...</div>
                </div>`;
        }

        const displayMode = this.weatherDisplayMode || 'both';
        const forecastDays = this.weatherForecastDays || 3;
        const weatherTitle = this.weatherTitle || 'Weather';

        // Limit forecast days to available data (max 7 days)
        const limitedForecastDays = Math.min(forecastDays, weatherData.daily.length);

        const labelSize = this.getLabelSize();
        const valueSize = this.getValueSize();
        const forecastTempWidth = this.getForecastTempWidth();

        return html`
            <div class="weather-container" style="color: ${this.fontColor};">
                <div class="weather-title" style="color: ${this.fontColor}; font-size: ${labelSize};">${weatherTitle}</div>

                ${(displayMode === 'current' || displayMode === 'both') ?
                    html`
                        <div class="weather-current">
                            <div class="weather-temp-container">
                                <img class="weather-icon" src="${weatherData.current.icon}"
                                     alt="${weatherData.current.condition}">
                                <div class="weather-temp" style="font-size: ${valueSize};">${Math.round(weatherData.current.temperature)}°</div>
                            </div>
                            <div class="weather-condition" style="font-size: ${labelSize};">
                                ${this.translateWeatherCondition(weatherData.current.condition)}
                            </div>
                        </div>
                    ` :
                    ''
                }

                ${(displayMode === 'forecast' || displayMode === 'both') ?
                    html`
                        <div class="weather-forecast">
                            ${weatherData.daily.slice(0, limitedForecastDays).map(day => html`
                                <div class="forecast-day">
                                    <div class="forecast-date" style="font-size: ${labelSize};">${this.formatForecastDate(day.date)}</div>
                                    <img class="forecast-icon" src="${day.icon}" alt="${day.condition}">
                                    <div class="forecast-temp" style="font-size: ${labelSize}; width: ${forecastTempWidth};">${Math.round(day.temperatureMin)}° -
                                        ${Math.round(day.temperatureMax)}°
                                    </div>
                                </div>
                            `)}
                        </div>
                    ` :
                    ''
                }
            </div>
        `;
    }
}

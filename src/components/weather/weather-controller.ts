import {ReactiveControllerHost} from 'lit';
import {getWeatherProvider, WeatherData, WeatherProviderConfig} from '../../weather-providers';
import {BaseController} from '../../utils/controllers';
import {WeatherSignalProvider, updateWeatherSignal} from "../../signals/weather-signal";
import {Weather} from "../../image-sources";

export interface WeatherControllerConfig {
    showWeather?: boolean;
    weatherProvider?: string;
    weatherConfig?: WeatherProviderConfig;
    weatherDisplayMode?: 'current' | 'forecast' | 'both';
    weatherForecastDays?: number;
    weatherTitle?: string;
    weatherUpdateInterval?: number;
}

/**
 * A reactive controller that manages weather data
 */
export class WeatherController extends BaseController {
    private updateTimer?: number;

    // Reactive properties for weather data
    private _weatherData?: WeatherData;
    private _weatherLoading = false;
    private _weatherError = false;
    private _weatherErrorMessage = '';

    // Configuration
    private config: WeatherControllerConfig = {};

    // Weather signal provider
    private _weatherSignalProvider?: WeatherSignalProvider;

    constructor(host: ReactiveControllerHost, config: WeatherControllerConfig = {}) {
        super(host, 'weather-controller');
        this.config = config;
    }

    /**
     * Set the weather signal provider for this controller
     */
    setWeatherSignalProvider(provider: WeatherSignalProvider): void {
        this._weatherSignalProvider = provider;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        // Fetch weather data immediately if enabled
        if (this.config.showWeather) {
            // Set up interval to update weather data
            this.setupUpdateInterval();

            this.fetchWeatherDataAsync();
        }
    }

    protected onHostDisconnected(): void {
        // Clear interval when disconnected
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = undefined;
        }
    }

    /**
     * Update the configuration
     */
    async updateConfigAsync(config: WeatherControllerConfig): Promise<void> {
        this.logger.debug('Updating WeatherController config:', config);

        const previousShowWeather = this.config.showWeather;
        const previousUpdateInterval = this.config.weatherUpdateInterval;

        this.config = { ...this.config, ...config };

        // If update interval changed, reset the interval
        if (previousUpdateInterval !== this.config.weatherUpdateInterval) {
            this.setupUpdateInterval();
        }

        // If weather was disabled and is now enabled, fetch data
        if (!previousShowWeather && this.config.showWeather) {
            await this.fetchWeatherDataAsync();
        }
        else if(!this.config.showWeather) {
            if (this._weatherSignalProvider) {
                this._weatherSignalProvider.updateWeatherSignal(Weather.All);
            } else {
                updateWeatherSignal(Weather.All);
            }
        }

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Set up the interval to update weather data
     */
    private setupUpdateInterval(): void {
        // Clear any existing interval
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = undefined;
        }

        // If weather is not enabled, don't set up an interval
        if (!this.config.showWeather) {
            return;
        }

        // Get configured weather update interval or default to 30 minutes (1800 seconds)
        let weatherInterval = this.config.weatherUpdateInterval || 1800;

        // Ensure minimum interval of 60 seconds
        weatherInterval = Math.max(weatherInterval, 60);

        // Convert to milliseconds
        const weatherIntervalMs = weatherInterval * 1000;

        this.logger.debug(`Setting weather update interval to ${weatherInterval} seconds`);

        // Update weather data at the configured interval
        this.updateTimer = window.setInterval(() => {
            // Use a self-executing async function to allow await
            (async () => {
                try {
                    await this.fetchWeatherDataAsync();
                } catch (error) {
                    this.logger.error('Error in weather update interval:', error);
                }
            })();
        }, weatherIntervalMs);
    }

    /**
     * Fetch weather data from the configured provider
     */
    async fetchWeatherDataAsync(): Promise<void> {
        if (this._weatherLoading || !this.config.showWeather) return;

        this.logger.debug(`Begin fetch weather data`);

        this._weatherLoading = true;
        this._weatherError = false;
        this._weatherErrorMessage = '';

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
                    this.logger.debug(`Using weather units: ${weatherConfig.units}`);
                }
            }

            // Fetch weather data from the provider
            this._weatherData = await provider.fetchWeatherAsync(weatherConfig);
            if(this._weatherData) {
                if (this._weatherSignalProvider) {
                    this._weatherSignalProvider.updateWeatherSignal(this._weatherData.current?.conditionUnified ?? Weather.All);
                } else {
                    updateWeatherSignal(this._weatherData.current?.conditionUnified ?? Weather.All);
                }
            }

            this.logger.info(`Fetched weather data from ${provider.name}:`, this._weatherData);
        } catch (error) {
            this._weatherError = true;
            this._weatherErrorMessage = error instanceof Error ? error.message : String(error);
            this.logger.error('Error fetching weather data:', error);
        } finally {
            this._weatherLoading = false;
            // Request an update from the host
            this.host.requestUpdate();
        }
    }

    // Getter methods for weather data
    get weatherData(): WeatherData | undefined {
        return this._weatherData;
    }

    get isLoading(): boolean {
        return this._weatherLoading;
    }

    get hasError(): boolean {
        return this._weatherError;
    }

    get errorMessage(): string {
        return this._weatherErrorMessage;
    }

    /**
     * Get the weather signal provider
     */
    get weatherSignalProvider(): WeatherSignalProvider | undefined {
        return this._weatherSignalProvider;
    }
}

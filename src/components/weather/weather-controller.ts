import {ReactiveControllerHost} from 'lit';
import {getWeatherProvider, WeatherData, WeatherProvider, WeatherProviderConfig} from '../../weather-providers';
import {BaseController, ForceUpdateWeatherMessage, Messenger, WeatherMessage} from '../../utils';
import {Weather} from "../../image-sources";
import {HomeAssistant} from 'custom-card-helpers';

export interface WeatherControllerConfig {
    showWeather?: boolean;
    weatherProvider?: string;
    weatherConfig?: WeatherProviderConfig;
    weatherDisplayMode?: 'current' | 'forecast' | 'both';
    weatherForecastDays?: number;
    weatherTitle?: string;
    weatherUpdateInterval?: number;
    weatherIconSet?: string;
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
    private _messenger = Messenger.getInstance();
    private _hass?: HomeAssistant;
    private _forceUpdateWeatherHandler = (_message: ForceUpdateWeatherMessage) => this.fetchWeatherDataAsync();

    // Push-update state: last seen entity state object (reference compare)
    // and the active weather/subscribe_forecast subscription.
    private _lastEntityState?: unknown;
    private _forecastUnsubscribe?: () => void;
    private _subscribedEntityId?: string;

    // Configuration
    private config: WeatherControllerConfig = {};

    constructor(host: ReactiveControllerHost, config: WeatherControllerConfig = {}) {
        super(host, 'weather-controller');
        this.config = config;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {

        // Watch the signal if provider is available
        this._messenger.subscribe(ForceUpdateWeatherMessage, this._forceUpdateWeatherHandler);

        // Fetch weather data immediately if enabled
        if (this.config.showWeather) {
            // Set up interval to update weather data
            this.setupUpdateInterval();

            this.fetchWeatherDataAsync();
        }
    }

    protected onHostDisconnected(): void {
        // Unsubscribe from the message using our stored handler
        this._messenger.unsubscribe(ForceUpdateWeatherMessage, this._forceUpdateWeatherHandler);

        // Clear interval when disconnected
        if (this.updateTimer) {
            window.clearInterval(this.updateTimer);
            this.updateTimer = undefined;
        }

        this.teardownForecastSubscription();
    }

    private teardownForecastSubscription(): void {
        if (this._forecastUnsubscribe) {
            try {
                this._forecastUnsubscribe();
            } catch (e) {
                this.logger.debug('Error unsubscribing from forecast updates:', e);
            }
            this._forecastUnsubscribe = undefined;
            this._subscribedEntityId = undefined;
        }
    }

    /**
     * Update the configuration
     */
    async updateConfigAsync(config: WeatherControllerConfig, hass?: HomeAssistant): Promise<void> {
        this.logger.debug('Updating WeatherController config:', config);

        const previousHass = this._hass;
        this._hass = hass;
        const previousShowWeather = this.config.showWeather;
        const previousProvider = this.config.weatherProvider;
        const previousUpdateInterval = this.config.weatherUpdateInterval;

        this.config = { ...this.config, ...config };

        // If update interval changed, reset the interval
        if (previousUpdateInterval !== this.config.weatherUpdateInterval) {
            this.setupUpdateInterval();
        }

        // Fetch data if:
        // 1. Weather was just enabled
        // 2. Hass just became available and we have no data yet
        // 3. Provider changed
        const shouldFetch = (this.config.showWeather && (
            (!previousShowWeather && this.config.showWeather) ||
            (!previousHass && this._hass && !this._weatherData) ||
            (previousProvider !== this.config.weatherProvider)
        ));

        if (shouldFetch) {
            await this.fetchWeatherDataAsync();
        }
        else if(!this.config.showWeather) {
            Messenger.getInstance().publish(new WeatherMessage(Weather.All));
        }
        else {
            // React to entity state changes pushed through hass instead of
            // waiting for the next polling tick.
            this.refreshCurrentFromEntity();
        }

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Refresh current conditions from the weather entity when its state
     * object changed (hass pushes a new state object on every update).
     * Cheap: reads attributes only, no service call — the forecast is kept
     * fresh by the weather/subscribe_forecast subscription.
     */
    private refreshCurrentFromEntity(): void {
        if (!this._hass || !this._weatherData) {
            return;
        }

        const providerId = this.config.weatherProvider || 'openweathermap';
        const provider = getWeatherProvider(providerId);
        if (!provider?.getCurrentWeather) {
            return;
        }

        const weatherConfig = this.buildProviderConfig(provider);
        const entityId = weatherConfig.entityId;
        if (!entityId) {
            return;
        }

        const state = this._hass.states[entityId];
        if (!state || state === this._lastEntityState) {
            return;
        }
        this._lastEntityState = state;

        provider.setHass?.(this._hass);
        const current = provider.getCurrentWeather(weatherConfig);
        if (current) {
            this.logger.debug(`Weather entity ${entityId} changed, refreshing current conditions`);
            this._weatherData = { ...this._weatherData, current };
            this._messenger.publish(new WeatherMessage(current.conditionUnified ?? Weather.All));
        }
    }

    /**
     * Subscribe to pushed forecast updates when the provider supports it.
     * Safe to call repeatedly; re-subscribes only when the entity changes.
     */
    private async setupForecastSubscriptionAsync(provider: WeatherProvider, weatherConfig: WeatherProviderConfig): Promise<void> {
        if (!provider.subscribeForecastAsync) {
            // Provider switched to one without push support — drop any stale subscription
            this.teardownForecastSubscription();
            return;
        }

        const entityId = weatherConfig.entityId as string | undefined;
        if (!entityId || entityId === this._subscribedEntityId) {
            return;
        }

        this.teardownForecastSubscription();

        const unsubscribe = await provider.subscribeForecastAsync(weatherConfig, (daily) => {
            if (this._weatherData) {
                this.logger.debug(`Received pushed forecast update (${daily.length} days)`);
                this._weatherData = { ...this._weatherData, daily };
                this.host.requestUpdate();
            }
        });

        if (unsubscribe) {
            this._forecastUnsubscribe = unsubscribe;
            this._subscribedEntityId = entityId;
        }
    }

    /**
     * Build the effective provider config from defaults and card config
     */
    private buildProviderConfig(provider: WeatherProvider): WeatherProviderConfig {
        let weatherConfig = provider.getDefaultConfig();

        if (this.config.weatherConfig) {
            // Create a new object to avoid reference issues
            weatherConfig = {...weatherConfig, ...this.config.weatherConfig};

            // Ensure units is properly set if specified
            if (this.config.weatherConfig.units) {
                weatherConfig.units = this.config.weatherConfig.units;
            }
        }

        // Set icon set if specified in the main config
        if (this.config.weatherIconSet) {
            weatherConfig.iconSet = this.config.weatherIconSet;
        } else if (this.config.weatherConfig?.iconSet) {
            weatherConfig.iconSet = this.config.weatherConfig.iconSet;
        }

        return weatherConfig;
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
        if (this._weatherLoading || !this.config.showWeather)  {
            return;
        }

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

            // Set hass on provider if supported
            if (provider.setHass) {
                if (this._hass) {
                    provider.setHass(this._hass);
                } else if (provider.id === 'homeassistant') {
                    this.logger.debug('Home Assistant instance not available yet for HA weather provider, skipping fetch');
                    return;
                }
            }

            // Get the weather config from the card config and ensure it's properly processed
            const weatherConfig = this.buildProviderConfig(provider);

            // Fetch weather data from the provider
            this._weatherData = await provider.fetchWeatherAsync(weatherConfig);
            if(this._weatherData) {
                Messenger.getInstance().publish(new WeatherMessage(this._weatherData.current?.conditionUnified ?? Weather.All));
            }

            // Remember the entity state this data came from and switch the
            // forecast to pushed updates when the provider supports it.
            const entityId = weatherConfig.entityId as string | undefined;
            if (entityId && this._hass) {
                this._lastEntityState = this._hass.states[entityId];
            }
            await this.setupForecastSubscriptionAsync(provider, weatherConfig);

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
}

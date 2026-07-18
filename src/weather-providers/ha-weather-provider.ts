import { WeatherProvider, WeatherProviderConfig, WeatherData } from './weather-provider';
import { Weather } from '../image-sources/types';
import { HomeAssistant } from 'custom-card-helpers';
import { logger } from '../utils';

/**
 * Configuration for the Home Assistant weather provider
 */
export interface HomeAssistantWeatherConfig extends WeatherProviderConfig {
  entityId?: string;
}

/**
 * Home Assistant weather provider plugin
 * Gets weather data from a Home Assistant weather entity
 */
export class HomeAssistantWeatherProvider implements WeatherProvider {
  readonly id = 'homeassistant';
  readonly name = 'Home Assistant';
  readonly description = 'Weather data from a Home Assistant entity';

  private hass?: HomeAssistant;

  /**
   * Set the Home Assistant instance
   * @param hass The Home Assistant instance
   */
  setHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  /**
   * Fetch weather data from Home Assistant entity
   * @param config Configuration for the HA provider
   * @returns Promise that resolves to weather data
   */
  async fetchWeatherAsync(config: HomeAssistantWeatherConfig): Promise<WeatherData> {
    if (!this.hass) {
      throw new Error('Home Assistant instance not set');
    }

    const entityId = config.entityId;
    if (!entityId) {
      throw new Error('Home Assistant weather entity ID is required');
    }

    const state = this.hass.states[entityId];
    if (!state) {
      throw new Error(`Entity ${entityId} not found`);
    }

    const attributes = state.attributes as any;

    // Map HA condition to internal Weather enum
    const condition = state.state;
    const conditionUnified = this.mapWeatherCondition(condition);

    const current = {
      temperature: attributes.temperature,
      condition: this.mapConditionToKey(condition),
      conditionText: this.localizeCondition(state),
      conditionUnified: conditionUnified,
      icon: this.getIconUrl(condition, config.iconSet),
      humidity: attributes.humidity,
      windSpeed: attributes.wind_speed,
      pressure: attributes.pressure,
      feelsLike: attributes.apparent_temperature
    };

    // Process forecast data
    let daily: any[] = [];

    try {
      // Call the weather.get_forecasts service (Home Assistant 2023.12+)
      // This is the modern way to get forecasts
      const forecastResponse = await this.hass.callWS<any>({
        type: 'call_service',
        domain: 'weather',
        service: 'get_forecasts',
        service_data: {
          type: 'daily',
        },
        target: {
          entity_id: entityId,
        },
        return_response: true,
      });

      const forecastData = forecastResponse.response[entityId]?.forecast;

      if (forecastData && Array.isArray(forecastData)) {
        daily = forecastData.map((item: any) => ({
          date: new Date(item.datetime),
          temperatureMin: item.templow !== undefined ? item.templow : item.temperature,
          temperatureMax: item.temperature,
          condition: this.mapConditionToKey(item.condition),
          conditionText: this.localizeCondition(state, item.condition),
          icon: this.getIconUrl(item.condition, config.iconSet),
          precipitation: item.precipitation,
          humidity: item.humidity,
          windSpeed: item.wind_speed
        }));
      }
    } catch (error: any) {
      logger.error(`[HA Weather] Error fetching forecast for ${entityId}:`, error);
    }

    const temperatureUnit = attributes.temperature_unit
      || (this.hass.config as any)?.unit_system?.temperature;

    return { current, daily, entityId, temperatureUnit };
  }

  /**
   * Localize a weather condition through HA's own state formatting
   * (hass.formatEntityState), matching what built-in cards display.
   * Returns undefined on older HA versions so callers can fall back to the
   * card's bundled translations.
   * @param state The weather entity state object
   * @param condition Optional condition override (for forecast entries)
   */
  private localizeCondition(state: any, condition?: string): string | undefined {
    const formatEntityState = (this.hass as any)?.formatEntityState;
    if (typeof formatEntityState !== 'function') {
      return undefined;
    }
    try {
      return condition !== undefined
        ? formatEntityState.call(this.hass, state, condition)
        : formatEntityState.call(this.hass, state);
    } catch (e) {
      logger.warn('[HA Weather] formatEntityState failed:', e);
      return undefined;
    }
  }

  /**
   * Get the default configuration for the HA provider
   * @returns Default configuration
   */
  getDefaultConfig(): HomeAssistantWeatherConfig {
    return {
      entityId: ''
    };
  }

  /**
   * Map Home Assistant weather condition to translation key
   * @param condition The HA weather condition
   * @returns The translation key
   */
  private mapConditionToKey(condition: string): string {
    const lowerCondition = condition?.toLowerCase();

    switch (lowerCondition) {
      case 'sunny':
      case 'clear-night':
        return 'clear_sky';
      case 'cloudy':
        return 'overcast_clouds';
      case 'partlycloudy':
        return 'scattered_clouds';
      case 'rainy':
        return 'rain';
      case 'pouring':
        return 'heavy_intensity_rain';
      case 'lightning':
      case 'lightning-rainy':
        return 'thunderstorm';
      case 'snowy':
      case 'snowy-rainy':
        return 'snow';
      case 'fog':
        return 'mist';
      default:
        return lowerCondition;
    }
  }

  /**
   * Map Home Assistant weather condition to internal Weather enum
   * @param condition The HA weather condition
   * @returns The mapped weather condition
   */
  private mapWeatherCondition(condition: string): Weather {
    const lowerCondition = condition?.toLowerCase();

    switch (lowerCondition) {
      case 'clear-night':
      case 'sunny':
        return Weather.ClearSky;
      case 'cloudy':
      case 'partlycloudy':
        return Weather.Clouds;
      case 'rainy':
      case 'pouring':
      case 'lightning':
      case 'lightning-rainy':
        return Weather.Rain;
      case 'snowy':
      case 'snowy-rainy':
        return Weather.Snow;
      case 'fog':
      case 'hail':
        return Weather.Mist;
      default:
        return Weather.All;
    }
  }

  /**
   * Get icon for condition
   */
  private getIconUrl(condition: string, iconSet?: string): string {
    const lowerCondition = condition?.toLowerCase();

    if (iconSet === 'basmilius') {
      return this.getAnimatedIconUrl(lowerCondition);
    }

    if (iconSet === 'openweathermap') {
      return this.getOpenWeatherMapIconUrl(lowerCondition);
    }

    let symbol = 'clearsky_day'; // Default

    switch (lowerCondition) {
      case 'sunny':
        symbol = 'clearsky_day';
        break;
      case 'clear-night':
        symbol = 'clearsky_night';
        break;
      case 'cloudy':
        symbol = 'cloudy';
        break;
      case 'partlycloudy':
        symbol = 'fair_day';
        break;
      case 'rainy':
        symbol = 'rain';
        break;
      case 'pouring':
        symbol = 'heavyrain';
        break;
      case 'lightning':
      case 'lightning-rainy':
        symbol = 'rainshowersandthunder_day';
        break;
      case 'snowy':
        symbol = 'snow';
        break;
      case 'snowy-rainy':
        symbol = 'sleet';
        break;
      case 'fog':
        symbol = 'fog';
        break;
    }

    // Use jsDelivr CDN to fetch Met.no icons from their official repository
    return `https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${symbol}.svg`;
  }

  /**
   * Get OpenWeatherMap icon URL for Home Assistant condition
   */
  private getOpenWeatherMapIconUrl(condition: string): string {
    let iconCode = '01d'; // Default

    switch (condition) {
      case 'sunny':
        iconCode = '01d';
        break;
      case 'clear-night':
        iconCode = '01n';
        break;
      case 'cloudy':
        iconCode = '03d';
        break;
      case 'partlycloudy':
        iconCode = '02d';
        break;
      case 'rainy':
        iconCode = '10d';
        break;
      case 'pouring':
        iconCode = '09d';
        break;
      case 'lightning':
      case 'lightning-rainy':
        iconCode = '11d';
        break;
      case 'snowy':
        iconCode = '13d';
        break;
      case 'snowy-rainy':
        iconCode = '13d';
        break;
      case 'fog':
        iconCode = '50d';
        break;
    }

    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  /**
   * Get Bas Milius animated icon URL for Home Assistant condition
   */
  private getAnimatedIconUrl(condition: string): string {
    let symbol = 'clear-day'; // Default

    switch (condition) {
      case 'sunny':
        symbol = 'clear-day';
        break;
      case 'clear-night':
        symbol = 'clear-night';
        break;
      case 'cloudy':
        symbol = 'cloudy';
        break;
      case 'partlycloudy':
        symbol = 'partly-cloudy-day';
        break;
      case 'rainy':
        symbol = 'rain';
        break;
      case 'pouring':
        symbol = 'extreme-rain';
        break;
      case 'lightning':
      case 'lightning-rainy':
        symbol = 'thunderstorms-rain';
        break;
      case 'snowy':
        symbol = 'snow';
        break;
      case 'snowy-rainy':
        symbol = 'sleet';
        break;
      case 'fog':
        symbol = 'fog';
        break;
      case 'hail':
        symbol = 'hail';
        break;
      case 'windy':
        symbol = 'wind';
        break;
    }

    return `https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${symbol}.svg`;
  }
}

export const homeAssistantWeatherProvider = new HomeAssistantWeatherProvider();

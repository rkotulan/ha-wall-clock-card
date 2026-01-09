import { WeatherProvider, WeatherProviderConfig, WeatherData } from './weather-provider';
import { Weather } from '../image-sources/types';
import { logger } from '../utils';

/**
 * Configuration for the OpenWeatherMap weather provider
 */
export interface OpenWeatherMapConfig extends WeatherProviderConfig {
  // OpenWeatherMap specific configuration
  apiKey: string; // Required for OpenWeatherMap
}

/**
 * OpenWeatherMap weather provider plugin
 * Fetches weather data from OpenWeatherMap API (https://openweathermap.org/api)
 */
export class OpenWeatherMapProvider implements WeatherProvider {
  readonly id = 'openweathermap';
  readonly name = 'OpenWeatherMap';
  readonly description = 'Weather forecasts from OpenWeatherMap API';

  /**
   * Fetch weather data from OpenWeatherMap
   * @param config Configuration for the OpenWeatherMap provider
   * @returns Promise that resolves to weather data
   */
  async fetchWeatherAsync(config: OpenWeatherMapConfig): Promise<WeatherData> {
    if (!config.apiKey) {
      throw new Error('OpenWeatherMap API key is required');
    }

    const latitude = config.latitude || 50.0755; // Default to Prague, Czech Republic
    const longitude = config.longitude || 14.4378;
    const units = config.units || 'metric';
    const language = config.language || 'en'; // Default to English language

    try {
      // Fetch data from OpenWeatherMap Forecast API (5 day / 3 hour forecast)
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${config.apiKey}`;

      logger.debug("[OpenWeatherMap] " + url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`OpenWeatherMap API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Check if we have forecast data
      if (!data.list || !data.list.length) {
        throw new Error('No forecast data available');
      }

      // Process current weather data from the first forecast item
      const firstForecast = data.list[0];
      const weatherCondition = firstForecast.weather[0].description;
      const current = {
        temperature: firstForecast.main.temp,
        condition: weatherCondition,
        conditionUnified: this.mapWeatherCondition(weatherCondition),
        icon: this.getIconUrl(firstForecast.weather[0].icon, config.iconSet),
        humidity: firstForecast.main.humidity,
        windSpeed: firstForecast.wind.speed,
        windDirection: this.getWindDirection(firstForecast.wind.deg),
        pressure: firstForecast.main.pressure,
        feelsLike: firstForecast.main.feels_like
      };

      // Group forecast items by day
      const dailyForecasts = new Map<string, any[]>();

      data.list.forEach((item: any) => {
        // Convert timestamp to date
        const date = new Date(item.dt * 1000);
        // Get date string (YYYY-MM-DD) to group by day
        const dateString = date.toISOString().split('T')[0];

        if (!dailyForecasts.has(dateString)) {
          dailyForecasts.set(dateString, []);
        }

        dailyForecasts.get(dateString)?.push(item);
      });

      // Process daily forecast data
      const daily = Array.from(dailyForecasts.entries()).map(([dateString, items]) => {
        // Find min and max temperatures for the day
        const temps = items.map(item => item.main.temp);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);

        // Use the middle of the day forecast for conditions if available, otherwise use the first one
        const midDayIndex = Math.floor(items.length / 2);
        const representativeItem = items[midDayIndex] || items[0];

        // Calculate average precipitation probability if available
        const precipProbabilities = items
          .filter(item => item.pop !== undefined)
          .map(item => item.pop);
        const avgPrecipitation = precipProbabilities.length > 0
          ? precipProbabilities.reduce((sum, prob) => sum + prob, 0) / precipProbabilities.length * 100
          : 0;

        return {
          date: new Date(dateString),
          temperatureMin: minTemp,
          temperatureMax: maxTemp,
          condition: representativeItem.weather[0].description,
          icon: this.getIconUrl(representativeItem.weather[0].icon, config.iconSet),
          precipitation: avgPrecipitation,
          humidity: representativeItem.main.humidity,
          windSpeed: representativeItem.wind.speed
        };
      });

      return { current, daily };
    } catch (error) {
      logger.error('Error fetching weather data from OpenWeatherMap:', error);
      throw error;
    }
  }

  /**
   * Get the default configuration for the OpenWeatherMap provider
   * @returns Default configuration
   */
  getDefaultConfig(): OpenWeatherMapConfig {
    return {
      apiKey: '',
      latitude: 50.0755, // Prague, Czech Republic
      longitude: 14.4378,
      units: 'metric',
      language: 'en'
    };
  }

  /**
   * Get the URL for a weather icon
   * @param iconCode OpenWeatherMap icon code
   * @param iconSet The icon set to use
   * @returns URL to the icon image
   */
  private getIconUrl(iconCode: string, iconSet?: string): string {
    if (iconSet === 'basmilius') {
      return this.getAnimatedIconUrl(iconCode);
    }
    if (iconSet === 'metno') {
      return this.getMetNoIconUrl(iconCode);
    }
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  /**
   * Get Bas Milius animated icon URL for OpenWeatherMap icon code
   */
  private getAnimatedIconUrl(iconCode: string): string {
    let symbol = 'clear-day';
    // Map OWM icon codes to Bas Milius symbols
    switch (iconCode) {
      case '01d':
        symbol = 'clear-day';
        break;
      case '01n':
        symbol = 'clear-night';
        break;
      case '02d':
        symbol = 'partly-cloudy-day';
        break;
      case '02n':
        symbol = 'partly-cloudy-night';
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        symbol = 'cloudy';
        break;
      case '09d':
      case '09n':
        symbol = 'rain';
        break;
      case '10d':
        symbol = 'partly-cloudy-day-rain';
        break;
      case '10n':
        symbol = 'partly-cloudy-night-rain';
        break;
      case '11d':
      case '11n':
        symbol = 'thunderstorms';
        break;
      case '13d':
      case '13n':
        symbol = 'snow';
        break;
      case '50d':
      case '50n':
        symbol = 'fog';
        break;
    }
    return `https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/${symbol}.svg`;
  }

  /**
   * Get Met.no icon URL for OpenWeatherMap icon code
   */
  private getMetNoIconUrl(iconCode: string): string {
    let symbol = 'clearsky_day';
    // Map OWM icon codes to Met.no symbols
    switch (iconCode) {
      case '01d':
        symbol = 'clearsky_day';
        break;
      case '01n':
        symbol = 'clearsky_night';
        break;
      case '02d':
        symbol = 'fair_day';
        break;
      case '02n':
        symbol = 'fair_night';
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        symbol = 'cloudy';
        break;
      case '09d':
      case '09n':
        symbol = 'heavyrain';
        break;
      case '10d':
      case '10n':
        symbol = 'rain';
        break;
      case '11d':
      case '11n':
        symbol = 'rainshowersandthunder_day';
        break;
      case '13d':
      case '13n':
        symbol = 'snow';
        break;
      case '50d':
      case '50n':
        symbol = 'fog';
        break;
    }
    return `https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${symbol}.svg`;
  }

  /**
   * Convert wind direction in degrees to cardinal direction
   * @param degrees Wind direction in degrees
   * @returns Cardinal direction (N, NE, E, etc.)
   */
  private getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  /**
   * Map legacy weather condition to the new Weather enum
   * @param condition The weather condition to map
   * @returns The mapped weather condition
   */
  public mapWeatherCondition(condition: string): Weather {
    // Log the input condition for debugging
    logger.debug(`[OpenWeatherMap] Mapping weather condition: ${condition}`);

    // Convert to lowercase for case-insensitive comparison
    const lowerCondition = condition.toLowerCase();

    // Map legacy conditions to new ones
    let result: Weather;
    switch (lowerCondition) {
      case 'clear':
        result = Weather.ClearSky;
        break;
      // Map all cloud conditions to 'clouds'
      case 'few clouds':
      case 'scattered clouds':
      case 'overcast clouds':
      case 'broken clouds':
        result = Weather.Clouds;
        break;
      case 'clouds':
        result = Weather.Clouds; // Now maps directly to 'clouds'
        break;
      case 'fog':
      case 'haze':
      case 'dust':
      case 'smoke':
        result = Weather.Mist; // Map all these to mist
        break;
      // Map all rain-related conditions to 'rain'
      case 'drizzle':
      case 'shower rain':
      case 'thunderstorm':
      case 'light rain':
        result = Weather.Rain;
        break;
      case 'tornado':
      case 'windy':
        result = Weather.All; // No direct mapping, use 'all'
        break;
      case 'snow':
      case 'light snow':
        result = Weather.Snow;
        break;
      case 'mist':
        result = Weather.Mist;
        break;
      case 'clear sky':
        result = Weather.ClearSky;
        break;
      case 'rain':
        result = Weather.Rain;
        break;
      case 'all':
        result = Weather.All;
        break;
      default:
        result = Weather.All; // Default to 'all' for unknown conditions
        break;
    }

    // Log the mapped weather condition for debugging
    logger.debug(`[OpenWeatherMap] Mapped to Weather enum: ${result}`);

    return result;
  }
}

// Export a singleton instance of the OpenWeatherMap provider
export const openWeatherMapProvider = new OpenWeatherMapProvider();

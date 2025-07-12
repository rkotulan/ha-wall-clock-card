import { WeatherProvider, WeatherProviderConfig, WeatherData } from './weather-provider';
import { Weather } from '../image-sources/image-source';

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
    const language = config.language || 'cs'; // Default to Czech language

    try {
      // Fetch data from OpenWeatherMap Forecast API (5 day / 3 hour forecast)
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${config.apiKey}`;

      console.log("[OpenWeatherMap] " + url);

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
        icon: this.getIconUrl(firstForecast.weather[0].icon),
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
          icon: this.getIconUrl(representativeItem.weather[0].icon),
          precipitation: avgPrecipitation,
          humidity: representativeItem.main.humidity,
          windSpeed: representativeItem.wind.speed
        };
      });

      return { current, daily };
    } catch (error) {
      console.error('Error fetching weather data from OpenWeatherMap:', error);
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
      language: 'cs'
    };
  }

  /**
   * Get the URL for a weather icon
   * @param iconCode OpenWeatherMap icon code
   * @returns URL to the icon image
   */
  private getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
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
    // Convert to lowercase for case-insensitive comparison
    const lowerCondition = condition.toLowerCase();

    // Map legacy conditions to new ones
    switch (lowerCondition) {
      case 'clear':
        return Weather.ClearSky;
      // Map all cloud conditions to 'clouds'
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return Weather.Clouds;
      case 'clouds':
        return Weather.Clouds; // Now maps directly to 'clouds'
      case 'fog':
      case 'haze':
      case 'dust':
      case 'smoke':
        return Weather.Mist; // Map all these to mist
      // Map all rain-related conditions to 'rain'
      case 'drizzle':
      case 'shower rain':
      case 'thunderstorm':
      case 'light rain':
        return Weather.Rain;
      case 'tornado':
      case 'windy':
        return Weather.All; // No direct mapping, use 'all'
      case 'snow':
        return Weather.Snow;
      case 'mist':
        return Weather.Mist;
      case 'clear sky':
        return Weather.ClearSky;
      case 'rain':
        return Weather.Rain;
      case 'all':
        return Weather.All;
      default:
        return Weather.All; // Default to 'all' for unknown conditions
    }
  }
}

// Export a singleton instance of the OpenWeatherMap provider
export const openWeatherMapProvider = new OpenWeatherMapProvider();

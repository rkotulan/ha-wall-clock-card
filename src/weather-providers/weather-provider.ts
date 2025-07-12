import { Weather } from '../image-sources/image-source';

/**
 * Interface for weather provider plugins
 * All weather provider plugins must implement this interface
 */
export interface WeatherProviderConfig {
  // Common configuration properties for all weather providers
  apiKey?: string;
  latitude?: number;
  longitude?: number;
  units?: 'metric' | 'imperial';
  language?: string;
  [key: string]: any; // Allow additional provider-specific properties
}

export interface WeatherData {
  // Current weather data
  current: {
    temperature: number;
    condition: string;
    conditionUnified?: Weather;
    icon: string;
    humidity?: number;
    windSpeed?: number;
    windDirection?: string;
    pressure?: number;
    feelsLike?: number;
    uvIndex?: number;
  };
  // Daily forecast data
  daily: Array<{
    date: Date;
    temperatureMin: number;
    temperatureMax: number;
    condition: string;
    icon: string;
    precipitation?: number;
    humidity?: number;
    windSpeed?: number;
  }>;
}

export interface WeatherProvider {
  /**
   * The unique identifier for this weather provider
   */
  readonly id: string;

  /**
   * The display name of this weather provider
   */
  readonly name: string;

  /**
   * Description of this weather provider
   */
  readonly description: string;

  /**
   * Fetch weather data from this provider
   * @param config Configuration for this weather provider
   * @returns Promise that resolves to weather data
   */
  fetchWeatherAsync(config: WeatherProviderConfig): Promise<WeatherData>;

  /**
   * Get the default configuration for this weather provider
   * @returns Default configuration
   */
  getDefaultConfig(): WeatherProviderConfig;
}

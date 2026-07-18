/**
 * Types and interfaces for weather providers
 */

import { Weather } from '../image-sources/types';
import { HomeAssistant } from 'custom-card-helpers';

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
  iconSet?: string;
  [key: string]: any; // Allow additional provider-specific properties
}

/**
 * Interface for weather data
 */
export interface WeatherData {
  // Current weather data
  current: {
    temperature: number;
    condition: string;
    /** Already-localized condition text (e.g. from hass.formatEntityState); falls back to the card's own translation of `condition` */
    conditionText?: string;
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
    /** Already-localized condition text; see current.conditionText */
    conditionText?: string;
    icon: string;
    precipitation?: number;
    humidity?: number;
    windSpeed?: number;
  }>;
  /** Temperature unit label, e.g. °C / °F (from the entity or hass.config.unit_system) */
  temperatureUnit?: string;
  entityId?: string;
}

/**
 * Interface for weather provider
 */
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

  /**
   * Set the Home Assistant instance
   * @param hass The Home Assistant instance
   */
  setHass?(hass: HomeAssistant): void;
}
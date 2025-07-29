/**
 * Types and interfaces for image sources
 */

/**
 * Time of day enumeration
 */
export enum TimeOfDay {
  Unspecified = "unspecified",
  SunriseSunset = "sunrise-sunset",
  Day = "day",
  Night = "night"
}

/**
 * Weather condition enumeration
 */
export enum Weather {
  All = "all",
  ClearSky = "clear sky",
  Clouds = "clouds",
  Rain = "rain",
  Snow = "snow",
  Mist = "mist"
}

/**
 * Valid weather conditions
 */
export const ValidWeather = [
  Weather.All,
  Weather.ClearSky,
  Weather.Clouds,
  Weather.Rain,
  Weather.Snow,
  Weather.Mist
];

/**
 * Valid time of day values
 */
export const ValidTimeOfDay = [
  TimeOfDay.Unspecified,
  TimeOfDay.SunriseSunset,
  TimeOfDay.Day,
  TimeOfDay.Night
];

/**
 * Background image interface
 */
export interface BackgroundImage {
  // URL of the image
  url: string;
  // Weather condition, or Weather.All for all weather conditions
  weather: Weather;
  // Time of day, or "unspecified" for all times of day
  timeOfDay: TimeOfDay;
}

/**
 * Interface for image source plugins
 * All image source plugins must implement this interface
 */
export interface ImageSourceConfig {
  // Common configuration properties for all image sources

  // Category for images (e.g., 'nature,water')
  category?: string;

  // Number of images to fetch (used by sources that support multiple images)
  count?: number;

  // Array of background images with weather and time-of-day information
  backgroundImages?: BackgroundImage[];

  // Allow additional source-specific properties
  [key: string]: any;
}

/**
 * Interface for image source
 */
export interface ImageSource {
  /**
   * The unique identifier for this image source
   */
  readonly id: string;

  /**
   * The display name of this image source
   */
  readonly name: string;

  /**
   * Description of this image source
   */
  readonly description: string;

  /**
   * Fetch images from this source
   * @param config Configuration for this image source
   * @param weather Optional weather data to use for selecting images
   * @param timeOfDay Optional time of day to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  fetchImagesAsync(config: ImageSourceConfig,  weather: Weather, timeOfDay: TimeOfDay): Promise<string[]>;

  /**
   * Get the next image URL from this source
   * @param config Configuration for this image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an image URL
   */
  getNextImageUrlAsync(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string>;

  /**
   * Get the default configuration for this image source
   * @returns Default configuration
   */
  getDefaultConfig(): ImageSourceConfig;
}
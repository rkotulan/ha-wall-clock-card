import { WeatherData } from '../weather-providers';

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
 * Valid weather conditions
 */
export const ValidWeather = [
  'all',
  'clear sky',
  'clouds',
  'rain',
  'snow',
  'mist',
  'thunderstorm',
  'drizzle',
  'fog'
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
 * Find an attribute in a path
 * @param path The path to search in
 * @param validValues Array of valid values to look for
 * @returns The found attribute, or undefined if not found
 */
export function FindAttributeInPath(path: string, validValues: string[]): string | undefined {
  if (!path) return undefined;

  // Convert path to lowercase for case-insensitive comparison
  const lowerPath = path.toLowerCase();

  // Look for each valid value in the path
  for (const value of validValues) {
    if (lowerPath.includes(value.toLowerCase())) {
      return value;
    }
  }

  return undefined;
}

/**
 * Background image interface
 */
export interface BackgroundImage {
  // URL of the image
  url: string;
  // Weather condition, or "all" for all weather conditions
  weather: string;
  // Time of day, or "unspecified" for all times of day
  timeOfDay: TimeOfDay;
}

/**
 * Interface for image source plugins
 * All image source plugins must implement this interface
 */
export interface ImageSourceConfig {
  // Common configuration properties for all image sources
  category?: string;
  [key: string]: any; // Allow additional source-specific properties
}

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
   * @param weatherData Optional weather data to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  fetchImages(config: ImageSourceConfig, weatherData?: WeatherData): Promise<string[]>;

  /**
   * Get the default configuration for this image source
   * @returns Default configuration
   */
  getDefaultConfig(): ImageSourceConfig;
}

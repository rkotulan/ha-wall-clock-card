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
 * Get the current time of day based on the current hour
 * @returns The current time of day
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
    return TimeOfDay.SunriseSunset;
  } else if (hour >= 9 && hour < 17) {
    return TimeOfDay.Day;
  } else if (hour >= 21 || hour < 5) {
    return TimeOfDay.Night;
  }

  return TimeOfDay.Unspecified;
}

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
    if (lowerPath.includes(value.toLowerCase().replace(' ', '-'))) {
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

import { ImageSource, ImageSourceConfig, BackgroundImage, TimeOfDay, FindAttributeInPath, ValidWeather, ValidTimeOfDay } from './image-source';
import { WeatherData } from '../weather-providers';

/**
 * Configuration for the Sensor image source
 */
export interface SensorSourceConfig extends ImageSourceConfig {
  // Entity ID of the sensor that provides the image list
  entity?: string;

  // Array of background images with weather and time-of-day information
  // This is used to map the sensor's files to weather conditions and time of day
  backgroundImages?: BackgroundImage[];
}

/**
 * Sensor image source plugin
 * Uses images from a Home Assistant sensor with a "files" attribute
 */
export class SensorSource implements ImageSource {
  readonly id = 'sensor';
  readonly name = 'Sensor Images';
  readonly description = 'Images from a Home Assistant sensor with a "files" attribute';

  // Cache for the last fetched images
  private lastFetchTime: number = 0;
  private cachedImages: string[] = [];
  private readonly refreshInterval = 10 * 60 * 1000; // 10 minutes in milliseconds

  /**
   * Fetch images from the sensor
   * @param config Configuration for the Sensor image source
   * @param weatherData Optional weather data to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: SensorSourceConfig, weatherData?: WeatherData): Promise<string[]> {
    // Get the current time
    const now = Date.now();

    // If we have cached images and it's been less than the refresh interval, use the cached images
    if (this.cachedImages.length > 0 && (now - this.lastFetchTime) < this.refreshInterval) {
      console.log(`[sensor-source] Using cached images (${this.cachedImages.length} images)`);
      return this.filterImagesByWeatherAndTime(this.cachedImages, weatherData);
    }

    // Get the entity ID from the configuration
    const entityId = config.entity;

    // If no entity ID is provided, return an empty array
    if (!entityId) {
      console.warn('[sensor-source] No entity ID provided for Sensor image source');
      return [];
    }

    try {
      // Get the Home Assistant instance
      const hass = (window as any).document.querySelector('home-assistant').hass;

      // If we can't get the Home Assistant instance, return an empty array
      if (!hass) {
        console.warn('[sensor-source] Could not get Home Assistant instance');
        return [];
      }

      // Get the sensor state
      const state = hass.states[entityId];

      // If the sensor doesn't exist, return an empty array
      if (!state) {
        console.warn(`[sensor-source] Sensor ${entityId} not found`);
        return [];
      }

      // Get the files attribute
      const files = state.attributes.files;

      // If the files attribute doesn't exist or is not an array, return an empty array
      if (!files || !Array.isArray(files)) {
        console.warn(`[sensor-source] Sensor ${entityId} does not have a valid files attribute`);
        return [];
      }

      // Update the cache
      this.cachedImages = files;
      this.lastFetchTime = now;

      console.log(`[sensor-source] Fetched ${files.length} images from sensor ${entityId}`);

      // Filter the images by weather and time of day
      return this.filterImagesByWeatherAndTime(files, weatherData);
    } catch (error) {
      console.error('[sensor-source] Error fetching images from sensor:', error);
      return [];
    }
  }

  /**
   * Filter images by weather condition and time of day
   * @param images Array of image URLs
   * @param weatherData Optional weather data to use for selecting images
   * @returns Filtered array of image URLs
   */
  private filterImagesByWeatherAndTime(images: string[], weatherData?: WeatherData): string[] {
    // If we have no images, return an empty array
    if (images.length === 0) {
      return [];
    }

    // Get the current time of day
    const currentTimeOfDay = this.getCurrentTimeOfDay();
    console.log(`[sensor-source] Current time of day: ${currentTimeOfDay}`);

    // If we have weather data, filter by weather condition and time of day
    if (weatherData && weatherData.current) {
      const currentCondition = this.mapWeatherCondition(weatherData.current.condition.toLowerCase());
      console.log(`[sensor-source] Current weather condition: ${currentCondition}`);

      // Create an array to store the filtered images
      let filteredImages: string[] = [];

      // First try to find images that match both weather and time of day
      filteredImages = images.filter(url => {
        const weather = FindAttributeInPath(url, ValidWeather);
        const timeOfDay = FindAttributeInPath(url, ValidTimeOfDay);

        return (weather === currentCondition || weather === 'all' || !weather) &&
               (timeOfDay === currentTimeOfDay || !timeOfDay);
      });

      // If we found matching images, return them
      if (filteredImages.length > 0) {
        console.log(`[sensor-source] Found ${filteredImages.length} images matching current conditions`);
        return filteredImages;
      }
    }

    // If no weather data or no matches, return all images
    console.log(`[sensor-source] No matching images found, returning all images`);
    return images;
  }

  /**
   * Get the current time of day based on the current hour
   * @returns The current time of day
   */
  private getCurrentTimeOfDay(): TimeOfDay {
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
   * Map legacy weather condition to the new OpenWeatherMap-based condition
   * @param condition The weather condition to map
   * @returns The mapped weather condition
   */
  private mapWeatherCondition(condition: string): string {
    // Convert to lowercase for case-insensitive comparison
    const lowerCondition = condition.toLowerCase();

    // Map legacy conditions to new ones
    switch (lowerCondition) {
      case 'clear':
        return 'clear sky';
      // Map all cloud conditions to 'clouds'
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return 'clouds';
      case 'clouds':
        return 'clouds'; // Now maps directly to 'clouds'
      case 'fog':
      case 'haze':
      case 'dust':
      case 'smoke':
        return 'mist'; // Map all these to mist
      // Map all rain-related conditions to 'rain'
      case 'drizzle':
      case 'shower rain':
      case 'thunderstorm':
      case 'light rain':
        return 'rain';
      case 'tornado':
      case 'windy':
        return 'all'; // No direct mapping, use 'all'
      default:
        return lowerCondition; // Keep as is for 'rain', 'snow', 'mist', 'all'
    }
  }

  /**
   * Get the default configuration for the Sensor image source
   * @returns Default configuration
   */
  getDefaultConfig(): SensorSourceConfig {
    return {
      entity: '',
      backgroundImages: []
    };
  }
}

// Export a singleton instance of the Sensor image source
export const sensorSource = new SensorSource();

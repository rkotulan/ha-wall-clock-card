import { ImageSource, ImageSourceConfig, BackgroundImage, TimeOfDay } from './image-source';
import { WeatherData } from '../weather-providers';

/**
 * Configuration for the Local image source
 */
export interface LocalSourceConfig extends ImageSourceConfig {
  // Array of background images with weather and time-of-day information
  backgroundImages?: BackgroundImage[];

  // Simple list of image URLs (used when no backgroundImages are provided)
  images?: string[];
}

/**
 * Local image source plugin
 * Uses local images specified in the configuration
 */
export class LocalSource implements ImageSource {
  readonly id = 'local';
  readonly name = 'Local Images';
  readonly description = 'Images from local paths or URLs specified in the configuration';

  /**
   * Fetch images from the local configuration
   * @param config Configuration for the Local image source
   * @param weatherData Optional weather data to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: LocalSourceConfig, weatherData?: WeatherData): Promise<string[]> {
    // Get the current time of day
    const currentTimeOfDay = this.getCurrentTimeOfDay();
    console.log(`Current time of day: ${currentTimeOfDay}`);

    // If we have the new backgroundImages structure, use it
    if (config.backgroundImages && config.backgroundImages.length > 0) {
      console.log(`Using new backgroundImages structure with ${config.backgroundImages.length} images`);

      let filteredImages: BackgroundImage[] = [];

      // If we have weather data, filter by weather condition
      if (weatherData) {
        const currentCondition = weatherData.current.condition.toLowerCase();
        console.log(`Current weather condition: ${currentCondition}`);

        // First try to find images that match both weather and time of day
        filteredImages = config.backgroundImages.filter(img => {
          // Map both the image weather condition and the current condition for comparison
          const mappedImageWeather = this.mapWeatherCondition(img.weather);
          return (mappedImageWeather === currentCondition || img.weather === 'all') && 
                 img.timeOfDay === currentTimeOfDay;
        });

        // If no matches, try images that match weather but have unspecified time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => {
            // Map both the image weather condition and the current condition for comparison
            const mappedImageWeather = this.mapWeatherCondition(img.weather);
            return (mappedImageWeather === currentCondition || img.weather === 'all') && 
                   img.timeOfDay === TimeOfDay.Unspecified;
          });
        }

        // If still no matches, try images with 'all' weather that match time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => 
            img.weather === 'all' && 
            img.timeOfDay === currentTimeOfDay
          );
        }

        // If still no matches, try images with 'all' weather and unspecified time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => 
            img.weather === 'all' && 
            img.timeOfDay === TimeOfDay.Unspecified
          );
        }
      } else {
        // No weather data, filter by time of day only
        filteredImages = config.backgroundImages.filter(img => 
          img.timeOfDay === currentTimeOfDay || img.timeOfDay === TimeOfDay.Unspecified
        );
      }

      // If we found matching images, return their URLs
      if (filteredImages.length > 0) {
        console.log(`Found ${filteredImages.length} images matching current conditions`);
        return filteredImages.map(img => img.url);
      }

      // If no matches at all, return all images
      console.log(`No matching images found, returning all images`);
      return config.backgroundImages.map(img => img.url);
    }

    // No matching images found, fall back to default images
    console.log(`No matching images found, falling back to default images`);

    // Get the default images from the configuration
    const images = config.images || [];

    // Log the number of images found
    console.log(`Found ${images.length} local images`);

    // Return the images
    return images;
  }

  /**
   * Get the current time of day based on the current hour
   * @returns The current time of day
   */
  private getCurrentTimeOfDay(): TimeOfDay {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 10) {
      return TimeOfDay.Morning;
    } else if (hour >= 10 && hour < 14) {
      return TimeOfDay.Noon;
    } else if (hour >= 14 && hour < 18) {
      return TimeOfDay.Afternoon;
    } else if (hour >= 18 || hour < 5) {
      return TimeOfDay.Evening;
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
      case 'clouds':
        return 'broken clouds'; // Default to broken clouds, could be few or scattered
      case 'fog':
      case 'haze':
      case 'dust':
      case 'smoke':
        return 'mist'; // Map all these to mist
      case 'drizzle':
        return 'shower rain';
      case 'tornado':
      case 'windy':
        return 'all'; // No direct mapping, use 'all'
      default:
        return lowerCondition; // Keep as is for 'rain', 'snow', 'thunderstorm', 'mist', 'all'
    }
  }

  /**
   * Get the default configuration for the Local image source
   * @returns Default configuration
   */
  getDefaultConfig(): LocalSourceConfig {
    return {
      backgroundImages: [],
      images: []
    };
  }
}

// Export a singleton instance of the Local image source
export const localSource = new LocalSource();

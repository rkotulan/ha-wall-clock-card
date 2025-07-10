import { ImageSource, ImageSourceConfig, BackgroundImage, TimeOfDay, Weather, getCurrentTimeOfDay } from './image-source';
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

  // Cache for GetNextImageUrl
  private imageUrlCache: Map<string, string[]> = new Map();
  private lastWeather: Weather | null = null;
  private lastTimeOfDay: TimeOfDay | null = null;
  private currentIndex: number = 0;

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Fetch images from the local configuration
   * @param config Configuration for the Local image source
   * @param weatherData Optional weather data to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: LocalSourceConfig, weatherData?: WeatherData): Promise<string[]> {
    // Get the current time of day
    const currentTimeOfDay = this.getCurrentTimeOfDay();
    console.log(`[local-source] Current time of day: ${currentTimeOfDay}`);

    // If we have the new backgroundImages structure, use it
    if (config.backgroundImages && config.backgroundImages.length > 0) {
      console.log(`[local-source] Using new backgroundImages structure with ${config.backgroundImages.length} images`);

      let filteredImages: BackgroundImage[] = [];

      // If we have weather data, filter by weather condition
      if (weatherData && weatherData.current) {
        const currentWeather = weatherData.current.conditionUnified || Weather.All;
        console.log(`[local-source] Current weather condition: ${currentWeather}`);

        // First try to find images that match both weather and time of day
        filteredImages = config.backgroundImages.filter(img => {
          return (img.weather === currentWeather || img.weather === Weather.All) &&
                 img.timeOfDay === currentTimeOfDay;
        });

        // If no matches, try images that match weather but have unspecified time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => {
            return (img.weather === currentWeather || img.weather === Weather.All) &&
                   img.timeOfDay === TimeOfDay.Unspecified;
          });
        }

        // If still no matches, try images with 'all' weather that match time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => 
            img.weather === Weather.All && 
            img.timeOfDay === currentTimeOfDay
          );
        }

        // If still no matches, try images with 'all' weather and unspecified time of day
        if (filteredImages.length === 0) {
          filteredImages = config.backgroundImages.filter(img => 
            img.weather === Weather.All && 
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
        console.log(`[local-source] Found ${filteredImages.length} images matching current conditions`);
        return filteredImages.map(img => img.url);
      }

      // If no matches at all, return all images
      console.log(`[local-source] No matching images found, returning all images`);
      return config.backgroundImages.map(img => img.url);
    }


    // No matching images found, fall back to default images
    console.log(`[local-source] No matching images found, falling back to default images`);

    // Get the default images from the configuration
    const images = config.images || [];

    // Log the number of images found
    console.log(`[local-source] Found ${images.length} local images`);

    // Return the images
    return images;
  }

  /**
   * Get the current time of day based on the current hour
   * @returns The current time of day
   */
  private getCurrentTimeOfDay(): TimeOfDay {
    return getCurrentTimeOfDay();
  }



  /**
   * Get the next image URL from this source
   * @param config Configuration for this image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an image URL
   */
  async GetNextImageUrl(config: LocalSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    console.log(`[local-source] GetNextImageUrl called with weather: ${weather}, timeOfDay: ${timeOfDay}`);

    // Check if weather or timeOfDay has changed
    if (this.lastWeather !== weather || this.lastTimeOfDay !== timeOfDay) {
      console.log(`[local-source] Weather or timeOfDay changed, clearing cache`);
      this.imageUrlCache.clear();
      this.currentIndex = 0;
      this.lastWeather = weather;
      this.lastTimeOfDay = timeOfDay;
    }

    // Create a cache key from weather and timeOfDay
    const cacheKey = `${weather}_${timeOfDay}`;

    // Check if we have cached images for this weather and timeOfDay
    if (!this.imageUrlCache.has(cacheKey) || this.imageUrlCache.get(cacheKey)?.length === 0) {
      let filteredImages: string[] = [];

      // If we have the new backgroundImages structure, use it
      if (config.backgroundImages && config.backgroundImages.length > 0) {
        console.log(`[local-source] Using backgroundImages structure with ${config.backgroundImages.length} images`);

        // Filter by weather and timeOfDay
        const matchingImages = config.backgroundImages.filter(img => {
          return (img.weather === weather || img.weather === Weather.All) &&
                 (img.timeOfDay === timeOfDay || img.timeOfDay === TimeOfDay.Unspecified);
        });

        // If we found matching images, use them
        if (matchingImages.length > 0) {
          filteredImages = matchingImages.map(img => img.url);
          console.log(`[local-source] Found ${filteredImages.length} images matching weather: ${weather}, timeOfDay: ${timeOfDay}`);
        } else {
          // If no matches, try images with 'all' weather
          const allWeatherImages = config.backgroundImages.filter(img => 
            img.weather === Weather.All
          );

          if (allWeatherImages.length > 0) {
            filteredImages = allWeatherImages.map(img => img.url);
            console.log(`[local-source] Found ${filteredImages.length} images with 'all' weather`);
          } else {
            // If still no matches, use all images
            filteredImages = config.backgroundImages.map(img => img.url);
            console.log(`[local-source] No matching images found, using all ${filteredImages.length} images`);
          }
        }
      } else if (config.images && config.images.length > 0) {
        // Use the simple images array
        filteredImages = config.images;
        console.log(`[local-source] Using simple images array with ${filteredImages.length} images`);
      }

      // Shuffle the filtered images before caching
      this.shuffleArray(filteredImages);
      console.log(`[local-source] Shuffled ${filteredImages.length} images for random order`);

      // Cache the shuffled images
      this.imageUrlCache.set(cacheKey, filteredImages);
    }

    // Get the cached images
    const cachedImages = this.imageUrlCache.get(cacheKey) || [];

    // If no images, return empty string
    if (cachedImages.length === 0) {
      console.warn(`[local-source] No images available for weather: ${weather}, timeOfDay: ${timeOfDay}`);
      return '';
    }

    // Get the next image URL
    const imageUrl = cachedImages[this.currentIndex];

    // Increment the index for next time
    this.currentIndex = (this.currentIndex + 1) % cachedImages.length;

    // Log the parameters for which the image is returned
    console.log(`[local-source] Returning image for weather: ${weather}, timeOfDay: ${timeOfDay}, URL: ${imageUrl}`);

    return imageUrl;
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

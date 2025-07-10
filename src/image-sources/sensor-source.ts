import { ImageSource, ImageSourceConfig, BackgroundImage, TimeOfDay, FindAttributeInPath, ValidWeather, ValidTimeOfDay, Weather, getCurrentTimeOfDay } from './image-source';
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

  // Cache for GetNextImageUrl
  private imageUrlCache: Map<string, string[]> = new Map();
  private lastWeather: Weather | null = null;
  private lastTimeOfDay: TimeOfDay | null = null;
  private currentIndex: number = 0;

  // Entity tracking
  private entityId: string | null = null;

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Check entity and update cache if needed
   * @param entityId The entity ID to check
   * @returns Promise that resolves when the entity is checked
   */
  private async checkEntity(entityId: string): Promise<void> {
    try {
      // Get the Home Assistant instance
      const hass = (window as any).document.querySelector('home-assistant').hass;

      // If we can't get the Home Assistant instance, return
      if (!hass) {
        console.warn('[sensor-source] Could not get Home Assistant instance');
        return;
      }

      // Get the entity state
      const state = hass.states[entityId];

      // If the entity doesn't exist, return
      if (!state) {
        console.warn(`[sensor-source] Entity ${entityId} not found`);
        return;
      }

      // Update the cache from the entity
      this.updateCacheFromEntity(state);

      // Store the entity ID
      this.entityId = entityId;
      console.log(`[sensor-source] Checked entity ${entityId}`);
    } catch (error) {
      console.error('[sensor-source] Error checking entity:', error);
    }
  }

  /**
   * Update the cache from an entity
   * @param entity The entity to update the cache from
   */
  private updateCacheFromEntity(entity: any): void {
    // Get the files attribute
    const files = entity.attributes.files;

    // If the files attribute doesn't exist or is not an array, return
    if (!files || !Array.isArray(files)) {
      console.warn(`[sensor-source] Entity ${this.entityId} does not have a valid files attribute`);
      return;
    }

    // Update the cache
    this.cachedImages = files;
    this.lastFetchTime = Date.now();

    // Clear the image URL cache to force re-filtering
    this.imageUrlCache.clear();

    console.log(`[sensor-source] Updated cache with ${files.length} images from entity ${this.entityId}`);
  }

  /**
   * Fetch images from the sensor
   * @param config Configuration for the Sensor image source
   * @param weatherData Optional weather data to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: SensorSourceConfig, weatherData?: WeatherData): Promise<string[]> {
    // Get the entity ID from the configuration
    const entityId = config.entity;

    // If no entity ID is provided, return an empty array
    if (!entityId) {
      console.warn('[sensor-source] No entity ID provided for Sensor image source');
      return [];
    }

    // Check entity and update cache if needed
    await this.checkEntity(entityId);

    // Get the current time
    const now = Date.now();

    // If we have cached images and it's been less than the refresh interval, use the cached images
    if (this.cachedImages.length > 0 && (now - this.lastFetchTime) < this.refreshInterval) {
      console.log(`[sensor-source] Using cached images (${this.cachedImages.length} images)`);
      return this.filterImagesByWeatherAndTime(this.cachedImages, weatherData);
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

      // Update the cache from the entity
      this.updateCacheFromEntity(state);

      // Filter the images by weather and time of day
      return this.filterImagesByWeatherAndTime(this.cachedImages, weatherData);
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

    // Check if we have valid weather data with current condition
    if (weatherData && weatherData.current && weatherData.current.conditionUnified) {
      const currentCondition = weatherData.current.conditionUnified;
      console.log(`[sensor-source] Current weather condition: ${currentCondition}`);

      // Create an array to store the filtered images
      let filteredImages: string[] = [];

      // First try to find images that match both weather and time of day
      filteredImages = images.filter(url => {
        const weather = FindAttributeInPath(url, ValidWeather);
        const timeOfDay = FindAttributeInPath(url, ValidTimeOfDay);

        return (weather === currentCondition || weather === Weather.All || !weather) &&
               (timeOfDay === currentTimeOfDay || !timeOfDay);
      });

      // If we found matching images, return them
      if (filteredImages.length > 0) {
        console.log(`[sensor-source] Found ${filteredImages.length} images matching current conditions`);
        return filteredImages;
      }
    } else {
      // Log that we don't have valid weather data
      if (!weatherData) {
        console.log(`[sensor-source] No weather data available, skipping weather-based filtering`);
      } else if (!weatherData.current) {
        console.log(`[sensor-source] Weather data has no current condition, skipping weather-based filtering`);
      } else {
        console.log(`[sensor-source] Weather data has no unified condition, skipping weather-based filtering`);
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
    return getCurrentTimeOfDay();
  }


  /**
   * Get the next image URL from this source
   * @param config Configuration for this image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an image URL
   */
  async GetNextImageUrl(config: SensorSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    console.log(`[sensor-source] GetNextImageUrl called with weather: ${weather}, timeOfDay: ${timeOfDay}`);

    // Check if weather or timeOfDay has changed
    if (this.lastWeather !== weather || this.lastTimeOfDay !== timeOfDay) {
      console.log(`[sensor-source] Weather or timeOfDay changed, clearing cache`);
      this.imageUrlCache.clear();
      this.currentIndex = 0;
      this.lastWeather = weather;
      this.lastTimeOfDay = timeOfDay;
    }

    // Create a cache key from weather and timeOfDay
    const cacheKey = `${weather}_${timeOfDay}`;

    // Check if we have cached images for this weather and timeOfDay
    if (!this.imageUrlCache.has(cacheKey) || this.imageUrlCache.get(cacheKey)?.length === 0) {
      // Fetch images from the sensor
      const allImages = await this.fetchImages(config);

      // Filter images by weather and timeOfDay
      const filteredImages = allImages.filter(url => {
        const imgWeather = FindAttributeInPath(url, ValidWeather);
        const imgTimeOfDay = FindAttributeInPath(url, ValidTimeOfDay);

        return (imgWeather === weather || imgWeather === Weather.All || !imgWeather) &&
               (imgTimeOfDay === timeOfDay || !imgTimeOfDay);
      });

      // If no matching images, use all images
      const imagesToCache = filteredImages.length > 0 ? filteredImages : allImages;

      // Shuffle the images before caching
      this.shuffleArray(imagesToCache);
      console.log(`[sensor-source] Shuffled ${imagesToCache.length} images for random order`);

      // Cache the shuffled images
      this.imageUrlCache.set(cacheKey, imagesToCache);
      console.log(`[sensor-source] Cached ${imagesToCache.length} images for weather: ${weather}, timeOfDay: ${timeOfDay}`);
    }

    // Get the cached images
    const cachedImages = this.imageUrlCache.get(cacheKey) || [];

    // If no images, return empty string
    if (cachedImages.length === 0) {
      console.warn(`[sensor-source] No images available for weather: ${weather}, timeOfDay: ${timeOfDay}`);
      return '';
    }

    // Get the next image URL
    const imageUrl = cachedImages[this.currentIndex];

    // Increment the index for next time
    this.currentIndex = (this.currentIndex + 1) % cachedImages.length;

    // Log the parameters for which the image is returned
    console.log(`[sensor-source] Returning image for weather: ${weather}, timeOfDay: ${timeOfDay}, URL: ${imageUrl}`);

    return imageUrl;
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

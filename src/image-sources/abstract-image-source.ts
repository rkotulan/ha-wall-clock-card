import { ImageSource, ImageSourceConfig, TimeOfDay, Weather, BackgroundImage, FindAttributeInPath, ValidWeather, ValidTimeOfDay } from './image-source';
import { createLogger } from '../utils/logger';

export abstract class AbstractImageSource implements ImageSource {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;

  // Cache for GetNextImageUrl
  protected imageUrlCache: Map<string, string[]> = new Map();
  protected lastWeather: Weather | null = null;
  protected lastTimeOfDay: TimeOfDay | null = null;
  protected currentIndex: number = 0;

  // Get a logger instance with the correct source identifier
  protected getLogger() {
    return createLogger(`${this.id}-source`);
  }

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  protected shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Abstract method that concrete classes must implement
  protected abstract fetchImagesInternalAsync(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]>;

  // Common implementation of fetchImages
  async fetchImagesAsync(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
    this.getLogger().info(`Fetching images with weather: ${weather}, timeOfDay: ${timeOfDay}`);
    return this.fetchImagesInternalAsync(config, weather, timeOfDay);
  }

  // Common implementation of GetNextImageUrl
  async GetNextImageUrlAsync(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    this.getLogger().info(`GetNextImageUrl called with weather: ${weather}, timeOfDay: ${timeOfDay}`);

    // Check if weather or timeOfDay has changed
    if (this.lastWeather !== weather || this.lastTimeOfDay !== timeOfDay) {
      this.getLogger().info(`Weather or timeOfDay changed, clearing cache`);
      this.imageUrlCache.clear();
      this.currentIndex = 0;
      this.lastWeather = weather;
      this.lastTimeOfDay = timeOfDay;
    }

    // Create a cache key from weather and timeOfDay
    const cacheKey = `${weather}_${timeOfDay}`;

    // Check if we have cached images for this weather and timeOfDay
    if (!this.imageUrlCache.has(cacheKey) || this.imageUrlCache.get(cacheKey)?.length === 0) {
      const fetchedUrls = await this.fetchImagesAsync(config, weather, timeOfDay);

      // Shuffle the images before caching
      const imagesToCache = [...fetchedUrls];
      this.shuffleArray(imagesToCache);

      // Cache the shuffled images
      this.imageUrlCache.set(cacheKey, imagesToCache);
      this.getLogger().info(`Cached ${imagesToCache.length} images for weather: ${weather}, timeOfDay: ${timeOfDay}`);
    }

    // Get the cached images
    const cachedImages = this.imageUrlCache.get(cacheKey) || [];

    // If no images, return empty string
    if (cachedImages.length === 0) {
      this.getLogger().warn(`No images available for weather: ${weather}, timeOfDay: ${timeOfDay}`);
      return '';
    }

    // Get the next image URL
    const imageUrl = cachedImages[this.currentIndex];

    // Increment the index for next time
    this.currentIndex = (this.currentIndex + 1) % cachedImages.length;

    // Log the parameters for which the image is returned
    this.getLogger().info(`Returning image for weather: ${weather}, timeOfDay: ${timeOfDay}, URL: ${imageUrl}`);

    return imageUrl;
  }

  /**
   * Filter background images by weather condition and time of day
   * @param images Array of background images
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Filtered array of image URLs
   */
  protected filterImagesByWeatherAndTime(
    images: BackgroundImage[], 
    weather: Weather, 
    timeOfDay: TimeOfDay
  ): string[] {
    this.getLogger().info(`Current time of day: ${timeOfDay}`);
    this.getLogger().info(`Current weather condition: ${weather}`);

    // If we have no images, return an empty array
    if (images.length === 0) {
      return [];
    }

    let filteredImages: BackgroundImage[] = [];

    // First try to find images that match both weather and time of day
    filteredImages = images.filter(img => {
      return (img.weather === weather || img.weather === Weather.All) &&
          img.timeOfDay === timeOfDay;
    });

    // If no matches, try images that match weather but have unspecified time of day
    if (filteredImages.length === 0) {
      filteredImages = images.filter(img => {
        return (img.weather === weather || img.weather === Weather.All) &&
            img.timeOfDay === TimeOfDay.Unspecified;
      });
    }

    // If still no matches, try images with 'all' weather that match time of day
    if (filteredImages.length === 0) {
      filteredImages = images.filter(img =>
        img.weather === Weather.All &&
        img.timeOfDay === timeOfDay
      );
    }

    // If still no matches, try images with 'all' weather and unspecified time of day
    if (filteredImages.length === 0) {
      filteredImages = images.filter(img =>
        img.weather === Weather.All &&
        img.timeOfDay === TimeOfDay.Unspecified
      );
    }

    // If we found matching images, return their URLs
    if (filteredImages.length > 0) {
      this.getLogger().info(`Found ${filteredImages.length} images matching current conditions`);
      return filteredImages.map(img => img.url);
    }

    // If no matches at all, return all images
    this.getLogger().info(`No matching images found, returning all images`);
    return images.map(img => img.url);
  }

  /**
   * Convert an array of image URLs to an array of BackgroundImage objects
   * @param images Array of image URLs
   * @returns Array of BackgroundImage objects
   */
  protected convertUrlsToBackgroundImages(images: string[]): BackgroundImage[] {
    this.getLogger().info(`Converting ${images.length} URLs to BackgroundImage objects`);

    return images.map(url => {
      // Detect weather and time of day from the URL
      const weather = FindAttributeInPath(url, ValidWeather) as Weather || Weather.All;
      const timeOfDay = FindAttributeInPath(url, ValidTimeOfDay) as TimeOfDay || TimeOfDay.Unspecified;

      return {
        url,
        weather,
        timeOfDay
      };
    });
  }

  abstract getDefaultConfig(): ImageSourceConfig;
}

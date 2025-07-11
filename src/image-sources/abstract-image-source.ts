import { ImageSource, ImageSourceConfig, TimeOfDay, Weather } from './image-source';

export abstract class AbstractImageSource implements ImageSource {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;

  // Cache for GetNextImageUrl
  protected imageUrlCache: Map<string, string[]> = new Map();
  protected lastWeather: Weather | null = null;
  protected lastTimeOfDay: TimeOfDay | null = null;
  protected currentIndex: number = 0;

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  protected shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Abstract method that concrete classes must implement
  protected abstract fetchImagesInternal(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]>;

  // Common implementation of fetchImages
  async fetchImages(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
    console.log(`[${this.id}-source] Fetching images with weather: ${weather}, timeOfDay: ${timeOfDay}`);
    return this.fetchImagesInternal(config, weather, timeOfDay);
  }

  // Common implementation of GetNextImageUrl
  async GetNextImageUrl(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    console.log(`[${this.id}-source] GetNextImageUrl called with weather: ${weather}, timeOfDay: ${timeOfDay}`);

    // Check if weather or timeOfDay has changed
    if (this.lastWeather !== weather || this.lastTimeOfDay !== timeOfDay) {
      console.log(`[${this.id}-source] Weather or timeOfDay changed, clearing cache`);
      this.imageUrlCache.clear();
      this.currentIndex = 0;
      this.lastWeather = weather;
      this.lastTimeOfDay = timeOfDay;
    }

    // Create a cache key from weather and timeOfDay
    const cacheKey = `${weather}_${timeOfDay}`;

    // Check if we have cached images for this weather and timeOfDay
    if (!this.imageUrlCache.has(cacheKey) || this.imageUrlCache.get(cacheKey)?.length === 0) {
      const fetchedUrls = await this.fetchImages(config, weather, timeOfDay);
      
      // Shuffle the images before caching
      const imagesToCache = [...fetchedUrls];
      this.shuffleArray(imagesToCache);
      
      // Cache the shuffled images
      this.imageUrlCache.set(cacheKey, imagesToCache);
      console.log(`[${this.id}-source] Cached ${imagesToCache.length} images for weather: ${weather}, timeOfDay: ${timeOfDay}`);
    }

    // Get the cached images
    const cachedImages = this.imageUrlCache.get(cacheKey) || [];

    // If no images, return empty string
    if (cachedImages.length === 0) {
      console.warn(`[${this.id}-source] No images available for weather: ${weather}, timeOfDay: ${timeOfDay}`);
      return '';
    }

    // Get the next image URL
    const imageUrl = cachedImages[this.currentIndex];

    // Increment the index for next time
    this.currentIndex = (this.currentIndex + 1) % cachedImages.length;

    // Log the parameters for which the image is returned
    console.log(`[${this.id}-source] Returning image for weather: ${weather}, timeOfDay: ${timeOfDay}, URL: ${imageUrl}`);

    return imageUrl;
  }

  abstract getDefaultConfig(): ImageSourceConfig;
}
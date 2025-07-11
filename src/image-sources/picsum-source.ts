import { ImageSourceConfig, TimeOfDay, Weather } from './image-source';
import { AbstractImageSource } from './abstract-image-source';

/**
 * Configuration for the Picsum image source
 */
export interface PicsumSourceConfig extends ImageSourceConfig {
  // No additional configuration needed for Picsum
}

/**
 * Picsum image source plugin
 * Fetches random images from Picsum Photos (https://picsum.photos/)
 */
export class PicsumSource extends AbstractImageSource {
  readonly id = 'picsum';
  readonly name = 'Picsum Photos';
  readonly description = 'Random high-quality images from Picsum Photos';

  /**
   * Fetch images from Picsum Photos
   * @param config Configuration for the Picsum image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an array of image URLs
   */
  protected async fetchImagesInternal(_config: PicsumSourceConfig, _weather: Weather, _timeOfDay: TimeOfDay): Promise<string[]> {
    // Generate a URL with a timestamp to avoid caching
    const timestamp = Date.now();
    const seed = timestamp;
    const imageUrl = `https://picsum.photos/seed/${seed}/1920/1080`;

    console.log(`[picsum-source] Generated Picsum image URL: ${imageUrl}`);
    return [imageUrl];
  }

  /**
   * Get the default configuration for the Picsum image source
   * @returns Default configuration
   */
  getDefaultConfig(): PicsumSourceConfig {
    return {};
  }
}

// Export a singleton instance of the Picsum image source
export const picsumSource = new PicsumSource();

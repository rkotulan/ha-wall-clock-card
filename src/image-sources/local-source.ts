import { ImageSource, ImageSourceConfig } from './image-source';

/**
 * Configuration for the Local image source
 */
export interface LocalSourceConfig extends ImageSourceConfig {
  // Array of local image URLs
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
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: LocalSourceConfig): Promise<string[]> {
    // Get the images from the configuration
    const images = config.images || [];

    // Log the number of images found
    console.log(`Found ${images.length} local images`);

    // Return the images
    return images;
  }

  /**
   * Get the default configuration for the Local image source
   * @returns Default configuration
   */
  getDefaultConfig(): LocalSourceConfig {
    return {
      images: []
    };
  }
}

// Export a singleton instance of the Local image source
export const localSource = new LocalSource();

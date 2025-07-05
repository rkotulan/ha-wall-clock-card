import { ImageSource, ImageSourceConfig } from './image-source';

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
export class PicsumSource implements ImageSource {
  readonly id = 'picsum';
  readonly name = 'Picsum Photos';
  readonly description = 'Random high-quality images from Picsum Photos';

  /**
   * Fetch images from Picsum Photos
   * @param config Configuration for the Picsum image source
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: PicsumSourceConfig): Promise<string[]> {
    const count = config.count || 5;

    // Instead of using HEAD requests which cause CORS issues,
    // we'll generate the URLs directly and let the browser handle loading them
    // in the <img> tag, which doesn't have CORS restrictions for displaying images

    // Generate URLs with a timestamp to avoid caching
    const timestamp = Date.now();

    // Use Picsum's static image service which doesn't require verification
    // Format: https://i.picsum.photos/id/{id}/{width}/{height}.jpg
    // This avoids the need for HEAD requests
    const fetchedImages = Array.from({ length: count }, (_, i) => {
      // Use a different seed for each image
      const seed = timestamp + i;
      // Use the seed in the URL to get different images
      return `https://picsum.photos/seed/${seed}/1920/1080`;
    });

    console.log(`Generated ${fetchedImages.length} Picsum image URLs`);
    return fetchedImages;
  }

  /**
   * Get the default configuration for the Picsum image source
   * @returns Default configuration
   */
  getDefaultConfig(): PicsumSourceConfig {
    return {
      count: 5
    };
  }
}

// Export a singleton instance of the Picsum image source
export const picsumSource = new PicsumSource();

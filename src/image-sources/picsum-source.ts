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
  async fetchImages(_config: PicsumSourceConfig): Promise<string[]> {
    // Generate a URL with a timestamp to avoid caching
    const timestamp = Date.now();

    // Use Picsum's static image service which doesn't require verification
    // Format: https://i.picsum.photos/id/{id}/{width}/{height}.jpg
    // This avoids the need for HEAD requests

    // Always fetch just one image, regardless of the count parameter
    const seed = timestamp;
    const imageUrl = `https://picsum.photos/seed/${seed}/1920/1080`;

    console.log(`Generated Picsum image URL: ${imageUrl}`);
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

/**
 * Interface for image source plugins
 * All image source plugins must implement this interface
 */
export interface ImageSourceConfig {
  // Common configuration properties for all image sources
  count?: number;
  category?: string;
  [key: string]: any; // Allow additional source-specific properties
}

export interface ImageSource {
  /**
   * The unique identifier for this image source
   */
  readonly id: string;

  /**
   * The display name of this image source
   */
  readonly name: string;

  /**
   * Description of this image source
   */
  readonly description: string;

  /**
   * Fetch images from this source
   * @param config Configuration for this image source
   * @returns Promise that resolves to an array of image URLs
   */
  fetchImages(config: ImageSourceConfig): Promise<string[]>;

  /**
   * Get the default configuration for this image source
   * @returns Default configuration
   */
  getDefaultConfig(): ImageSourceConfig;
}
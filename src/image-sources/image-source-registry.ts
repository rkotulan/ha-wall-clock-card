import { ImageSource } from './image-source';
import { logger } from '../utils/logger';

/**
 * Registry for image source plugins
 * Manages the registration and retrieval of image source plugins
 */
export class ImageSourceRegistry {
  private static instance: ImageSourceRegistry;
  private sources: Map<string, ImageSource> = new Map();

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): ImageSourceRegistry {
    if (!ImageSourceRegistry.instance) {
      ImageSourceRegistry.instance = new ImageSourceRegistry();
    }
    return ImageSourceRegistry.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Register an image source plugin
   * @param source The image source plugin to register
   */
  public register(source: ImageSource): void {
    if (this.sources.has(source.id)) {
      logger.warn(`Image source with ID ${source.id} is already registered. Overwriting.`);
    }
    this.sources.set(source.id, source);
  }

  /**
   * Register multiple image sources at once
   * @param sources Array of image sources to register
   */
  public registerAll(sources: ImageSource[]): void {
    sources.forEach(source => this.register(source));
  }

  /**
   * Get an image source plugin by ID
   * @param id The ID of the image source plugin
   * @returns The image source plugin, or undefined if not found
   */
  public getSource(id: string): ImageSource | undefined {
    return this.sources.get(id);
  }

  /**
   * Get all registered image source plugins
   * @returns Array of all registered image source plugins
   */
  public getAllSources(): ImageSource[] {
    return Array.from(this.sources.values());
  }

  /**
   * Check if an image source plugin is registered
   * @param id The ID of the image source plugin
   * @returns True if the plugin is registered, false otherwise
   */
  public hasSource(id: string): boolean {
    return this.sources.has(id);
  }
}

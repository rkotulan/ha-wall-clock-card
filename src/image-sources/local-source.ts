import { ImageSourceConfig, TimeOfDay, Weather } from './image-source';
import { AbstractImageSource } from './abstract-image-source';
import { createLogger } from '../utils/logger';

/**
 * Configuration for the Local image source
 */
export interface LocalSourceConfig extends ImageSourceConfig {
    // Note: backgroundImages is inherited from ImageSourceConfig
}

/**
 * Local image source plugin
 * Uses local images specified in the configuration
 */
export class LocalSource extends AbstractImageSource {
    readonly id = 'local';
    readonly name = 'Local Images';
    readonly description = 'Images from local paths or URLs specified in the configuration';
    private logger = createLogger('local-source');

    /**
     * Fetch images from the local configuration
     * @param config Configuration for the Local image source
     * @param weather Optional weather data to use for selecting images
     * @param timeOfDay Optional time of day to use for selecting images
     * @returns Promise that resolves to an array of image URLs
     */
    protected async fetchImagesInternalAsync(config: LocalSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
        // Log the entire config for debugging
        // this.logger.debug(`fetchImagesInternal called with config:`, JSON.stringify(config, null, 2));

        // If we have backgroundImages structure, use it
        if (config.backgroundImages && config.backgroundImages.length > 0) {
            this.logger.debug(`Using backgroundImages structure with ${config.backgroundImages.length} images`);
            this.logger.debug(`First image URL: ${config.backgroundImages[0].url}`);

            // Use the common filtering method from AbstractImageSource
            return this.filterImagesByWeatherAndTime(config.backgroundImages, weather, timeOfDay);
        }

        // No images found
        this.logger.debug(`No images found in configuration`);
        return [];
    }

    /**
     * Get the default configuration for the Local image source
     * @returns Default configuration
     */
    getDefaultConfig(): LocalSourceConfig {
        return {
            backgroundImages: []
        };
    }
}

// Export a singleton instance of the Local image source
export const localSource = new LocalSource();

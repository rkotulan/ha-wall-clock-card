import { ImageSourceConfig, BackgroundImage, TimeOfDay, Weather } from './image-source';
import { AbstractImageSource } from './abstract-image-source';

/**
 * Configuration for the Local image source
 */
export interface LocalSourceConfig extends ImageSourceConfig {
    // Array of background images with weather and time-of-day information
    backgroundImages?: BackgroundImage[];

    // Simple list of image URLs (used when no backgroundImages are provided)
    images?: string[];
}

/**
 * Local image source plugin
 * Uses local images specified in the configuration
 */
export class LocalSource extends AbstractImageSource {
    readonly id = 'local';
    readonly name = 'Local Images';
    readonly description = 'Images from local paths or URLs specified in the configuration';

    /**
     * Fetch images from the local configuration
     * @param config Configuration for the Local image source
     * @param weather Optional weather data to use for selecting images
     * @param timeOfDay Optional time of day to use for selecting images
     * @returns Promise that resolves to an array of image URLs
     */
    protected async fetchImagesInternal(config: LocalSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
        console.log(`[local-source] Current time of day: ${timeOfDay}`);
        console.log(`[local-source] Current weather condition: ${weather}`);

        // If we have the new backgroundImages structure, use it
        if (config.backgroundImages && config.backgroundImages.length > 0) {
            console.log(`[local-source] Using new backgroundImages structure with ${config.backgroundImages.length} images`);

            let filteredImages: BackgroundImage[] = [];

            // First try to find images that match both weather and time of day
            filteredImages = config.backgroundImages.filter(img => {
                return (img.weather === weather || img.weather === Weather.All) &&
                    img.timeOfDay === timeOfDay;
            });

            // If no matches, try images that match weather but have unspecified time of day
            if (filteredImages.length === 0) {
                filteredImages = config.backgroundImages.filter(img => {
                    return (img.weather === weather || img.weather === Weather.All) &&
                        img.timeOfDay === TimeOfDay.Unspecified;
                });
            }

            // If still no matches, try images with 'all' weather that match time of day
            if (filteredImages.length === 0) {
                filteredImages = config.backgroundImages.filter(img =>
                    img.weather === Weather.All &&
                    img.timeOfDay === timeOfDay
                );
            }

            // If still no matches, try images with 'all' weather and unspecified time of day
            if (filteredImages.length === 0) {
                filteredImages = config.backgroundImages.filter(img =>
                    img.weather === Weather.All &&
                    img.timeOfDay === TimeOfDay.Unspecified
                );
            }

            // If we found matching images, return their URLs
            if (filteredImages.length > 0) {
                console.log(`[local-source] Found ${filteredImages.length} images matching current conditions`);
                return filteredImages.map(img => img.url);
            }

            // If no matches at all, return all images
            console.log(`[local-source] No matching images found, returning all images`);
            return config.backgroundImages.map(img => img.url);
        }

        // No matching images found, fall back to default images
        console.log(`[local-source] No matching images found, falling back to default images`);

        // Get the default images from the configuration
        const images = config.images || [];

        // Log the number of images found
        console.log(`[local-source] Found ${images.length} local images`);

        // Return the images
        return images;
    }

    /**
     * Get the default configuration for the Local image source
     * @returns Default configuration
     */
    getDefaultConfig(): LocalSourceConfig {
        return {
            backgroundImages: [],
            images: []
        };
    }
}

// Export a singleton instance of the Local image source
export const localSource = new LocalSource();

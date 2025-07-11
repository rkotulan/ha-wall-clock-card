import {
    ImageSourceConfig,
    BackgroundImage,
    TimeOfDay,
    FindAttributeInPath,
    ValidWeather,
    ValidTimeOfDay,
    Weather
} from './image-source';
import { AbstractImageSource } from './abstract-image-source';

/**
 * Configuration for the Sensor image source
 */
export interface SensorSourceConfig extends ImageSourceConfig {
    // Entity ID of the sensor that provides the image list
    entity?: string;

    // Array of background images with weather and time-of-day information
    // This is used to map the sensor's files to weather conditions and time of day
    backgroundImages?: BackgroundImage[];
}

/**
 * Sensor image source plugin
 * Uses images from a Home Assistant sensor with a "files" attribute
 */
export class SensorSource extends AbstractImageSource {
    readonly id = 'sensor';
    readonly name = 'Sensor Images';
    readonly description = 'Images from a Home Assistant sensor with a "files" attribute';

    // Cache for the last fetched images
    private lastFetchTime: number = 0;
    private cachedImages: string[] = [];
    private readonly refreshInterval = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Entity tracking
    private entityId: string | null = null;


    /**
     * Check entity and update cache if needed
     * @param entityId The entity ID to check
     * @returns Promise that resolves when the entity is checked
     */
    private async checkEntity(entityId: string): Promise<void> {
        try {
            // Get the Home Assistant instance
            const hass = (window as any).document.querySelector('home-assistant').hass;

            // If we can't get the Home Assistant instance, return
            if (!hass) {
                console.warn('[sensor-source] Could not get Home Assistant instance');
                return;
            }

            // Get the entity state
            const state = hass.states[entityId];

            // If the entity doesn't exist, return
            if (!state) {
                console.warn(`[sensor-source] Entity ${entityId} not found`);
                return;
            }

            // Update the cache from the entity
            this.updateCacheFromEntity(state);

            // Store the entity ID
            this.entityId = entityId;
            console.log(`[sensor-source] Checked entity ${entityId}`);
        } catch (error) {
            console.error('[sensor-source] Error checking entity:', error);
        }
    }

    /**
     * Update the cache from an entity
     * @param entity The entity to update the cache from
     */
    private updateCacheFromEntity(entity: any): void {
        // Get the files attribute
        const files = entity.attributes.files;

        // If the files attribute doesn't exist or is not an array, return
        if (!files || !Array.isArray(files)) {
            console.warn(`[sensor-source] Entity ${this.entityId} does not have a valid files attribute`);
            return;
        }

        // Update the cache
        this.cachedImages = files;
        this.lastFetchTime = Date.now();

        // Clear the image URL cache to force re-filtering
        this.imageUrlCache.clear();

        console.log(`[sensor-source] Updated cache with ${files.length} images from entity ${this.entityId}`);
    }

    /**
     * Fetch images from the sensor
     * @param config Configuration for the Sensor image source
     * @param weather Optional weather data to use for selecting images
     * @param timeOfDay Optional time of day to use for selecting images
     * @returns Promise that resolves to an array of image URLs
     */
    protected async fetchImagesInternal(config: SensorSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
        // Get the entity ID from the configuration
        const entityId = config.entity;

        // If no entity ID is provided, return an empty array
        if (!entityId) {
            console.warn('[sensor-source] No entity ID provided for Sensor image source');
            return [];
        }

        // Check entity and update cache if needed
        await this.checkEntity(entityId);

        // Get the current time
        const now = Date.now();

        // If we have cached images and it's been less than the refresh interval, use the cached images
        if (this.cachedImages.length > 0 && (now - this.lastFetchTime) < this.refreshInterval) {
            console.log(`[sensor-source] Using cached images (${this.cachedImages.length} images)`);
            return this.filterImagesByWeatherAndTime(this.cachedImages, weather, timeOfDay);
        }

        try {
            // Get the Home Assistant instance
            const hass = (window as any).document.querySelector('home-assistant').hass;

            // If we can't get the Home Assistant instance, return an empty array
            if (!hass) {
                console.warn('[sensor-source] Could not get Home Assistant instance');
                return [];
            }

            // Get the sensor state
            const state = hass.states[entityId];

            // If the sensor doesn't exist, return an empty array
            if (!state) {
                console.warn(`[sensor-source] Sensor ${entityId} not found`);
                return [];
            }

            // Update the cache from the entity
            this.updateCacheFromEntity(state);

            // Filter the images by weather and time of day
            return this.filterImagesByWeatherAndTime(this.cachedImages, weather, timeOfDay);
        } catch (error) {
            console.error('[sensor-source] Error fetching images from sensor:', error);
            return [];
        }
    }

    /**
     * Filter images by weather condition and time of day
     * @param images Array of image URLs
     * @param weather Optional weather data to use for selecting images
     * @param timeOfDay Optional time of day to use for selecting images
     * @returns Filtered array of image URLs
     */
    private filterImagesByWeatherAndTime(images: string[], weather: Weather, timeOfDay: TimeOfDay): string[] {
        // If we have no images, return an empty array
        if (images.length === 0) {
            return [];
        }

        console.log(`[sensor-source] Current time of day: ${timeOfDay}`);
        console.log(`[sensor-source] Current weather condition: ${weather}`);

        // Create an array to store the filtered images
        let filteredImages: string[] = [];

        // First try to find images that match both weather and time of day
        filteredImages = images.filter(url => {
            const urlWeather = FindAttributeInPath(url, ValidWeather);
            const urlTimeOfDay = FindAttributeInPath(url, ValidTimeOfDay);

            return (urlWeather === weather || urlWeather === Weather.All || !urlWeather) &&
                (urlTimeOfDay === timeOfDay || !urlTimeOfDay);
        });

        // If we found matching images, return them
        if (filteredImages.length > 0) {
            console.log(`[sensor-source] Found ${filteredImages.length} images matching current conditions`);
            return filteredImages;
        }


        // If no weather data or no matches, return all images
        console.log(`[sensor-source] No matching images found, returning all images`);
        return images;
    }


    /**
     * Get the default configuration for the Sensor image source
     * @returns Default configuration
     */
    getDefaultConfig(): SensorSourceConfig {
        return {
            entity: '',
            backgroundImages: []
        };
    }
}

// Export a singleton instance of the Sensor image source
export const sensorSource = new SensorSource();

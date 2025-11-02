import {
    ImageSourceConfig,
    BackgroundImage,
    TimeOfDay,
    Weather
} from './image-source';
import { AbstractImageSource } from './abstract-image-source';
import { createLogger } from '../utils/logger';
import { HomeAssistant } from 'custom-card-helpers';

/**
 * Configuration for the Sensor image source
 */
export interface SensorSourceConfig extends ImageSourceConfig {
    // Entity ID of the sensor that provides the image list
    entity?: string;

    // Note: backgroundImages is inherited from ImageSourceConfig
}

/**
 * Sensor image source plugin
 * Uses images from a Home Assistant sensor with a "files" attribute
 */
export class SensorSource extends AbstractImageSource {
    readonly id = 'sensor';
    readonly name = 'Sensor Images';
    readonly description = 'Images from a Home Assistant sensor with a "files" attribute';
    private logger = createLogger('sensor-source');

    // Cache for the last fetched images
    private lastFetchTime: number = 0;
    private cachedImages: BackgroundImage[] = [];
    private readonly refreshInterval = 10 * 60 * 1000; // 10 minutes in milliseconds

    // Entity tracking
    private entityId: string | null = null;
    private hass?: HomeAssistant;

    setHass(hass?: HomeAssistant): void {
        this.hass = hass;
    }


    /**
     * Check entity and update cache if needed
     * @param entityId The entity ID to check
     * @returns Promise that resolves when the entity is checked
     */
    private async checkEntityAsync(entityId: string): Promise<void> {
        try {
            if (!this.hass) {
                this.logger.warn('Could not get Home Assistant instance');
                return;
            }

            // Get the entity state
            const state = this.hass.states[entityId];

            // If the entity doesn't exist, return
            if (!state) {
                this.logger.warn(`Entity ${entityId} not found`);
                return;
            }

            // Update the cache from the entity
            this.updateCacheFromEntity(state);

            // Store the entity ID
            this.entityId = entityId;
            this.logger.debug(`Checked entity ${entityId}`);
        } catch (error) {
            this.logger.error('Error checking entity:', error);
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
        if (!files || !Array.isArray(files) || !files.every(file => typeof file === 'string')) {
            this.logger.warn(`Entity ${this.entityId} does not have a valid files attribute`);
            return;
        }

        // Update the cache
        this.cachedImages = this.convertUrlsToBackgroundImages(files);
        this.lastFetchTime = Date.now();

        // Clear the image URL cache to force re-filtering
        this.imageUrlCache.clear();

        this.logger.debug(`Updated cache with ${files.length} images from entity ${this.entityId}`);
    }

    /**
     * Fetch images from the sensor
     * @param config Configuration for the Sensor image source
     * @param weather Optional weather data to use for selecting images
     * @param timeOfDay Optional time of day to use for selecting images
     * @returns Promise that resolves to an array of image URLs
     */
    protected async fetchImagesInternalAsync(config: SensorSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
        // Get the entity ID from the configuration
        const entityId = config.entity;

        // If no entity ID is provided, return an empty array
        if (!entityId) {
            this.logger.warn('No entity ID provided for Sensor image source');
            return [];
        }

        // Check entity and update cache if needed
        await this.checkEntityAsync(entityId);

        // Get the current time
        const now = Date.now();

        // If we have cached images and it's been less than the refresh interval, use the cached images
        if (this.cachedImages.length > 0 && (now - this.lastFetchTime) < this.refreshInterval) {
            this.logger.debug(`Using cached images (${this.cachedImages.length} images)`);
            return this.filterImagesByWeatherAndTime(this.cachedImages, weather, timeOfDay);
        }

        try {
            if (!this.hass) {
                this.logger.warn('Could not get Home Assistant instance');
                return [];
            }

            // Get the sensor state
            const state = this.hass.states[entityId];

            // If the sensor doesn't exist, return an empty array
            if (!state) {
                this.logger.warn(`Sensor ${entityId} not found`);
                return [];
            }

            // Update the cache from the entity
            this.updateCacheFromEntity(state);

            // Filter the images by weather and time of day
            return this.filterImagesByWeatherAndTime(this.cachedImages, weather, timeOfDay);
        } catch (error) {
            this.logger.error('Error fetching images from sensor:', error);
            return [];
        }
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

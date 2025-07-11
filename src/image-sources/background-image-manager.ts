import {ImageSource, ImageSourceConfig, TimeOfDay, Weather} from './image-source';
import {getImageSource} from './image-source-factory';
import { createLogger } from '../utils/logger';

/**
 * BackgroundImageManager handles the management of background images
 * It simplifies the process of getting the next image URL from an image source
 */
export class BackgroundImageManager {
    private imageSource: ImageSource | null = null;
    private sourceConfig: ImageSourceConfig = {};
    private imageSourceId: string = 'picsum';
    private logger = createLogger('background-image-manager');

    /**
     * Initialize the BackgroundImageManager with the given image source ID and configuration
     * @param config The configuration for the image source
     * @returns True if initialization was successful, false otherwise
     */
    public initialize(config: ImageSourceConfig = {}): boolean {
        // Default to 'picsum' if not provided
        const imageSourceId = config.imageSourceId || 'picsum';
        this.logger.info(`Initializing with image source ID: ${imageSourceId}`);

        // Skip initialization if imageSource is 'none'
        if (imageSourceId === 'none') {
            this.logger.info('Image source is set to none, skipping initialization');
            return false;
        }

        this.imageSourceId = imageSourceId || 'picsum';

        // Get the image source using the factory function
        this.imageSource = getImageSource(this.imageSourceId);

        if (!this.imageSource) {
            this.logger.error(`Image source '${this.imageSourceId}' not found`);
            return false;
        }

        // Get the default configuration for the image source
        const defaultConfig = this.imageSource ? this.imageSource.getDefaultConfig() : {};

        // Store the final configuration
        this.sourceConfig = {
            ...defaultConfig,
            ...config,
        };

        this.logger.info(`Initialized with image source: ${this.imageSourceId}`);
        return true;
    }

    /**
     * Get the next image URL from the image source
     * @param weather Current weather condition
     * @param timeOfDay Current time of day
     * @returns Promise that resolves to an image URL, or empty string if no image is available
     */
    public async getNextImageUrl(weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
        if (!this.imageSource) {
            this.logger.error('No image source initialized');
            return '';
        }

      try {
            this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${weather}, time of day: ${timeOfDay}`);
            const imageUrl = await this.imageSource.GetNextImageUrl(this.sourceConfig, weather, timeOfDay);

            if (imageUrl) {
                this.logger.info(`Got image URL: ${imageUrl}`);
                return imageUrl;
            } else {
                this.logger.warn('No image URL returned from source');
                return '';
            }
        } catch (error) {
            this.logger.error('Error getting next image URL:', error);
            return '';
        }
    }

    public getImageSourceId(): string {
        return this.imageSourceId;
    }
}

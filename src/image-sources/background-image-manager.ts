import { HomeAssistant } from 'custom-card-helpers';
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
    private hass?: HomeAssistant;

    constructor(hass?: HomeAssistant) {
        this.hass = hass;
    }

    public setHass(hass?: HomeAssistant): void {
        this.hass = hass;
        this.imageSource?.setHass?.(hass);
    }

    /**
     * Initialize the BackgroundImageManager with the given image source ID and configuration
     * @param config The configuration for the image source
     * @returns True if initialization was successful, false otherwise
     */
    public initialize(config: ImageSourceConfig = {}): boolean {
        // Default to 'picsum' if not provided
        const imageSourceId = config.imageSourceId || 'picsum';
        this.logger.debug(`Initializing with image source ID: ${imageSourceId}`);

        // Skip initialization if imageSource is 'none'
        if (imageSourceId === 'none') {
            this.logger.debug('Image source is set to none, skipping initialization');
            return false;
        }

        this.imageSourceId = imageSourceId || 'picsum';

        // Get the image source using the factory function
        this.imageSource = getImageSource(this.imageSourceId);

        if (!this.imageSource) {
            this.logger.error(`Image source '${this.imageSourceId}' not found`);
            return false;
        }

        this.imageSource.setHass?.(this.hass);

        // Get the default configuration for the image source
        const defaultConfig = this.imageSource ? this.imageSource.getDefaultConfig() : {};

        // Store the final configuration
        this.sourceConfig = {
            ...defaultConfig,
            ...config,
        };

        this.logger.debug(`Initialized with image source: ${this.imageSourceId}`);
        return true;
    }

    /**
     * Get the next image URL from the image source
     * @param weather Current weather condition
     * @param timeOfDay Current time of day
     * @returns Promise that resolves to an image URL, or empty string if no image is available
     */
    public async getNextImageUrlAsync(weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
      if (!this.imageSource) {
        this.logger.error('No image source initialized');
        return '';
      }

    try {
          this.logger.info(`Getting next image URL with imageSourceId: ${this.imageSourceId} for weather: ${weather}, time of day: ${timeOfDay}`);
          let imageUrl = await this.imageSource.getNextImageUrlAsync(this.sourceConfig, weather, timeOfDay);

          // Transform url if it starts with media-source:// by resolving via Home Assistant, if available
        if (imageUrl && imageUrl.startsWith('media-source://')) {
            try {
                if (this.hass?.callWS) {
                    const result = await this.hass.callWS({
                        type: 'media_source/resolve_media',
                        media_content_id: imageUrl
                    });
                    // Result is typically { url: string, mime_type: string }
                    imageUrl = result && result.url ? result.url : imageUrl;
                } else {
                    this.logger.warn('Home Assistant instance not available to resolve media-source URL; using original URL');
                }
            } catch (e) {
                this.logger.error('Failed to resolve media-source URL', e);
            }
        }

        if (imageUrl) {
              this.logger.debug(`Got image URL: ${imageUrl}`);
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

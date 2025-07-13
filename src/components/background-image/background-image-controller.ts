import { ReactiveController, ReactiveControllerHost } from 'lit';
import { createLogger } from '../../utils/logger';
import { BackgroundImageManager } from '../../image-sources';
import { Weather, TimeOfDay, getCurrentTimeOfDay, ImageSourceConfig } from '../../image-sources';

export interface BackgroundImageControllerConfig {
    backgroundRotationInterval?: number;
    imageSourceConfig?: ImageSourceConfig;
}

/**
 * Controller for managing background images
 */
export class BackgroundImageController implements ReactiveController {
    private host: ReactiveControllerHost;
    private logger = createLogger('background-image-controller');
    private backgroundImageManager: BackgroundImageManager = new BackgroundImageManager();
    private imageRotationTimer?: number;
    private config: BackgroundImageControllerConfig;
    private currentWeather: Weather = Weather.All;

    // Image state
    private _currentImageUrl = '';
    private _previousImageUrl = '';
    private _isTransitioning = false;
    private _fetchingImageUrls = false;

    constructor(host: ReactiveControllerHost, config: BackgroundImageControllerConfig = {}) {
        this.host = host;
        this.config = config;
        host.addController(this);
    }

    hostConnected() {
        this.logger.debug('Host connected');

        // Lazy inicializace pouze pokud máme konfiguraci
        if (this.config.imageSourceConfig) {
            this.initBackgroundImageManagerAsync();
        }
    }

    hostDisconnected() {
        this.logger.debug('Host disconnected');

        // Clean up timers when the host disconnects
        if (this.imageRotationTimer) {
            clearInterval(this.imageRotationTimer);
            this.imageRotationTimer = undefined;
        }
    }

    /**
     * Update the controller configuration
     */
    updateConfig(config: Partial<BackgroundImageControllerConfig>): void {
        const oldConfig = { ...this.config };
        this.config = { ...this.config, ...config };

        // Check if imageSourceConfig changed
        const needsReinitialize = oldConfig.imageSourceConfig !== this.config.imageSourceConfig;

        // If rotation interval changed, update the timer
        if (oldConfig.backgroundRotationInterval !== this.config.backgroundRotationInterval && 
            this.backgroundImageManager) {
            this.setupImageRotation();
        }

        // If imageSourceConfig changed, reinitialize
        if (needsReinitialize) {
            this.initBackgroundImageManagerAsync();
        }
    }

    /**
     * Initialize the background image manager
     */
    private async initBackgroundImageManagerAsync(): Promise<void> {
        if (this._fetchingImageUrls) return;
        this._fetchingImageUrls = true;

        try {
            // Get the configuration for the BackgroundImageManager
            const imageSourceConfig: ImageSourceConfig = this.config.imageSourceConfig || {
                imageSourceId: 'picsum'
            };

            this.logger.debug(`Initializing BackgroundImageManager with imageSourceId: ${imageSourceConfig.imageSourceId || 'default'}`);

            // Initialize the BackgroundImageManager
            const initialized = this.backgroundImageManager.initialize(
                imageSourceConfig
            );

            if (!initialized) {
                this.logger.warn('Failed to initialize BackgroundImageManager');
                return;
            }

            this.setupImageRotation();
            await this.fetchNewImageAsync(this.currentWeather);
        } catch (error) {
            this.logger.error('Error fetching image URLs:', error);
        } finally {
            this._fetchingImageUrls = false;
        }
    }

    /**
     * Set up the image rotation timer
     */
    private setupImageRotation(): void {
        // Clear any existing timers
        if (this.imageRotationTimer) {
            clearInterval(this.imageRotationTimer);
        }

        // Get the configured rotation interval or default to 90 seconds
        const rotationInterval = (this.config.backgroundRotationInterval || 90) * 1000;

        this.logger.info(`Setting up image rotation with interval: ${rotationInterval / 1000} seconds`);

        // Set up rotation with the configured interval
        this.imageRotationTimer = window.setInterval(() => {
            // Use a self-executing async function to allow await
            (async () => {
                try {
                    await this.fetchNewImageAsync(this.currentWeather);
                } catch (error) {
                    this.logger.error(`Error in image rotation interval:`, error);
                }
            })();
        }, rotationInterval);
    }

    /**
     * Fetch a new image from the image source
     */
    private async fetchNewImageAsync(weather: Weather): Promise<void> {
        try {
            // Get current weather and time of day
            let currentWeather: Weather = weather; // Use provided weather
            let currentTimeOfDay: TimeOfDay = getCurrentTimeOfDay();

            // Use the BackgroundImageManager to fetch a new image
            const newImageUrl = await this.backgroundImageManager.getNextImageUrlAsync(
                currentWeather,
                currentTimeOfDay
            );

            if (newImageUrl) {
                this.logger.debug(`Successfully fetched new image from ${this.backgroundImageManager.getImageSourceId()}: ${newImageUrl}`);
                const img = new Image();
                img.onload = () => {
                    this.logger.debug(`New image loaded successfully: ${newImageUrl}`);

                    // Save the current image URL as the previous one before updating
                    if (this._currentImageUrl) {
                        this._previousImageUrl = this._currentImageUrl;
                        this._isTransitioning = true;

                        // After transition completes, clear the previous image URL
                        setTimeout(() => {
                            this._isTransitioning = false;
                            this.host.requestUpdate();
                        }, 1000); // Match the transition duration in CSS
                    }

                    // Update the current image URL
                    this._currentImageUrl = newImageUrl;

                    this.host.requestUpdate();
                };
                img.onerror = () => {
                    this.logger.error(`Error loading new image from ${this.backgroundImageManager.getImageSourceId()}: ${newImageUrl}`);
                };

                img.src = newImageUrl;
            } else {
                this.logger.warn(`Could not fetch new image from ${this.backgroundImageManager.getImageSourceId()}.`);
            }
        } catch (error) {
            this.logger.error('Error fetching new dynamic image:', error);
        }
    }

    /**
     * Update weather condition
     */
    public updateWeather(weather: Weather): void {
        this.currentWeather = weather;
    }

    /**
     * Get the current image URL
     */
    get currentImageUrl(): string {
        return this._currentImageUrl;
    }

    /**
     * Get the previous image URL
     */
    get previousImageUrl(): string {
        return this._previousImageUrl;
    }

    /**
     * Check if a transition is in progress
     */
    get isTransitioning(): boolean {
        return this._isTransitioning;
    }
}

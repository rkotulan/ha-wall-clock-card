import {ReactiveControllerHost} from 'lit';
import {logger} from '../../utils/logger/logger';
import {BaseController} from '../../utils/controllers';
import {BackgroundImageManager} from '../../image-sources';
import {Weather, TimeOfDay, getCurrentTimeOfDay, ImageSourceConfig} from '../../image-sources';
import {Messenger, WeatherMessage} from "../../utils/messenger";

export interface BackgroundImageControllerConfig {
    backgroundRotationInterval?: number;
    imageSourceConfig?: ImageSourceConfig;
}

/**
 * Controller for managing background images
 */
export class BackgroundImageController extends BaseController {
    // Constants for transition timing
    private static readonly TRANSITION_DELAY_MS = 50;
    private static readonly TRANSITION_DURATION_MS = 1000;

    private backgroundImageManager: BackgroundImageManager = new BackgroundImageManager();
    private imageRotationTimer?: number;
    private config: BackgroundImageControllerConfig;
    private currentWeather: Weather = Weather.All;
    private messenger = Messenger.getInstance();

    // Image state
    private _currentImageUrl = '';
    private _previousImageUrl = '';
    private _isTransitioning = false;
    private _fetchingImageUrls = false;

    constructor(host: ReactiveControllerHost, config: BackgroundImageControllerConfig = {}) {
        super(host, 'background-image-controller');
        this.config = config;
    }

    private onWeather = (msg: WeatherMessage) => {
        this.logger.info('New message for weather:', msg.weather);
        this.updateWeather(msg.weather);
    };

    protected onHostConnected(): void {
        // Watch the signal if provider is available
        this.messenger.subscribe(WeatherMessage, this.onWeather);

        // Lazy inicializace pouze pokud máme konfiguraci
        if (this.config.imageSourceConfig) {
            this.initializeManagerAsync();
        }
    }

    protected onHostDisconnected(): void {
        this.messenger.unsubscribe(WeatherMessage, this.onWeather);

        // Clean up timers when the host disconnects
        if (this.imageRotationTimer) {
            clearInterval(this.imageRotationTimer);
            this.imageRotationTimer = undefined;
        }
    }

    /**
     * Update the controller configuration
     */
    updateConfig(config: BackgroundImageControllerConfig): void {
        const oldConfig = {...this.config};
        this.config = {...this.config, ...config};

        logger.info("Update the BackgroundImageController with new configuration")

        const needFetchNewImage = this.isInitialized;

        // Check if imageSourceConfig changed
        const needsReinitialize = oldConfig.imageSourceConfig !== this.config.imageSourceConfig;

        // If imageSourceConfig changed, reinitialize
        if (needsReinitialize) {
            this.initializeManagerAsync().then(
                () => {
                    if (needFetchNewImage) {
                        this.fetchNewImageAsync(this.currentWeather).catch(error =>
                            this.logger.error('Error fetching image after reinitialization:', error)
                        );
                    }
                }
            ).catch(error =>
                this.logger.error('Error during BackgroundImageManager initialization:', error)
            );
        } else if (oldConfig.backgroundRotationInterval !== this.config.backgroundRotationInterval &&
            this.backgroundImageManager) {
            this.setupImageRotation();
        }
    }

    /**
     * Initialize the background image manager
     */
    private async initializeManagerAsync(): Promise<void> {
        if (this._fetchingImageUrls) return;
        this._fetchingImageUrls = true;

        try {
            // Get the configuration for the BackgroundImageManager
            // Extract only the ImageSourceConfig properties from this.config.imageSourceConfig
            const { backgroundRotationInterval, ...imageSourceConfigProps } = this.config.imageSourceConfig || {};
            const imageSourceConfig: ImageSourceConfig = imageSourceConfigProps.imageSourceId ? imageSourceConfigProps : {
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
                        this.logger.debug('Starting transition for subsequent image');
                        this.handleImageTransition();
                    }

                    // Update the current image URL
                    this._currentImageUrl = newImageUrl;

                    if (!this._previousImageUrl) {
                        // For first image load, still use a transition effect
                        this.logger.debug('Starting transition for first image');
                        this.handleImageTransition();
                    }
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
        if(!this.isInitialized) {
            this.logger.info('BackgroundImageController is not initialized yet, run init before updating weather');

            this.initializeManagerAsync().then(() => {
                this.currentWeather = weather;
                this.fetchNewImageAsync(weather).catch(error =>
                    this.logger.error('Error fetching image after initialization:', error)
                );
            });
        } else if (this.currentWeather !== weather) {
            this.logger.info(`Updating weather condition to: ${weather}`);
            this.currentWeather = weather;

            this.fetchNewImageAsync(weather).catch(error =>
                this.logger.error('Error fetching image after weather update:', error)
            );
        }
    }

    get isInitialized(): boolean {
        return this._currentImageUrl !== '' && this.imageRotationTimer !== undefined;
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

    /**
     * Handle image transition with consistent behavior for both first and subsequent images
     */
    private handleImageTransition(): void {
        this._isTransitioning = true;
        this.host.requestUpdate();

        // Add a small delay to ensure the initial state is rendered
        setTimeout(() => {
            this.applyTransitionEffect();
        }, BackgroundImageController.TRANSITION_DELAY_MS);
    }

    /**
     * Apply transition effect to the container element
     */
    private applyTransitionEffect(): void {
        if (!(this.host instanceof HTMLElement && this.host.shadowRoot)) {
            this.logger.error('Could not access shadow root');
            return;
        }

        const container = this.host.shadowRoot.querySelector('.background-container');
        if (!container) {
            this.logger.error('Could not find background container element');
            return;
        }

        // Add transition class to all images at once via the container
        container.classList.add('active-transition');
        this.logger.debug('Added active-transition class to container');

        // After transition completes, clean up
        setTimeout(() => {
            this.cleanupAfterTransition(container);
        }, BackgroundImageController.TRANSITION_DURATION_MS);
    }

    /**
     * Clean up after transition completes
     */
    private cleanupAfterTransition(container: Element): void {
        // Remove transition classes
        if (container.classList.contains('active-transition')) {
            container.classList.remove('active-transition');
        }

        this._isTransitioning = false;
        this.host.requestUpdate();
        this.logger.debug('Transition completed');
    }
}

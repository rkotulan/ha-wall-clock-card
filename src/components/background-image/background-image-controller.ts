import {ReactiveControllerHost} from 'lit';
import {logger} from '../../utils/logger/logger';
import {BaseController} from '../../utils/controllers';
import {BackgroundImageManager} from '../../image-sources';
import {Weather, TimeOfDay, getCurrentTimeOfDay, ImageSourceConfig} from '../../image-sources';
import {Signal} from "@lit-labs/signals";
import {WeatherSignalProvider, weatherSignal} from "../../signals/weather-signal";

export interface BackgroundImageControllerConfig {
    backgroundRotationInterval?: number;
    imageSourceConfig?: ImageSourceConfig;
}

/**
 * Controller for managing background images
 */
export class BackgroundImageController extends BaseController {
    private backgroundImageManager: BackgroundImageManager = new BackgroundImageManager();
    private imageRotationTimer?: number;
    private config: BackgroundImageControllerConfig;
    private currentWeather: Weather = Weather.All;

    // Image state
    private _currentImageUrl = '';
    private _previousImageUrl = '';
    private _isTransitioning = false;
    private _fetchingImageUrls = false;

    // Signal watcher for weather updates
    private weatherWatcher?: Signal.subtle.Watcher;
    private weatherSignalProvider?: WeatherSignalProvider;

    constructor(host: ReactiveControllerHost, config: BackgroundImageControllerConfig = {}) {
        super(host, 'background-image-controller');
        this.config = config;

        // Default to global signal if no provider is set
        this.setupWeatherWatcher();
    }

    /**
     * Set the weather signal provider for this controller
     */
    setWeatherSignalProvider(provider: WeatherSignalProvider): void {
        this.weatherSignalProvider = provider;

        // Disconnect from previous signal if any
        if (this.weatherWatcher) {
            this.weatherWatcher.unwatch(weatherSignal);
            if (this.weatherSignalProvider) {
                this.weatherWatcher.unwatch(this.weatherSignalProvider.weatherSignal);
            }
        }

        // Setup watcher with the new provider
        this.setupWeatherWatcher();
    }

    /**
     * Setup the weather watcher with the current provider
     */
    private setupWeatherWatcher(): void {
        this.weatherWatcher = new Signal.subtle.Watcher(async () => {
            await 0; // nutné kvůli async restrikci
            const signal = this.weatherSignalProvider ? this.weatherSignalProvider.weatherSignal : weatherSignal;
            const newValue = signal.get();
            if(newValue === undefined) {
                return;
            }

            this.updateWeather(newValue || Weather.All);
            this.logger.info('New signal for weather:', newValue);
            this.weatherWatcher?.watch(signal); // reaktivace watcheru
        });
    }

    protected onHostConnected(): void {
        // Watch the appropriate signal
        const signal = this.weatherSignalProvider ? this.weatherSignalProvider.weatherSignal : weatherSignal;
        this.weatherWatcher?.watch(signal);

        // Lazy inicializace pouze pokud máme konfiguraci
        if (this.config.imageSourceConfig) {
            this.initializeManagerAsync();
        }
    }

    protected onHostDisconnected(): void {
        // Unwatch the appropriate signal
        const signal = this.weatherSignalProvider ? this.weatherSignalProvider.weatherSignal : weatherSignal;
        this.weatherWatcher?.unwatch(signal);

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
                        this._isTransitioning = true;

                        // Request update to apply the transitioning class and show both images
                        this.host.requestUpdate();

                        // Add a small delay to ensure the initial state is rendered
                        setTimeout(() => {
                            this.logger.debug('Starting transition');

                            // Add transition class to container element
                            if (this.host instanceof HTMLElement && this.host.shadowRoot) {
                                const container = this.host.shadowRoot.querySelector('.background-container');
                                if (container) {
                                    // Add transition class to all images at once via the container
                                    container.classList.add('active-transition');
                                    this.logger.debug('Added active-transition class to container');

                                    // After transition completes, clean up
                                    setTimeout(() => {
                                        // Remove transition classes
                                        if (container.classList.contains('active-transition')) {
                                            container.classList.remove('active-transition');
                                        }

                                        this._isTransitioning = false;
                                        this.host.requestUpdate();
                                        this.logger.debug('Transition completed');
                                    }, 1000); // Match the transition duration in CSS
                                } else {
                                    this.logger.error('Could not find background container element');
                                }
                            } else {
                                this.logger.error('Could not access shadow root');
                            }
                        }, 50); // Small delay is sufficient
                    }

                    // Update the current image URL
                    this._currentImageUrl = newImageUrl;

                    if (!this._previousImageUrl) {
                        // If there's no previous image (first load), just update without transition
                        this._isTransitioning = false;
                        this.host.requestUpdate();
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
}

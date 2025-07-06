import { LitElement, html, css, property, customElement, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { ImageSourceConfig, getImageSource, BackgroundImage, TimeOfDay } from './image-sources';
import { WeatherProviderConfig, WeatherData, getWeatherProvider } from './weather-providers';
import { translateWeatherCondition } from './translations';
import './wall-clock-card-editor';

// Interface for sensor configuration
export interface SensorConfig {
  entity: string;
  label?: string;
}

// Interface for tracking image loading status
interface ImageStatus {
  url: string;
  loaded: boolean;
  loading: boolean;
  error: boolean;
}

export interface WallClockConfig {
  timeFormat?: Intl.DateTimeFormatOptions;
  dateFormat?: Intl.DateTimeFormatOptions;
  backgroundOpacity?: number;
  imageSource?: string; // ID of the image source plugin ('none', 'local', 'picsum', etc.)
  imageConfig?: ImageSourceConfig; // Configuration for the image source
  backgroundRotationInterval?: number;
  sensors?: SensorConfig[]; // Multiple sensors
  fontColor?: string; // Font color for all text elements

  // New unified background images structure
  backgroundImages?: BackgroundImage[]; // Array of background images with weather and time-of-day information

  // Legacy properties for backward compatibility
  useOnlineImages?: boolean; // Legacy property, use imageSource instead
  onlineImageSource?: string;
  onlineImageConfig?: ImageSourceConfig;
  sensorEntity?: string; // Single sensor (legacy)
  sensorLabel?: string; // Single sensor label (legacy)

  // Weather forecast settings
  showWeather?: boolean; // Whether to show weather forecast
  weatherProvider?: string; // ID of the weather provider plugin ('openweathermap', etc.)
  weatherConfig?: WeatherProviderConfig; // Configuration for the weather provider
  weatherDisplayMode?: 'current' | 'forecast' | 'both'; // What weather data to display
  weatherForecastDays?: number; // Number of days to show in forecast (1-7)
  weatherTitle?: string; // Custom title for the weather section (default: "Weather")

  // Allow string indexing for dynamic property access
  [key: string]: any;
}

@customElement('wall-clock-card')
export class WallClockCard extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: String }) currentTime = '';
  @property({ type: String }) currentDate = '';
  @property({ type: Object }) config: WallClockConfig = {};
  @property({ type: Number }) currentImageIndex = 0;
  @property({ type: Array }) imageUrls: string[] = []; // All image URLs
  @property({ type: Array }) imageStatuses: ImageStatus[] = []; // Status of each image
  @property({ type: String }) currentImageUrl = ''; // Currently displayed image URL
  @property({ type: Array }) sensorValues: {entity: string, label?: string, value: string}[] = [];
  @property({ type: String }) legacySensorValue = ''; // For backward compatibility
  @property({ type: String }) hours = '';
  @property({ type: String }) minutes = '';
  @property({ type: String }) seconds = '';
  @property({ type: Number }) consecutiveFailures = 0; // Track consecutive image loading failures
  @property({ type: Boolean }) isRetrying = false; // Flag to track if we're in retry mode
  @property({ type: Object }) weatherData?: WeatherData; // Weather data from provider
  @property({ type: Boolean }) weatherLoading = false; // Flag to track if weather data is loading
  @property({ type: Boolean }) weatherError = false; // Flag to track if there was an error loading weather data
  @property({ type: String }) weatherErrorMessage = ''; // Error message if weather data loading failed

  private timer?: number;
  private imageRotationTimer?: number;
  private fetchingImageUrls = false;
  private preloadTimer?: number;
  private weatherUpdateTimer?: number;

  constructor() {
    super();
    this.updateTime();

    // Update the time every second
    this.timer = window.setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Fetch image URLs (not the actual images)
    this.fetchImageUrls();

    // Fetch weather data if enabled
    if (this.config.showWeather) {
      this.fetchWeatherData();

      // Update weather data every 30 minutes (1800000 ms)
      this.weatherUpdateTimer = window.setInterval(() => {
        this.fetchWeatherData();
      }, 1800000);
    }
  }

  private async fetchImageUrls(): Promise<void> {
    if (this.fetchingImageUrls) return;
    this.fetchingImageUrls = true;

    try {
      const urls: string[] = [];

      // Get the image source from config
      const imageSource = this.config.imageSource || 'picsum';

      // Skip image fetching if imageSource is 'none'
      if (imageSource === 'none') {
        console.log('Image source is set to none, skipping image fetching');
        this.imageUrls = [];
        this.imageStatuses = [];
        return;
      }

      // Fetch online image URLs if imageSource is not 'local'
      if (imageSource !== 'local') {
        const onlineUrls = await this.fetchOnlineImageUrls();
        urls.push(...onlineUrls);
      }

      // Fetch local image URLs if available
      const localImages = this.config.backgroundImages;
      if (localImages && localImages.length > 0) {
        const localUrls = await this.fetchLocalImageUrls();
        urls.push(...localUrls);
      }

      // If using local image source, shuffle the array to randomize the order
      if (imageSource === 'local' && urls.length > 0) {
        this.shuffleArray(urls);
        console.log('Shuffled local image URLs for random starting order');
      }

      // Store the URLs and initialize image statuses
      this.imageUrls = urls;
      this.imageStatuses = urls.map(url => ({
        url,
        loaded: false,
        loading: false,
        error: false
      }));

      console.log(`Collected ${urls.length} image URLs for lazy loading`);

      // If we have images, set up rotation and load the first image
      if (urls.length > 0) {
        this.setupImageRotation();
        this.loadCurrentImage();
      }
    } catch (error) {
      console.error('Error fetching image URLs:', error);
    } finally {
      this.fetchingImageUrls = false;
    }
  }

  private async fetchOnlineImageUrls(): Promise<string[]> {
    try {
      // Get the image source ID from config, default to 'picsum'
      // Use imageSource if available, fall back to onlineImageSource for backward compatibility
      const sourceId = this.config.imageSource || this.config.onlineImageSource || 'picsum';

      // Get the image source plugin
      const imageSource = getImageSource(sourceId);

      if (!imageSource) {
        console.error(`Image source '${sourceId}' not found.`);
        return [];
      }

      // Prepare the configuration for the image source
      // Use imageConfig if available, fall back to onlineImageConfig for backward compatibility
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
        ...(this.config.imageConfig || this.config.onlineImageConfig || {}),
      };

      // Fetch image URLs from the image source
      console.log(`Fetching image URLs from ${imageSource.name} with config:`, sourceConfig);
      const fetchedUrls = await imageSource.fetchImages(sourceConfig);

      if (fetchedUrls.length > 0) {
        console.log(`Successfully fetched ${fetchedUrls.length} image URLs from ${imageSource.name}`);
        return fetchedUrls;
      } else {
        console.warn(`Could not fetch any image URLs from ${imageSource.name}.`);
        return [];
      }
    } catch (error) {
      console.error('Error in fetchOnlineImageUrls:', error);
      return [];
    }
  }

  private async fetchLocalImageUrls(): Promise<string[]> {
    try {
      // Get the local image source plugin
      const imageSource = getImageSource('local');

      if (!imageSource) {
        console.error('Local image source not found. This should not happen.');
        return [];
      }

      // Prepare the configuration for the local image source
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
      };

      // If we have backgroundImages structure, use it
      if (this.config.backgroundImages && this.config.backgroundImages.length > 0) {
        sourceConfig.backgroundImages = this.config.backgroundImages;
      } else {
        // No background images configured
        sourceConfig.images = [];
      }

      // Fetch image URLs from the local image source
      console.log('Fetching image URLs from Local Images source with config:', sourceConfig);

      // Always pass weather data if available, the image source will decide how to use it
      const fetchedUrls = this.weatherData
        ? await imageSource.fetchImages(sourceConfig, this.weatherData)
        : await imageSource.fetchImages(sourceConfig);

      if (fetchedUrls.length > 0) {
        console.log(`Successfully fetched ${fetchedUrls.length} image URLs from Local Images source`);
        return fetchedUrls;
      } else {
        console.warn('No local image URLs found in configuration.');
        return [];
      }
    } catch (error) {
      console.error('Error in fetchLocalImageUrls:', error);
      return [];
    }
  }

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private setupImageRotation(): void {
    // Clear any existing timers
    if (this.imageRotationTimer) {
      clearInterval(this.imageRotationTimer);
    }
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
    }

    // If we have image URLs, set up rotation
    if (this.imageUrls.length > 0) {
      this.imageRotationTimer = window.setInterval(() => {
        // For Unsplash, fetch a new image instead of cycling through preloaded ones
        if (this.config.imageSource === 'unsplash') {
          this.fetchNewUnsplashImage();
        } else {
          // For other image sources, move to the next image in the preloaded array
          this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
          this.loadCurrentImage();
        }
      }, (this.config.backgroundRotationInterval || 90) * 1000); // Convert seconds to milliseconds

      // Preload the next image after a short delay (only for non-Unsplash sources)
      if (this.config.imageSource !== 'unsplash') {
        this.scheduleNextImagePreload();
      }
    }
  }

  private async fetchNewUnsplashImage(): Promise<void> {
    try {
      // Get the Unsplash image source plugin
      const imageSource = getImageSource('unsplash');

      if (!imageSource) {
        console.error('Unsplash image source not found. This should not happen.');
        return;
      }

      // Prepare the configuration for the Unsplash image source
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
        ...(this.config.imageConfig || this.config.onlineImageConfig || {}),
        // Set count to 1 to fetch just one new image
        count: 1
      };

      console.log('Fetching new image from Unsplash with config:', sourceConfig);

      // Fetch a single new image from Unsplash
      const fetchedUrls = await imageSource.fetchImages(sourceConfig, this.weatherData);

      if (fetchedUrls.length > 0) {
        console.log('Successfully fetched new image from Unsplash');

        // Create a new image status for the fetched image
        const newImageUrl = fetchedUrls[0];
        const newImageStatus: ImageStatus = {
          url: newImageUrl,
          loaded: false,
          loading: false,
          error: false
        };

        // Load the new image
        console.log(`Loading new Unsplash image: ${newImageUrl}`);
        const img = new Image();
        img.onload = () => {
          console.log(`New Unsplash image loaded successfully: ${newImageUrl}`);
          newImageStatus.loaded = true;
          newImageStatus.loading = false;

          // Update the current image URL
          this.currentImageUrl = newImageUrl;

          // Reset consecutive failures counter on successful load
          this.consecutiveFailures = 0;

          this.requestUpdate();
        };
        img.onerror = () => {
          console.error(`Error loading new Unsplash image: ${newImageUrl}`);
          newImageStatus.error = true;
          newImageStatus.loading = false;

          // If the new image fails to load, try to use an existing image
          if (this.imageUrls.length > 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
            this.loadCurrentImage();
          }
        };

        // Start loading the image
        newImageStatus.loading = true;
        img.src = newImageUrl;
      } else {
        console.warn('Could not fetch new image from Unsplash. Falling back to existing images.');
        // Fall back to the existing image rotation if fetching a new image fails
        if (this.imageUrls.length > 0) {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
          this.loadCurrentImage();
        }
      }
    } catch (error) {
      console.error('Error fetching new Unsplash image:', error);
      // Fall back to the existing image rotation if an error occurs
      if (this.imageUrls.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
        this.loadCurrentImage();
      }
    }
  }

  private loadCurrentImage(): void {
    if (this.imageUrls.length === 0 || this.currentImageIndex >= this.imageUrls.length) {
      return;
    }

    const url = this.imageUrls[this.currentImageIndex];
    const status = this.imageStatuses[this.currentImageIndex];

    // If the image is already loaded or loading, just update the current URL
    if (status.loaded || status.loading) {
      this.currentImageUrl = url;
      this.requestUpdate();
      return;
    }

    // Mark the image as loading
    this.imageStatuses[this.currentImageIndex] = {
      ...status,
      loading: true
    };

    // Load the image
    console.log(`Loading image: ${url}`);
    const img = new Image();
    img.onload = () => {
      console.log(`Image loaded successfully: ${url}`);
      this.imageStatuses[this.currentImageIndex] = {
        ...this.imageStatuses[this.currentImageIndex],
        loaded: true,
        loading: false,
        error: false
      };
      this.currentImageUrl = url;

      // Reset consecutive failures counter on successful load
      this.consecutiveFailures = 0;

      this.requestUpdate();
    };
    img.onerror = () => {
      console.error(`Error loading image: ${url}`);
      this.imageStatuses[this.currentImageIndex] = {
        ...this.imageStatuses[this.currentImageIndex],
        loaded: false,
        loading: false,
        error: true
      };
      // Try to load the next image if this one fails
      this.tryNextImage();
    };
    img.src = url;
  }

  private tryNextImage(): void {
    // Increment the consecutive failures counter
    this.consecutiveFailures++;

    // If we've had too many consecutive failures, stop trying
    const MAX_CONSECUTIVE_FAILURES = 5;
    if (this.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      console.warn(`Too many consecutive image loading failures (${this.consecutiveFailures}). Stopping retry attempts.`);
      // Try to switch to a different image source if available
      this.tryFallbackImageSource();
      return;
    }

    // If we're already in retry mode, don't schedule another retry
    if (this.isRetrying) {
      return;
    }

    // If the current image failed to load, try the next one with a delay
    if (this.imageUrls.length > 1) {
      this.isRetrying = true;

      // Add an exponential backoff delay based on the number of failures
      const delay = Math.min(1000 * Math.pow(2, this.consecutiveFailures - 1), 30000);
      console.log(`Scheduling next image load attempt in ${delay}ms (failure #${this.consecutiveFailures})`);

      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
        this.isRetrying = false;
        this.loadCurrentImage();
      }, delay);
    }
  }

  private tryFallbackImageSource(): void {
    // If we're using an online image source (not 'none' or 'local') and experiencing failures, try to switch to Picsum
    if (this.config.imageSource !== 'none' && this.config.imageSource !== 'local' && this.config.imageSource !== 'picsum') {
      console.log('Switching to Picsum as fallback image source');
      this.config = {
        ...this.config,
        imageSource: 'picsum',
        onlineImageSource: 'picsum', // For backward compatibility
        useOnlineImages: true // For backward compatibility
      };

      // Reset failure counters and fetch new images
      this.consecutiveFailures = 0;
      this.isRetrying = false;
      this.fetchImageUrls();
    }
  }

  private scheduleNextImagePreload(): void {
    // Clear any existing preload timer
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
    }

    // Schedule preloading of the next image
    this.preloadTimer = window.setTimeout(() => {
      this.preloadNextImage();
    }, 5000); // Preload 5 seconds before rotation
  }

  private preloadNextImage(): void {
    if (this.imageUrls.length <= 1) {
      return; // No need to preload if there's only one image
    }

    // Calculate the index of the next image
    const nextIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
    const nextStatus = this.imageStatuses[nextIndex];

    // If the next image is already loaded or loading, do nothing
    if (nextStatus.loaded || nextStatus.loading) {
      return;
    }

    // If we've had too many consecutive failures, don't try to preload
    const MAX_CONSECUTIVE_FAILURES = 5;
    if (this.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      console.warn(`Skipping preload due to too many consecutive failures (${this.consecutiveFailures})`);
      return;
    }

    // Mark the next image as loading
    this.imageStatuses[nextIndex] = {
      ...nextStatus,
      loading: true
    };

    // Preload the next image
    const url = this.imageUrls[nextIndex];
    console.log(`Preloading next image: ${url}`);
    const img = new Image();
    img.onload = () => {
      console.log(`Next image preloaded successfully: ${url}`);
      this.imageStatuses[nextIndex] = {
        ...this.imageStatuses[nextIndex],
        loaded: true,
        loading: false,
        error: false
      };

      // Reset consecutive failures counter on successful preload
      // This helps ensure we're tracking failures across both main loading and preloading
      this.consecutiveFailures = 0;
    };
    img.onerror = () => {
      console.error(`Error preloading next image: ${url}`);
      this.imageStatuses[nextIndex] = {
        ...this.imageStatuses[nextIndex],
        loaded: false,
        loading: false,
        error: true
      };

      // We don't increment consecutiveFailures here because we don't want
      // preload failures to trigger the fallback mechanism directly.
      // The main image loading will handle that if needed.
    };
    img.src = url;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clear all timers when the component is removed
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.imageRotationTimer) {
      clearInterval(this.imageRotationTimer);
    }
    if (this.preloadTimer) {
      clearTimeout(this.preloadTimer);
    }
    if (this.weatherUpdateTimer) {
      clearInterval(this.weatherUpdateTimer);
    }
  }

  /**
   * Fetch weather data from the configured provider
   */
  private async fetchWeatherData(): Promise<void> {
    if (this.weatherLoading || !this.config.showWeather) return;

    this.weatherLoading = true;
    this.weatherError = false;
    this.weatherErrorMessage = '';

    try {
      // Get the weather provider from config, default to openweathermap
      const providerId = this.config.weatherProvider || 'openweathermap';
      const provider = getWeatherProvider(providerId);

      if (!provider) {
        throw new Error(`Weather provider '${providerId}' not found`);
      }

      // Get the weather config from the card config
      const weatherConfig = this.config.weatherConfig || {};

      // Fetch weather data from the provider
      this.weatherData = await provider.fetchWeather(weatherConfig);

      console.log(`Fetched weather data from ${provider.name}:`, this.weatherData);
    } catch (error) {
      this.weatherError = true;
      this.weatherErrorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error fetching weather data:', error);
    } finally {
      this.weatherLoading = false;
    }
  }

  // Required for Home Assistant custom cards
  static getConfigElement() {
    return document.createElement('wall-clock-card-editor');
  }

  // Return the card size (1 unit = 50px height)
  getCardSize(): number {
    return 4; // Approximately 200px height
  }

  // Required for Home Assistant custom cards
  static getStubConfig(): WallClockConfig {
    return {
      timeFormat: { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      },
      dateFormat: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    };
  }

  setConfig(config: WallClockConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    // Handle legacy properties
    // If useOnlineImages is set but imageSource is not, convert it to imageSource
    let imageSource = config.imageSource;
    if (imageSource === undefined) {
      if (config.useOnlineImages === true) {
        imageSource = config.onlineImageSource || 'picsum';
      } else if (config.useOnlineImages === false) {
        // If useOnlineImages is false and there are backgroundImages, use 'local'
        // Otherwise, use 'none'
        if (config.backgroundImages && config.backgroundImages.length > 0) {
          imageSource = 'local';
        } else {
          imageSource = 'none';
        }
      } else {
        // Default to 'none' if neither is set
        imageSource = 'none';
      }
    }

    // Use imageConfig if available, fall back to onlineImageConfig for backward compatibility
    let imageConfig: ImageSourceConfig = config.imageConfig || config.onlineImageConfig || {};

    // Convert legacy string array backgroundImages to the new structure if needed
    if (Array.isArray(config.backgroundImages) && 
        config.backgroundImages.length > 0 && 
        typeof config.backgroundImages[0] === 'string') {
      // Create a new array of BackgroundImage objects
      const backgroundImages: BackgroundImage[] = [];
      for (const img of config.backgroundImages) {
        if (typeof img === 'string') {
          backgroundImages.push({
            url: img,
            weather: 'all',
            timeOfDay: TimeOfDay.Unspecified
          });
        }
      }
      // Update the config with the new structure
      config.backgroundImages = backgroundImages;
    }

    this.config = {
      ...config,
      timeFormat: config.timeFormat || { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      },
      dateFormat: config.dateFormat || {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      backgroundOpacity: config.backgroundOpacity !== undefined ? config.backgroundOpacity : 0.3,
      imageSource,
      imageConfig,
      useOnlineImages: imageSource !== 'none' && imageSource !== 'local',
      onlineImageSource: imageSource,
      onlineImageConfig: imageConfig,
      backgroundRotationInterval: config.backgroundRotationInterval || 90,
      sensors: config.sensors || [],
      sensorEntity: config.sensorEntity || '',
      sensorLabel: config.sensorLabel || '',
      fontColor: config.fontColor || '#FFFFFF' // Default to white
    };

    // For backward compatibility: if sensorEntity is set but no sensors array,
    // create a sensors array with the legacy sensor
    if (this.config.sensorEntity && (!this.config.sensors || this.config.sensors.length === 0)) {
      this.config.sensors = [{
        entity: this.config.sensorEntity,
        label: this.config.sensorLabel
      }];
    }

    // Reset image-related properties when config changes
    this.currentImageIndex = 0;
    this.imageUrls = [];
    this.imageStatuses = [];
    this.currentImageUrl = '';

    // Fetch new image URLs
    this.fetchImageUrls();

    // Update the time
    this.updateTime();

    // Update sensor value if entity is configured
    if (this.hass && this.config.sensorEntity) {
      this.updateSensorValue();
    }
  }

  // Update when hass changes to get latest sensor values
  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('hass')) {
      // Check if we have any sensors to update
      const hasSensors = (this.config.sensors && this.config.sensors.length > 0) || this.config.sensorEntity;
      if (hasSensors) {
        this.updateSensorValue();
      }
    }
  }

  // Update the sensor values from hass
  private updateSensorValue(): void {
    if (!this.hass) return;

    // Clear previous values
    this.sensorValues = [];

    // Handle new sensors array if present
    if (this.config.sensors && this.config.sensors.length > 0) {
      this.config.sensors.forEach(sensorConfig => {
        if (sensorConfig.entity && this.hass!.states[sensorConfig.entity]) {
          const state = this.hass!.states[sensorConfig.entity];
          let value = state.state;

          // If the entity has a unit_of_measurement attribute, append it
          if (state.attributes && state.attributes.unit_of_measurement) {
            value += ` ${state.attributes.unit_of_measurement}`;
          }

          this.sensorValues.push({
            entity: sensorConfig.entity,
            label: sensorConfig.label,
            value: value
          });
        } else if (sensorConfig.entity) {
          // Entity not found or unavailable
          this.sensorValues.push({
            entity: sensorConfig.entity,
            label: sensorConfig.label,
            value: 'unavailable'
          });
        }
      });
    }

    // Handle legacy sensorEntity for backward compatibility
    if (this.config.sensorEntity && this.hass.states[this.config.sensorEntity]) {
      const state = this.hass.states[this.config.sensorEntity];
      let value = state.state;

      // If the entity has a unit_of_measurement attribute, append it
      if (state.attributes && state.attributes.unit_of_measurement) {
        value += ` ${state.attributes.unit_of_measurement}`;
      }

      this.legacySensorValue = value;

      // If no new sensors were configured, add the legacy sensor to the array
      if (this.sensorValues.length === 0) {
        this.sensorValues.push({
          entity: this.config.sensorEntity,
          label: this.config.sensorLabel,
          value: value
        });
      }
    } else if (this.config.sensorEntity) {
      this.legacySensorValue = 'unavailable';

      // If no new sensors were configured, add the legacy sensor to the array
      if (this.sensorValues.length === 0) {
        this.sensorValues.push({
          entity: this.config.sensorEntity,
          label: this.config.sensorLabel,
          value: 'unavailable'
        });
      }
    }
  }

  updateTime(): void {
    const now = new Date();

    // Format time with configurable format
    this.currentTime = now.toLocaleTimeString([], this.config.timeFormat);

    // Set hours, minutes, and seconds separately
    this.hours = now.getHours().toString().padStart(2, '0');
    this.minutes = now.getMinutes().toString().padStart(2, '0');
    this.seconds = now.getSeconds().toString().padStart(2, '0');

    // Format date with configurable format
    this.currentDate = now.toLocaleDateString([], this.config.dateFormat);
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background-color: var(--card-background-color, var(--primary-background-color, #111));
        color: var(--primary-text-color, #fff);
        font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
        position: relative;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 4px);
        padding: 0px;
        box-sizing: border-box;
      }

      ha-card {
        width: 100%;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        z-index: 2;
        border-radius: var(--ha-card-border-radius, 4px);
      }


      .clock {
        font-size: 12rem;
        line-height: 10rem;
        font-weight: 300;
        text-align: center;
        z-index: 3;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .hours-minutes {
        font-size: 1em;
        line-height: 1;
      }

      .seconds {
        font-size: 0.5em;
        font-weight: 400;
        line-height: 1;
        vertical-align: top;
        margin-left: 0.1em;
        margin-top: 0.1em;
      }

      .date {
        font-size: 4rem;
        font-weight: 400;
        text-align: center;
        margin-top: 0.2rem;
        opacity: 1;
        z-index: 3;
        position: relative;
      }

      .sensor-container {
        position: absolute;
        top: 16px;
        left: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 4;
        max-width: 40%;
        max-height: 60%;
        overflow-y: auto;
        padding-right: 8px;
      }

      .sensor-item {
        margin-bottom: 16px;
        width: 100%;
      }

      .sensor-label {
        font-size: 1.5rem;
        font-weight: 300;
        opacity: 0.8;
      }

      .sensor-value {
        font-size: 2.5rem;
        font-weight: 400;
      }

      /* Weather display styles */
      .weather-container {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        z-index: 4;
        max-width: 40%;
        max-height: 60%;
        overflow-y: auto;
        padding-left: 8px;
      }

      .weather-title {
        font-size: 1.5rem;
        font-weight: 300;
        opacity: 0.8;
        text-align: right;
      }

      .weather-current {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 16px;
      }

      .weather-temp-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }

      .weather-temp {
        font-size: 2.5rem;
        line-height: 2.5rem;
        font-weight: 400;
      }

      .weather-condition {
        font-size: 1.5rem;
        font-weight: 300;
        opacity: 0.8;
      }

      .weather-icon {
        width: 50px;
        height: 50px;
        margin-left: 8px;
      }

      .weather-forecast {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .forecast-day {
        display: flex;
        align-items: center;
      }

      .forecast-date {
        font-size: 1.4rem;
        font-weight: 300;
        margin-right: 8px;
        opacity: 0.8;
      }

      .forecast-icon {
        width: 50px;
        height: 50px;
        margin: 0 8px;
      }

      .forecast-temp {
        font-size: 1.4rem;
        font-weight: 400;
      }

      .forecast-condition {
        font-size: 0.9rem;
        margin-top: 0.2rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }

      .weather-error {
        color: #f44336;
        font-size: 1rem;
      }

      /* Responsive adjustments */
      @media (min-width: 900px) {
        .clock {
          font-size: 16rem;
          line-height: 14rem;
        }

        .date {
          font-size: 6rem;
          line-height: 5rem;
        }

        .weather-temp {
          font-size: 3rem;
          line-height: 3rem;
        }

        .weather-icon {
          width: 60px;
          height: 60px;
        }
      }

      @media (min-width: 1280px) {
        .clock {
          font-size: 18rem;
          line-height: 14rem;
        }

        .date {
          font-size: 6rem;
        }

        .weather-temp {
          font-size: 3rem;
          line-height: 3rem;
        }

        .weather-icon {
          width: 60px;
          height: 60px;
        }
      }
    `;
  }

  render(): TemplateResult {
    return html`
      <ha-card style="color: ${this.config.fontColor};">
        ${this.currentImageUrl ? 
          html`
            <img 
              class="background-image" 
              src="${this.currentImageUrl}" 
              @load="${() => console.log('Background image rendered successfully:', this.currentImageUrl)}"
              @error="${(e: Event) => console.error('Error rendering background image:', this.currentImageUrl, e)}"
            >
            <div 
              class="background-overlay" 
              style="opacity: ${this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.5};"
            ></div>
          ` : 
          ''
        }
        ${this.sensorValues.length > 0 ? 
          html`<div class="sensor-container" style="color: ${this.config.fontColor};">
            ${this.sensorValues.map(sensor => html`
              <div class="sensor-item">
                ${sensor.label ? 
                  html`<div class="sensor-label" style="color: ${this.config.fontColor};">${sensor.label}</div>` : 
                  ''
                }
                <div class="sensor-value" style="color: ${this.config.fontColor};">${sensor.value}</div>
              </div>
            `)}
          </div>` : 
          ''
        }
        ${this.config.showWeather && this.weatherData ? 
          html`<div class="weather-container" style="color: ${this.config.fontColor};">
            ${this.renderWeatherContent()}
          </div>` : 
          ''
        }
        <div class="clock" style="color: ${this.config.fontColor};">
          <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
          <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
        </div>
        <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
      </ha-card>
    `;
  }

  /**
   * Render weather content based on display mode
   */
  private renderWeatherContent(): TemplateResult {
    if (this.weatherError) {
      return html`<div class="weather-error">${this.weatherErrorMessage}</div>`;
    }

    if (!this.weatherData) {
      return html`<div class="weather-loading">Loading weather data...</div>`;
    }

    const displayMode = this.config.weatherDisplayMode || 'both';
    const forecastDays = this.config.weatherForecastDays || 3;
    const weatherTitle = this.config.weatherTitle || 'Weather';

    // Limit forecast days to available data (max 7 days)
    const limitedForecastDays = Math.min(forecastDays, this.weatherData.daily.length);

    return html`
      <div class="weather-title" style="color: ${this.config.fontColor};">${weatherTitle}</div>

      ${(displayMode === 'current' || displayMode === 'both') ? 
        html`
          <div class="weather-current">
            <div class="weather-temp-container">
              <img class="weather-icon" src="${this.weatherData.current.icon}" alt="${this.weatherData.current.condition}">
              <div class="weather-temp">${Math.round(this.weatherData.current.temperature)}°</div>              
            </div>
            <div class="weather-condition">${translateWeatherCondition(this.weatherData.current.condition, this.config.weatherConfig?.language || 'cs')}</div>
          </div>
        ` : 
        ''
      }

      ${(displayMode === 'forecast' || displayMode === 'both') ? 
        html`
          <div class="weather-forecast">
            ${this.weatherData.daily.slice(0, limitedForecastDays).map(day => html`
              <div class="forecast-day">
                <div class="forecast-date">${this.formatForecastDate(day.date)}</div>
                <img class="forecast-icon" src="${day.icon}" alt="${day.condition}">
                <div class="forecast-temp">${Math.round(day.temperatureMin)}° - ${Math.round(day.temperatureMax)}°</div>
              </div>
            `)}
          </div>
        ` : 
        ''
      }
    `;
  }

  /**
   * Format a date for display in the forecast
   */
  private formatForecastDate(date: Date): string {
    // Get day name in Czech or English based on language setting
    const language = this.config.weatherConfig?.language || 'cs';

    // Format: "Mon", "Tue", etc.
    return date.toLocaleDateString(language === 'cs' ? 'cs-CZ' : 'en-US', { weekday: 'short' });
  }
}

// Add card to window for type checking
declare global {
  interface Window {
    customCards: any[];
  }
}

// Add card to window.customCards
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'wall-clock-card',
  name: 'Wall Clock Card',
  description: 'A card that displays a clock with seconds and the current date',
});

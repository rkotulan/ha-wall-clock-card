import { LitElement, html, css, property, customElement, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { ImageSourceConfig, getImageSource, BackgroundImage, TimeOfDay, Weather, getCurrentTimeOfDay } from './image-sources';
import { WeatherProviderConfig, WeatherData, getWeatherProvider } from './weather-providers';
import { 
  TransportationConfig, 
  TransportationData, 
  TransportationDeparture,
  getTransportationProvider 
} from './transportation-providers';
import { translate, loadTranslations, formatDate, formatTime, formatDateTime } from './lokalify';
import './wall-clock-card-editor';

// Interface for sensor configuration
export interface SensorConfig {
  entity: string;
  label?: string;
}

// Legacy interfaces for backward compatibility
export interface StopConfig {
  stopId: number;
  postId: number;
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
  language?: string; // Language for translations
  timeZone?: string; // Time zone for clock (e.g., 'America/New_York')

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
  weatherUpdateInterval?: number; // Interval in seconds to update weather data (minimum: 60)

  // Transportation departures settings
  enableTransportation?: boolean; // Whether to show transportation departures
  transportation?: TransportationConfig; // Configuration for transportation departures
  transportationUpdateInterval?: number; // Interval in seconds to update transportation data (minimum: 60)

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
  @property({ type: String }) ampm = ''; // AM/PM indicator for 12-hour format
  @property({ type: Number }) consecutiveFailures = 0; // Track consecutive image loading failures
  @property({ type: Boolean }) isRetrying = false; // Flag to track if we're in retry mode
  @property({ type: Object }) weatherData?: WeatherData; // Weather data from provider
  @property({ type: Boolean }) weatherLoading = false; // Flag to track if weather data is loading
  @property({ type: Boolean }) weatherError = false; // Flag to track if there was an error loading weather data
  @property({ type: String }) weatherErrorMessage = ''; // Error message if weather data loading failed
  @property({ type: Object }) transportationData: TransportationData = { departures: [], loading: false }; // Transportation data
  @property({ type: Date }) lastTransportationUpdate?: Date; // Last time transportation data was updated
  @property({ type: Boolean }) transportationDataLoaded = false; // Whether transportation data has been loaded (for on-demand loading)

  private timer?: number;
  private imageRotationTimer?: number;
  private fetchingImageUrls = false;
  private preloadTimer?: number;
  private weatherUpdateTimer?: number;
  private transportationUpdateTimer?: number;
  private transportationAutoHideTimer?: number;

  constructor() {
    super();

    // Display styled console info with version
    console.info(
      "%c WALL-CLOCK-CARD %c 1.19.4 ", 
      "color: white; background: #3498db; font-weight: 700;", 
      "color: #3498db; background: white; font-weight: 700;"
    );

    this.updateTime();

    // Update the time every second
    this.timer = window.setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.initConnectCallback();
  }

  async initConnectCallback(): Promise<void> {
    // Load translations for all supported languages
    try {
      await loadTranslations();
      console.log('[wall-clock] Loaded translations for all languages');
    } catch (error) {
      console.error('[wall-clock] Error loading translations:', error);
    }

    // Fetch weather data first if enabled
    if (this.config.showWeather) {
      await this.fetchWeatherData();

      // Get configured weather update interval or default to 30 minutes (1800 seconds)
      let weatherInterval = this.config.weatherUpdateInterval || 1800;

      // Ensure minimum interval of 60 seconds
      weatherInterval = Math.max(weatherInterval, 60);

      // Convert to milliseconds
      const weatherIntervalMs = weatherInterval * 1000;

      console.log(`[wall-clock] Setting weather update interval to ${weatherInterval} seconds`);

      // Update weather data at the configured interval
      this.weatherUpdateTimer = window.setInterval(() => {
        // Use a self-executing async function to allow await
        (async () => {
          try {
            await this.fetchWeatherData();
          } catch (error) {
            console.error('[wall-clock] Error in weather update interval:', error);
          }
        })();
      }, weatherIntervalMs);
    }

    // Fetch image URLs (not the actual images)
    await this.fetchImageUrls();

    // Fetch transportation data if enabled and not on-demand
    if (this.config.transportation) {
      // Only fetch data automatically if on-demand loading is not enabled
      if (!this.config.transportation?.onDemand) {
        await this.fetchTransportationData();
        this.transportationDataLoaded = true;

        // Get configured transportation update interval or default to 60 seconds
        let transportationInterval = this.config.transportationUpdateInterval || 60;

        // Ensure minimum interval of 60 seconds
        transportationInterval = Math.max(transportationInterval, 60);

        // Convert to milliseconds
        const transportationIntervalMs = transportationInterval * 1000;

        console.log(`[wall-clock] Setting transportation update interval to ${transportationInterval} seconds`);

        // Update transportation data at the configured interval
        this.transportationUpdateTimer = window.setInterval(() => {
          // Use a self-executing async function to allow await
          (async () => {
            try {
              await this.fetchTransportationData();
            } catch (error) {
              console.error('[wall-clock] Error in transportation update interval:', error);
            }
          })();
        }, transportationIntervalMs);
      } else {
        console.log('[wall-clock] Transportation on-demand loading is enabled. Data will be loaded when requested.');
      }
    }
  }

  private async fetchImageUrls(): Promise<void> {
    if (this.fetchingImageUrls) return;
    this.fetchingImageUrls = true;

    try {
      const urls: string[] = [];

      // Get the image source from config
      const imageSourceId = this.config.imageSource || 'picsum';

      // Skip image fetching if imageSource is 'none'
      if (imageSourceId === 'none') {
        console.log('[wall-clock] Image source is set to none, skipping image fetching');
        this.imageUrls = [];
        this.imageStatuses = [];
        return;
      }

      // Get the image source plugin
      const imageSource = getImageSource(imageSourceId);

      if (!imageSource) {
        console.error(`[wall-clock] Image source '${imageSourceId}' not found.`);
        return;
      }

      // Prepare the configuration for the image source
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
        ...(this.config.imageConfig || this.config.onlineImageConfig || {}),
      };

      // If we have backgroundImages, add them to the config
      if (this.config.backgroundImages && this.config.backgroundImages.length > 0) {
        sourceConfig.backgroundImages = this.config.backgroundImages;
      }

      // Get the current weather condition and time of day
      let currentWeather: Weather = Weather.ClearSky;
      let currentTimeOfDay: TimeOfDay = TimeOfDay.Day;

      if (this.weatherData && this.weatherData.current) {
        // Use the conditionUnified property if available, otherwise use a default value
        currentWeather = this.weatherData.current.conditionUnified || Weather.ClearSky;

        // Determine time of day using the utility function
        currentTimeOfDay = getCurrentTimeOfDay();
      }

      console.log(`[wall-clock] Current weather: ${currentWeather}, time of day: ${currentTimeOfDay}`);

      // Get a single image URL - no retry or fallback
      try {
        const imageUrl = await imageSource.GetNextImageUrl(sourceConfig, currentWeather, currentTimeOfDay);
        if (imageUrl) {
          urls.push(imageUrl);
          console.log(`[wall-clock] Got image URL: ${imageUrl}`);
        } else {
          console.log('[wall-clock] No image URL returned, will try again in next cycle');
        }
      } catch (err) {
        console.warn('[wall-clock] Failed to get image URL, will try again in next cycle', err);
      }

      // If using local or sensor image source, shuffle the array to randomize the order
      if ((imageSourceId === 'local' || imageSourceId === 'sensor') && urls.length > 0) {
        this.shuffleArray(urls);
        console.log(`[wall-clock] Shuffled ${imageSourceId} image URLs for random starting order`);
      }

      // Store the URLs and initialize image statuses
      this.imageUrls = urls;
      this.imageStatuses = urls.map(url => ({
        url,
        loaded: false,
        loading: false,
        error: false
      }));

      console.log(`[wall-clock] Collected ${urls.length} image URLs for lazy loading`);

      // If we have images, set up rotation and load the first image
      if (urls.length > 0) {
        this.setupImageRotation();
        this.loadCurrentImage();
      }
    } catch (error) {
      console.error('[wall-clock] Error fetching image URLs:', error);
    } finally {
      this.fetchingImageUrls = false;
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
          // Use a self-executing async function to allow await
          (async () => {
            try {
              await this.fetchNewUnsplashImage();
            } catch (error) {
              console.error('[wall-clock] Error in image rotation interval for Unsplash:', error);
            }
          })();
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
        console.error('[wall-clock] Unsplash image source not found. This should not happen.');
        return;
      }

      // Prepare the configuration for the Unsplash image source
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
        ...(this.config.imageConfig || this.config.onlineImageConfig || {})
      };

      // Get the current weather condition and time of day
      let currentWeather: Weather = Weather.ClearSky;
      let currentTimeOfDay: TimeOfDay = TimeOfDay.Day;

      if (this.weatherData && this.weatherData.current) {
        // Use the conditionUnified property if available, otherwise use a default value
        currentWeather = this.weatherData.current.conditionUnified || Weather.ClearSky;

        // Determine time of day using the utility function
        currentTimeOfDay = getCurrentTimeOfDay();
      }

      // Log the image fetch with weather information
      console.log(`[wall-clock] Fetching new image from Unsplash with weather: ${currentWeather}, time of day: ${currentTimeOfDay}`);

      // Get a single new image URL from Unsplash using GetNextImageUrl
      const newImageUrl = await imageSource.GetNextImageUrl(sourceConfig, currentWeather, currentTimeOfDay);

      if (newImageUrl) {
        console.log(`[wall-clock] Successfully fetched new image from Unsplash: ${newImageUrl}`);

        // Create a new image status for the fetched image
        const newImageStatus: ImageStatus = {
          url: newImageUrl,
          loaded: false,
          loading: false,
          error: false
        };

        // Load the new image
        console.log(`[wall-clock] Loading new Unsplash image: ${newImageUrl}`);
        const img = new Image();
        img.onload = () => {
          console.log(`[wall-clock] New Unsplash image loaded successfully: ${newImageUrl}`);
          newImageStatus.loaded = true;
          newImageStatus.loading = false;

          // Update the current image URL
          this.currentImageUrl = newImageUrl;

          // Reset consecutive failures counter on successful load
          this.consecutiveFailures = 0;

          this.requestUpdate();
        };
        img.onerror = () => {
          console.error(`[wall-clock] Error loading new Unsplash image: ${newImageUrl}`);
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
        console.warn('[wall-clock] Could not fetch new image from Unsplash. Falling back to existing images.');
        // Fall back to the existing image rotation if fetching a new image fails
        if (this.imageUrls.length > 0) {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
          this.loadCurrentImage();
        }
      }
    } catch (error) {
      console.error('[wall-clock] Error fetching new Unsplash image:', error);
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
    console.log(`[wall-clock] Loading image: ${url}`);
    const img = new Image();
    img.onload = () => {
      console.log(`[wall-clock] Image loaded successfully: ${url}`);
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
      console.error(`[wall-clock] Error loading image: ${url}`);
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
      console.warn(`[wall-clock] Too many consecutive image loading failures (${this.consecutiveFailures}). Stopping retry attempts.`);
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
      console.log(`[wall-clock] Scheduling next image load attempt in ${delay}ms (failure #${this.consecutiveFailures})`);

      setTimeout(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
        this.isRetrying = false;
        this.loadCurrentImage();
      }, delay);
    }
  }

  private async tryFallbackImageSource(): Promise<void> {
    // If we're using an online image source (not 'none' or 'local') and experiencing failures, try to switch to Picsum
    if (this.config.imageSource !== 'none' && this.config.imageSource !== 'local' && this.config.imageSource !== 'picsum') {
      console.log('[wall-clock] Switching to Picsum as fallback image source');
      this.config = {
        ...this.config,
        imageSource: 'picsum',
        onlineImageSource: 'picsum', // For backward compatibility
        useOnlineImages: true // For backward compatibility
      };

      // Reset failure counters and fetch new images
      this.consecutiveFailures = 0;
      this.isRetrying = false;
      await this.fetchImageUrls();
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
    console.log(`[wall-clock] Preloading next image: ${url}`);
    const img = new Image();
    img.onload = () => {
      console.log(`[wall-clock] Next image preloaded successfully: ${url}`);
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
      console.error(`[wall-clock] Error preloading next image: ${url}`);
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
    if (this.transportationUpdateTimer) {
      clearInterval(this.transportationUpdateTimer);
    }
    if (this.transportationAutoHideTimer) {
      clearTimeout(this.transportationAutoHideTimer);
    }
  }

  /**
   * Fetch transportation data from the configured provider
   */
  private async fetchTransportationData(): Promise<void> {
    if (!this.config.transportation || this.config.enableTransportation === false) return;

    // Mark as loading
    this.transportationData = {
      ...this.transportationData,
      loading: true,
      error: undefined
    };

    try {
      const transportationConfig = this.config.transportation as TransportationConfig;

      // Default to IDSJMK provider if not specified
      if (!transportationConfig.provider) {
        transportationConfig.provider = 'idsjmk';
      }

      // Get the transportation provider
      const provider = getTransportationProvider(transportationConfig.provider);

      if (!provider) {
        throw new Error(`Transportation provider '${transportationConfig.provider}' not found`);
      }

      // Convert stops to the format expected by the provider
      const stops = transportationConfig.stops.map(stop => ({
        stopId: stop.stopId,
        postId: stop.postId,
        name: stop.name // Pass the custom name if provided
      }));

      // Fetch transportation data from the provider
      const providerConfig = transportationConfig.providerConfig || {};
      // Include maxDepartures in the provider config if it's defined in transportationConfig
      if (transportationConfig.maxDepartures !== undefined) {
        providerConfig.maxDepartures = transportationConfig.maxDepartures;
      }
      this.transportationData = await provider.fetchTransportation(providerConfig, stops);

      // Update the last update timestamp
      this.lastTransportationUpdate = new Date();

      console.log(`[wall-clock] Fetched transportation data from ${provider.name}:`, this.transportationData);
    } catch (error) {
      console.error('[wall-clock] Error fetching transportation data:', error);
      this.transportationData = {
        departures: [],
        error: error instanceof Error ? error.message : String(error),
        loading: false
      };
    }
  }

  /**
   * Fetch weather data from the configured provider
   */
  private async fetchWeatherData(): Promise<void> {
    if (this.weatherLoading || !this.config.showWeather) return;

    console.log(`[wall-clock] Begin fetch weather data`);

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

      // Get the weather config from the card config and ensure it's properly processed
      let weatherConfig = provider.getDefaultConfig();

      if (this.config.weatherConfig) {
        // Create a new object to avoid reference issues
        weatherConfig = { ...weatherConfig, ...this.config.weatherConfig };

        // Ensure units is properly set if specified
        if (this.config.weatherConfig.units) {
          weatherConfig.units = this.config.weatherConfig.units;
          console.log(`[wall-clock] Using weather units: ${weatherConfig.units}`);
        }
      }

      // Fetch weather data from the provider
      this.weatherData = await provider.fetchWeather(weatherConfig);

      console.log(`[wall-clock] Fetched weather data from ${provider.name}:`, this.weatherData);
    } catch (error) {
      this.weatherError = true;
      this.weatherErrorMessage = error instanceof Error ? error.message : String(error);
      console.error('[wall-clock] Error fetching weather data:', error);
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

    this.initAfterSetConfig(config);
  }

  async initAfterSetConfig(config: WallClockConfig): Promise<void> {

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
            weather: Weather.All,
            timeOfDay: TimeOfDay.Unspecified
          });
        }
      }
      // Update the config with the new structure
      config.backgroundImages = backgroundImages;
    }

    // Ensure timeFormat is properly processed
    let timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit' as const,
      minute: '2-digit' as const,
      second: '2-digit' as const,
      hour12: false
    };

    if (config.timeFormat) {
      // Create a new object to avoid reference issues
      timeFormat = { ...timeFormat, ...config.timeFormat };

      // Ensure hour12 is properly set if specified
      if (config.timeFormat.hour12 !== undefined) {
        timeFormat.hour12 = Boolean(config.timeFormat.hour12);
      }
    }

    // Ensure dateFormat is properly processed
    let dateFormat: Intl.DateTimeFormatOptions = {
      weekday: 'long' as const,
      year: 'numeric' as const,
      month: 'long' as const,
      day: 'numeric' as const
    };

    if (config.dateFormat) {
      // Create a new object to avoid reference issues
      dateFormat = { ...dateFormat, ...config.dateFormat };

      // Explicitly handle the case when year is undefined
      if (config.dateFormat.year === undefined) {
        dateFormat.year = undefined;
      }
    }

    // Try to get time zone from config, then from Home Assistant, then default to browser's time zone
    let timeZone = config.timeZone;
    if (!timeZone && this.hass && this.hass.config && this.hass.config.time_zone) {
      timeZone = this.hass.config.time_zone;
    }

    this.config = {
      ...config,
      timeFormat,
      dateFormat,
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
      fontColor: config.fontColor || '#FFFFFF', // Default to white
      timeZone: timeZone
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

    // Fetch weather data first if enabled
    if (this.config.showWeather) {
      await this.fetchWeatherData();
    }

    // Fetch new image URLs
    await this.fetchImageUrls();

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
    const language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';
    const timeZone = this.config.timeZone;

    // Format time with configurable format
    this.currentTime = formatTime(now, language, this.config.timeFormat || {}, timeZone);

    // Set hours, minutes, and seconds separately
    // Use the time in the specified time zone
    let hours, minutes, seconds;

    if (timeZone) {
      // Get time components in the specified time zone
      const timeString = formatDateTime(now, language, { 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: false
      }, timeZone);

      // Parse the time string (format: HH:MM:SS)
      const timeParts = timeString.split(':');
      hours = parseInt(timeParts[0], 10);
      minutes = parseInt(timeParts[1], 10);
      seconds = parseInt(timeParts[2], 10);
    } else {
      // Use local time if no time zone is specified
      hours = now.getHours();
      minutes = now.getMinutes();
      seconds = now.getSeconds();
    }

    // Handle 12-hour format if configured
    if (this.config.timeFormat?.hour12) {
      // Convert to 12-hour format
      const isPM = hours >= 12;
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
      this.ampm = isPM ? 'pm' : 'am';
    } else {
      this.ampm = ''; // Clear AM/PM for 24-hour format
    }

    this.hours = hours.toString().padStart(2, '0');
    this.minutes = minutes.toString().padStart(2, '0');
    this.seconds = seconds.toString().padStart(2, '0');

    // Format date with configurable format
    let formattedDate = formatDate(now, language, this.config.dateFormat || {}, timeZone);

    // Add comma after the day if it's not already there
    // This regex looks for a number (the day) followed by a space and then a letter (start of month)
    // and replaces it with the day, a comma, a space, and then the month
    formattedDate = formattedDate.replace(/(\d+)(\s+)([A-Za-z])/, '$1,$2$3');

    this.currentDate = formattedDate;
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
        z-index: 0;
        border-radius: var(--ha-card-border-radius, 4px);
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        z-index: 1;
        border-radius: var(--ha-card-border-radius, 4px);
      }


      .clock {
        font-size: 12rem;
        line-height: 10rem;
        font-weight: 300;
        text-align: center;
        z-index: 2;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }

      .hours-minutes {
        font-size: 1em;
        line-height: 1;
      }

      .seconds-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 0.1em;
        margin-top: 0.1em;
      }

      .seconds {
        font-size: 0.5em;
        font-weight: 400;
        line-height: 1;
        vertical-align: top;
      }

      .ampm {
        font-size: 0.3em;
        font-weight: 400;
        line-height: 1;
        text-transform: lowercase;
        opacity: 0.6;
      }

      .date {
        font-size: 4rem;
        font-weight: 400;
        text-align: center;
        margin-top: 0.2rem;
        opacity: 1;
        z-index: 2;
        position: relative;
      }

      .sensor-container {
        position: absolute;
        top: 16px;
        left: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        z-index: 3;
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
        z-index: 3;
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
        align-items: flex-start;
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
        width: 2rem;
        text-align: right;
      }

      .forecast-icon {
        width: 50px;
        height: 50px;
        margin: 0 8px;
      }

      .forecast-temp {
        font-size: 1.4rem;
        font-weight: 400;
        width: 80px;
        text-align: right;
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

      /* Transportation styles */
      .transportation-container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 3;
        padding: 8px 16px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
      }

      .transportation-on-demand-button {
        position: absolute;
        bottom: 16px;
        left: 16px;
        width: 144px;
        height: 144px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 3;
        transition: all 0.3s ease;
      }

      .transportation-on-demand-button:hover {
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(1.1);
      }

      .transportation-on-demand-button svg {
        width: 72px;
        height: 72px;
        fill: white;
      }

      .transportation-title {
        font-size: 1.5rem;
        font-weight: 300;
        opacity: 0.8;
        margin-bottom: 8px;
      }

      .transportation-departures {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 16px;
      }

      .stop-group {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      /* Responsive layout for transportation stops */
      @media (max-width: 480px) {
        /* Force single column on very small screens */
        .transportation-departures {
          flex-direction: column;
        }

        .stop-group {
          width: 100%;
        }
      }

      @media (min-width: 481px) and (max-width: 599px) {
        /* Allow 2 columns on slightly larger screens if they fit */
        .transportation-departures {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .stop-group {
          width: calc(50% - 8px);
        }
      }

      @media (min-width: 600px) {
        .transportation-departures {
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .stop-group {
          width: calc(50% - 8px);
        }
      }

      /* 3 columns for wider screens */
      @media (min-width: 900px) and (max-width: 1179px) {
        .stop-group {
          width: calc(33% - 8px);
        }
      }

      /* 3 columns for 1180px resolution as requested */
      @media (min-width: 1180px) and (max-width: 1399px) {
        .stop-group {
          width: calc(33% - 8px);
        }
      }

      /* 4 columns for very wide screens */
      @media (min-width: 1400px) {
        .stop-group {
          width: calc(25% - 8px);
        }
      }

      .stop-name {
        font-size: 1.3rem;
        font-weight: 500;
        text-align: left;
        width: 100%;
        margin-top: 0;
        margin-bottom: 8px;
        margin-left: 12px;
        opacity: 0.8;
      }

      .stop-departures {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 8px;
      }

      .departure-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 8px 12px;
        border-radius: 4px;
        width: calc(100% - 24px);
      }

      .departure-line {
        font-size: 1.5rem;
        font-weight: 700;
        margin-right: 8px;
        min-width: 2rem;
        text-align: center;
      }

      .departure-destination {
        font-size: 1.2rem;
        margin-right: 8px;
      }

      .departure-time {
        font-size: 1.2rem;
        font-weight: 700;
        color: #4CAF50;
      }

      .departure-lowfloor {
        margin-left: 4px;
        font-size: 1.2rem;
      }

      .transportation-error {
        color: #f44336;
        font-size: 1rem;
      }

      .transportation-update-time {
        font-size: 0.8rem;
        opacity: 0.7;
        text-align: center;
        margin-top: 8px;
        width: 100%;
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

        .stop-group {
          margin-bottom: 16px;
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
              @load="${() => console.log('[wall-clock] Background image rendered successfully:', this.currentImageUrl)}"
              @error="${(e: Event) => console.error('[wall-clock] Error rendering background image:', this.currentImageUrl, e)}"
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
        <div class="clock" style="color: ${this.config.fontColor}; ${this.config.transportation && this.config.enableTransportation !== false ? `margin-top: -${(this.config.transportation.maxDepartures || 3) * 30 + 80}px;` : ''}">
          <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
          <div class="seconds-container">
            <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
            ${this.ampm ? html`<span class="ampm" style="color: ${this.config.fontColor};">${this.ampm}</span>` : ''}
          </div>
        </div>
        <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
        ${this.config.transportation && this.config.enableTransportation !== false ? 
          this.config.transportation?.onDemand && !this.transportationDataLoaded ?
            html`<div class="transportation-on-demand-button" @click=${this._handleTransportationClick}>
              <svg viewBox="0 0 24 24">
                <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
              </svg>
            </div>` :
            html`<div class="transportation-container" style="color: ${this.config.fontColor};">
              ${this.renderTransportationContent()}
            </div>` 
          : ''
        }
      </ha-card>
    `;
  }

  /**
   * Render transportation content
   */
  private renderTransportationContent(): TemplateResult {
    if (this.transportationData.loading) {
      return html`<div>Loading transportation data...</div>`;
    }

    if (this.transportationData.error) {
      return html`<div class="transportation-error">${this.transportationData.error}</div>`;
    }

    if (!this.transportationData.departures || this.transportationData.departures.length === 0) {
      return html`<div>No departures available</div>`;
    }

    // Group departures by stop name and postId
    const departuresByStop: { [key: string]: TransportationDeparture[] } = {};

    for (const departure of this.transportationData.departures) {
      const key = `${departure.stopName}-${departure.postId}`;
      if (!departuresByStop[key]) {
        departuresByStop[key] = [];
      }
      departuresByStop[key].push(departure);
    }

    return html`
      <div class="transportation-departures">
        ${Object.entries(departuresByStop).map(([_key, departures]) => {
          // Get the stop name from the first departure
          const stopName = departures[0].stopName;

          return html`
            <div class="stop-group">
              <h3 class="stop-name" style="color: ${this.config.fontColor};">
                 ${stopName}
              </h3>
              <div class="stop-departures">
                ${departures.map(departure => html`
                  <div class="departure-item">
                    <div class="departure-line" style="color: ${this.config.fontColor};">${departure.lineName}</div>
                    <div class="departure-destination" style="color: ${this.config.fontColor};">→ ${departure.finalStop}</div>
                    <div class="departure-time" style="color: ${this.config.fontColor};">${departure.timeMark}</div>
                    ${departure.isLowFloor ? html`<div class="departure-lowfloor">♿</div>` : ''}
                  </div>
                `)}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  /**
   * Render weather content based on display mode
   */
  private renderWeatherContent(): TemplateResult {
    if (this.weatherError) {
      return html`<div class="weather-error">${this.weatherErrorMessage}</div>`;
    }

    if (!this.weatherData || !this.weatherData.current) {
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
            <div class="weather-condition">${this.translateWeatherCondition(this.weatherData.current.condition)}</div>
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
   * Handle click on the transportation button
   * This is called when the user clicks the bus icon to load transportation data on demand
   */
  private async _handleTransportationClick(): Promise<void> {
    console.log('[wall-clock] Transportation button clicked, loading data on demand');

    // Fetch transportation data
    await this.fetchTransportationData();

    // Mark as loaded so the button is replaced with the data
    this.transportationDataLoaded = true;

    // Set up an interval to update the data if configured
    if (this.config.transportationUpdateInterval) {
      // Get configured transportation update interval or default to 60 seconds
      let transportationInterval = this.config.transportationUpdateInterval || 60;

      // Ensure minimum interval of 60 seconds
      transportationInterval = Math.max(transportationInterval, 60);

      // Convert to milliseconds
      const transportationIntervalMs = transportationInterval * 1000;

      console.log(`[wall-clock] Setting transportation update interval to ${transportationInterval} seconds`);

      // Clear any existing timer
      if (this.transportationUpdateTimer) {
        clearInterval(this.transportationUpdateTimer);
      }

      // Update transportation data at the configured interval
      this.transportationUpdateTimer = window.setInterval(() => {
        // Use a self-executing async function to allow await
        (async () => {
          try {
            await this.fetchTransportationData();
          } catch (error) {
            console.error('[wall-clock] Error in transportation update interval:', error);
          }
        })();
      }, transportationIntervalMs);
    }

    // Set up auto-hide timer if configured
    if (this.config.transportation?.autoHideTimeout) {
      // Clear any existing auto-hide timer
      if (this.transportationAutoHideTimer) {
        clearTimeout(this.transportationAutoHideTimer);
      }

      // Get configured auto-hide timeout or default to 5 minutes
      let autoHideTimeout = this.config.transportation.autoHideTimeout || 5;

      // Ensure timeout is between 1 and 10 minutes
      autoHideTimeout = Math.max(1, Math.min(10, autoHideTimeout));

      // Convert to milliseconds
      const autoHideTimeoutMs = autoHideTimeout * 60 * 1000;

      console.log(`[wall-clock] Setting transportation auto-hide timeout to ${autoHideTimeout} minutes`);

      // Set timer to hide departures and show bus button again after timeout
      this.transportationAutoHideTimer = window.setTimeout(() => {
        console.log(`[wall-clock] Auto-hiding transportation departures after ${autoHideTimeout} minutes`);
        this.transportationDataLoaded = false;
      }, autoHideTimeoutMs);
    }
  }

  /**
   * Translate a weather condition
   * @param condition The weather condition to translate
   * @returns The translated weather condition
   */
  private translateWeatherCondition(condition: string): string {
    // Get language from config, or Home Assistant language, or default to Czech
    const language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';

    // Convert condition to a format suitable for path lookup (replace spaces with underscores)
    const normalizedCondition = condition.toLowerCase().replace(/ /g, '_');

    // Try to get the translation from the conditions section
    const conditionPath = `conditions.${normalizedCondition}`;
    const translation = translate(conditionPath, language, null);

    if (translation !== null) {
      return translation;
    }

    // Fall back to the original condition if no translation is found
    return condition;
  }

  /**
   * Format a date for display in the forecast
   */
  private formatForecastDate(date: Date): string {
    // Get language from config, or Home Assistant language, or default to Czech
    const language = this.config.language || (this.hass ? this.hass.language : null) || 'cs';

    // Format: "Mon", "Tue", etc.
    return formatDate(date, language, { weekday: 'short' });
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

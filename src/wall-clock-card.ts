import { LitElement, html, css, property, customElement, CSSResult, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { ImageSourceConfig, getImageSource } from './image-sources';

// Interface for sensor configuration
interface SensorConfig {
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

interface WallClockConfig {
  timeFormat?: Intl.DateTimeFormatOptions;
  dateFormat?: Intl.DateTimeFormatOptions;
  backgroundImages?: string[];
  backgroundOpacity?: number;
  useOnlineImages?: boolean;
  onlineImageSource?: string; // ID of the image source plugin
  onlineImageConfig?: ImageSourceConfig; // Configuration for the image source
  backgroundRotationInterval?: number;
  sensors?: SensorConfig[]; // Multiple sensors
  fontColor?: string; // Font color for all text elements
  // Legacy properties for backward compatibility
  sensorEntity?: string; // Single sensor (legacy)
  sensorLabel?: string; // Single sensor label (legacy)
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

  private timer?: number;
  private imageRotationTimer?: number;
  private fetchingImageUrls = false;
  private preloadTimer?: number;

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
  }

  private async fetchImageUrls(): Promise<void> {
    if (this.fetchingImageUrls) return;
    this.fetchingImageUrls = true;

    try {
      const urls: string[] = [];

      // Fetch online image URLs if enabled
      if (this.config.useOnlineImages) {
        const onlineUrls = await this.fetchOnlineImageUrls();
        urls.push(...onlineUrls);
      }

      // Fetch local image URLs if available
      if (this.config.backgroundImages && this.config.backgroundImages.length > 0) {
        const localUrls = await this.fetchLocalImageUrls();
        urls.push(...localUrls);
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
      const sourceId = this.config.onlineImageSource || 'picsum';

      // Get the image source plugin
      const imageSource = getImageSource(sourceId);

      if (!imageSource) {
        console.error(`Image source '${sourceId}' not found.`);
        return [];
      }

      // Prepare the configuration for the image source
      const sourceConfig: ImageSourceConfig = {
        ...imageSource.getDefaultConfig(),
        ...this.config.onlineImageConfig || {},
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
        images: this.config.backgroundImages || [],
      };

      // Fetch image URLs from the local image source
      console.log('Fetching image URLs from Local Images source with config:', sourceConfig);
      const fetchedUrls = await imageSource.fetchImages(sourceConfig);

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
        // Move to the next image
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
        this.loadCurrentImage();
      }, (this.config.backgroundRotationInterval || 30) * 1000); // Convert seconds to milliseconds

      // Preload the next image after a short delay
      this.scheduleNextImagePreload();
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
    // If we're using Unsplash and it's failing, try to switch to Picsum
    if (this.config.useOnlineImages && this.config.onlineImageSource === 'unsplash') {
      console.log('Switching from Unsplash to Picsum as fallback image source');
      this.config = {
        ...this.config,
        onlineImageSource: 'picsum'
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

    // Set default values for image source and config
    let onlineImageSource = config.onlineImageSource || 'picsum';
    let onlineImageConfig: ImageSourceConfig = config.onlineImageConfig || {};

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
      useOnlineImages: config.useOnlineImages || false,
      onlineImageSource,
      onlineImageConfig,
      backgroundRotationInterval: config.backgroundRotationInterval || 30,
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
        line-height: 2.5rem;
        font-weight: 400;
      }

      /* Responsive adjustments */
      @media (min-width: 600px) {
        .clock {
          font-size: 18rem;
          line-height: 14rem;
        }

        .date {
          font-size: 6rem;
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
        <div class="clock" style="color: ${this.config.fontColor};">
          <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
          <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
        </div>
        <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
      </ha-card>
    `;
  }
}

// Define the custom element
customElements.define('wall-clock-card', WallClockCard);

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

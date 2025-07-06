import { LitElement, html, customElement, property, TemplateResult, CSSResult, css } from 'lit-element';
import { HomeAssistant, fireEvent, LovelaceCardEditor, LovelaceCardConfig } from 'custom-card-helpers';
import { WallClockConfig, SensorConfig } from './wall-clock-card';

@customElement('wall-clock-card-editor')
export class WallClockCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) _config?: WallClockConfig;
  @property({ type: Array }) _sensors: SensorConfig[] = [];
  @property({ type: Array }) _localBackgroundImages: string[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    // Color picker and other HA form elements are now automatically loaded
  }

  // Time format options
  private _timeFormatOptions = {
    hour12: [
      { value: true, label: '12-hour' },
      { value: false, label: '24-hour' },
    ],
    hour: [
      { value: 'numeric', label: 'Numeric' },
      { value: '2-digit', label: '2-digit' },
    ],
    minute: [
      { value: 'numeric', label: 'Numeric' },
      { value: '2-digit', label: '2-digit' },
    ],
    second: [
      { value: 'numeric', label: 'Numeric' },
      { value: '2-digit', label: '2-digit' },
      { value: undefined, label: 'Hidden' },
    ],
  };

  // Date format options
  private _dateFormatOptions = {
    weekday: [
      { value: 'long', label: 'Long (Monday)' },
      { value: 'short', label: 'Short (Mon)' },
      { value: 'narrow', label: 'Narrow (M)' },
      { value: undefined, label: 'Hidden' },
    ],
    month: [
      { value: 'long', label: 'Long (January)' },
      { value: 'short', label: 'Short (Jan)' },
      { value: 'narrow', label: 'Narrow (J)' },
      { value: 'numeric', label: 'Numeric (1)' },
      { value: '2-digit', label: '2-digit (01)' },
      { value: undefined, label: 'Hidden' },
    ],
    day: [
      { value: 'numeric', label: 'Numeric (1)' },
      { value: '2-digit', label: '2-digit (01)' },
      { value: undefined, label: 'Hidden' },
    ],
    year: [
      { value: 'numeric', label: 'Numeric (2023)' },
      { value: '2-digit', label: '2-digit (23)' },
      { value: undefined, label: 'Hidden' },
    ],
  };

  // Image source options
  private _imageSourceOptions = [
    { value: 'none', label: 'None (No Background Images)' },
    { value: 'picsum', label: 'Picsum Photos' },
    { value: 'local', label: 'Local Images' },
  ];

  // Weather provider options
  private _weatherProviderOptions = [
    { value: 'none', label: 'None (Disable Weather)' },
    { value: 'openweathermap', label: 'OpenWeatherMap' },
  ];

  // Weather display mode options
  private _weatherDisplayModeOptions = [
    { value: 'current', label: 'Current Weather Only' },
    { value: 'forecast', label: 'Forecast Only' },
    { value: 'both', label: 'Current and Forecast' },
  ];

  setConfig(config: LovelaceCardConfig): void {
    // Cast the config to WallClockConfig
    const wallClockConfig = config as unknown as WallClockConfig;

    // Handle legacy properties
    // If useOnlineImages is set but imageSource is not, convert it to imageSource
    let imageSource = wallClockConfig.imageSource;
    if (imageSource === undefined) {
      if (wallClockConfig.useOnlineImages === true) {
        imageSource = wallClockConfig.onlineImageSource || 'picsum';
      } else if (wallClockConfig.useOnlineImages === false) {
        // If useOnlineImages is false and there are backgroundImages, use 'local'
        // Otherwise, use 'none'
        if (wallClockConfig.backgroundImages && wallClockConfig.backgroundImages.length > 0) {
          imageSource = 'local';
        } else {
          imageSource = 'none';
        }
      } else {
        // Default to 'none' if neither is set
        imageSource = 'none';
      }
    }

    // Handle legacy backgroundImages property
    const locaBackgroundImages = wallClockConfig.locaBackgroundImages || wallClockConfig.backgroundImages || [];

    this._config = {
      ...wallClockConfig,
      timeFormat: wallClockConfig.timeFormat || { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      },
      dateFormat: wallClockConfig.dateFormat || {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      backgroundOpacity: wallClockConfig.backgroundOpacity !== undefined ? wallClockConfig.backgroundOpacity : 0.3,
      imageSource: imageSource,
      imageConfig: wallClockConfig.imageConfig || wallClockConfig.onlineImageConfig || {},
      locaBackgroundImages: locaBackgroundImages,
      // For backward compatibility
      backgroundImages: locaBackgroundImages,
      useOnlineImages: imageSource !== 'none' && imageSource !== 'local',
      backgroundRotationInterval: wallClockConfig.backgroundRotationInterval || 90,
      sensors: wallClockConfig.sensors || [],
      fontColor: wallClockConfig.fontColor || '#FFFFFF',
      // Weather settings
      showWeather: wallClockConfig.showWeather !== undefined ? wallClockConfig.showWeather : false,
      weatherProvider: wallClockConfig.weatherProvider || 'openweathermap',
      weatherConfig: wallClockConfig.weatherConfig || {},
      weatherDisplayMode: wallClockConfig.weatherDisplayMode || 'both',
      weatherForecastDays: wallClockConfig.weatherForecastDays || 3
    };

    // Load sensors from config
    this._loadSensors();

    // Load local background images from config
    this._loadLocalBackgroundImages();
  }

  private _loadSensors(): void {
    if (this._config?.sensors && this._config.sensors.length > 0) {
      this._sensors = [...this._config.sensors];
    } else if (this._config?.sensorEntity) {
      // For backward compatibility
      this._sensors = [{
        entity: this._config.sensorEntity,
        label: this._config.sensorLabel || ''
      }];
    } else {
      this._sensors = [];
    }
  }

  private _loadLocalBackgroundImages(): void {
    if (this._config?.locaBackgroundImages && this._config.locaBackgroundImages.length > 0) {
      this._localBackgroundImages = [...this._config.locaBackgroundImages];
    } else if (this._config?.backgroundImages && this._config.backgroundImages.length > 0) {
      // For backward compatibility
      this._localBackgroundImages = [...this._config.backgroundImages];
    } else {
      this._localBackgroundImages = [];
    }
  }


  private _addSensor(): void {
    this._sensors = [...this._sensors, { entity: '', label: '' }];
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.sensors = [...this._sensors];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _removeSensor(index: number): void {
    this._sensors = this._sensors.filter((_, i) => i !== index);
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.sensors = [...this._sensors];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _sensorChanged(index: number, field: string, value: string): void {
    this._sensors = this._sensors.map((sensor, i) => {
      if (i === index) {
        return { ...sensor, [field]: value };
      }
      return sensor;
    });
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.sensors = [...this._sensors];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _addLocalBackgroundImage(): void {
    this._localBackgroundImages = [...this._localBackgroundImages, ''];
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.locaBackgroundImages = [...this._localBackgroundImages];
      // For backward compatibility
      newConfig.backgroundImages = [...this._localBackgroundImages];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _removeLocalBackgroundImage(index: number): void {
    this._localBackgroundImages = this._localBackgroundImages.filter((_, i) => i !== index);
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.locaBackgroundImages = [...this._localBackgroundImages];
      // For backward compatibility
      newConfig.backgroundImages = [...this._localBackgroundImages];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  private _updateLocalBackgroundImage(index: number, value: string): void {
    this._localBackgroundImages = this._localBackgroundImages.map((url, i) => {
      if (i === index) {
        return value;
      }
      return url;
    });
    // Update the config with a deep copy
    if (this._config) {
      // Create a deep copy of the config
      const newConfig = JSON.parse(JSON.stringify(this._config));
      newConfig.locaBackgroundImages = [...this._localBackgroundImages];
      // For backward compatibility
      newConfig.backgroundImages = [...this._localBackgroundImages];

      // Update the local config reference
      this._config = newConfig;

      // Fire the config-changed event with the new config
      fireEvent(this, 'config-changed', { config: newConfig });
    }
  }

  static get styles(): CSSResult {
    return css`
      .form-container {
        display: flex;
        flex-direction: column;
        padding: 16px;
      }

      .row {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
      }

      .label {
        flex: 0 0 30%;
        font-weight: 500;
      }

      .value {
        flex: 1;
        display: flex;
        align-items: center;
      }

      .section-header {
        font-size: 18px;
        font-weight: 500;
        margin-top: 16px;
        margin-bottom: 8px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 4px;
      }

      .sensor-row {
        display: flex;
        margin-bottom: 8px;
        align-items: center;
      }

      .sensor-entity {
        flex: 2;
        margin-right: 8px;
      }

      .sensor-label {
        flex: 1;
        margin-right: 8px;
      }

      .sensor-actions {
        flex: 0 0 40px;
        text-align: center;
      }

      .image-row {
        display: flex;
        margin-bottom: 8px;
        align-items: center;
      }

      .image-url {
        flex: 1;
        margin-right: 8px;
      }

      .image-actions {
        flex: 0 0 40px;
        text-align: center;
      }

      mwc-button {
        margin-top: 8px;
      }

      ha-switch {
        margin-right: 8px;
      }

      ha-textfield, ha-select {
        width: 100%;
      }
    `;
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    // Get all available entities for dropdown
    const entities = Object.keys(this.hass.states).sort();

    return html`
      <div class="form-container">
        <!-- Time Format Section -->
        <div class="section-header">Time Format</div>

        <div class="row">
          <div class="label">Time Format</div>
          <div class="value">
            <ha-select
              label="Hour Format"
              .value=${this._config.timeFormat?.hour12 ? 'true' : 'false'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.timeFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.timeFormat = {
                  ...newConfig.timeFormat,
                  hour12: target.value === 'true'
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._timeFormatOptions.hour12.map(
                (option) => html`<mwc-list-item .value=${String(option.value)}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Hour Display</div>
          <div class="value">
            <ha-select
              label="Hour Display"
              .value=${this._config.timeFormat?.hour || '2-digit'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.timeFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.timeFormat = {
                  ...newConfig.timeFormat,
                  hour: target.value as "numeric" | "2-digit" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._timeFormatOptions.hour.map(
                (option) => html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Minute Display</div>
          <div class="value">
            <ha-select
              label="Minute Display"
              .value=${this._config.timeFormat?.minute || '2-digit'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.timeFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.timeFormat = {
                  ...newConfig.timeFormat,
                  minute: target.value as "numeric" | "2-digit" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._timeFormatOptions.minute.map(
                (option) => html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Second Display</div>
          <div class="value">
            <ha-select
              label="Second Display"
              .value=${this._config.timeFormat?.second || '2-digit'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.timeFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.timeFormat = {
                  ...newConfig.timeFormat,
                  second: (target.value === 'undefined' ? undefined : target.value) as "numeric" | "2-digit" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._timeFormatOptions.second.map(
                (option) => html`<mwc-list-item .value=${option.value === undefined ? 'undefined' : option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <!-- Date Format Section -->
        <div class="section-header">Date Format</div>

        <div class="row">
          <div class="label">Weekday Display</div>
          <div class="value">
            <ha-select
              label="Weekday Display"
              .value=${this._config.dateFormat?.weekday || 'long'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.dateFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.dateFormat = {
                  ...newConfig.dateFormat,
                  weekday: (target.value === 'undefined' ? undefined : target.value) as "long" | "short" | "narrow" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._dateFormatOptions.weekday.map(
                (option) => html`<mwc-list-item .value=${option.value === undefined ? 'undefined' : option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Month Display</div>
          <div class="value">
            <ha-select
              label="Month Display"
              .value=${this._config.dateFormat?.month || 'long'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.dateFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.dateFormat = {
                  ...newConfig.dateFormat,
                  month: (target.value === 'undefined' ? undefined : target.value) as "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._dateFormatOptions.month.map(
                (option) => html`<mwc-list-item .value=${option.value === undefined ? 'undefined' : option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Day Display</div>
          <div class="value">
            <ha-select
              label="Day Display"
              .value=${this._config.dateFormat?.day || 'numeric'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.dateFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.dateFormat = {
                  ...newConfig.dateFormat,
                  day: (target.value === 'undefined' ? undefined : target.value) as "numeric" | "2-digit" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._dateFormatOptions.day.map(
                (option) => html`<mwc-list-item .value=${option.value === undefined ? 'undefined' : option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <div class="row">
          <div class="label">Year Display</div>
          <div class="value">
            <ha-select
              label="Year Display"
              .value=${this._config.dateFormat?.year || 'numeric'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config || !this._config.dateFormat) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.dateFormat = {
                  ...newConfig.dateFormat,
                  year: (target.value === 'undefined' ? undefined : target.value) as "numeric" | "2-digit" | undefined
                };

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._dateFormatOptions.year.map(
                (option) => html`<mwc-list-item .value=${option.value === undefined ? 'undefined' : option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        <!-- Background Section -->
        <div class="section-header">Background</div>

        <div class="row">
          <div class="label">Image Source</div>
          <div class="value">
            <ha-select
              label="Image Source"
              .value=${this._config.imageSource || 'none'}
              @click=${(ev: CustomEvent) => {
                ev.stopPropagation();
              }}
              @closed=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.imageSource = target.value;

                // For backward compatibility
                newConfig.useOnlineImages = target.value !== 'none' && target.value !== 'local';

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            >
              ${this._imageSourceOptions.map(
                (option) => html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
              )}
            </ha-select>
          </div>
        </div>

        ${this._config.imageSource === 'local' ? html`
          <div class="section-header">Local Background Images</div>

          ${this._localBackgroundImages.map((imageUrl, index) => html`
            <div class="image-row">
              <div class="image-url">
                <ha-textfield
                  label="Image URL"
                  .value=${imageUrl || ''}
                  @input=${(ev: CustomEvent) => {
                    ev.stopPropagation();
                    ev.preventDefault();

                    const target = ev.target as HTMLElement & { value?: string };
                    if (!target) return;
                    this._updateLocalBackgroundImage(index, target.value || '');
                  }}
                ></ha-textfield>
              </div>
              <div class="image-actions">
                <ha-icon-button
                  .path=${'M19,13H5V11H19V13Z'} 
                  @click=${() => this._removeLocalBackgroundImage(index)}
                ></ha-icon-button>
              </div>
            </div>
          `)}

          <mwc-button @click=${this._addLocalBackgroundImage}>Add Background Image</mwc-button>
        ` : ''}

        <div class="row">
          <div class="label">Background Opacity</div>
          <div class="value">
            <ha-slider
              min="0"
              max="1"
              step="0.05"
              pin
              .value=${this._config.backgroundOpacity !== undefined ? this._config.backgroundOpacity : 0.5}
              @change=${(ev: CustomEvent) => {
                ev.stopPropagation();
                ev.preventDefault();

                const target = ev.target as HTMLElement & { value?: string | number };
                if (!target || !this._config) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.backgroundOpacity = typeof target.value === 'string' ? parseFloat(target.value) : target.value;

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            ></ha-slider>
            <span>${this._config.backgroundOpacity !== undefined ? this._config.backgroundOpacity : 0.5}</span>
          </div>
        </div>

        <div class="row">
          <div class="label">Rotation Interval (seconds)</div>
          <div class="value">
            <ha-slider
              min="30"
              max="300"
              step="10"
              pin
              .value=${this._config.backgroundRotationInterval || 90}
              @change=${(ev: CustomEvent) => {
                ev.stopPropagation();
                ev.preventDefault();

                const target = ev.target as HTMLElement & { value?: string | number };
                if (!target || !this._config) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.backgroundRotationInterval = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            ></ha-slider>
            <span>${this._config.backgroundRotationInterval || 90} seconds</span>
          </div>
        </div>

        <!-- Appearance Section -->
        <div class="section-header">Appearance</div>

        <div class="row">
          <div class="label">Font Color</div>
          <div class="value">
            <ha-textfield
              label="Font Color (hex, rgb, or rgba)"
              .value=${this._config.fontColor || '#FFFFFF'}
              @input=${(ev: CustomEvent) => {
                ev.stopPropagation();
                ev.preventDefault();

                const target = ev.target as HTMLElement & { value?: string };
                if (!target || !this._config) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.fontColor = target.value || '#FFFFFF';

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            ></ha-textfield>
            <div style="width: 32px; height: 32px; background-color: ${this._config.fontColor || '#FFFFFF'}; border: 1px solid #000; margin-left: 8px;"></div>
          </div>
        </div>

        <!-- Sensors Section -->
        <div class="section-header">Sensors</div>

        ${this._sensors.map((sensor, index) => html`
          <div class="sensor-row">
            <div class="sensor-entity">
              <ha-select
                label="Entity"
                .value=${sensor.entity || ''}
                @click=${(ev: CustomEvent) => {
                  ev.stopPropagation();
                }}
                @closed=${(ev: CustomEvent) => {
                  ev.stopPropagation();

                  const target = ev.target as HTMLElement & { value?: string };
                  if (!target) return;

                  this._sensorChanged(index, 'entity', target.value || '');
                }}
              >
                ${entities.map(
                  (entity) => html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`
                )}
              </ha-select>
            </div>
            <div class="sensor-label">
              <ha-textfield
                label="Label"
                .value=${sensor.label || ''}
                @input=${(ev: CustomEvent) => {
                  ev.stopPropagation();
                  ev.preventDefault();

                  const target = ev.target as HTMLElement & { value?: string };
                  if (!target) return;
                  this._sensorChanged(index, 'label', target.value || '');
                }}
              ></ha-textfield>
            </div>
            <div class="sensor-actions">
              <ha-icon-button
                .path=${'M19,13H5V11H19V13Z'} 
                @click=${() => this._removeSensor(index)}
              ></ha-icon-button>
            </div>
          </div>
        `)}

        <mwc-button @click=${this._addSensor}>Add Sensor</mwc-button>

        <!-- Weather Settings Section -->
        <div class="section-header">Weather Forecast</div>

        <div class="row">
          <div class="label">Show Weather</div>
          <div class="value">
            <ha-switch
              .checked=${this._config.showWeather || false}
              @change=${(ev: CustomEvent) => {
                ev.stopPropagation();

                const target = ev.target as HTMLElement & { checked?: boolean };
                if (!target || !this._config) return;

                // Create a deep copy of the config
                const newConfig = JSON.parse(JSON.stringify(this._config));

                // Update the new config
                newConfig.showWeather = target.checked || false;

                // Update the local config reference
                this._config = newConfig;

                // Fire the config-changed event with the new config
                fireEvent(this, 'config-changed', { config: newConfig });
              }}
            ></ha-switch>
            <span>Display weather forecast</span>
          </div>
        </div>

        ${this._config.showWeather ? html`
          <div class="row">
            <div class="label">Weather Title</div>
            <div class="value">
              <ha-textfield
                label="Title for weather section"
                .value=${this._config.weatherTitle || 'Weather'}
                @input=${(ev: CustomEvent) => {
                  ev.stopPropagation();
                  ev.preventDefault();

                  const target = ev.target as HTMLElement & { value?: string };
                  if (!target || !this._config) return;

                  // Create a deep copy of the config
                  const newConfig = JSON.parse(JSON.stringify(this._config));

                  // Update the new config
                  newConfig.weatherTitle = target.value || 'Weather';

                  // Update the local config reference
                  this._config = newConfig;

                  // Fire the config-changed event with the new config
                  fireEvent(this, 'config-changed', { config: newConfig });
                }}
              ></ha-textfield>
            </div>
          </div>

          <div class="row">
            <div class="label">Weather Provider</div>
            <div class="value">
              <ha-select
                label="Provider"
                .value=${this._config.weatherProvider || 'openweathermap'}
                @click=${(ev: CustomEvent) => {
                  ev.stopPropagation();
                }}
                @closed=${(ev: CustomEvent) => {
                  ev.stopPropagation();

                  const target = ev.target as HTMLElement & { value?: string };
                  if (!target || !this._config) return;

                  // Create a deep copy of the config
                  const newConfig = JSON.parse(JSON.stringify(this._config));

                  // Update the new config
                  newConfig.weatherProvider = target.value || 'openweathermap';

                  // Update the local config reference
                  this._config = newConfig;

                  // Fire the config-changed event with the new config
                  fireEvent(this, 'config-changed', { config: newConfig });
                }}
              >
                ${this._weatherProviderOptions.map(
                  (option) => html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
                )}
              </ha-select>
            </div>
          </div>

          ${this._config.weatherProvider === 'openweathermap' ? html`
            <div class="row">
              <div class="label">API Key</div>
              <div class="value">
                <ha-textfield
                  label="OpenWeatherMap API Key"
                  .value=${this._config.weatherConfig?.apiKey || ''}
                  @input=${(ev: CustomEvent) => {
                    ev.stopPropagation();
                    ev.preventDefault();

                    const target = ev.target as HTMLElement & { value?: string };
                    if (!target || !this._config) return;

                    // Create a deep copy of the config
                    const newConfig = JSON.parse(JSON.stringify(this._config));

                    // Update the new config
                    newConfig.weatherConfig = {
                      ...newConfig.weatherConfig || {},
                      apiKey: target.value || ''
                    };

                    // Update the local config reference
                    this._config = newConfig;

                    // Fire the config-changed event with the new config
                    fireEvent(this, 'config-changed', { config: newConfig });
                  }}
                ></ha-textfield>
              </div>
            </div>

            <div class="row">
              <div class="label">Location</div>
              <div class="value">
                <ha-textfield
                  label="Latitude"
                  type="number"
                  step="0.0001"
                  .value=${this._config.weatherConfig?.latitude || 50.0755}
                  @input=${(ev: CustomEvent) => {
                    ev.stopPropagation();
                    ev.preventDefault();

                    const target = ev.target as HTMLElement & { value?: string };
                    if (!target || !this._config) return;

                    // Create a deep copy of the config
                    const newConfig = JSON.parse(JSON.stringify(this._config));

                    // Update the new config
                    newConfig.weatherConfig = {
                      ...newConfig.weatherConfig || {},
                      latitude: parseFloat(target.value || '50.0755')
                    };

                    // Update the local config reference
                    this._config = newConfig;

                    // Fire the config-changed event with the new config
                    fireEvent(this, 'config-changed', { config: newConfig });
                  }}
                ></ha-textfield>
                <ha-textfield
                  label="Longitude"
                  type="number"
                  step="0.0001"
                  .value=${this._config.weatherConfig?.longitude || 14.4378}
                  @input=${(ev: CustomEvent) => {
                    ev.stopPropagation();
                    ev.preventDefault();

                    const target = ev.target as HTMLElement & { value?: string };
                    if (!target || !this._config) return;

                    // Create a deep copy of the config
                    const newConfig = JSON.parse(JSON.stringify(this._config));

                    // Update the new config
                    newConfig.weatherConfig = {
                      ...newConfig.weatherConfig || {},
                      longitude: parseFloat(target.value || '14.4378')
                    };

                    // Update the local config reference
                    this._config = newConfig;

                    // Fire the config-changed event with the new config
                    fireEvent(this, 'config-changed', { config: newConfig });
                  }}
                ></ha-textfield>
              </div>
            </div>
          ` : ''}

          <div class="row">
            <div class="label">Display Mode</div>
            <div class="value">
              <ha-select
                label="Display Mode"
                .value=${this._config.weatherDisplayMode || 'both'}
                @click=${(ev: CustomEvent) => {
                  ev.stopPropagation();
                }}
                @closed=${(ev: CustomEvent) => {
                  ev.stopPropagation();

                  const target = ev.target as HTMLElement & { value?: string };
                  if (!target || !this._config) return;

                  // Create a deep copy of the config
                  const newConfig = JSON.parse(JSON.stringify(this._config));

                  // Update the new config
                  newConfig.weatherDisplayMode = target.value as 'current' | 'forecast' | 'both' || 'both';

                  // Update the local config reference
                  this._config = newConfig;

                  // Fire the config-changed event with the new config
                  fireEvent(this, 'config-changed', { config: newConfig });
                }}
              >
                ${this._weatherDisplayModeOptions.map(
                  (option) => html`<mwc-list-item .value=${option.value}>${option.label}</mwc-list-item>`
                )}
              </ha-select>
            </div>
          </div>

          ${(this._config.weatherDisplayMode === 'forecast' || this._config.weatherDisplayMode === 'both') ? html`
            <div class="row">
              <div class="label">Forecast Days</div>
              <div class="value">
                <ha-slider
                  min="1"
                  max="7"
                  step="1"
                  pin
                  .value=${this._config.weatherForecastDays || 3}
                  @change=${(ev: CustomEvent) => {
                    ev.stopPropagation();
                    ev.preventDefault();

                    const target = ev.target as HTMLElement & { value?: string | number };
                    if (!target || !this._config) return;

                    // Create a deep copy of the config
                    const newConfig = JSON.parse(JSON.stringify(this._config));

                    // Update the new config
                    newConfig.weatherForecastDays = typeof target.value === 'string' ? parseInt(target.value, 10) : target.value;

                    // Update the local config reference
                    this._config = newConfig;

                    // Fire the config-changed event with the new config
                    fireEvent(this, 'config-changed', { config: newConfig });
                  }}
                ></ha-slider>
                <span>${this._config.weatherForecastDays || 3} days</span>
              </div>
            </div>
          ` : ''}
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wall-clock-card-editor': WallClockCardEditor;
  }
}

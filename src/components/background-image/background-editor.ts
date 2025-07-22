import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { BackgroundImage, TimeOfDay, Weather } from '../../image-sources';

/**
 * Editor component for background settings
 */
@customElement('background-editor')
export class BackgroundEditor extends BaseEditorSection {
    @property({ type: Array }) _backgroundImages: BackgroundImage[] = [];

    // Image source options
    private _imageSourceOptions = [
        {value: 'none', label: 'None (No Background Images)'},
        {value: 'picsum', label: 'Picsum Photos'},
        {value: 'local', label: 'Local Images'},
        {value: 'unsplash', label: 'Unsplash'},
        {value: 'sensor', label: 'Sensor Images'},
    ];

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // Load background images from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadBackgroundImages();
        }
    }

    private _loadBackgroundImages(): void {
        if (this.config?.backgroundImages && this.config.backgroundImages.length > 0) {
            // Use the structure if available
            this._backgroundImages = [...this.config.backgroundImages];
        } else {
            // Initialize empty array
            this._backgroundImages = [];
        }
    }

    private _addBackgroundImage(): void {
        this._backgroundImages = [
            ...this._backgroundImages,
            {
                url: '',
                weather: Weather.All,
                timeOfDay: TimeOfDay.Unspecified
            }
        ];
        this._updateBackgroundImagesConfig();
    }

    private _removeBackgroundImage(index: number): void {
        this._backgroundImages = this._backgroundImages.filter((_, i) => i !== index);
        this._updateBackgroundImagesConfig();
    }

    private _updateBackgroundImagesConfig(): void {
        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));
            newConfig.backgroundImages = [...this._backgroundImages];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .section-subheader {
                font-size: 16px;
                font-weight: 500;
                margin: 25px 0 5px 0;
            }
            
            .image-row {
                display: flex;
                margin-bottom: 16px;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .image-url {
                flex: 1 1 calc(100% - 60px);
            }
            
            .image-actions {
                flex: 0 0 40px;
                text-align: center;
            }
            
            .image-weather {
                flex: 1 1 45%;
            }
            
            .image-time {
                flex: 1 1 45%;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._imageSourceOptions,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.imageSource || 'none'}
                        .label= ${"Image Source"}
                        propertyName="imageSource"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            number: {
                                min: 0,
                                max: 1,
                                step: 0.05,
                                mode: "slider",
                                slider_ticks: true
                            }
                        }}
                        .value=${this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.5}
                        .label= ${"Background Opacity"}
                        propertyName="backgroundOpacity"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            number: {
                                min: 30,
                                max: 300,
                                step: 10,
                                mode: "slider",
                                slider_ticks: true
                            }
                        }}
                        .value=${this.config.backgroundRotationInterval || 90}
                        .label= ${"Rotation Interval (sec)"}
                        propertyName="backgroundRotationInterval"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
                
                ${this.config.imageSource === 'local' ? this._renderLocalImagesSection() : ''}
                ${this.config.imageSource === 'unsplash' ? this._renderUnsplashSection() : ''}
                ${this.config.imageSource === 'sensor' ? this._renderSensorImagesSection() : ''}
            </div>
        `;
    }

    private _renderLocalImagesSection() {
        return html`
            <div class="info-text">
                Configure local image URLs. Images will be automatically categorized by weather
                condition and time of day based on their file paths.
                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                (sunrise-sunset, day, night) in your file paths.
            </div>

            <div class="section-subheader">Background Images</div>

            ${this._backgroundImages.map((image, index) => html`
                <div class="image-row">
                    <div class="image-url">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${image.url || ''}
                                .label= ${"Image URL"}
                                propertyName="backgroundImages.${index}.url"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                    <div class="image-actions">
                        <ha-icon-button
                                .path=${'M19,13H5V11H19V13Z'}
                                @click=${() => this._removeBackgroundImage(index)}
                        ></ha-icon-button>
                    </div>
                    <div class="image-weather">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: Object.values(Weather).map(weather => ({
                                            value: weather,
                                            label: weather
                                        }))
                                    }
                                }}
                                .value=${image.weather}
                                .label= ${"Weather Condition"}
                                propertyName="backgroundImages.${index}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                    <div class="image-time">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: Object.values(TimeOfDay).map(timeOfDay => ({
                                            value: timeOfDay,
                                            label: timeOfDay
                                        }))
                                    }
                                }}
                                .value=${image.timeOfDay}
                                .label= ${"Time of Day"}
                                propertyName="backgroundImages.${index}.timeOfDay"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>
                </div>
            `)}

            <mwc-button @click=${this._addBackgroundImage}>Add Background Image</mwc-button>
        `;
    }

    private _renderUnsplashSection() {
        return html`
            <div class="info-text">
                Configure Unsplash image source settings. An API key is required to use Unsplash.
                You can obtain a free API key from the Unsplash Developer portal.
            </div>

            <div class="row">
                <div class="label">Category</div>
                <div class="value">
                    <ha-textfield
                            label="Category"
                            .value=${this.config.imageConfig?.category || 'nature'}
                            @input=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                ev.preventDefault();

                                const target = ev.target as HTMLElement & { value?: string };
                                if (!target || !this.config) return;

                                // Create a deep copy of the config
                                const newConfig = JSON.parse(JSON.stringify(this.config));

                                // Ensure imageConfig exists
                                if (!newConfig.imageConfig) {
                                    newConfig.imageConfig = {};
                                }

                                // Update the category
                                newConfig.imageConfig.category = target.value || 'nature';

                                // Fire the config-changed event with the new config
                                this.dispatchEvent(new CustomEvent('config-changed', {
                                    detail: { config: newConfig }
                                }));
                            }}
                    ></ha-textfield>
                </div>
            </div>

            <ha-row-selector
                    min="1"
                    max="30"
                    .hass=${this.hass}
                    .selector=${{
                        text: {
                            type: 'number',
                        }
                    }}
                    .value=${this.config.imageConfig?.count || '5'}
                    .label= ${"Number of Photos"}
                    propertyName="imageConfig.count"
                    transformData=${(value: any) => {
                        // Parse the value as a number and ensure it's within range
                        let count = parseInt(value || '5', 10);
                        if (isNaN(count) || count < 1) count = 1;
                        if (count > 30) count = 30;
                        return count;
                    }}
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                An API key is required. Without a valid API key, the Unsplash image source will not
                work.
            </div>

            <div class="row">
                <div class="label">API Key</div>
                <div class="value">
                    <ha-textfield
                            label="API Key"
                            .value=${this.config.imageConfig?.apiKey || ''}
                            @input=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                ev.preventDefault();

                                const target = ev.target as HTMLElement & { value?: string };
                                if (!target || !this.config) return;

                                // Create a deep copy of the config
                                const newConfig = JSON.parse(JSON.stringify(this.config));

                                // Ensure imageConfig exists
                                if (!newConfig.imageConfig) {
                                    newConfig.imageConfig = {};
                                }

                                // Update the API key
                                newConfig.imageConfig.apiKey = target.value || '';

                                // Fire the config-changed event with the new config
                                this.dispatchEvent(new CustomEvent('config-changed', {
                                    detail: { config: newConfig }
                                }));
                            }}
                    ></ha-textfield>
                </div>
            </div>

            <div class="row">
                <div class="label">Content Filter</div>
                <div class="value">
                    <ha-select
                            label="Content Filter"
                            .value=${this.config.imageConfig?.contentFilter || 'high'}
                            @click=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                            }}
                            @closed=${(ev: CustomEvent) => {
                                ev.stopPropagation();

                                const target = ev.target as HTMLElement & { value?: string };
                                if (!target || !this.config) return;

                                // Create a deep copy of the config
                                const newConfig = JSON.parse(JSON.stringify(this.config));

                                // Ensure imageConfig exists
                                if (!newConfig.imageConfig) {
                                    newConfig.imageConfig = {};
                                }

                                // Update the content filter
                                newConfig.imageConfig.contentFilter = target.value || 'high';

                                // Fire the config-changed event with the new config
                                this.dispatchEvent(new CustomEvent('config-changed', {
                                    detail: { config: newConfig }
                                }));
                            }}
                    >
                        <mwc-list-item .value=${'low'}>Low</mwc-list-item>
                        <mwc-list-item .value=${'high'}>High</mwc-list-item>
                    </ha-select>
                </div>
            </div>
        `;
    }

    private _renderSensorImagesSection() {
        return html`
            <div class="info-text">
                Configure the sensor that provides the image list. The sensor should have a "files"
                attribute that contains an array of image URLs.
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .labelPosition=${'top'}
                    .selector=${{
                        entity: {
                            include_entities: this.hass ? Object.keys(this.hass.states)
                                .filter(entityId => {
                                    // Check if it's a sensor
                                    if (!entityId.startsWith('sensor.')) return false;

                                    // Check if it has a files attribute
                                    const entity = this.hass!.states[entityId];
                                    return entity && entity.attributes && entity.attributes.files !== undefined;
                                }) : []
                        }
                    }}
                    .value=${this.config.imageConfig?.entity || ''}
                    .label= ${"Sensor Entity"}
                    propertyName="imageConfig.entity"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                The sensor should have a "files" attribute that contains an array of image URLs.
                Images will be automatically categorized by weather condition and time of day based on
                their file paths.
                Include weather conditions (clear sky, clouds, rain, snow, mist) and time of day
                (sunrise-sunset, day, night) in your file paths.
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'background-editor': BackgroundEditor;
    }
}
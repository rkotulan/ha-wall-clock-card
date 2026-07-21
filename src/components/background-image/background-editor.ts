import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { BackgroundImage, TimeOfDay, Weather } from '../../image-sources';

/**
 * Editor component for background settings
 */
@customElement('background-editor')
export class BackgroundEditor extends BaseEditorSection {
    @property({ type: Array }) _backgroundImages: BackgroundImage[] = [];
    @state() private _expandedImageIndex: number | null = 0;

    // Image source options
    private _imageSourceOptions() {
        return [
            {value: 'none', label: this.t('editor.background.source_none', 'None (no background images)')},
            {value: 'picsum', label: this.t('editor.background.source_picsum', 'Picsum photos')},
            {value: 'local', label: this.t('editor.background.source_local', 'Local images')},
            {value: 'unsplash', label: 'Unsplash'},
            {value: 'sensor', label: this.t('editor.background.source_sensor', 'Sensor images')},
        ];
    }

    private _objectFitOptions() {
        return [
            {value: 'fill', label: this.t('editor.background.fit_fill', 'Fill')},
            {value: 'contain', label: this.t('editor.background.fit_contain', 'Contain')},
            {value: 'cover', label: this.t('editor.background.fit_cover', 'Cover')},
            {value: 'none', label: this.t('ui.none', 'None')},
            {value: 'scale-down', label: this.t('editor.background.fit_scale_down', 'Scale down')},
        ];
    }

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
        if (this._backgroundImages.length === 0) {
            this._expandedImageIndex = null;
        } else if (this._expandedImageIndex !== null) {
            this._expandedImageIndex = Math.min(this._expandedImageIndex, this._backgroundImages.length - 1);
        }
    }

    private _addBackgroundImage(): void {
        this._expandedImageIndex = this._backgroundImages.length;
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
        if (this._backgroundImages.length === 0) {
            this._expandedImageIndex = null;
        } else if (this._expandedImageIndex === index) {
            this._expandedImageIndex = Math.min(index, this._backgroundImages.length - 1);
        } else if (this._expandedImageIndex !== null && this._expandedImageIndex > index) {
            this._expandedImageIndex -= 1;
        }
        this._updateBackgroundImagesConfig();
    }

    private _toggleImage(index: number): void {
        this._expandedImageIndex = this._expandedImageIndex === index ? null : index;
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
            
            .image-card {
                margin: 10px 0;
                padding: 8px 10px 10px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .image-card.collapsed .image-header { margin-bottom: 0; }

            .image-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 2px;
            }

            .image-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .image-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .image-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .image-icon-button ha-icon { --mdc-icon-size: 18px; }

            .image-icon-button:hover,
            .image-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .image-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .image-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .image-body ha-row-selector {
                display: block;
                width: 100%;
                padding: 3px 0;
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
                                options: this._imageSourceOptions(),
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.imageSource || 'none'}
                        .label=${this.t('editor.background.source', 'Image source')}
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
                        .label=${this.t('editor.background.opacity', 'Background opacity')}
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
                        .label=${this.t('editor.background.rotation', 'Rotation interval (seconds)')}
                        propertyName="backgroundRotationInterval"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._objectFitOptions(),
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.objectFit || 'cover'}
                        .label=${this.t('editor.background.fit', 'Background image fit')}
                        propertyName="objectFit"
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
                ${this.t('editor.background.local_help', 'Configure local image URLs. Weather and time-of-day conditions can be selected for each image.')}
            </div>

            <div class="section-subheader">${this.t('editor.background.images', 'Background images')}</div>

            ${this._backgroundImages.map((image, index) => {
                const expanded = this._expandedImageIndex === index;
                const title = image.url || this.t('editor.background.image', 'Background image {number}', {number: index + 1});
                return html`
                <div class="image-card ${expanded ? '' : 'collapsed'}">
                    <div class="image-header">
                        <button class="image-toggle" type="button"
                                aria-expanded=${expanded}
                                @click=${() => this._toggleImage(index)}>
                            <span class="image-title">${title}</span>
                        </button>
                        <button class="image-icon-button remove" type="button"
                                title=${this.t('editor.background.remove', 'Remove background image')}
                                aria-label=${this.t('editor.background.remove', 'Remove background image')}
                                @click=${() => this._removeBackgroundImage(index)}>
                            <ha-icon icon="mdi:delete-outline"></ha-icon>
                        </button>
                        <button class="image-icon-button" type="button"
                                title=${expanded ? this.t('editor.background.collapse', 'Collapse background image') : this.t('editor.background.expand', 'Expand background image')}
                                aria-label=${expanded ? this.t('editor.background.collapse', 'Collapse background image') : this.t('editor.background.expand', 'Expand background image')}
                                @click=${() => this._toggleImage(index)}>
                            <ha-icon icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                        </button>
                    </div>
                    ${expanded ? html`<div class="image-body">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${image.url || ''}
                                .label=${this.t('editor.background.url', 'Image URL')}
                                propertyName="backgroundImages.${index}.url"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
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
                                .label=${this.t('editor.background.weather', 'Weather condition')}
                                propertyName="backgroundImages.${index}.weather"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
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
                                .label=${this.t('editor.background.time', 'Time of day')}
                                propertyName="backgroundImages.${index}.timeOfDay"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    </div>` : ''}
                </div>
            `;})}

            <mwc-button @click=${this._addBackgroundImage}>${this.t('editor.background.add', 'Add background image')}</mwc-button>
        `;
    }

    private _renderUnsplashSection() {
        return html`
            <div class="info-text">
                ${this.t('editor.background.unsplash_help', 'Configure Unsplash image source settings. An API key is required.')}
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text: {type: 'text'}}}
                    .value=${this.config.imageConfig?.category || 'nature'}
                    .label=${this.t('editor.background.category', 'Category')}
                    propertyName="imageConfig.category"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

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
                    .label=${this.t('editor.background.photo_count', 'Number of photos')}
                    propertyName="imageConfig.count"
                    .transformData=${(value: any) => {
                        // Parse the value as a number and ensure it's within range
                        let count = parseInt(value || '5', 10);
                        if (isNaN(count) || count < 1) count = 1;
                        if (count > 30) count = 30;
                        return count;
                    }}
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                ${this.t('editor.background.api_help', 'Without a valid API key, the Unsplash image source will not work.')}
            </div>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text: {type: 'password'}}}
                    .value=${this.config.imageConfig?.apiKey || ''}
                    .label=${this.t('editor.background.api_key', 'API key')}
                    propertyName="imageConfig.apiKey"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'low', label: 'Low'},
                        {value: 'high', label: 'High'},
                    ], mode: 'dropdown'}}}
                    .value=${this.config.imageConfig?.contentFilter || 'high'}
                    .label=${this.t('editor.background.content_filter', 'Content filter')}
                    propertyName="imageConfig.contentFilter"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>
        `;
    }

    private _renderSensorImagesSection() {
        return html`
            <div class="info-text">
                ${this.t('editor.background.sensor_help', 'Select a sensor whose files attribute contains an array of image URLs.')}
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
                    .label=${this.t('editor.background.sensor_entity', 'Sensor entity')}
                    propertyName="imageConfig.entity"
                    @value-changed=${this._handleFormValueChanged}
            ></ha-row-selector>

            <div class="info-text">
                ${this.t('editor.background.sensor_files_help', 'The sensor must expose a files attribute containing image URLs.')}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'background-editor': BackgroundEditor;
    }
}

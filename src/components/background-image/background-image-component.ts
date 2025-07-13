import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createLogger } from '../../utils/logger';
import {BackgroundImageController, BackgroundImageControllerConfig} from './background-image-controller';
import { Weather } from '../../image-sources';

@customElement('ha-background-image')
export class BackgroundImageComponent extends LitElement {
    // @property({ type: Number }) backgroundRotationInterval?: number;
    @property({ type: Number }) backgroundOpacity?: number = 0.5;
    @property({ type: String }) weather?: Weather;
    @property({ type: Object }) config?: BackgroundImageControllerConfig;

    private logger = createLogger('background-image-component');
    private backgroundImageController: BackgroundImageController;

    constructor() {
        super();
        // Initialize the controller with the host (this component) and an empty config
        // The actual config will be set later via the config property
        this.backgroundImageController = new BackgroundImageController(this, {});
    }

    static styles = css`
        :host {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .background-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: opacity 1s ease-in-out;
            opacity: 1;
        }

        .background-image.previous {
            opacity: 0;
        }

        .transitioning .background-image.previous {
            opacity: 1;
        }

        .transitioning .background-image:not(.previous) {
            opacity: 0;
        }

        .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('config')) {
            this.logger.debug('Property config changed, updating BackgroundImageController');

            // Update the controller with new configuration
            this.backgroundImageController.updateConfig(this.config ?? {});
        }

        // If weather changed, refresh the image
        if (changedProperties.has('weather')) {
            const currentWeather = this.weather || Weather.All;
            this.logger.info('Weather condition changed, refreshing background image for:', currentWeather);
            this.backgroundImageController.updateWeather(currentWeather);
        }
    }


    // Getters to expose controller state
    get currentImageUrl(): string {
        return this.backgroundImageController.currentImageUrl;
    }

    get previousImageUrl(): string {
        return this.backgroundImageController.previousImageUrl;
    }

    get isTransitioning(): boolean {
        return this.backgroundImageController.isTransitioning;
    }

    render() {
        const currentImageUrl = this.currentImageUrl;
        const previousImageUrl = this.previousImageUrl;
        const isTransitioning = this.isTransitioning;

        return html`
            <div class="background-container ${isTransitioning ? 'transitioning' : ''}">
                ${currentImageUrl ?
                    html`
                        ${isTransitioning && previousImageUrl ?
                            html`
                                <img
                                    class="background-image previous"
                                    src="${previousImageUrl}"
                                    @error="${(e: Event) => this.logger.error('Error rendering previous background image:', previousImageUrl, e)}"
                                >
                            ` : ''
                        }
                        <img
                            class="background-image"
                            src="${currentImageUrl}"
                            @load="${() => this.logger.debug('Background image rendered successfully:', currentImageUrl)}"
                            @error="${(e: Event) => this.logger.error('Error rendering background image:', currentImageUrl, e)}"
                        >
                        <div
                            class="background-overlay"
                            style="opacity: ${this.backgroundOpacity !== undefined ? this.backgroundOpacity : 0.5};"
                        ></div>
                    ` :
                    ''
                }
            </div>
        `;
    }
}

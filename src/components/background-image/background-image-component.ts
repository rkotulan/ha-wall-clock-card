import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createLogger } from '../../utils';
import {BackgroundImageController, BackgroundImageControllerConfig} from './background-image-controller';

@customElement('ha-background-image')
export class BackgroundImageComponent extends LitElement {
    @property({ type: Number }) backgroundOpacity?: number = 0.5;
    @property({ type: Object }) config?: BackgroundImageControllerConfig;

    private logger = createLogger('background-image-component');
    private backgroundImageController: BackgroundImageController;

    constructor() {
        super();
        // Initialize the controller with the host (this component) and an empty config
        // The actual config will be set later via the config property
        this.backgroundImageController = new BackgroundImageController(this, {});
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    get controller(): BackgroundImageController {
        return this.backgroundImageController;
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
            /* No default opacity or z-index - will be controlled by inline styles and @lit-labs/motion */            
        }

        .fade-out {            
            z-index: 0;
        }

        .fade-in {            
            z-index: 1;
        }

        .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            z-index: 2; /* Ensure overlay is above all images */
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('config')) {
                this.logger.debug('Property config changed, updating BackgroundImageController');

            // Update the controller with new configuration
            this.backgroundImageController.updateConfig(this.config ?? {});
        }
    }

    // Getters to expose controller state
    get currentImageUrl(): string {
        return this.backgroundImageController.currentImageUrl;
    }

    get previousImageUrl(): string {
        return this.backgroundImageController.previousImageUrl;
    }

    render() {
        const currentImageUrl = this.currentImageUrl;
        const previousImageUrl = this.previousImageUrl;

        return html`
            <div class="background-container">
                ${currentImageUrl ?
                    html`
                        ${previousImageUrl ? 
                            html`
                                <!-- Previous image that will fade out -->
                                <img class="background-image fade-out" src="${previousImageUrl}">
                            ` : ''
                        }
                        <!-- Current image that will fade in -->
                        <img class="background-image fade-in" src="${currentImageUrl}">
                        <div class="background-overlay" style="opacity: ${this.backgroundOpacity !== undefined ? this.backgroundOpacity : 0.5};"></div>
                    ` :
                    ''
                }
            </div>
        `;
    }
}

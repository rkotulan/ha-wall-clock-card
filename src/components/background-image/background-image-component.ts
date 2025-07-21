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
            opacity: 0;
            /* No default transition - will be added only during explicit transitions */
        }

        /* Default state - current image is visible */
        .background-image:not(.previous) {
            opacity: 1;
        }

        /* Initial state for transition */
        .transitioning .background-image {
            transition: none; /* Ensure no transition during setup */
        }

        .transitioning .background-image.previous {
            opacity: 1; /* Previous image starts visible */
        }

        .transitioning .background-image:not(.previous) {
            opacity: 0; /* New image starts invisible */
        }

        /* Active transition state - smooth transition between images */
        .transitioning.active-transition .background-image {
            transition: opacity 1s ease-in-out; /* Apply transition to all images */
        }

        .transitioning.active-transition .background-image.previous {
            opacity: 0; /* Previous image fades out */
        }

        .transitioning.active-transition .background-image:not(.previous) {
            opacity: 1; /* New image fades in */
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
                                <img class="background-image previous" src="${previousImageUrl}" >
                            ` : ''
                        }
                        <img class="background-image" src="${currentImageUrl}">
                        <div class="background-overlay" style="opacity: ${this.backgroundOpacity !== undefined ? this.backgroundOpacity : 0.5};"></div>
                    ` :
                    ''
                }
            </div>
        `;
    }
}

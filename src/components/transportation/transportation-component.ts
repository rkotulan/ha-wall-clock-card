import {html, css, PropertyValues} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {createLogger} from '../../utils';
import {TransportationController} from './transportation-controller';
import {
    TransportationConfig,
    TransportationData,
    TransportationDeparture
} from '../../transportation-providers';
import {BottomBarComponent} from '../bottom-bar';

export interface TransportationComponentConfig {
    transportation?: TransportationConfig;
    fontColor?: string;
}

@customElement('ha-transportation')
export class TransportationComponent extends BottomBarComponent {
    /**
     * Priority of this component
     * Higher priority components take precedence when multiple are active
     */
    get priority(): number {
        return 10; // Higher than action bar
    }

    /**
     * Whether this component wants to be displayed
     */
    get isActive(): boolean {
        return this.controller.isActive;
    }

    @property({type: Object}) transportation?: TransportationConfig;
    @property({type: String}) fontColor?: string;
    @property({type: Object}) hass?: any;

    private logger = createLogger('transportation-component');
    private transportationController: TransportationController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.transportationController = new TransportationController(this, {
            transportation: this.transportation
        });
    }

    get controller(): TransportationController {
        return this.transportationController;
    }

    static styles = css`
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
            min-height: 170px;
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
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 170px;
            width: 100%;
        }

        .transportation-loading {
            color: #FFFFFF;
            font-size: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 170px;
            width: 100%;
        }

        .transportation-update-time {
            font-size: 0.8rem;
            opacity: 0.7;
            text-align: center;
            margin-top: 8px;
            width: 100%;
        }

        /* Responsive adjustments */
        @media (min-width: 1280px) {
            .stop-group {
                margin-bottom: 16px;
            }
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('transportation')) {
            this.logger.debug('Transportation properties changed, updating TransportationController');

            // Update unified TransportationController with new configuration
            this.transportationController.updateConfig({
                transportation: this.transportation
            });
        }
    }

    render() {                
        if (!this.transportation || this.transportation.enabled !== true) {
            return html``;
        }

        const transportationData = this.transportationController.transportationData;
        const transportationDataLoaded = this.transportationController.transportationDataLoaded;

        // this.logger.debug(`Rendering transportation component isActive: ${this.controller.isActive} data: ${JSON.stringify(transportationData)} loaded: ${transportationDataLoaded}`);

        return html`
            ${this.controller.isActive
                    ? (transportationDataLoaded
                            ? html`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    ${this.renderTransportationContent(transportationData)}
                                </div>`
                            : html`
                                <div
                                        class="transportation-container"
                                        style="color: ${this.fontColor};"
                                >
                                    <div class="transportation-loading">Loading transportation data...</div>
                                </div>`)
                    : html``}
        `;
    }

    /**
     * Render transportation content
     */
    private renderTransportationContent(transportationData: TransportationData): any {
        if (transportationData.loading) {
            return html`
                <div class="transportation-loading">Loading transportation data...</div>`;
        }

        if (transportationData.error) {
            return html`
                <div class="transportation-error">${transportationData.error}</div>`;
        }

        if (!transportationData.departures || transportationData.departures.length === 0) {
            return html`
                <div class="transportation-loading">No departures available.</div>`;
        }

        // Group departures by stop name and postId
        const departuresByStop: { [key: string]: TransportationDeparture[] } = {};

        for (const departure of transportationData.departures) {
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
                            <h3 class="stop-name" style="color: ${this.fontColor};">
                                ${stopName}
                            </h3>
                            <div class="stop-departures">
                                ${departures.map(departure => html`
                                    <div class="departure-item">
                                        <div class="departure-line" style="color: ${this.fontColor};">
                                            ${departure.lineName}
                                        </div>
                                        <div class="departure-destination" style="color: ${this.fontColor};">→
                                            ${departure.finalStop}
                                        </div>
                                        <div class="departure-time" style="color: ${this.fontColor};">
                                            ${departure.timeMark}
                                        </div>
                                        ${departure.isLowFloor ? html`
                                            <div class="departure-lowfloor">♿</div>` : ''}
                                    </div>
                                `)}
                            </div>
                        </div>
                    `;
                })}
            </div>
        `;
    }
}

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createLogger } from '../../utils';
import { TransportationController } from './transportation-controller';
import {
    TransportationConfig,
    TransportationData,
    TransportationDeparture
} from '../../transportation-providers';

export interface TransportationComponentConfig {
    transportation?: TransportationConfig;
    transportationUpdateInterval?: number;
    enableTransportation?: boolean;
    fontColor?: string;
    actionBarEnabled?: boolean;
}

@customElement('ha-transportation')
export class TransportationComponent extends LitElement {
    @property({ type: Object }) transportation?: TransportationConfig;
    @property({ type: Number }) transportationUpdateInterval?: number;
    @property({ type: Boolean }) enableTransportation?: boolean = true;
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: any;
    @property({ type: Boolean }) actionBarEnabled?: boolean = false;

    private logger = createLogger('transportation-component');
    private transportationController: TransportationController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.transportationController = new TransportationController(this, {
            transportation: this.transportation,
            transportationUpdateInterval: this.transportationUpdateInterval,
            enableTransportation: this.enableTransportation
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
        @media (min-width: 1280px) {
            .stop-group {
                margin-bottom: 16px;
            }
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('transportation') || 
            changedProperties.has('transportationUpdateInterval') || 
            changedProperties.has('enableTransportation')) {

            this.logger.debug('Transportation properties changed, updating TransportationController');

            // Update unified TransportationController with new configuration
            this.transportationController.updateConfig({
                transportation: this.transportation,
                transportationUpdateInterval: this.transportationUpdateInterval,
                enableTransportation: this.enableTransportation
            });
        }

        // If actionBarEnabled changed, request an update to re-render
        if (changedProperties.has('actionBarEnabled')) {
            this.logger.debug('Action bar status changed, updating transportation component');
            this.requestUpdate();
        }
    }

    render() {
        if (!this.transportation || !this.enableTransportation) {
            return html``;
        }

        const transportationData = this.transportationController.transportationData;
        const transportationDataLoaded = this.transportationController.transportationDataLoaded;

        return html`
            ${!transportationDataLoaded ?
                // Only show the transportation button if action bar is disabled
                (!this.actionBarEnabled ? html`
                    <div class="transportation-on-demand-button"
                         @click=${this._handleTransportationClickAsync}>
                        <svg viewBox="0 0 24 24">
                            <path d="M4,16c0,0.88 0.39,1.67 1,2.22V20c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1h8v1c0,0.55 0.45,1 1,1h1c0.55,0 1-0.45 1-1v-1.78c0.61-0.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8,0.5-8,4v10zm3.5,1c-0.83,0-1.5-0.67-1.5-1.5S6.67,14 7.5,14s1.5,0.67 1.5,1.5S8.33,17 7.5,17zm9,0c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5,0.67 1.5,1.5-0.67,1.5-1.5,1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                    </div>` : html``) :
                html`
                    <div class="transportation-container" style="color: ${this.fontColor};">
                        ${this.renderTransportationContent(transportationData)}
                    </div>`
            }
        `;
    }

    /**
     * Render transportation content
     */
    private renderTransportationContent(transportationData: TransportationData): any {
        if (transportationData.loading) {
            return html`
                <div>Loading transportation data...</div>`;
        }

        if (transportationData.error) {
            return html`
                <div class="transportation-error">${transportationData.error}</div>`;
        }

        if (!transportationData.departures || transportationData.departures.length === 0) {
            return html`
                <div>No departures available</div>`;
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

    /**
     * Handle click on the transportation button
     * This is called when the user clicks the bus icon to load transportation data on demand
     */
    private async _handleTransportationClickAsync(): Promise<void> {
        this.transportationController.handleTransportationClick();
    }
}

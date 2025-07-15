import { ReactiveControllerHost } from 'lit';
import { BaseController } from '../../utils/controllers';
import {
    TransportationConfig,
    TransportationData,
    getTransportationProvider
} from '../../transportation-providers';

export interface TransportationControllerConfig {
    transportation?: TransportationConfig;
    transportationUpdateInterval?: number;
    enableTransportation?: boolean;
}

/**
 * A reactive controller that manages transportation data
 */
export class TransportationController extends BaseController {
    private intervalId?: number;
    private autoHideTimerId?: number;

    // Reactive properties for transportation data
    private _transportationData: TransportationData = { departures: [], loading: false };
    private _transportationDataLoaded: boolean = false;
    private _lastTransportationUpdate?: Date;

    // Configuration
    private config: TransportationControllerConfig = {};

    constructor(host: ReactiveControllerHost, config: TransportationControllerConfig = {}) {
        super(host, 'transportation-controller');
        this.config = config;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        // Only fetch data automatically if on-demand loading is not enabled
        if (this.config.transportation && this.config.enableTransportation !== false && !this.config.transportation?.onDemand) {
            // Fetch transportation data immediately
            this.fetchTransportationDataAsync();
            this._transportationDataLoaded = true;

            // Set up interval for regular updates
            this.setupUpdateInterval();
        }
    }

    protected onHostDisconnected(): void {
        // Clear intervals when disconnected
        this.clearTimers();
    }

    /**
     * Update the configuration
     */
    updateConfig(config: TransportationControllerConfig): void {
        this.logger.debug('Updating TransportationController config:', config);

        // Store old config for comparison
        const oldConfig = { ...this.config };

        // Update config
        this.config = { ...this.config, ...config };

        // Clear existing timers
        this.clearTimers();

        // If transportation is enabled and not on-demand, fetch data and set up interval
        if (this.config.transportation && this.config.enableTransportation !== false && !this.config.transportation?.onDemand) {
            // Only fetch new data if the configuration has changed significantly
            const shouldRefetch = 
                !oldConfig.transportation || 
                !this.config.transportation ||
                JSON.stringify(oldConfig.transportation) !== JSON.stringify(this.config.transportation) ||
                oldConfig.enableTransportation !== this.config.enableTransportation;

            if (shouldRefetch) {
                this.fetchTransportationDataAsync();
            }

            this._transportationDataLoaded = true;
            this.setupUpdateInterval();
        } else {
            // Reset data loaded flag if transportation is disabled or set to on-demand
            this._transportationDataLoaded = false;
        }

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Set up the update interval for transportation data
     */
    private setupUpdateInterval(): void {
        if (!this.config.transportation || this.config.enableTransportation === false) return;

        // Get configured transportation update interval or default to 60 seconds
        let transportationInterval = this.config.transportationUpdateInterval || 60;

        // Ensure minimum interval of 60 seconds
        transportationInterval = Math.max(transportationInterval, 60);

        // Convert to milliseconds
        const transportationIntervalMs = transportationInterval * 1000;

        this.logger.debug(`Setting transportation update interval to ${transportationInterval} seconds`);

        // Update transportation data at the configured interval
        this.intervalId = window.setInterval(() => {
            // Use a self-executing async function to allow await
            (async () => {
                try {
                    await this.fetchTransportationDataAsync();
                } catch (error) {
                    this.logger.error('Error in transportation update interval:', error);
                }
            })();
        }, transportationIntervalMs);
    }

    /**
     * Clear all timers
     */
    private clearTimers(): void {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
        }

        if (this.autoHideTimerId) {
            window.clearTimeout(this.autoHideTimerId);
            this.autoHideTimerId = undefined;
        }
    }

    /**
     * Fetch transportation data from the configured provider
     */
    public async fetchTransportationDataAsync(): Promise<void> {
        if (!this.config.transportation || this.config.enableTransportation === false) return;

        // Mark as loading
        this._transportationData = {
            ...this._transportationData,
            loading: true,
            error: undefined
        };

        // Request an update to show loading state
        this.host.requestUpdate();

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
            this._transportationData = await provider.fetchTransportationAsync(providerConfig, stops);

            // Update the last update timestamp
            this._lastTransportationUpdate = new Date();

            this.logger.debug(`Fetched transportation data from ${provider.name}:`, this._transportationData);
        } catch (error) {
            this.logger.error('Error fetching transportation data:', error);
            this._transportationData = {
                departures: [],
                error: error instanceof Error ? error.message : String(error),
                loading: false
            };
        }

        // Request an update to show the new data
        this.host.requestUpdate();
    }

    /**
     * Handle click on the transportation button
     * This is called when the user clicks the bus icon to load transportation data on demand
     */
    public async handleTransportationClick(): Promise<void> {
        this.logger.debug('Transportation button clicked, loading data on demand');

        // Fetch transportation data
        await this.fetchTransportationDataAsync();

        // Mark as loaded so the button is replaced with the data
        this._transportationDataLoaded = true;

        // Set up an interval to update the data if configured
        this.setupUpdateInterval();

        // Set up auto-hide timer if configured
        if (this.config.transportation?.autoHideTimeout) {
            // Clear any existing auto-hide timer
            if (this.autoHideTimerId) {
                clearTimeout(this.autoHideTimerId);
            }

            // Get configured auto-hide timeout or default to 5 minutes
            let autoHideTimeout = this.config.transportation.autoHideTimeout || 5;

            // Ensure timeout is between 1 and 10 minutes
            autoHideTimeout = Math.max(1, Math.min(10, autoHideTimeout));

            // Convert to milliseconds
            const autoHideTimeoutMs = autoHideTimeout * 60 * 1000;

            this.logger.debug(`Setting transportation auto-hide timeout to ${autoHideTimeout} minutes`);

            // Set timer to hide departures and show bus button again after timeout
            this.autoHideTimerId = window.setTimeout(() => {
                this.logger.debug(`Auto-hiding transportation departures after ${autoHideTimeout} minutes`);
                this._transportationDataLoaded = false;
                this.host.requestUpdate();
            }, autoHideTimeoutMs);
        }

        // Request an update to show the data
        this.host.requestUpdate();
    }

    // Getter methods
    get transportationData(): TransportationData {
        return this._transportationData;
    }

    get transportationDataLoaded(): boolean {
        return this._transportationDataLoaded;
    }

    get lastTransportationUpdate(): Date | undefined {
        return this._lastTransportationUpdate;
    }
}

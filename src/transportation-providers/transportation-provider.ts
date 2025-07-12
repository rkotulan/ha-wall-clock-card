/**
 * Interface for transportation provider plugins
 * All transportation provider plugins must implement this interface
 */
export interface TransportationProviderConfig {
  // Common configuration properties for all transportation providers
  [key: string]: any; // Allow additional provider-specific properties
}

/**
 * Interface for a single stop/platform configuration
 */
export interface StopConfig {
  stopId: number | string;
  postId?: number | string;
  name?: string; // Optional custom name for the stop
  [key: string]: any; // Allow additional provider-specific properties
}

/**
 * Interface for transportation configuration
 */
export interface TransportationConfig {
  provider: string; // ID of the transportation provider
  providerConfig?: TransportationProviderConfig; // Configuration for the transportation provider
  stops: StopConfig[]; // Array of stop configurations
  maxDepartures?: number; // Global max departures setting (applies to all stops if not specified at stop level)
  onDemand?: boolean; // Whether to load transportation data on demand (only when clicked)
  autoHideTimeout?: number; // Time in minutes after which to hide departures and show the bus button again (1-10 minutes)
}

/**
 * Interface for transportation departure data
 */
export interface TransportationDeparture {
  lineId: number | string;
  lineName: string;
  finalStop: string;
  isLowFloor: boolean;
  timeMark: string;
  stopName: string; // Added to identify which stop this departure belongs to
  postId?: number | string; // Added to identify which platform this departure belongs to
  [key: string]: any; // Allow additional provider-specific properties
}

/**
 * Interface for transportation data
 */
export interface TransportationData {
  departures: TransportationDeparture[];
  error?: string;
  loading: boolean;
}

export interface TransportationProvider {
  /**
   * The unique identifier for this transportation provider
   */
  readonly id: string;

  /**
   * The display name of this transportation provider
   */
  readonly name: string;

  /**
   * Description of this transportation provider
   */
  readonly description: string;

  /**
   * Fetch transportation data from this provider
   * @param config Configuration for this transportation provider
   * @param stops Array of stop configurations
   * @returns Promise that resolves to transportation data
   */
  fetchTransportationAsync(config: TransportationProviderConfig, stops: StopConfig[]): Promise<TransportationData>;

  /**
   * Get the default configuration for this transportation provider
   * @returns Default configuration
   */
  getDefaultConfig(): TransportationProviderConfig;
}

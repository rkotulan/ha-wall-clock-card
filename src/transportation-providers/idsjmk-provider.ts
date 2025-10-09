import { 
  TransportationProvider, 
  TransportationProviderConfig, 
  StopConfig, 
  TransportationData, 
  TransportationDeparture 
} from './transportation-provider';
import { logger } from '../utils/logger';

/**
 * Configuration for the IDSJMK transportation provider
 */
export interface IDSJMKProviderConfig extends TransportationProviderConfig {
  // No additional configuration needed for IDSJMK
}

/**
 * IDSJMK transportation provider
 * Fetches transportation data from the IDSJMK API (Integrated Transport System of the South Moravian Region, Czech Republic)
 */
export class IDSJMKProvider implements TransportationProvider {
  readonly id = 'idsjmk';
  readonly name = 'DPMB (Brno)';
  readonly description = 'Integrated Transport System of the South Moravian Region, Czech Republic';

  /**
   * Fetch transportation data from the IDSJMK API
   * @param config Configuration for the IDSJMK provider
   * @param stops Array of stop configurations
   * @returns Promise that resolves to transportation data
   */
  async fetchTransportationAsync(_config: IDSJMKProviderConfig, stops: StopConfig[]): Promise<TransportationData> {
    try {
      if (stops.length === 0) {
        throw new Error('No stops configured');
      }

      // Group stops by stopId to minimize API calls
      const stopsByStopId: { [key: string]: StopConfig[] } = {};
      for (const stop of stops) {
        const stopId = String(stop.stopId);
        if (!stopsByStopId[stopId]) {
          stopsByStopId[stopId] = [];
        }
        stopsByStopId[stopId].push(stop);
      }

      // Fetch data for each unique stopId
      const allDepartures: TransportationDeparture[] = [];

      // Process each stopId
      for (const stopId of Object.keys(stopsByStopId)) {
        const stopsForThisId = stopsByStopId[stopId];
        const postIds = stopsForThisId.map(s => s.postId);

        // Make a single API call without postId parameter
        const baseUrl = `https://transportation-proxy.datario.app/proxy/departures?stopid=${stopId}`;


        // Make the request with the specified User-Agent
        // Removed X-ClientId header to avoid CORS preflight issues with AllOrigins proxy
        const response = await fetch(baseUrl, {
          headers: {
             'X-Api-Key': '2f8a0c7b2e9a44a4b8aa9a6b4a3d1e2f'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch transportation data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Check for API error
        if (data.Error) {
          throw new Error(`API error: ${data.Error}`);
        }

        // Process each configured postId for this stopId
        for (const postId of postIds) {
          // Find the post with the matching postId
          const post = data.PostList.find((p: any) => p.PostID === postId);

          if (!post) {
            logger.warn(`No platform found with postId ${postId} for stopId ${stopId}`);
            continue;
          }

          // Get the stop name from the post
          const apiStopName = post.Name;

          // Find the stop config for this stopId and postId
          const stopConfig = stopsForThisId.find(s => s.postId === postId);
          if (!stopConfig) continue;

          // Use custom name if provided, otherwise use API-provided name
          const stopName = stopConfig.name || apiStopName;

          // Get the departures and limit to maxDepartures (global setting from config or default 2)
          const maxDepartures = _config.maxDepartures || 2;

          const departures = post.Departures.slice(0, Math.min(maxDepartures, 5)).map((dep: any) => ({
            lineId: dep.LineId || dep.Line,
            lineName: dep.Line || dep.LineName,
            finalStop: dep.FinalStop,
            isLowFloor: dep.IsLowFloor,
            timeMark: dep.TimeMark,
            stopName: stopName,
            postId: postId
          }));

          // Add these departures to the combined list
          allDepartures.push(...departures);
        }
      }

      // Return the transportation data
      return {
        departures: allDepartures,
        loading: false
      };
    } catch (error) {
      logger.error('Error fetching transportation data:', error);
      return {
        departures: [],
        error: error instanceof Error ? error.message : String(error),
        loading: false
      };
    }
  }

  /**
   * Get the default configuration for the IDSJMK provider
   * @returns Default configuration
   */
  getDefaultConfig(): IDSJMKProviderConfig {
    return {};
  }
}

// Create and export an instance of the IDSJMK provider
export const idsjmkProvider = new IDSJMKProvider();

import { HomeAssistant } from 'custom-card-helpers';
import {
  StopConfig,
  TransportationData,
  TransportationDeparture,
  TransportationProvider,
  TransportationProviderConfig,
} from './transportation-provider';

export interface HomeAssistantTransportationConfig extends TransportationProviderConfig {
  departureEntities?: string[];
  refreshButtonEntity?: string;
}

/** Reads on-demand departure sensors created by the Transit Departures integration. */
export class HomeAssistantTransportationProvider implements TransportationProvider {
  readonly id = 'homeassistant';
  readonly name = 'Home Assistant entities';
  readonly description = 'Departure sensors and an on-demand refresh button from Home Assistant';
  readonly usesHassStateUpdates = true;

  private hass?: HomeAssistant;

  setHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  async activateAsync(config: HomeAssistantTransportationConfig): Promise<void> {
    const hass = this.requireHass();
    const entityId = config.refreshButtonEntity?.trim();
    if (!entityId) {
      throw new Error('Home Assistant refresh button entity is required');
    }
    if (!hass.states[entityId]) {
      throw new Error(`Entity ${entityId} not found`);
    }

    await hass.callService('button', 'press', { entity_id: entityId });
  }

  async fetchTransportationAsync(
    config: HomeAssistantTransportationConfig,
    _stops: StopConfig[],
  ): Promise<TransportationData> {
    try {
      const hass = this.requireHass();
      const entityIds = this.getEntityIds(config);
      if (entityIds.length === 0) {
        throw new Error('At least one Home Assistant departure sensor is required');
      }

      const maxDepartures = Math.max(1, Math.min(Number(config.maxDepartures) || 2, 5));
      const departures: TransportationDeparture[] = [];

      for (const entityId of entityIds) {
        const state = hass.states[entityId];
        if (!state) {
          throw new Error(`Entity ${entityId} not found`);
        }
        if (state.state === 'unknown' || state.state === 'unavailable') {
          continue;
        }

        const attributes = state.attributes as Record<string, unknown>;
        const line = attributes.line;
        const destination = attributes.destination;
        if (line === undefined || !destination) {
          continue;
        }

        departures.push({
          lineId: String(line),
          lineName: String(line),
          finalStop: String(destination),
          isLowFloor: attributes.is_low_floor === true,
          timeMark: this.formatState(hass, state),
          stopName: String(attributes.stop_name || state.attributes.friendly_name || entityId),
          postId: this.optionalIdentifier(attributes.post_id),
          entityId,
          departureAt: attributes.departure_at,
          hasAirConditioning: attributes.has_air_conditioning === true,
          occupancy: attributes.occupancy,
          occupancyPercent: attributes.occupancy_percent,
          vehicleId: attributes.vehicle_id,
        });

        if (departures.length >= maxDepartures) {
          break;
        }
      }

      return { departures, loading: false };
    } catch (error) {
      return {
        departures: [],
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      };
    }
  }

  getHassStateKey(config: HomeAssistantTransportationConfig): string {
    if (!this.hass) return '';
    return this.getEntityIds(config)
      .map(entityId => {
        const state = this.hass?.states[entityId];
        return state
          ? `${entityId}:${state.state}:${state.last_updated}:${JSON.stringify(state.attributes)}`
          : `${entityId}:missing`;
      })
      .join('|');
  }

  getDefaultConfig(): HomeAssistantTransportationConfig {
    return {
      departureEntities: [],
      refreshButtonEntity: '',
    };
  }

  private requireHass(): HomeAssistant {
    if (!this.hass) {
      throw new Error('Home Assistant instance not set');
    }
    return this.hass;
  }

  private getEntityIds(config: HomeAssistantTransportationConfig): string[] {
    return (config.departureEntities || []).map(entityId => entityId.trim()).filter(Boolean);
  }

  private formatState(hass: HomeAssistant, state: HomeAssistant['states'][string]): string {
    const formatEntityState = (hass as any).formatEntityState;
    if (typeof formatEntityState === 'function') {
      try {
        return String(formatEntityState.call(hass, state));
      } catch {
        // Fall through to the raw state and unit on older HA frontends.
      }
    }
    const unit = state.attributes.unit_of_measurement;
    return `${state.state}${unit ? ` ${unit}` : ''}`;
  }

  private optionalIdentifier(value: unknown): string | number | undefined {
    return typeof value === 'string' || typeof value === 'number' ? value : undefined;
  }
}

export const homeAssistantTransportationProvider = new HomeAssistantTransportationProvider();

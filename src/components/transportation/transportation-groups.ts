import {TransportationDeparture} from '../../transportation-providers';

export interface TransportationDepartureGroup {
    id: string;
    stopName: string;
    departures: TransportationDeparture[];
}

/** Group departures by configured profile/platform while preserving display order. */
export function groupTransportationDepartures(
    departures: TransportationDeparture[],
): TransportationDepartureGroup[] {
    const groups = new Map<string, TransportationDepartureGroup>();

    for (const departure of departures) {
        const id = String(departure.groupId ?? `${departure.stopName}-${departure.postId}`);
        const existing = groups.get(id);
        if (existing) {
            existing.departures.push(departure);
        } else {
            groups.set(id, {
                id,
                stopName: departure.stopName,
                departures: [departure],
            });
        }
    }

    return [...groups.values()];
}

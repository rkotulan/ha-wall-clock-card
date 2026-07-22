import { HomeAssistantTransportationProvider } from '../src/transportation-providers/homeassistant-transportation-provider';

function departureState(
    state: string,
    line: string,
    destination: string,
    stopName = 'Schodová (město)',
    postId = 2,
): any {
    return {
        state,
        last_updated: '2026-07-22T12:00:00+00:00',
        attributes: {
            friendly_name: `Departure ${line}`,
            unit_of_measurement: 'min',
            line,
            destination,
            stop_name: stopName,
            post_id: postId,
            is_low_floor: true,
        },
    };
}

describe('HomeAssistantTransportationProvider', () => {
    it('presses the configured button and maps departure sensors', async () => {
        const callService = jest.fn().mockResolvedValue(undefined);
        const hass: any = {
            callService,
            formatEntityState: (state: any) => `${state.state} min`,
            states: {
                'button.schodova_refresh': {state: 'unknown', attributes: {}},
                'sensor.schodova_departure_1': departureState('4', '67', 'Avion Shopping Park'),
                'sensor.schodova_departure_2': departureState('11', '67', 'Avion Shopping Park'),
            },
        };
        const provider = new HomeAssistantTransportationProvider();
        provider.setHass(hass);

        const config = {
            refreshButtonEntity: 'button.schodova_refresh',
            departureEntities: ['sensor.schodova_departure_1', 'sensor.schodova_departure_2'],
            maxDepartures: 2,
        };
        await provider.activateAsync(config);
        const result = await provider.fetchTransportationAsync(config, []);

        expect(callService).toHaveBeenCalledWith('button', 'press', {
            entity_id: 'button.schodova_refresh',
        });
        expect(result.error).toBeUndefined();
        expect(result.departures).toEqual([
            expect.objectContaining({
                lineName: '67',
                finalStop: 'Avion Shopping Park',
                timeMark: '4 min',
                stopName: 'Schodová (město)',
                postId: 2,
                isLowFloor: true,
            }),
            expect.objectContaining({timeMark: '11 min'}),
        ]);
    });

    it('ignores an unavailable optional departure slot', async () => {
        const provider = new HomeAssistantTransportationProvider();
        provider.setHass({
            states: {
                'sensor.departure_1': departureState('unavailable', '67', 'Avion Shopping Park'),
            },
        } as any);

        const result = await provider.fetchTransportationAsync({
            departureEntities: ['sensor.departure_1'],
        }, []);

        expect(result).toEqual({departures: [], loading: false});
    });

    it('activates multiple profiles and applies the limit to each stop', async () => {
        const callService = jest.fn().mockResolvedValue(undefined);
        const hass: any = {
            callService,
            states: {
                'button.schodova': {state: 'unknown', attributes: {}},
                'button.za_luzankami': {state: 'unknown', attributes: {}},
                'sensor.schodova_1': departureState('4', '67', 'Avion'),
                'sensor.schodova_2': departureState('11', '67', 'Avion'),
                'sensor.schodova_3': departureState('18', '67', 'Avion'),
                'sensor.za_luzankami_1': departureState(
                    '3', '25', 'Líšeň, Jírova', 'Za Lužánkami (Vinohrady)', 1,
                ),
                'sensor.za_luzankami_2': departureState(
                    '9', '26', 'Štefánikova čtvrť', 'Za Lužánkami (Vinohrady)', 1,
                ),
                'sensor.za_luzankami_3': departureState(
                    '15', '25', 'Osová', 'Za Lužánkami (Vinohrady)', 1,
                ),
            },
        };
        const provider = new HomeAssistantTransportationProvider();
        provider.setHass(hass);
        const config = {
            refreshButtonEntities: ['button.schodova', 'button.za_luzankami'],
            departureEntities: [
                'sensor.schodova_1',
                'sensor.schodova_2',
                'sensor.schodova_3',
                'sensor.za_luzankami_1',
                'sensor.za_luzankami_2',
                'sensor.za_luzankami_3',
            ],
            maxDepartures: 2,
        };

        await provider.activateAsync(config);
        const result = await provider.fetchTransportationAsync(config, []);

        expect(callService).toHaveBeenCalledWith('button', 'press', {
            entity_id: ['button.schodova', 'button.za_luzankami'],
        });
        expect(result.departures).toHaveLength(4);
        expect(result.departures.map(item => item.stopName)).toEqual([
            'Schodová (město)',
            'Schodová (město)',
            'Za Lužánkami (Vinohrady)',
            'Za Lužánkami (Vinohrady)',
        ]);
    });
});

import {TransportationController} from '../src/components/transportation/transportation-controller';
import {
    registerTransportationProvider,
    TransportationData,
    TransportationProvider,
} from '../src/transportation-providers';

const mockHost = {
    requestUpdate: jest.fn(),
    addController: jest.fn(),
    removeController: jest.fn(),
};

describe('TransportationController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not revive a modal or start polling after it is closed while loading', async () => {
        let resolveFetch!: (data: TransportationData) => void;
        let markFetchStarted!: () => void;
        const fetchStarted = new Promise<void>(resolve => {
            markFetchStarted = resolve;
        });
        const pendingData = new Promise<TransportationData>(resolve => {
            resolveFetch = resolve;
        });
        const provider: TransportationProvider = {
            id: 'deferred-test-provider',
            name: 'Deferred test provider',
            description: 'Test only',
            getDefaultConfig: () => ({}),
            fetchTransportationAsync: async () => {
                markFetchStarted();
                return pendingData;
            },
        };
        registerTransportationProvider(provider);

        const controller = new TransportationController(mockHost as never, {
            transportation: {
                enabled: true,
                provider: provider.id,
                displayMode: 'modal',
                stops: [],
                updateInterval: 60,
            },
        });

        const activation = controller.handleTransportationClick();
        await fetchStarted;
        controller.dismissTransportation();
        resolveFetch({departures: [], loading: false});
        await activation;

        expect(controller.isActive).toBe(false);
        expect(controller.transportationDataLoaded).toBe(false);
        expect((controller as unknown as {intervalId?: number}).intervalId).toBeUndefined();
    });

    it('deactivates a modal when its auto-hide timer expires', async () => {
        jest.useFakeTimers();
        const previousWindow = (global as any).window;
        (global as any).window = global;

        try {
            const provider: TransportationProvider = {
                id: 'modal-auto-hide-test-provider',
                name: 'Modal auto-hide test provider',
                description: 'Test provider',
                usesHassStateUpdates: true,
                getDefaultConfig: () => ({}),
                fetchTransportationAsync: async () => ({departures: [], loading: false}),
            };
            registerTransportationProvider(provider);

            const controller = new TransportationController(mockHost as never, {
                transportation: {
                    enabled: true,
                    provider: provider.id,
                    displayMode: 'modal',
                    stops: [],
                    autoHideTimeout: 1,
                },
            });

            await controller.handleTransportationClick();
            expect(controller.isActive).toBe(true);
            expect(controller.transportationDataLoaded).toBe(true);

            jest.advanceTimersByTime(60_000);

            expect(controller.isActive).toBe(false);
            expect(controller.transportationDataLoaded).toBe(false);
        } finally {
            jest.useRealTimers();
            (global as any).window = previousWindow;
        }
    });
});

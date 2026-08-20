import {BackgroundImageController} from '../src/components/background-image/background-image-controller';
import {BackgroundImageManager, Weather} from '../src/image-sources';
import {Messenger, WeatherMessage} from '../src/utils';

const flushPromises = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

describe('BackgroundImageController', () => {
    const previousWindow = (global as any).window;
    let controller: BackgroundImageController | undefined;

    const host = {
        requestUpdate: jest.fn(),
        updateComplete: Promise.resolve(true),
        addController: jest.fn(),
        removeController: jest.fn(),
    };

    beforeEach(() => {
        jest.useFakeTimers();
        (global as any).window = global;
        jest.clearAllMocks();
    });

    afterEach(() => {
        controller?.hostDisconnected();
        controller = undefined;
        jest.restoreAllMocks();
        jest.useRealTimers();
        (global as any).window = previousWindow;
    });

    it('does not fall back to Picsum when weather arrives before card config', async () => {
        const initialize = jest.spyOn(BackgroundImageManager.prototype, 'initialize');
        controller = new BackgroundImageController(host as never, {});
        controller.hostConnected();

        Messenger.getInstance().publish(new WeatherMessage(Weather.All));
        await flushPromises();

        expect(initialize).not.toHaveBeenCalled();
        expect(controller.isInitialized).toBe(false);
        expect((controller as unknown as {imageRotationTimer?: number}).imageRotationTimer).toBeUndefined();
    });

    it('fetches after an explicit source arrives following an early weather message', async () => {
        controller = new BackgroundImageController(host as never, {});
        const fetchNewImage = jest.spyOn(
            controller as unknown as {fetchNewImageAsync: (weather: Weather) => Promise<void>},
            'fetchNewImageAsync'
        ).mockResolvedValue();
        controller.hostConnected();

        Messenger.getInstance().publish(new WeatherMessage(Weather.All));
        controller.updateConfig({imageSourceConfig: {imageSourceId: 'picsum'}});
        await flushPromises();

        expect(controller.isInitialized).toBe(true);
        expect(fetchNewImage).toHaveBeenCalledWith(Weather.All);
    });

    it('clears an active image and timer when the source changes to none', async () => {
        controller = new BackgroundImageController(host as never, {
            imageSourceConfig: {imageSourceId: 'picsum'},
        });
        controller.hostConnected();
        await flushPromises();

        const state = controller as unknown as {
            _currentImageUrl: string;
            _previousImageUrl: string;
            imageRotationTimer?: number;
            backgroundImageManager: BackgroundImageManager;
        };
        state._currentImageUrl = 'https://example.com/current.jpg';
        state._previousImageUrl = 'https://example.com/previous.jpg';
        expect(state.imageRotationTimer).toBeDefined();

        controller.updateConfig({imageSourceConfig: {imageSourceId: 'none'}});
        await flushPromises();

        expect(controller.currentImageUrl).toBe('');
        expect(controller.previousImageUrl).toBe('');
        expect(controller.isInitialized).toBe(false);
        expect(state.imageRotationTimer).toBeUndefined();
        expect(state.backgroundImageManager.getImageSourceId()).toBe('none');
        expect(host.requestUpdate).toHaveBeenCalled();
    });
});

import {HomeAssistant} from 'custom-card-helpers';
import {WeatherController, WeatherControllerConfig} from '../src/components/weather/weather-controller';

describe('weather polling lifecycle', () => {
    const previousWindow = (global as any).window;
    const config: WeatherControllerConfig = {
        showWeather: true,
        weatherProvider: 'homeassistant',
        weatherConfig: {entityId: 'weather.test'},
    };
    let controller: WeatherController;
    let callWS: jest.Mock;
    let hass: HomeAssistant;

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-09-09T12:00:00Z'));
        (global as any).window = global;
        // No forecast subscription: polling must keep working on its own.
        callWS = jest.fn().mockImplementation(async () => ({
            response: {
                'weather.test': {
                    forecast: [{datetime: new Date().toISOString(), temperature: 20, condition: 'sunny'}],
                },
            },
        }));
        hass = {
            states: {'weather.test': {state: 'sunny', attributes: {temperature: 20, supported_features: 1}}},
            callWS,
        } as unknown as HomeAssistant;
        controller = new WeatherController({
            addController: jest.fn(),
            removeController: jest.fn(),
            requestUpdate: jest.fn(),
            updateComplete: Promise.resolve(true),
        });
        // Lit connects the controller before updated() forwards widget config.
        controller.hostConnected();
    });

    afterEach(() => {
        controller.hostDisconnected();
        jest.useRealTimers();
        (global as any).window = previousWindow;
    });

    it('refreshes the forecast over 24 hours with the default interval', async () => {
        await controller.updateConfigAsync(config, hass);
        expect(callWS).toHaveBeenCalledTimes(1);

        await jest.advanceTimersByTimeAsync(24 * 60 * 60 * 1000);

        expect(callWS).toHaveBeenCalledTimes(49);
        expect(controller.weatherData?.daily[0].date.toISOString()).toBe('2026-09-10T12:00:00.000Z');
    });

    it('stops polling when disabled and resumes when enabled without changing the interval', async () => {
        await controller.updateConfigAsync(config, hass);
        await controller.updateConfigAsync({...config, showWeather: false}, hass);
        expect(jest.getTimerCount()).toBe(0);
        await jest.advanceTimersByTimeAsync(1800 * 1000);
        expect(callWS).toHaveBeenCalledTimes(1);

        await controller.updateConfigAsync(config, hass);
        expect(callWS).toHaveBeenCalledTimes(2);
        await jest.advanceTimersByTimeAsync(1800 * 1000);
        expect(callWS).toHaveBeenCalledTimes(3);
    });

    it('does not postpone polling on repeated hass updates', async () => {
        await controller.updateConfigAsync(config, hass);
        for (let minute = 0; minute < 30; minute++) {
            await controller.updateConfigAsync(config, {...hass});
            await jest.advanceTimersByTimeAsync(60 * 1000);
        }
        expect(callWS).toHaveBeenCalledTimes(2);
        expect(jest.getTimerCount()).toBe(1);
    });

    it('replaces the timer when the configured interval changes', async () => {
        await controller.updateConfigAsync({...config, weatherUpdateInterval: 1800}, hass);
        await controller.updateConfigAsync({...config, weatherUpdateInterval: 60}, hass);
        await jest.advanceTimersByTimeAsync(1800 * 1000);
        expect(callWS).toHaveBeenCalledTimes(31);
        expect(jest.getTimerCount()).toBe(1);
    });

    it('cleans up on disconnect and resumes on reconnect', async () => {
        await controller.updateConfigAsync(config, hass);
        controller.hostDisconnected();
        expect(jest.getTimerCount()).toBe(0);
        await jest.advanceTimersByTimeAsync(1800 * 1000);
        expect(callWS).toHaveBeenCalledTimes(1);

        controller.hostConnected();
        await jest.advanceTimersByTimeAsync(1800 * 1000);
        expect(callWS).toHaveBeenCalledTimes(3);
        expect(jest.getTimerCount()).toBe(1);
    });
});

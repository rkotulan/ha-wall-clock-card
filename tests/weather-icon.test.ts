import {resolveWeatherIconKind} from '../src/components/weather/weather-icon-kind';

describe('resolveWeatherIconKind', () => {
    test.each([
        ['sunny', '', 'clear-day'],
        ['clear_sky', 'clearsky_night.svg', 'clear-night'],
        ['scattered_clouds', 'fair_day.svg', 'partly-cloudy-day'],
        ['scattered_clouds', 'fair_night.svg', 'partly-cloudy-night'],
        ['overcast_clouds', '', 'cloudy'],
        ['light rain', '', 'rain'],
        ['heavy_intensity_rain', '', 'pouring'],
        ['lightning-rainy', '', 'thunderstorm'],
        ['snowy', '', 'snow'],
        ['snowy-rainy', '', 'sleet'],
        ['mist', '', 'fog'],
        ['hail', '', 'hail'],
        ['windy-variant', '', 'windy'],
        ['exceptional', '', 'exceptional'],
    ] as const)('maps %s (%s) to %s', (condition, source, expected) => {
        expect(resolveWeatherIconKind(condition, source)).toBe(expected);
    });

    it('uses OpenWeatherMap icon codes as a day/night hint', () => {
        expect(resolveWeatherIconKind('clear sky', 'https://openweathermap.org/img/wn/01n@2x.png'))
            .toBe('clear-night');
        expect(resolveWeatherIconKind('few clouds', 'https://openweathermap.org/img/wn/02n@2x.png'))
            .toBe('partly-cloudy-night');
    });

    test.each([
        ['déšť', '09d', 'pouring'],
        ['déšť', '10d', 'rain'],
        ['bouřka', '11d', 'thunderstorm'],
        ['sněžení', '13d', 'snow'],
        ['mlha', '50d', 'fog'],
    ] as const)('maps localized OWM condition %s using code %s', (condition, code, expected) => {
        expect(resolveWeatherIconKind(condition, `https://openweathermap.org/img/wn/${code}@2x.png`))
            .toBe(expected);
    });

    it('falls back to clear day for unknown and missing conditions', () => {
        expect(resolveWeatherIconKind('unknown')).toBe('clear-day');
        expect(resolveWeatherIconKind()).toBe('clear-day');
    });
});

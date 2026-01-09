import { OpenWeatherMapProvider } from '../src/weather-providers/openweathermap-provider';
import { Weather } from '../src/image-sources/types';

describe('OpenWeatherMapProvider', () => {
  let provider: OpenWeatherMapProvider;

  beforeEach(() => {
    provider = new OpenWeatherMapProvider();
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        list: [
          {
            dt: 1672574400,
            main: { temp: 20, humidity: 50, pressure: 1013, feels_like: 19 },
            weather: [{ description: 'clear sky', icon: '01d' }],
            wind: { speed: 5, deg: 180 }
          }
        ]
      })
    });
  });

  it('should have correct ID and name', () => {
    expect(provider.id).toBe('openweathermap');
    expect(provider.name).toBe('OpenWeatherMap');
  });

  it('should fetch weather data correctly with default icons', async () => {
    const config = { apiKey: 'test-key' };
    const result = await provider.fetchWeatherAsync(config);

    expect(result.current.temperature).toBe(20);
    expect(result.current.icon).toContain('openweathermap.org/img/wn/01d@2x.png');
    expect(result.current.conditionUnified).toBe(Weather.ClearSky);
  });

  it('should fetch weather data correctly with Met.no icons', async () => {
    const config = { apiKey: 'test-key', iconSet: 'metno' };
    const result = await provider.fetchWeatherAsync(config);

    expect(result.current.icon).toContain('metno');
    expect(result.current.icon).toContain('clearsky_day.svg');
  });

  it('should return animated icon URL when iconSet is basmilius', async () => {
    const config = { apiKey: 'test-key', iconSet: 'basmilius' };
    const result = await provider.fetchWeatherAsync(config);

    expect(result.current.icon).toContain('basmilius');
    expect(result.current.icon).toContain('clear-day.svg');
  });

  it('should map various OWM icons to Met.no symbols', () => {
    // @ts-ignore - accessing private method for testing
    expect(provider.getMetNoIconUrl('01n')).toContain('clearsky_night.svg');
    // @ts-ignore
    expect(provider.getMetNoIconUrl('02d')).toContain('fair_day.svg');
    // @ts-ignore
    expect(provider.getMetNoIconUrl('03d')).toContain('cloudy.svg');
    // @ts-ignore
    expect(provider.getMetNoIconUrl('09d')).toContain('heavyrain.svg');
    // @ts-ignore
    expect(provider.getMetNoIconUrl('13d')).toContain('snow.svg');
    // @ts-ignore
    expect(provider.getMetNoIconUrl('50d')).toContain('fog.svg');
  });

  it('should throw error if API key is missing', async () => {
    const config = { apiKey: '' };
    await expect(provider.fetchWeatherAsync(config)).rejects.toThrow('OpenWeatherMap API key is required');
  });

  it('should map weather conditions correctly', () => {
    expect(provider.mapWeatherCondition('Clear')).toBe(Weather.ClearSky);
    expect(provider.mapWeatherCondition('Few clouds')).toBe(Weather.Clouds);
    expect(provider.mapWeatherCondition('Light rain')).toBe(Weather.Rain);
    expect(provider.mapWeatherCondition('Snow')).toBe(Weather.Snow);
    expect(provider.mapWeatherCondition('Light snow')).toBe(Weather.Snow);
    expect(provider.mapWeatherCondition('Unknown')).toBe(Weather.All);
  });
});

import { MetNoProvider } from '../src/weather-providers/metno-provider';
import { Weather } from '../src/image-sources/types';

describe('MetNoProvider', () => {
  let provider: MetNoProvider;

  beforeEach(() => {
    provider = new MetNoProvider();
    // Mock global fetch
    global.fetch = jest.fn();
  });

  it('should have correct ID and name', () => {
    expect(provider.id).toBe('metno');
    expect(provider.name).toBe('Met.no');
  });

  it('should fetch weather data and parse it correctly', async () => {
    const mockData = {
      properties: {
        timeseries: [
          {
            time: '2023-01-01T12:00:00Z',
            data: {
              instant: {
                details: {
                  air_temperature: 10.5,
                  relative_humidity: 80,
                  wind_speed: 5.5,
                  air_pressure_at_sea_level: 1013.2
                }
              },
              next_1_hours: {
                summary: {
                  symbol_code: 'clearsky_day'
                }
              }
            }
          }
        ]
      }
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const config = { latitude: 59.9139, longitude: 10.7522 };
    const result = await provider.fetchWeatherAsync(config);

    expect(result.current.temperature).toBe(10.5);
    expect(result.current.condition).toBe('clear_sky');
    expect(result.current.conditionUnified).toBe(Weather.ClearSky);
    expect(result.current.humidity).toBe(80);
    expect(result.current.windSpeed).toBe(5.5);
    expect(result.current.pressure).toBe(1013.2);
    expect(result.current.icon).toContain('clearsky_day');
    expect(result.current.icon).toContain('cdn.jsdelivr.net');
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Not Found'
    });

    const config = { latitude: 59.9139, longitude: 10.7522 };
    await expect(provider.fetchWeatherAsync(config)).rejects.toThrow('Met.no API error: Not Found');
  });

  it('should map symbols correctly to Weather enum', () => {
    // @ts-ignore - accessing private method for testing
    expect(provider.mapSymbolToWeather('clearsky_day')).toBe(Weather.ClearSky);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('fair_night')).toBe(Weather.ClearSky);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('partlycloudy_day')).toBe(Weather.Clouds);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('cloudy')).toBe(Weather.Clouds);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('rain')).toBe(Weather.Rain);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('heavyrain')).toBe(Weather.Rain);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('snow')).toBe(Weather.Snow);
    // @ts-ignore
    expect(provider.mapSymbolToWeather('fog')).toBe(Weather.Mist);
  });

  it('should map symbols correctly to condition keys', () => {
    // @ts-ignore
    expect(provider.mapSymbolToCondition('clearsky_day')).toBe('clear_sky');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('fair_night')).toBe('few_clouds');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('partlycloudy_day')).toBe('scattered_clouds');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('cloudy')).toBe('overcast_clouds');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('rainshowers_day')).toBe('shower_rain');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('heavyrain')).toBe('heavy_intensity_rain');
    // @ts-ignore
    expect(provider.mapSymbolToCondition('rainandthunder')).toBe('thunderstorm');
  });
});

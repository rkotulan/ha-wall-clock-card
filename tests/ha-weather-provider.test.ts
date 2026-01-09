import { HomeAssistantWeatherProvider } from '../src/weather-providers/ha-weather-provider';
import { Weather } from '../src/image-sources/types';

describe('HomeAssistantWeatherProvider', () => {
  let provider: HomeAssistantWeatherProvider;
  let mockHass: any;

  beforeEach(() => {
    provider = new HomeAssistantWeatherProvider();
    mockHass = {
      states: {
        'weather.test': {
          state: 'sunny',
          attributes: {
            temperature: 25,
            humidity: 40,
            wind_speed: 10,
            pressure: 1015,
            forecast: [
              {
                datetime: '2023-01-01T12:00:00Z',
                temperature: 28,
                templow: 20,
                condition: 'sunny',
                precipitation: 0
              }
            ]
          }
        }
      },
      callWS: jest.fn().mockResolvedValue({
        response: {
          'weather.test': {
            forecast: [
              {
                datetime: '2023-01-01T12:00:00Z',
                temperature: 28,
                templow: 20,
                condition: 'sunny',
                precipitation: 0
              },
              {
                datetime: '2023-01-02T12:00:00Z',
                temperature: 22,
                templow: 15,
                condition: 'cloudy',
                precipitation: 10
              }
            ]
          }
        }
      })
    };
    provider.setHass(mockHass);
  });

  it('should have correct ID and name', () => {
    expect(provider.id).toBe('homeassistant');
    expect(provider.name).toBe('Home Assistant');
  });

  it('should fetch weather data from HA entity correctly', async () => {
    const config = { entityId: 'weather.test' };
    const result = await provider.fetchWeatherAsync(config);

    expect(result.current.temperature).toBe(25);
    expect(result.current.condition).toBe('clear_sky');
    expect(result.current.conditionUnified).toBe(Weather.ClearSky);
    expect(result.daily.length).toBe(2);
    expect(result.daily[0].temperatureMax).toBe(28);
    expect(result.daily[0].temperatureMin).toBe(20);
    expect(result.daily[1].condition).toBe('overcast_clouds');
  });

  it('should throw error if hass is not set', async () => {
    const newProvider = new HomeAssistantWeatherProvider();
    const config = { entityId: 'weather.test' };
    await expect(newProvider.fetchWeatherAsync(config)).rejects.toThrow('Home Assistant instance not set');
  });

  it('should throw error if entity is not found', async () => {
    const config = { entityId: 'weather.nonexistent' };
    await expect(provider.fetchWeatherAsync(config)).rejects.toThrow('Entity weather.nonexistent not found');
  });

  it('should map HA conditions correctly', () => {
    // @ts-ignore
    expect(provider.mapWeatherCondition('sunny')).toBe(Weather.ClearSky);
    // @ts-ignore
    expect(provider.mapWeatherCondition('cloudy')).toBe(Weather.Clouds);
    // @ts-ignore
    expect(provider.mapWeatherCondition('rainy')).toBe(Weather.Rain);
    // @ts-ignore
    expect(provider.mapWeatherCondition('snowy')).toBe(Weather.Snow);
    // @ts-ignore
    expect(provider.mapWeatherCondition('fog')).toBe(Weather.Mist);
    // @ts-ignore
    expect(provider.mapWeatherCondition('unknown')).toBe(Weather.All);
  });

  it('should return correct icon URLs based on iconSet', async () => {
    const configMetNo = { entityId: 'weather.test', iconSet: 'metno' };
    const resultMetNo = await provider.fetchWeatherAsync(configMetNo);
    expect(resultMetNo.current.icon).toContain('metno');

    const configOWM = { entityId: 'weather.test', iconSet: 'openweathermap' };
    const resultOWM = await provider.fetchWeatherAsync(configOWM);
    expect(resultOWM.current.icon).toContain('openweathermap.org');
    expect(resultOWM.current.icon).toContain('01d'); // sunny -> 01d
  });

  it('should return animated icon URL when iconSet is basmilius', async () => {
    const config = { entityId: 'weather.test', iconSet: 'basmilius' };
    const result = await provider.fetchWeatherAsync(config);
    expect(result.current.icon).toContain('basmilius');
    expect(result.current.icon).toContain('clear-day.svg');
  });
});

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
            supported_features: 1,
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
    expect(result.entityId).toBe('weather.test');
    expect(result.forecastType).toBe('daily');
    expect(result.daily.length).toBe(2);
    expect(result.daily[0].temperatureMax).toBe(28);
    expect(result.daily[0].temperatureMin).toBe(20);
    expect(result.daily[1].condition).toBe('overcast_clouds');
    expect(mockHass.callWS).toHaveBeenCalledWith(expect.objectContaining({
      service_data: {type: 'daily'},
    }));
  });

  it('automatically fetches an hourly forecast from an hourly-only entity', async () => {
    mockHass.states['weather.test'].attributes.supported_features = 2;
    mockHass.callWS.mockResolvedValue({
      response: {
        'weather.test': {
          forecast: [
            {
              datetime: '2023-01-01T13:00:00Z',
              temperature: 26,
              condition: 'partlycloudy',
            },
          ],
        },
      },
    });

    const result = await provider.fetchWeatherAsync({entityId: 'weather.test'});

    expect(result.forecastType).toBe('hourly');
    expect(result.daily).toHaveLength(1);
    expect(result.daily[0]).toMatchObject({
      temperatureMin: 26,
      temperatureMax: 26,
      condition: 'scattered_clouds',
    });
    expect(mockHass.callWS).toHaveBeenCalledWith(expect.objectContaining({
      service_data: {type: 'hourly'},
    }));
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

  describe('getCurrentWeather', () => {
    it('maps the entity state without any service call', () => {
      const current = provider.getCurrentWeather({ entityId: 'weather.test' });

      expect(current).toMatchObject({
        temperature: 25,
        condition: 'clear_sky',
        humidity: 40,
      });
      expect(mockHass.callWS).not.toHaveBeenCalled();
    });

    it('uses hass.formatEntityState for the condition text when available', () => {
      mockHass.formatEntityState = jest.fn().mockReturnValue('Slunečno');

      const current = provider.getCurrentWeather({ entityId: 'weather.test' });

      expect(current?.conditionText).toBe('Slunečno');
    });

    it('returns undefined for a missing entity or hass', () => {
      expect(provider.getCurrentWeather({ entityId: 'weather.missing' })).toBeUndefined();
      expect(new HomeAssistantWeatherProvider().getCurrentWeather({ entityId: 'weather.test' })).toBeUndefined();
    });
  });

  describe('day and night icons (issue #45)', () => {
    const entityId = 'weather.test';
    const nightTime = '2026-09-04T23:00:00+00:00'; // 01:00 in Berlin
    const dayTime = '2026-09-05T12:00:00+00:00';

    beforeEach(() => {
      mockHass.config = {latitude: 52.52, longitude: 13.405, time_zone: 'Europe/Berlin'};
    });

    function setForecast(items: any[]) {
      mockHass.callWS.mockResolvedValue({response: {[entityId]: {forecast: items}}});
    }

    it.each([
      ['metno', 'fair_night.svg', 'fair_day.svg', 'clearsky_night.svg'],
      ['basmilius', 'partly-cloudy-night.svg', 'partly-cloudy-day.svg', 'clear-night.svg'],
      ['openweathermap', '02n@2x.png', '02d@2x.png', '01n@2x.png'],
      ['wall-clock', 'fair_night.svg', 'fair_day.svg', 'clearsky_night.svg'],
    ])('selects hourly icons by instant for %s and preserves clear-night', async (iconSet, night, day, clear) => {
      setForecast([
        {datetime: nightTime, condition: 'partlycloudy', temperature: 16},
        {datetime: '2026-09-05T01:00:00+02:00', condition: 'partlycloudy', temperature: 16},
        {datetime: dayTime, condition: 'partlycloudy', temperature: 20},
        ...[0, 1, 2, 3].map(hour => ({
          datetime: `2026-09-05T0${hour}:00:00+00:00`, condition: 'clear-night', temperature: 15,
        })),
        {datetime: dayTime, condition: 'clear-night', temperature: 20},
      ]);
      const result = await provider.fetchWeatherAsync({entityId, forecastType: 'hourly', iconSet});
      expect(result.daily.map(item => item.icon.split('/').pop())).toEqual([
        night, night, day, clear, clear, clear, clear, clear,
      ]);
    });

    it('keeps daily summaries daytime even when their timestamp is midnight', async () => {
      setForecast([{datetime: nightTime, condition: 'partlycloudy'}]);
      const result = await provider.fetchWeatherAsync({entityId, forecastType: 'daily'});
      expect(result.daily[0].icon).toContain('fair_day');
    });

    it('honors explicit day/night flags for twice-daily periods', async () => {
      setForecast([
        {datetime: dayTime, condition: 'partlycloudy', is_daytime: false},
        {datetime: nightTime, condition: 'partlycloudy', is_daytime: true},
      ]);
      const result = await provider.fetchWeatherAsync({entityId, forecastType: 'twice_daily'});
      expect(result.daily[0].icon).toContain('fair_night');
      expect(result.daily[1].icon).toContain('fair_day');
    });

    it.each([
      undefined,
      {latitude: NaN, longitude: 13},
      {latitude: 91, longitude: 13},
      {latitude: 52, longitude: Infinity},
      {latitude: 52, longitude: 181},
    ])('falls back to daytime with unavailable or invalid coordinates: %p', async config => {
      mockHass.config = config;
      setForecast([{datetime: nightTime, condition: 'partlycloudy'}]);
      const result = await provider.fetchWeatherAsync({entityId, forecastType: 'hourly'});
      expect(result.daily[0].icon).toContain('fair_day');
    });

    it('handles invalid dates without failing the forecast', async () => {
      setForecast([{datetime: 'invalid', condition: 'partlycloudy'}]);
      const result = await provider.fetchWeatherAsync({entityId, forecastType: 'hourly'});
      expect(result.daily[0].icon).toContain('fair_day');
    });

    it('uses configured coordinates, including zero, ahead of the HA location', async () => {
      setForecast([{datetime: '2026-09-05T12:00:00Z', condition: 'partlycloudy'}]);
      const result = await provider.fetchWeatherAsync({
        entityId, forecastType: 'hourly', latitude: 0, longitude: 180,
      });
      expect(result.daily[0].icon).toContain('fair_night');
    });

    it.each([
      ['2026-06-21T23:00:00Z', 'fair_day'],
      ['2026-12-21T12:00:00Z', 'fair_night'],
    ])('handles polar day/night at %s', async (datetime, icon) => {
      setForecast([{datetime, condition: 'partlycloudy'}]);
      const result = await provider.fetchWeatherAsync({
        entityId, forecastType: 'hourly', latitude: 78.22, longitude: 15.65,
      });
      expect(result.daily[0].icon).toContain(icon);
    });

    it('also maps automatically selected hourly subscription updates to night icons', async () => {
      mockHass.states[entityId].attributes.supported_features = 2;
      let callback: (event: any) => void = () => {};
      mockHass.connection = {subscribeMessage: jest.fn(async (cb: any) => {
        callback = cb;
        return () => {};
      })};
      const onForecast = jest.fn();
      await provider.subscribeForecastAsync({entityId}, onForecast);
      callback({forecast: [{datetime: nightTime, condition: 'partlycloudy'}]});
      expect(onForecast.mock.calls[0][0][0].icon).toContain('fair_night');
      expect(onForecast.mock.calls[0][1]).toBe('hourly');
    });

    it('uses the current instant for current partly-cloudy weather', () => {
      jest.useFakeTimers().setSystemTime(new Date(nightTime));
      try {
        mockHass.states[entityId].state = 'partlycloudy';
        expect(provider.getCurrentWeather({entityId})?.icon).toContain('fair_night');
      } finally {
        jest.useRealTimers();
      }
    });
  });

  describe('subscribeForecastAsync', () => {
    it('subscribes via weather/subscribe_forecast and maps pushed forecasts', async () => {
      const unsubscribe = jest.fn();
      let capturedCallback: ((event: any) => void) | undefined;
      mockHass.connection = {
        subscribeMessage: jest.fn().mockImplementation(async (cb: any) => {
          capturedCallback = cb;
          return unsubscribe;
        }),
      };

      const onDaily = jest.fn();
      const result = await provider.subscribeForecastAsync({ entityId: 'weather.test' }, onDaily);

      expect(result).toBe(unsubscribe);
      expect(mockHass.connection.subscribeMessage).toHaveBeenCalledWith(expect.any(Function), {
        type: 'weather/subscribe_forecast',
        entity_id: 'weather.test',
        forecast_type: 'daily',
      });

      capturedCallback!({
        forecast: [
          { datetime: '2023-01-03T12:00:00Z', temperature: 25, templow: 15, condition: 'sunny' },
        ],
      });

      expect(onDaily).toHaveBeenCalledTimes(1);
      expect(onDaily.mock.calls[0][0][0]).toMatchObject({
        temperatureMin: 15,
        temperatureMax: 25,
        condition: 'clear_sky',
      });
    });

    it('resolves to null when the connection is unavailable', async () => {
      const result = await provider.subscribeForecastAsync({ entityId: 'weather.test' }, jest.fn());
      expect(result).toBeNull();
    });

    it('subscribes to hourly updates for an hourly-only entity', async () => {
      mockHass.states['weather.test'].attributes.supported_features = 2;
      mockHass.connection = {
        subscribeMessage: jest.fn().mockResolvedValue(jest.fn()),
      };

      await provider.subscribeForecastAsync({entityId: 'weather.test'}, jest.fn());

      expect(mockHass.connection.subscribeMessage).toHaveBeenCalledWith(expect.any(Function), {
        type: 'weather/subscribe_forecast',
        entity_id: 'weather.test',
        forecast_type: 'hourly',
      });
    });
  });
});

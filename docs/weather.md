# Weather Configuration

You can configure the weather forecast display in the top right corner of the card:

```yaml
type: 'custom:wall-clock-card'
# Weather settings
showWeather: true  # Set to true to enable weather display
weatherTitle: 'Weather'  # Custom title for the weather section
weatherProvider: 'homeassistant'  # Supports 'homeassistant', 'openweathermap' or 'metno'
weatherConfig:
  entityId: 'weather.forecast_home'  # Required for Home Assistant provider
  apiKey: 'your-openweathermap-api-key'  # Required for OpenWeatherMap, not used for others
  latitude: 50.0755  # Used for OpenWeatherMap and Met.no
  longitude: 14.4378
  units: 'metric'  # 'metric' or 'imperial'
  language: 'cs'  # Language code (cs for Czech, en for English, etc.)
weatherDisplayMode: 'both'  # 'current', 'forecast', or 'both'
weatherForecastDays: 3  # Number of days to show in forecast (1-7)
weatherUpdateInterval: 30  # Update interval in minutes (minimum: 1, default: 30)
```

## Weather Providers

The card supports multiple weather providers:

### Met.no (Meteorologisk institutt)

[Met.no](https://www.met.no/) is the Norwegian Meteorological Institute. It provides free weather data for most of the world.
- **API Key**: Not required.
- **Attribution**: Recommended to credit Met.no/YR.no.

### OpenWeatherMap

[OpenWeatherMap](https://openweathermap.org/) provides weather data with a free tier.
- **API Key**: Required.
- **Setup**:
    1. Create an account at [OpenWeatherMap](https://openweathermap.org/)
    2. Get an API key from your account dashboard (the free tier is sufficient)
    3. Make sure your API key is activated (can take a few hours)

The weather data is automatically updated at configurable intervals (default: 30 minutes) to avoid excessive API calls. You can adjust this with the `weatherUpdateInterval` option (in minutes, minimum: 1).

> **Note**: This card uses the OpenWeatherMap One Call API 2.5, which is included in the free tier. No special subscription is required.
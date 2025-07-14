# Weather Configuration

You can configure the weather forecast display in the top right corner of the card:

```yaml
type: 'custom:wall-clock-card'
# Weather settings
showWeather: true  # Set to true to enable weather display
weatherTitle: 'Weather'  # Custom title for the weather section
weatherProvider: 'openweathermap'  # Currently supports 'openweathermap'
weatherConfig:
  apiKey: 'your-openweathermap-api-key'  # Required for OpenWeatherMap
  latitude: 50.0755  # Default is Prague, Czech Republic
  longitude: 14.4378
  units: 'metric'  # 'metric' or 'imperial'
  language: 'cs'  # Language code (cs for Czech, en for English, etc.)
weatherDisplayMode: 'both'  # 'current', 'forecast', or 'both'
weatherForecastDays: 3  # Number of days to show in forecast (1-7)
weatherUpdateInterval: 30  # Update interval in minutes (minimum: 1, default: 30)
```

## Weather Provider

Currently, the card supports the OpenWeatherMap API for weather data. You'll need to:

1. Create an account at [OpenWeatherMap](https://openweathermap.org/)
2. Get an API key from your account dashboard
   - The free tier API key is sufficient
   - Make sure your API key is activated (can take a few hours after registration)
3. Configure the card with your API key

The weather data is automatically updated at configurable intervals (default: 30 minutes) to avoid excessive API calls. You can adjust this with the `weatherUpdateInterval` option (in minutes, minimum: 1).

> **Note**: This card uses the OpenWeatherMap One Call API 2.5, which is included in the free tier. No special subscription is required.
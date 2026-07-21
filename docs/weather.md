# Weather widget

The `weather` widget shows current conditions, a forecast, or both. It can be placed
in any zone and added more than once.

```yaml
layout:
  zones:
    top-right:
      widgets:
        - type: weather
          enabled: true
          provider: homeassistant
          providerConfig:
            entityId: weather.home
          displayMode: both
          forecastDays: 5
          title: Weather forecast
          updateInterval: 1800
          iconSet: basmilius
```

## Options

| Key | Default | Description |
|---|---:|---|
| `enabled` | `true` | Show or hide this widget |
| `provider` | `homeassistant` | `homeassistant` or `openweathermap` |
| `providerConfig` | — | Provider-specific settings |
| `displayMode` | `current` for a newly added widget | `current`, `forecast` or `both` |
| `forecastDays` | `3` | Forecast rows to show (1–7) |
| `title` | localized “Weather” | Section title |
| `updateInterval` | `1800` | Refresh interval in seconds (minimum 60) |
| `iconSet` | provider default | `basmilius`, `openweathermap` or `metno` |
| `labelSize` | size preset | CSS size for labels/title |
| `valueSize` | size preset | CSS size for values |

Clicking Home Assistant-backed current weather opens that entity's native more-info
dialog.

## Home Assistant provider

This is the recommended provider because it reuses an existing `weather.*` entity
and Home Assistant's forecast API.

```yaml
- type: weather
  provider: homeassistant
  providerConfig:
    entityId: weather.forecast_home
  displayMode: both
```

## OpenWeatherMap provider

The direct provider calls OpenWeatherMap's 5-day/3-hour forecast endpoint. It needs
an API key and coordinates; account availability and pricing are controlled by
OpenWeatherMap and can change independently of this card.

```yaml
- type: weather
  provider: openweathermap
  providerConfig:
    apiKey: YOUR_API_KEY
    latitude: 49.1951
    longitude: 16.6068
    units: metric          # metric or imperial
    language: cs
  displayMode: both
  updateInterval: 1800
```

Legacy 2.x `showWeather`, `weatherProvider`, `weatherConfig`,
`weatherDisplayMode`, `weatherForecastDays`, `weatherTitle`,
`weatherUpdateInterval` and `weatherIconSet` keys are migrated automatically.

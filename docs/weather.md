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
          orientation: horizontal
          forecastDays: 5
          title: Weather forecast
          updateInterval: 1800
          iconSet: wall-clock
          animateIcons: true
```

## Options

| Key | Default | Description |
|---|---:|---|
| `enabled` | `true` | Show or hide this widget |
| `provider` | `homeassistant` | `homeassistant` or `openweathermap` |
| `providerConfig` | — | Provider-specific settings |
| `displayMode` | `current` for a newly added widget | `current`, `forecast` or `both` |
| `orientation` | `auto` | `auto`, `horizontal` or `vertical` |
| `forecastDays` | `3` | Forecast rows to show (1–7) |
| `title` | localized “Weather” | Section title |
| `updateInterval` | `1800` | Refresh interval in seconds (minimum 60) |
| `iconSet` | provider default | `wall-clock`, `basmilius`, `openweathermap` or `metno` |
| `animateIcons` | `true` | Animate the built-in `wall-clock` icon set |
| `labelSize` | size preset | CSS size for labels/title |
| `valueSize` | size preset | CSS size for values |

Clicking Home Assistant-backed current weather opens that entity's native more-info
dialog.

Horizontal orientation places the current icon, temperature and condition first,
followed by compact forecast columns. Vertical orientation preserves the traditional
stacked presentation. With `auto`, center-column zones use the horizontal layout and
side zones use the vertical layout.

## Wall Clock icon set

`iconSet: wall-clock` uses the card's local SVG artwork instead of loading icon
images from a third-party server. The set covers day and night variants, clouds,
rain, heavy rain, thunderstorms, snow, sleet, fog, hail, wind and exceptional
weather. Its subtle animations can be disabled with `animateIcons: false` and
automatically stop when the device requests reduced motion.

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

### Pirate Weather

Pirate Weather should work through the existing Home Assistant provider; a
separate direct API provider is not required. Compatibility is based on its
standard Home Assistant weather entity and forecast API, but has not yet been
verified with a live Pirate Weather integration.

1. Install the Pirate Weather integration through HACS and configure it in
   **Settings → Devices & services → Add integration → Pirate Weather**.
   Follow the [Pirate Weather setup guide](https://docs.pirateweather.net/en/latest/ha/)
   to obtain an API key, set your location, and enable a **Weather Entity**.
2. Check that its `weather.*` entity shows current conditions and a forecast in
   Home Assistant's built-in weather card.
3. Edit the Wall Clock weather widget, select **Home Assistant entity** as the
   provider, and select that weather entity.
4. Choose current conditions, forecast, or both. Leave the forecast type on
   **Automatic**, or select **Daily** or **Hourly** explicitly. Automatic prefers
   daily forecasts when the entity supports both.

For YAML, add this widget to a zone's `widgets` list, replacing the example entity
ID with the actual entity ID from your installation:

```yaml
- type: weather
  provider: homeassistant
  providerConfig:
    entityId: weather.pirate_weather
    forecastType: daily    # auto, daily, or hourly
  displayMode: both
  forecastDays: 5
```

The API key belongs in the Home Assistant integration settings, not in the card.
For hourly forecasts, `forecastDays` controls the number of forecast entries shown,
not the number of days.

If the built-in weather card works but Wall Clock does not, please report your
Home Assistant, Wall Clock Card, and Pirate Weather integration versions, the
selected forecast type, and a sanitized widget configuration in
[issue #52](https://github.com/rkotulan/ha-wall-clock-card/issues/52).
Include whether current conditions, the forecast, or both are missing, and any
relevant browser console error. Do not include API keys or access tokens.

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
  showTitle: false         # hide the Weather / Forecast heading
  updateInterval: 1800
```

Legacy 2.x `showWeather`, `weatherProvider`, `weatherConfig`,
`weatherDisplayMode`, `weatherForecastDays`, `weatherTitle`, `weatherShowTitle`,
`weatherUpdateInterval`, `weatherIconSet` and `weatherIconAnimation` keys are
migrated automatically.

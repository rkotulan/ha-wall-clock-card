# Transportation widget

The `transportation` widget displays on-demand departures from public transport.
Version 3.0 ships with the `idsjmk` provider (shown as **DPMB (Brno)** in the
Designer), covering Brno and the South Moravian Region.

It also supports the `homeassistant` provider for departure sensors exposed by
the separate **Transit Departures** Home Assistant integration. This is the
recommended mode for on-demand server-side queries and clients such as Garmin.

Transportation is a singleton: one card can contain only one transportation widget.
Place a `transportation` action in an action bar to open it.

```yaml
layout:
  zones:
    top-center:
      widgets:
        - type: transportation
          provider: idsjmk
          maxDepartures: 2
          autoHideTimeout: 5
          updateInterval: 60
          stops:
            - stopId: 1793
              postId: 3
              name: Main station
            - stopId: 1793
              postId: 2
```

Add the trigger to any action bar:

```yaml
- type: action-bar
  actions:
    - actionId: transportation
      title: Departures
      icon: mdi:bus-clock
```

## Options

| Key | Default | Description |
|---|---:|---|
| `provider` | `idsjmk` at runtime | Transportation provider ID |
| `providerConfig` | `{}` | Provider-specific values |
| `stops` | `[]` | Stop/platform entries |
| `maxDepartures` | `2` | Departures per configured platform, limited to 1–5 |
| `autoHideTimeout` | disabled when omitted | Minutes before departures close (1–10); the Designer starts at 5 |
| `updateInterval` | `60` | Refresh interval in seconds, minimum 60 |

## Home Assistant departure entities

The entity-backed provider presses one Home Assistant button when the widget is
opened, then reads one or more duration sensors. While the view remains open,
sensor changes are pushed from Home Assistant; the card does not start its own
polling interval.

```yaml
- type: transportation
  provider: homeassistant
  maxDepartures: 2
  autoHideTimeout: 5
  providerConfig:
    refreshButtonEntity: button.schodova_mesto_refresh
    departureEntities:
      - sensor.schodova_mesto_departure_1
      - sensor.schodova_mesto_departure_2
  stops: []
```

Both entity IDs can be selected in the Designer. Exact IDs depend on the names
assigned by Home Assistant when the integration is configured. Pressing the
same button from another dashboard also activates the sensors for a watch or
automation.

For the `idsjmk` provider, each stop requires `stopId` and `postId`; both may be
numeric or text identifiers. `name` overrides the name returned by the provider.
Both built-in providers apply the global `maxDepartures` value.

## On-demand and exclusive zones

The widget does not fetch until the transportation action is pressed. While
departures are active, action bars are hidden; after `autoHideTimeout` the action
bars become available again. A failed request closes automatically after a short
error display.

For a traditional shared bottom area, put transportation and an action bar in an
exclusive zone. Higher `priority` wins while its widget is active:

```yaml
bottom-center:
  mode: exclusive
  widgets:
    - type: transportation
      priority: 10
      provider: idsjmk
      autoHideTimeout: 5
      stops:
        - stopId: 1793
          postId: 3
    - type: action-bar
      priority: 5
      actions:
        - actionId: transportation
          title: MHD
          icon: mdi:bus-clock
```

Departures are grouped by configured stop/platform and include line, destination,
time mark and the low-floor indicator when supplied by IDS JMK. The provider uses an
external proxy/API whose availability and usage terms are controlled by its
operator; do not assume suitability for commercial use.

Legacy 2.x root-level `transportation` configuration is migrated to a priority-10
widget in `bottom-center`.

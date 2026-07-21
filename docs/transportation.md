# Transportation widget

The `transportation` widget displays on-demand departures from public transport.
Version 3.0 ships with the `idsjmk` provider (shown as **DPMB (Brno)** in the
Designer), covering Brno and the South Moravian Region.

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

Each stop requires `stopId` and `postId`; both may be numeric or text identifiers.
`name` overrides the name returned by the provider. The built-in provider applies
the global `maxDepartures` value.

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

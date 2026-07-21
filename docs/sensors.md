# Sensors widget

The `sensors` widget displays one or more Home Assistant entity states. It can be
placed in any zone and added more than once.

```yaml
layout:
  zones:
    top-left:
      widgets:
        - type: sensors
          orientation: auto
          alignment: auto
          labelSize: 1.1rem
          valueSize: 2rem
          sensors:
            - entity: sensor.living_room_temperature
              label: Temperature
              precision: 1
            - entity: sensor.living_room_humidity
              label: Humidity
```

## Options

| Key | Default | Description |
|---|---|---|
| `sensors` | `[]` | Sensor entries to render |
| `orientation` | `auto` | `auto`, `horizontal` or `vertical` |
| `alignment` | `auto` | `auto`, `left`, `center` or `right` |
| `labelSize` | size preset | CSS size of labels |
| `valueSize` | size preset | CSS size of values |

Each sensor entry requires `entity`. `label` is optional: when omitted, the entity's
friendly name is used; an empty string hides the label. `precision` overrides Home
Assistant's display precision for that entry. Without it, the card respects Home
Assistant's formatted state/display precision.

With `orientation: auto`, center-column zones (`top-center`, `center`,
`bottom-center`) use a horizontal row and side columns use a vertical list.
`alignment: auto` follows the hosting zone: left zones align left, center zones center
and right zones right.

Legacy root-level `sensors` configuration remains supported through 2.x migration;
new YAML should use the widget form above. The older single-value `sensorEntity` /
`sensorLabel` form is not part of the 3.0 schema; convert it to a one-entry `sensors`
array before upgrading.

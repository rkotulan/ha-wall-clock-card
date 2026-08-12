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
          itemGap: 16px
          showIcons: true
          iconSize: 2.25rem
          showSeparator: true
          separatorColor: '#ead0a4'
          separatorOpacity: 0.35
          labelSize: 1.1rem
          valueSize: 2rem
          sensors:
            - entity: sensor.living_room_temperature
              label: Temperature
              icon: mdi:thermometer
              precision: 1
              color: green
              colorRules:
                - operator: '<'
                  value: 18
                  color: blue
                - operator: '>'
                  value: 26
                  color: red
            - entity: sensor.living_room_humidity
              label: Humidity
              icon: mdi:water-percent
            - entity: sensor.outdoor_air_quality
              label: Air quality
              color: gray
              colorRules:
                - operator: '='
                  value: 'good'
                  color: green
                - operator: '='
                  value: 'moderate'
                  color: orange
                - operator: '='
                  value: 'unhealthy'
                  color: red
```

## Options

| Key | Default | Description |
|---|---|---|
| `sensors` | `[]` | Sensor entries to render |
| `orientation` | `auto` | `auto`, `horizontal` or `vertical` |
| `alignment` | `auto` | `auto`, `left`, `center` or `right` |
| `itemGap` | `16px` | CSS length between sensor items in either orientation |
| `showIcons` | `true` | Show an icon next to every sensor |
| `iconSize` | responsive, up to `2.25rem` | CSS size of sensor icons |
| `showSeparator` | `true` | Show separators between horizontal sensor items |
| `separatorColor` | widget text color | CSS color of horizontal separators |
| `separatorOpacity` | `0.28` | Separator opacity from 0 to 1 |
| `labelSize` | size preset | CSS size of labels |
| `valueSize` | size preset | CSS size of values |

Each sensor entry requires `entity`. `label` is optional: when omitted, the entity's
friendly name is used; an empty string hides the label. `precision` overrides Home
Assistant's display precision for that entry. Without it, the card respects Home
Assistant's formatted state/display precision. `icon` optionally overrides the
entity icon; an empty value uses Home Assistant's icon.

`color` sets the sensor item's default CSS color. `colorRules` can override it from
the entity's raw state. Each rule contains an `operator` (`<`, `<=`, `>`, `>=`, `=`
or `!=`), a `value` and a CSS `color`. The relational operators require numeric
states and values. Equality operators accept either numbers or text; text matching
is exact and case-sensitive. Rules are evaluated in their configured order and the
first match wins. Invalid or unmatched rules use `color`; when `color` is omitted,
the widget text color is inherited. The selected color applies to the sensor's icon,
label and value.

With `orientation: auto`, center-column zones (`top-center`, `center`,
`bottom-center`) use a horizontal row and side columns use a vertical list.
`alignment: auto` follows the hosting zone: left zones align left, center zones center
and right zones right.

Horizontal mode creates one flexible column per sensor. Columns remain equal while
their contents fit; unusually long states or large custom value sizes expand the
scrollable row instead of painting over a separator or neighbouring sensor.

Legacy root-level `sensors` configuration remains supported through 2.x migration;
new YAML should use the widget form above. The older single-value `sensorEntity` /
`sensorLabel` form is not part of the 3.0 schema; convert it to a one-entry `sensors`
array before upgrading.

# Zone layout (3.0)

Since 3.0.0 the card is composed of **widgets** placed into nine logical zones.
Legacy (2.x) configurations keep working unchanged — they are migrated in memory to
the equivalent zone layout. The first saved Designer change writes the normalized
3.0 structure.

## Zones

```
top-left     top-center     top-right
middle-left  center         middle-right
bottom-left  bottom-center  bottom-right
```

- Empty zones take no space — the center grows automatically.
- `top-center` / `bottom-center` span the full card width when their side zones are
  empty (this is how the bottom bar behaves).
- The side columns are always equal, so the `center` zone stays truly centered.

## Layout formats and visual presets

The original `3 × 3` canvas remains the default. A format changes only the geometry
shared by the nine zones; it never changes widget configuration or entities:

| Format | Geometry | Narrow panel |
|---|---|---|
| `grid-3x3` | Original 3 × 3 canvas | none |
| `vertical-2-1` | Main area left, 2/3 + 1/3 | right |
| `vertical-1-2` | 1/3 + 2/3, main area right | left |
| `horizontal-2-1` | Main area above, 2/3 + 1/3 | bottom |
| `horizontal-1-2` | 1/3 + 2/3, main area below | top |

Split formats render two real panels. For example, `vertical-2-1` places the left
and center logical columns in the left 2/3 panel while right zones use the right
1/3 panel. Each vertical panel exposes only three physical areas: **Top**,
**Center** and **Bottom**. Widgets from legacy logical zones that map to the same
area are presented as one ordered list instead of separate or overlapping boxes.
Horizontal splits use **Left**, **Center** and **Right** areas in each row.

The remaining axis still acts as an anchor. In a vertical split, `top-*` widgets
stack from the top of their panel, middle widgets stay centred, and `bottom-*`
widgets are pinned to the bottom edge. This keeps an action bar in `bottom-left`
at the bottom of the narrow left panel, and the same rule applies to any other
widget. Horizontal splits retain left, centre and right anchoring inside each of
their two rows.

Existing configurations are read without migration. The first explicit add or
drag operation in a merged area consolidates its widgets into that area's stable
canonical zone, preserving their displayed order. This keeps switching from old
3x3 configurations safe while giving split layouts one clear drop target per
physical area. Widgets remain freely movable in the Designer.

`layout.preset: glass` adds a dark translucent, blurred surface to the narrow third.
It is purely visual: actions, providers, entities, widget placement and ordering are
not modified. Omitting `format` and `preset` preserves the original rendering.

## Configuration

```yaml
type: custom:wall-clock-card
appearance:
  fontColor: '#FFFFFF'
  fontFamily: '"Roboto Condensed", Roboto, sans-serif'
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
  language: cs
  size: medium
background:
  source: picsum
  opacity: 0.3
layout:
  format: vertical-2-1       # optional; default grid-3x3
  preset: glass              # optional; none | glass
  spacing: normal            # compact | normal | spacious, or explicit values:
  # spacing: { padding: 16px, zoneGap: 16px, widgetGap: 8px }
  zones:
    top-left:
      widgets:
        - type: sensors
          sensors:
            - entity: sensor.indoor_temperature
    top-right:
      widgets:
        - type: weather
          provider: homeassistant
          displayMode: both
    center:
      gap: 0px               # per-zone overrides
      widgets:
        - type: clock
        - type: date
    bottom-center:
      mode: exclusive        # highest-priority active widget wins (crossfade)
      widgets:
        - type: transportation
          provider: idsjmk
          stops: [{stopId: 1234}]
          priority: 10
        - type: action-bar
          actions: [...]
          priority: 5
```

### Zone options

| Key | Default | Description |
|---|---|---|
| `widgets` | — | Ordered list of widgets in the zone |
| `mode` | `stack` | `stack` shows all widgets; `exclusive` shows the highest-`priority` widget whose activity flag is on (used for the transportation/action-bar bottom bar) |
| `direction` | `column` | Stack direction |
| `align` | by column | `start` / `center` / `end` cross-axis alignment |
| `gap` | spacing preset | Gap between widgets in this zone |
| `padding` | — | Inner inset of the zone |
| `span` | — | `panel` lets a sole area fill the complete cross-axis of a split panel |

### Spacing

Three levels, all optional (preset `normal` matches the 2.x visual density):

| Preset | Card padding | Zone gap | Widget gap |
|---|---|---|---|
| `compact` | 8px | 8px | 4px |
| `normal` | 16px | 16px | 8px |
| `spacious` | 32px | 24px | 16px |

Explicit values win over the preset. Invalid CSS lengths are ignored with a warning.

## Built-in widgets

| `type` | Options (beyond common ones) |
|---|---|
| `clock` | `timeFormat` (`hour12`, `showAmPm`, ...), `clockSize` (see [clock-date.md](clock-date.md)) |
| `date` | `dateFormat`, `dateSize` (see [clock-date.md](clock-date.md)) |
| `sensors` | `sensors`, `orientation`, `alignment`, `itemGap`, icon/separator controls, `labelSize`, `valueSize` (see [sensors.md](sensors.md)) |
| `weather` | `enabled`, `provider`, `providerConfig`, `displayMode`, `orientation`, `forecastDays`, `title`, `updateInterval`, `iconSet`, `animateIcons`, `labelSize`, `valueSize` (see [weather.md](weather.md)) |
| `transportation` | the [transportation config](transportation.md) keys, flattened |
| `action-bar` | `enabled`, `actions`, `alignment`, `orientation`, `columns`, `backgroundOpacity`, `showButtonBackground`, `buttonGap`, `padding`, `iconSize` (see [action-bar.md](action-bar.md)) |
| `calendar` | `entities`, `displayMode`, `daysAhead`, `maxEvents`, event detail/background/font options and `updateInterval` (see [calendar.md](calendar.md)) |
| `separator` | `orientation`, `color`, `opacity`, `thickness`, `length` (see [separator.md](separator.md)) |
| `ha-card` | `card` (ordinary Lovelace card configuration), `transparent` |

Common widget fields: `type`, `id` (stable identifier, generated by the editor),
`priority` (for exclusive zones), `style` (`fontSize`, `fontFamily`, `color`, `textShadow`,
`widthMode`, `grow`, `maxWidth`, `maxHeight`, `margin`). In row zones,
`style.widthMode` accepts `auto`, `fill` or `content`. Automatic mode stretches
weather, calendar, transportation and action bars while keeping compact widgets
such as sensors, clock and date sized to their content. `style.grow` is a positive
relative width share and implies filling unless `widthMode: content` is selected.

For a dashboard-style information strip, set one area in a horizontal split to
`direction: row` and `span: panel`, then order widgets and separators freely in
that area. The automatic width policy provides a useful default; explicit
`style.widthMode` and relative `style.grow` values can override it without
hard-coding pixel widths.

Built-in widgets expose feature-specific size controls shown in the table above.
Their per-widget size overrides the card-wide `appearance.size` preset. The generic
`style.fontSize` setting is intended for third-party/custom widgets; font family,
color, text shadow and margin remain available for every widget. An omitted
`style.textShadow` inherits `appearance.textShadow`; `none` disables the shadow for
that widget. A configured font family only
selects an already available font; the card does not download remote font files. See
[Loading custom fonts](configuration.md#loading-custom-fonts) for Google Fonts and
locally hosted `woff2` examples.

`maxHeight` is intentionally not offered for clock, date or action-bar widgets:
their content has an intrinsic height and constraining only the host would make it
overflow. Sensors and calendar omit both `maxWidth` and `maxHeight`; their grid track
already supplies the available bounds and another limit creates nested scrollbars or
clipped rows. Weather supports `maxWidth` for compact horizontal presentations but
omits `maxHeight`. Calendar uses `maxEvents` as its content limit.
Transportation and custom widgets use a
scrollable bounded host when `maxHeight` is configured.

Custom widgets can be registered at runtime with `registerWidget()` from the card's
module — see `src/widgets/widget-registry.ts`.

### Embedded Home Assistant cards

The `ha-card` widget renders an ordinary built-in or installed custom Lovelace card
inside a wall-clock zone. The Designer offers a searchable card-type selector for
both core and registered `custom:` cards. **Edit card in Home Assistant editor** opens
the native visual editor in a separate dialog with explicit Cancel and Save actions,
keeping the widget inspector compact.

```yaml
- type: ha-card
  transparent: true
  card:
    type: tile
    entity: light.living_room
    name: Living room
```

Custom cards must already be installed and registered as dashboard resources in Home
Assistant. Embedding `custom:wall-clock-card` directly or inside a stack/conditional
card is rejected to prevent recursive rendering.

## Visual editor

Widget placement and configuration are available automatically whenever the
Home Assistant dashboard itself is in edit mode:

- **Drag widgets** between zones (or from the palette into a zone) — powered by
  SortableJS, works with touch.
- **Click a widget name or settings icon** to open its inspector.
- **Click a zone label** to edit zone mode, direction, alignment, gap and padding.
- Zone alignment defaults to left/center/right according to its grid column and
  can be explicitly overridden. Clock and date inspectors expose the same
  zone-level control because those widgets are commonly aligned together.
- Newly added widgets open in the inspector automatically.
- Changes are saved continuously. The lower-left status reports **Saved** or
  **Unsaved changes**; the Designer **Done** button closes its full-screen view and
  Home Assistant's dashboard **Done** completes dashboard editing.

The standard Home Assistant card dialog contains a short instruction/link to open
the Designer instead of maintaining a second, partially duplicated settings form.
Regular card placements show **Configure card** before opening the full Designer so the
rest of Home Assistant's dashboard editor stays accessible.

## Migration from 2.x

| 2.x | 3.0 |
|---|---|
| clock + date | `center` → `clock`, `date` |
| `sensors` | `top-left` → `sensors` |
| `showWeather` + `weather*` | `top-right` → `weather` |
| `transportation` | `bottom-center` (exclusive, priority 10) |
| `actionBar` / `enableActionBar` | `bottom-center` (exclusive, priority 5) |
| `imageSource`, `backgroundImages`, ... | `background.*` |
| `fontColor`, `fontFamily`, `textShadow`, `language`, `timeZone`, `size` | `appearance.*` |
| `customSizes.*` | per-widget size keys |
| `customSizes.clockTopMargin` | obsolete (the grid centers the clock properly) |

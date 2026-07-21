# Configuration

Version 3.0 stores the card as card-wide settings plus widgets in a 3×3 zone grid.
The visual Designer is the recommended configuration method; YAML exposes the same
model. Existing 2.x configuration is migrated automatically.

## Designer workflow

1. Put the Home Assistant dashboard in edit mode.
2. Select **Configure card** on a regular card. Panel/full-screen placements open the
   Designer directly.
3. The Designer initially selects **Card settings**:
   - **General** — font color, custom font, language, time zone, logging and size;
   - **Spacing** — preset or explicit card padding, zone gap and widget gap;
   - **Background** — image source, overlay, rotation and image fitting.
4. Drag a widget by its handle. Select a widget to edit its **Content**,
   **Appearance** and **Behavior** tabs. Select a zone label to edit the zone.
5. The lower-left status shows **Saved** or **Unsaved changes**. Changes are written
   continuously; use the Designer **Done** button to return to the dashboard editor.

The compact Home Assistant card editor deliberately contains only a link/instruction
to use the Designer. It does not duplicate the full 3.0 settings UI.

## 3.0 YAML structure

```yaml
type: custom:wall-clock-card
logLevel: info

appearance:
  fontColor: '#FFFFFF'
  fontFamily: 'Roboto, sans-serif'
  language: cs
  timeZone: Europe/Prague
  size: medium              # small | medium | large | custom

background:
  source: local             # none | local | picsum | unsplash | sensor
  opacity: 0.3              # black overlay, 0–1
  rotationInterval: 90      # seconds
  objectFit: cover          # fill | contain | cover | none | scale-down
  images:
    - url: /local/images/day.jpg
      weather: all
      timeOfDay: day
    - url: /local/images/night.jpg
      weather: all
      timeOfDay: night

layout:
  spacing: normal           # compact | normal | spacious
  zones:
    center:
      widgets:
        - type: clock
          timeFormat:
            hour: 2-digit
            minute: 2-digit
            second: 2-digit
            hour12: false
        - type: date
          dateFormat:
            weekday: long
            year: numeric
            month: long
            day: numeric
```

`background.opacity` defaults to `0.3`, rotation to `90` seconds and
`objectFit` to `cover`. See [Zone layout](layout.md) for all zone/widget fields and
[Image sources](image-sources.md) for source-specific settings.

## Common appearance values

| Key | Default | Description |
|---|---|---|
| `appearance.fontColor` | `#FFFFFF` | Card-wide text color |
| `appearance.fontFamily` | Home Assistant font | CSS font family/stack; the font must already be loaded |
| `appearance.language` | HA language | UI/date/weather language where supported |
| `appearance.timeZone` | HA time zone | IANA time-zone name such as `Europe/Prague` |
| `appearance.size` | `medium` | Built-in component size preset |
| `logLevel` | `info` | `debug`, `info`, `warn`, `error` or `none` |

Per-widget appearance can override the card defaults. Widget-specific size controls
(for example `clockSize`, `dateSize`, `labelSize`, `valueSize` or `iconSize`) take
precedence over `appearance.size`.

## Loading custom fonts

`fontFamily` only selects a font already available in the browser. The card does not
download font files itself.

### Google Fonts

In **Settings → Dashboards → Resources**, add a stylesheet URL and select
**CSS / Stylesheet**:

```text
https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap
```

Then use the exact CSS family name:

```yaml
appearance:
  fontFamily: '"Roboto Condensed", sans-serif'
```

Every display device must be able to reach Google Fonts.

### Locally hosted font

Store the files under `/config/www`, for example:

```text
/config/www/fonts/my-font.woff2
/config/www/fonts/fonts.css
```

`fonts.css`:

```css
@font-face {
  font-family: "My Custom Font";
  src: url("/local/fonts/my-font.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

Register `/local/fonts/fonts.css?v=1` as a CSS dashboard resource, then configure:

```yaml
appearance:
  fontFamily: '"My Custom Font", sans-serif'
```

Increment the resource query (`?v=2`, `?v=3`, …) after replacing the CSS or font
file to invalidate browser caches.

## Compatibility with 2.x

The 2.x root keys (`timeFormat`, `dateFormat`, `sensors`, `showWeather`,
`weather*`, `transportation`, `actionBar`, `imageSource`, `backgroundImages`,
`fontColor`, `language`, `size` and `customSizes`) remain accepted. They are converted
in memory to the equivalent 3.0 layout. The Designer writes the normalized 3.0 form
after the first change. See the [migration table](layout.md#migration-from-2x).

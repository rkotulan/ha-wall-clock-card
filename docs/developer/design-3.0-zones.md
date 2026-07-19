# Design: Zone layout system (3.0.0)

Status: **draft / discussion**
Target: 3.0.0

## 1. Overview

Today the card layout is hard-coded in `WallClockCard.render()`: sensors render top-left,
weather is absolutely positioned top-right, the clock sits in the center with a
`margin-top: -140px` correction, and `BottomBarManager` switches between the bottom
components (transportation / weather bar) by priority with a crossfade.

3.0.0 replaces this with a **zone layout**: a 3×3 grid of named zones, each holding a
stack of **widgets**. Widgets are a fifth plugin system, following the same pattern as
image sources, weather providers, transportation providers and action-bar plugins.

Goals:

- Any built-in feature can be placed in any zone, in any order.
- New features become widgets — no more edits to `WallClockCard.render()`.
- Community can register custom widgets at runtime (`registerWidget()`).
- Old configurations keep working unchanged (in-memory migration).
- Visual editor with drag & drop between zones (HA `ha-sortable`).

Non-goals for 3.0.0:

- Free pixel positioning (only zones).
- Templating widget (Jinja) — planned 3.1.
- Per-widget theming beyond font size/color overrides.

## 2. Configuration schema (v3)

### 2.1 Example

```yaml
type: custom:wall-clock-card

# Global settings (unchanged semantics)
background:
  source: picsum
  opacity: 0.3
  rotationInterval: 90
appearance:
  fontColor: '#FFFFFF'
  language: cs
  timeZone: Europe/Prague
  size: medium

layout:
  zones:
    top-left:
      widgets:
        - type: sensors
          sensors:
            - entity: sensor.indoor_temperature
              label: Doma
    top-right:
      widgets:
        - type: weather
          provider: openweathermap
          displayMode: current
    center:
      widgets:
        - type: clock
        - type: date
    bottom-center:
      mode: exclusive          # highest-priority visible widget wins (crossfade)
      widgets:
        - type: transportation
          priority: 10
          visibility:
            - condition: time
              after: '06:00'
              before: '09:30'
              weekday: [mon, tue, wed, thu, fri]
        - type: weather
          displayMode: forecast
          forecastDays: 5
          priority: 0
        - type: action-bar
          zonePosition: after   # rendered below the exclusive pair
```

### 2.2 Types

```ts
export type ZoneId =
    | 'top-left'    | 'top-center'    | 'top-right'
    | 'middle-left' | 'center'        | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';

/** Common fields every widget instance shares. */
export interface WidgetConfig {
    type: string;               // widget plugin id ('clock', 'weather', 'calendar', ...)
    id?: string;                // stable key for the editor / keyed repeat (auto-generated)
    visibility?: Condition[];   // HA visibility-condition schema (state / numeric_state /
                                // time / user / screen / and / or) — same shape the HA
                                // frontend uses for cards, so its editor can be reused
    priority?: number;          // only meaningful in mode: 'exclusive' zones
    style?: WidgetStyle;        // small set of safe overrides
    [key: string]: unknown;     // widget-specific configuration
}

export interface WidgetStyle {
    fontSize?: string;          // scales the widget's base font
    color?: string;             // overrides appearance.fontColor for this widget
    maxWidth?: string;
    maxHeight?: string;
    margin?: string;            // per-instance escape hatch (CSS shorthand); see §2.3
}

export interface ZoneConfig {
    widgets: WidgetConfig[];
    mode?: 'stack' | 'exclusive';   // default 'stack'
    direction?: 'column' | 'row';   // default 'column'
    align?: 'start' | 'center' | 'end';
    gap?: string;                   // between widgets in this zone; overrides spacing preset
    padding?: string;               // inner inset of the zone box; overrides spacing preset
}

export interface LayoutConfig {
    zones: Partial<Record<ZoneId, ZoneConfig>>;
    spacing?: SpacingPreset | SpacingConfig;  // see §2.3; default 'normal'
}

export type SpacingPreset = 'compact' | 'normal' | 'spacious';

export interface SpacingConfig {
    padding?: string;   // card edge inset (all four sides or CSS shorthand)
    zoneGap?: string;   // gap between grid tracks (zones)
    widgetGap?: string; // default gap between widgets inside every zone
}

export interface WallClockConfigV3 {
    layout: LayoutConfig;
    background?: BackgroundConfig;   // groups today's imageSource/imageConfig/opacity/...
    appearance?: AppearanceConfig;   // groups fontColor/language/timeZone/size
    logLevel?: string;
}
```

Notes:

- `visibility` deliberately copies the Home Assistant frontend condition schema
  (introduced for cards in 2024.x) so we can (a) reuse `ha-card-conditions-editor` in
  our editor and (b) users can copy conditions between HA cards and this card.
- `mode: 'exclusive'` is the generalization of today's `BottomBarManager`: among the
  widgets whose `visibility` currently evaluates true, the highest `priority` renders;
  transitions crossfade (same 500 ms fade the manager uses today).
- Global `size` / `customSizes` survive as defaults; `style.fontSize` overrides per
  widget instance.

### 2.3 Spacing model

Spacing is defined at **three levels**, each with a sane default, so a typical config
never mentions it — and one preset switch retunes the whole card:

```
card padding  →  zone gap (grid)  →  widget gap (inside a zone)  →  widget margin (escape hatch)
```

| Level | Key | What it controls | Default (`normal`) |
|---|---|---|---|
| Card | `layout.spacing.padding` | Inset between card edge and the 3×3 grid | `16px` |
| Grid | `layout.spacing.zoneGap` | Gap between zone tracks (rows *and* columns) | `16px` |
| Zone | `layout.spacing.widgetGap` | Default gap between widgets in every zone stack | `8px` |
| Zone (local) | `zones.<id>.gap` / `zones.<id>.padding` | Per-zone override of the two above | — |
| Widget | `style.margin` | Per-instance escape hatch (CSS shorthand) | — |

Presets map to the three values (chosen so `normal` matches today's visual density):

| Preset | `padding` | `zoneGap` | `widgetGap` |
|---|---|---|---|
| `compact` | `8px` | `8px` | `4px` |
| `normal` | `16px` | `16px` | `8px` |
| `spacious` | `32px` | `24px` | `16px` |

```yaml
layout:
  spacing: spacious            # preset...
  # spacing:                   # ...or explicit values (explicit wins over preset fields)
  #   padding: 24px
  #   zoneGap: 16px
  #   widgetGap: 12px
  zones:
    center:
      gap: 0px                 # clock and date sit tight together
      widgets:
        - type: clock
        - type: date
    bottom-center:
      padding: 0 16px          # zone-local inset
      widgets: [ ... ]
```

Resolution order (most specific wins): `style.margin` → `zone.gap`/`zone.padding` →
`layout.spacing.*` explicit values → preset → built-in `normal`.

Implementation notes:

- All three levels compile to **CSS custom properties** on the `wcc-layout` host
  (`--wcc-padding`, `--wcc-zone-gap`, `--wcc-widget-gap`); zones consume
  `var(--wcc-widget-gap)` as their flex `gap` unless a local `gap` is set. Spacing
  changes therefore never re-render widgets — they only touch host styles.
- Values are plain CSS lengths; `rem` is allowed and recommended for setups that
  scale with `appearance.size` (the card sets its root font size from `size`, so
  `rem`-based spacing scales along with typography automatically — this is also why
  the presets could later become `rem`-based; px keeps 1:1 parity with v2 for now).
- Units are validated in `normalizeConfig()`; an invalid length logs a warning and
  falls back to the preset value (same "ignore invalid, don't break the card" policy
  as invalid tap-action configs).
- `style.margin` is deliberately the **only** free-form margin. Widgets themselves
  must not ship outer margins in their own styles (today's `clockTopMargin` /
  `-140px` pattern) — outer spacing belongs to the layout, inner spacing to the
  widget. This rule goes into the widget authoring docs.
- Editor: spacing preset as a select in the layout section, with an "expand"
  toggle revealing the three explicit fields; per-zone `gap`/`padding` in the zone's
  property panel. Live preview updates instantly since only CSS vars change.
- Migration: v2 has no equivalent knobs (`clockTopMargin` is the closest); migration
  emits no `spacing` key at all → preset `normal`, which is tuned to match the
  current visual density, so converted cards look unchanged.

## 3. Widget contract

Mirrors `ActionPlugin` (`src/components/action-bar/plugin-registry.ts`) so the codebase
has one consistent plugin idiom.

```ts
export interface WidgetPlugin<C extends WidgetConfig = WidgetConfig> {
    readonly widgetId: string;      // 'clock', 'date', 'sensors', ...
    readonly name: string;          // display name for the palette (localization key)
    readonly description?: string;
    readonly icon: string;          // mdi:* icon shown in the editor palette
    readonly elementTag: string;    // custom element tag, e.g. 'wcc-clock-widget'
    readonly editorTag?: string;    // config editor element tag

    defaultConfig(): C;

    /** Optional factory; default implementation is document.createElement(elementTag). */
    createElement?(config: C): WidgetElement<C>;
}
```

```ts
/** Base class for widget elements. */
export abstract class WidgetElement<C extends WidgetConfig = WidgetConfig> extends LitElement {
    @property({ type: Object }) hass?: HomeAssistant;
    @property({ type: Object }) config!: C;
    @property({ type: Object }) appearance!: AppearanceConfig; // fontColor, size, language, timeZone
}
```

Registration follows the existing four registries — singleton + eager side-effect
registration in the directory's `index.ts`:

```
src/widgets/
  index.ts                 // registerAll([...]) side effect + registerWidget() export
  widget-registry.ts       // singleton, getAllWidgets(), getWidget(id)
  widget-element.ts        // WidgetElement base class
  clock/                   // one folder per built-in widget
  date/
  sensors/
  weather/
  transportation/
  action-bar/
  calendar/
  card/
```

Rules carried over from the current architecture:

- Data fetching, polling and HA API calls live in a `ReactiveController` extending
  `BaseController`, not in the element (`CalendarController`, existing
  `WeatherController`, ...).
- Cross-widget signals go through `Messenger` (e.g. the action-bar `weather-update`
  action publishing `WeatherMessage` must reach a weather widget in any zone).
- Pure logic (formatting, grouping, migration) lives in node-testable utils — Jest has
  no DOM/Lit harness (see `jest-lit-esm` constraint: tests import files directly, not
  barrels).

### 3.1 Built-in widget catalog

| Widget | Config (beyond common fields) | Notes |
|---|---|---|
| `clock` | `timeFormat`, `timeZone?` | Split out of today's `ClockComponent` |
| `date` | `dateFormat` | Second half of the split; independent placement |
| `sensors` | `sensors: SensorConfig[]`, `orientation?` | Unchanged internals |
| `weather` | `provider`, `providerConfig`, `displayMode`, `forecastDays`, `iconSet`, `updateInterval`, `title` | Multiple instances allowed (current top-right + forecast bottom) |
| `transportation` | `TransportationConfig` | Unchanged internals |
| `action-bar` | `ActionBarConfig` | Actions keep using the action plugin registry |
| `calendar` | see §4 | New in 3.0 |
| `card` | `card: LovelaceCardConfig` | Embeds any Lovelace card via `loadCardHelpers().createCardElement()`; picker via `hui-card-picker`. The escape hatch that covers most "please support X" requests |
| `spacer` | `size?` | Layout helper |
| `template` | `content` (Jinja), `tap_action?` | **3.1** — via `render_template` websocket subscription |

## 4. Calendar widget

### 4.1 What HA provides

- Calendar platforms (Local Calendar, Google, CalDAV, Holiday, ...) expose
  `calendar.*` entities. The entity **state alone is not enough** (it only carries the
  next event), so the widget must call the API:
  - `GET /api/calendars` → `[{ entity_id, name }]` (used by the editor)
  - `GET /api/calendars/{entity_id}?start=<iso>&end=<iso>` → expanded event list
    (recurrences already expanded by HA)
  - both via `hass.callApi()`, no extra auth needed.
- Event shape: `{ start: { date | dateTime }, end: {...}, summary, description?, location? }`
  — `date` (no time) marks all-day events.

### 4.2 Configuration

```yaml
- type: calendar
  entities:
    - entity: calendar.rodina
      color: '#4FC3F7'        # dot/accent color per source calendar
      label: Rodina
    - entity: calendar.svatky_cz
      color: '#FFB74D'
  daysAhead: 7                # fetch window
  maxEvents: 6                # cap; overflow renders "+N další"
  displayMode: agenda         # 'agenda' | 'today' | 'week-strip'   (mini-month later)
  showAllDay: true
  hidePastTodayEvents: true   # drop today's events that already ended
  updateInterval: 300         # seconds; events change rarely
```

Display modes:

- **`agenda`** (default) — vertical list grouped by day. Day headers use relative
  labels where natural ("Dnes", "Zítra" via `Intl.RelativeTimeFormat`, falling back to
  `Intl.DateTimeFormat` weekday+day in the card language). Rows: colored dot (source
  calendar) · time or "celý den" · summary.
- **`today`** — single compact row/column with only today's remaining events; designed
  for a side zone next to the clock.
- **`week-strip`** — 5–7 day horizontal strip with event counts/first events; designed
  for `bottom-center`, pairs well with an exclusive zone rotation.

### 4.3 Behavior

- `CalendarController extends BaseController` — polls every `updateInterval`,
  fetches all configured entities **in parallel**, merges, sorts, groups by day.
  Last successful response is cached and shown on fetch failure (same resilience
  pattern as weather); a stale badge is not shown, only a debug log.
- Time formatting reuses `resolveHour12` / card locale resolution so 12/24 h matches
  the clock.
- All-day and multi-day events: clamp to the visible window; multi-day render as
  "do pá" suffix on the first visible day.
- Timezone: card `timeZone` wins over browser.
- The merge/sort/group/format pipeline lives in `src/widgets/calendar/calendar-data.ts`
  as pure functions → fully unit-testable in the node Jest environment.

### 4.4 Editor

- Entity rows use the HA selector `{ entity: { domain: 'calendar' } }` (the repo
  already wraps HA selectors — `docs/developer/ha-selector-components.md`), plus a
  color picker per row.
- "Add all my calendars" convenience button backed by `GET /api/calendars`.

### 4.5 Synergies

- `visibility` conditions: calendar shown only in the morning, or only when
  `person.home` — no code needed, comes free with §2.
- Exclusive zone: rotate transportation (rush hours) ↔ calendar (rest of day).
- Holiday integration (`calendar.svatky`) gives name-day/holiday display for free.

## 5. Migration v2 → v3

### 5.1 Strategy

- **Detection:** `config.layout` present → treat as v3. Otherwise legacy v2.
- **Runtime:** `normalizeConfig()` (called from `setConfig`, same place
  `enableActionBar` is normalized today) always produces a `WallClockConfigV3`
  in-memory. Rendering code only ever sees v3. **The user's stored YAML is never
  rewritten implicitly.**
- **Editor:** shows a one-time banner "Tato karta používá starší konfiguraci" with a
  *Convert to zones* button that fires `config-changed` with the explicit v3 YAML.
  Until pressed, the editor keeps editing legacy keys (existing editors keep working).
- Legacy keys stay honored for the whole 3.x line; documented as deprecated.

### 5.2 Mapping table

| v2 key | v3 result |
|---|---|
| `timeFormat`, `timeZone`, `customSizes.clockSize`, `customSizes.clockTopMargin` | `center` → widget `clock` (`clockTopMargin` dropped — the grid removes the need; if set, map to `style.maxHeight` no-op and log info) |
| `dateFormat`, `customSizes.dateSize` | `center` → widget `date` (after `clock`) |
| `sensors`, `customSizes.labelSize/valueSize` | `top-left` → widget `sensors` |
| `showWeather: true`, `weatherProvider`, `weatherConfig`, `weatherDisplayMode`, `weatherTitle`, `weatherUpdateInterval`, `weatherIconSet` | `top-right` → widget `weather` (all display modes render top-right in v2 — the bottom bar never hosts weather) |
| `transportation` | `bottom-center` (mode `exclusive`) → widget `transportation` (`priority: 10`; activity stays message-driven — `ShowTransportationMessage` + auto-hide — not config-driven) |
| `actionBar` (+ deprecated `enableActionBar`) | `bottom-center` (mode `exclusive`) → widget `action-bar` (`priority: 5`, matching the v2 BottomBarManager registration) |
| `imageSource`, `imageConfig`, `backgroundImages`, `backgroundOpacity`, `backgroundRotationInterval`, `objectFit` | `background.*` (background is **not** a widget — it stays a card-level layer) |
| `fontColor`, `language`, `timeZone`, `size` | `appearance.*` |
| `logLevel` | unchanged top-level |

The exclusive `bottom-center` zone with priorities 10/5 reproduces today's
`BottomBarManager` semantics (priority sort + `isActive` + 500 ms crossfade) exactly.

### 5.3 Sketch

```ts
export function migrateToLayout(cfg: WallClockConfig): WallClockConfigV3 {
    if (cfg.layout) return cfg as unknown as WallClockConfigV3;

    const zones: LayoutConfig['zones'] = {};
    const push = (zone: ZoneId, widget: WidgetConfig, zoneDefaults?: Partial<ZoneConfig>) => {
        const z = (zones[zone] ??= { widgets: [], ...zoneDefaults });
        z.widgets.push(widget);
    };

    push('center', { type: 'clock', timeFormat: cfg.timeFormat });
    push('center', { type: 'date', dateFormat: cfg.dateFormat });

    if (cfg.sensors?.length) {
        push('top-left', { type: 'sensors', sensors: cfg.sensors });
    }
    if (cfg.showWeather) {
        push('top-right', { type: 'weather', displayMode: 'current', /* provider... */ });
        if (cfg.weatherDisplayMode === 'forecast' || cfg.weatherDisplayMode === 'both') {
            push('bottom-center',
                { type: 'weather', displayMode: 'forecast', priority: 0 },
                { mode: 'exclusive' });
        }
    }
    if (cfg.transportation) {
        push('bottom-center',
            { type: 'transportation', ...cfg.transportation, priority: 10 },
            { mode: 'exclusive' });
    }
    // action bar: normalizeActionBarConfig() already resolves enableActionBar
    // background/appearance grouping omitted for brevity
    return { layout: { zones }, /* background, appearance */ };
}
```

Testing: pure function + golden fixtures (`tests/migrate-config.test.ts`) — a set of
real-world v2 YAML configs and their expected v3 output. This is the highest-risk part
of 3.0.0 and the cheapest to test exhaustively.

## 6. Rendering

- New `wcc-layout` element replaces the body of `WallClockCard.render()`. CSS grid:

  ```css
  .grid {
      display: grid;
      grid-template-areas: "tl tc tr" "ml c mr" "bl bc br";
      grid-template-columns: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
      grid-template-rows:    minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
      gap: var(--wcc-zone-gap);
      padding: var(--wcc-padding);
      height: 100%;
      box-sizing: border-box;
  }
  ```

  Empty zones render nothing → their track collapses to 0 and the center grows,
  which removes the `-140px` clock hack.
- `wcc-zone` element renders its widget stack; `mode: 'exclusive'` reuses the
  generalized `BottomBarManager` logic (priority + visibility + crossfade), which then
  gets deleted as a special case.
- Background stays a sibling layer under the grid (z-index 0), exactly as today.
- Responsiveness via container queries (`@container`) — the card is resized by HA
  sections view, not the viewport, so media queries are wrong here.

## 7. Editor

- Zone editor = miniature 3×3 preview; widget chips draggable between zones via
  HA `ha-sortable` (the same element the sections view uses).
- Click on a chip opens the widget's `editorTag` in a dialog/expandable — existing
  per-feature editors are reused unchanged.
- Palette lists `WidgetRegistry.getAllWidgets()` (name + icon); the `card` widget
  opens `hui-card-picker`.
- Visibility editing embeds `ha-card-conditions-editor`.

## 8. Phasing

1. **3.0.0-beta1** — types, `migrateToLayout` + golden tests, `wcc-layout`/`wcc-zone`,
   widgets: clock, date, sensors, weather, transportation, action-bar (YAML only,
   editor still legacy).
2. **beta2** — widget registry public API (`registerWidget`), zone drag & drop editor,
   *Convert to zones* flow.
3. **beta3** — `card` widget, `visibility` conditions + editor, calendar widget.
4. **3.1** — `template` widget, profiles/scenes, `mini-month` calendar mode.

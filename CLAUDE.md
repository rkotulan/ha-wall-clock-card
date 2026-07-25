# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Home Assistant Lovelace custom card (`wall-clock-card`) written in TypeScript + Lit. Webpack bundles `src/index.ts` into a single `dist/wall-clock-card.js` that Home Assistant loads as an ES module. There is no runtime server — the "app" is the card running inside a Home Assistant dashboard.

## Commands

```bash
npm run build       # production bundle -> dist/wall-clock-card.js; auto-deploys when configured
npm run watch       # rebuild on change; also auto-deploys when configured
npm run deploy      # copy the existing bundle into the configured HA www directory
npm run type-check  # tsc --noEmit, no build artifacts
npm test            # jest (all *.test.ts under tests/)
npm run analyze     # webpack --analyze, opens the bundle analyzer
```

Run a single test: `npx jest tests/date-time.test.ts` or filter by name with `npx jest -t "formats 24h"`.

Note: `npm run build` runs webpack in `mode: 'production'` regardless of flags (only `watch` uses development mode). The version string shown in the browser console banner comes from `package.json` `version`, injected at build time via webpack `DefinePlugin` as the global `PACKAGE_VERSION`. Bump `package.json` version when releasing.

## Architecture

### Card shell, layout and zones

`WallClockCard` (`src/core/wall-clock-card.ts`) is the registered Lovelace custom element (`@customElement('wall-clock-card')`). It normalizes both legacy 2.x and current 3.x configuration through `migrateToLayout`, owns the background element and a single `wcc-layout`, and coordinates the inline Designer/autosave lifecycle.

`WccLayout` (`src/core/wcc-layout.ts`) is the runtime composition root. It resolves the selected layout format (`3x3`, vertical `2/3 + 1/3` / `1/3 + 2/3`, or horizontal equivalents), creates widget elements through `WidgetRegistry`, caches them by stable widget id and forwards `hass`, appearance and zone context. `WccZone` (`src/core/wcc-zone.ts`) renders each ordered widget stack and implements normal `stack` or priority-based `exclusive` behavior.

Layout/config types and defaults live in `src/core/layout-types.ts`; physical split-panel mapping lives in `src/core/layout-format.ts`; migration and spacing resolution live in `src/core/migrate-config.ts`.

### Feature = component + controller + editor

Each feature under `src/components/<feature>/` is a trio:
- `*-component.ts` — the `LitElement` view.
- `*-controller.ts` — a Lit `ReactiveController` extending `BaseController` (`src/utils/controllers/base-controller.ts`). `BaseController` provides a `ready` Promise (resolved on `hostConnected`, reset on `hostDisconnected`) and namespaced logger; subclasses implement `onHostConnected`/`onHostDisconnected`. Data fetching, polling intervals, and HA API calls live here, not in the component.
- `*-editor.ts` — the visual config editor section shown in the HA card editor.

The runtime adapters in `src/widgets/` extend `WidgetElement` and wrap these feature components. Built-ins register eagerly in `src/widgets/index.ts`; add a new top-level widget by defining its widget element/config, registering a `WidgetPlugin`, and providing an editor adapter when the feature editor still consumes the legacy root config shape.

### Designer

The full-screen/in-place Designer lives under `src/editors/`. `zone-overlay.ts` renders the physical layout editing surface and drag/drop lists. `layout-inspector.ts` hosts card, zone and widget settings; widget editors contribute to the `content`, `appearance` and `behavior` tabs declared in `widget-settings-sections.ts`. `layout-editor-logic.ts` contains immutable add/move/update/format operations and should stay covered by Node tests. Transient expansion/selection state that must survive Home Assistant element recreation belongs in `editor-session-state.ts`, not persisted config.

### Extensibility: singleton registries + self-registration

Five independent plugin systems, all singletons registered eagerly in their directory's `index.ts` (import side effects do the registration):

- **Widgets** — `src/widgets/`. `WidgetRegistry` creates runtime widget elements and exposes palette metadata/default configuration.
- **Image sources** — `src/image-sources/`. `ImageSourceRegistry` + `image-source-factory`; built-ins (picsum, local, unsplash, sensor) registered via `registry.registerAll([...])` in `index.ts`. `BackgroundImageManager` picks images by weather + time-of-day.
- **Weather providers** — `src/weather-providers/`. `WeatherProviderRegistry`; built-ins `openWeatherMapProvider`, `homeAssistantWeatherProvider`.
- **Transportation providers** — `src/transportation-providers/`. Same pattern.
- **Action bar plugins** — `src/components/action-bar/plugins/`. Richest system: each plugin implements `ActionPlugin` (id, handler, optional editor tag, `defaultActionConfig()`) and calls `registerPlugin()` (`plugin-registry.ts`), which registers both the plugin and its handler in the `ActionRegistry`. Existing plugins: navigator, service-call, light-toggle, switch-toggle, weather-update, transportation, background-next, more-info. To add an action, create a folder here mirroring an existing plugin and export it from `plugins/index.ts`.

To register a custom provider/source at runtime, call the exported helpers (`registerWeatherProvider`, `registerImageSource`, `registerPlugin`, …).

**`src/providers/{image,weather,transportation}/` are re-export shims** that `export * from '../../image-sources'` etc. The real implementations live in the top-level `src/image-sources/`, `src/weather-providers/`, `src/transportation-providers/` directories despite what the README's "Project Structure" implies. Import from either; both resolve to the same code.

### Cross-component messaging

`Messenger` (`src/utils/messenger/`) is a singleton pub/sub bus keyed by **message class constructor** (not string topic). `publish(new WeatherMessage(...))` reaches every handler subscribed to `WeatherMessage`. Use this for decoupled cross-component signals (e.g. a weather refresh triggered from the action bar) instead of wiring element references together.

### Supporting utilities

- **Logging** — `createLogger(name)` / global `logger` (`src/utils/logger/`). Levels configured from card config via `configureLogger` / `getLogLevelFromString`.
- **Localization** — `src/utils/localize/`. `loadTranslationsAsync` loads translations; weather conditions are localized across many languages. Translation JSON lives outside `src` (see `docs/`/existing translation files) — add condition strings for every supported language when introducing a new weather condition.
- **Config & types** — legacy/shared types live in `src/core/types.ts`; the normalized 3.x shape and defaults live in `src/core/layout-types.ts`, with migration/resolution in `src/core/migrate-config.ts`.

## Testing

Jest + ts-jest, `testEnvironment: node`, tests in `tests/**/*.test.ts`. Tests target pure logic (date/time formatting, localization, config) — there's no DOM/Lit rendering harness, so keep new units testable in a node environment.

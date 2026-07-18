# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Home Assistant Lovelace custom card (`wall-clock-card`) written in TypeScript + Lit. Webpack bundles `src/index.ts` into a single `dist/wall-clock-card.js` that Home Assistant loads as an ES module. There is no runtime server — the "app" is the card running inside a Home Assistant dashboard.

## Commands

```bash
npm run build       # webpack production build -> dist/wall-clock-card.js
npm run watch       # rebuild on change (development mode); copy dist output into HA www/ to test
npm run type-check  # tsc --noEmit, no build artifacts
npm test            # jest (all *.test.ts under tests/)
npm run analyze     # webpack --analyze, opens the bundle analyzer
```

Run a single test: `npx jest tests/date-time.test.ts` or filter by name with `npx jest -t "formats 24h"`.

Note: `npm run build` runs webpack in `mode: 'production'` regardless of flags (only `watch` uses development mode). The version string shown in the browser console banner comes from `package.json` `version`, injected at build time via webpack `DefinePlugin` as the global `PACKAGE_VERSION`. Bump `package.json` version when releasing.

## Architecture

### Card composition (imperative, not templated)

`WallClockCard` (`src/core/wall-clock-card.ts`) is the single registered custom element (`@customElement('wall-clock-card')`). It does **not** compose its children in a Lit template — it creates them imperatively with `document.createElement('ha-clock')` etc. in its constructor and pushes config/`hass` onto them as properties. The child elements are: `ha-clock`, `ha-sensors`, `ha-weather`, `ha-background-image`, `ha-transportation`, `ha-action-bar`, plus a `BottomBarManager` that decides which "bottom" component (weather vs transportation) is shown. When adding a new top-level feature, follow this pattern: create the element, forward `config`/`hass`/`fontColor`/`size` in the constructor and in `updated()`.

### Feature = component + controller + editor

Each feature under `src/components/<feature>/` is a trio:
- `*-component.ts` — the `LitElement` view.
- `*-controller.ts` — a Lit `ReactiveController` extending `BaseController` (`src/utils/controllers/base-controller.ts`). `BaseController` provides a `ready` Promise (resolved on `hostConnected`, reset on `hostDisconnected`) and namespaced logger; subclasses implement `onHostConnected`/`onHostDisconnected`. Data fetching, polling intervals, and HA API calls live here, not in the component.
- `*-editor.ts` — the visual config editor section shown in the HA card editor.

### Extensibility: singleton registries + self-registration

Four independent plugin systems, all singletons registered eagerly in their directory's `index.ts` (import side effects do the registration):

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
- **Config & types** — shared config shape and defaults in `src/core/config.ts` and `src/core/types.ts` (`WallClockConfig`).

## Testing

Jest + ts-jest, `testEnvironment: node`, tests in `tests/**/*.test.ts`. Tests target pure logic (date/time formatting, localization, config) — there's no DOM/Lit rendering harness, so keep new units testable in a node environment.

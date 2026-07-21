# Development

## Prerequisites

- A supported Node.js/npm installation
- A Home Assistant instance for browser integration testing

## Setup

```bash
git clone https://github.com/rkotulan/ha-wall-clock-card.git
cd ha-wall-clock-card
npm install
```

## Commands

| Command | Purpose |
|---|---|
| `npm run build` | Production webpack bundle to `dist/wall-clock-card.js` |
| `npm run watch` | Development rebuild after source changes |
| `npm run type-check` | Strict TypeScript check without output |
| `npm test` | All Jest tests under `tests/**/*.test.ts` |
| `npx jest tests/migrate-config.test.ts` | One test file |
| `npx jest -t "test name"` | Tests matching a name |
| `npm run analyze` | Production build plus bundle analyzer |

`webpack.config.js` always uses production mode for `npm run build`; watch mode is
development-oriented. The version banner comes from `package.json` through webpack's
`DefinePlugin`.

## Optional Home Assistant deployment

Every successful webpack build calls `scripts/deploy.js`. It is a no-op unless a
destination is configured. Copy `deploy.local.example.json` to `deploy.local.json`
and set the folder that should contain `wall-clock-card.js`, or set `HA_WWW_DEST`:

```json
{
  "dest": "Z:\\config\\www\\wall-clock-card"
}
```

`npm run deploy` copies an existing bundle explicitly. When `haUrl`/`haToken` are
configured for the local bump script, deployment also updates the Lovelace resource
query so browsers request the new bundle. Never commit local deployment credentials.

## Architecture

`WallClockCard` normalizes 2.x/3.0 configuration and hosts `wcc-layout`. The layout
creates widgets through `WidgetRegistry`; feature widgets adapt the normalized
configuration to existing Lit components/controllers. Registries for image sources,
weather, transportation and action plugins are eagerly populated by their barrel
imports.

Feature data fetching and timers belong in reactive controllers. Cross-feature
signals (weather refresh, transportation activity and background changes) use the
typed `Messenger` bus.

## Verification before a release

```bash
npm run type-check
npm test -- --runInBand
npm run build
```

Also test in Home Assistant at desktop and narrow widths:

- normal card and panel/full-screen placement;
- dashboard edit entry, Designer Done and dashboard Done;
- mouse and touch drag/drop;
- reload persistence of the normalized config;
- event/action dialogs and external provider error states.

The Jest environment is Node-based, so DOM rendering remains a browser integration
check. Keep pure migration, formatting and data transformations separately testable.

Use the [3.0.0 release checklist](release-checklist.md) before tagging the final
release.

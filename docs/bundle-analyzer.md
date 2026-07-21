# Bundle analysis

Run the production build with webpack-bundle-analyzer:

```bash
npm run analyze
```

The browser treemap shows parsed and compressed contribution by module. Compare the
generated `dist/wall-clock-card.js` size as part of release review, but do not treat
webpack's generic 244 KiB recommendation as a functional limit for a Home Assistant
custom card.

The largest editor-only dependencies in 3.0 are expected to include the Designer,
HA selector adapters and SortableJS. SortableJS is intentionally bundled to provide
mouse and touch drag/drop. Before optimizing, confirm the current treemap rather than
relying on a hard-coded historical size.

Useful strategies:

- remove unused exports/dependencies and preserve tree-shakable imports;
- keep data/formatting helpers free of editor and Lit side effects;
- consider lazy editor loading only if Home Assistant can reliably resolve the
  resulting chunks from the installed resource path;
- verify that optimization does not break custom-element registration or offline
  wall panels.

The card currently ships as one self-contained ES module, which avoids additional
chunk-path and caching problems in HACS/manual installations.

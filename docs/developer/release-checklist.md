# Release checklist

## Metadata and documentation

- Set the same final version in `package.json` and `package-lock.json` with
  `npm version <version> --no-git-tag-version`.
- Confirm the browser console banner reports the final version after rebuilding.
- Review the top `CHANGELOG.md` entry and remove prerelease wording from release
  notes/assets.
- Re-run the local Markdown-link check or inspect all links changed for the release.

## Automated verification

```bash
npm run type-check
npm test -- --runInBand
npm run build
```

Confirm `dist/wall-clock-card.js` is updated and webpack reports no errors. A local
deployment target configured in `deploy.local.json` or `HA_WWW_DEST` receives every
successful build automatically.

## Home Assistant smoke test

- Fresh card from the picker and a migrated copy of a real 2.x card.
- Regular card: **Configure card** opens the Designer and its own **Done** returns to
  dashboard editing.
- Panel view: Designer opens inline during dashboard edit mode.
- Card settings: general, layout/spacing and every background source.
- Switch between the 3×3 layout and every vertical/horizontal split format; verify
  both panel orders, visual presets and narrow-panel glass.
- Add, edit, collapse, reorder, move and remove every built-in widget.
- Verify row strips, widget width behavior, bottom-pinned widgets and independently
  scrolling overfilled Designer areas.
- Mouse and touch drag/drop; narrow and desktop layouts.
- Reload persistence after continuous saves.
- Weather, calendar and transportation success/empty/error states.
- Tap, hold and double-tap action-bar actions.
- Browser hard refresh/cache-buster after replacing the resource.

## Publish

- Inspect `git diff` so local deployment credentials and test attachments are not
  included.
- Commit the final bundle and documentation according to the repository's release
  policy.
- Create the `v<version>` tag/release and attach or expose the expected
  `wall-clock-card.js` asset for HACS.
- Install the published release once through HACS, not only from the development
  share.

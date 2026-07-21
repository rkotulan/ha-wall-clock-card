# Background behavior

The background is a card-wide layer below all zones. Configuration and source
examples are in [Image sources](image-sources.md).

- `opacity` controls the black readability overlay (`0` transparent, `1` black;
  default `0.3`).
- `rotationInterval` is measured in seconds and defaults to `90`.
- `objectFit` accepts `fill`, `contain`, `cover`, `none` or `scale-down`; default is
  `cover`.
- Images load on demand. Before a transition, the next URL is prepared so the old
  image can crossfade instead of disappearing abruptly.
- A failed/empty source is logged and does not block widget rendering.
- `media-source://` entries are resolved through Home Assistant's media-source API.
- Weather/time filtering uses the current weather message and the card/HA time
  context when a source supports it.

The card stores URLs rather than decoded image data. Browser caching and memory use
therefore remain under browser control; very large originals can still consume
substantial memory on wall tablets and should be resized near the target display
resolution.

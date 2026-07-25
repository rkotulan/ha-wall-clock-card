# Separator widget

The `separator` widget draws a configurable line between other widgets. It has no
entity or runtime controller and can be added more than once.

```yaml
- type: separator
  orientation: auto
  color: '#ead0a4'
  opacity: 0.35
  thickness: 1px
  length: 100%
```

## Options

| Key | Default | Description |
|---|---|---|
| `orientation` | `auto` | `auto`, `horizontal` or `vertical` |
| `color` | widget/card text color | Any valid CSS color |
| `opacity` | `0.28` | Line opacity from 0 to 1 |
| `thickness` | `1px` | CSS width of the line |
| `length` | `100%` | CSS length or percentage, capped by the hosting zone |

With `orientation: auto`, the separator follows the hosting zone direction:
column zones use a horizontal line and row zones use a vertical line. In a split
layout, a full-length separator touching the narrow glass panel is inset by the
card padding on the panel's inner endpoint, keeping both ends visually symmetric.

The Designer accepts CSS lengths such as `1px`, `0.15rem`, `240px` and `100%`.
Invalid CSS values are ignored by the browser, so prefer the visual controls for
normal configuration.

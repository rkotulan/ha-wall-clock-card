# Clock and date widgets

Clock and date are independent widgets in 3.0, so they may be ordered, aligned and
sized separately or placed in different zones.

```yaml
layout:
  zones:
    center:
      align: center
      widgets:
        - type: clock
          clockSize: 10rem
          timeFormat:
            hour: 2-digit
            minute: 2-digit
            second: 2-digit
            hour12: false
        - type: date
          dateSize: 2.5rem
          dateFormat:
            weekday: long
            year: numeric
            month: long
            day: numeric
```

Both widgets use `appearance.language` and `appearance.timeZone`; when omitted they
follow Home Assistant. Their text aligns with the hosting zone (`start`, `center` or
`end`). Selecting alignment in the clock/date inspector updates that zone-level
setting so both remain consistent.

## Clock options

| Key | Default | Values |
|---|---|---|
| `clockSize` | card size preset | Any CSS font size |
| `timeFormat.hour` | `2-digit` | `numeric`, `2-digit` |
| `timeFormat.minute` | `2-digit` | `numeric`, `2-digit` |
| `timeFormat.second` | `2-digit` | `numeric`, `2-digit`; omit/choose hidden to hide |
| `timeFormat.hour12` | HA profile | `true` or `false` |
| `timeFormat.showAmPm` | `true` | Set `false` to hide AM/PM while keeping 12-hour time |

YAML also accepts a `timeFormat.custom` pattern such as `HH:mm`; a custom pattern
overrides the individual parts.

## Date options

| Key | Default | Values |
|---|---|---|
| `dateSize` | card size preset | Any CSS font size |
| `dateFormat.weekday` | `long` | `long`, `short`, `narrow`; omit/choose hidden to hide |
| `dateFormat.year` | `numeric` | `numeric`, `2-digit`; omit/choose hidden to hide |
| `dateFormat.month` | `long` | `long`, `short`, `narrow`, `numeric`, `2-digit`; omit/choose hidden to hide |
| `dateFormat.day` | `numeric` | `numeric`, `2-digit`; omit/choose hidden to hide |
| `dateFormat.custom` | empty | Pattern such as `yyyy-MM-dd` or `EEEE d. MMMM yyyy` |

Common custom tokens include `yyyy`/`yy`, `MMMM`/`MMM`/`MM`/`M`, `EEEE`/`EEE`,
`dd`/`d`, `HH`/`H`, `hh`/`h`, `mm`, `ss` and `a`. Literal punctuation and spaces
are preserved.

`clockSize`/`dateSize` take precedence over the card-wide size preset. Generic
`style.fontSize` is accepted as a fallback, but the named fields are clearer for
built-in clock/date widgets.

# Calendar widget

The `calendar` widget shows upcoming events from one or more Home Assistant
calendar entities. It can be added more than once, so separate zones may contain
different calendars or display modes.

```yaml
layout:
  zones:
    middle-right:
      widgets:
        - type: calendar
          entities:
            - entity: calendar.family
              label: Family
              color: '#4fc3f7'
            - entity: calendar.work
              label: Work
              color: '#ff6b6b'
          displayMode: agenda
          daysAhead: 7
          maxEvents: 8
          showAllDay: true
          showLocation: true
          showDescription: false
          hidePastTodayEvents: true
          hideWhenEmpty: false
          updateInterval: 300
          eventBackgroundColor: '#202020'
          eventBackgroundOpacity: 0.76
```

## Options

| Key | Default | Description |
|---|---:|---|
| `entities` | `[]` | Calendar entities with optional display label and event color |
| `displayMode` | `agenda` | `agenda` or `today` |
| `daysAhead` | `7` | Number of calendar days included by agenda mode (1–31) |
| `maxEvents` | `8` | Maximum rendered events; additional events are not rendered |
| `showAllDay` | `true` | Include all-day events |
| `showLocation` | `true` | Show an event location when available |
| `showDescription` | `false` | Show up to two lines of event description |
| `hidePastTodayEvents` | `true` | Hide today's timed events after they end |
| `hideWhenEmpty` | `false` | Hide the widget when it has no upcoming event |
| `updateInterval` | `300` | Refresh interval in seconds (minimum 60) |
| `eventBackgroundColor` | `#202020` for a newly added widget | Background color of individual event rows |
| `eventBackgroundOpacity` | `0.76` | Event-row background opacity from `0` to `1` |
| `calendarDateSize` | `1em` | Base size of weekday, day number and month |
| `eventTitleSize` | `1em` | Event title font size |
| `eventDetailSize` | `0.82em` | Time and location font size |

The editor can add an individual `calendar.*` entity or all calendars exposed by
Home Assistant. Clicking an event opens a card-owned detail dialog with the full
date/time, source calendar, location and description.

The widget deliberately uses `maxEvents` instead of generic `maxWidth` and
`maxHeight` constraints. Its zone supplies the width and the event limit keeps the
agenda bounded without nested scrollbars or clipped cards.

# Monthly overview

Add **Monthly overview** (`calendar-month`) in the Designer to show a seven-column calendar independently of the agenda widget. Choose one or more Home Assistant calendar entities and a color for each source.

Example widget configuration inside a layout zone:

```yaml
type: calendar-month
entities:
  - entity: calendar.family
    label: Family
    color: '#ed675f'
  - entity: calendar.work
    label: Work
    color: '#61bce9'
firstDayOfWeek: 1
eventsPerDay: 3
showAllDay: true
cellMinHeight: 125
eventTitleSize: .8em
wrapEventTitles: true
grayOutPastEvents: true
backgroundOpacity: 0.65
calendarDateSize: 1em
gridColor: '#88888866'
eventBackgroundOpacity: 0.2
updateInterval: 300
```

Omit `firstDayOfWeek` for the locale default; otherwise use 0 (Sunday) through 6 (Saturday). The widget follows the card/Home Assistant language and time zone. Previous/next buttons browse months; Today returns to the current month. Adjacent-month days complete the first and last weeks.

Choose **Four weeks from the current week** in Content (`viewMode: four-weeks`) for a rolling 28-day grid. The current week is always the first row, followed by three weeks even across month and year boundaries. The range advances automatically within a minute of the local week boundary and follows `firstDayOfWeek`. Days earlier in the current week remain visible to keep complete weeks. The heading shows the date range and month labels mark transitions in the grid. Month navigation is unavailable in this mode. The default `viewMode: month` preserves the monthly view.

In Appearance, **Show calendar heading** (`showTitle`, default `true`) and **Show month navigation** (`showNavigation`, default `true`) are independent. Disable both to remove the whole header without leaving space above the weekday labels. **Show grid lines** (`showGridLines`, default `true`) hides all day-cell and weekday separator lines when disabled, preserving spacing and event colors. For a passive four-week wall display:

```yaml
viewMode: four-weeks
showTitle: false
showNavigation: false
showGridLines: false
```

Click an event to open its details. Days show up to `eventsPerDay` entries (1–10); the additional-events button opens the full day's list. Multi-day events appear on each covered day, respecting exclusive end dates. `showAllDay: false` hides all-day events.

Enable **Wrap event text to two lines** in Appearance (`wrapEventTitles: true`) to display up to two lines per event. Longer text is truncated; clicking the event opens its full details in a popup. The default is a single line.

Enable **Gray out past events** in Appearance (`grayOutPastEvents: true`) to show finished events in gray, including their source stripe and background. Ongoing and future events retain their colors. All-day and multi-day events turn gray after their exclusive end date in the calendar's time zone. The appearance refreshes every minute, also in the day's expanded list; events remain clickable. This option is off by default.

Minimum cell height is 70–400 px. Event and date text sizes accept CSS sizes. Background opacity ranges from 0 (transparent) to 1. The grid needs 490 px; narrower containers scroll horizontally to keep seven columns readable. A calendar without sources still displays the date grid.

**Calendar background opacity** in Appearance (`backgroundOpacity`) controls the dark surface behind the entire calendar, including its heading and date grid: 0 is fully transparent (the default), 1 is opaque. Text and controls remain opaque. This is independent of `eventBackgroundOpacity`, which controls individual event backgrounds. To see the card photograph through the calendar, remove any opaque background on its enclosing panel.

In a horizontal split, when the calendar's zone spans the whole panel (`span: panel`) and contains only one monthly calendar, the background covers the entire panel, including padding and companion widgets such as a legend. It is painted once, so the calendar itself is not darker than the surrounding panel.

The shared calendar controller requests the visible date range, padded for time-zone boundaries, and discards superseded responses when navigating. The existing agenda remains independently configurable.

For a portrait display example with a photograph, simulated clock/weather and sample events, serve the repository and open [calendar-month-demo.html](../examples/calendar-month-demo.html). It uses the actual bundled widget and pins September 2026 for reproducibility.

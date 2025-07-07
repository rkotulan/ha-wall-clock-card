# Transportation Departures for Wall Clock Card

This document describes how to configure the transportation departures feature in the Wall Clock Card.

## Overview

The transportation departures feature allows you to display public transportation departures from multiple stops in the bottom bar of the card. The data is fetched from the IDSJMK API (Integrated Transport System of the South Moravian Region, Czech Republic).

## Configuration

### Single Stop Configuration (Legacy Format)

For a single stop, you can use the simple format:

```yaml
transportation:
  stopId: 1793        # ID of the stop (required)
  postId: 3           # ID of the platform/direction (required)
  maxDepartures: 3    # Number of departures to show (1-5, default: 3)
```

### Multiple Stops Configuration (New Format)

For multiple stops, use the new format with an array of stops:

```yaml
transportation:
  stops:              # Array of stop configurations
    - stopId: 1793    # ID of the first stop
      postId: 3       # ID of the platform/direction for the first stop
      maxDepartures: 3 # Number of departures to show for this stop (optional)
    - stopId: 1793    # Same stop ID can be used with different postId
      postId: 2       # Different platform/direction at the same stop
    - stopId: 1234    # ID of another stop
      postId: 1       # ID of the platform/direction for the second stop
  maxDepartures: 3    # Global max departures setting (applies to all stops if not specified at stop level)
```

### Configuration Options

- **stops** (required for multiple stops): Array of stop configurations.
  - **stopId** (required): The ID of the stop you want to display departures for.
  - **postId** (required): The ID of the platform/direction at the stop.
  - **name** (optional): A custom name for the stop (if not provided, the name from the API will be used).
  - **maxDepartures** (optional): The number of departures to show for this stop (minimum: 1, maximum: 5).
- **maxDepartures** (optional): Global setting for the number of departures to display per stop (minimum: 1, maximum: 5, default: 3).

## Examples

### Single Stop Example (Legacy Format)

```yaml
type: custom:wall-clock-card
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
  hour12: false
dateFormat:
  weekday: 'long'
  month: 'long'
  day: 'numeric'
transportation:
  stopId: 1793
  postId: 3
  maxDepartures: 3
```

### Multiple Stops Example (New Format)

```yaml
type: custom:wall-clock-card
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
  hour12: false
dateFormat:
  weekday: 'long'
  month: 'long'
  day: 'numeric'
transportation:
  stops:
    - stopId: 1793
      postId: 3
    - stopId: 1793
      postId: 2
    - stopId: 1234
      postId: 1
  maxDepartures: 3
```

## API Details

### API Optimization

To minimize API calls, the component makes a single API call per unique stopId (without the postId parameter):

```
https://mapa.idsjmk.cz/api/departures?stopid={stopId}
```

Then it filters the response to find all configured postIds for that stop. This means that if you have multiple platforms at the same stop (e.g., different directions), only one API call is made for that stop.

### Response Format

The API response includes:
- Stop information
- List of platforms (posts) with:
  - Platform ID (postId)
  - Platform name
  - List of departures with:
    - Line number
    - Destination
    - Time until departure
    - Low-floor vehicle indicator

## Display Format

Departures are displayed in the bottom bar of the card, grouped by stop/platform:

- Main header: "Transportation Departures"
- For each stop/platform:
  - Stop header: "Direction: {direction name}"
  - Departures for that stop, each showing:
    - Line number
    - Destination with arrow (→)
    - Time until departure
    - Wheelchair symbol (♿) for low-floor vehicles

On mobile devices and narrow screens, stops are stacked vertically. On wider screens, stops are arranged in columns side by side for better space utilization:
- 2 columns on screens wider than 600px
- 3 columns on screens wider than 900px
- 4 columns on screens wider than 1200px

### Visual Example (Mobile/Narrow Screens)

```
Transportation Departures
--------------------------
Direction: Main Station
[25] → Downtown (3min) ♿
[26] → Airport (7min)
[25] → Downtown (15min) ♿

Direction: University
[12] → Campus (2min) ♿
[14] → Library (8min) ♿
```

### Visual Example (Wide Screens)

```
Transportation Departures
--------------------------
Direction: Main Station         Direction: University
[25] → Downtown (3min) ♿       [12] → Campus (2min) ♿
[26] → Airport (7min)          [14] → Library (8min) ♿
[25] → Downtown (15min) ♿
```

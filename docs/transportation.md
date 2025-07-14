# Transportation Departures for Wall Clock Card

This document describes how to configure the transportation departures feature in the Wall Clock Card.

## Overview

The transportation departures feature allows you to display public transportation departures from multiple stops in the bottom bar of the card. The data is fetched from the IDSJMK API (Integrated Transport System of the South Moravian Region, Czech Republic).

## Providers

### idsjmk

The `idsjmk` provider fetches data from the IDSJMK API (Integrated Transport System of the South Moravian Region - IDSJMK), which provides real-time public transportation information for Brno and the South Moravian Region in the Czech Republic.

## Configuration

You have to enable public transportation departures in the yaml configuration. 
```yaml
enableTransportation: true
```

### Stops Configuration

Use an array of stops to configure transportation departures:

```yaml
enableTransportation: true
transportation:  
  provider: 'idsjmk'  # Transportation provider ID (optional, defaults to 'idsjmk')
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

- **provider** (optional): The ID of the transportation provider to use (default: 'idsjmk').
- **providerConfig** (optional): Configuration options specific to the selected provider.
- **stops** (required): Array of stop configurations.
  - **stopId** (required): The ID of the stop you want to display departures for (can be a number or string).
  - **postId** (required): The ID of the platform/direction at the stop (can be a number or string).
  - **name** (optional): A custom name for the stop (if not provided, the name from the API will be used).
  - **maxDepartures** (optional): The number of departures to show for this stop (minimum: 1, maximum: 5).
- **maxDepartures** (optional): Global setting for the number of departures to display per stop (minimum: 1, maximum: 5, default: 3).
- **onDemand** (optional): Whether to show transportation data on demand when the user clicks a button (default: false).
- **autoHideTimeout** (optional): Time in minutes after which to hide departures and show the bus button again when in onDemand mode (minimum: 1, maximum: 10).

### On-Demand Loading

You can enable on-demand loading of transportation departures to save API calls:

```yaml
enableTransportation: true
transportation:
  onDemand: true  # Enable on-demand loading
  autoHideTimeout: 5  # Auto-hide departures after 5 minutes (optional, 1-10 minutes)
  # ... other transportation settings
```

When on-demand loading is enabled:
- A bus icon will appear in the bottom left corner of the card
- Transportation data will only be loaded when the icon is clicked
- After clicking, departures will be displayed and updated according to the update interval
- If `autoHideTimeout` is set, departures will be automatically hidden after the specified time (1-10 minutes) and the bus button will be shown again

## Examples

### Configuration Example

```yaml
type: custom:wall-clock-card
enableTransportation: true
transportation:
  provider: 'idsjmk'
  onDemand: true  # Enable on-demand loading (optional)
  autoHideTimeout: 5  # Auto-hide departures after 5 minutes (optional, 1-10 minutes)
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

Use this API endpoint to fetch transportation departures is on your risk. Kordis JMK does not allow to use this API for commercial purposes. The API is provided by Kordis JMK.

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
- 4 columns on screens wider than 1400px

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

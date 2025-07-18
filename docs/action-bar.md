# Action Bar for Wall Clock Card

This document describes how to configure the action bar feature in the Wall Clock Card.

## Overview

The action bar feature allows you to display customizable action buttons at the bottom of the card. These buttons can be used to navigate to different pages in Home Assistant, call services, or perform custom actions.

## Configuration

You have to enable the action bar in the yaml configuration. 
```yaml
enableActionBar: true
```

> **Note**: Action bar and transportation departures cannot be displayed simultaneously. If both are enabled, the action bar takes precedence. See [Transportation](transportation.md) for more information.

### Actions Configuration

Use an array of actions to configure the action bar:

```yaml
enableActionBar: true
actionBar:
  enabled: true  # Optional, defaults to true when enableActionBar is true
  actions:        # Array of action configurations
    - type: navigate
      path: /lovelace/0
      title: Home
      icon: M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z
    - type: call-service
      service: light.turn_on
      service_data:
        entity_id: light.living_room
      title: Lights
      icon: M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z
    - type: custom
      action: custom-action
      title: Custom
      icon: M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z
```

### Configuration Options

- **enabled** (optional): Whether the action bar is enabled (default: true when enableActionBar is true).
- **alignment** (optional): The horizontal alignment of the buttons. One of:
  - **left**: Align buttons to the left side of the card.
  - **center**: Align buttons to the center of the card (default).
  - **right**: Align buttons to the right side of the card.
- **actions** (required): Array of action configurations.
  - **type** (required): The type of action to perform. One of:
    - **navigate**: Navigate to a different page in Home Assistant.
    - **call-service**: Call a Home Assistant service.
    - **custom**: Perform a custom action (for future extensibility).
  - **title** (required): The text to display under the icon.
  - **icon** (required): The SVG path data for the icon to display.
  - Additional properties based on action type:
    - For **navigate** actions:
      - **path** (required): The path to navigate to (e.g., /lovelace/0).
    - For **call-service** actions:
      - **service** (required): The service to call (e.g., light.turn_on).
      - **service_data** (optional): Data to pass to the service.
    - For **custom** actions:
      - **action** (required): A string identifier for the custom action.

### Important Notes

- Action bar and transportation cannot be displayed simultaneously - action bar takes precedence.
- When the action bar is displayed, the clock will be adjusted upward to make room for the action bar.
- Icons use SVG path data format. You can find SVG path data for Material Design icons at [materialdesignicons.com](https://materialdesignicons.com/).

## Examples

### Basic Navigation Example

```yaml
type: custom:wall-clock-card
enableActionBar: true
actionBar:
  alignment: center  # Center alignment (default)
  actions:
    - type: navigate
      path: /lovelace/0
      title: Home
      icon: M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z
    - type: navigate
      path: /lovelace/1
      title: Lights
      icon: M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z
    - type: navigate
      path: /lovelace/2
      title: Climate
      icon: M12,6A4,4 0 0,1 16,10C16,12 13,15 12,16.5C11,15 8,12 8,10A4,4 0 0,1 12,6M8.5,17.5C5,21 2,22 2,22C2,22 7,22 12,22C17,22 22,22 22,22C22,22 19,21 15.5,17.5C14,19 13,20 12,20C11,20 10,19 8.5,17.5Z
```

### Service Call Example

```yaml
type: custom:wall-clock-card
enableActionBar: true
actionBar:
  alignment: right  # Right alignment
  actions:
    - type: call-service
      service: light.turn_on
      service_data:
        entity_id: light.living_room
      title: Lights On
      icon: M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z
    - type: call-service
      service: light.turn_off
      service_data:
        entity_id: light.living_room
      title: Lights Off
      icon: M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M9,7L7,9L10,12L7,15L9,17L12,14L15,17L17,15L14,12L17,9L15,7L12,10L9,7Z
```

### Left Alignment Example

```yaml
type: custom:wall-clock-card
enableActionBar: true
actionBar:
  alignment: left  # Left alignment
  actions:
    - type: navigate
      path: /lovelace/0
      title: Home
      icon: M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z
    - type: call-service
      service: light.toggle
      service_data:
        entity_id: light.living_room
      title: Toggle
      icon: M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z
```

## Display Format

The action bar is displayed at the bottom of the card:

- Each action is represented by a button with an icon and text
- Buttons are arranged horizontally and can be aligned to the left, center, or right
- Buttons have a semi-transparent background that highlights on hover
- When the action bar is displayed, the clock is adjusted upward to make room

### Visual Example

```
                [Clock]
                [Date]

[Button 1]    [Button 2]    [Button 3]
  Icon          Icon          Icon
  Text          Text          Text
```

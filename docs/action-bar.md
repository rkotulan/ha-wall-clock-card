# Action Bar for Wall Clock Card

This document describes how to configure the action bar feature in the Wall Clock Card.

## Overview

The action bar feature allows you to display customizable action buttons at the bottom of the card. These buttons can be used to navigate to different pages in Home Assistant, call services, or perform custom actions.

## Configuration

You have to enable the action bar in the yaml configuration. 
```yaml
actionBar:
  enabled: true
```

> **Note**: Action bar and transportation departures cannot be displayed simultaneously. If both are enabled, the action bar takes precedence. See [Transportation](transportation.md) for more information.

### Actions Configuration

Use an array of actions to configure the action bar:

```yaml
actionBar:
  enabled: true  
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
  - **icon** (required): The icon to display. Can be specified in two formats:
      - **Material Design Icons format**: Using the `mdi:` prefix followed by the icon name (e.g., `mdi:home`, `mdi:light-bulb`).
      - **SVG path data format**: Using the raw SVG path data.
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
- Icons can be specified in two formats:
  - Material Design Icons format using the `mdi:` prefix (e.g., `mdi:home`). You can browse available icons at [materialdesignicons.com](https://materialdesignicons.com/).
  - SVG path data format for custom icons or more control.

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
      icon: mdi:home
    - type: navigate
      path: /lovelace/1
      title: Lights
      icon: mdi:lightbulb
    - type: navigate
      path: /lovelace/2
      title: Climate
      icon: mdi:thermostat
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
      icon: mdi:lightbulb-on
    - type: call-service
      service: light.turn_off
      service_data:
        entity_id: light.living_room
      title: Lights Off
      icon: mdi:lightbulb-off
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
      icon: mdi:home
    - type: call-service
      service: light.toggle
      service_data:
        entity_id: light.living_room
      title: Toggle
      icon: mdi:toggle-switch
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

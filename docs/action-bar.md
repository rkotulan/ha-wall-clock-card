# Action Bar for Wall Clock Card

This document describes how to configure the action bar feature in the Wall Clock Card.

## Overview

The action bar feature allows you to display customizable action buttons at the bottom of the card. These buttons can be used to navigate to different pages in Home Assistant, call services, toggle lights and switches, open more-info dialogs, or run any standard Home Assistant action.

## Configuration

You have to enable the action bar in the yaml configuration.

```yaml
actionBar:
  enabled: true
```

> **Note**: Action bar and transportation departures cannot be displayed simultaneously. If both are enabled, the action bar takes precedence. See [Transportation](transportation.md) for more information.

### Actions Configuration

Use an array of actions to configure the action bar. Every action is identified by its `actionId` and has a `title` and an `icon`:

```yaml
actionBar:
  enabled: true
  actions:        # Array of action configurations
    - actionId: action-navigate
      title: Home
      icon: mdi:home
      path: /lovelace/0
    - actionId: call-service
      title: Lights
      icon: mdi:lightbulb
      service: light.turn_on
      service_data:
        entity_id: light.living_room
    - actionId: action-more-info
      title: Weather
      icon: mdi:weather-partly-cloudy
      entity_id: weather.home
```

### Configuration Options

- **enabled** (optional): Whether the action bar is enabled.
- **alignment** (optional): The horizontal alignment of the buttons. One of:
  - **left**: Align buttons to the left side of the card.
  - **center**: Align buttons to the center of the card (default).
  - **right**: Align buttons to the right side of the card.
- **actions** (required): Array of action configurations. Common properties:
  - **actionId** (required): Which action plugin to run. One of:

    | actionId | Purpose |
    |---|---|
    | `action-navigate` | Navigate to a Home Assistant page |
    | `call-service` | Call a Home Assistant service |
    | `light-toggle` | Toggle a light (icon reflects state) |
    | `switch-toggle` | Toggle a switch (icon reflects state) |
    | `action-more-info` | Open an entity's more-info dialog |
    | `action-ha` | Run any standard HA action (see below) |
    | `weather-update` | Force a weather refresh |
    | `transportation` | Temporarily show transportation departures |
    | `background-next` | Switch to the next background image |

  - **title** (required): The text to display under the icon.
  - **icon** (required): The icon to display. Either a Material Design Icon name with the `mdi:` prefix (e.g. `mdi:home`, browse at [Material Design Icons](https://pictogrammers.com/library/mdi/)), or raw SVG path data for custom icons.
  - **tap_action / hold_action / double_tap_action** (optional): Standard Home Assistant action configs — see [Standard HA actions](#standard-ha-actions-on-any-button) below.

- Additional properties based on `actionId`:
  - For **action-navigate**:
    - **path** (required): The path to navigate to (e.g. `/lovelace/0`, `/config`).
    - **target** (optional): `_blank` opens the path in a new tab.
  - For **call-service**:
    - **service** (required): The service to call (e.g. `light.turn_on`).
    - **service_data** (optional): Data to pass to the service.
    - **confirmation** (optional): Show HA's native confirmation dialog first.
    - **confirmation_text** (optional): Custom text for the confirmation dialog.
  - For **light-toggle** / **switch-toggle**:
    - **entity_id** (required): The entity to toggle.
    - **icon_on** (optional): Icon shown while the entity is on.
    - **activeColor** (optional): Icon color while the entity is on.
  - For **action-more-info**:
    - **entity_id** (required): The entity ID to show more info for.
  - For **action-ha**:
    - **entity** (optional): Entity used by the `more-info` and `toggle` actions.
    - **tap_action / hold_action / double_tap_action**: Standard HA action configs.

### Important Notes

- Action bar and transportation cannot be displayed simultaneously - action bar takes precedence.
- When the action bar is displayed, the clock will be adjusted upward to make room for the action bar.
- Buttons support **tap**, **hold** and **double-tap** gestures. Hold and double-tap run the corresponding `hold_action` / `double_tap_action`.

## Examples

### Basic Navigation Example

```yaml
type: custom:wall-clock-card
actionBar:
  enabled: true
  alignment: center  # Center alignment (default)
  actions:
    - actionId: action-navigate
      title: Home
      icon: mdi:home
      path: /lovelace/0
    - actionId: action-navigate
      title: Lights
      icon: mdi:lightbulb
      path: /lovelace/1
    - actionId: action-navigate
      title: Settings
      icon: mdi:cog
      path: /config
```

### Service Call Example

```yaml
type: custom:wall-clock-card
actionBar:
  enabled: true
  alignment: right  # Right alignment
  actions:
    - actionId: call-service
      title: Lights On
      icon: mdi:lightbulb-on
      service: light.turn_on
      service_data:
        entity_id: light.living_room
    - actionId: call-service
      title: Restart All
      icon: mdi:restart
      service: script.restart_all
      confirmation: true
      confirmation_text: Really restart everything?
```

### Toggle Example

```yaml
type: custom:wall-clock-card
actionBar:
  enabled: true
  actions:
    - actionId: light-toggle
      title: Office
      icon: mdi:lightbulb-outline
      icon_on: mdi:lightbulb-on
      entity_id: light.office_lights
      activeColor: '#fff170'
    - actionId: switch-toggle
      title: Fan
      icon: mdi:fan
      entity_id: switch.bedroom_fan
```

### More Info Example

```yaml
type: custom:wall-clock-card
actionBar:
  enabled: true
  actions:
    - actionId: action-more-info
      title: Weather
      icon: mdi:weather-partly-cloudy
      entity_id: weather.home
    - actionId: action-more-info
      title: Climate
      icon: mdi:thermostat
      entity_id: climate.living_room
```

## Home Assistant Action (standard actions)

The **Home Assistant Action** (`actionId: action-ha`) runs a native Home Assistant
action through HA's own `handleAction()` implementation, so it behaves exactly
like actions on built-in HA cards. Use it to reach **any** HA route — including
system pages such as `/config`, `/history`, and `/logbook` — and to trigger the
standard `navigate`, `call-service`, `more-info`, `url`, and `toggle` actions.

The action is configured via standard HA `tap_action` / `hold_action` /
`double_tap_action` objects. The `entity` field (used by `more-info` and
`toggle`) is set at the top level, matching HA's own schema. The visual editor
uses HA's native action selector — the same UI as built-in cards.

```yaml
type: custom:wall-clock-card
actionBar:
  enabled: true
  actions:
    # Navigate to a HA system route
    - actionId: action-ha
      title: Settings
      icon: mdi:cog
      tap_action:
        action: navigate
        navigation_path: /config

    # Open an entity's more-info dialog on tap, toggle it on hold
    - actionId: action-ha
      title: Lamp
      icon: mdi:lightbulb
      entity: light.living_room
      tap_action:
        action: more-info
      hold_action:
        action: toggle

    # Call a service
    - actionId: action-ha
      title: Scene
      icon: mdi:palette
      tap_action:
        action: call-service
        service: scene.turn_on
        service_data:
          entity_id: scene.movie_time

    # Open an external URL in a new tab
    - actionId: action-ha
      title: Docs
      icon: mdi:book-open-variant
      tap_action:
        action: url
        url_path: https://www.home-assistant.io
```

### Standard HA actions on any button

`tap_action`, `hold_action` and `double_tap_action` are not limited to
`actionId: action-ha` — **any** action in the bar may carry them, and they then
run through HA's `handleAction()` instead of the plugin handler:

```yaml
actionBar:
  actions:
    - actionId: action-navigate   # plugin id is ignored when tap_action is set
      title: Energy
      icon: mdi:lightning-bolt
      tap_action:
        action: navigate
        navigation_path: /energy
      hold_action:
        action: more-info
        entity: sensor.energy_today
```

## Display Format

The action bar is displayed at the bottom of the card:

- Each action is represented by a button with an icon and text
- Buttons are arranged horizontally and can be aligned to the left, center, or right
- Buttons have a semi-transparent background that highlights on hover
- Buttons are keyboard-accessible (Tab + Enter/Space)
- When the action bar is displayed, the clock is adjusted upward to make room

### Visual Example

```
                [Clock]
                [Date]

[Button 1]    [Button 2]    [Button 3]
  Icon          Icon          Icon
  Text          Text          Text
```

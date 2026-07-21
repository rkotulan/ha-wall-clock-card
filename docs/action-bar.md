# Action bar widget

An `action-bar` widget renders configurable Home Assistant controls. Action bars are
not singletons: a card may have separate button groups in multiple zones.

```yaml
layout:
  zones:
    bottom-center:
      widgets:
        - type: action-bar
          enabled: true
          orientation: auto
          alignment: auto
          backgroundOpacity: 0.3
          buttonGap: 12px
          padding: 12px 16px
          iconSize: 64px
          actions:
            - actionId: action-ha
              title: Home
              icon: mdi:home
              tap_action:
                action: navigate
                navigation_path: /lovelace/0
```

## Widget options

| Key | Default | Description |
|---|---|---|
| `enabled` | `true` | Enable this action bar |
| `actions` | `[]` | Ordered action buttons |
| `orientation` | `auto` | `auto`, `horizontal` or `vertical` |
| `alignment` | `auto` | `auto`, `left`, `center` or `right` |
| `backgroundOpacity` | `0.3` | Black panel opacity from 0 to 1 |
| `buttonGap` | `16px` | CSS length between buttons |
| `padding` | `16px` | CSS padding shorthand inside the panel |
| `iconSize` | size preset | CSS icon size, for example `72px` |

Auto orientation uses a horizontal row in center-column zones and a vertical stack
in side zones. Auto alignment follows the zone. For a vertical action bar the dark
panel shrink-wraps the buttons instead of filling the complete zone width.

Each action requires `actionId`, `title` and `icon`. `icon` accepts an `mdi:` name or
raw SVG path data. Buttons are keyboard accessible and support tap, hold and
double-tap gestures.

## Built-in actions

| `actionId` | Purpose | Main fields |
|---|---|---|
| `action-ha` | Any standard HA card action | `entity`, `tap_action`, `hold_action`, `double_tap_action` |
| `action-navigate` | Navigate to an HA route or URL | `path`, optional `target` |
| `call-service` | Call a service | `service`, `service_data`, optional confirmation |
| `action-more-info` | Open native more-info | `entity_id` |
| `light-toggle` | Toggle a light and reflect state | `entity_id`, optional `icon_on`, `activeColor` |
| `switch-toggle` | Toggle a switch and reflect state | `entity_id`, optional `icon_on`, `activeColor` |
| `weather-update` | Refresh weather immediately | no extra fields |
| `transportation` | Show the configured transportation widget | no extra fields |
| `background-next` | Advance the background | no extra fields |

The visual editor is the safest way to add actions because it exposes the fields
supported by the selected plugin.

## Standard Home Assistant actions

`action-ha` delegates to Home Assistant's own action handler:

```yaml
- type: action-bar
  actions:
    - actionId: action-ha
      title: Lamp
      icon: mdi:lightbulb
      entity: light.living_room
      tap_action:
        action: more-info
      hold_action:
        action: toggle

    - actionId: action-ha
      title: Scene
      icon: mdi:palette
      tap_action:
        action: call-service
        service: scene.turn_on
        service_data:
          entity_id: scene.movie_time
```

Any plugin action can also carry `tap_action`, `hold_action` or
`double_tap_action`. When a valid standard action exists for the gesture, Home
Assistant handles it instead of the plugin handler.

## Plugin-specific examples

```yaml
- type: action-bar
  actions:
    - actionId: action-navigate
      title: Settings
      icon: mdi:cog
      path: /config

    - actionId: call-service
      title: Lights on
      icon: mdi:lightbulb-on
      service: light.turn_on
      service_data:
        entity_id: light.living_room
      confirmation: true
      confirmation_text: Turn on the living-room lights?

    - actionId: light-toggle
      title: Office
      icon: mdi:lightbulb-outline
      icon_on: mdi:lightbulb-on
      entity_id: light.office
      activeColor: '#fff170'
```

See [Action-bar plugins](action-bar-plugins.md) for the extension API. Legacy 2.x
`actionBar` / `enableActionBar` configuration migrates to a priority-5 widget in
`bottom-center`.

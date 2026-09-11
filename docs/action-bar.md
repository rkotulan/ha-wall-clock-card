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
          columns: 2
          alignment: auto
          backgroundOpacity: 0.3
          showButtonBackground: false
          buttonGap: 12px
          padding: 12px 16px
          iconSize: 64px
          titleSize: 16px
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
| `columns` | 2 in row zones | Fixed grid column count; when set, overrides orientation |
| `alignment` | `auto` | `auto`, `left`, `center` or `right` |
| `backgroundOpacity` | `0.3` | Black panel opacity from 0 to 1 |
| `showButtonBackground` | `true` | Show the translucent circular surface behind each action |
| `buttonGap` | `16px` | CSS length between buttons |
| `padding` | `16px` | CSS padding shorthand inside the panel |
| `iconSize` | size preset | CSS icon size, for example `72px` |
| `titleSize` | `18px` | CSS font size of action button titles |

Auto orientation uses a horizontal row in center-column zones and a vertical stack
in side zones. Auto alignment follows the zone. For a vertical action bar the dark
panel shrink-wraps the buttons instead of filling the complete zone width.
Set `showButtonBackground: false` for flat icon-and-label actions without the
individual circular surfaces. Set `columns: 2` to render four actions as a 2×2
grid. Grid cells and buttons shrink responsively when the action-bar widget is
narrow, so a two-column grid does not overflow a compact tablet panel.

Each action requires `actionId`, `title` and `icon`. `icon` accepts any Home
Assistant icon name (including custom icon collections) or raw SVG path data.
Buttons are keyboard accessible and support tap, hold and double-tap gestures.

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

Changing the action type automatically updates an empty or default title and
icon to match the selected type. Custom titles and icons are preserved
independently. The automatic title uses the editor's language.

**Active icon color** is available for **Toggle Light** and **Toggle Switch**.
It colors the icon while the selected entity is `on`. To try it, add a
**Toggle Light** action, select a light, set **Active icon color**, then turn
the light on and off.

Navigation, service calls and standard Home Assistant actions do not
automatically track an active state, so their editors do not offer this field.
Use `stateEntity` and `stateRules` to color those buttons based on an entity's
state instead.

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

## Icons and colors by entity state

In the action editor, open **Appearance by entity state**, select **Entity to
track**, and add rules with a state, optional icon, and optional icon color.
Use Home Assistant's raw state values (`open`, `closed`, `on`, etc.), not
translated display text. Rules work with every action type and do not change
tap, hold or double-tap behavior, so an existing popup action can stay as it is.

| Action field | Meaning |
|---|---|
| `color` | Optional default icon color when inactive; otherwise inherits the card color |
| `stateEntity` | Entity tracked for appearance, independent of action targets |
| `stateRules` | Ordered rules, each with `state` and optional `icon` / `color` |

The first exact matching rule wins. Its nonempty icon/color overrides the normal
plugin appearance, including the active color. Unspecified fields and unmatched
states retain the normal appearance. A missing entity is treated as `unavailable`;
an entity reporting `unknown` matches `unknown`. Add explicit rules for these
states so they are distinguishable from a closed garage.

For example, this button opens entity details while displaying garage status.
To keep an existing popup, add only `color`, `stateEntity`, and `stateRules` to
your existing button configuration:

```yaml
- type: action-bar
  actions:
    - actionId: action-ha
      title: Garage
      icon: mdi:garage-alert
      color: '#9e9e9e'
      entity: cover.garage
      tap_action:
        action: more-info
      stateEntity: cover.garage
      stateRules:
        - state: open
          icon: mdi:garage-open
          color: '#f44336'
        - state: closed
          icon: mdi:garage
          color: '#4caf50'
        - state: opening
          icon: mdi:garage-open
          color: '#ff9800'
        - state: closing
          icon: mdi:garage-open
          color: '#ff9800'
        - state: unknown
          icon: mdi:help-circle-outline
          color: '#9e9e9e'
        - state: unavailable
          icon: mdi:alert-circle-outline
          color: '#9e9e9e'
```

Quote boolean-looking YAML state values such as `"on"` and `"off"`.

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

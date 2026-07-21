# Action-bar plugin API

Action plugins provide three things: a stable `actionId`, the tap handler and,
optionally, a custom editor element. Built-ins self-register when
`src/components/action-bar/plugins/index.ts` is imported.

The current built-ins are `action-ha`, `action-navigate`, `call-service`,
`action-more-info`, `light-toggle`, `switch-toggle`, `weather-update`,
`transportation` and `background-next`. User configuration is documented in
[Action bar](action-bar.md).

## Plugin contract

`src/components/action-bar/plugin-registry.ts` defines `ActionPlugin`:

```typescript
interface ActionPlugin<T extends ModuleActionConfig> {
  readonly actionId: string;
  readonly name: string;
  readonly description?: string;
  readonly icon?: string;
  readonly handler: ActionHandler<T>;
  readonly editorTag?: string;
  defaultActionConfig(): T;
  register(): void;
}
```

Optional state-aware plugins may additionally expose `getIconForState()` and/or
`getActiveState()`; the action-bar component checks these when rendering.

## Minimal plugin

```typescript
import {ActionHandler, ModuleActionConfig} from '../../types';
import {ActionPlugin, registerPlugin} from '../../plugin-registry';

export interface MyActionConfig extends ModuleActionConfig {
  message?: string;
}

export const MY_ACTION = 'my-action';

const handler: ActionHandler<MyActionConfig> = (action, hass, element) => {
  // Perform the action. `hass` is the current Home Assistant object.
  console.info(action.message, hass, element);
};

export class MyActionPlugin implements ActionPlugin<MyActionConfig> {
  readonly actionId = MY_ACTION;
  readonly name = 'My action';
  readonly description = 'Runs my custom behavior';
  readonly icon = 'mdi:star';
  readonly handler = handler;
  readonly editorTag = ''; // or a registered custom-element tag

  defaultActionConfig(): MyActionConfig {
    return {actionId: MY_ACTION, title: 'My action', icon: 'mdi:star'};
  }

  register(): void {
    registerPlugin(this);
  }
}

new MyActionPlugin().register();
```

Export/import the plugin from `plugins/index.ts` so registration runs before the
editor or action bar asks the singleton registry for it. `registerPlugin()` registers
both metadata and the handler with `ActionRegistry`; do not query a rendered
`ha-action-bar` element to install handlers.

## Custom editor

Set `editorTag` to a registered Lit custom element implementing the same update
contract as the editors under `plugins/*/*-editor-plugin.ts`. The editor receives the
current action/config and emits the normal configuration-change event. Reuse the
shared editor controls in `plugins/editors/` for consistent labels, entity selectors
and action fields.

An empty `editorTag` is valid for actions without extra fields. Their common title
and icon remain editable.

## Execution rules

- The plugin handler runs for a tap when no valid `tap_action` is configured.
- `hold_action` and `double_tap_action` only run when explicitly configured.
- Valid standard HA action objects are delegated to `custom-card-helpers`
  `handleAction()` for the corresponding gesture.
- Unknown `actionId` values are ignored with a console warning.
- Handlers should use the supplied `hass` object and avoid retaining stale element
  references.

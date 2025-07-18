# Action Bar Plugins

The Action Bar component now supports plugins, allowing other modules to register their own action types and handlers.

## Overview

The Action Bar component provides a way to add buttons to the bottom of the card that can perform various actions. The built-in action types are:

- `Navigate` - Navigate to a different page in Home Assistant
- `CallService` - Call a Home Assistant service
- `Custom` - Execute a custom action

With the plugin system, modules can now register their own action types and handlers, allowing for more flexibility and extensibility.

## Using the Plugin System

There are two ways to use the plugin system:

1. **Register a custom action type and handler**: This allows a module to define its own action type and handler function.
2. **Add a button to the action bar**: This allows a module to add a button to the action bar that uses its own configuration.

### Registering a Custom Action Type and Handler

To register a custom action type and handler, you need to:

1. Define a string literal for your action type
2. Create a handler function that will be called when the action is executed
3. Register the handler with the ActionBarController

```typescript
import { ActionBarController, ActionHandler } from '../components/action-bar/action-bar-controller';

// Define your action type
const MY_CUSTOM_ACTION = 'my-custom-action';

// Create a handler function
const myCustomActionHandler: ActionHandler = (action, hass) => {
  console.log('Executing my custom action:', action);
  // Your custom action logic here
};

// Register the handler with the ActionBarController
const actionBarController = document.querySelector('ha-action-bar')?.controller;
if (actionBarController) {
  actionBarController.registerActionHandler(MY_CUSTOM_ACTION, myCustomActionHandler);
}
```

### Adding a Button to the Action Bar

To add a button to the action bar, you need to:

1. Create an action configuration object
2. Add it to the action bar configuration

```typescript
import { ActionBarConfig, ModuleActionConfig } from '../components/action-bar/types';

// Create an action configuration
const myCustomAction: ModuleActionConfig = {
  type: 'my-custom-action', // The action type you registered
  title: 'My Custom Action', // The title to display on the button
  icon: 'mdi:star', // The icon to display on the button
  // Any additional properties your handler needs
  customProperty1: 'value1',
  customProperty2: 'value2'
};

// Get the current action bar configuration
const actionBarController = document.querySelector('ha-action-bar')?.controller;
if (actionBarController) {
  const actionBarConfig = actionBarController.actionBarConfig || { actions: [] };

  // Add your action to the configuration
  actionBarConfig.actions.push(myCustomAction);

  // Update the action bar configuration
  actionBarController.updateConfig({ actionBar: actionBarConfig });
}
```

## Built-in Plugins

### Navigation Plugin

The Navigation Plugin provides an enhanced way to navigate to different pages in Home Assistant or open links in a new tab.

#### Configuration UI

The Navigation Plugin includes a configuration UI that allows users to set:

- **Title**: The text to display on the button
- **Icon**: The icon to display on the button (using the Material Design Icons)
- **Navigation Path**: The path to navigate to (e.g., `/lovelace/0` or `https://www.home-assistant.io`)
- **Open In**: Choose whether to open the link in the current tab or a new tab

To use the configuration UI, simply select "Navigate to Page" as the action type when adding a new action in the card editor.

#### Usage

```typescript
import { 
  NAVIGATION_ACTION, 
  NavigationActionConfig, 
  registerNavigationPlugin, 
  createNavigationAction 
} from '../components/action-bar/plugins';

// Register the navigation plugin
registerNavigationPlugin();

// Create a navigation action
const myNavigationAction = createNavigationAction(
  'Go to Dashboard',
  'mdi:view-dashboard',
  '/lovelace/0'
);

// Create a navigation action that opens in a new tab
const externalNavigationAction = createNavigationAction(
  'Open Documentation',
  'mdi:help-circle',
  'https://www.home-assistant.io/docs/',
  '_blank'
);

// Add the actions to the action bar
const actionBarController = document.querySelector('ha-action-bar')?.controller;
if (actionBarController) {
  const actionBarConfig = actionBarController.actionBarConfig || { actions: [] };

  actionBarConfig.actions.push(myNavigationAction);
  actionBarConfig.actions.push(externalNavigationAction);

  actionBarController.updateConfig({ actionBar: actionBarConfig });
}
```

#### API

- `NAVIGATION_ACTION`: The action type for navigation actions
- `NavigationActionConfig`: Interface for navigation action configuration
  - `type`: The action type (NAVIGATION_ACTION)
  - `title`: The title to display on the button
  - `icon`: The icon to display on the button
  - `path`: The path to navigate to
  - `target`: Optional target for the navigation ('_blank' or '_self')
- `registerNavigationPlugin()`: Register the navigation plugin with the ActionRegistry
- `createNavigationAction(title, icon, path, target)`: Create a navigation action configuration

### Service Call Plugin

The Service Call Plugin provides an enhanced way to call Home Assistant services with optional confirmation dialogs.

#### Configuration UI

The Service Call Plugin includes a configuration UI that allows users to set:

- **Title**: The text to display on the button
- **Icon**: The icon to display on the button (using the Material Design Icons)
- **Service**: The Home Assistant service to call (in the format `domain.service`, e.g., `light.turn_on`)
- **Service Data**: JSON data to pass to the service (e.g., `{"entity_id": "light.living_room", "brightness": 255}`)
- **Require Confirmation**: Toggle to enable a confirmation dialog before calling the service
- **Confirmation Message**: Custom message to display in the confirmation dialog (only shown when confirmation is enabled)

To use the configuration UI, simply select "Call Service" as the action type when adding a new action in the card editor.

#### Usage

```typescript
import { 
  SERVICE_CALL_ACTION, 
  ServiceCallActionConfig, 
  registerServiceCallPlugin, 
  createServiceCallAction 
} from '../components/action-bar/plugins';

// Register the service call plugin
registerServiceCallPlugin();

// Create a simple service call action
const lightOnAction = createServiceCallAction(
  'Turn On Lights',
  'mdi:lightbulb',
  'light.turn_on',
  { entity_id: 'light.living_room', brightness: 255 }
);

// Create a service call action with confirmation
const restartAction = createServiceCallAction(
  'Restart Server',
  'mdi:restart',
  'script.restart_server',
  {},
  true,
  'Are you sure you want to restart the server?'
);

// Add the actions to the action bar
const actionBarController = document.querySelector('ha-action-bar')?.controller;
if (actionBarController) {
  const actionBarConfig = actionBarController.actionBarConfig || { actions: [] };

  actionBarConfig.actions.push(lightOnAction);
  actionBarConfig.actions.push(restartAction);

  actionBarController.updateConfig({ actionBar: actionBarConfig });
}
```

#### API

- `SERVICE_CALL_ACTION`: The action type for service call actions
- `ServiceCallActionConfig`: Interface for service call action configuration
  - `type`: The action type (SERVICE_CALL_ACTION)
  - `title`: The title to display on the button
  - `icon`: The icon to display on the button
  - `service`: The service to call (format: domain.service)
  - `service_data`: Optional data to pass to the service
  - `confirmation`: Optional flag to show a confirmation dialog
  - `confirmation_text`: Optional custom confirmation message
- `registerServiceCallPlugin()`: Register the service call plugin with the ActionRegistry
- `createServiceCallAction(title, icon, service, service_data, confirmation, confirmation_text)`: Create a service call action configuration

## Example: Adding a Weather Forecast Action

Here's an example of how to add a weather forecast action to the action bar:

```typescript
import { ActionBarController, ActionHandler } from '../components/action-bar/action-bar-controller';
import { ModuleActionConfig } from '../components/action-bar/types';

// Define your action type
const WEATHER_FORECAST_ACTION = 'weather-forecast';

// Create a handler function
const weatherForecastHandler: ActionHandler = (action, hass) => {
  // Cast to ModuleActionConfig to access custom properties
  const weatherAction = action as ModuleActionConfig;

  // Get the entity ID from the action configuration
  const entityId = weatherAction.entityId;

  // Show the weather forecast
  if (entityId && hass.states[entityId]) {
    // Your logic to show the weather forecast
    console.log('Showing weather forecast for:', entityId);
  }
};

// Register the handler with the ActionBarController
const actionBarController = document.querySelector('ha-action-bar')?.controller;
if (actionBarController) {
  actionBarController.registerActionHandler(WEATHER_FORECAST_ACTION, weatherForecastHandler);

  // Add a button to the action bar
  const actionBarConfig = actionBarController.actionBarConfig || { actions: [] };

  actionBarConfig.actions.push({
    type: WEATHER_FORECAST_ACTION,
    title: 'Weather',
    icon: 'mdi:weather-partly-cloudy',
    entityId: 'weather.home'
  });

  actionBarController.updateConfig({ actionBar: actionBarConfig });
}
```

## API Reference

### ActionRegistry

The `ActionRegistry` class is a singleton that manages action handlers.

#### Methods

- `getInstance()`: Get the singleton instance of the registry
- `registerHandler(actionType: ExtendedActionType, handler: ActionHandler)`: Register a handler for an action type
- `getHandler(actionType: ExtendedActionType)`: Get the handler for an action type

### ActionBarController

The `ActionBarController` class manages the action bar component.

#### Methods

- `registerActionHandler(actionType: ExtendedActionType, handler: ActionHandler)`: Register a handler for an action type
- `getActionHandler(actionType: ExtendedActionType)`: Get the handler for an action type
- `updateConfig(config: ActionBarControllerConfig)`: Update the action bar configuration

### Types

- `ActionType`: An enum of built-in action types (Navigate, CallService, Custom)
- `ACTION_TYPE`: A constant object with string values matching the ActionType enum
  - `ACTION_TYPE.NAVIGATE`: String constant for navigation actions
  - `ACTION_TYPE.CALL_SERVICE`: String constant for service call actions
  - `ACTION_TYPE.CUSTOM`: String constant for custom actions
- `ExtendedActionType`: A type that allows extending the `ActionType` enum with string literals
- `ActionHandler`: A function that handles an action
- `ModuleActionConfig`: A configuration for a module-provided action

### Using Action Types in Plugins

When creating a plugin, you have two options for defining action types:

1. **Use built-in action types**: If your plugin extends or enhances a built-in action type, use the corresponding constant from `ACTION_TYPE`:

```typescript
import { ACTION_TYPE } from '../components/action-bar/types';

// Use the built-in navigation action type
export const MY_NAVIGATION_ACTION = ACTION_TYPE.NAVIGATE;
```

2. **Define a custom action type**: If your plugin provides a completely new action type, define a string constant:

```typescript
// Define a custom action type
export const MY_CUSTOM_ACTION = 'my-custom-action';
```

Always use string constants rather than enum values in plugins to ensure compatibility with the plugin system.

export * from './types';
export * from './action-bar-controller';
export * from './action-bar-component';
export * from './plugins';
export * from './plugin-registry';

// Import and register built-in plugins
import { registerNavigationPlugin, registerHaActionPlugin, registerServiceCallPlugin, registerLightTogglePlugin, registerSwitchTogglePlugin, registerWeatherUpdatePlugin, registerTransportationPlugin, registerBackgroundNextPlugin, registerMoreInfoPlugin } from './plugins';

// Register built-in plugins
registerNavigationPlugin();
registerHaActionPlugin();
registerServiceCallPlugin();
registerLightTogglePlugin();
registerSwitchTogglePlugin();
registerWeatherUpdatePlugin();
registerTransportationPlugin();
registerBackgroundNextPlugin();
registerMoreInfoPlugin();

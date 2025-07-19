export * from './types';
export * from './action-bar-controller';
export * from './action-bar-component';
export * from './plugins';
export * from './plugin-registry';

// Import and register built-in plugins
import { registerNavigationPlugin, registerServiceCallPlugin, registerLightTogglePlugin } from './plugins';

// Register built-in plugins
registerNavigationPlugin();
registerServiceCallPlugin();
registerLightTogglePlugin();

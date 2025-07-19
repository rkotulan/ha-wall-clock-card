export * from './types';
export * from './weather-update-plugin';
export * from './weather-update-editor-plugin';

// Register the plugin
import { registerWeatherUpdatePlugin } from './weather-update-plugin';
registerWeatherUpdatePlugin();
import { WeatherProvider } from './weather-provider';
import { WeatherProviderRegistry } from './weather-provider-registry';
import { openWeatherMapProvider } from './openweathermap-provider';
import { homeAssistantWeatherProvider } from './ha-weather-provider';

// Get the registry instance
const registry = WeatherProviderRegistry.getInstance();

// Register the built-in weather providers
registry.register(openWeatherMapProvider);
registry.register(homeAssistantWeatherProvider);

// Export everything for external use
export * from './weather-provider';
export * from './weather-provider-registry';
export * from './openweathermap-provider';
export * from './ha-weather-provider';

// Export a function to register custom weather providers
export function registerWeatherProvider(provider: WeatherProvider): void {
  registry.register(provider);
}

// Export a function to get all registered weather providers
export function getAllWeatherProviders(): WeatherProvider[] {
  return registry.getAllProviders();
}

// Export a function to get a weather provider by ID
export function getWeatherProvider(id: string): WeatherProvider | undefined {
  return registry.getProvider(id);
}
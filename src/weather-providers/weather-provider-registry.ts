import { WeatherProvider } from './weather-provider';

/**
 * Registry for weather provider plugins
 * Manages the registration and retrieval of weather provider plugins
 */
export class WeatherProviderRegistry {
  private static instance: WeatherProviderRegistry;
  private providers: Map<string, WeatherProvider> = new Map();

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): WeatherProviderRegistry {
    if (!WeatherProviderRegistry.instance) {
      WeatherProviderRegistry.instance = new WeatherProviderRegistry();
    }
    return WeatherProviderRegistry.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Register a weather provider plugin
   * @param provider The weather provider plugin to register
   */
  public register(provider: WeatherProvider): void {
    if (this.providers.has(provider.id)) {
      console.warn(`Weather provider with ID ${provider.id} is already registered. Overwriting.`);
    }
    this.providers.set(provider.id, provider);
  }

  /**
   * Get a weather provider plugin by ID
   * @param id The ID of the weather provider plugin
   * @returns The weather provider plugin, or undefined if not found
   */
  public getProvider(id: string): WeatherProvider | undefined {
    return this.providers.get(id);
  }

  /**
   * Get all registered weather provider plugins
   * @returns Array of all registered weather provider plugins
   */
  public getAllProviders(): WeatherProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Check if a weather provider plugin is registered
   * @param id The ID of the weather provider plugin
   * @returns True if the plugin is registered, false otherwise
   */
  public hasProvider(id: string): boolean {
    return this.providers.has(id);
  }
}
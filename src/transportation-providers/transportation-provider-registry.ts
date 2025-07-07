import { TransportationProvider } from './transportation-provider';

/**
 * Registry for transportation provider plugins
 * Manages the registration and retrieval of transportation provider plugins
 */
export class TransportationProviderRegistry {
  private static instance: TransportationProviderRegistry;
  private providers: Map<string, TransportationProvider> = new Map();

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): TransportationProviderRegistry {
    if (!TransportationProviderRegistry.instance) {
      TransportationProviderRegistry.instance = new TransportationProviderRegistry();
    }
    return TransportationProviderRegistry.instance;
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Register a transportation provider plugin
   * @param provider The transportation provider plugin to register
   */
  public register(provider: TransportationProvider): void {
    if (this.providers.has(provider.id)) {
      console.warn(`Transportation provider with ID ${provider.id} is already registered. Overwriting.`);
    }
    this.providers.set(provider.id, provider);
  }

  /**
   * Get a transportation provider plugin by ID
   * @param id The ID of the transportation provider plugin
   * @returns The transportation provider plugin, or undefined if not found
   */
  public getProvider(id: string): TransportationProvider | undefined {
    return this.providers.get(id);
  }

  /**
   * Get all registered transportation provider plugins
   * @returns Array of all registered transportation provider plugins
   */
  public getAllProviders(): TransportationProvider[] {
    return Array.from(this.providers.values());
  }

  /**
   * Check if a transportation provider plugin is registered
   * @param id The ID of the transportation provider plugin
   * @returns True if the plugin is registered, false otherwise
   */
  public hasProvider(id: string): boolean {
    return this.providers.has(id);
  }
}
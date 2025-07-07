import { TransportationProvider } from './transportation-provider';
import { TransportationProviderRegistry } from './transportation-provider-registry';
import { idsjmkProvider } from './idsjmk-provider';

// Get the registry instance
const registry = TransportationProviderRegistry.getInstance();

// Register the built-in transportation providers
registry.register(idsjmkProvider);

// Export everything for external use
export * from './transportation-provider';
export * from './transportation-provider-registry';
export * from './idsjmk-provider';

// Export a function to register custom transportation providers
export function registerTransportationProvider(provider: TransportationProvider): void {
  registry.register(provider);
}

// Export a function to get all registered transportation providers
export function getAllTransportationProviders(): TransportationProvider[] {
  return registry.getAllProviders();
}

// Export a function to get a transportation provider by ID
export function getTransportationProvider(id: string): TransportationProvider | undefined {
  return registry.getProvider(id);
}
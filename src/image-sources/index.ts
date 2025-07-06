import { ImageSource } from './image-source';
import { ImageSourceRegistry } from './image-source-registry';
import { picsumSource } from './picsum-source';
import { localSource } from './local-source';
import { unsplashSource } from './unsplash-source';

// Get the registry instance
const registry = ImageSourceRegistry.getInstance();

// Register the built-in image sources
registry.register(picsumSource);
registry.register(localSource);
registry.register(unsplashSource);

// Export everything for external use
export * from './image-source';
export * from './image-source-registry';
export * from './picsum-source';
export * from './local-source';
export * from './unsplash-source';

// Export a function to register custom image sources
export function registerImageSource(source: ImageSource): void {
  registry.register(source);
}

// Export a function to get all registered image sources
export function getAllImageSources(): ImageSource[] {
  return registry.getAllSources();
}

// Export a function to get an image source by ID
export function getImageSource(id: string): ImageSource | undefined {
  return registry.getSource(id);
}

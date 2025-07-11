import { ImageSource } from './image-source';
import { ImageSourceRegistry } from './image-source-registry';
import { picsumSource, localSource, unsplashSource, sensorSource } from './image-source-factory';

// Get the registry instance
const registry = ImageSourceRegistry.getInstance();

// Register all built-in image sources at once
registry.registerAll([picsumSource, localSource, unsplashSource, sensorSource]);

// Export everything for external use
export * from './image-source';
export * from './abstract-image-source';
export * from './image-source-registry';
export * from './picsum-source';
export * from './local-source';
export * from './unsplash-source';
export * from './sensor-source';
export * from './image-source-factory';

// Export registry helper functions
export function registerImageSource(source: ImageSource): void {
  registry.register(source);
}

export function getAllImageSources(): ImageSource[] {
  return registry.getAllSources();
}

export function getImageSourceById(id: string): ImageSource | undefined {
  return registry.getSource(id);
}

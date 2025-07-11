import { ImageSource, ImageSourceConfig, Weather, TimeOfDay } from './image-source';
import { localSource } from './local-source';
import { picsumSource } from './picsum-source';
import { unsplashSource } from './unsplash-source';
import { sensorSource } from './sensor-source';

/**
 * Null image source implementation that returns no images
 */
class NullImageSource implements ImageSource {
  readonly id = 'null';
  readonly name = 'Null Source';
  readonly description = 'A placeholder source that returns no images';

  async fetchImages(_config: ImageSourceConfig, _weather: Weather, _timeOfDay: TimeOfDay): Promise<string[]> {
    console.log('[null-source] Returning empty image list');
    return [];
  }

  async GetNextImageUrl(_config: ImageSourceConfig, _weather: Weather, _timeOfDay: TimeOfDay): Promise<string> {
    console.log('[null-source] Returning empty image URL');
    return '';
  }

  getDefaultConfig(): ImageSourceConfig {
    return {};
  }
}

// Create a singleton instance of the null image source
const nullSource = new NullImageSource();

// Map of source types to their instances
const sourceMap: Record<string, ImageSource> = {
  'local': localSource,
  'picsum': picsumSource,
  'unsplash': unsplashSource,
  'sensor': sensorSource
};

/**
 * Factory function to get the appropriate image source
 * @param sourceType The type of image source to create
 * @returns An instance of the specified image source
 */
export function getImageSource(sourceType: string): ImageSource {
  return sourceMap[sourceType] || nullSource;
}

// Export singleton instances
export { picsumSource, localSource, unsplashSource, sensorSource, nullSource };

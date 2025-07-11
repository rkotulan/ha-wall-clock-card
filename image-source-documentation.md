# Image Source System Documentation

## Overview

The Wall Clock Card uses a flexible image source system to fetch and display background images. This system allows for different sources of images (local files, online services, etc.) while providing a consistent interface for the card to interact with.

The image source system consists of several key components:

1. **ImageSource Interface**: Defines the contract that all image sources must implement
2. **AbstractImageSource Class**: Provides common functionality for all image sources
3. **Concrete Image Sources**: Implementations for specific image providers (Picsum, Unsplash, Local, Sensor)
4. **Image Source Factory**: Creates instances of image sources based on configuration
5. **Image Source Registry**: Manages registration and retrieval of image sources

## ImageSource Interface

The `ImageSource` interface defines the contract that all image sources must implement:

```typescript
export interface ImageSource {
  /**
   * The unique identifier for this image source
   */
  readonly id: string;

  /**
   * The display name of this image source
   */
  readonly name: string;

  /**
   * Description of this image source
   */
  readonly description: string;

  /**
   * Fetch images from this source
   * @param config Configuration for this image source
   * @param weather Optional weather data to use for selecting images
   * @param timeOfDay Optional time of day to use for selecting images
   * @returns Promise that resolves to an array of image URLs
   */
  fetchImages(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]>;

  /**
   * Get the next image URL from this source
   * @param config Configuration for this image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an image URL
   */
  GetNextImageUrl(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string>;

  /**
   * Get the default configuration for this image source
   * @returns Default configuration
   */
  getDefaultConfig(): ImageSourceConfig;
}
```

The interface also uses the following types:

```typescript
/**
 * Time of day enumeration
 */
export enum TimeOfDay {
  Unspecified = "unspecified",
  SunriseSunset = "sunrise-sunset",
  Day = "day",
  Night = "night"
}

/**
 * Weather condition enumeration
 */
export enum Weather {
  All = "all",
  ClearSky = "clear sky",
  Clouds = "clouds",
  Rain = "rain",
  Snow = "snow",
  Mist = "mist"
}

/**
 * Interface for image source plugins
 * All image source plugins must implement this interface
 */
export interface ImageSourceConfig {
  // Common configuration properties for all image sources
  category?: string;
  [key: string]: any; // Allow additional source-specific properties
}
```

## AbstractImageSource Class

The `AbstractImageSource` class provides a base implementation of the `ImageSource` interface with common functionality:

```typescript
export abstract class AbstractImageSource implements ImageSource {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;

  // Cache for GetNextImageUrl
  protected imageUrlCache: Map<string, string[]> = new Map();
  protected lastWeather: Weather | null = null;
  protected lastTimeOfDay: TimeOfDay | null = null;
  protected currentIndex: number = 0;

  // Helper method to shuffle an array (Fisher-Yates algorithm)
  protected shuffleArray(array: any[]): void {
    // Implementation...
  }

  // Abstract method that concrete classes must implement
  protected abstract fetchImagesInternal(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]>;

  // Common implementation of fetchImages
  async fetchImages(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
    // Implementation...
  }

  // Common implementation of GetNextImageUrl
  async GetNextImageUrl(config: ImageSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    // Implementation...
  }

  abstract getDefaultConfig(): ImageSourceConfig;
}
```

Key features of the `AbstractImageSource` class:

- Implements caching of image URLs based on weather and time of day
- Provides image shuffling functionality
- Handles the logic for cycling through images
- Requires concrete classes to implement only the specific parts needed for their source

## Built-in Image Sources

The system includes several built-in image sources:

### 1. PicsumSource

Fetches random high-quality images from [Picsum Photos](https://picsum.photos/).

```typescript
export interface PicsumSourceConfig extends ImageSourceConfig {
  // No additional configuration needed for Picsum
}
```

### 2. UnsplashSource

Fetches images from [Unsplash](https://unsplash.com/), either using their API or direct URLs.

```typescript
export interface UnsplashSourceConfig extends ImageSourceConfig {
  // Category for Unsplash images (e.g., 'nature,water')
  category?: string;
  // API key for Unsplash API (required for API mode)
  apiKey?: string;
  // Content filter for Unsplash API (low, medium, high)
  contentFilter?: 'low' | 'high';
}
```

### 3. LocalSource

Uses images specified in the configuration.

```typescript
export interface LocalSourceConfig extends ImageSourceConfig {
  // Array of background images with weather and time-of-day information
  backgroundImages?: BackgroundImage[];
  // Simple list of image URLs (used when no backgroundImages are provided)
  images?: string[];
}

export interface BackgroundImage {
  // URL of the image
  url: string;
  // Weather condition, or Weather.All for all weather conditions
  weather: Weather;
  // Time of day, or "unspecified" for all times of day
  timeOfDay: TimeOfDay;
}
```

### 4. SensorSource

Uses images from a Home Assistant sensor with a "files" attribute.

```typescript
export interface SensorSourceConfig extends ImageSourceConfig {
  // Entity ID of the sensor that provides the image list
  entity?: string;
  // Array of background images with weather and time-of-day information
  backgroundImages?: BackgroundImage[];
}
```

## Creating Custom Image Sources

To create a custom image source, follow these steps:

1. Extend the `AbstractImageSource` class
2. Implement the required abstract properties and methods
3. Register your image source with the registry

Example:

```typescript
import { AbstractImageSource, ImageSourceConfig, TimeOfDay, Weather, registerImageSource } from './image-sources';

// Define your custom configuration interface
export interface MyCustomSourceConfig extends ImageSourceConfig {
  apiKey?: string;
  customSetting?: string;
}

// Create your custom image source class
export class MyCustomSource extends AbstractImageSource {
  readonly id = 'my-custom-source';
  readonly name = 'My Custom Source';
  readonly description = 'A custom image source for my specific needs';

  // Implement the fetchImagesInternal method
  protected async fetchImagesInternal(config: MyCustomSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
    // Your implementation to fetch images based on config, weather, and timeOfDay
    const images: string[] = [];
    
    // Example: Add logic to fetch images from your custom source
    // This could be an API call, local file system, etc.
    
    return images;
  }

  // Implement the getDefaultConfig method
  getDefaultConfig(): MyCustomSourceConfig {
    return {
      apiKey: '',
      customSetting: 'default'
    };
  }
}

// Create a singleton instance
export const myCustomSource = new MyCustomSource();

// Register your custom source
registerImageSource(myCustomSource);
```

## Using the Image Source Factory

The image source factory provides a way to create instances of image sources based on their ID:

```typescript
import { getImageSource } from './image-sources';

// Get an image source by ID
const imageSource = getImageSource('picsum');

// Use the image source
const config = imageSource.getDefaultConfig();
const images = await imageSource.fetchImages(config, Weather.ClearSky, TimeOfDay.Day);
```

## Image Source Registry

The image source registry manages the registration and retrieval of image sources:

```typescript
import { ImageSourceRegistry, ImageSource } from './image-sources';

// Get the registry instance
const registry = ImageSourceRegistry.getInstance();

// Register a custom image source
registry.register(myCustomSource);

// Get all registered image sources
const allSources = registry.getAllSources();

// Check if a source is registered
const hasSource = registry.hasSource('picsum');

// Get a specific source
const picsumSource = registry.getSource('picsum');
```

## Configuration in Wall Clock Card

To use an image source in the Wall Clock Card configuration:

```yaml
type: custom:wall-clock-card
imageSource: 'picsum'  # ID of the image source to use
imageConfig:
  # Configuration specific to the selected image source
  category: 'nature'
```

Available image sources:

- `picsum`: Random high-quality images from Picsum Photos
- `unsplash`: Beautiful, free photos from Unsplash collections
- `local`: Images from local paths or URLs specified in the configuration
- `sensor`: Images from a Home Assistant sensor with a "files" attribute
- Any custom image sources that have been registered

## Weather and Time of Day Integration

Image sources can provide different images based on the current weather and time of day. The system supports:

- Weather conditions: clear sky, clouds, rain, snow, mist
- Time of day: day, night, sunrise-sunset

This allows for dynamic backgrounds that change with the weather and time of day, creating a more immersive experience.
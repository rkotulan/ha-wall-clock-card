# Image Source System Documentation

## Overview

The Wall Clock Card uses a flexible image source system to fetch and display background images. This system allows for different sources of images (local files, online services, etc.) while providing a consistent interface for the card to interact with.

The image source system consists of several key components:

1. **ImageSource Interface**: Defines the contract that all image sources must implement
2. **AbstractImageSource Class**: Provides common functionality for all image sources
3. **Concrete Image Sources**: Implementations for specific image providers (Picsum, Unsplash, Local, Sensor, Null)
4. **Image Source Factory**: Creates instances of image sources based on configuration
5. **Image Source Registry**: Manages registration and retrieval of image sources
6. **Background Image Manager**: Simplifies the process of working with image sources

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
 * Valid weather conditions
 */
export const ValidWeather = [
  Weather.All,
  Weather.ClearSky,
  Weather.Clouds,
  Weather.Rain,
  Weather.Snow,
  Weather.Mist
];

/**
 * Valid time of day values
 */
export const ValidTimeOfDay = [
  TimeOfDay.Unspecified,
  TimeOfDay.SunriseSunset,
  TimeOfDay.Day,
  TimeOfDay.Night
];

/**
 * Interface for image source plugins
 * All image source plugins must implement this interface
 */
export interface ImageSourceConfig {
  // Common configuration properties for all image sources

  // Category for images (e.g., 'nature,water')
  category?: string;

  // Number of images to fetch (used by sources that support multiple images)
  count?: number;

  // Array of background images with weather and time-of-day information
  backgroundImages?: BackgroundImage[];

  // ID of the image source to use
  imageSourceId?: string;

  // Allow additional source-specific properties
  [key: string]: any;
}

/**
 * Background image interface
 */
export interface BackgroundImage {
  // URL of the image
  url: string;
  // Weather condition, or Weather.All for all weather conditions
  weather: Weather;
  // Time of day, or "unspecified" for all times of day
  timeOfDay: TimeOfDay;
}
```

## Helper Functions

The image source system includes several helper functions:

```typescript
/**
 * Get the current time of day based on the current hour
 * @returns The current time of day
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
    return TimeOfDay.SunriseSunset;
  } else if (hour >= 9 && hour < 17) {
    return TimeOfDay.Day;
  } else if (hour >= 21 || hour < 5) {
    return TimeOfDay.Night;
  }

  return TimeOfDay.Unspecified;
}

/**
 * Find an attribute in a path
 * @param path The path to search in
 * @param validValues Array of valid values to look for
 * @returns The found attribute, or undefined if not found
 */
export function FindAttributeInPath(path: string, validValues: string[]): string | undefined {
  // Implementation...
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

  /**
   * Filter background images by weather condition and time of day
   * @param images Array of background images
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Filtered array of image URLs
   */
  protected filterImagesByWeatherAndTime(
    images: BackgroundImage[], 
    weather: Weather, 
    timeOfDay: TimeOfDay
  ): string[] {
    // Implementation...
  }

  /**
   * Convert an array of image URLs to an array of BackgroundImage objects
   * @param images Array of image URLs
   * @returns Array of BackgroundImage objects
   */
  protected convertUrlsToBackgroundImages(images: string[]): BackgroundImage[] {
    // Implementation...
  }

  abstract getDefaultConfig(): ImageSourceConfig;
}
```

Key features of the `AbstractImageSource` class:

- Implements caching of image URLs based on weather and time of day
- Provides image shuffling functionality
- Handles the logic for cycling through images
- Provides methods for filtering images by weather and time of day
- Provides methods for converting URLs to BackgroundImage objects
- Requires concrete classes to implement only the specific parts needed for their source

## Built-in Image Sources

The system includes several built-in image sources:

### 1. PicsumSource

Fetches random high-quality images from [Picsum Photos](https://picsum.photos/).

```typescript
export interface PicsumSourceConfig extends ImageSourceConfig {
  // No additional configuration needed for Picsum
  // Note: All properties are inherited from ImageSourceConfig
}
```

### 2. UnsplashSource

Fetches images from [Unsplash](https://unsplash.com/) using their official API.

```typescript
export interface UnsplashSourceConfig extends ImageSourceConfig {
  // API key for Unsplash API (required)
  apiKey: string;

  // Content filter for Unsplash API (low, high)
  // Controls the level of potentially sensitive content in the images
  contentFilter?: 'low' | 'high';

  // Note: category and count are inherited from ImageSourceConfig
}
```

The UnsplashSource includes:
- Official Unsplash API integration
- Enhanced queries with weather and time of day information
- Content filtering options

Available categories include: nature, water, architecture, city, landscape, animals, food, travel, people, technology, abstract, space, interior, flowers, dark, light, minimal, colorful, and various colors.

### 3. LocalSource

Uses images specified in the configuration.

```typescript
export interface LocalSourceConfig extends ImageSourceConfig {
  // Note: backgroundImages is inherited from ImageSourceConfig
}
```

The LocalSource uses the `backgroundImages` property from the configuration to provide images. Each image can be associated with specific weather conditions and times of day.

### 4. SensorSource

Uses images from a Home Assistant sensor with a "files" attribute.

```typescript
export interface SensorSourceConfig extends ImageSourceConfig {
  // Entity ID of the sensor that provides the image list
  entity?: string;

  // Note: backgroundImages is inherited from ImageSourceConfig
}
```

The SensorSource includes:
- Caching mechanism with a refresh interval of 10 minutes
- Entity tracking to monitor changes to the sensor
- Automatic conversion of image URLs to BackgroundImage objects
- Weather and time of day filtering

### 5. NullSource

A placeholder source that returns no images. Used as a fallback when an invalid source type is specified.

```typescript
class NullImageSource implements ImageSource {
  readonly id = 'null';
  readonly name = 'Null Source';
  readonly description = 'A placeholder source that returns no images';

  // Implementation...
}
```

## Background Image Manager

The `BackgroundImageManager` class simplifies the process of working with image sources:

```typescript
export class BackgroundImageManager {
  private imageSource: ImageSource | null = null;
  private sourceConfig: ImageSourceConfig = {};
  private imageSourceId: string = 'picsum';

  /**
   * Initialize the BackgroundImageManager with the given image source ID and configuration
   * @param config The configuration for the image source
   * @returns True if initialization was successful, false otherwise
   */
  public initialize(config: ImageSourceConfig = {}): boolean {
    // Implementation...
  }

  /**
   * Get the next image URL from the image source
   * @param weather Current weather condition
   * @param timeOfDay Current time of day
   * @returns Promise that resolves to an image URL, or empty string if no image is available
   */
  public async getNextImageUrl(weather: Weather, timeOfDay: TimeOfDay): Promise<string> {
    // Implementation...
  }

  /**
   * Get the current image source ID
   * @returns The current image source ID
   */
  public getImageSourceId(): string {
    // Implementation...
  }
}
```

The BackgroundImageManager:
- Initializes an image source with a given configuration
- Provides a method to get the next image URL from the source
- Handles error cases and provides fallbacks
- Defaults to the Picsum image source if none is specified

## Image Source Factory

The image source factory provides a way to create instances of image sources based on their ID:

```typescript
/**
 * Factory function to get the appropriate image source
 * @param sourceType The type of image source to create
 * @returns An instance of the specified image source
 */
export function getImageSource(sourceType: string): ImageSource {
  return sourceMap[sourceType] || nullSource;
}
```

## Image Source Registry

The image source registry manages the registration and retrieval of image sources:

```typescript
export class ImageSourceRegistry {
  private static instance: ImageSourceRegistry;
  private sources: Map<string, ImageSource> = new Map();

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): ImageSourceRegistry {
    // Implementation...
  }

  /**
   * Register an image source plugin
   * @param source The image source plugin to register
   */
  public register(source: ImageSource): void {
    // Implementation...
  }

  /**
   * Register multiple image sources at once
   * @param sources Array of image sources to register
   */
  public registerAll(sources: ImageSource[]): void {
    // Implementation...
  }

  /**
   * Get an image source plugin by ID
   * @param id The ID of the image source plugin
   * @returns The image source plugin, or undefined if not found
   */
  public getSource(id: string): ImageSource | undefined {
    // Implementation...
  }

  /**
   * Get all registered image source plugins
   * @returns Array of all registered image source plugins
   */
  public getAllSources(): ImageSource[] {
    // Implementation...
  }

  /**
   * Check if an image source plugin is registered
   * @param id The ID of the image source plugin
   * @returns True if the plugin is registered, false otherwise
   */
  public hasSource(id: string): boolean {
    // Implementation...
  }
}
```

The registry also provides helper functions for easier usage:

```typescript
/**
 * Register an image source with the registry
 * @param source The image source to register
 */
export function registerImageSource(source: ImageSource): void {
  // Implementation...
}

/**
 * Get all registered image sources
 * @returns Array of all registered image sources
 */
export function getAllImageSources(): ImageSource[] {
  // Implementation...
}

/**
 * Get an image source by ID
 * @param id The ID of the image source
 * @returns The image source, or undefined if not found
 */
export function getImageSourceById(id: string): ImageSource | undefined {
  // Implementation...
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

## Configuration in Wall Clock Card

To use an image source in the Wall Clock Card configuration:

```yaml
type: custom:wall-clock-card
imageSource: 'picsum'  # ID of the image source to use
imageConfig:
  # Configuration specific to the selected image source
  category: 'nature'
  count: 10
```

Available image sources:

- `picsum`: Random high-quality images from Picsum Photos
- `unsplash`: Beautiful, free photos from Unsplash collections
- `local`: Images from local paths or URLs specified in the configuration
- `sensor`: Images from a Home Assistant sensor with a "files" attribute
- `null`: A placeholder source that returns no images (used as fallback)
- Any custom image sources that have been registered

## Weather and Time of Day Integration

Image sources can provide different images based on the current weather and time of day. The system supports:

- Weather conditions: clear sky, clouds, rain, snow, mist
- Time of day: day, night, sunrise-sunset

This allows for dynamic backgrounds that change with the weather and time of day, creating a more immersive experience.

The `getCurrentTimeOfDay()` function automatically determines the current time of day based on the hour:
- Sunrise/Sunset: 5-9 AM or 5-9 PM
- Day: 9 AM - 5 PM
- Night: 9 PM - 5 AM

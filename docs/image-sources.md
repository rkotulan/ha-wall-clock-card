# Image Sources

The Wall Clock Card can fetch background images from online sources, which means you don't need to manually download and store images on your Home Assistant server. The card uses a plugin system for image sources, allowing you to use built-in sources or create your own.

## Built-in Image Sources

1. **None** (`imageSource: 'none'`):
   - Disables background images completely
   - Use this option if you don't want any background images
   - Configuration:
     ```yaml
     imageSource: 'none'
     ```

2. **Local Images** (`imageSource: 'local'`): 
   - Uses images from local paths or URLs specified in the configuration
   - Images are automatically shuffled at startup for a random starting order
   - In the UI editor, you can add, remove, and edit individual background images
   - **Background image configuration**:

     **Background Images**:
        - Configure images with weather conditions and time of day
        - Use `backgroundImages` property with objects containing `url`, `weather`, and `timeOfDay`
        - Special `weather: 'all'` value matches any weather condition
        - Special `timeOfDay: 'unspecified'` value matches any time of day
        - Images are selected based on current weather and time of day
        - More specific matches are prioritized over general ones
        - **Supported weather conditions**:
          - `clear sky`
          - `clouds` (includes `few clouds`, `scattered clouds`, and `broken clouds`)
          - `rain` (includes `shower rain` and `thunderstorm`)
          - `snow`
          - `mist`
          - `all` (matches any weather condition)
        - **Supported times of day**:
          - `sunrise-sunset`
          - `day`
          - `night`
          - `unspecified` (matches any time of day)



   - Configuration:
     ```yaml
     # Background images with weather and time-of-day support
     imageSource: 'local'
     backgroundImages:
       - url: '/local/images/sunrise-clear.jpg'
         weather: 'clear sky'
         timeOfDay: 'sunrise-sunset'
       - url: '/local/images/day-clear.jpg'
         weather: 'clear sky'
         timeOfDay: 'day'
       - url: '/local/images/night-clear.jpg'
         weather: 'clear sky'
         timeOfDay: 'night'
       - url: '/local/images/rainy-day.jpg'
         weather: 'rain'
         timeOfDay: 'unspecified'
       - url: '/local/images/snowy-night.jpg'
         weather: 'snow'
         timeOfDay: 'night'
       - url: '/local/images/default.jpg'
         weather: 'all'
         timeOfDay: 'unspecified'
     ```


3. **Picsum Photos** (`imageSource: 'picsum'`): 
   - A simple service that provides random high-quality images
   - No API key required
   - Fast and reliable
   - Uses Picsum's seed-based URL format to avoid CORS issues
   - Images are fetched directly from https://picsum.photos/
   - Configuration:
     ```yaml
     imageSource: 'picsum'
     imageConfig: {}  # No additional configuration needed
     ```

4. **Unsplash** (`imageSource: 'unsplash'`):
   - Beautiful, free photos from Unsplash collections
   - Supports weather and time-of-day based image selection
   - Requires an API key for optimal functionality
   - Configuration:
     ```yaml
     imageSource: 'unsplash'
     imageConfig:
       category: 'nature'  # Optional category (e.g., 'nature,water')
       apiKey: 'your-unsplash-api-key'  # Required for Unsplash API
     ```

   - **Getting an Unsplash API Key**:
     1. You will need an Access Key from Unsplash for this plugin to work properly
     2. Head over to [Unsplash registration page](https://unsplash.com/join) and fill out the form
     3. After you have registered and confirmed your email, head over to your [apps page](https://unsplash.com/oauth/applications) and click "New Application"
     4. Read and accept all the terms
     5. Give your new app a name (e.g., "wall-clock-card"), a description (e.g., "Custom card using Unsplash images as backgrounds in Home Assistant"), and click "Create application"
     6. On the next page, you will see your "Access Key". Add this to your configuration or secrets.yaml
     7. If you don't have a secrets.yaml, you should! Read about it here: [Home Assistant Secrets](https://www.home-assistant.io/docs/configuration/secrets/)

5. **Sensor Images** (`imageSource: 'sensor'`):
   - Uses images from a Home Assistant sensor with a "files" attribute
   - Images are automatically cached and refreshed every 10 minutes
   - Supports weather and time-of-day recognition from image URLs
   - Automatically filters images based on current weather conditions and time of day
   - Perfect for integration with command-line sensors or other image collection sensors
   - Configuration:
     ```yaml
     imageSource: 'sensor'
     imageConfig:
       entity: 'sensor.background_image_list'  # Entity ID of the sensor with files attribute
     ```

   - **Example Sensor Configuration**:
     ```yaml
     # Example configuration.yaml entry for a command-line sensor
     command_line:
        - sensor:
           name: Background image list for Wall Clock Panel
           command: >-
             printf '{"files":[';
             find /config/www/images/wcp-bg-1920 -type f -iname "*.jpg" \
               | sed 's/.*/"&"/g' \
               | paste -sd, - \
               | sed 's#/config/www/#/local/#g';
             printf ']}'
           value_template: "OK"
           json_attributes: files
           scan_interval: 600  # Refresh every 10 minutes
     ```

   - **Image URL Recognition**:
     - The sensor source automatically extracts weather conditions and time of day from image URLs
     - Include weather conditions in the image path (e.g., `/images/clear-sky/image.jpg`)
     - Include time of day in the image path (e.g., `/images/day/image.jpg`)
     - Supported weather conditions: `clear sky`, `clouds`, `rain`, `snow`, `mist`, etc.
     - Supported times of day: `sunrise-sunset`, `day`, `night`

   - **Weather Condition Mapping**:
     - The sensor source automatically maps legacy weather conditions to new OpenWeatherMap-based conditions
     - `clear` → `clear sky`
     - `few clouds`, `scattered clouds`, `broken clouds` → `clouds`
     - `fog`, `haze`, `dust`, `smoke` → `mist`
     - `drizzle`, `shower rain`, `thunderstorm`, `light rain` → `rain`
     - `tornado`, `windy` → `all` (matches any weather condition)



## Custom Image Sources

You can create your own image source plugins to fetch images from other sources. To create a custom image source:

1. Create a new TypeScript file in the `src/image-sources` directory
2. Extend the `AbstractImageSource` class
3. Implement the required abstract properties and methods
4. Register your image source with the registry

Example:

```typescript
// src/image-sources/my-custom-source.ts
import { AbstractImageSource, ImageSourceConfig, TimeOfDay, Weather, registerImageSource } from './image-sources';

// Define your custom configuration interface
export interface MyCustomSourceConfig extends ImageSourceConfig {
  apiKey?: string;
  // Add any other configuration options you need
}

// Extend the AbstractImageSource class
export class MyCustomSource extends AbstractImageSource {
  readonly id = 'my-custom';
  readonly name = 'My Custom Source';
  readonly description = 'Custom image source for my specific needs';

  // Implement the fetchImagesInternal method
  protected async fetchImagesInternal(config: MyCustomSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
    // Implement your logic to fetch images based on config, weather, and timeOfDay
    // Return an array of image URLs
    console.log(`[my-custom] Fetching images for weather: ${weather}, time of day: ${timeOfDay}`);
    return ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
  }

  // Implement the getDefaultConfig method
  getDefaultConfig(): MyCustomSourceConfig {
    return {
      apiKey: ''
    };
  }
}

// Create and register an instance of your custom source
const myCustomSource = new MyCustomSource();
registerImageSource(myCustomSource);
```

For more detailed information about the image source system, see the [Image Source Documentation](developer/image-source-documentation.md).
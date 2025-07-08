# Wall Clock Card for Home Assistant

A simple, elegant card for Home Assistant's Lovelace UI that displays a clock with seconds and the current date. The card also features weather information display and customizable backgrounds with support for various image sources including local images, Picsum Photos, and Unsplash.

![Wall Clock Card](images/showcase-01.png)

## Our Story

This project started with a simple need: a beautiful, functional clock for our refrigerator-mounted tablet running Home Assistant. We wanted an at-a-glance display of time, date, and weather that would be visible from anywhere in the kitchen.

Junie from JetBrains took on the programming challenge, creating a clean, elegant solution using TypeScript and modern web components. What began as a simple clock quickly evolved to include weather forecasts, sensor displays and beautiful background images.

Today, our Wall Clock Card serves as the central information hub on our kitchen tablet, providing all the essential information we need throughout the day in a visually pleasing package.

## Features

- **Beautiful clock display**:
  - Large, centered clock with hours, minutes, and seconds
  - Date display with weekday, month, day, and optional year
  - Automatically updates every second
  - Uses Home Assistant's theme colors
  - Configurable date and time formats
  - Configurable font color (default: white)

- **Sensor integration**:
  - Display multiple sensors in the top left corner
  - Customizable labels for each sensor
  - Automatic updates when sensor values change

- **Weather forecast**:
  - Display current weather and forecast in the top right corner
  - Current temperature and conditions with icon
  - Multi-day forecast with temperature ranges (1-7 days)
  - Configurable display mode (current, forecast, or both)
  - Customizable weather section title
  - Weather data automatically updates at configurable intervals (default: 30 minutes)
  - Supports OpenWeatherMap API (free tier)
  - Localization for weather conditions in multiple languages (Czech, German, Slovak, Polish, Spanish, French)
  - Simplified weather categories for better readability

- **Background images**:
  - Multiple image sources with automatic rotation
  - Adjustable black overlay for better text readability
  - Configurable rotation interval
  - Weather and time-of-day based image selection
  - Lazy loading for improved performance
  - Automatic preloading for smooth transitions

- **Image sources**:
  - **Local images**:
    - Support for your own image collection
    - Weather and time-of-day based image selection
    - Directory-based image loading with automatic categorization
    - Filename pattern matching for easy organization

  - **Picsum Photos**:
    - Random high-quality images
    - No API key required
    - Fast and reliable

  - **Unsplash**:
    - Beautiful, free photos from Unsplash collections
    - Weather and time-of-day based image selection
    - Temperature-based image queries (cold/hot modifiers)
    - Fresh images on each rotation

- **Configuration**:
  - Full visual editor in Home Assistant UI
  - Comprehensive YAML configuration options
  - Individual background image management
  - Language selection for weather conditions

## Installation

### Manual Installation

1. Create a `www/wall-clock-card` folder in your Home Assistant configuration directory
2. Download the `wall-clock-card.js` file from the `dist` folder of this repository
3. Place the file in the `www/wall-clock-card` folder
4. Add the following to your `configuration.yaml`:

```yaml
lovelace:
  resources:
    - url: /local/wall-clock-card/wall-clock-card.js
      type: module
```

5. Restart Home Assistant

### HACS Installation

1. Add this repository to HACS as a custom repository
   - Go to HACS in your Home Assistant instance
   - Click on the three dots in the top right corner
   - Select "Custom repositories"
   - Add the URL of this repository
   - Select "Lovelace" as the category
2. Install the "Wall Clock Card" from HACS
3. HACS will automatically add the required resource to your Lovelace configuration
4. Restart Home Assistant if needed

## Usage

After installation, you can add the card to your Lovelace dashboard:

1. Edit your dashboard
2. Click the "+" button to add a new card
3. Search for "Wall Clock" or scroll down to find it
4. Configure the card as needed
5. Click "Save" to add it to your dashboard

Alternatively, you can add it manually to your Lovelace configuration:

```yaml
type: 'custom:wall-clock-card'
# Additional configuration options...
```

## Configuration

You can customize the Wall Clock Card through the Lovelace UI or by editing your Lovelace configuration manually:

### UI Configuration

The card now includes a full visual editor for easy configuration:

1. Add the card to your dashboard
2. Click the three dots in the top-right corner of the card
3. Click "Edit"
4. Use the visual editor to configure all options:
   - Time format (12/24 hour, display of seconds)
   - Date format (weekday, month, day, year display options)
   - Background images (local or online sources)
   - Individual background image management with add/remove functionality
   - Background opacity and rotation interval
   - Font color
   - Sensors to display
5. Click "Save" to apply your changes

### YAML Configuration

Add the card to your Lovelace configuration:

```yaml
type: 'custom:wall-clock-card'
# Optional: Custom time format
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
  second: '2-digit'
  hour12: false  # Set to true for 12-hour format with AM/PM
# Optional: Custom date format
dateFormat:
  weekday: 'long'  # 'long', 'short', or 'narrow'
  year: 'numeric'  # 'numeric' or '2-digit', omit this line to hide the year
  month: 'long'    # 'numeric', '2-digit', 'long', 'short', or 'narrow'
  day: 'numeric'   # 'numeric' or '2-digit'

# Example: Date format without year (shows only weekday, month, and day)
# dateFormat:
#   weekday: 'long'
#   month: 'long'
#   day: 'numeric'
# Optional: Background images configuration

# Unified background images with weather and time-of-day support
backgroundImages:
  - url: '/local/images/sunrise-clear.jpg'
    weather: 'clear sky'
    timeOfDay: 'sunrise-sunset'
  - url: '/local/images/default.jpg'
    weather: 'all'
    timeOfDay: 'unspecified'
# Optional: Background overlay opacity (0-1, default: 0.5)
backgroundOpacity: 0.5
# Optional: Image source ('none', 'picsum', 'local', default: 'none')
imageSource: 'picsum'
# Optional: Configuration for the image source
imageConfig:
  # Additional source-specific configuration options

# Optional: Background image rotation interval in seconds (default: 90)
backgroundRotationInterval: 90
# Optional: Multiple sensors to display in the top left corner
sensors:
  - entity: 'sensor.living_room_temperature'
    label: 'Temperature'
  - entity: 'sensor.living_room_humidity'
    label: 'Humidity'
  - entity: 'sensor.weather_forecast_condition'
    label: 'Weather'
# Optional: Font color for all text elements (default: white)
fontColor: '#FFFFFF'

# Legacy sensor configuration (still supported for backward compatibility)
# sensorEntity: 'sensor.living_room_temperature'
# sensorLabel: 'Temperature'
```

The background images will rotate automatically. The rotation interval can be configured (default is 30 seconds).

### Sensor Configuration

You can display multiple sensors in the top left corner of the card. Each sensor can have its own label. The sensors are displayed in a vertical list, with the first sensor at the top.

To configure multiple sensors, use the `sensors` array in your configuration:

```yaml
sensors:
  - entity: 'sensor.living_room_temperature'
    label: 'Temperature'
  - entity: 'sensor.living_room_humidity'
    label: 'Humidity'
```

Each sensor configuration requires an `entity` property (the entity ID of the sensor) and can optionally include a `label` property (the text to display above the sensor value).

For backward compatibility, you can still use the legacy `sensorEntity` and `sensorLabel` properties to display a single sensor.

### Image Sources

The Wall Clock Card can fetch background images from online sources, which means you don't need to manually download and store images on your Home Assistant server. The card uses a plugin system for image sources, allowing you to use built-in sources or create your own.

#### Built-in Image Sources

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



#### Custom Image Sources

You can create your own image source plugins to fetch images from other sources. To create a custom image source:

1. Create a new TypeScript file in the `src/image-sources` directory
2. Implement the `ImageSource` interface
3. Register your image source with the registry
4. Import your image source in the main component

Example:

```typescript
// src/image-sources/my-custom-source.ts
import { ImageSource, ImageSourceConfig, registerImageSource } from './image-sources';

// Define your custom configuration interface
export interface MyCustomSourceConfig extends ImageSourceConfig {
  apiKey?: string;
  // Add any other configuration options you need
}

// Implement the ImageSource interface
export class MyCustomSource implements ImageSource {
  readonly id = 'my-custom';
  readonly name = 'My Custom Source';
  readonly description = 'Custom image source for my specific needs';

  async fetchImages(config: MyCustomSourceConfig): Promise<string[]> {
    // Implement your logic to fetch images
    // Return an array of image URLs
    return ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
  }

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

### Weather Configuration

You can configure the weather forecast display in the top right corner of the card:

```yaml
type: 'custom:wall-clock-card'
# Weather settings
showWeather: true  # Set to true to enable weather display
weatherTitle: 'Weather'  # Custom title for the weather section
weatherProvider: 'openweathermap'  # Currently supports 'openweathermap'
weatherConfig:
  apiKey: 'your-openweathermap-api-key'  # Required for OpenWeatherMap
  latitude: 50.0755  # Default is Prague, Czech Republic
  longitude: 14.4378
  units: 'metric'  # 'metric' or 'imperial'
  language: 'cs'  # Language code (cs for Czech, en for English, etc.)
weatherDisplayMode: 'both'  # 'current', 'forecast', or 'both'
weatherForecastDays: 3  # Number of days to show in forecast (1-7)
weatherUpdateInterval: 30  # Update interval in minutes (minimum: 1, default: 30)
```

#### Weather Provider

Currently, the card supports the OpenWeatherMap API for weather data. You'll need to:

1. Create an account at [OpenWeatherMap](https://openweathermap.org/)
2. Get an API key from your account dashboard
   - The free tier API key is sufficient
   - Make sure your API key is activated (can take a few hours after registration)
3. Configure the card with your API key

The weather data is automatically updated at configurable intervals (default: 30 minutes) to avoid excessive API calls. You can adjust this with the `weatherUpdateInterval` option (in minutes, minimum: 1).

> **Note**: This card uses the OpenWeatherMap One Call API 2.5, which is included in the free tier. No special subscription is required.

### Background Image Handling

The Wall Clock Card uses lazy loading for background images to improve performance and reduce memory usage:

1. **Lazy Loading**: Images are only loaded when they are needed for display, not all at once
2. **Preloading**: The next image in the rotation is preloaded shortly before it's needed to ensure smooth transitions
3. **Error Handling**: If an image fails to load, the component will automatically try the next image
4. **Memory Efficient**: Only the URLs of all images are stored initially, with actual image data loaded on demand

When `imageSource` is set to an online source like 'picsum', the component will fetch the specified number of image URLs from the selected source when it loads. If you also have local images configured in `backgroundImages`, both sets of images will be used in the rotation. If you don't want any background images, you can set `imageSource: 'none'`.

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the component
4. The built component will be in the `dist` folder

### Development Commands

- `npm run build` - Build the component
- `npm run watch` - Watch for changes and rebuild automatically
- `npm run type-check` - Run TypeScript type checking without building

### TypeScript

This project is written in TypeScript for improved type safety and developer experience. The source code is in the `src` directory with `.ts` extension. The TypeScript configuration is in `tsconfig.json`.

## License

MIT

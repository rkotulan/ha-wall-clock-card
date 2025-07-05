# Wall Clock Card for Home Assistant

A simple, elegant card for Home Assistant's Lovelace UI that displays a clock with seconds and the current date.

![Wall Clock Card](https://via.placeholder.com/800x400.png?text=Wall+Clock+Card)

## Features

- Beautiful clock card for your Lovelace dashboard
- Large, centered clock with hours, minutes, and seconds
- Date display with weekday, month, day, and optional year
- Automatically updates every second
- Uses Home Assistant's theme colors
- Configurable date and time formats
- Configurable font color (default: white)
- Display multiple sensors in the top left corner
- Background image collection with rotation
- Adjustable black overlay for background images
- **Online image sources** - automatically fetch beautiful background images from:
  - [Picsum Photos](https://picsum.photos/) - random high-quality images

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

1. Add the card to your dashboard
2. Click the three dots in the top-right corner of the card
3. Click "Edit"
4. Configure the options as needed
5. Click "Save"

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
# Optional: Background images (list of URLs)
backgroundImages:
  - '/local/images/background1.jpg'
  - '/local/images/background2.jpg'
  - '/local/images/background3.jpg'
# Optional: Background overlay opacity (0-1, default: 0.5)
backgroundOpacity: 0.5
# Optional: Use online images instead of or in addition to local images
useOnlineImages: true
# Optional: Online image source ('picsum', default: 'picsum')
onlineImageSource: 'picsum'
# Optional: Configuration for the image source
onlineImageConfig:
  count: 10  # Number of images to fetch
  # Additional source-specific configuration options

# Optional: Background image rotation interval in seconds (default: 30)
backgroundRotationInterval: 30
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

### Online Image Sources

The Wall Clock Card can fetch background images from online sources, which means you don't need to manually download and store images on your Home Assistant server. The card uses a plugin system for image sources, allowing you to use built-in sources or create your own.

#### Built-in Image Sources

1. **Local Images** (`onlineImageSource: 'local'`): 
   - Uses images from local paths or URLs specified in the configuration
   - No additional configuration needed, automatically uses the images from the `backgroundImages` property
   - This is the default source for the `backgroundImages` property
   - Configuration:
     ```yaml
     # The backgroundImages property is automatically used by the local image source
     backgroundImages:
       - '/local/images/background1.jpg'
       - '/local/images/background2.jpg'
       - '/local/images/background3.jpg'
     ```

2. **Picsum Photos** (`onlineImageSource: 'picsum'`): 
   - A simple service that provides random high-quality images
   - No API key required
   - Fast and reliable
   - Uses Picsum's seed-based URL format to avoid CORS issues
   - Images are fetched directly from https://picsum.photos/
   - Configuration:
     ```yaml
     onlineImageSource: 'picsum'
     onlineImageConfig:
       count: 5  # Number of images to fetch
     ```



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
      count: 5,
      apiKey: ''
    };
  }
}

// Create and register an instance of your custom source
const myCustomSource = new MyCustomSource();
registerImageSource(myCustomSource);
```

### Background Image Handling

The Wall Clock Card uses lazy loading for background images to improve performance and reduce memory usage:

1. **Lazy Loading**: Images are only loaded when they are needed for display, not all at once
2. **Preloading**: The next image in the rotation is preloaded shortly before it's needed to ensure smooth transitions
3. **Error Handling**: If an image fails to load, the component will automatically try the next image
4. **Memory Efficient**: Only the URLs of all images are stored initially, with actual image data loaded on demand

When `useOnlineImages` is enabled, the component will fetch the specified number of image URLs from the selected source when it loads. If you also have local images configured in `backgroundImages`, both sets of images will be used in the rotation.

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

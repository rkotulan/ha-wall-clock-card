# Wall Clock Card for Home Assistant

A simple, elegant card for Home Assistant's Lovelace UI that displays a clock with seconds and the current date. The card also features weather information display and customizable backgrounds with support for various image sources including local images, Picsum Photos, and Unsplash.

## Quick Start

1. **Install via HACS** – Search for "Wall Clock Card" in HACS → Download → Restart Home Assistant if prompted.
2. **Manual install** – Copy `dist/wall-clock-card.js` to `config/www/wall-clock-card/` and add it as a Lovelace resource (`/local/wall-clock-card/wall-clock-card.js`).
3. **Add to dashboard** – Edit a dashboard → Add card → Choose **Wall Clock Card** (or use YAML `type: custom:wall-clock-card`).
4. **Customize** – Configure sensors, backgrounds, and weather in the UI editor or via YAML.

![Wall Clock Card](images/showcase-01.png)

## Our Story

We built this card to keep time, date, and weather in view on a kitchen tablet without compromising aesthetics. The project has since grown into a polished Home Assistant companion that we still rely on every day.

## Features

- **Beautiful clock display**:
  - Large, centered clock with hours, minutes, and seconds
  - Date display with weekday, month, day, and optional year
  - Automatically updates every second
  - Uses Home Assistant's theme colors
  - Configurable date and time formats
  - Configurable time zone (defaults to Home Assistant's time zone)
  - Configurable font color (default: white)

- **Sensor integration**:
  - Display multiple sensors in the top left corner
  - Customizable labels for each sensor
  - Automatic updates when sensor values change

- **Action bar**:
  - Customizable buttons at the bottom of the card
  - Navigate to different pages in Home Assistant
  - Call services to control entities
  - Custom actions for future extensibility
  - Configurable button icons and titles

- **Weather forecast**:
  - Display current weather and forecast in the top right corner
  - Current temperature and conditions with icon
  - Multi-day forecast with temperature ranges (1-7 days)
  - Configurable display mode (current, forecast, or both)
  - Customizable weather section title
  - Weather data automatically updates at configurable intervals (default: 30 minutes)
  - Supports OpenWeatherMap API (free tier)
  - Localization for weather conditions in multiple languages (English, Czech, German, Slovak, Polish, Spanish, French, Russian)
  - Simplified weather categories for better readability

- **Background images**:
  - Multiple image sources with automatic rotation
  - Adjustable black overlay for better text readability
  - Configurable rotation interval
  - Weather and time-of-day based image selection
  - Lazy loading for improved performance
  - Automatic preloading for smooth transitions

- **Image sources**:
  - **Extensible image source system**:
    - Abstract base class for easy creation of custom image sources
    - Factory pattern for image source instantiation
    - Registry for managing image sources
    - Comprehensive documentation in [image-source-documentation.md](docs/developer/image-source-documentation.md)
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

  - **Sensor Images**:
    - Uses images from a Home Assistant sensor with a "files" attribute
    - Images are automatically cached and refreshed every 10 minutes
    - Supports weather and time-of-day recognition from image URLs
    - Automatically filters images based on current weather conditions and time of day
    - Supports Home Assistant media-source URLs (media-source://) and resolves them automatically via HA

### Example: Command line sensor using media-source (NAS photos)

Add this sensor to your Home Assistant configuration.yaml to expose a list of image files as media-source URLs. The card can then use the sensor as image source 'sensor'.
**MEDIA** is the name of your NAS media folder.

```yaml
command_line:
  - sensor:
      name: Photos from NAS
      command: >-
        printf '{"files":[';
        find /media/MEDIA/wcp-bg-1920/ -type f \( -iname "*.jpg" -o -iname "*.png" \) \
          | sort \
          | sed 's/.*/"&"/g' \
          | paste -sd, - \
          | sed 's#/media/#media-source://media_source/local/#g';
        printf ']}'
      value_template: "OK"
      json_attributes: files
      scan_interval: 600 # každých 10 minut
```

Then point the card to this sensor:

```yaml
type: custom:wall-clock-card
imageSource: sensor
imageConfig:
  entity: sensor.photos_from_nas
```

- **Configuration**:
  - Full visual editor in Home Assistant UI
  - Comprehensive YAML configuration options
  - Individual background image management
  - Language selection for weather conditions

## Installation

Choose the method that fits your setup. HACS keeps the card up to date automatically and is the recommended path for most users.

### HACS Installation

[![HASC](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=rkotulan&repository=ha-wall-clock-card&category=plugin)

1. Open HACS in your Home Assistant instance
2. Search for "Wall Clock Card"
3. Click on the "Wall Clock Card" in the search results
4. Click "Download" in the bottom right corner
5. HACS will automatically add the required resource to your Lovelace configuration
6. Restart Home Assistant if needed

### Manual Installation

1. Create a `www/wall-clock-card` folder in your Home Assistant configuration directory.
2. Download the `wall-clock-card.js` file from the `dist` folder of this repository.
3. Place the file in the `www/wall-clock-card` folder.
4. Add the following resource entry to your `configuration.yaml` (or manage it through the Lovelace resources UI):

```yaml
lovelace:
  resources:
    - url: /local/wall-clock-card/wall-clock-card.js
      type: module
```

5. Restart Home Assistant.

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

## Documentation

For detailed documentation, please see the following pages:

- [Configuration](docs/configuration.md) - How to configure the card through UI or YAML
- [Sensors](docs/sensors.md) - How to configure sensors display
- [Image Sources](docs/image-sources.md) - Available image sources and how to configure them
- [Weather](docs/weather.md) - Weather configuration options
- [Action Bar](docs/action-bar.md) - How to configure the action bar
- [Background Handling](docs/background-handling.md) - How background images are handled
- [Bundle Analyzer](docs/bundle-analyzer.md) - How to analyze and optimize bundle size
- [Development](docs/developer/development.md) - Information for developers

## Project Structure

- **src/**: Source code
  - **core/**: Core components and logic
    - **wall-clock-card.ts**: Main component
    - **types.ts**: Shared types and interfaces
    - **config.ts**: Configuration and default values
  - **components/**: UI components
    - **action-bar/**: Action bar components
    - **background/**: Background image components
    - **bottom-bar/**: Bottom bar components
    - **clock/**: Clock components
    - **sensors/**: Sensor components
    - **ui-elements/**: Shared UI elements
  - **providers/**: Data providers
    - **image/**: Image source providers
    - **weather/**: Weather data providers
    - **transportation/**: Transportation data providers
  - **services/**: Services and APIs
    - **ha-api/**: Home Assistant API communication
    - **localization/**: Translations and localization
    - **messaging/**: Internal component communication
  - **utils/**: Utility functions and helpers
    - **date-time/**: Date and time utilities
    - **dom/**: DOM manipulation utilities
    - **logger/**: Logging utilities
  - **editors/**: Configuration editors
    - **components/**: Editor components
    - **validators/**: Configuration validators
- **dist/**: Compiled output
- **tests/**: Test files
- **docs/**: Documentation

## Development Workflow

### Setup
1. Clone the repository
2. Install dependencies: `npm install`

### Development
1. Start development server: `npm run watch`
2. Make changes to the source code
3. Test your changes in Home Assistant

### Building
1. Build the project: `npm run build`
2. The output will be in the `dist/` directory

### Testing
1. Write tests in the `tests/` directory using Jest
2. Run tests: `npm test`
3. Tests should follow the pattern `*.test.ts`

## Best Practices

- Keep components small and focused on a single responsibility
- Use TypeScript interfaces for configuration objects
- Follow the component-based architecture
- Place core logic and types in the `core/` directory
- Use the appropriate provider directory for data sources
- Implement services in the `services/` directory
- Keep related functionality together in the directory structure
- Write unit tests for all new functionality
- Use strict type checking
- Define interfaces for all data structures
- Use type annotations for function parameters and return values
- Extend LitElement for new components
- Use decorators for properties
- Follow the existing component patterns
- Minimize DOM operations
- Use efficient data structures
- Avoid unnecessary re-renders
- Write clear commit messages
- Keep pull requests focused on a single feature or bug fix
- Update documentation when changing functionality

## License

MIT

## Tech Stack

- **TypeScript**: Main programming language
- **Lit**: Web components library for UI
- **Webpack**: Module bundler
- **Jest**: Testing framework
- **Home Assistant Custom Card API**: Integration with Home Assistant

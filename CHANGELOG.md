# Changelog

## 1.8.0

- Simplified weather categories to match OpenWeatherMap icon codes
- Updated to use 9 standard weather conditions: clear sky, few clouds, scattered clouds, broken clouds, shower rain, rain, thunderstorm, snow, mist
- Added backward compatibility for existing configurations using legacy weather conditions
- Updated documentation to reflect the new weather categories

## 1.7.0

- Removed legacy Method 2 (Weather-based images) using `weatherBasedImages` and `weatherImages`
- Further simplified configuration by focusing only on the unified background images structure
- Reduced code complexity and improved maintainability

## 1.6.0

- Removed legacy Method 3 (Simple Image List) using `locaBackgroundImages`
- Simplified configuration by focusing on the unified background images structure
- Improved backward compatibility by automatically converting legacy string arrays to the new structure

## 1.5.0

- Added unified background images structure that combines weather and time-of-day based selection
- Added support for time-of-day based image selection (morning, noon, afternoon, evening)
- Added "all" weather category that matches any weather condition
- Added UI controls for the new unified background images structure
- Maintained backward compatibility with legacy image configurations
- Improved image selection algorithm to prioritize the most specific matches

## 1.4.0

- Added weather-based local images feature
- Local image source can now display different images based on current weather conditions
- Added configuration options in the editor UI for weather-based images
- Added ability to define image sets for different weather conditions
- Images are automatically selected based on the current weather condition
- Falls back to default images if no matching weather condition is found

## 1.3.4

- Fixed build issues on GitHub actions

## 1.3.3

- Added customizable title for the weather section (default: "Weather")
- Moved the icon for current weather to the right of the temperature value
- Improved layout of the current weather display
- Added configuration option in the editor UI for the weather title

## 1.3.2

- Fixed weather data processing for OpenWeatherMap forecast endpoint
- Improved handling of forecast data to properly extract daily min/max temperatures
- Enhanced grouping of forecast items by day for more accurate daily forecasts
- Added better error handling for missing forecast data

## 1.3.1

- Fixed authentication issue with OpenWeatherMap API
- Updated to use OpenWeatherMap API 2.5 instead of 3.0 for better compatibility with free API keys
- Improved documentation for API key setup and requirements

## 1.3.0

- Added weather forecast display in the top-right corner
- Support for current weather conditions and multi-day forecast
- Integrated OpenWeatherMap API with accurate forecasts for Czech Republic
- Configurable display mode (current, forecast, or both)
- Configurable number of forecast days (1-7)
- Weather data automatically updates every 30 minutes
- Added configuration options in the editor UI
- Designed with a provider-based architecture for future extensibility

## 1.2.0

- Changed configuration: replaced `useOnlineImages: true` with `imageSource: 'none'`
- Renamed `backgroundImages` to `locaBackgroundImages` for clarity
- Updated editor UI to reflect these changes
- Added ability to disable background images completely with `imageSource: 'none'`
- Added UI for adding, removing, and editing individual background images
- Added automatic shuffling of local background images at startup for random order

## 1.1.0

- Added configuration editor for the card in Home Assistant
- Improved configuration experience with visual controls for all options
- Support for configuring time and date formats through the UI
- Support for configuring background images and appearance settings

## 1.0.1

- Added image to README to showcase the card

## 1.0.0 (Initial Release)

- Initial release of the Wall Clock Card
- Features:
  - Beautiful clock card for Lovelace dashboard
  - Large, centered clock with hours, minutes, and seconds
  - Date display with weekday, month, day, and optional year
  - Automatically updates every second
  - Configurable date and time formats
  - Configurable font color
  - Display multiple sensors in the top left corner
  - Background image collection with rotation
  - Adjustable black overlay for background images
  - Online image sources from Picsum Photos

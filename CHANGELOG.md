# Changelog

## 1.18.5

- Enhanced language support for forecast date display
  - Updated formatForecastDate method to support all languages (Czech, German, Slovak, Polish, Spanish, French, Russian)
  - Improved consistency of language handling across the application
  - Better internationalization for date formatting in weather forecast

## 1.18.4

- Added Russian language support for weather conditions
  - Added translations for all weather conditions in Russian
  - Updated language selection to include Russian option
  - Enhanced internationalization support

## 1.18.3

- Extended shuffling functionality to local image source
  - Added automatic shuffling of local images at startup for a random starting order
  - Previously, only sensor images were shuffled (added in 1.18.2)
  - Improved user experience with varied image presentation
  - Consistent behavior between local and sensor image sources

## 1.18.2

- Added shuffling functionality for sensor image source
  - Images from sensor source are now automatically shuffled at startup for a random starting order
  - Improved user experience with varied image presentation
  - Updated documentation to reflect the new functionality

## 1.18.1

- Added units selector (metric/imperial) in the UI configuration for weather forecast
- Fixed issue with Year Display setting not being preserved when set to "hidden"
- Fixed issue with time format not applying hour12: true setting correctly
- Fixed issue with imperial units not being applied in weather display
- Added better logging for weather units configuration

## 1.18.0

- Added sensor-based image source for background images
  - New image source that uses a Home Assistant sensor with a "files" attribute
  - Sensor entity can be selected in the UI configuration
  - Images refresh every 10 minutes
  - Added automatic extraction of weather conditions and time of day from file paths
  - Valid weather conditions in paths: clear sky, clouds, broken clouds, rain, snow, mist, all
  - Valid time of day values in paths: sunrise-sunset, day, night, unspecified

## 1.17.1

- Added auto-hide timeout for transportation departures in onDemand mode
  - New configuration option `transportation.autoHideTimeout` to set the timeout (1-10 minutes)
  - Departures will automatically hide after the specified time and show the bus button again
  - Added UI control in the editor that only appears when onDemand is enabled
- Renamed "Load on demand" to "Show on demand" in the UI for better clarity
- Updated documentation to reflect the new configuration option

## 1.17.0

- Added on-demand loading for transportation departures
  - New configuration option `transportation.onDemand` to enable on-demand loading
  - When enabled, a bus icon appears in the bottom left corner
  - Transportation data is only loaded when the icon is clicked
  - Saves API calls by not loading transportation data automatically
  - Added UI control in the editor for enabling on-demand loading
- Updated documentation with examples of the new configuration option
- Moved transportationOnDemand property to the transportation section for better organization

## 1.16.0

- Added configurable update intervals for weather and transportation data
  - Weather update interval can now be set in minutes (minimum: 1, default: 30)
  - Transportation update interval can now be set in minutes (minimum: 1, default: 1)
  - Added UI controls in the editor for both update intervals
- Enhanced transportation display with responsive layout
  - Individual stops are now displayed in columns on wider screens
  - Supports up to 4 stops side by side depending on screen width
  - 2 columns on screens wider than 600px
  - 3 columns on screens wider than 900px
  - 4 columns on screens wider than 1200px
- Added ability to customize stop names
  - Custom names can be set for each stop in the configuration
  - If not provided, the name from the API will be used
  - Added UI control in the editor for setting stop names
- Improved stop name display in transportation section
  - Stop names now appear on a separate line with a visual separator
  - Added a bottom border to clearly distinguish stop names from departures
  - Increased font weight for better readability
- Updated documentation to reflect the new configuration options
- Improved user interface for better readability on different screen sizes
- Remove ImageDirectory configuration option
- Improved selection background image by weather condition and time-of-day categorization

## 1.15.0

- Changed time-of-day values from "morning, noon, afternoon, evening" to "sunrise-sunset, day, night"
- Simplified time-of-day categorization for better usability
- Updated time-of-day logic in local and unsplash image sources
- Updated documentation to reflect the new time-of-day values
- No backward compatibility with old time-of-day values

## 1.14.1

- Enhanced editor UI appearance and usability
- Fixed TypeScript error: 'weatherCondition' is declared but its value is never read
- Enhanced image queries by including the current weather condition directly in the search query

## 1.14.0

- Enhanced Unsplash image source to better utilize weather data for image selection
- Improved `fetchImagesFromApi` function to accept weather data parameter
- Added temperature-based image queries (cold/hot modifiers based on temperature)
- Enhanced time-of-day specific image queries with more descriptive terms
- Improved image relevance by using more specific weather and time context

## 1.13.0

- Simplified weather conditions for better readability:
  - Combined "few clouds", "scattered clouds", and "broken clouds" into just "clouds"
  - Combined "thunderstorm" and "shower rain" into just "rain"
- Updated documentation to reflect the simplified weather conditions

## 1.12.0

- Added support for directory-based image loading in the Local image source
- Added two methods for automatic image categorization:
  1. Directory structure: `/root/category/timeOfDay/image.jpg`
  2. Filename pattern: `name-{category}-{timeOfDay}.jpg`
- Added new `imageDirectory` configuration option to specify the root directory for images
- Maintained backward compatibility with existing image configuration methods
- Updated documentation with examples of the new configuration options

## 1.11.1

- Fixed issue with weather condition translations not displaying correctly

## 1.11.0

- Added localization for weather conditions in multiple languages (Czech, German, Slovak, Polish, Spanish, French)
- Weather conditions are now displayed in the user's selected language
- Added translations for all standard weather conditions
- Improved forecast display with translated condition names
- Enhanced editor UI to show weather condition options in the selected language
- Added language selection dropdown to the configuration UI

## 1.10.1

- Fixed error "Failed to execute 'define' on 'CustomElementRegistry': the name 'wall-clock-card' has already been used with this registry"
- Resolved issue with duplicate custom element registration

## 1.10.0

- Improved Unsplash image source to always fetch new images on rotation instead of cycling through preloaded ones
- Enhanced user experience with fresh images for each rotation when using Unsplash
- Maintained fallback to preloaded images if fetching new images fails
- Optimized image loading for Unsplash to reduce unnecessary preloading

## 1.9.0

- Added Unsplash image source with weather and time-of-day based image selection
- Enhanced image queries to include current weather conditions and time of day
- Added support for both direct URL and API methods for Unsplash
- Added documentation for obtaining an Unsplash API key
- Improved image relevance by incorporating weather and time context
- Modified Unsplash image source to always use API when an API key is provided
- Removed "Use API" toggle from the UI editor for Unsplash

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

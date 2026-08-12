# Changelog

## 3.5.0

### Text sensor color rules

- Extended `=` and `!=` sensor color rules to match raw text states such as
  `good`, `moderate` and `unhealthy`, while preserving numeric comparisons.
- Updated the visual editor to accept text values for equality rules and
  documented the text-state YAML syntax and matching behavior.

### Transportation modal auto-hide

- Explicitly close the native transportation dialog when its auto-hide timer
  expires instead of relying on removal from the rendered DOM to leave the
  browser's modal top layer.

## 3.4.0

### Conditional sensor colors

- Added per-sensor default colors and ordered numeric `colorRules` supporting
  `<`, `<=`, `>`, `>=`, `=` and `!=` comparisons against the entity's raw
  state.
- Applied the resolved color consistently to the sensor icon, label and value,
  while non-numeric or unavailable states fall back to the configured default
  or inherited widget color.
- Added visual editor controls for creating, removing and reordering color
  rules, including Czech and English translations.
- Documented the YAML configuration and covered rule matching, ordering and
  fallback behavior with automated tests.

## 3.3.3

### Sensor layout fix

- Kept sensor widgets visible in center-column zones using column direction,
  including the bottom-center zone in both the 3×3 and horizontal split
  layouts.

## 3.3.2

### Home Assistant weather forecasts

- Detected daily, hourly and twice-daily forecast support from Home Assistant
  weather entities instead of always requesting a daily forecast.
- Added automatic and explicit forecast-type selection, hourly time labels,
  single-temperature hourly entries and a configurable forecast limit of up to
  24 hours.
- Reloaded weather data immediately when the provider entity or forecast
  options change and preserved a refresh requested during an active fetch.
- Added a switch for hiding the Weather/Forecast heading in every weather
  presentation.

### Layout and Designer fixes

- Collapsed empty runtime grid rows so populated zones no longer remain
  separated by unused vertical space; the Designer still exposes all nine
  placement zones.
- Kept Home Assistant's overlapping card controls outside the fullscreen
  Designer while preserving the normal card menu after leaving it.
- Prevented underlying dashboard cards and drag handlers from intercepting
  pointer and drag events inside the fullscreen Designer.

## 3.3.1

### Designer stability in dashboard edit mode

- Kept the promoted Designer open while editing cards in Sections, Masonry,
  Sidebar and other non-panel views by deferring persistence until its
  **Done** action.
- Made the card's own **Configure card** control interactive with current Home
  Assistant versions, whose card edit wrapper marks slotted card content as
  `inert`.
- Positioned the fullscreen Designer below the complete Home Assistant header,
  including the view tab bar, so its toolbar remains clickable.
- Isolated the fullscreen Designer above neighboring sections and card controls
  and restored every temporary Home Assistant wrapper style after closing it.

## 3.3.0

### Animated Wall Clock weather icons

- Added a built-in `wall-clock` SVG weather icon set with day and night
  variants for clear, partly cloudy, cloudy, rain, heavy rain, thunderstorm,
  snow, sleet, fog, hail, wind and exceptional conditions.
- Added subtle local animations for sunlight, clouds, precipitation, fog, wind
  and alerts without loading artwork from a third-party server.
- Added an editor switch and the `animateIcons` option for disabling motion;
  the icons also honor the device's reduced-motion preference automatically.
- Added provider-independent condition mapping, including stable
  OpenWeatherMap icon-code fallbacks for localized condition names.
- Preserved the animation setting when editing layout widgets and when
  migrating legacy card configuration.
- Documented the new icon set and covered its condition resolver, editor
  adapters and configuration migration with automated tests.

## 3.2.0

### Layout formats and visual presets

- Added `3x3`, vertical `2/3 + 1/3` / `1/3 + 2/3` and horizontal
  `2/3 + 1/3` / `1/3 + 2/3` layout formats while preserving the nine logical
  zones and their widget order.
- Added the optional glass treatment for the narrow panel and aligned it with
  the real grid tracks for custom padding and gap values.
- Updated runtime and Designer split layouts to use two real panels while
  retaining top/centre/bottom anchors, including bottom-pinned action widgets.
  Legacy logical zones that share an anchor are shown as one ordered physical
  area and consolidate safely on the first explicit edit.
- Centred widget stacks vertically inside horizontal split panels instead of
  shrink-wrapping them at the panel's top edge.
- Added full-panel row zones with per-widget relative width shares for ordered
  dashboard information strips.
- Balanced horizontal information strips automatically so weather and calendar
  receive more room than sensors and actions; explicit width shares still win.
- Added per-widget row width behavior (`auto`, fill available space, or fit to
  content); compact sensors, clocks and dates now remain content-sized by default.
- Added configurable separator widgets with orientation, color, opacity,
  thickness and length controls.

### Weather, sensors and actions

- Added horizontal weather presentation with current conditions followed by
  forecast columns.
- Prevented weather without an explicit row width ratio from collapsing to zero
  width inside a horizontal information strip.
- Added configurable sensor icons and horizontal separators.
- Made horizontal sensor columns symmetric and responsive without clipping long
  values, while preserving the configured item gap.
- Added an option to remove the translucent circular background from action
  buttons.
- Added configurable action-grid columns, including the 2×2 arrangement used by
  compact dashboard panels.
- Made row-hosted action bars default to a responsive two-column grid whose
  buttons shrink with narrow tablet panels instead of overflowing.

### Transportation and editor stability

- Added an optional modal departure dialog and grouped Home Assistant transport
  profiles.
- Reorganized every built-in widget editor around Content, Appearance and
  Behavior. Weather, calendar, transportation, action-bar, separator and embedded
  card controls now appear on the tab that matches their purpose.
- Grouped card-wide appearance, language and diagnostics, layout and spacing, and
  background source, appearance and rotation settings into clearer sections.
- Prevented a transport request closed during loading from reviving the dialog
  or leaving an orphaned refresh interval.
- Kept the user-selected or newly added transport item expanded across autosave
  recreation; expansion state is isolated to the current card edit session.
- Kept a newly added sensor expanded across autosave recreation while leaving
  all sensor sections collapsed when the editor is opened initially.
- Standardized expandable editor lists: they start collapsed, only the item
  selected by the user or just added opens, and that selection survives
  Home Assistant autosave recreation for actions, calendars and backgrounds too.
- Pre-filled an empty Home Assistant transport profile name with the same
  friendly-name fallback shown in its group header and used that resolved name
  in the departures view.
- Started newly added cards with the native zone-layout configuration so the
  obsolete 2.x form is no longer shown on a clean dashboard.
- Aligned boolean controls in the visual editor.
- Made overfilled areas in horizontal split layouts independently scrollable in
  the Designer instead of clipping their widget list.
- Updated `custom-card-helpers` to 2.0.0 and made the release workflow
  reproducible with Node 24, `npm ci`, type checking and the full test suite.

## 3.1.0

### Embedded Home Assistant cards

- Added a generic widget for embedding built-in and installed custom Lovelace cards
  in any wall-clock zone.
- Added searchable card selection and a dedicated Home Assistant-style visual editor
  dialog with explicit Cancel and Save actions.
- Preserved transient custom-editor state during Home Assistant updates, added an
  optional transparent surface and prevented recursive wall-clock embedding.

### Transportation

- Added a Home Assistant entity provider for on-demand departure sensors supplied by
  integrations such as Odjezdy MHD.
- Added multiple stop profiles with grouped refresh/departure entities and clearer
  direction labels.
- Improved searchable entity selection, add-stop controls and editor field width.

### Designer and calendar

- Added drag-and-drop ordering to transportation stops, sensors, calendars, actions
  and background-image sources.
- Kept newly added transit stops open for immediate editing.
- Centered calendar detail icons with their accompanying text.

## 3.0.2

### Designer input and saving

- Kept numeric fields empty while replacing their value instead of immediately
  restoring a component default; leaving a required field empty restores its last
  valid value.
- Deferred Designer persistence while a text or number field is actively edited so
  Home Assistant no longer recreates the card and steals focus during typing.
- Updated the save-status explanation to distinguish prepared changes from the
  final dashboard save performed by **Done**.

### Calendar

- Displayed explicit start and end dates for timed events spanning multiple days.
- Displayed inclusive date ranges for multi-day all-day events.
- Used a calendar-range icon for events that span multiple days while keeping the
  clock icon for same-day events.

## 3.0.1

### Designer and persistence

- Fixed text settings not being committed reliably by current Home Assistant text
  selectors.
- Fixed continuous Designer saves so they update only the exact edited Lovelace
  card and do not overwrite sibling cards when dashboard editing is completed.
- Preserved the selected widget or zone and its active settings tab while Home
  Assistant recreates the card after an automatic save.
- Made the complete zone cell clickable and keyboard accessible without interfering
  with widget controls or drag handles.

### Layout and sensors

- Added a per-zone vertical offset (`offsetY`) for moving a complete zone up or down.
- Added a sensor item gap (`itemGap`) that works with horizontal and vertical sensor
  layouts and defaults to `16px`.
- Added Czech and English labels and documentation for the new layout controls.

## 3.0.0

### Major changes

- Replaced the fixed 2.x layout with a responsive 3×3 zone/widget system.
- Added the full-screen Designer with touch drag and drop, widget/zone inspectors,
  card settings and continuous saving while the dashboard is in edit mode.
- Added automatic in-memory migration from supported 2.x configuration keys.
- Added the calendar widget with multiple calendars, agenda/today modes, event
  colors, event background controls, font sizes and a custom event-detail dialog.
- Made action bars reusable in multiple zones; transportation remains a singleton.
- Added automatic horizontal/vertical orientation and zone-aware alignment for
  sensors and action bars.
- Added card-wide and per-widget font-family support, plus documentation for Google
  Fonts and locally hosted fonts.

### Action bar

- Added standard Home Assistant actions (`tap_action`, `hold_action` and
  `double_tap_action`) through Home Assistant's native action handler.
- Added `buttonGap` and `padding` layout controls.
- Added/updated navigation, service call, more-info, light/switch toggle, weather
  refresh, transportation and next-background plugins.
- Fixed stale active overlays and transportation/action-bar transitions that could
  block later button clicks.

### Designer and widgets

- Added localized Czech and English Designer labels.
- Added collapsible list items, consistent remove icons and sticky inspector headers.
- Added clock/date alignment and explicit size controls without inherited line-height
  gaps.
- Added sensor precision, orientation and alignment controls.
- Added weather provider/display/icon settings and improved editor contrast.
- Fixed drag-and-drop initialization after opening/closing inspectors.
- Fixed transportation configuration persistence and on-demand display lifecycle.
- Improved compact/embedded card editing so the Designer no longer takes over the
  complete dashboard editor automatically.

### Upgrade notes

- Existing 2.x YAML remains accepted. Saving in the 3.0 Designer writes the new
  `appearance`, `background` and `layout.zones` structure.
- The obsolete single-sensor `sensorEntity` / `sensorLabel` form is not part of the
  3.0 schema; use a `sensors` array.
- Widget visibility conditions are reserved in the schema but are not evaluated in
  3.0.0.

## 2.5.0

### What's Changed
- Added option to select weather icon set.
- Set 65% opacity for the hyphen between temperatures in weather forecast.
- Added 8px offset between current weather icon and temperature.
- Added support for Home Assistant weather forecast provider.
- Added ability to open more-info dialog when clicking on weather (if using Home Assistant provider).
- Added `object-fit` configuration for background images (fill, contain, cover, none, scale-down).
- Fixed `SensorComponent` to respect the `display_precision` setting from Home Assistant for individual entities.
- Refactored `SensorController` for better maintainability and performance.
- Added Bulgarian translation.
- Updated Bulgarian localization for weather conditions.
- Added "Custom Date Format" field to the date format editor.

## 2.4.4

### What's Changed
- Ability to set top margin for the clock.
## 2.4.3

### What's Changed
- Added support for Home Assistant media-source URLs for background images. You can now provide image URLs starting with `media-source://...` (e.g., `media-source://media_source/local/...`). The card will resolve these via Home Assistant automatically.
- Documentation updated with an example command_line sensor that exposes a list of images using media-source paths.

## 2.4.1

### What's Changed
- Fixed the display of departure information.

## 2.4.0

### What's Changed
- Fixed action bar is not displayed after the page reloads.

## 2.3.0

### What's Changed
- Added translation for "heavy_intensity_rain" weather condition to all supported languages

## 2.2.0

### What's Changed
- Added size configuration options for better customization:
  - New Size enum with Large, Medium, and Custom options
  - Configurable sizes for clock, date, labels, values, and action bar icons
  - Removed media queries in favor of programmatic size control
  - Fixed temperature wrapping in forecast list for large size
  - Improved responsive design with consistent sizing across all components
- Improved project structure with better organization:
  - Created core directory for main components and logic
  - Reorganized providers under a common providers directory
  - Created services directory for API and services
  - Improved structure of components
  - Reorganized editors
- Enhanced code maintainability with clearer separation of concerns
- Better modularity for easier future development
- Improved organization of related functionality
- Consistent naming conventions across the project

## 2.1.0

### What's Changed
- Added more-info plugin to the action bar component:
  - Support for opening entity more-info dialogs directly from action buttons
  - Configurable entity selection for more-info actions
  - Seamless integration with Home Assistant's native entity information modals
  - Enhanced user experience with direct access to entity controls and history

## 2.0.0

### Breaking Changes
- **Major refactoring of the entire codebase**: Improved architecture, code organization, and maintainability
- **Enhanced logging system**: Completely redesigned logging system with better error reporting and debugging capabilities
- **Removed direct URL method for Unsplash**: The direct URL method for Unsplash has been removed. An API key is now required to use the Unsplash image source.

### What's Changed
- Added action bar component for displaying customizable buttons at the bottom of the card:
  - Support for navigation actions to different pages in Home Assistant
  - Support for service call actions to control entities
  - Support for custom actions for future extensibility
  - Configurable button icons and titles
  - Automatic adjustment of clock position when action bar is displayed
  - Action bar takes precedence over transportation display
- Refactored slider components to use centralized form value handling:
  - Updated background opacity slider to use _handleFormValueChanged method
  - Updated rotation interval slider to use _handleFormValueChanged method
  - Updated forecast days slider to use _handleFormValueChanged method
  - Updated max departures slider to use _handleFormValueChanged method
  - Improved code maintainability with consistent event handling patterns
- Added fade-in transition effect for the first displayed image
  - Improved visual experience with consistent transitions for all images
  - Eliminated abrupt appearance of the first image
- Refactored background image controller for better maintainability:
  - Added constants for magic numbers (transition delay and duration)
  - Extracted transition logic into separate methods to eliminate code duplication
  - Improved code organization with clearer separation of concerns
- Comprehensive refactoring of all major components:
  - Image sources system
  - Weather providers
  - Transportation providers
  - Logger utilities
- Improved error handling and reporting throughout the application
- Enhanced type safety with better TypeScript usage
- Optimized performance for background image loading and rotation
- Better code organization with clearer separation of concerns
- Updated dependencies to latest versions
- Improved documentation for developers
- Added background image transition effects for smoother visual experience
- Remove background image flickering during page reload
- Fixed issue where clock would sometimes stop updating
  - Moved timer setup from constructor to connectedCallback for better lifecycle management
  - Added check to prevent duplicate timers
  - Improved reliability of clock updates when component is re-rendered
- Simplified Unsplash image source implementation. Removed legacy code related to direct URL method.

## 1.21.0

### Breaking Changes
- **Refactored date and time formatting system**: The date and time formatting system has been completely overhauled to improve reliability and consistency across different languages and locales. This may require adjustments to your existing configuration.

### What's Changed
- Improved date and time formatting system
  - Fixed issue where seconds were displayed when set to 'hidden'
  - Improved handling of 'hidden' format in the date and time formatting system
  - Ensured consistent behavior across all date and time formats
- Added Jest testing framework for improved code quality and reliability
  - Implemented comprehensive tests for date and time formatting functions
  - Added test configuration with TypeScript support
  - Created test files for lokalify module
  - Added npm test script for easy test execution
  - Improved development workflow with automated testing

## 1.20.0

- Refactored image source system for better maintainability and extensibility
  - Created AbstractImageSource base class to reduce code duplication
  - Improved image source factory pattern implementation
  - Enhanced registry pattern for better image source management
  - Standardized interfaces across all image sources
  - Added comprehensive documentation for the image source system
  - Simplified creation of custom image sources

## 1.19.9

- Fixed alignment issue in weather forecast table
  - Added fixed width to day name elements to ensure consistent alignment
  - Improved layout when day names have different lengths (e.g., "Mon" vs "Fri")

## 1.19.8

- Enhanced language handling with integrated locale information
  - Added `locale` property to the `LanguageDefinition` interface
  - Updated `SUPPORTED_LANGUAGES` to include locale information for each language
  - Simplified `getLocaleForLanguage` function to use the locale property from `SUPPORTED_LANGUAGES`
  - Improved code maintainability with a single source of truth for language-related data
  - Reduced code complexity by eliminating the switch statement

## 1.19.7

- Consolidated date and time formatting functions
  - Added `getLocaleForLanguage` function to map language codes to locale codes
  - Added explicit 'en' case to language-to-locale mapping
  - Created new helper functions for date and time formatting
  - Improved consistency of date and time formatting across the application
  - Enhanced internationalization support

## 1.19.6

- Added English language support for weather conditions
  - Added translations for all weather conditions in English
  - Updated language selection to include English option
  - Enhanced internationalization support

## 1.19.5

- Added 60% transparency to the AM/PM indicator for improved visual appearance
  - Modified the CSS for the AM/PM text to have 50% opacity
  - Maintains readability while making the indicator less visually dominant

## 1.19.4

- Added time zone support for the clock
  - Fixed issue where clock was not honoring time zone settings
  - Added new `timeZone` configuration option
  - Automatically uses Home Assistant's time zone if available
  - Falls back to browser's local time zone if not specified
  - Supports all IANA time zone names (e.g., 'America/New_York', 'Europe/London')

## 1.19.3

- Improved 12-hour time format display
  - Fixed AM/PM indicator display when hour12=true is set
  - AM/PM indicator now appears under the seconds
  - Properly converts hours to 12-hour format (e.g., 16:00 → 04:00pm)
  - Added lowercase styling for am/pm text

## 1.19.2

- Added configurable content filter for Unsplash image source
  - New UI option to select content filter level (low, medium, high)
  - Controls the level of potentially sensitive content in the images
  - Default value is set to 'high' for the most restrictive filtering
  - Added to the Unsplash Configuration section in the editor

## 1.19.1

- Enhanced Unsplash image source with improved logging
  - Added detailed logging for API requests and parameters
  - Added logging for search categories and weather conditions
  - Added secure logging that hides API keys in log messages
  - Removed direct URL method for Unsplash (API key is now required)
  - Enhanced error reporting for API requests
  - Better debugging information for image search queries

## 1.19.0

- Refactored image providers for better performance and reliability
  - Added GetNextImageUrl method to all image providers that takes weather and timeOfDay parameters
  - Implemented caching in providers where appropriate
  - Added cache clearing when weather or timeOfDay changes
  - Added detailed logging for image parameters
  - Modified sensor source to use direct entity state checking instead of subscriptions
  - Improved image selection based on weather conditions and time of day
  - Removed retry logic for image retrieval
  - Removed fallback logic for image retrieval
  - Images will now be retried in the next cycle according to the configured rotation interval
  - Changed weather parameter from string to enum for better type safety and consistency
  - Simplified Weather enum to include only the supported weather conditions: all, clear sky, clouds, rain, snow, mist
  - Updated mapWeatherCondition methods to map thunderstorm and drizzle to rain
  - Moved mapWeatherCondition method to be only inside the OpenWeatherMapProvider
  - Extended WeatherData interface to include current.conditionUnified of type Weather
  - Added image shuffling for local-source and sensor-source to display images in random order
  - Centralized time of day determination logic into a single utility function
  - Fixed issue with undefined weather data in sensor-source image filtering
  - Added more detailed logging for weather data availability in sensor-source
  - Added UI controls for setting weather conditions and time of day for local background images

## 1.18.6

- Added support for additional European languages:
  - Italian (Italiano)
  - Portuguese (Português)
  - Dutch (Nederlands)
  - Swedish (Svenska)
  - Norwegian (Norsk)
  - Danish (Dansk)
  - Finnish (Suomi)
  - Greek (Ελληνικά)
  - Hungarian (Magyar)
  - Romanian (Română)
- Improved language handling in the translation system
- Reorganized language selection dropdown in alphabetical order
- Enhanced code maintainability by centralizing supported languages list

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
- Added support for Unsplash API (API key required)
- Added documentation for obtaining an Unsplash API key
- Improved image relevance by incorporating weather and time context
- Modified Unsplash image source to always use API when an API key is provided
- Removed "Use API" toggle from the UI editor for Unsplash
- Removed backward compatibility code for the deprecated `useOnlineImages` property

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

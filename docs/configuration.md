# Configuration

You can customize the Wall Clock Card through the Lovelace UI or by editing your Lovelace configuration manually:

## UI Configuration

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

## YAML Configuration

Add the card to your Lovelace configuration:

```yaml
type: 'custom:wall-clock-card'
# Optional: Custom time format
timeFormat:
  hour: '2-digit'
  minute: '2-digit'
  second: '2-digit'
  hour12: false  # Set to true for 12-hour format with AM/PM
# Optional: Time zone for the clock
timeZone: 'America/New_York'  # IANA time zone name (e.g., 'Europe/London', 'Asia/Tokyo')
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

# Optional: Action bar configuration
enableActionBar: true
actionBar:
  alignment: center  # Optional: 'left', 'center' (default), or 'right'
  actions:
    - type: navigate
      path: /lovelace/0
      title: Home
      icon: M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z
    - type: call-service
      service: light.turn_on
      service_data:
        entity_id: light.living_room
      title: Lights
      icon: M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z

# Legacy sensor configuration (still supported for backward compatibility)
# sensorEntity: 'sensor.living_room_temperature'
# sensorLabel: 'Temperature'
```

The background images will rotate automatically. The rotation interval can be configured (default is 30 seconds).

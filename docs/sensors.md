# Sensor Configuration

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
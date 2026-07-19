// Widget system barrel. Importing this module eagerly registers all built-in
// widgets (side effect), matching the pattern of the other four registries.
import {WidgetRegistry, registerWidget, WidgetPlugin} from './widget-registry';

// Element definitions (side effect: @customElement registration)
import './clock-widget';
import './date-widget';
import './sensors-widget';
import './weather-widget';
import './transportation-widget';
import './action-bar-widget';

export * from './widget-registry';
export * from './widget-element';
export * from './format-defaults';
export {ClockWidget, ClockWidgetConfig} from './clock-widget';
export {DateWidget, DateWidgetConfig} from './date-widget';
export {SensorsWidget, SensorsWidgetConfig} from './sensors-widget';
export {WeatherWidget, WeatherWidgetConfig} from './weather-widget';
export {TransportationWidget, TransportationWidgetConfig} from './transportation-widget';
export {ActionBarWidget, ActionBarWidgetConfig} from './action-bar-widget';

const BUILT_IN_WIDGETS: WidgetPlugin[] = [
    {
        widgetId: 'clock',
        name: 'Clock',
        description: 'The current time',
        icon: 'mdi:clock-outline',
        elementTag: 'wcc-clock-widget',
        editorTag: 'time-format-editor',
        defaultConfig: () => ({type: 'clock'}),
    },
    {
        widgetId: 'date',
        name: 'Date',
        description: 'The current date',
        icon: 'mdi:calendar-outline',
        elementTag: 'wcc-date-widget',
        editorTag: 'date-format-editor',
        defaultConfig: () => ({type: 'date'}),
    },
    {
        widgetId: 'sensors',
        name: 'Sensors',
        description: 'Values of Home Assistant sensors',
        icon: 'mdi:thermometer',
        elementTag: 'wcc-sensors-widget',
        editorTag: 'sensors-editor',
        defaultConfig: () => ({type: 'sensors', sensors: []}),
    },
    {
        widgetId: 'weather',
        name: 'Weather',
        description: 'Current weather and forecast',
        icon: 'mdi:weather-partly-cloudy',
        elementTag: 'wcc-weather-widget',
        editorTag: 'weather-editor',
        defaultConfig: () => ({type: 'weather', provider: 'homeassistant', displayMode: 'current'}),
    },
    {
        widgetId: 'transportation',
        name: 'Transportation',
        description: 'Public transport departures',
        icon: 'mdi:bus',
        elementTag: 'wcc-transportation-widget',
        editorTag: 'transportation-editor',
        defaultConfig: () => ({type: 'transportation', provider: '', stops: []}),
    },
    {
        widgetId: 'action-bar',
        name: 'Action bar',
        description: 'Buttons triggering actions',
        icon: 'mdi:gesture-tap-button',
        elementTag: 'wcc-action-bar-widget',
        editorTag: 'action-bar-editor',
        defaultConfig: () => ({type: 'action-bar', enabled: true, actions: []}),
    },
];

WidgetRegistry.getInstance().registerAll(BUILT_IN_WIDGETS);

export {registerWidget};

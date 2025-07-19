import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {WeatherUpdateActionConfig} from "./types";
import {WeatherComponent} from "../../../../components/weather";
import {createLogger, findComponentInDocument} from "../../../../utils";

/**
 * Weather Update plugin for the action bar
 * This plugin provides a way to trigger an immediate weather update on button press
 */

// Create a logger instance
const logger = createLogger('weather-update-plugin');

// Define the action type
export const WEATHER_UPDATE_ACTION = 'weather-update';

/**
 * Handler for weather update actions
 * @param action The weather update action configuration
 * @param hass The Home Assistant instance
 */
export const weatherUpdateHandler: ActionHandler<WeatherUpdateActionConfig> = (_action, _hass) => {
    // Try to find the card element using the utility function
    const card = findComponentInDocument('wall-clock-card');

    if (!card) {
        logger.warn('Wall Clock Card not found');
        return;
    }

    // Access the weather component from the card
    // @ts-ignore - Accessing private property
    const weatherComponent = card.weatherComponent as WeatherComponent;
    if (!weatherComponent) {
        logger.warn('Weather component not found');
        return;
    }

    // Trigger weather update
    weatherComponent.controller.fetchWeatherDataAsync()
        .then(() => {
            logger.info('Weather update triggered successfully');
        })
        .catch((error) => {
            logger.error('Error triggering weather update:', error);
        });
};

/**
 * Weather Update Plugin class that implements the ActionPlugin interface
 */
export class WeatherUpdatePlugin implements ActionPlugin<WeatherUpdateActionConfig> {
    readonly actionId = WEATHER_UPDATE_ACTION;
    readonly name = 'Update Weather';
    readonly description = 'Trigger an immediate weather update';
    readonly icon = 'mdi:weather-partly-cloudy';
    readonly handler: ActionHandler<WeatherUpdateActionConfig> = weatherUpdateHandler;

    readonly editorTag = 'weather-update-editor-plugin';

    defaultActionConfig(): WeatherUpdateActionConfig {
        return {
            actionId: WEATHER_UPDATE_ACTION,
            title: 'Update Weather',
            icon: this.icon
        };
    }

    register(): void {
        registerPlugin(this);
    }
}

/**
 * Register the weather update handler with the PluginRegistry
 */
export function registerWeatherUpdatePlugin(): void {
    const plugin = new WeatherUpdatePlugin();
    plugin.register();
}

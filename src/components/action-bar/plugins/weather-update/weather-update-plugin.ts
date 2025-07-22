import {ActionHandler} from '../../types';
import {registerPlugin, ActionPlugin} from '../../plugin-registry';
import {WeatherUpdateActionConfig} from "./types";
import {createLogger, ForceUpdateWeatherMessage, Messenger} from "../../../../utils";

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
    logger.info('Weather update clicked');
    Messenger.getInstance().publish(new ForceUpdateWeatherMessage());
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

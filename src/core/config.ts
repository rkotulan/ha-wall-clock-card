// Configuration and default values for the Wall Clock Card

import { WallClockCardConfig } from './types';

// Default configuration values
export const DEFAULT_CONFIG: Partial<WallClockCardConfig> = {
    timeFormat: 'HH:mm:ss',
    dateFormat: 'EEEE, MMMM d, yyyy',
    showSeconds: true,
    hideYear: false,
    fontColor: 'white',
    backgroundOpacity: 0.5,
    rotationInterval: 30,
    imageSource: 'none',
    logLevel: 'info',
};

// Default weather configuration
export const DEFAULT_WEATHER_CONFIG = {
    provider: 'openweathermap',
    displayMode: 'both',
    forecastDays: 5,
    units: 'metric',
    title: 'Weather',
    updateInterval: 30,
};

// Default transportation configuration
export const DEFAULT_TRANSPORTATION_CONFIG = {
    provider: 'idos',
    maxDepartures: 5,
    onDemand: false,
    autoHideTimeout: 2,
    updateInterval: 1,
};

// Constants
export const TRANSITION_DELAY = 500; // ms
export const TRANSITION_DURATION = 1000; // ms
export const WEATHER_UPDATE_INTERVAL = 30 * 60 * 1000; // 30 minutes in ms
export const TRANSPORTATION_UPDATE_INTERVAL = 60 * 1000; // 1 minute in ms

// Merge user configuration with default configuration
export function mergeConfig(userConfig: Partial<WallClockCardConfig>): WallClockCardConfig {
    const config = {
        ...DEFAULT_CONFIG,
        ...userConfig,
    } as WallClockCardConfig;

    // Merge nested configurations
    if (userConfig.weather) {
        config.weather = {
            ...DEFAULT_WEATHER_CONFIG,
            ...userConfig.weather,
        };
    }

    if (userConfig.transportation) {
        config.transportation = {
            ...DEFAULT_TRANSPORTATION_CONFIG,
            ...userConfig.transportation,
        };
    }

    return config;
}
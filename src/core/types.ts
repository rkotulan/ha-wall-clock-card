// Core types and interfaces for the Wall Clock Card

// Import necessary dependencies
import { HomeAssistant } from 'custom-card-helpers';
import { BackgroundImage, ImageSourceConfig } from '../image-sources/types';
import { WeatherProviderConfig } from '../weather-providers/types';
import { TransportationConfig } from '../transportation-providers/types';
import { ActionBarConfig } from '../components/action-bar/types';
import { ExtendedDateTimeFormatOptions } from '../utils';

// Common interfaces

export interface WallClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    backgroundOpacity?: number;
    imageSource?: string; // ID of the image source plugin ('none', 'local', 'picsum', etc.)
    imageConfig?: ImageSourceConfig; // Configuration for the image source
    backgroundRotationInterval?: number;
    sensors?: SensorConfig[]; // Multiple sensors
    fontColor?: string; // Font color for all text elements
    language?: string; // Language for translations
    timeZone?: string; // Time zone for clock (e.g., 'America/New_York')
    logLevel?: string; // Log level for the logger (debug, info, warn, error, none)

    // Size settings
    size?: Size; // Size of the clock (large, medium, custom)
    customSizes?: {
        clockSize?: string; // Custom size for the clock
        dateSize?: string; // Custom size for the date
        labelSize?: string; // Custom size for labels
        valueSize?: string; // Custom size for values
        actionBarIconSize?: string; // Custom size for action bar icons
    };

    // Background images structure
    backgroundImages?: BackgroundImage[]; // Array of background images with weather and time-of-day information

    // Weather forecast settings
    showWeather?: boolean; // Whether to show weather forecast
    weatherProvider?: string; // ID of the weather provider plugin ('openweathermap', etc.)
    weatherConfig?: WeatherProviderConfig; // Configuration for the weather provider
    weatherDisplayMode?: 'current' | 'forecast' | 'both'; // What weather data to display
    weatherForecastDays?: number; // Number of days to show in forecast (1-7)
    weatherTitle?: string; // Custom title for the weather section (default: "Weather")
    weatherUpdateInterval?: number; // Interval in seconds to update weather data (minimum: 60)

    // Transportation departures settings
    transportation?: TransportationConfig; // Configuration for transportation departures

    // Action bar settings
    actionBar?: ActionBarConfig; // Configuration for action bar

    // Allow string indexing for dynamic property access
    [key: string]: any;
}
export interface WallClockCardConfig {
    type: string;
    name?: string;
    timeFormat?: string;
    dateFormat?: string;
    timeZone?: string;
    locale?: string;
    language?: string;
    showSeconds?: boolean;
    hideYear?: boolean;
    fontColor?: string;
    sensors?: SensorConfig[];
    imageSource?: string;
    backgroundImages?: BackgroundImageConfig[];
    backgroundOpacity?: number;
    rotationInterval?: number;
    weather?: WeatherConfig;
    transportation?: TransportationConfig;
    actionBar?: ActionBarConfig;
    logLevel?: string;
}

export interface SensorConfig {
    entity: string;
    name?: string;
    icon?: string;
    unit?: string;
    precision?: number;
    label?: string;
}

export interface BackgroundImageConfig {
    url: string;
    weatherCondition?: string;
    timeOfDay?: string;
}

export interface WeatherConfig {
    provider: string;
    apiKey?: string;
    latitude?: number;
    longitude?: number;
    units?: string;
    displayMode?: string;
    forecastDays?: number;
    title?: string;
    updateInterval?: number;
}

// TransportationConfig and ActionBarConfig are imported from their respective modules

// Enums
export enum Weather {
    All = 'all',
    ClearSky = 'clear sky',
    Clouds = 'clouds',
    Rain = 'rain',
    Snow = 'snow',
    Mist = 'mist',
}

export enum TimeOfDay {
    SunriseSunset = 'sunrise-sunset',
    Day = 'day',
    Night = 'night',
    Unspecified = 'unspecified',
}

export enum Size {
    Large = 'large',
    Medium = 'medium',
    Custom = 'custom',
}

// Type definitions
export type WeatherData = {
    current: {
        temp: number;
        condition: string;
        conditionUnified: Weather;
        icon: string;
    };
    forecast: {
        date: Date;
        tempMin: number;
        tempMax: number;
        condition: string;
        icon: string;
    }[];
};

export type TransportationData = {
    stops: {
        id: string;
        name: string;
        departures: {
            line: string;
            destination: string;
            departureTime: Date;
            delay?: number;
            platform?: string;
        }[];
    }[];
};

// Component interfaces
export interface ComponentWithHass {
    hass: HomeAssistant;
}

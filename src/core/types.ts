// Core types and interfaces for the Wall Clock Card

// Import necessary dependencies
import { HomeAssistant } from 'custom-card-helpers';

// Common interfaces
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

export interface TransportationConfig {
    provider: string;
    apiKey?: string;
    stops?: TransportationStopConfig[];
    maxDepartures?: number;
    onDemand?: boolean;
    autoHideTimeout?: number;
    updateInterval?: number;
}

export interface TransportationStopConfig {
    id: string;
    name?: string;
}

export interface ActionBarConfig {
    buttons: ActionBarButtonConfig[];
}

export interface ActionBarButtonConfig {
    type: string;
    icon: string;
    title?: string;
    action?: any;
}

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

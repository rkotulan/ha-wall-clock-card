import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
// Side-effect import: registers the ha-weather element (the class is used type-only)
import '../components/weather';
import type {WeatherComponent} from '../components/weather';
import {WeatherProviderConfig} from '../weather-providers/types';
import {resolveLanguage} from '../utils/ha-locale';
import {Size} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';

export interface WeatherWidgetConfig extends WidgetConfig {
    enabled?: boolean;
    /** Weather provider plugin id ('openweathermap', 'homeassistant', ...). */
    provider?: string;
    providerConfig?: WeatherProviderConfig;
    displayMode?: 'current' | 'forecast' | 'both';
    forecastDays?: number;
    title?: string;
    updateInterval?: number;
    iconSet?: string;
    labelSize?: string;
    valueSize?: string;
}

@customElement('wcc-weather-widget')
export class WeatherWidget extends WidgetElement<WeatherWidgetConfig> {
    private weather = document.createElement('ha-weather') as WeatherComponent;

    static styles = css`
        :host {
            display: block;
            max-height: 100%;
        }
    `;

    protected applyWidgetState(): void {
        const hasCustomSize = !!(this.config.labelSize || this.config.valueSize);
        // Presence enables the widget by default; keep the v2 Show Weather
        // switch meaningful when it is explicitly turned off in the inspector.
        this.weather.showWeather = this.config.enabled !== false;
        this.weather.weatherProvider = this.config.provider;
        this.weather.weatherConfig = this.config.providerConfig;
        this.weather.weatherDisplayMode = this.config.displayMode;
        this.weather.weatherForecastDays = this.config.forecastDays;
        this.weather.weatherTitle = this.config.title;
        this.weather.weatherUpdateInterval = this.config.updateInterval;
        this.weather.weatherIconSet = this.config.iconSet ?? this.config.providerConfig?.iconSet;
        this.weather.fontColor = this.fontColor;
        this.weather.language = resolveLanguage(this.appearance?.language, this.hass);
        this.weather.size = hasCustomSize ? Size.Custom : (this.appearance?.size ?? Size.Medium);
        this.weather.labelSize = this.config.labelSize;
        this.weather.valueSize = this.config.valueSize;
        if (this.hass) {
            this.weather.hass = this.hass;
        }
    }

    render() {
        return html`${this.weather}`;
    }
}

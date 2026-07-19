import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {WeatherComponent} from '../components/weather';
import {WeatherProviderConfig} from '../weather-providers/types';
import {resolveLanguage} from '../utils/ha-locale';
import {Size} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';

export interface WeatherWidgetConfig extends WidgetConfig {
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
        // The widget's presence in a zone is what enables weather display.
        this.weather.showWeather = true;
        this.weather.weatherProvider = this.config.provider;
        this.weather.weatherConfig = this.config.providerConfig;
        this.weather.weatherDisplayMode = this.config.displayMode;
        this.weather.weatherForecastDays = this.config.forecastDays;
        this.weather.weatherTitle = this.config.title;
        this.weather.weatherUpdateInterval = this.config.updateInterval;
        this.weather.weatherIconSet = this.config.iconSet ?? this.config.providerConfig?.iconSet;
        this.weather.fontColor = this.fontColor;
        this.weather.language = resolveLanguage(this.appearance?.language, this.hass);
        this.weather.size = this.appearance?.size ?? Size.Medium;
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

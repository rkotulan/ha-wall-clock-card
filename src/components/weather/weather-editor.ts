import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';

/**
 * Editor component for weather settings
 */
@customElement('weather-editor')
export class WeatherEditor extends BaseEditorSection {
    // Weather provider options
    private _weatherProviderOptions() { return [
        {value: 'none', label: this.t('editor.weather.provider_none', 'None (disable weather)')},
        {value: 'homeassistant', label: this.t('editor.weather.provider_ha', 'Home Assistant entity')},
        {value: 'openweathermap', label: 'OpenWeatherMap'},
    ]; }

    // Units options
    private _unitsOptions() { return [
        {value: 'metric', label: this.t('editor.weather.metric', 'Metric (°C, m/s)')},
        {value: 'imperial', label: this.t('editor.weather.imperial', 'Imperial (°F, mph)')},
    ]; }

    // Weather display mode options
    private _weatherDisplayModeOptions() { return [
        {value: 'current', label: this.t('editor.weather.current', 'Current weather only')},
        {value: 'forecast', label: this.t('editor.weather.forecast', 'Forecast only')},
        {value: 'both', label: this.t('editor.weather.both', 'Current and forecast')},
    ]; }

    // Weather icon set options
    private _weatherIconSetOptions = [
        {value: 'metno', label: 'Met.no (SVG)'},
        {value: 'openweathermap', label: 'OpenWeatherMap (PNG)'},
        {value: 'basmilius', label: 'Bas Milius (Animated)'},
    ];

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean: {}}}
                        .value=${this.config.showWeather || false}
                        .label=${this.t('editor.weather.show', 'Show weather')}
                        .helper=${this.t('editor.weather.show_help', 'Display current weather and forecast')}
                        propertyName="showWeather"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.showWeather ? html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                text: {
                                    type: "text"
                                }
                            }}
                            .value=${this.config.weatherTitle || this.t('common.title', 'Weather')}
                            .label=${this.t('editor.weather.title', 'Weather title')}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: this._weatherProviderOptions(),
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.weatherProvider || 'openweathermap'}
                            .label=${this.t('editor.weather.provider', 'Weather provider')}
                            propertyName="weatherProvider"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    ${this.config.weatherProvider === 'homeassistant' ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    entity: {
                                        domain: "weather"
                                    }
                                }}
                                .value=${this.config.weatherConfig?.entityId || ''}
                                .label=${this.t('editor.weather.entity', 'Weather entity')}
                                propertyName="weatherConfig.entityId"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    ` : ''}


                    ${this.config.weatherProvider === 'openweathermap' ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${this.config.weatherConfig?.apiKey || ''}
                                .label=${this.t('editor.weather.api_key', 'API key')}
                                .helper=${this.t('editor.weather.api_key_help', 'OpenWeatherMap API key')}
                                propertyName="weatherConfig.apiKey"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    ` : ''}

                    ${(this.config.weatherProvider === 'openweathermap') ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: -90,
                                        max: 90,
                                        step: 0.0001,
                                        mode: "box"
                                    }
                                }}
                                .value=${this.config.weatherConfig?.latitude || 50.0755}
                                .label=${this.t('editor.weather.latitude', 'Latitude')}
                                propertyName="weatherConfig.latitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: -180,
                                        max: 180,
                                        step: 0.0001,
                                        mode: "box"
                                    }
                                }}
                                .value=${this.config.weatherConfig?.longitude || 14.4378}
                                .label=${this.t('editor.weather.longitude', 'Longitude')}
                                propertyName="weatherConfig.longitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._unitsOptions(),
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this.config.weatherConfig?.units || 'metric'}
                                .label=${this.t('editor.weather.units', 'Units')}
                                propertyName="weatherConfig.units"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    ` : ''}

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: this._weatherDisplayModeOptions(),
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.weatherDisplayMode || 'both'}
                            .label=${this.t('editor.weather.display_mode', 'Display mode')}
                            propertyName="weatherDisplayMode"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: this._weatherIconSetOptions,
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.weatherIconSet || (this.config.weatherProvider === 'homeassistant' ? 'metno' : 'openweathermap')}
                            .label=${this.t('editor.weather.icon_set', 'Weather icon set')}
                            propertyName="weatherIconSet"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>


                    ${(this.config.weatherDisplayMode === 'forecast' || this.config.weatherDisplayMode === 'both') ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: 1,
                                        max: 7,
                                        step: 1,
                                        mode: "slider"
                                    }
                                }}
                                .value=${this.config.weatherForecastDays || 3}
                                .label=${this.t('editor.weather.forecast_days', 'Forecast days')}
                                .helper=${this.t('editor.weather.days', '{count} days', {count: this.config.weatherForecastDays || 3})}
                                propertyName="weatherForecastDays"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    number: {
                                        min: 1,
                                        step: 1,
                                        mode: "box"
                                    }
                                }}
                                .value=${Math.floor((this.config.weatherUpdateInterval || 1800) / 60)}
                                .label=${this.t('editor.weather.update_interval', 'Update interval')}
                                .helper=${this.t('editor.weather.update_help', 'Update interval in minutes (minimum 1)')}
                                propertyName="weatherUpdateInterval"
                                .transformData=${(value: number) => value * 60}
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    ` : ''}
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'weather-editor': WeatherEditor;
    }
}

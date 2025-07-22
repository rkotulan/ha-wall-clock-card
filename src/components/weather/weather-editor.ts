import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';

/**
 * Editor component for weather settings
 */
@customElement('weather-editor')
export class WeatherEditor extends BaseEditorSection {
    // Weather provider options
    private _weatherProviderOptions = [
        {value: 'none', label: 'None (Disable Weather)'},
        {value: 'openweathermap', label: 'OpenWeatherMap'},
    ];

    // Units options
    private _unitsOptions = [
        {value: 'metric', label: 'Metric (°C, m/s)'},
        {value: 'imperial', label: 'Imperial (°F, mph)'},
    ];

    // Weather display mode options
    private _weatherDisplayModeOptions = [
        {value: 'current', label: 'Current Weather Only'},
        {value: 'forecast', label: 'Forecast Only'},
        {value: 'both', label: 'Current and Forecast'},
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
                        .label= ${"Show Weather"}
                        .helper= ${"Display weather forecast"}
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
                            .value=${this.config.weatherTitle || 'Weather'}
                            .label= ${"Weather Title"}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: this._weatherProviderOptions,
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.weatherProvider || 'openweathermap'}
                            .label= ${"Weather Provider"}
                            propertyName="weatherProvider"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    ${this.config.weatherProvider === 'openweathermap' ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${this.config.weatherConfig?.apiKey || ''}
                                .label= ${"API Key"}
                                .helper= ${"OpenWeatherMap API Key"}
                                propertyName="weatherConfig.apiKey"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

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
                                .label=${"Latitude"}
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
                                .label=${"Longitude"}
                                propertyName="weatherConfig.longitude"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._unitsOptions,
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${this.config.weatherConfig?.units || 'metric'}
                                .label=${"Units"}
                                propertyName="weatherConfig.units"
                                @value-changed=${this._handleFormValueChanged}
                        ></ha-row-selector>
                    ` : ''}

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: this._weatherDisplayModeOptions,
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.weatherDisplayMode || 'both'}
                            .label= ${"Display Mode"}
                            propertyName="weatherDisplayMode"
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
                                .label= ${"Forecast Days"}
                                .helper=${`${this.config.weatherForecastDays || 3} days`}
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
                                .label= ${"Update Interval"}
                                .helper= ${"Update interval in minutes (min: 1)"}
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
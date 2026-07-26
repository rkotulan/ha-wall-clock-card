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

    private _forecastTypeOptions() { return [
        {value: 'auto', label: this.t('editor.weather.forecast_type_auto', 'Automatic')},
        {value: 'daily', label: this.t('editor.weather.forecast_type_daily', 'Daily')},
        {value: 'hourly', label: this.t('editor.weather.forecast_type_hourly', 'Hourly')},
        {value: 'twice_daily', label: this.t('editor.weather.forecast_type_twice_daily', 'Twice daily')},
    ]; }

    private _resolvedForecastType(): 'daily' | 'hourly' | 'twice_daily' {
        const configured = this.config.weatherConfig?.forecastType;
        if (configured && configured !== 'auto') {
            return configured;
        }

        const entityId = this.config.weatherConfig?.entityId;
        const supportedFeatures = Number(
            entityId ? this.hass.states[entityId]?.attributes?.supported_features ?? 0 : 0
        );
        if (supportedFeatures & 1) return 'daily';
        if (supportedFeatures & 2) return 'hourly';
        if (supportedFeatures & 4) return 'twice_daily';
        return 'daily';
    }

    // Weather icon set options
    private _weatherIconSetOptions = [
        {value: 'wall-clock', label: 'Wall Clock (Animated SVG)'},
        {value: 'metno', label: 'Met.no (SVG)'},
        {value: 'openweathermap', label: 'OpenWeatherMap (PNG)'},
        {value: 'basmilius', label: 'Bas Milius (Animated)'},
    ];

    static get styles() {
        return css`
            .content {
                display: flex;
                flex-direction: column;
                gap: 14px;
                padding: 12px;
            }

            .section-title {
                margin: 2px 0 0;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.73rem;
                font-weight: 750;
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }

            .options {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }
        const showContent = this.section === 'all' || this.section === 'content';
        const showAppearance = this.section === 'all' || this.section === 'appearance';
        const showBehavior = this.section === 'all' || this.section === 'behavior';
        const forecastType = this._resolvedForecastType();
        const forecastCount = this.config.weatherForecastDays || 3;

        return html`
            <div class="content">
                ${showContent ? html`
                    <div class="section-title">${this.t('editor.weather.source', 'Weather source')}</div>
                    <div class="options">
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
                                    .selector=${{entity: {domain: "weather"}}}
                                    .value=${this.config.weatherConfig?.entityId || ''}
                                    .label=${this.t('editor.weather.entity', 'Weather entity')}
                                    propertyName="weatherConfig.entityId"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select: {options: this._forecastTypeOptions(), mode: 'dropdown'}}}
                                    .value=${this.config.weatherConfig?.forecastType || 'auto'}
                                    .label=${this.t('editor.weather.forecast_type', 'Forecast type')}
                                    .helper=${this.t('editor.weather.forecast_type_help', 'Automatic uses a forecast supported by the selected entity')}
                                    propertyName="weatherConfig.forecastType"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        ` : ''}
                        ${this.config.weatherProvider === 'openweathermap' ? html`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text: {type: "text"}}}
                                    .value=${this.config.weatherConfig?.apiKey || ''}
                                    .label=${this.t('editor.weather.api_key', 'API key')}
                                    .helper=${this.t('editor.weather.api_key_help', 'OpenWeatherMap API key')}
                                    propertyName="weatherConfig.apiKey"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number: {min: -90, max: 90, step: 0.0001, mode: "box"}}}
                                    .value=${this.config.weatherConfig?.latitude || 50.0755}
                                    .label=${this.t('editor.weather.latitude', 'Latitude')}
                                    propertyName="weatherConfig.latitude"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{number: {min: -180, max: 180, step: 0.0001, mode: "box"}}}
                                    .value=${this.config.weatherConfig?.longitude || 14.4378}
                                    .label=${this.t('editor.weather.longitude', 'Longitude')}
                                    propertyName="weatherConfig.longitude"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{select: {options: this._unitsOptions(), mode: 'dropdown'}}}
                                    .value=${this.config.weatherConfig?.units || 'metric'}
                                    .label=${this.t('editor.weather.units', 'Units')}
                                    propertyName="weatherConfig.units"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        ` : ''}
                    </div>

                    <div class="section-title">${this.t('editor.weather.visible_content', 'Displayed information')}</div>
                    <div class="options">
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{text: {type: "text"}}}
                            .value=${this.config.weatherTitle || this.t('common.title', 'Weather')}
                            .label=${this.t('editor.weather.title', 'Weather title')}
                            propertyName="weatherTitle"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${this.config.weatherShowTitle !== false}
                            .label=${this.t('editor.weather.show_title', 'Show forecast heading')}
                            .helper=${this.t('editor.weather.show_title_help', 'Show the Weather or Forecast heading above the widget')}
                            propertyName="weatherShowTitle"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select: {options: this._weatherDisplayModeOptions(), mode: 'dropdown'}}}
                            .value=${this.config.weatherDisplayMode || 'both'}
                            .label=${this.t('editor.weather.display_mode', 'Display mode')}
                            propertyName="weatherDisplayMode"
                            @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        ${(this.config.weatherDisplayMode === 'forecast' || this.config.weatherDisplayMode === 'both') ? html`
                            <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number: {min: 1, max: forecastType === 'hourly' ? 24 : 7, step: 1, mode: "slider"}}}
                                .value=${forecastCount}
                                .label=${forecastType === 'hourly'
                                    ? this.t('editor.weather.forecast_hours', 'Forecast hours')
                                    : this.t('editor.weather.forecast_days', 'Forecast days')}
                                .helper=${forecastType === 'hourly'
                                    ? this.t('editor.weather.hours', '{count} hours', {count: forecastCount})
                                    : this.t('editor.weather.days', '{count} days', {count: forecastCount})}
                                propertyName="weatherForecastDays"
                                @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        ` : ''}
                    </div>
                ` : ''}

                ${showAppearance ? html`
                    <div class="section-title">${this.t('editor.weather.icons', 'Weather icons')}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{select: {options: this._weatherIconSetOptions, mode: 'dropdown'}}}
                                .value=${this.config.weatherIconSet || (this.config.weatherProvider === 'homeassistant' ? 'metno' : 'openweathermap')}
                                .label=${this.t('editor.weather.icon_set', 'Weather icon set')}
                                propertyName="weatherIconSet"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                        ${this.config.weatherIconSet === 'wall-clock' ? html`
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{boolean: {}}}
                                    .value=${this.config.weatherIconAnimation !== false}
                                    .label=${this.t('editor.weather.animate_icons', 'Animate icons')}
                                    .helper=${this.t('editor.weather.animate_icons_help', 'Uses subtle motion and respects the system reduced-motion preference.')}
                                    propertyName="weatherIconAnimation"
                                    @value-changed=${this._handleFormValueChanged}>
                            </ha-row-selector>
                        ` : ''}
                    </div>
                ` : ''}

                ${showBehavior ? html`
                    <div class="section-title">${this.t('editor.weather.availability', 'Availability')}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{boolean: {}}}
                                .value=${this.config.showWeather || false}
                                .label=${this.t('editor.weather.show', 'Show weather')}
                                .helper=${this.t('editor.weather.show_help', 'Display current weather and forecast')}
                                propertyName="showWeather"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
                    <div class="section-title">${this.t('editor.weather.refresh', 'Data refresh')}</div>
                    <div class="options">
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number: {min: 1, step: 1, mode: "box"}}}
                                .value=${Math.floor((this.config.weatherUpdateInterval || 1800) / 60)}
                                .label=${this.t('editor.weather.update_interval', 'Update interval')}
                                .helper=${this.t('editor.weather.update_help', 'Update interval in minutes (minimum 1)')}
                                propertyName="weatherUpdateInterval"
                                .transformData=${(value: number) => value * 60}
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    </div>
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

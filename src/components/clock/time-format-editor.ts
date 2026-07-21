import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';

/**
 * Editor component for time format settings
 */
@customElement('time-format-editor')
export class TimeFormatEditor extends BaseEditorSection {
    // Time format options
    private _timeFormatOptions() {
        const numeric = this.t('editor.format.numeric', 'Numeric');
        const twoDigit = this.t('editor.format.two_digit', '2-digit');
        return {
            hour12: [
                {value: 'true', label: this.t('editor.format.hour_12', '12-hour')},
                {value: 'false', label: this.t('editor.format.hour_24', '24-hour')},
            ],
            hour: [{value: 'numeric', label: numeric}, {value: '2-digit', label: twoDigit}],
            minute: [{value: 'numeric', label: numeric}, {value: '2-digit', label: twoDigit}],
            second: [
                {value: 'numeric', label: numeric},
                {value: '2-digit', label: twoDigit},
                {value: 'hidden', label: this.t('editor.format.hidden', 'Hidden')},
            ],
        };
    }

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

        const options = this._timeFormatOptions();
        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.hour12,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.hour12 ? 'true' : 'false'}
                        .label=${this.t('editor.format.hour_format', 'Hour format')}
                        propertyName="timeFormat.hour12"
                        .transformData=${(value: string) => value === 'true'}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.timeFormat?.hour12 ? html`
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${this.config.timeFormat?.showAmPm !== false}
                            .label=${this.t('editor.format.show_am_pm', 'Show AM/PM')}
                            .helper=${this.t('editor.format.show_am_pm_help', 'Keep 12-hour time while hiding or showing the period')}
                            propertyName="timeFormat.showAmPm"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>
                ` : ''}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.hour,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.hour || '2-digit'}
                        .label=${this.t('editor.format.hour_display', 'Hour display')}
                        propertyName="timeFormat.hour"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.minute,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.minute || '2-digit'}
                        .label=${this.t('editor.format.minute_display', 'Minute display')}
                        propertyName="timeFormat.minute"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.second,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.second === undefined ? 'undefined' : this.config.timeFormat?.second}
                        .label=${this.t('editor.format.second_display', 'Second display')}
                        propertyName="timeFormat.second"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'time-format-editor': TimeFormatEditor;
    }
}

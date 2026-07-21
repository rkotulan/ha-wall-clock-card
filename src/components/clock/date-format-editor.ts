import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';

/**
 * Editor component for date format settings
 */
@customElement('date-format-editor')
export class DateFormatEditor extends BaseEditorSection {
    // Date format options
    private _dateFormatOptions() {
        return {
        weekday: [
            {value: 'long', label: this.t('editor.format.long_monday', 'Long (Monday)')},
            {value: 'short', label: this.t('editor.format.short_mon', 'Short (Mon)')},
            {value: 'narrow', label: this.t('editor.format.narrow_m', 'Narrow (M)')},
            {value: 'hidden', label: this.t('editor.format.hidden', 'Hidden')},
        ],
        month: [
            {value: 'long', label: this.t('editor.format.long_january', 'Long (January)')},
            {value: 'short', label: this.t('editor.format.short_jan', 'Short (Jan)')},
            {value: 'narrow', label: this.t('editor.format.narrow_j', 'Narrow (J)')},
            {value: 'numeric', label: this.t('editor.format.numeric_1', 'Numeric (1)')},
            {value: '2-digit', label: this.t('editor.format.two_digit_01', '2-digit (01)')},
            {value: 'hidden', label: this.t('editor.format.hidden', 'Hidden')},
        ],
        day: [
            {value: 'numeric', label: this.t('editor.format.numeric_1', 'Numeric (1)')},
            {value: '2-digit', label: this.t('editor.format.two_digit_01', '2-digit (01)')},
            {value: 'hidden', label: this.t('editor.format.hidden', 'Hidden')},
        ],
        year: [
            {value: 'numeric', label: this.t('editor.format.numeric_2025', 'Numeric (2025)')},
            {value: '2-digit', label: this.t('editor.format.two_digit_25', '2-digit (25)')},
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

        const options = this._dateFormatOptions();
        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            text: {}
                        }}
                        .value=${this.config.dateFormat?.custom || ''}
                        .label=${this.t('editor.format.custom_date', 'Custom date format')}
                        .helper=${this.t('editor.format.custom_date_help', 'For example yyyy-MM-dd or EEEE, MMMM d, yyyy. When filled, it overrides the settings below.')}
                        propertyName="dateFormat.custom"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.weekday,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.weekday || 'long'}
                        .label=${this.t('editor.format.weekday_display', 'Weekday display')}
                        propertyName="dateFormat.weekday"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.month,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.month || 'long'}
                        .label=${this.t('editor.format.month_display', 'Month display')}
                        propertyName="dateFormat.month"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.day,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.day === undefined ? 'undefined' : this.config.dateFormat?.day}
                        .label=${this.t('editor.format.day_display', 'Day display')}
                        propertyName="dateFormat.day"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: options.year,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.year === undefined ? 'undefined' : this.config.dateFormat?.year}
                        .label=${this.t('editor.format.year_display', 'Year display')}
                        propertyName="dateFormat.year"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'date-format-editor': DateFormatEditor;
    }
}

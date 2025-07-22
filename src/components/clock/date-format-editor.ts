import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../editor-base/base-editor-section';

/**
 * Editor component for date format settings
 */
@customElement('date-format-editor')
export class DateFormatEditor extends BaseEditorSection {
    // Date format options
    private _dateFormatOptions = {
        weekday: [
            {value: 'long', label: 'Long (Monday)'},
            {value: 'short', label: 'Short (Mon)'},
            {value: 'narrow', label: 'Narrow (M)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        month: [
            {value: 'long', label: 'Long (January)'},
            {value: 'short', label: 'Short (Jan)'},
            {value: 'narrow', label: 'Narrow (J)'},
            {value: 'numeric', label: 'Numeric (1)'},
            {value: '2-digit', label: '2-digit (01)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        day: [
            {value: 'numeric', label: 'Numeric (1)'},
            {value: '2-digit', label: '2-digit (01)'},
            {value: 'hidden', label: 'Hidden'},
        ],
        year: [
            {value: 'numeric', label: 'Numeric (2025)'},
            {value: '2-digit', label: '2-digit (25)'},
            {value: 'hidden', label: 'Hidden'},
        ],
    };

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
                        .selector=${{
                            select: {
                                options: this._dateFormatOptions.weekday,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.weekday || 'long'}
                        .label= ${"Weekday Display"}
                        propertyName="dateFormat.weekday"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._dateFormatOptions.month,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.month || 'long'}
                        .label= ${"Month Display"}
                        propertyName="dateFormat.month"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._dateFormatOptions.day,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.day === undefined ? 'undefined' : this.config.dateFormat?.day}
                        .label= ${"Day Display"}
                        propertyName="dateFormat.day"
                        .transformData=${(value: string) => value === 'undefined' ? 'hidden' : value}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._dateFormatOptions.year,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.dateFormat?.year === undefined ? 'undefined' : this.config.dateFormat?.year}
                        .label= ${"Year Display"}
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
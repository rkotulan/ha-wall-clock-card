import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';

/**
 * Editor component for time format settings
 */
@customElement('time-format-editor')
export class TimeFormatEditor extends BaseEditorSection {
    // Time format options
    private _timeFormatOptions = {
        hour12: [
            {value: 'true', label: '12-hour'},
            {value: 'false', label: '24-hour'},
        ],
        hour: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
        ],
        minute: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
        ],
        second: [
            {value: 'numeric', label: 'Numeric'},
            {value: '2-digit', label: '2-digit'},
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
                                options: this._timeFormatOptions.hour12,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.hour12 ? 'true' : 'false'}
                        .label= ${"Hour Format"}
                        propertyName="timeFormat.hour12"
                        .transformData=${(value: string) => value === 'true'}
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._timeFormatOptions.hour,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.hour || '2-digit'}
                        .label= ${"Hour Display"}
                        propertyName="timeFormat.hour"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._timeFormatOptions.minute,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.minute || '2-digit'}
                        .label= ${"Minute Display"}
                        propertyName="timeFormat.minute"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this._timeFormatOptions.second,
                                mode: 'dropdown'
                            }
                        }}
                        .value=${this.config.timeFormat?.second === undefined ? 'undefined' : this.config.timeFormat?.second}
                        .label= ${"Second Display"}
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
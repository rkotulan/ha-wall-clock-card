import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BaseEditorSection} from '../../editors/editor-base/base-editor-section';

@customElement('separator-editor')
export class SeparatorEditor extends BaseEditorSection {
    static styles = css`
        .content {
            padding: 12px;
        }
    `;

    render() {
        if (!this.hass || !this.config) return html``;

        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select: {options: [
                            {value: 'auto', label: this.t('ui.auto', 'Auto (by zone)')},
                            {value: 'horizontal', label: this.t('ui.horizontal', 'Horizontal')},
                            {value: 'vertical', label: this.t('ui.vertical', 'Vertical')},
                        ], mode: 'dropdown'}}}
                        .value=${this.config.orientation ?? 'auto'}
                        .label=${this.t('editor.separator.orientation', 'Orientation')}
                        .helper=${this.t('editor.separator.orientation_help', 'Auto follows the direction of the hosting zone.')}
                        propertyName="orientation"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{color_hex: ''}}
                        .value=${this.config.color ?? '#ffffff'}
                        .label=${this.t('editor.separator.color', 'Separator color')}
                        propertyName="color"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{number: {min: 0, max: 1, step: 0.05, mode: 'slider'}}}
                        .value=${this.config.opacity ?? 0.35}
                        .label=${this.t('editor.separator.opacity', 'Opacity')}
                        propertyName="opacity"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text: {}}}
                        .value=${this.config.thickness ?? '1px'}
                        .label=${this.t('editor.separator.thickness', 'Thickness')}
                        .helper=${this.t('editor.separator.thickness_help', 'CSS length, for example 1px or 0.15rem.')}
                        propertyName="thickness"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{text: {}}}
                        .value=${this.config.length ?? '100%'}
                        .label=${this.t('editor.separator.length', 'Length')}
                        .helper=${this.t('editor.separator.length_help', 'CSS length or percentage, for example 100% or 240px.')}
                        propertyName="length"
                        @value-changed=${this._handleFormValueChanged}>
                </ha-row-selector>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'separator-editor': SeparatorEditor;
    }
}

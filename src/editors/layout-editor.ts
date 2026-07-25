import {css, CSSResult, html, LitElement, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {fireEvent, HomeAssistant} from 'custom-card-helpers';
import {WallClockConfig} from '../core/types';
import {
    LayoutConfig,
    LayoutFormat,
    LayoutVisualPreset,
    SpacingConfig,
    SpacingPreset,
    WallClockConfigV3,
} from '../core/layout-types';
import {isValidSpacingValue, migrateToLayout, resolveSpacing} from '../core/migrate-config';
import {setLayoutFormat, setLayoutVisualPreset, setSpacing} from './layout-editor-logic';
import {localize} from '../utils/localize';
import {LabelPosition} from '../components/ha-selector/types';
import {resolveLayoutFormat} from '../core/layout-format';

/**
 * Compact spacing editor used in Home Assistant's standard card dialog.
 * Widget placement and configuration live in the card's in-place editor, which
 * avoids duplicating a second large WYSIWYG canvas beside HA's own preview.
 */
@customElement('layout-editor')
export class LayoutEditor extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config: WallClockConfig = {};
    @property({type: Boolean}) inspector = false;

    /** Uncommitted text stays local so partial CSS values survive HA re-renders. */
    @state() private spacingDraft: Partial<Record<keyof SpacingConfig, string>> = {};
    @state() private spacingErrors: Partial<Record<keyof SpacingConfig, string>> = {};

    private t(key: string, fallback: string): string {
        return localize(key, this.hass, fallback);
    }

    private get v3(): WallClockConfigV3 {
        return migrateToLayout(this.config);
    }

    private get layout(): LayoutConfig {
        return this.v3.layout;
    }

    static get styles(): CSSResult {
        return css`
            .content {
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding: 12px;
            }

            .section-title {
                margin: 2px 0 -4px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.73rem;
                font-weight: 750;
                letter-spacing: 0.06em;
                text-transform: uppercase;
            }

            .section-group {
                padding-top: 6px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }

            .hint {
                margin: 0 0 12px;
                font-size: 0.85rem;
                opacity: 0.7;
            }

            .field-help {
                margin: -6px 0 10px;
                font-size: 0.75rem;
                opacity: 0.62;
            }

            .field-error {
                margin: -6px 0 10px;
                color: var(--error-color, #db4437);
                font-size: 0.75rem;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }
        `;
    }

    private emitLayout(layout: LayoutConfig): void {
        fireEvent(this, 'config-changed', {config: {...this.v3, layout}});
    }

    private get spacingPresetValue(): string {
        const spacing = this.layout.spacing;
        if (spacing === undefined) return 'normal';
        return typeof spacing === 'string' ? spacing : 'custom';
    }

    private handleSpacingPresetChanged(value: string): void {
        this.spacingDraft = {};
        this.spacingErrors = {};
        if (value === 'custom') {
            this.emitLayout(setSpacing(this.layout, {...resolveSpacing(this.layout)}));
        } else if (value === 'normal') {
            this.emitLayout(setSpacing(this.layout, undefined));
        } else {
            this.emitLayout(setSpacing(this.layout, value as SpacingPreset));
        }
    }

    private handleFormatChanged(value: string): void {
        const format = value as LayoutFormat;
        let layout = setLayoutFormat(this.layout, format);
        if (format === 'grid-3x3') {
            layout = setLayoutVisualPreset(layout, 'none');
        }
        this.emitLayout(layout);
    }

    private handleVisualPresetChanged(value: string): void {
        this.emitLayout(setLayoutVisualPreset(this.layout, value as LayoutVisualPreset));
    }

    private renderFormat(): TemplateResult {
        const format = resolveLayoutFormat(this.layout);
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'grid-3x3', label: this.t('layout.format_grid', 'Grid 3 × 3')},
                        {value: 'vertical-2-1', label: this.t('layout.format_vertical_2_1', 'Vertical 2/3 + 1/3')},
                        {value: 'vertical-1-2', label: this.t('layout.format_vertical_1_2', 'Vertical 1/3 + 2/3')},
                        {value: 'horizontal-2-1', label: this.t('layout.format_horizontal_2_1', 'Horizontal 2/3 + 1/3')},
                        {value: 'horizontal-1-2', label: this.t('layout.format_horizontal_1_2', 'Horizontal 1/3 + 2/3')},
                    ], mode: 'dropdown'}}}
                    .value=${format}
                    .label=${this.t('layout.format', 'Layout format')}
                    .labelPosition=${this.inspector ? LabelPosition.Top : LabelPosition.Left}
                    @value-changed=${(ev: CustomEvent) => this.handleFormatChanged(ev.detail.value)}
            ></ha-row-selector>
            <div class="field-help">
                ${this.t('layout.format_help', 'Changes the canvas geometry; widgets keep their current zones and settings.')}
            </div>
            ${format !== 'grid-3x3' ? html`
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select: {options: [
                            {value: 'none', label: this.t('layout.preset_none', 'No visual preset')},
                            {value: 'glass', label: this.t('layout.preset_glass', 'Glass information panel')},
                        ], mode: 'dropdown'}}}
                        .value=${this.layout.preset ?? 'none'}
                        .label=${this.t('layout.visual_preset', 'Visual preset')}
                        .labelPosition=${this.inspector ? LabelPosition.Top : LabelPosition.Left}
                        @value-changed=${(ev: CustomEvent) => this.handleVisualPresetChanged(ev.detail.value)}
                ></ha-row-selector>
                <div class="field-help">
                    ${this.t('layout.preset_help', 'Presets only style the layout and never change entities, actions, or widget placement.')}
                </div>
            ` : ''}
        `;
    }

    private handleSpacingDraftChanged(key: keyof SpacingConfig, value: string): void {
        this.spacingDraft = {...this.spacingDraft, [key]: value};
        if (this.spacingErrors[key]) {
            const errors = {...this.spacingErrors};
            delete errors[key];
            this.spacingErrors = errors;
        }
    }

    private commitSpacingValue(key: keyof SpacingConfig): void {
        const draft = this.spacingDraft[key];
        if (draft === undefined) return;
        const value = draft.trim().replace(/\s+/g, ' ');
        if (value !== '' && !isValidSpacingValue(key, value)) {
            this.spacingErrors = {
                ...this.spacingErrors,
                [key]: key === 'padding'
                    ? this.t('spacing.invalid_padding', 'Use 1–4 CSS lengths, for example: 60px 60px 60px 16px.')
                    : this.t('spacing.invalid_length', 'Use one CSS length, for example: 16px.'),
            };
            return;
        }

        const drafts = {...this.spacingDraft};
        delete drafts[key];
        this.spacingDraft = drafts;
        const errors = {...this.spacingErrors};
        delete errors[key];
        this.spacingErrors = errors;

        const current = typeof this.layout.spacing === 'object' ? this.layout.spacing : {};
        const next: SpacingConfig = {...current};
        if (value === '') delete next[key];
        else next[key] = value;
        this.emitLayout(setSpacing(this.layout, next));
    }

    private renderSpacingField(
        key: keyof SpacingConfig,
        label: string,
        help: string,
        resolved: Required<SpacingConfig>,
    ): TemplateResult {
        const commitOnEnter = (ev: KeyboardEvent) => {
            if (ev.key === 'Enter') this.commitSpacingValue(key);
        };
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{text: {}}}
                    .value=${this.spacingDraft[key] ?? resolved[key]}
                    .label=${label}
                    .labelPosition=${this.inspector ? LabelPosition.Top : LabelPosition.Left}
                    @value-changed=${(ev: CustomEvent) => this.handleSpacingDraftChanged(key, ev.detail.value)}
                    @focusout=${() => this.commitSpacingValue(key)}
                    @keydown=${commitOnEnter}
            ></ha-row-selector>
            ${this.spacingErrors[key]
                ? html`<div class="field-error">${this.spacingErrors[key]}</div>`
                : html`<div class="field-help">${help}</div>`}
        `;
    }

    private renderSpacing(): TemplateResult {
        const resolved = resolveSpacing(this.layout);
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'compact', label: this.t('spacing.compact', 'Compact')},
                        {value: 'normal', label: this.t('spacing.normal', 'Normal')},
                        {value: 'spacious', label: this.t('spacing.spacious', 'Spacious')},
                        {value: 'custom', label: this.t('spacing.custom', 'Custom')},
                    ], mode: 'dropdown'}}}
                    .value=${this.spacingPresetValue}
                    .label=${this.t('spacing.preset', 'Spacing preset')}
                    .labelPosition=${this.inspector ? LabelPosition.Top : LabelPosition.Left}
                    @value-changed=${(ev: CustomEvent) => this.handleSpacingPresetChanged(ev.detail.value)}
            ></ha-row-selector>
            ${this.spacingPresetValue === 'custom' ? html`
                ${this.renderSpacingField(
                    'padding',
                    this.t('spacing.card_padding', 'Card padding'),
                    this.t('spacing.card_padding_help', '1–4 values: top, right, bottom, left. Example: 60px 60px 60px 16px.'),
                    resolved,
                )}
                ${this.renderSpacingField('zoneGap', this.t('spacing.zone_gap', 'Zone gap'), this.t('spacing.zone_gap_help', 'One value, for example: 24px.'), resolved)}
                ${this.renderSpacingField('widgetGap', this.t('spacing.widget_gap', 'Widget gap'), this.t('spacing.widget_gap_help', 'One value, for example: 16px.'), resolved)}
            ` : ''}
        `;
    }

    render(): TemplateResult {
        if (!this.hass) return html``;
        return html`
            <div class="content">
                ${!this.config.layout ? html`
                    <p class="hint">${this.t('spacing.legacy_hint', 'The first spacing change converts this legacy configuration to the zone format.')}</p>
                ` : ''}
                <div class="section-title">${this.t('layout.structure', 'Layout structure')}</div>
                <div class="section-group">${this.renderFormat()}</div>
                <div class="section-title">${this.t('general.spacing', 'Spacing')}</div>
                <div class="section-group">${this.renderSpacing()}</div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'layout-editor': LayoutEditor;
    }
}

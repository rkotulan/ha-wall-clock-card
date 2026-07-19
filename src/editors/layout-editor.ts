import {css, CSSResult, html, LitElement, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {fireEvent, HomeAssistant} from 'custom-card-helpers';
import {WallClockConfig} from '../core/types';
import {
    LayoutConfig,
    SpacingConfig,
    SpacingPreset,
    WallClockConfigV3,
    ZoneId,
} from '../core/layout-types';
import {migrateToLayout, resolveSpacing} from '../core/migrate-config';
import {WidgetRegistry} from '../widgets/widget-registry';
import {setSpacing, updateWidgetAt, updateZoneSettings} from './layout-editor-logic';
import {fromEditorConfig, toEditorConfig} from './widget-editor-adapters';
import {WidgetSelection, ZONE_LABELS} from './zone-overlay';
import './zone-overlay';

type PreviewCardElement = HTMLElement & {hass?: HomeAssistant; setConfig?: (c: unknown) => void};

/**
 * Visual zone layout editor for the edit dialog: a live card canvas with the
 * wcc-zone-overlay on top (drag & drop, palette), spacing settings, and
 * per-widget detail editing that reuses the existing section editors through
 * adapters.
 *
 * Works on the migrated v3 shape; the first change emits the full v3 config
 * (the agreed auto-conversion of legacy configurations).
 */
@customElement('layout-editor')
export class LayoutEditor extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config: WallClockConfig = {};

    @state() private selectedWidget: WidgetSelection | null = null;
    @state() private selectedZone: ZoneId | null = null;

    private widgetEditorCache: Map<string, HTMLElement> = new Map();

    // Live card rendered under the zone overlay (WYSIWYG canvas). Created by tag
    // name to avoid an import cycle with wall-clock-card.
    private previewCard?: PreviewCardElement;
    private previewCardConfigJson = '';

    private get v3(): WallClockConfigV3 {
        return migrateToLayout(this.config);
    }

    private get layout(): LayoutConfig {
        return this.v3.layout;
    }

    static get styles(): CSSResult {
        return css`
            .content {
                padding: 12px;
            }

            .hint {
                font-size: 0.85rem;
                opacity: 0.7;
                margin: 0 0 12px;
            }

            /* WYSIWYG canvas: the live card renders underneath, the zone overlay
               lies transparently on top — editing happens "on the card". */
            .wysiwyg {
                position: relative;
                margin-bottom: 12px;
                border-radius: 8px;
                overflow: hidden;
            }

            .wysiwyg .canvas-card {
                display: block;
                width: 100%;
                pointer-events: none;
            }

            .wysiwyg wcc-zone-overlay {
                position: absolute;
                inset: 0;
            }

            .detail {
                border-top: 1px solid var(--divider-color, #666);
                padding-top: 8px;
                margin-top: 4px;
            }

            .detail-title {
                font-weight: 500;
                margin-bottom: 4px;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }
        `;
    }

    // ---------------------------------------------------------------- emit

    private emitLayout(layout: LayoutConfig): void {
        this.emitConfig({...this.v3, layout});
    }

    private emitConfig(config: WallClockConfigV3): void {
        fireEvent(this, 'config-changed', {config});
    }

    // ---------------------------------------------------------------- spacing

    private get spacingPresetValue(): string {
        const spacing = this.layout.spacing;
        if (spacing === undefined) return 'normal';
        return typeof spacing === 'string' ? spacing : 'custom';
    }

    private handleSpacingPresetChanged(value: string): void {
        if (value === 'custom') {
            // Start the custom values from the effective resolved spacing
            this.emitLayout(setSpacing(this.layout, {...resolveSpacing(this.layout)}));
        } else if (value === 'normal') {
            this.emitLayout(setSpacing(this.layout, undefined));
        } else {
            this.emitLayout(setSpacing(this.layout, value as SpacingPreset));
        }
    }

    private handleSpacingValueChanged(key: keyof SpacingConfig, value: string): void {
        const current = typeof this.layout.spacing === 'object' ? this.layout.spacing : {};
        this.emitLayout(setSpacing(this.layout, {...current, [key]: value}));
    }

    // ---------------------------------------------------------------- widget detail

    private getWidgetEditorElement(editorTag: string): HTMLElement {
        let element = this.widgetEditorCache.get(editorTag);
        if (!element) {
            element = document.createElement(editorTag);
            element.addEventListener('config-changed', event => {
                // Keep the pseudo-config event from bubbling into the main editor
                event.stopPropagation();
                this.handleWidgetEditorChanged((event as CustomEvent).detail.config);
            });
            this.widgetEditorCache.set(editorTag, element);
        }
        return element;
    }

    private handleWidgetEditorChanged(editorConfig: Record<string, unknown>): void {
        const selection = this.selectedWidget;
        const widget = selection && this.layout.zones[selection.zone]?.widgets[selection.index];
        if (!selection || !widget) {
            return;
        }
        const updated = fromEditorConfig(widget, editorConfig);
        this.emitLayout(updateWidgetAt(this.layout, selection.zone, selection.index, updated));
    }

    // ---------------------------------------------------------------- render

    /** The live card behind the zone overlay; config applied only when it changed. */
    private getPreviewCard(): HTMLElement | undefined {
        if (!customElements.get('wall-clock-card')) {
            return undefined;
        }
        if (!this.previewCard) {
            this.previewCard = document.createElement('wall-clock-card') as PreviewCardElement;
            this.previewCard.classList.add('canvas-card');
        }
        this.previewCard.hass = this.hass;
        const configJson = JSON.stringify(this.v3);
        if (configJson !== this.previewCardConfigJson) {
            this.previewCardConfigJson = configJson;
            this.previewCard.setConfig?.(JSON.parse(configJson));
        }
        return this.previewCard;
    }

    private renderSpacing(): TemplateResult {
        const resolved = resolveSpacing(this.layout);
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        select: {
                            options: [
                                {value: 'compact', label: 'Compact'},
                                {value: 'normal', label: 'Normal'},
                                {value: 'spacious', label: 'Spacious'},
                                {value: 'custom', label: 'Custom'},
                            ],
                            mode: 'dropdown'
                        }
                    }}
                    .value=${this.spacingPresetValue}
                    .label=${'Spacing'}
                    @value-changed=${(ev: CustomEvent) => this.handleSpacingPresetChanged(ev.detail.value)}
            ></ha-row-selector>
            ${this.spacingPresetValue === 'custom' ? html`
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text: {}}} .value=${resolved.padding}
                        .label=${'Card padding — 1-4 values: top right bottom left (e.g., 16px or 8px 16px 24px 16px)'}
                        @value-changed=${(ev: CustomEvent) => this.handleSpacingValueChanged('padding', ev.detail.value)}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text: {}}} .value=${resolved.zoneGap}
                        .label=${'Zone gap (e.g., 16px)'}
                        @value-changed=${(ev: CustomEvent) => this.handleSpacingValueChanged('zoneGap', ev.detail.value)}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text: {}}} .value=${resolved.widgetGap}
                        .label=${'Widget gap (e.g., 8px)'}
                        @value-changed=${(ev: CustomEvent) => this.handleSpacingValueChanged('widgetGap', ev.detail.value)}
                ></ha-row-selector>
            ` : ''}
        `;
    }

    private renderZoneDetail(zone: ZoneId): TemplateResult {
        const zoneConfig = this.layout.zones[zone];
        if (!zoneConfig) {
            return html``;
        }
        const update = (settings: Record<string, unknown>) =>
            this.emitLayout(updateZoneSettings(this.layout, zone, settings));
        return html`
            <div class="detail">
                <div class="detail-title">Zone: ${ZONE_LABELS[zone]}</div>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: [
                                    {value: 'stack', label: 'Stack (show all widgets)'},
                                    {value: 'exclusive', label: 'Exclusive (highest-priority active widget)'},
                                ],
                                mode: 'dropdown'
                            }
                        }}
                        .value=${zoneConfig.mode ?? 'stack'}
                        .label=${'Mode'}
                        @value-changed=${(ev: CustomEvent) =>
                            update({mode: ev.detail.value === 'stack' ? undefined : ev.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: [
                                    {value: 'column', label: 'Column'},
                                    {value: 'row', label: 'Row'},
                                ],
                                mode: 'dropdown'
                            }
                        }}
                        .value=${zoneConfig.direction ?? 'column'}
                        .label=${'Direction'}
                        @value-changed=${(ev: CustomEvent) =>
                            update({direction: ev.detail.value === 'column' ? undefined : ev.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text: {}}} .value=${zoneConfig.gap ?? ''}
                        .label=${'Widget gap override (e.g., 4px)'}
                        @value-changed=${(ev: CustomEvent) => update({gap: ev.detail.value})}
                ></ha-row-selector>
                <ha-row-selector
                        .hass=${this.hass} .selector=${{text: {}}} .value=${zoneConfig.padding ?? ''}
                        .label=${'Zone padding (e.g., 0 16px)'}
                        @value-changed=${(ev: CustomEvent) => update({padding: ev.detail.value})}
                ></ha-row-selector>
            </div>
        `;
    }

    private renderWidgetDetail(selection: WidgetSelection): TemplateResult {
        const widget = this.layout.zones[selection.zone]?.widgets[selection.index];
        if (!widget) {
            return html``;
        }
        const plugin = WidgetRegistry.getInstance().getWidget(widget.type);
        if (!plugin?.editorTag) {
            return html`
                <div class="detail">
                    <div class="detail-title">${plugin?.name ?? widget.type}</div>
                    <p class="hint">This widget has no settings.</p>
                </div>
            `;
        }
        const editor = this.getWidgetEditorElement(plugin.editorTag) as HTMLElement & {
            hass?: HomeAssistant;
            config?: unknown;
        };
        editor.hass = this.hass;
        editor.config = toEditorConfig(widget);
        return html`
            <div class="detail">
                <div class="detail-title">${plugin.name} <span style="opacity:0.5">(${ZONE_LABELS[selection.zone]})</span></div>
                ${editor}
            </div>
        `;
    }

    render(): TemplateResult {
        if (!this.hass) {
            return html``;
        }
        return html`
            <div class="content">
                ${!this.config.layout ? html`
                    <p class="hint">This card still uses the legacy configuration. The first layout
                        change converts it to the new zone format automatically.</p>
                ` : ''}
                ${this.renderSpacing()}
                <div class="wysiwyg">
                    ${this.getPreviewCard()}
                    <wcc-zone-overlay
                            .hass=${this.hass}
                            .layout=${this.layout}
                            .selectedWidget=${this.selectedWidget}
                            .selectedZone=${this.selectedZone}
                            selectable
                            @layout-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.selectedWidget = null;
                                this.emitLayout(ev.detail.layout);
                            }}
                            @wcc-widget-selected=${(ev: CustomEvent) => {
                                this.selectedZone = null;
                                const {zone, index} = ev.detail;
                                this.selectedWidget = this.selectedWidget?.zone === zone && this.selectedWidget?.index === index
                                    ? null : {zone, index};
                            }}
                            @wcc-zone-selected=${(ev: CustomEvent) => {
                                this.selectedWidget = null;
                                this.selectedZone = this.selectedZone === ev.detail.zone ? null : ev.detail.zone;
                            }}
                    ></wcc-zone-overlay>
                </div>
                ${this.selectedZone ? this.renderZoneDetail(this.selectedZone) : ''}
                ${this.selectedWidget ? this.renderWidgetDetail(this.selectedWidget) : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'layout-editor': LayoutEditor;
    }
}

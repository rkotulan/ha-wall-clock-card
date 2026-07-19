import {css, CSSResult, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {fireEvent, HomeAssistant} from 'custom-card-helpers';
import Sortable, {SortableEvent} from 'sortablejs';
import {WallClockConfig} from '../core/types';
import {
    LayoutConfig,
    SpacingConfig,
    SpacingPreset,
    WallClockConfigV3,
    WidgetConfig,
    ZoneId,
    ZONE_IDS,
} from '../core/layout-types';
import {migrateToLayout, resolveSpacing} from '../core/migrate-config';
import {WidgetRegistry} from '../widgets/widget-registry';
import {
    addWidget,
    moveWidget,
    removeWidget,
    setSpacing,
    updateWidgetAt,
    updateZoneSettings,
} from './layout-editor-logic';
import {fromEditorConfig, toEditorConfig} from './widget-editor-adapters';

const MDI_CLOSE_PATH = 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z';

const ZONE_LABELS: Record<ZoneId, string> = {
    'top-left': 'Top left', 'top-center': 'Top center', 'top-right': 'Top right',
    'middle-left': 'Left', 'center': 'Center', 'middle-right': 'Right',
    'bottom-left': 'Bottom left', 'bottom-center': 'Bottom center', 'bottom-right': 'Bottom right',
};

interface WidgetSelection {
    zone: ZoneId;
    index: number;
}

type PreviewCardElement = HTMLElement & {hass?: HomeAssistant; setConfig?: (c: unknown) => void};

/**
 * Visual zone layout editor: a 3×3 grid preview with drag & drop (SortableJS)
 * between zones, a widget palette, spacing settings, and per-widget detail
 * editing that reuses the existing section editors through adapters.
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

    private sortables: Sortable[] = [];
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

            /* WYSIWYG canvas: the live card renders underneath, the zone grid
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

            .zone-grid {
                display: grid;
                grid-template-columns: 1fr 1.2fr 1fr;
                grid-template-rows: 1fr 1.2fr 1fr;
                gap: 6px;
                position: absolute;
                inset: 0;
                padding: 6px;
                box-sizing: border-box;
            }

            .zone-cell {
                border: 1px dashed rgba(255, 255, 255, 0.35);
                border-radius: 8px;
                padding: 4px 6px 6px;
                min-width: 0;
                min-height: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .zone-cell:hover {
                border-color: rgba(255, 255, 255, 0.7);
                background-color: rgba(0, 0, 0, 0.15);
            }

            .zone-cell.selected {
                border-color: var(--primary-color, #03a9f4);
                border-style: solid;
            }

            .zone-label {
                font-size: 0.7rem;
                color: #fff;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
                opacity: 0.75;
                cursor: pointer;
                margin-bottom: 4px;
                user-select: none;
            }

            .zone-label:hover {
                opacity: 1;
            }

            .zone-grid .chip {
                background-color: rgba(0, 0, 0, 0.65);
                color: #fff;
            }

            .zone-list {
                display: flex;
                flex-direction: column;
                gap: 4px;
                flex: 1;
                min-height: 24px;
            }

            .chip {
                display: flex;
                align-items: center;
                gap: 6px;
                border-radius: 6px;
                padding: 2px 4px 2px 8px;
                font-size: 0.85rem;
                background-color: var(--secondary-background-color, rgba(127, 127, 127, 0.2));
                cursor: grab;
                user-select: none;
                min-width: 0;
            }

            .chip span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            .chip ha-icon {
                --mdc-icon-size: 16px;
                flex-shrink: 0;
            }

            .chip ha-icon-button {
                --mdc-icon-button-size: 24px;
                --mdc-icon-size: 14px;
                flex-shrink: 0;
            }

            .chip.selected {
                outline: 2px solid var(--primary-color, #03a9f4);
            }

            .chip.sortable-ghost {
                opacity: 0.4;
            }

            .palette {
                margin-bottom: 12px;
            }

            .palette-title {
                font-size: 0.8rem;
                opacity: 0.7;
                margin-bottom: 6px;
            }

            .palette-list {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }

            .palette-list .chip {
                border: 1px solid var(--divider-color, #666);
                background: none;
                padding: 4px 10px;
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

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.destroySortables();
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.rebuildSortables();
    }

    // ---------------------------------------------------------------- emit

    private emitLayout(layout: LayoutConfig): void {
        this.emitConfig({...this.v3, layout});
    }

    private emitConfig(config: WallClockConfigV3): void {
        fireEvent(this, 'config-changed', {config});
    }

    // ---------------------------------------------------------------- drag & drop

    private destroySortables(): void {
        this.sortables.forEach(sortable => sortable.destroy());
        this.sortables = [];
    }

    private rebuildSortables(): void {
        this.destroySortables();
        this.shadowRoot?.querySelectorAll<HTMLElement>('.zone-list').forEach(list => {
            this.sortables.push(new Sortable(list, {
                group: 'wcc-widgets',
                animation: 150,
                draggable: '.chip',
                onEnd: evt => this.handleDragEnd(evt),
            }));
        });
        const palette = this.shadowRoot?.querySelector<HTMLElement>('.palette-list');
        if (palette) {
            this.sortables.push(new Sortable(palette, {
                group: {name: 'wcc-widgets', pull: 'clone', put: false},
                sort: false,
                animation: 150,
                draggable: '.chip',
                onEnd: evt => this.handlePaletteDrop(evt),
            }));
        }
    }

    /** Puts the dragged node back where it came from: after the state update Lit
     * re-renders the lists and must find the DOM exactly as it left it. */
    private revertDragDom(evt: SortableEvent): void {
        const from = evt.from;
        const reference = from.children[evt.oldIndex ?? 0] ?? null;
        if (evt.item.parentElement !== from || evt.oldIndex !== evt.newIndex) {
            from.insertBefore(evt.item, reference);
        }
    }

    private handleDragEnd(evt: SortableEvent): void {
        const fromZone = (evt.from as HTMLElement).dataset.zone as ZoneId | undefined;
        const toZone = (evt.to as HTMLElement).dataset.zone as ZoneId | undefined;
        this.revertDragDom(evt);
        if (!fromZone || !toZone || evt.oldIndex == null || evt.newIndex == null) {
            return;
        }
        if (fromZone === toZone && evt.oldIndex === evt.newIndex) {
            return;
        }
        this.selectedWidget = null;
        this.emitLayout(moveWidget(this.layout, fromZone, evt.oldIndex, toZone, evt.newIndex));
    }

    private handlePaletteDrop(evt: SortableEvent): void {
        const toZone = (evt.to as HTMLElement).dataset.zone as ZoneId | undefined;
        const widgetType = evt.item.dataset.widgetType;
        // The dragged original lands in the target list as alien DOM — remove it;
        // the real chip is rendered by Lit after the state update.
        if (evt.item.parentElement !== evt.from) {
            evt.item.remove();
        }
        if (!toZone || !widgetType) {
            return;
        }
        const plugin = WidgetRegistry.getInstance().getWidget(widgetType);
        if (!plugin) {
            return;
        }
        this.emitLayout(addWidget(this.layout, toZone, plugin.defaultConfig(), evt.newIndex ?? undefined));
    }

    // ---------------------------------------------------------------- actions

    private selectWidget(zone: ZoneId, index: number): void {
        this.selectedZone = null;
        this.selectedWidget = this.selectedWidget?.zone === zone && this.selectedWidget?.index === index
            ? null
            : {zone, index};
    }

    private selectZone(zone: ZoneId): void {
        this.selectedWidget = null;
        this.selectedZone = this.selectedZone === zone ? null : zone;
    }

    private removeWidgetAt(zone: ZoneId, index: number): void {
        this.selectedWidget = null;
        this.emitLayout(removeWidget(this.layout, zone, index));
    }

    private addFromPaletteClick(widgetType: string): void {
        const plugin = WidgetRegistry.getInstance().getWidget(widgetType);
        if (!plugin) {
            return;
        }
        const target: ZoneId = this.selectedZone ?? 'center';
        this.emitLayout(addWidget(this.layout, target, plugin.defaultConfig()));
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

    private renderChip(zone: ZoneId, widget: WidgetConfig, index: number): TemplateResult {
        const plugin = WidgetRegistry.getInstance().getWidget(widget.type);
        const selected = this.selectedWidget?.zone === zone && this.selectedWidget?.index === index;
        return html`
            <div class="chip ${selected ? 'selected' : ''}"
                 data-zone=${zone} data-index=${index}
                 @click=${() => this.selectWidget(zone, index)}>
                <ha-icon .icon=${plugin?.icon ?? 'mdi:puzzle'}></ha-icon>
                <span>${plugin?.name ?? widget.type}</span>
                <ha-icon-button
                        .path=${MDI_CLOSE_PATH}
                        title="Remove"
                        @click=${(ev: Event) => {
                            ev.stopPropagation();
                            this.removeWidgetAt(zone, index);
                        }}
                ></ha-icon-button>
            </div>
        `;
    }

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

    private renderZoneCell(zone: ZoneId): TemplateResult {
        const zoneConfig = this.layout.zones[zone];
        return html`
            <div class="zone-cell ${this.selectedZone === zone ? 'selected' : ''}">
                <span class="zone-label" @click=${() => this.selectZone(zone)}>
                    ${ZONE_LABELS[zone]}${zoneConfig?.mode === 'exclusive' ? ' ⇄' : ''}
                </span>
                <div class="zone-list" data-zone=${zone}>
                    ${(zoneConfig?.widgets ?? []).map((widget, index) => this.renderChip(zone, widget, index))}
                </div>
            </div>
        `;
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
        const registry = WidgetRegistry.getInstance();
        return html`
            <div class="content">
                ${!this.config.layout ? html`
                    <p class="hint">This card still uses the legacy configuration. The first layout
                        change converts it to the new zone format automatically.</p>
                ` : ''}
                ${this.renderSpacing()}
                <div class="wysiwyg">
                    ${this.getPreviewCard()}
                    <div class="zone-grid">
                        ${ZONE_IDS.map(zone => this.renderZoneCell(zone))}
                    </div>
                </div>
                <div class="palette">
                    <div class="palette-title">Widgets — drag into a zone, or click to add to the ${this.selectedZone ? ZONE_LABELS[this.selectedZone] : 'Center'} zone</div>
                    <div class="palette-list">
                        ${registry.getAllWidgets().map(plugin => html`
                            <div class="chip" data-widget-type=${plugin.widgetId}
                                 title=${plugin.description ?? ''}
                                 @click=${() => this.addFromPaletteClick(plugin.widgetId)}>
                                <ha-icon .icon=${plugin.icon}></ha-icon>
                                <span>${plugin.name}</span>
                            </div>
                        `)}
                    </div>
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

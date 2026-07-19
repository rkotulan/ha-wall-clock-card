import {css, CSSResult, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import Sortable, {SortableEvent} from 'sortablejs';
import {LayoutConfig, WidgetConfig, ZoneId, ZONE_IDS} from '../core/layout-types';
import {WidgetRegistry} from '../widgets/widget-registry';
import {addWidget, moveWidget, removeWidget} from './layout-editor-logic';

const MDI_CLOSE_PATH = 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z';

export const ZONE_LABELS: Record<ZoneId, string> = {
    'top-left': 'Top left', 'top-center': 'Top center', 'top-right': 'Top right',
    'middle-left': 'Left', 'center': 'Center', 'middle-right': 'Right',
    'bottom-left': 'Bottom left', 'bottom-center': 'Bottom center', 'bottom-right': 'Bottom right',
};

export interface WidgetSelection {
    zone: ZoneId;
    index: number;
}

/**
 * Transparent zone grid + widget palette meant to lie over a live card:
 * drag & drop between zones (SortableJS), add from the palette, remove chips.
 * Used by the dialog layout editor and by the card's in-place edit mode.
 *
 * Events (bubbling, composed):
 *  - 'layout-changed'  detail: {layout}
 *  - 'wcc-widget-selected' detail: {zone, index}
 *  - 'wcc-zone-selected'   detail: {zone}
 */
@customElement('wcc-zone-overlay')
export class WccZoneOverlay extends LitElement {
    @property({attribute: false}) layout: LayoutConfig = {zones: {}};
    @property({attribute: false}) selectedWidget: WidgetSelection | null = null;
    @property({attribute: false}) selectedZone: ZoneId | null = null;
    /** Whether clicking chips/zone labels emits selection events (dialog mode). */
    @property({type: Boolean}) selectable = false;

    private sortables: Sortable[] = [];

    /** Exact pre-drag position of the dragged node, captured in onStart. Reverting
     * via children[oldIndex] is NOT safe: it ignores Lit's comment markers and can
     * re-insert the node outside the part range, leaving a chip Lit cannot remove. */
    private dragOrigin?: {parent: Node; next: Node | null};

    static get styles(): CSSResult {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }

            .zone-grid {
                display: grid;
                grid-template-columns: 1fr 1.2fr 1fr;
                grid-template-rows: 1fr 1.2fr 1fr;
                gap: 6px;
                flex: 1;
                min-height: 0;
                padding: 6px;
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
                background-color: rgba(0, 0, 0, 0.65);
                color: #fff;
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
                display: flex;
                align-items: center;
                gap: 6px;
                flex-wrap: wrap;
                padding: 6px 8px;
                background-color: rgba(0, 0, 0, 0.55);
            }

            .palette-title {
                font-size: 0.75rem;
                color: #fff;
                opacity: 0.75;
                margin-right: 4px;
            }

            .palette .chip {
                border: 1px solid rgba(255, 255, 255, 0.4);
                background-color: rgba(0, 0, 0, 0.4);
                padding: 3px 10px;
            }
        `;
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.destroySortables();
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        // Rebuild only when the zone lists' DOM actually changed — rebuilding on
        // every render would destroy an in-progress drag (e.g. on a hass tick).
        if (changedProperties.has('layout') || this.sortables.length === 0) {
            this.rebuildSortables();
        }
    }

    // ---------------------------------------------------------------- events

    private emitLayout(layout: LayoutConfig): void {
        this.dispatchEvent(new CustomEvent('layout-changed', {
            detail: {layout}, bubbles: true, composed: true,
        }));
    }

    private emitSelection(type: 'wcc-widget-selected' | 'wcc-zone-selected', detail: object): void {
        if (!this.selectable) {
            return;
        }
        this.dispatchEvent(new CustomEvent(type, {detail, bubbles: true, composed: true}));
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
                onStart: evt => this.captureDragOrigin(evt),
                onEnd: evt => this.handleDragEnd(evt),
            }));
        });
        const palette = this.shadowRoot?.querySelector<HTMLElement>('.palette');
        if (palette) {
            this.sortables.push(new Sortable(palette, {
                group: {name: 'wcc-widgets', pull: 'clone', put: false},
                sort: false,
                animation: 150,
                draggable: '.chip',
                onStart: evt => this.captureDragOrigin(evt),
                onEnd: evt => this.handlePaletteDrop(evt),
            }));
        }
    }

    private captureDragOrigin(evt: SortableEvent): void {
        this.dragOrigin = {parent: evt.from, next: evt.item.nextSibling};
    }

    /** Puts the dragged node back exactly where it came from (marker-safe): after
     * the state update Lit re-renders the lists and must find the DOM as it left it. */
    private revertDragDom(evt: SortableEvent): void {
        const origin = this.dragOrigin;
        this.dragOrigin = undefined;
        if (origin) {
            origin.parent.insertBefore(evt.item, origin.next);
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
        this.emitLayout(moveWidget(this.layout, fromZone, evt.oldIndex, toZone, evt.newIndex));
    }

    private handlePaletteDrop(evt: SortableEvent): void {
        const toZone = (evt.to as HTMLElement).dataset.zone as ZoneId | undefined;
        const widgetType = evt.item.dataset.widgetType;
        // Sortable leaves a clone (without Lit's event listeners) in the palette
        // and drops the original into the target list as alien DOM. Discard the
        // clone and put the original back — the real chip in the zone is
        // rendered by Lit after the state update.
        evt.clone?.remove();
        this.revertDragDom(evt);
        if (!toZone || !widgetType) {
            return;
        }
        const plugin = WidgetRegistry.getInstance().getWidget(widgetType);
        if (!plugin) {
            return;
        }
        this.emitLayout(addWidget(this.layout, toZone, plugin.defaultConfig(), evt.newIndex ?? undefined));
    }

    private addFromPaletteClick(widgetType: string): void {
        const plugin = WidgetRegistry.getInstance().getWidget(widgetType);
        if (!plugin) {
            return;
        }
        this.emitLayout(addWidget(this.layout, this.selectedZone ?? 'center', plugin.defaultConfig()));
    }

    // ---------------------------------------------------------------- render

    private renderChip(zone: ZoneId, widget: WidgetConfig, index: number): TemplateResult {
        const plugin = WidgetRegistry.getInstance().getWidget(widget.type);
        const selected = this.selectedWidget?.zone === zone && this.selectedWidget?.index === index;
        return html`
            <div class="chip ${selected ? 'selected' : ''}"
                 data-zone=${zone} data-index=${index}
                 @click=${() => this.emitSelection('wcc-widget-selected', {zone, index})}>
                <ha-icon .icon=${plugin?.icon ?? 'mdi:puzzle'}></ha-icon>
                <span>${plugin?.name ?? widget.type}</span>
                <ha-icon-button
                        .path=${MDI_CLOSE_PATH}
                        title="Remove"
                        @click=${(ev: Event) => {
                            ev.stopPropagation();
                            this.emitLayout(removeWidget(this.layout, zone, index));
                        }}
                ></ha-icon-button>
            </div>
        `;
    }

    private renderZoneCell(zone: ZoneId): TemplateResult {
        const zoneConfig = this.layout.zones[zone];
        return html`
            <div class="zone-cell ${this.selectedZone === zone ? 'selected' : ''}">
                <span class="zone-label" @click=${() => this.emitSelection('wcc-zone-selected', {zone})}>
                    ${ZONE_LABELS[zone]}${zoneConfig?.mode === 'exclusive' ? ' ⇄' : ''}
                </span>
                <div class="zone-list" data-zone=${zone}>
                    ${(zoneConfig?.widgets ?? []).map((widget, index) => this.renderChip(zone, widget, index))}
                </div>
            </div>
        `;
    }

    render(): TemplateResult {
        return html`
            <div class="zone-grid">
                ${ZONE_IDS.map(zone => this.renderZoneCell(zone))}
            </div>
            <div class="palette">
                <span class="palette-title">Widgets — drag into a zone, or click to add to ${this.selectedZone ? ZONE_LABELS[this.selectedZone] : 'Center'}</span>
                ${WidgetRegistry.getInstance().getAllWidgets().map(plugin => html`
                    <div class="chip" data-widget-type=${plugin.widgetId}
                         title=${plugin.description ?? ''}
                         @click=${() => this.addFromPaletteClick(plugin.widgetId)}>
                        <ha-icon .icon=${plugin.icon}></ha-icon>
                        <span>${plugin.name}</span>
                    </div>
                `)}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-zone-overlay': WccZoneOverlay;
    }
}

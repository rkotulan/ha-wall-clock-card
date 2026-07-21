import {css, CSSResult, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import Sortable, {SortableEvent} from 'sortablejs';
import {LayoutConfig, WidgetConfig, ZoneId, ZONE_IDS} from '../core/layout-types';
import {WidgetPlugin, WidgetRegistry} from '../widgets/widget-registry';
import {addWidget, hasWidgetType, moveWidget, removeWidget, uniqueWidgetId} from './layout-editor-logic';
import {localize} from '../utils/localize';

export const ZONE_LABELS: Record<ZoneId, string> = {
    'top-left': 'Top left', 'top-center': 'Top center', 'top-right': 'Top right',
    'middle-left': 'Left', 'center': 'Center', 'middle-right': 'Right',
    'bottom-left': 'Bottom left', 'bottom-center': 'Bottom center', 'bottom-right': 'Bottom right',
};

const PALETTE_GROUPS: {labelKey: string; fallback: string; widgetIds: string[]}[] = [
    {labelKey: 'designer.information', fallback: 'Information', widgetIds: ['sensors', 'weather', 'calendar', 'transportation']},
    {labelKey: 'designer.time', fallback: 'Time', widgetIds: ['clock', 'date']},
    {labelKey: 'designer.controls', fallback: 'Controls', widgetIds: ['action-bar']},
];

export interface WidgetSelection {
    zone: ZoneId;
    index: number;
    /** Stable identity used to keep the inspector attached after drag/reorder. */
    widgetId?: string;
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
    @property({attribute: false}) hass?: HomeAssistant;
    @property({attribute: false}) layout: LayoutConfig = {zones: {}};
    @property({attribute: false}) selectedWidget: WidgetSelection | null = null;
    @property({attribute: false}) selectedZone: ZoneId | null = null;
    /** Whether clicking chips/zone labels emits selection events (dialog mode). */
    @property({type: Boolean}) selectable = false;
    @state() private paletteQuery = '';

    private sortables: Sortable[] = [];
    private sortableElements: HTMLElement[] = [];
    private sortableSetupRevision = 0;

    private t(key: string, fallback: string, replacements: Record<string, string | number> = {}): string {
        return localize(key, this.hass, fallback, replacements);
    }

    private zoneLabel(zone: ZoneId): string {
        return this.t(`zones.${zone.replace(/-/g, '_')}`, ZONE_LABELS[zone]);
    }

    private widgetName(plugin: WidgetPlugin | undefined, widgetType: string): string {
        return this.t(`widgets.${widgetType.replace(/-/g, '_')}`, plugin?.name ?? widgetType);
    }

    /** Exact pre-drag position of the dragged node, captured in onStart. Reverting
     * via children[oldIndex] is NOT safe: it ignores Lit's comment markers and can
     * re-insert the node outside the part range, leaving a chip Lit cannot remove. */
    private dragOrigin?: {parent: Node; next: Node | null};

    static get styles(): CSSResult {
        return css`
            :host {
                display: grid;
                grid-template-columns: 188px minmax(0, 1fr);
                height: 100%;
                min-width: 0;
                min-height: 0;
                box-sizing: border-box;
                background:
                    radial-gradient(circle at 28% 15%, rgba(61, 69, 110, 0.24), transparent 46%),
                    linear-gradient(135deg, #191923, #211b21);
                color: #f2f3f7;
            }

            .zone-grid {
                grid-column: 2;
                grid-row: 1;
                display: grid;
                box-sizing: border-box;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                grid-template-rows: repeat(3, minmax(0, 1fr));
                gap: 10px;
                min-height: 0;
                min-width: 0;
                padding: 16px;
                overflow: hidden;
            }

            .zone-cell {
                position: relative;
                display: flex;
                flex-direction: column;
                min-width: 0;
                min-height: 0;
                padding: 20px 8px 8px;
                border: 1px dashed rgba(190, 194, 220, 0.25);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.012);
                overflow: visible;
                transition: border-color 120ms ease, background-color 120ms ease;
            }

            .zone-cell:hover {
                border-color: rgba(135, 181, 255, 0.55);
                background-color: rgba(64, 105, 180, 0.06);
            }

            .zone-cell.selected {
                border-color: var(--primary-color, #3b82f6);
                border-style: solid;
                background-color: color-mix(in srgb, var(--primary-color, #3b82f6) 7%, transparent);
            }

            .zone-label {
                position: absolute;
                top: 0;
                left: 10px;
                z-index: 1;
                max-width: calc(100% - 20px);
                padding: 1px 7px 2px;
                border-radius: 3px;
                background: #111116;
                color: #aeb3c5;
                font-size: 0.64rem;
                font-weight: 700;
                letter-spacing: 0.08em;
                line-height: 1.25;
                text-transform: uppercase;
                transform: translateY(-50%);
                cursor: pointer;
                user-select: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .zone-label:hover {
                color: #fff;
            }

            .zone-list {
                display: flex;
                flex-direction: column;
                gap: 6px;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding-top: 0;
            }

            .zone-list .chip {
                min-height: 36px;
                gap: 0;
                padding: 2px 5px 2px 2px;
                box-sizing: border-box;
                font-size: 0.85rem;
            }

            .zone-list .chip ha-icon {
                --mdc-icon-size: 18px;
            }

            .zone-list .chip-action {
                width: 28px;
                height: 28px;
            }

            .zone-list .drag-handle {
                width: 20px;
                height: 28px;
            }

            .chip {
                display: flex;
                align-items: center;
                gap: 4px;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                padding: 2px 4px;
                font-size: 0.85rem;
                background-color: rgba(9, 9, 13, 0.82);
                color: #f4f5f8;
                user-select: none;
                min-width: 0;
            }

            .chip-edit {
                display: flex;
                align-items: center;
                gap: 6px;
                min-width: 0;
                flex: 1;
                padding: 3px 4px;
                border: 0;
                color: inherit;
                background: transparent;
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .zone-list .chip-edit {
                gap: 8px;
                padding-left: 0;
            }

            .zone-list .chip-edit > ha-icon:first-child,
            .palette .chip > ha-icon:first-child {
                color: #e4c75a;
            }

            .zone-list .chip-edit > ha-icon:first-child {
                display: grid;
                place-items: center;
                width: 20px;
                flex: 0 0 20px;
            }

            .chip-edit span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
            }

            .chip ha-icon {
                --mdc-icon-size: 16px;
                flex-shrink: 0;
            }

            .drag-handle,
            .chip-action {
                display: grid;
                place-items: center;
                width: 26px;
                height: 26px;
                padding: 0;
                border: 0;
                border-radius: 4px;
                color: inherit;
                background: transparent;
                flex-shrink: 0;
            }

            .drag-handle {
                cursor: grab;
                opacity: 0.7;
            }

            .drag-handle:active {
                cursor: grabbing;
            }

            .chip-action {
                cursor: pointer;
                opacity: 0.75;
            }

            .chip-action:hover,
            .chip-edit:hover,
            .chip-action:focus-visible,
            .chip-edit:focus-visible {
                background-color: rgba(255, 255, 255, 0.14);
                opacity: 1;
                outline: none;
            }

            .chip.selected {
                border-color: var(--primary-color, #3b82f6);
                outline: 1px solid var(--primary-color, #3b82f6);
                background: color-mix(in srgb, var(--primary-color, #3b82f6) 28%, #11131a);
            }

            .chip.sortable-ghost {
                opacity: 0.28;
            }

            .palette {
                grid-column: 1;
                grid-row: 1;
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 7px;
                min-width: 0;
                min-height: 0;
                padding: 14px 10px;
                box-sizing: border-box;
                border-right: 1px solid rgba(255, 255, 255, 0.09);
                background: rgba(12, 12, 17, 0.94);
                overflow-x: hidden;
                overflow-y: auto;
            }

            .palette-title {
                margin: 0 4px 2px;
                color: #8f94a6;
                font-size: 0.68rem;
                font-weight: 800;
                letter-spacing: 0.1em;
                text-transform: uppercase;
            }

            .palette-search {
                position: relative;
                margin-bottom: 4px;
            }

            .palette-search ha-icon {
                position: absolute;
                top: 50%;
                left: 10px;
                z-index: 1;
                --mdc-icon-size: 16px;
                color: #7f8496;
                transform: translateY(-50%);
                pointer-events: none;
            }

            .palette-search input {
                width: 100%;
                height: 34px;
                padding: 0 10px 0 34px;
                box-sizing: border-box;
                border: 1px solid rgba(255, 255, 255, 0.13);
                border-radius: 8px;
                outline: none;
                background: #0d0e13;
                color: #f2f3f7;
                font: inherit;
                font-size: 0.8rem;
            }

            .palette-search input:focus {
                border-color: var(--primary-color, #3b82f6);
            }

            .palette-category {
                margin: 8px 4px 0;
                color: #696f81;
                font-size: 0.62rem;
                font-weight: 800;
                letter-spacing: 0.1em;
                text-transform: uppercase;
            }

            .palette .chip {
                width: 100%;
                min-height: 36px;
                padding: 4px 8px;
                box-sizing: border-box;
                background: rgba(255, 255, 255, 0.045);
                cursor: pointer;
            }

            .palette .chip:hover {
                border-color: rgba(104, 161, 255, 0.45);
                background: rgba(67, 111, 190, 0.12);
            }

            .palette .palette-name {
                min-width: 0;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .palette .drag-handle {
                margin-left: auto;
                color: #5f6473;
            }

            .palette .chip.unavailable {
                opacity: 0.32;
                cursor: not-allowed;
                filter: grayscale(1);
            }

            .empty-zone {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                min-height: 36px;
                color: #777b8c;
                font-size: 0.74rem;
                opacity: 0;
                pointer-events: none;
                transition: opacity 120ms ease;
            }

            .zone-cell:hover .empty-zone {
                opacity: 0.7;
            }

            @media (max-width: 1050px) {
                :host {
                    grid-template-columns: 164px minmax(0, 1fr);
                }

                .zone-grid {
                    gap: 7px;
                    padding: 12px;
                }
            }
        `;
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.sortableSetupRevision++;
        this.destroySortables();
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        // Bind after Lit and HA have settled the overlay. A synchronous setup
        // can target zone-list nodes replaced by the following parent render.
        this.scheduleSortableSetup(changedProperties.has('layout'));
    }

    // ---------------------------------------------------------------- events

    private emitLayout(layout: LayoutConfig, focusWidgetId?: string): void {
        this.dispatchEvent(new CustomEvent('layout-changed', {
            detail: {layout, focusWidgetId}, bubbles: true, composed: true,
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
        this.sortableElements = [];
    }

    private scheduleSortableSetup(force: boolean): void {
        const revision = ++this.sortableSetupRevision;
        void this.updateComplete.then(() => {
            requestAnimationFrame(() => {
                if (revision !== this.sortableSetupRevision || !this.isConnected) return;
                const elements = this.currentSortableElements();
                const matches = elements.length === this.sortableElements.length
                    && elements.every((element, index) => element === this.sortableElements[index]);
                if (force || !matches || this.sortables.length === 0) {
                    this.rebuildSortables(elements);
                }
            });
        });
    }

    private currentSortableElements(): HTMLElement[] {
        const zoneLists = Array.from(this.shadowRoot?.querySelectorAll<HTMLElement>('.zone-list') ?? []);
        const palette = this.shadowRoot?.querySelector<HTMLElement>('.palette');
        return palette ? [...zoneLists, palette] : zoneLists;
    }

    private rebuildSortables(elements = this.currentSortableElements()): void {
        this.destroySortables();
        const palette = elements.find(element => element.classList.contains('palette'));
        const zoneLists = elements.filter(element => element.classList.contains('zone-list'));
        zoneLists.forEach(list => {
            this.sortables.push(new Sortable(list, {
                group: 'wcc-widgets',
                animation: 150,
                draggable: '.chip:not(.unavailable)',
                handle: '.drag-handle',
                filter: '.chip-edit, .chip-action',
                preventOnFilter: true,
                onStart: evt => {
                    this.captureDragOrigin(evt);
                },
                onEnd: evt => {
                    this.handleDragEnd(evt);
                },
            }));
        });
        if (palette) {
            this.sortables.push(new Sortable(palette, {
                group: {name: 'wcc-widgets', pull: 'clone', put: false},
                sort: false,
                animation: 150,
                draggable: '.chip:not(.unavailable)',
                handle: '.drag-handle',
                onStart: evt => {
                    this.captureDragOrigin(evt);
                },
                onEnd: evt => {
                    this.handlePaletteDrop(evt);
                },
            }));
        }
        this.sortableElements = elements;
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
        if (!plugin || (plugin.singleton && hasWidgetType(this.layout, widgetType))) {
            return;
        }
        const widgetId = uniqueWidgetId(this.layout, widgetType);
        this.emitLayout(addWidget(this.layout, toZone, plugin.defaultConfig(), evt.newIndex ?? undefined), widgetId);
    }

    private addFromPaletteClick(widgetType: string): void {
        const plugin = WidgetRegistry.getInstance().getWidget(widgetType);
        if (!plugin || (plugin.singleton && hasWidgetType(this.layout, widgetType))) {
            return;
        }
        const zone = this.selectedZone ?? 'center';
        const widgetId = uniqueWidgetId(this.layout, widgetType);
        this.emitLayout(addWidget(this.layout, zone, plugin.defaultConfig()), widgetId);
    }

    private paletteGroups(): {label: string; plugins: WidgetPlugin[]}[] {
        const query = this.paletteQuery.trim().toLocaleLowerCase();
        const allPlugins = WidgetRegistry.getInstance().getAllWidgets();
        const knownIds = new Set(PALETTE_GROUPS.flatMap(group => group.widgetIds));
        const groups = [
            ...PALETTE_GROUPS.map(group => ({
                label: this.t(group.labelKey, group.fallback),
                plugins: group.widgetIds
                    .map(id => allPlugins.find(plugin => plugin.widgetId === id))
                    .filter((plugin): plugin is WidgetPlugin => plugin !== undefined),
            })),
            {label: this.t('designer.other', 'Other'), plugins: allPlugins.filter(plugin => !knownIds.has(plugin.widgetId))},
        ];
        return groups
            .map(group => ({
                ...group,
                plugins: group.plugins.filter(plugin => !query ||
                    plugin.name.toLocaleLowerCase().includes(query) ||
                    plugin.widgetId.toLocaleLowerCase().includes(query)),
            }))
            .filter(group => group.plugins.length > 0);
    }

    // ---------------------------------------------------------------- render

    private renderChip(zone: ZoneId, widget: WidgetConfig, index: number): TemplateResult {
        const plugin = WidgetRegistry.getInstance().getWidget(widget.type);
        const selected = widget.id
            ? this.selectedWidget?.widgetId === widget.id
            : this.selectedWidget?.zone === zone && this.selectedWidget?.index === index;
        const widgetName = this.widgetName(plugin, widget.type);
        return html`
            <div class="chip ${selected ? 'selected' : ''}"
                 data-zone=${zone} data-index=${index}>
                <span class="drag-handle" title=${this.t('designer.drag_to_move', 'Drag to move')} aria-label=${this.t('designer.drag_to_move', 'Drag to move')}>
                    <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <button class="chip-edit"
                        title=${this.t('designer.edit_widget', 'Edit {name}', {name: widgetName})}
                        @click=${() => this.emitSelection('wcc-widget-selected', {
                            zone, index, widgetId: widget.id,
                        })}>
                    <ha-icon .icon=${plugin?.icon ?? 'mdi:puzzle'}></ha-icon>
                    <span>${widgetName}</span>
                    <ha-icon icon="mdi:cog-outline"></ha-icon>
                </button>
                <button class="chip-action" title=${this.t('ui.remove', 'Remove')} aria-label=${this.t('designer.remove_widget', 'Remove {name}', {name: widgetName})}
                        @click=${() => this.emitLayout(removeWidget(this.layout, zone, index))}>
                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                </button>
            </div>
        `;
    }

    private renderZoneCell(zone: ZoneId): TemplateResult {
        const zoneConfig = this.layout.zones[zone];
        const widgets = zoneConfig?.widgets ?? [];
        return html`
            <div class="zone-cell ${this.selectedZone === zone ? 'selected' : ''}">
                <span class="zone-label" @click=${() => this.emitSelection('wcc-zone-selected', {zone})}>
                    ${this.zoneLabel(zone)}${zoneConfig?.mode === 'exclusive' ? ' ↔' : ''}
                </span>
                <div class="zone-list" data-zone=${zone}>
                    ${widgets.map((widget, index) => this.renderChip(zone, widget, index))}
                    ${widgets.length === 0
                        ? html`<span class="empty-zone">${this.t('designer.drag_here', '+ Drag a widget here')}</span>`
                        : ''}
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
                <div class="palette-title">${this.t('designer.widgets', 'Widgets')}</div>
                <label class="palette-search">
                    <ha-icon icon="mdi:magnify"></ha-icon>
                    <input
                            type="search"
                            placeholder=${this.t('designer.search', 'Search…')}
                            .value=${this.paletteQuery}
                            @input=${(ev: InputEvent) => {
                                this.paletteQuery = (ev.target as HTMLInputElement).value;
                            }}>
                </label>
                ${this.paletteGroups().map(group => html`
                    <div class="palette-category">${group.label}</div>
                    ${group.plugins.map(plugin => {
                    const unavailable = !!plugin.singleton && hasWidgetType(this.layout, plugin.widgetId);
                    const widgetName = this.widgetName(plugin, plugin.widgetId);
                    return html`
                        <div class="chip ${unavailable ? 'unavailable' : ''}"
                             data-widget-type=${plugin.widgetId}
                             aria-disabled=${unavailable ? 'true' : 'false'}
                             title=${unavailable
                                 ? this.t('designer.singleton', '{name} can only be added once', {name: widgetName})
                                 : (plugin.description ?? '')}
                             @click=${() => this.addFromPaletteClick(plugin.widgetId)}>
                            <ha-icon .icon=${plugin.icon}></ha-icon>
                            <span class="palette-name">${widgetName}</span>
                            <span class="drag-handle" title=${this.t('designer.drag_to_move', 'Drag to move')} aria-label=${this.t('designer.drag_to_move', 'Drag to move')}>
                                <ha-icon icon="mdi:drag-vertical"></ha-icon>
                            </span>
                        </div>
                    `;
                    })}
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

import {css, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {HomeAssistant} from 'custom-card-helpers';
import {createLogger} from '../utils/logger/logger';
import {AppearanceConfig, defaultZoneAlignment, LayoutConfig, ZoneConfig, ZoneId, ZONE_IDS} from './layout-types';
import {CssPaddingEdges, expandCssPadding, resolveSpacing} from './migrate-config';
import {WidgetRegistry} from '../widgets/widget-registry';
import {WidgetElement} from '../widgets/widget-element';
import {
    compactGridRowDefinition,
    layoutGridDefinition,
    layoutPanelEdge,
    layoutSplitAxis,
    layoutSplitCanonicalZone,
    layoutSplitGroupZones,
    layoutZonePanelEdge,
    layoutZonePlacement,
    resolveLayoutFormat,
    resolveLayoutVisualPreset,
} from './layout-format';
import './wcc-zone';

interface ZoneEntry {
    zoneId: ZoneId;
    config: ZoneConfig;
    widgets: WidgetElement[];
}

/**
 * The 3×3 zone grid replacing the hard-coded WallClockCard layout.
 *
 * Creates widget elements through the WidgetRegistry (cached by widget id so a
 * config change never restarts controllers of unchanged widgets) and fans out
 * hass/appearance to all of them — the single place replacing the per-component
 * forwarding the card used to repeat in three lifecycle methods.
 */
@customElement('wcc-layout')
export class WccLayout extends LitElement {
    @property({attribute: false}) layout?: LayoutConfig;
    @property({attribute: false}) hass?: HomeAssistant;
    @property({attribute: false}) appearance: AppearanceConfig = {};

    private zoneEntries: ZoneEntry[] = [];
    private widgetCache: Map<string, WidgetElement> = new Map();
    private logger = createLogger('wcc-layout');

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            /* Flex child of ha-card AND flex container for .grid: this keeps the
               height definite down to the grid so its rows redistribute to fit
               the card box instead of growing it (see wall-clock-card :host). */
            flex: 1 1 auto;
            min-height: 0;
            width: 100%;
            height: 100%;
            position: relative;
            /* Must sit above the background overlay (.background-overlay has
               z-index: 2 inside ha-background-image, which does not create its
               own stacking context) — matches the v2 component z-indexes. */
            z-index: 3;
        }

        /* 1fr side tracks are equal (minmax(0, 1fr) caps their min-content),
           so the center zone stays truly centered regardless of side content. */
        .grid {
            display: grid;
            grid-template-areas:
                'top-left    top-center    top-right'
                'middle-left center        middle-right'
                'bottom-left bottom-center bottom-right';
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
            grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
            gap: var(--wcc-zone-gap);
            padding: var(--wcc-padding);
            width: 100%;
            /* flex-fill the layout host (not height:100%, which would not resolve
               through the auto-height flex chain) so rows share a definite box. */
            flex: 1 1 auto;
            min-height: 0;
            box-sizing: border-box;
            position: relative;
            z-index: 1;
        }

        .format-surface {
            position: relative;
            z-index: 0;
            pointer-events: none;
            min-width: 0;
            min-height: 0;
        }

        .format-surface::before {
            content: '';
            position: absolute;
            background:
                linear-gradient(135deg, rgba(9, 13, 18, 0.72), rgba(20, 18, 19, 0.62));
            box-shadow: 0 0 48px rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(24px) saturate(1.1);
            -webkit-backdrop-filter: blur(24px) saturate(1.1);
        }

        .format-surface.left {
            grid-column: 1;
            grid-row: 1 / -1;
        }

        .format-surface.left::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-padding-left));
            border-right: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.right {
            grid-column: 2;
            grid-row: 1 / -1;
        }

        .format-surface.right::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-zone-gap));
            border-left: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.top {
            grid-column: 1 / -1;
            grid-row: 1;
        }

        .format-surface.top::before {
            inset:
                calc(-1 * var(--wcc-padding-top))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-left));
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
        }

        .format-surface.bottom {
            grid-column: 1 / -1;
            grid-row: 2;
        }

        .format-surface.bottom::before {
            inset:
                calc(-1 * var(--wcc-zone-gap))
                calc(-1 * var(--wcc-padding-right))
                calc(-1 * var(--wcc-padding-bottom))
                calc(-1 * var(--wcc-padding-left));
            border-top: 1px solid rgba(255, 255, 255, 0.16);
        }

        /*
         * Split formats have two real panels. Their logical zones are grouped
         * by the remaining axis, so neighbouring legacy anchors never overlap.
         */
        .split-panel {
            position: relative;
            z-index: 1;
            display: grid;
            min-width: 0;
            min-height: 0;
        }

        .split-panel.vertical {
            grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
        }

        .split-panel.horizontal {
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        }

        .split-anchor {
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
            gap: var(--wcc-zone-gap);
        }

        .split-panel.vertical > .split-anchor.start {
            grid-row: 1;
            align-self: start;
        }

        .split-panel.vertical > .split-anchor.center {
            grid-row: 2;
            align-self: center;
        }

        .split-panel.vertical > .split-anchor.end {
            grid-row: 3;
            align-self: end;
        }

        .split-panel.horizontal > .split-anchor.start {
            grid-column: 1;
            justify-self: stretch;
        }

        .split-panel.horizontal > .split-anchor.center {
            grid-column: 2;
            justify-self: center;
        }

        .split-panel.horizontal > .split-anchor.end {
            grid-column: 3;
            justify-self: stretch;
        }

        .split-panel.horizontal > .split-anchor.panel-span {
            grid-column: 1 / -1;
            justify-self: stretch;
        }

        /*
         * A horizontal split keeps left/centre/right anchors. Each anchor must
         * fill the panel vertically as well, otherwise WccZone shrink-wraps its
         * widgets and its internal vertical centring has no free space to use.
         */
        .split-panel.horizontal > .split-anchor > wcc-zone {
            flex: 1 1 auto;
        }
    `;

    willUpdate(changedProperties: PropertyValues): void {
        if (changedProperties.has('layout')) {
            this.rebuildZones();
        }
        if (changedProperties.has('hass') || changedProperties.has('appearance')) {
            this.forwardToWidgets();
        }
    }

    /** (Re)builds zone entries, reusing widget elements whose id + type match. */
    private rebuildZones(): void {
        const registry = WidgetRegistry.getInstance();
        const newCache: Map<string, WidgetElement> = new Map();
        this.zoneEntries = [];

        for (const zoneId of ZONE_IDS) {
            const zoneConfig = this.layout?.zones?.[zoneId];
            if (!zoneConfig?.widgets?.length) {
                continue;
            }
            const widgets: WidgetElement[] = [];
            zoneConfig.widgets.forEach((widgetConfig, index) => {
                // The zone is part of the cache key on purpose: moving a widget
                // to another zone recreates its element. Reusing one element
                // across two zones makes the old zone's Lit part remove the node
                // from the new zone during cleanup (stale-owner artifact).
                const key = `${zoneId}:${widgetConfig.id ?? `${index}:${widgetConfig.type}`}`;
                let element = this.widgetCache.get(key);
                if (element && element.config?.type === widgetConfig.type) {
                    element.config = widgetConfig;
                } else {
                    element = registry.createElement(widgetConfig);
                    if (!element) {
                        return; // unknown type: logged by the registry, ignore
                    }
                }
                element.zoneId = zoneId;
                element.zoneAlignment = zoneConfig.align ?? defaultZoneAlignment(zoneId);
                element.zoneDirection = zoneConfig.direction ?? 'column';
                element.appearance = this.appearance;
                if (this.hass) {
                    element.hass = this.hass;
                }
                newCache.set(key, element);
                widgets.push(element);
            });
            if (widgets.length) {
                this.zoneEntries.push({zoneId, config: zoneConfig, widgets});
            }
        }
        this.widgetCache = newCache;
        this.logger.debug(`Rebuilt zones: ${this.zoneEntries.map(z => z.zoneId).join(', ') || 'none'}`);
    }

    private forwardToWidgets(): void {
        for (const element of this.widgetCache.values()) {
            element.appearance = this.appearance;
            if (this.hass) {
                element.hass = this.hass;
            }
        }
    }

    /** True when any zone contains a widget of the given type. */
    hasWidget(type: string): boolean {
        return this.zoneEntries.some(entry => entry.widgets.some(w => w.config?.type === type));
    }

    private hasZone(zoneId: ZoneId): boolean {
        return this.zoneEntries.some(entry => entry.zoneId === zoneId);
    }

    /** Grid placement + self-alignment for a zone, including full-width spans. */
    private zonePlacement(zoneId: ZoneId): string {
        const format = resolveLayoutFormat(this.layout);
        if (format !== 'grid-3x3') {
            const placement = layoutZonePlacement(format, zoneId);
            return `grid-row: ${placement.row}; grid-column: ${placement.column}; ` +
                `align-self: ${placement.alignSelf}; justify-self: stretch; z-index: 1;`;
        }

        const [row] = zoneId === 'center' ? ['middle'] : zoneId.split('-');
        const alignSelf = row === 'top' ? 'start' : row === 'bottom' ? 'end' : 'center';

        // Top/bottom center zones span the full row when their side zones are
        // empty (this is how the v2 bottom bar spanned the whole card).
        if (zoneId === 'bottom-center' && !this.hasZone('bottom-left') && !this.hasZone('bottom-right')) {
            return `grid-area: bottom-center; grid-column: 1 / -1; align-self: end; justify-self: stretch;`;
        }
        if (zoneId === 'top-center' && !this.hasZone('top-left') && !this.hasZone('top-right')) {
            return `grid-area: top-center; grid-column: 1 / -1; align-self: start; justify-self: stretch;`;
        }

        // Every zone fills its grid track. Horizontal placement of its widgets
        // belongs to WccZone (`align`) so left/right/center actually have room
        // to differ instead of operating inside a shrink-wrapped zone host.
        return `grid-area: ${zoneId}; align-self: ${alignSelf}; justify-self: stretch;`;
    }

    /**
     * The grid's outer padding sits outside the narrow one-third panel, while
     * its inner edge coincides with a grid track boundary. Give separators the
     * matching inset on that inner edge so their endpoints are symmetrical.
     */
    private separatorInsetStyle(
        format: ReturnType<typeof resolveLayoutFormat>,
        zoneId: ZoneId,
        padding: CssPaddingEdges,
    ): string {
        switch (layoutZonePanelEdge(format, zoneId)) {
            case 'left':
                return `--wcc-separator-inline-end-inset: ${padding.left};`;
            case 'right':
                return `--wcc-separator-inline-start-inset: ${padding.right};`;
            case 'top':
                return `--wcc-separator-block-end-inset: ${padding.top};`;
            case 'bottom':
                return `--wcc-separator-block-start-inset: ${padding.bottom};`;
            default:
                return '';
        }
    }

    private renderZone(
        entry: ZoneEntry,
        format: ReturnType<typeof resolveLayoutFormat>,
        padding: CssPaddingEdges,
        placement = '',
    ): TemplateResult {
        return html`
            <wcc-zone style="${placement}
                             ${this.separatorInsetStyle(format, entry.zoneId, padding)}"
                      .zoneId=${entry.zoneId}
                      .zoneConfig=${entry.config}
                      .widgets=${entry.widgets}></wcc-zone>
        `;
    }

    private splitPanelStyle(
        axis: NonNullable<ReturnType<typeof layoutSplitAxis>>,
        panel: 1 | 2,
    ): string {
        return axis === 'vertical'
            ? `grid-column: ${panel}; grid-row: 1 / -1;`
            : `grid-column: 1 / -1; grid-row: ${panel};`;
    }

    private renderSplitPanel(
        format: ReturnType<typeof resolveLayoutFormat>,
        axis: NonNullable<ReturnType<typeof layoutSplitAxis>>,
        panel: 1 | 2,
        padding: CssPaddingEdges,
    ): TemplateResult {
        const anchors = (['start', 'center', 'end'] as const)
            .map(anchor => ({
                anchor,
                entry: this.splitGroupEntry(format, panel, anchor),
            }));
        const populated = anchors.filter(group => group.entry);
        const spanningAnchor = axis === 'horizontal'
            && populated.length === 1
            && populated[0].entry?.config.span === 'panel'
            ? populated[0].anchor
            : undefined;

        return html`
            <div class="split-panel ${axis}" style=${this.splitPanelStyle(axis, panel)}>
                ${anchors.map(group => group.entry ? html`
                    <div class="split-anchor ${group.anchor} ${group.anchor === spanningAnchor ? 'panel-span' : ''}">
                        ${this.renderZone(group.entry, format, padding)}
                    </div>
                ` : '')}
            </div>
        `;
    }

    private splitGroupEntry(
        format: ReturnType<typeof resolveLayoutFormat>,
        panel: 1 | 2,
        anchor: 'start' | 'center' | 'end',
    ): ZoneEntry | undefined {
        const zones = layoutSplitGroupZones(format, panel, anchor);
        const canonical = layoutSplitCanonicalZone(format, panel, anchor);
        if (!canonical) return undefined;

        const entries = zones
            .map(zone => this.zoneEntries.find(entry => entry.zoneId === zone))
            .filter((entry): entry is ZoneEntry => entry !== undefined);
        const widgets = entries.flatMap(entry => entry.widgets);
        if (widgets.length === 0) return undefined;

        const config = this.layout?.zones?.[canonical] ?? entries[0].config;
        const alignment = config.align ?? defaultZoneAlignment(canonical);
        const direction = config.direction ?? 'column';
        widgets.forEach(widget => {
            widget.zoneId = canonical;
            widget.zoneAlignment = alignment;
            widget.zoneDirection = direction;
        });
        return {zoneId: canonical, config, widgets};
    }

    render(): TemplateResult {
        const spacing = resolveSpacing(this.layout);
        const padding = expandCssPadding(spacing.padding);
        const format = resolveLayoutFormat(this.layout);
        const preset = resolveLayoutVisualPreset(this.layout);
        const grid = layoutGridDefinition(format);
        const compactRows = format === 'grid-3x3'
            ? compactGridRowDefinition(this.zoneEntries.map(entry => entry.zoneId))
            : undefined;
        const panelEdge = preset === 'glass' ? layoutPanelEdge(format) : undefined;
        const splitAxis = layoutSplitAxis(format);
        return html`
            <div class="grid"
                 data-format=${format}
                 style="--wcc-padding: ${spacing.padding}; --wcc-zone-gap: ${spacing.zoneGap}; --wcc-widget-gap: ${spacing.widgetGap};
                        --wcc-padding-top: ${padding.top}; --wcc-padding-right: ${padding.right};
                        --wcc-padding-bottom: ${padding.bottom}; --wcc-padding-left: ${padding.left};
                        grid-template-columns: ${grid.columns};
                        grid-template-rows: ${compactRows?.rows ?? grid.rows};
                        grid-template-areas: ${compactRows?.areas ?? 'none'};
                        align-content: ${compactRows?.alignContent ?? 'stretch'};">
                ${panelEdge ? html`<div class="format-surface ${panelEdge}"></div>` : ''}
                ${splitAxis
                    ? ([1, 2] as const).map(panel => this.renderSplitPanel(
                        format,
                        splitAxis,
                        panel,
                        padding,
                    ))
                    : repeat(
                        this.zoneEntries,
                        entry => entry.zoneId,
                        entry => this.renderZone(entry, format, padding, this.zonePlacement(entry.zoneId)),
                    )}
            </div>
        `;
    }
}

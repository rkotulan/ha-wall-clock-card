import {css, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {createLogger} from '../utils/logger/logger';
import {AppearanceConfig, LayoutConfig, ZoneConfig, ZoneId, ZONE_IDS} from './layout-types';
import {resolveSpacing} from './migrate-config';
import {WidgetRegistry} from '../widgets/widget-registry';
import {WidgetElement} from '../widgets/widget-element';
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
            display: block;
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
            height: 100%;
            box-sizing: border-box;
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
                const key = widgetConfig.id ?? `${zoneId}:${index}:${widgetConfig.type}`;
                let element = this.widgetCache.get(key);
                if (element && element.config?.type === widgetConfig.type) {
                    element.config = widgetConfig;
                } else {
                    element = registry.createElement(widgetConfig);
                    if (!element) {
                        return; // unknown type: logged by the registry, ignore
                    }
                }
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
        const [row] = zoneId === 'center' ? ['middle'] : zoneId.split('-');
        const alignSelf = row === 'top' ? 'start' : row === 'bottom' ? 'end' : 'center';

        // Top/bottom center zones span the full row when their side zones are
        // empty (this is how the v2 bottom bar spanned the whole card).
        if (zoneId === 'bottom-center' && !this.hasZone('bottom-left') && !this.hasZone('bottom-right')) {
            return `grid-row: 3; grid-column: 1 / -1; align-self: end; justify-self: stretch;`;
        }
        if (zoneId === 'top-center' && !this.hasZone('top-left') && !this.hasZone('top-right')) {
            return `grid-row: 1; grid-column: 1 / -1; align-self: start; justify-self: stretch;`;
        }

        const justifySelf = zoneId.endsWith('-left') ? 'start'
            : zoneId.endsWith('-right') ? 'end'
            : zoneId === 'top-center' || zoneId === 'bottom-center' ? 'stretch'
            : 'center';
        return `grid-area: ${zoneId}; align-self: ${alignSelf}; justify-self: ${justifySelf};`;
    }

    render(): TemplateResult {
        const spacing = resolveSpacing(this.layout);
        return html`
            <div class="grid"
                 style="--wcc-padding: ${spacing.padding}; --wcc-zone-gap: ${spacing.zoneGap}; --wcc-widget-gap: ${spacing.widgetGap};">
                ${this.zoneEntries.map(entry => html`
                    <wcc-zone style="${this.zonePlacement(entry.zoneId)}"
                              .zoneId=${entry.zoneId}
                              .zoneConfig=${entry.config}
                              .widgets=${entry.widgets}></wcc-zone>
                `)}
            </div>
        `;
    }
}

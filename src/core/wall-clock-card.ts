import {css, CSSResult, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {ImageSourceConfig, Weather} from '../providers/image';

import {configureLogger, getLogLevelFromString, logger, loadTranslationsAsync} from '../utils';
// Side-effect import: registers the ha-background-image element. The class import
// alone is type-only and would be elided by TypeScript.
import '../components/background';
import type {BackgroundImageComponent} from '../components/background';
import '../editors';
import '../components/ha-selector';
import {Messenger, WeatherMessage} from '../utils';
import {WallClockConfig, Size} from './types';
import {AppearanceConfig, WallClockConfigV3} from './layout-types';
import {migrateToLayout} from './migrate-config';
import {WccLayout} from './wcc-layout';
import './wcc-layout';
// Eagerly registers all built-in widgets (side effect)
import '../widgets';

// Global constant injected by webpack.DefinePlugin
declare const PACKAGE_VERSION: string;


@customElement('wall-clock-card')
export class WallClockCard extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    /** The raw configuration as given by Lovelace (v2 or v3). */
    @property({type: Object}) config: WallClockConfig = {};

    /**
     * Set by HA on cards while the dashboard is in edit mode. Used ONLY to offer
     * the in-place layout editing; miniature scaling keys off the dialog-preview
     * attribute instead (set when an edit dialog is among our shadow hosts).
     */
    @property({attribute: false}) preview = false;

    /** In-place zone editing (edit mode overlay); saved via lovelace.saveConfig. */
    @state() private layoutEditing = false;
    private editBackup?: WallClockConfig;

    /** The normalized v3 shape all rendering consumes (see migrateToLayout). */
    private configV3: WallClockConfigV3 = {layout: {zones: {}}};

    private backgroundImageComponent: BackgroundImageComponent =
        document.createElement('ha-background-image') as BackgroundImageComponent;
    private layoutElement: WccLayout = document.createElement('wcc-layout') as WccLayout;

    constructor() {
        super();

        // Display version info
        logger.info(
            "%c WALL-CLOCK-CARD %c " + PACKAGE_VERSION + " ",
            "color: white; background: #3498db; font-weight: 700;",
            "color: #3498db; background: white; font-weight: 700;"
        );
    }

    private previewObserver?: ResizeObserver;

    connectedCallback(): void {
        super.connectedCallback();
        if (this.isInEditPreview()) {
            this.setAttribute('dialog-preview', '');
            this.setupPreviewScaling();
        }
        this.initBackgroundImageComponent();
        this.syncLayoutElement();
        this.initConnectCallbackAsync();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.previewObserver?.disconnect();
        this.previewObserver = undefined;
    }

    /** The dialog preview renders the card at the browser viewport resolution
     * (which is what the real wall panel shows) and scales it down to the pane
     * width — a faithful miniature with the exact dashboard proportions. */
    private setupPreviewScaling(): void {
        if (this.previewObserver) {
            return;
        }
        this.previewObserver = new ResizeObserver(() => this.updatePreviewScale());
        this.previewObserver.observe(this);
        this.updatePreviewScale();
    }

    private updatePreviewScale(): void {
        const baseWidth = window.innerWidth;
        const baseHeight = window.innerHeight;
        const scale = this.clientWidth / baseWidth;
        if (scale <= 0 || !baseWidth || !baseHeight) {
            return;
        }
        this.style.setProperty('--wcc-preview-width', `${baseWidth}px`);
        this.style.setProperty('--wcc-preview-height', `${baseHeight}px`);
        this.style.setProperty('--wcc-preview-scale', String(scale));
        this.style.aspectRatio = `${baseWidth} / ${baseHeight}`;
    }

    /** Fallback preview detection: is an edit/pick dialog among our shadow hosts? */
    private isInEditPreview(): boolean {
        let node: Element | undefined = this;
        while (node) {
            const root = node.getRootNode();
            if (!(root instanceof ShadowRoot)) {
                return false;
            }
            const tag = root.host.localName;
            if (tag === 'hui-dialog-edit-card' || tag === 'hui-card-preview' || tag === 'hui-dialog-pick-card') {
                return true;
            }
            node = root.host;
        }
        return false;
    }

    async initConnectCallbackAsync(): Promise<void> {
        await this.backgroundImageComponent.controller.ready;

        this.configureCardLogger();

        // Load translations for all supported languages
        try {
            await loadTranslationsAsync();
            logger.debug('Loaded translations for all languages');
        } catch (error) {
            logger.error('Error loading translations:', error);
        }

        this.publishWeatherFallbackIfNeeded();
    }

    // Required for Home Assistant custom cards
    static getConfigElement() {
        return document.createElement('wall-clock-card-editor');
    }

    // Return the card size (1 unit = 50px height)
    getCardSize(): number {
        return 4; // Approximately 200px height
    }

    // Grid sizing hints for the Sections view (1 row = 56px + 8px gap)
    getGridOptions() {
        return {
            columns: 'full',
            rows: 6,
            min_rows: 4,
        };
    }

    static getStubConfig(): WallClockConfig {
        return {
            timeFormat: {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            },
            dateFormat: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        };
    }

    setConfig(config: WallClockConfig): void {
        if (!config || typeof config !== 'object') {
            throw new Error('Invalid configuration');
        }

        this.applyConfig(config);
    }

    // Applies the config synchronously so setConfig() conforms to the
    // Lovelace contract (validate and apply before returning, throw on error).
    private applyConfig(config: WallClockConfig): void {
        this.config = config;
        this.configV3 = migrateToLayout(config);

        this.initBackgroundImageComponent();
        this.syncLayoutElement();

        this.backgroundImageComponent.controller.ready.then(() => {
            this.publishWeatherFallbackIfNeeded();
        });
    }

    /** Card-wide defaults handed to every widget through wcc-layout. */
    private computeAppearance(): AppearanceConfig {
        const appearance = this.configV3.appearance ?? {};
        return {
            fontColor: appearance.fontColor ?? '#FFFFFF',
            language: appearance.language,
            timeZone: appearance.timeZone ?? this.hass?.config?.time_zone,
            size: appearance.size ?? Size.Medium,
        };
    }

    private syncLayoutElement(): void {
        this.layoutElement.layout = this.configV3.layout;
        this.layoutElement.appearance = this.computeAppearance();
        if (this.hass) {
            this.layoutElement.hass = this.hass;
        }
    }

    /** Without a weather widget, background image selection must not wait for weather data. */
    private publishWeatherFallbackIfNeeded(): void {
        const zones = this.configV3.layout.zones;
        const hasWeather = Object.values(zones).some(
            zone => zone?.widgets?.some(widget => widget.type === 'weather')
        );
        if (!hasWeather) {
            Messenger.getInstance().publish(new WeatherMessage(Weather.All));
        }
    }

    private configureCardLogger(): void {
        const logLevelString = (this.configV3.logLevel as string | undefined) || 'info';
        configureLogger({
            level: getLogLevelFromString(logLevelString),
            prefix: 'wall-clock',
            enableSourceTracking: true,
            enableTimestamps: true,
            logToConsole: true,
            logToStorage: false
        });
    }

    private initBackgroundImageComponent(): void {
        const background = this.configV3.background ?? {};

        // Create the full ImageSourceConfig
        const imageSourceConfig: ImageSourceConfig = {
            imageSourceId: background.source || 'none',
            backgroundImages: background.images,
            entity: background.config?.entity,
            apiKey: background.config?.apiKey,
            contentFilter: background.config?.contentFilter,
            category: background.config?.category,
            count: background.config?.count
        };

        this.backgroundImageComponent.backgroundOpacity = background.opacity ?? 0.3;
        this.backgroundImageComponent.objectFit = background.objectFit || 'cover';
        this.backgroundImageComponent.config = {
            imageSourceConfig: imageSourceConfig,
            backgroundRotationInterval: background.rotationInterval ?? 90,
            objectFit: background.objectFit || 'cover'
        };
        this.backgroundImageComponent.hass = this.hass;

        logger.debug('Background image component initialized');
    }

    // ------------------------------------------------------ in-place layout editing

    private startLayoutEditing(): void {
        this.editBackup = this.config;
        this.layoutEditing = true;
    }

    private onInplaceLayoutChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        const newConfig = {...this.configV3, layout: ev.detail.layout};
        this.applyConfig(newConfig as unknown as WallClockConfig);
    }

    private cancelLayoutEditing(): void {
        this.layoutEditing = false;
        if (this.editBackup) {
            this.applyConfig(this.editBackup);
        }
        this.editBackup = undefined;
    }

    private async saveLayoutEditing(): Promise<void> {
        this.layoutEditing = false;
        const backup = this.editBackup;
        this.editBackup = undefined;
        if (!backup) {
            return;
        }
        const saved = await this.saveConfigToLovelace(backup, this.configV3);
        if (!saved) {
            logger.warn('Could not persist the layout (dashboard save API not found) — the change is only visible until reload');
        }
    }

    /**
     * Persists the card's new config by locating hui-root and replacing this
     * card inside lovelace.config (matched against the pre-edit config). This
     * uses HA internals — cards have no official self-save API — and degrades
     * to a logged warning when the internals are not found.
     */
    private async saveConfigToLovelace(original: WallClockConfig, updated: WallClockConfigV3): Promise<boolean> {
        try {
            const huiRoot = this.findHuiRoot() as (Element & {lovelace?: {config: unknown; saveConfig?: (c: unknown) => Promise<void>}}) | undefined;
            const lovelace = huiRoot?.lovelace;
            if (!lovelace?.saveConfig || !lovelace.config) {
                return false;
            }
            const originalJson = JSON.stringify(original);
            const cloned = JSON.parse(JSON.stringify(lovelace.config)) as {views?: unknown};
            let replaced = false;
            const visit = (node: unknown): void => {
                if (replaced || !node || typeof node !== 'object') {
                    return;
                }
                if (Array.isArray(node)) {
                    node.forEach(visit);
                    return;
                }
                const record = node as Record<string, unknown>;
                if (Array.isArray(record.cards)) {
                    const cards = record.cards as unknown[];
                    for (let i = 0; i < cards.length; i++) {
                        if (JSON.stringify(cards[i]) === originalJson) {
                            cards[i] = updated;
                            replaced = true;
                            return;
                        }
                    }
                }
                Object.values(record).forEach(visit);
            };
            visit(cloned.views);
            if (!replaced) {
                return false;
            }
            await lovelace.saveConfig(cloned);
            return true;
        } catch (error) {
            logger.warn('Saving layout to Lovelace failed:', error);
            return false;
        }
    }

    private findHuiRoot(): Element | undefined {
        // Fast path through the known element chain, generic BFS as fallback
        const direct = document.querySelector('home-assistant')?.shadowRoot
            ?.querySelector('home-assistant-main')?.shadowRoot
            ?.querySelector('ha-panel-lovelace')?.shadowRoot
            ?.querySelector('hui-root');
        if (direct) {
            return direct;
        }
        const queue: (Document | ShadowRoot)[] = [document];
        let steps = 0;
        while (queue.length && steps < 5000) {
            const root = queue.shift()!;
            const found = root.querySelector('hui-root');
            if (found) {
                return found;
            }
            for (const el of root.querySelectorAll('*')) {
                steps++;
                if (el.shadowRoot) {
                    queue.push(el.shadowRoot);
                }
            }
        }
        return undefined;
    }

    updated(changedProperties: Map<string, any>): void {
        // Leaving dashboard edit mode closes the in-place editing (discarding
        // unsaved changes, same as HA's own edit flow)
        if (changedProperties.has('preview') && !this.preview && this.layoutEditing) {
            this.cancelLayoutEditing();
        }

        if (changedProperties.has('hass') && this.hass) {
            this.backgroundImageComponent.hass = this.hass;
            // Re-sync appearance too: timeZone falls back to hass.config.time_zone
            this.syncLayoutElement();
        }

        if (changedProperties.has('config') && this.config) {
            this.configureCardLogger();
        }
    }

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
                height: 100%;
                width: 100%;
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                box-sizing: border-box;
            }

            ha-card {
                width: 100%;
                height: 100%;
                overflow: hidden;
                position: relative;
            }

            /* Edit-dialog preview only (never dashboard edit mode): render the
               card at the viewport resolution and scale it down to the pane
               width — a faithful miniature with real dashboard proportions.
               Values come from updatePreviewScale(). */
            :host([dialog-preview]) {
                height: auto;
            }

            :host([dialog-preview]) ha-card {
                width: var(--wcc-preview-width, 1280px);
                height: var(--wcc-preview-height, 720px);
                transform: scale(var(--wcc-preview-scale, 0.3));
                transform-origin: top left;
            }

            /* In-place layout editing (dashboard edit mode) */
            .layout-edit-toggle {
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 6;
                display: flex;
                align-items: center;
                gap: 6px;
                background-color: rgba(0, 0, 0, 0.6);
                color: #fff;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 16px;
                padding: 4px 14px;
                font: inherit;
                font-size: 0.85rem;
                cursor: pointer;
            }

            .layout-edit-toggle:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            .layout-edit-toggle ha-icon {
                --mdc-icon-size: 16px;
            }

            wcc-zone-overlay.inplace {
                position: absolute;
                inset: 0;
                z-index: 6;
            }

            .layout-edit-actions {
                position: absolute;
                top: 8px;
                right: 8px;
                z-index: 7;
                display: flex;
                gap: 8px;
            }

            .layout-edit-actions button {
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 16px;
                padding: 4px 14px;
                font: inherit;
                font-size: 0.85rem;
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.6);
                color: #fff;
            }

            .layout-edit-actions button.primary {
                background-color: var(--primary-color, #03a9f4);
                border-color: var(--primary-color, #03a9f4);
                color: #fff;
            }
        `;
    }

    render() {
        // In-place editing is offered only in dashboard edit mode (preview set
        // by HA), never in the edit-dialog miniature.
        const offerLayoutEditing = this.preview && !this.hasAttribute('dialog-preview') && !!this.hass;
        return html`
            <ha-card style="color: ${this.computeAppearance().fontColor};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
                ${offerLayoutEditing && !this.layoutEditing ? html`
                    <button class="layout-edit-toggle" @click=${this.startLayoutEditing}>
                        <ha-icon icon="mdi:view-grid-plus-outline"></ha-icon>
                        Edit layout
                    </button>
                ` : ''}
                ${this.layoutEditing ? html`
                    <wcc-zone-overlay class="inplace"
                            .layout=${this.configV3.layout}
                            @layout-changed=${this.onInplaceLayoutChanged}
                    ></wcc-zone-overlay>
                    <div class="layout-edit-actions">
                        <button class="primary" @click=${this.saveLayoutEditing}>Save</button>
                        <button @click=${this.cancelLayoutEditing}>Cancel</button>
                    </div>
                ` : ''}
            </ha-card>
        `;
    }
}

// Add card to window for type checking
declare global {
    interface Window {
        customCards: any[];
    }
}

// Add card to window.customCards
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'wall-clock-card',
    name: 'Wall Clock Card',
    description: 'A card that displays a clock with seconds and the current date',
});

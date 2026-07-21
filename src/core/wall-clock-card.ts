import {css, CSSResult, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {ImageSourceConfig, Weather} from '../providers/image';

import {configureLogger, getLogLevelFromString, localize, logger, loadTranslationsAsync} from '../utils';
// Side-effect import: registers the ha-background-image element. The class import
// alone is type-only and would be elided by TypeScript.
import '../components/background';
import type {BackgroundImageComponent} from '../components/background';
import '../editors';
import '../components/ha-selector';
import {Messenger, WeatherMessage} from '../utils';
import {WallClockConfig, Size} from './types';
import {AppearanceConfig, LayoutConfig, WallClockConfigV3, ZoneId} from './layout-types';
import {migrateToLayout} from './migrate-config';
import {WccLayout} from './wcc-layout';
import './wcc-layout';
import {WidgetSelection} from '../editors/zone-overlay';
import {
    deduplicateWidgetTypes,
    findWidgetById,
    updateWidgetAt,
    updateZoneSettings,
} from '../editors/layout-editor-logic';
import {WidgetRegistry} from '../widgets/widget-registry';
import {
    cloneWithConfigAtPath,
    configAtPath,
    findConfigPath,
    LovelaceConfigPath,
    synchronizeLiveConfigAtPath,
} from './lovelace-config-path';
// Eagerly registers all built-in widgets (side effect)
import '../widgets';

// Global constant injected by webpack.DefinePlugin
declare const PACKAGE_VERSION: string;

/** Height of HA's card edit actions ("Edit" + overflow menu), rendered below
 * the custom card and therefore not included in this element's own bounds. */
const DEFAULT_DASHBOARD_EDIT_FOOTER_HEIGHT = 64;
const LAYOUT_AUTOSAVE_DELAY_MS = 700;

interface RetainedDesignerContext {
    selectedWidget: WidgetSelection | null;
    selectedZone: ZoneId | null;
}

// HA replaces card elements after saveConfig(). Preserve only transient editor
// selection, keyed by dashboard route + exact Lovelace card path.
const retainedDesignerContexts = new Map<string, RetainedDesignerContext>();

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

    /** In-place editing is active automatically while HA is editing the dashboard. */
    @state() private selectedWidget: WidgetSelection | null = null;
    @state() private selectedZone: ZoneId | null = null;
    @state() private designerPreview = false;
    @state() private designerOpen = false;
    @state() private designerRequiresExplicitOpen = false;
    @state() private layoutSaveStatus: 'idle' | 'pending' | 'saving' | 'saved' | 'error' = 'idle';
    @state() private layoutSaveError?: string;
    private layoutSaveBaseline?: WallClockConfig;
    private layoutSaveRevision = 0;
    private layoutSavedRevision = 0;
    private layoutSavePromise?: Promise<boolean>;
    private layoutAutosaveTimer?: ReturnType<typeof setTimeout>;
    private layoutSavePath?: LovelaceConfigPath;
    private inlineEditSessionActive = false;
    private designerSessionKey?: string;

    /** The normalized v3 shape all rendering consumes (see migrateToLayout). */
    private configV3: WallClockConfigV3 = {layout: {zones: {}}};

    private backgroundImageComponent: BackgroundImageComponent =
        document.createElement('ha-background-image') as BackgroundImageComponent;
    private layoutElement: WccLayout = document.createElement('wcc-layout') as WccLayout;

    private t(key: string, fallback: string): string {
        return localize(key, this.hass, fallback);
    }

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
    private fitObserver?: ResizeObserver;
    private onWindowResize = (): void => this.updateFitHeight();

    connectedCallback(): void {
        super.connectedCallback();
        // Fullscreen is a transient editor state, never persisted across HA's
        // detach/reattach cycles or into normal dashboard rendering.
        if (!this.preview) {
            this.removeAttribute('designer-fullscreen');
        }
        if (this.isInEditPreview()) {
            this.setAttribute('dialog-preview', '');
            this.setupPreviewScaling();
        }
        if (this.preview && !this.hasAttribute('dialog-preview') && this.hass && !this.inlineEditSessionActive) {
            this.beginInlineEditing();
        }
        window.addEventListener('resize', this.onWindowResize);
        // A ResizeObserver (not rAF, which is throttled in background tabs)
        // fires once the card is laid out and on every later resize.
        this.fitObserver = new ResizeObserver(() => this.updateFitHeight());
        this.fitObserver.observe(this);
        this.initBackgroundImageComponent();
        this.syncLayoutElement();
        this.initConnectCallbackAsync();
    }

    disconnectedCallback(): void {
        this.clearLayoutAutosaveTimer();
        this.removeAttribute('designer-fullscreen');
        this.designerOpen = false;
        if (this.inlineEditSessionActive) {
            this.inlineEditSessionActive = false;
            void this.flushLayoutAutosave();
        }
        super.disconnectedCallback();
        this.previewObserver?.disconnect();
        this.previewObserver = undefined;
        this.fitObserver?.disconnect();
        this.fitObserver = undefined;
        window.removeEventListener('resize', this.onWindowResize);
    }

    /**
     * Caps the card to the space actually available below its top edge
     * (viewport height minus the card's offset — e.g. an HA header). The CSS
     * `max-height: 100dvh` ceiling is the whole viewport, which overflows a
     * scroll container by the header height when the card sits below it and its
     * container gives no definite height (masonry / min-height panel views).
     * Dashboard edit mode also adds a controls footer *outside* this element;
     * its height has to be reserved here or that footer makes the page scroll.
     * Without a definite height the flex chain can't fit the grid on its own.
     * No-op in the edit-dialog miniature, which sizes itself by transform.
     * The >1px guard keeps the ResizeObserver from looping on its own write.
     */
    private updateFitHeight(): void {
        if (this.hasAttribute('dialog-preview')) {
            return;
        }
        if (this.hasAttribute('designer-fullscreen')) {
            this.style.maxHeight = '';
            return;
        }
        const top = Math.max(0, this.getBoundingClientRect().top);
        const editFooterHeight = this.dashboardEditFooterHeight();
        const available = window.innerHeight - top - editFooterHeight;
        if (available <= 0) {
            return;
        }
        const current = parseFloat(this.style.maxHeight);
        if (isNaN(current) || Math.abs(current - available) > 1) {
            this.style.maxHeight = `${available}px`;
        }
    }

    /**
     * HA renders its edit controls as a sibling below the card. Keep a default
     * matching that row, while allowing themes / future HA versions to override
     * it through `--wcc-dashboard-edit-footer-height` on the card.
     */
    private dashboardEditFooterHeight(): number {
        if (!this.preview || this.hasAttribute('dialog-preview')) {
            return 0;
        }

        const customHeight = parseFloat(
            getComputedStyle(this).getPropertyValue('--wcc-dashboard-edit-footer-height')
        );
        return Number.isFinite(customHeight)
            ? Math.max(0, customHeight)
            : DEFAULT_DASHBOARD_EDIT_FOOTER_HEIGHT;
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
        const migrated = migrateToLayout(config);
        const singletonTypes = WidgetRegistry.getInstance().getAllWidgets()
            .filter(plugin => plugin.singleton)
            .map(plugin => plugin.widgetId);
        this.configV3 = {
            ...migrated,
            layout: deduplicateWidgetTypes(migrated.layout, singletonTypes),
        };

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
            fontFamily: appearance.fontFamily,
            language: appearance.language,
            timeZone: appearance.timeZone ?? this.hass?.config?.time_zone,
            size: appearance.size ?? Size.Medium,
        };
    }

    private syncLayoutElement(): void {
        const appearance = this.computeAppearance();
        this.layoutElement.layout = this.configV3.layout;
        this.layoutElement.appearance = appearance;
        // Assign through CSSOM rather than interpolating a style attribute. An
        // empty value restores the HA theme font from the static host rule.
        this.style.fontFamily = appearance.fontFamily ?? '';
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

    /** Panel views dedicate the entire view to this card and can host the
     * designer directly. Every other Lovelace placement uses an explicit entry
     * button, independent of monitor resolution or measured card dimensions. */
    private isPanelPlacement(): boolean {
        // Prefer the composed DOM: this also works while HA is rebuilding the
        // Lovelace model during edit-mode transitions.
        let element: Element | null = this;
        while (element) {
            if (element.localName === 'hui-panel-view') return true;
            if (element.parentElement) {
                element = element.parentElement;
                continue;
            }
            const root = element.getRootNode();
            element = root instanceof ShadowRoot ? root.host : null;
        }

        // Fallback to the active view config. Current HA stores panel views as
        // `type: panel`; `panel: true` covers older Lovelace configurations.
        const huiRoot = this.findHuiRoot() as (Element & {
            ___curView?: number;
            lovelace?: {config?: {views?: Array<{type?: string; panel?: boolean}>}};
        }) | undefined;
        const currentView = huiRoot?.___curView;
        const view = currentView === undefined
            ? undefined
            : huiRoot?.lovelace?.config?.views?.[currentView];
        return view?.type === 'panel' || view?.panel === true;
    }

    private beginInlineEditing(): void {
        const useExplicitEntry = !this.isPanelPlacement();
        // Panel cards keep the permanent in-place designer. A regular
        // card stays unobtrusive until its own Configure button is pressed.
        this.removeAttribute('designer-fullscreen');
        this.designerRequiresExplicitOpen = useExplicitEntry;
        this.designerOpen = !useExplicitEntry;
        this.selectedWidget = null;
        this.selectedZone = null;
        this.designerPreview = false;
        this.inlineEditSessionActive = true;
        this.restoreDesignerContext();
        // Re-entering edit mode while the previous "Done" save is still running
        // must keep that queue/baseline intact so a later retry can still match.
        if (this.layoutSavePromise ||
            (this.layoutSaveBaseline && this.layoutSaveRevision > this.layoutSavedRevision)) {
            return;
        }
        this.layoutSaveBaseline = this.config;
        this.layoutSaveRevision = 0;
        this.layoutSavedRevision = 0;
        this.layoutSavePromise = undefined;
        this.layoutSavePath = undefined;
        this.clearLayoutAutosaveTimer();
        this.layoutSaveStatus = 'idle';
        this.layoutSaveError = undefined;
    }

    private finishInlineEditing(): void {
        this.clearLayoutAutosaveTimer();
        this.removeAttribute('designer-fullscreen');
        this.closeInplaceInspector();
        this.designerPreview = false;
        this.designerOpen = false;
        this.designerRequiresExplicitOpen = false;
        this.inlineEditSessionActive = false;
        this.clearRetainedDesignerContext();
        void this.flushLayoutAutosave().then(saved => {
            if (saved && !this.inlineEditSessionActive) {
                this.layoutSaveBaseline = undefined;
                this.layoutSavePath = undefined;
            } else {
                if (!saved) {
                    this.dispatchEvent(new CustomEvent('hass-notification', {
                        detail: {message: 'Wall Clock: the last layout change could not be saved.'},
                        bubbles: true,
                        composed: true,
                    }));
                }
            }
        });
    }

    private openFullscreenDesigner(): void {
        if (!this.designerRequiresExplicitOpen) return;
        this.style.maxHeight = '';
        this.setAttribute('designer-fullscreen', '');
        this.designerOpen = true;
    }

    /** Closes only this card's promoted designer. HA remains in dashboard edit
     * mode so the user can configure another card before using the global Done. */
    private closeFullscreenDesigner(): void {
        this.clearLayoutAutosaveTimer();
        this.closeInplaceInspector();
        this.designerPreview = false;
        this.removeAttribute('designer-fullscreen');
        this.designerOpen = false;
        this.clearRetainedDesignerContext();
        void this.flushLayoutAutosave();
        void this.updateComplete.then(() => this.updateFitHeight());
    }

    private applyInplaceConfig(config: WallClockConfig): void {
        this.applyConfig(config);
        this.markLayoutDirty();
    }

    private markLayoutDirty(): void {
        if (!this.inlineEditSessionActive) return;
        this.layoutSaveRevision++;
        this.layoutSaveStatus = 'pending';
        this.layoutSaveError = undefined;
        this.clearLayoutAutosaveTimer();
        this.layoutAutosaveTimer = setTimeout(() => {
            this.layoutAutosaveTimer = undefined;
            void this.flushLayoutAutosave();
        }, LAYOUT_AUTOSAVE_DELAY_MS);
    }

    private clearLayoutAutosaveTimer(): void {
        if (this.layoutAutosaveTimer !== undefined) {
            clearTimeout(this.layoutAutosaveTimer);
            this.layoutAutosaveTimer = undefined;
        }
    }

    /** Serializes saves so rapid editor changes cannot overwrite a newer config. */
    private async flushLayoutAutosave(): Promise<boolean> {
        this.clearLayoutAutosaveTimer();
        if (!this.layoutSaveBaseline || this.layoutSaveRevision <= this.layoutSavedRevision) {
            return true;
        }
        if (this.layoutSavePromise) {
            const activeSaved = await this.layoutSavePromise;
            if (!activeSaved) return false;
            return this.flushLayoutAutosave();
        }

        const baseline = this.layoutSaveBaseline;
        const updated = JSON.parse(JSON.stringify(this.configV3)) as WallClockConfigV3;
        const revision = this.layoutSaveRevision;
        this.layoutSaveStatus = 'saving';
        this.layoutSaveError = undefined;

        const savePromise = this.saveConfigToLovelace(baseline, updated);
        this.layoutSavePromise = savePromise;
        const saved = await savePromise;
        if (this.layoutSavePromise === savePromise) {
            this.layoutSavePromise = undefined;
        }

        if (!saved) {
            this.layoutSaveStatus = 'error';
            this.layoutSaveError = 'Save failed — click to retry';
            logger.warn('Could not persist the layout (dashboard save API not found)');
            return false;
        }

        this.layoutSaveBaseline = updated as unknown as WallClockConfig;
        this.layoutSavedRevision = revision;
        if (this.layoutSaveRevision > revision) {
            this.layoutSaveStatus = 'pending';
            return this.flushLayoutAutosave();
        }
        this.layoutSaveStatus = 'saved';
        return true;
    }

    private onInplaceLayoutChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        const layout = ev.detail.layout as LayoutConfig;
        const focusWidgetId = ev.detail.focusWidgetId as string | undefined;
        const selectedId = focusWidgetId ?? this.selectedWidget?.widgetId;
        if (selectedId) {
            const located = findWidgetById(layout, selectedId);
            this.selectedWidget = located
                ? {zone: located.zone, index: located.index, widgetId: selectedId}
                : null;
            if (focusWidgetId) this.selectedZone = null;
        } else if (this.selectedWidget) {
            this.selectedWidget = null;
        }
        this.retainDesignerContext();
        const newConfig = {...this.configV3, layout};
        this.applyInplaceConfig(newConfig as unknown as WallClockConfig);
    }

    private onInplaceWidgetSelected(ev: CustomEvent): void {
        const selection = ev.detail as WidgetSelection;
        this.selectedZone = null;
        const same = selection.widgetId
            ? this.selectedWidget?.widgetId === selection.widgetId
            : this.selectedWidget?.zone === selection.zone && this.selectedWidget?.index === selection.index;
        this.selectedWidget = same ? null : selection;
        this.retainDesignerContext();
    }

    private onInplaceZoneSelected(ev: CustomEvent): void {
        const zone = ev.detail.zone as ZoneId;
        this.selectedWidget = null;
        this.selectedZone = this.selectedZone === zone ? null : zone;
        this.retainDesignerContext();
    }

    private onInplaceWidgetConfigChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        const {zone, index, widget} = ev.detail;
        const layout = updateWidgetAt(this.configV3.layout, zone, index, widget);
        this.applyInplaceConfig({...this.configV3, layout} as unknown as WallClockConfig);
    }

    private onInplaceZoneSettingsChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        const {zone, settings} = ev.detail;
        const layout = updateZoneSettings(this.configV3.layout, zone, settings);
        this.applyInplaceConfig({...this.configV3, layout} as unknown as WallClockConfig);
    }

    private onInplaceCardConfigChanged(ev: CustomEvent): void {
        ev.stopPropagation();
        this.applyInplaceConfig(ev.detail.config as WallClockConfig);
    }

    private openCardSettings(): void {
        this.designerPreview = false;
        this.selectedWidget = null;
        this.selectedZone = null;
        this.retainDesignerContext();
    }

    private closeInplaceInspector(): void {
        this.selectedWidget = null;
        this.selectedZone = null;
    }

    private resolveDesignerSessionKey(): string | undefined {
        if (this.designerSessionKey) return this.designerSessionKey;
        const huiRoot = this.findHuiRoot() as (Element & {lovelace?: {config?: unknown}}) | undefined;
        const liveConfig = huiRoot?.lovelace?.config;
        const path = liveConfig ? findConfigPath(liveConfig, this.config) : undefined;
        if (!path?.length) return undefined;
        this.designerSessionKey = `${window.location.pathname}:${JSON.stringify(path)}`;
        return this.designerSessionKey;
    }

    private retainDesignerContext(): void {
        const key = this.resolveDesignerSessionKey();
        if (!key) return;
        retainedDesignerContexts.set(key, {
            selectedWidget: this.selectedWidget ? {...this.selectedWidget} : null,
            selectedZone: this.selectedZone,
        });
    }

    private restoreDesignerContext(): void {
        const key = this.resolveDesignerSessionKey();
        if (!key) return;
        const retained = retainedDesignerContexts.get(key);
        if (!retained) return;

        if (retained.selectedWidget) {
            const selection = retained.selectedWidget;
            const located = selection.widgetId
                ? findWidgetById(this.configV3.layout, selection.widgetId)
                : this.configV3.layout.zones[selection.zone]?.widgets[selection.index]
                    ? {zone: selection.zone, index: selection.index}
                    : undefined;
            if (located) {
                this.selectedWidget = {
                    zone: located.zone,
                    index: located.index,
                    widgetId: selection.widgetId,
                };
                this.selectedZone = null;
                return;
            }
        }

        this.selectedWidget = null;
        this.selectedZone = retained.selectedZone;
    }

    private clearRetainedDesignerContext(): void {
        const key = this.designerSessionKey;
        if (key) retainedDesignerContexts.delete(key);
        this.designerSessionKey = undefined;
    }

    /**
     * Persists only this exact card instance. The initial path is resolved by
     * object identity, never by JSON equality (multiple cards can legitimately
     * have identical configs). Later saves reuse that path only while its live
     * value still matches our last baseline; otherwise saving fails closed.
     */
    private async saveConfigToLovelace(original: WallClockConfig, updated: WallClockConfigV3): Promise<boolean> {
        try {
            const huiRoot = this.findHuiRoot() as (Element & {lovelace?: {config: unknown; saveConfig?: (c: unknown) => Promise<void>}}) | undefined;
            const lovelace = huiRoot?.lovelace;
            if (!lovelace?.saveConfig || !lovelace.config) {
                return false;
            }
            const liveConfig = lovelace.config;
            let path = this.layoutSavePath;
            if (!path) {
                path = findConfigPath(liveConfig, original);
            }
            if (!path?.length) {
                logger.warn('Refusing layout save: the exact card instance was not found');
                return false;
            }

            const liveCard = configAtPath(liveConfig, path);
            if (liveCard !== original && JSON.stringify(liveCard) !== JSON.stringify(original)) {
                logger.warn('Refusing layout save: the dashboard changed at the card path');
                return false;
            }

            const cloned = cloneWithConfigAtPath(liveConfig, path, updated);
            if (!cloned) {
                return false;
            }
            await lovelace.saveConfig(cloned);

            // HA's global Done action saves the live edit model again. Keep that
            // model aligned with the config just persisted, otherwise it can
            // overwrite the autosave with the pre-edit card configuration.
            if (!synchronizeLiveConfigAtPath(liveConfig, path, original, updated)) {
                logger.warn('Refusing live config synchronization: the card changed during save');
                return false;
            }
            this.layoutSavePath = path;
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
        if (changedProperties.has('preview') || changedProperties.has('hass')) {
            const inlineEditing = this.preview && !this.hasAttribute('dialog-preview') && !!this.hass;
            if (inlineEditing && !this.inlineEditSessionActive) {
                this.beginInlineEditing();
            } else if (!inlineEditing && this.inlineEditSessionActive) {
                // HA's global "Done" ends the session; flush any pending debounce.
                this.finishInlineEditing();
            }
            if (!inlineEditing) {
                // Defensive cleanup even when HA changed lifecycle ordering and
                // no active edit session was observed by this element.
                this.removeAttribute('designer-fullscreen');
                this.designerOpen = false;
            }
        }

        if (changedProperties.has('hass') && this.hass) {
            this.backgroundImageComponent.hass = this.hass;
            // Re-sync appearance too: timeZone falls back to hass.config.time_zone
            this.syncLayoutElement();
        }

        if (changedProperties.has('config') && this.config) {
            this.configureCardLogger();
        }

        // Re-fit when the card may have moved/resized (edit-mode wrapping,
        // dialog↔dashboard). Not on hass ticks — the offset is unaffected.
        if (changedProperties.has('config') || changedProperties.has('preview')) {
            this.updateFitHeight();
        }
    }

    static get styles(): CSSResult {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                height: 100%;
                width: 100%;
                /* Ceiling for containers that give no definite height (kiosk /
                   masonry views): without it the in-flow zone content — a large
                   clock plus a multi-row forecast — grows the card past the
                   viewport and the whole page scrolls. The flex chain below
                   makes the grid adapt within this box instead. No-op when the
                   parent already constrains the height (panel / sections). */
                max-height: 100vh;
                max-height: 100dvh;
                color: var(--primary-text-color, #fff);
                font-family: var(--paper-font-common-base_-_font-family, "Roboto", sans-serif);
                position: relative;
                overflow: hidden;
                border-radius: var(--ha-card-border-radius, 4px);
                box-sizing: border-box;
            }

            /* Standard card placements use the three-column designer in a
               promoted viewport layer after an explicit user action. Keep it over the
               available viewport below HA's header. The mode is latched when
               editing starts, preventing layout flicker. */
            :host([designer-fullscreen]) {
                position: fixed;
                top: var(--header-height, 56px);
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                width: auto;
                height: auto;
                max-height: none;
                border-radius: 0;
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.55);
            }

            :host([designer-fullscreen]) ha-card {
                border-radius: 0;
            }

            ha-card {
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
                min-height: 0;
                width: 100%;
                overflow: hidden;
                position: relative;
            }

            /* The zone grid is the single in-flow child of ha-card; flex-fill it
               so its height is definite and its rows redistribute to fit. */
            wcc-layout {
                flex: 1 1 auto;
                min-height: 0;
            }

            /* Edit-dialog preview only (never dashboard edit mode): render the
               card at the viewport resolution and scale it down to the pane
               width — a faithful miniature with real dashboard proportions.
               Values come from updatePreviewScale(). */
            :host([dialog-preview]) {
                display: block;
                height: auto;
                max-height: none;
            }

            :host([dialog-preview]) ha-card {
                width: var(--wcc-preview-width, 1280px);
                height: var(--wcc-preview-height, 720px);
                transform: scale(var(--wcc-preview-scale, 0.3));
                transform-origin: top left;
            }

            /* Permanent three-column designer in HA dashboard edit mode. */
            .designer-toolbar {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                height: 44px;
                padding: 0 12px;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(255, 255, 255, 0.09);
                background: #0d0e13;
                color: #f2f3f7;
            }

            .designer-heading {
                display: flex;
                align-items: baseline;
                gap: 14px;
                min-width: 0;
            }

            .designer-heading strong {
                flex-shrink: 0;
                color: var(--primary-color, #4f8cff);
                font-size: 0.86rem;
            }

            .designer-heading span {
                overflow: hidden;
                color: #777d90;
                font-size: 0.73rem;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .designer-card-settings {
                display: inline-flex;
                align-items: center;
                flex-shrink: 0;
                gap: 7px;
                min-height: 32px;
                padding: 0 12px;
                border: 1px solid transparent;
                border-radius: 7px;
                background: transparent;
                color: #a0a5b5;
                font: inherit;
                font-size: 0.8rem;
                font-weight: 700;
                cursor: pointer;
            }

            .designer-card-settings ha-icon {
                --mdc-icon-size: 17px;
            }

            .designer-card-settings:hover,
            .designer-card-settings:focus-visible {
                color: #fff;
                outline: none;
            }

            .designer-card-settings.active {
                border-color: var(--primary-color, #3b82f6);
                color: #e9f2ff;
                background: rgba(59, 130, 246, 0.08);
            }

            .designer-toolbar-actions {
                display: flex;
                align-items: center;
                flex-shrink: 0;
                gap: 8px;
            }

            .designer-modes {
                display: flex;
                flex-shrink: 0;
                gap: 5px;
                padding: 3px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                background: #15161c;
            }

            .designer-mode {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                min-height: 34px;
                padding: 0 14px;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: #777d90;
                font: inherit;
                font-size: 0.82rem;
                font-weight: 600;
                cursor: pointer;
            }

            .designer-mode ha-icon {
                --mdc-icon-size: 18px;
            }

            .designer-mode:hover,
            .designer-mode:focus-visible {
                color: #fff;
                outline: none;
            }

            .designer-mode.active {
                background: #242631;
                color: #f5f6fa;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.32);
            }

            .designer-done,
            .designer-launch {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 7px;
                border: 0;
                background: var(--primary-color, #03a9f4);
                color: var(--text-primary-color, #fff);
                font: inherit;
                font-size: 0.82rem;
                font-weight: 700;
                cursor: pointer;
            }

            .designer-done {
                min-height: 34px;
                padding: 0 15px;
                border-radius: 7px;
            }

            .designer-launch {
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 7;
                min-height: 36px;
                padding: 0 14px;
                border-radius: 18px;
                box-shadow: 0 3px 12px rgba(0, 0, 0, 0.42);
            }

            .designer-launch ha-icon {
                --mdc-icon-size: 18px;
            }

            .designer-done:hover,
            .designer-done:focus-visible,
            .designer-launch:hover,
            .designer-launch:focus-visible {
                filter: brightness(1.12);
                outline: 2px solid rgba(255, 255, 255, 0.5);
                outline-offset: 1px;
            }

            wcc-zone-overlay.inplace {
                position: absolute;
                top: 44px;
                left: 0;
                right: 400px;
                bottom: 28px;
                height: auto;
                z-index: 6;
            }

            wcc-layout-inspector.inplace-inspector {
                position: absolute;
                top: 44px;
                right: 0;
                bottom: 28px;
                height: auto;
                z-index: 8;
                width: 400px;
                overflow: hidden;
                border-left: 1px solid rgba(255, 255, 255, 0.09);
            }

            .designer-statusbar {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                height: 28px;
                padding: 0 12px;
                box-sizing: border-box;
                border-top: 1px solid rgba(255, 255, 255, 0.09);
                background: #0d0e13;
                color: #747a8d;
                font-size: 0.68rem;
            }

            .layout-save-status {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                min-width: 0;
                padding: 0;
                border: 0;
                background: transparent;
                color: inherit;
                font: inherit;
                pointer-events: none;
            }

            .layout-save-status ha-icon {
                --mdc-icon-size: 14px;
                color: var(--primary-color, #4f8cff);
            }

            .layout-save-status.saved ha-icon,
            .layout-save-status.idle ha-icon {
                color: #69d7a0;
            }

            .layout-save-status.pending ha-icon {
                color: #fbc02d;
            }

            .layout-save-status.error {
                color: var(--error-color, #ef5350);
                pointer-events: auto;
                cursor: pointer;
            }

            .layout-save-status.error ha-icon {
                color: inherit;
            }

            .designer-status-hint {
                overflow: hidden;
                text-align: right;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            @media (max-width: 1050px) {
                wcc-zone-overlay.inplace {
                    right: 340px;
                }

                wcc-layout-inspector.inplace-inspector {
                    width: 340px;
                }
            }

            @media (max-width: 760px) {
                .designer-heading span,
                .designer-status-hint {
                    display: none;
                }

                wcc-zone-overlay.inplace {
                    right: 0;
                }

                wcc-layout-inspector.inplace-inspector {
                    top: auto;
                    left: 8px;
                    right: 8px;
                    bottom: 36px;
                    width: auto;
                    height: min(52%, 560px);
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    border-radius: 12px 12px 0 0;
                    box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.42);
                }
            }
        `;
    }

    render() {
        // Panel cards expose the designer directly. Standard card placements first
        // show an explicit Configure entry point so neighbouring cards remain
        // accessible while HA is editing the dashboard.
        const inlineEditing = this.preview && !this.hasAttribute('dialog-preview') && !!this.hass;
        const designerVisible = inlineEditing && this.designerOpen;
        const savePresentation = {
            idle: {icon: 'mdi:check-circle-outline', label: this.t('ui.saved', 'Saved')},
            pending: {icon: 'mdi:alert-outline', label: this.t('designer.unsaved', 'Unsaved changes')},
            saving: {icon: 'mdi:content-save-sync-outline', label: this.t('designer.saving', 'Saving…')},
            saved: {icon: 'mdi:check-circle', label: this.t('ui.saved', 'Saved')},
            error: {icon: 'mdi:alert-circle-outline', label: this.layoutSaveError ?? this.t('designer.save_failed', 'Save failed — click to retry')},
        }[this.layoutSaveStatus];
        return html`
            <ha-card style="color: ${this.computeAppearance().fontColor};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
                ${inlineEditing && this.designerRequiresExplicitOpen && !this.designerOpen ? html`
                    <button class="designer-launch" type="button" @click=${this.openFullscreenDesigner}>
                        <ha-icon icon="mdi:tune-variant"></ha-icon>
                        ${this.t('designer.configure_card', 'Configure card')}
                    </button>
                ` : ''}
                ${designerVisible ? html`
                    <div class="designer-toolbar">
                        <div class="designer-heading">
                            <button class="designer-card-settings ${!this.selectedWidget && !this.selectedZone ? 'active' : ''}"
                                    type="button"
                                    aria-pressed=${!this.selectedWidget && !this.selectedZone ? 'true' : 'false'}
                                    @click=${this.openCardSettings}>
                                <ha-icon icon="mdi:theme-light-dark"></ha-icon>
                                ${this.t('designer.card_settings', 'Card settings')}
                            </button>
                            <span>${this.t('designer.drag_hint', 'Drag a widget by its handle · click it to select and configure it')}</span>
                        </div>
                        <div class="designer-toolbar-actions">
                            <div class="designer-modes" role="group" aria-label=${this.t('designer.mode', 'Editor mode')}>
                                <button class="designer-mode ${!this.designerPreview ? 'active' : ''}"
                                        type="button"
                                        aria-pressed=${!this.designerPreview ? 'true' : 'false'}
                                        @click=${() => { this.designerPreview = false; }}>
                                    <ha-icon icon="mdi:layers-outline"></ha-icon>
                                    ${this.t('designer.designer', 'Designer')}
                                </button>
                                <button class="designer-mode ${this.designerPreview ? 'active' : ''}"
                                        type="button"
                                        aria-pressed=${this.designerPreview ? 'true' : 'false'}
                                        @click=${() => { this.designerPreview = true; }}>
                                    <ha-icon icon="mdi:eye-outline"></ha-icon>
                                    ${this.t('designer.preview', 'Preview')}
                                </button>
                            </div>
                            ${this.hasAttribute('designer-fullscreen') ? html`
                                <button class="designer-done" type="button" @click=${this.closeFullscreenDesigner}>
                                    ${this.t('ui.done', 'Done')}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    ${!this.designerPreview ? html`
                        <wcc-zone-overlay class="inplace"
                                .hass=${this.hass}
                                .layout=${this.configV3.layout}
                                .selectedWidget=${this.selectedWidget}
                                .selectedZone=${this.selectedZone}
                                selectable
                                @layout-changed=${this.onInplaceLayoutChanged}
                                @wcc-widget-selected=${this.onInplaceWidgetSelected}
                                @wcc-zone-selected=${this.onInplaceZoneSelected}
                        ></wcc-zone-overlay>
                        <wcc-layout-inspector class="inplace-inspector"
                                .hass=${this.hass}
                                .config=${this.configV3}
                                .layout=${this.configV3.layout}
                                .selectedWidget=${this.selectedWidget}
                                .selectedZone=${this.selectedZone}
                                @wcc-widget-config-changed=${this.onInplaceWidgetConfigChanged}
                                @wcc-zone-settings-changed=${this.onInplaceZoneSettingsChanged}
                                @wcc-card-config-changed=${this.onInplaceCardConfigChanged}
                        ></wcc-layout-inspector>
                    ` : ''}
                    <div class="designer-statusbar">
                        <button class="layout-save-status ${this.layoutSaveStatus}"
                                ?disabled=${this.layoutSaveStatus !== 'error'}
                                title=${this.layoutSaveStatus === 'error' ? this.t('designer.retry_save', 'Retry save') : savePresentation.label}
                                @click=${() => void this.flushLayoutAutosave()}>
                            <ha-icon .icon=${savePresentation.icon}></ha-icon>
                            ${savePresentation.label}
                        </button>
                        <span class="designer-status-hint">
                            ${this.hasAttribute('designer-fullscreen')
                                ? this.t('designer.autosave_hint_local', 'Changes are saved continuously · close this editor with Done')
                                : this.t('designer.autosave_hint', 'Changes are saved continuously · finish the dashboard with Done')}
                        </span>
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

import {css, CSSResult, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
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
     * True when rendered inside the card editor preview. Newer HA sets this
     * property itself; as a fallback we detect the edit dialog around us.
     * Reflected so CSS can give the preview a sane 16:9 shape — without it the
     * card has no height there and the zones pile up into a tall column.
     */
    @property({type: Boolean, reflect: true}) preview = false;

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

    /** The virtual width the 1280x720 preview miniature is rendered at, then scaled. */
    private static readonly PREVIEW_BASE_WIDTH = 1280;
    private previewObserver?: ResizeObserver;

    connectedCallback(): void {
        super.connectedCallback();
        if (!this.preview && this.isInEditPreview()) {
            this.preview = true;
        }
        this.setupPreviewScaling();
        this.initBackgroundImageComponent();
        this.syncLayoutElement();
        this.initConnectCallbackAsync();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.previewObserver?.disconnect();
        this.previewObserver = undefined;
    }

    /** The preview renders the card at full wall-panel size and scales it down
     * to the pane width, so widget sizes (rem/px) look exactly like on the
     * dashboard instead of overflowing the miniature. */
    private setupPreviewScaling(): void {
        if (!this.preview || this.previewObserver) {
            return;
        }
        this.previewObserver = new ResizeObserver(() => this.updatePreviewScale());
        this.previewObserver.observe(this);
        this.updatePreviewScale();
    }

    private updatePreviewScale(): void {
        const scale = this.clientWidth / WallClockCard.PREVIEW_BASE_WIDTH;
        if (scale > 0) {
            this.style.setProperty('--wcc-preview-scale', String(scale));
        }
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

    updated(changedProperties: Map<string, any>): void {
        // HA may set the preview property only after we are connected
        if (changedProperties.has('preview') && this.preview) {
            this.setupPreviewScaling();
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

            /* Editor preview: no parent gives us a height there. Render the card
               at the full 1280x720 wall-panel resolution and scale the whole
               thing down to the pane width — a faithful miniature instead of
               oversized widgets overflowing a tiny box. */
            :host([preview]) {
                height: auto;
                aspect-ratio: 16 / 9;
            }

            :host([preview]) ha-card {
                width: 1280px;
                height: 720px;
                transform: scale(var(--wcc-preview-scale, 0.3));
                transform-origin: top left;
            }
        `;
    }

    render() {
        return html`
            <ha-card style="color: ${this.computeAppearance().fontColor};">
                ${this.backgroundImageComponent}
                ${this.layoutElement}
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

import {css, html, nothing, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import type {HomeAssistant, LovelaceCard, LovelaceCardConfig} from 'custom-card-helpers';
import {WidgetConfig} from '../core/layout-types';
import {localize} from '../utils/localize';
import {createLogger} from '../utils/logger/logger';
import {containsWallClockCard} from './ha-card-config';
import {WidgetElement} from './widget-element';

interface CardHelpers {
    createCardElement(config: LovelaceCardConfig): LovelaceCard | Promise<LovelaceCard>;
}

type CardHelpersWindow = Window & {
    loadCardHelpers?: () => Promise<CardHelpers>;
};

export interface HaCardWidgetConfig extends WidgetConfig {
    card?: LovelaceCardConfig;
    /** Inherited HA card surface variables are made transparent where supported. */
    transparent?: boolean;
}

@customElement('wcc-ha-card-widget')
export class HaCardWidget extends WidgetElement<HaCardWidgetConfig> {
    @state() private cardElement?: LovelaceCard;
    @state() private loading = false;
    @state() private error?: string;

    private appliedCardConfig?: LovelaceCardConfig;
    private buildRevision = 0;
    private logger = createLogger('ha-card-widget');

    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
        }

        :host([transparent]) {
            --ha-card-background: transparent;
            --ha-card-border-color: transparent;
            --ha-card-border-width: 0;
            --ha-card-box-shadow: none;
        }

        .card,
        .card > * {
            display: block;
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
        }

        .status {
            padding: 12px 14px;
            border: 1px dashed color-mix(in srgb, currentColor 35%, transparent);
            border-radius: var(--ha-card-border-radius, 12px);
            background: color-mix(in srgb, var(--card-background-color, #111) 68%, transparent);
            color: inherit;
            font-size: 0.85rem;
            line-height: 1.4;
        }

        .error {
            border-color: color-mix(in srgb, var(--error-color, #db4437) 65%, transparent);
            color: var(--error-color, #db4437);
        }
    `;

    protected applyWidgetState(): void {
        this.toggleAttribute('transparent', this.config.transparent === true);

        if (this.cardElement && this.hass) {
            this.cardElement.hass = this.hass;
        }

        if (this.appliedCardConfig !== this.config.card) {
            this.appliedCardConfig = this.config.card;
            void this.rebuildCard();
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('hass') && this.cardElement && this.hass) {
            this.cardElement.hass = this.hass;
        }
    }

    private text(key: string, fallback: string): string {
        return localize(key, this.hass as HomeAssistant | undefined, fallback);
    }

    private async rebuildCard(): Promise<void> {
        const revision = ++this.buildRevision;
        const cardConfig = this.config.card;
        this.cardElement = undefined;
        this.error = undefined;
        this.loading = false;

        if (!cardConfig?.type) {
            this.loading = false;
            return;
        }
        if (containsWallClockCard(cardConfig)) {
            this.loading = false;
            this.error = this.text(
                'editor.ha_card.recursion_error',
                'wall-clock-card cannot be embedded inside itself.',
            );
            return;
        }

        const loadCardHelpers = (window as CardHelpersWindow).loadCardHelpers;
        if (!loadCardHelpers) {
            this.error = this.text('editor.ha_card.helpers_error', 'Home Assistant card helpers are unavailable.');
            return;
        }

        this.loading = true;
        try {
            const helpers = await loadCardHelpers();
            const element = await Promise.resolve(helpers.createCardElement(cardConfig));
            if (revision !== this.buildRevision) return;

            element.style.display = 'block';
            element.style.width = '100%';
            if (this.hass) element.hass = this.hass;
            element.addEventListener('ll-rebuild', event => {
                event.stopPropagation();
                if (element === this.cardElement) void this.rebuildCard();
            }, {once: true});
            this.cardElement = element;
        } catch (error) {
            if (revision !== this.buildRevision) return;
            const message = error instanceof Error ? error.message : String(error);
            this.logger.error(`Unable to create embedded card: ${message}`);
            this.error = message;
        } finally {
            if (revision === this.buildRevision) this.loading = false;
        }
    }

    render() {
        if (this.error) return html`<div class="status error">${this.error}</div>`;
        if (this.loading) {
            return html`<div class="status">${this.text('editor.ha_card.loading', 'Loading Home Assistant card…')}</div>`;
        }
        if (!this.config.card?.type) {
            return html`<div class="status">${this.text(
                'editor.ha_card.empty',
                'Choose a Home Assistant card in the widget editor.',
            )}</div>`;
        }
        return this.cardElement ? html`<div class="card">${this.cardElement}</div>` : nothing;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-ha-card-widget': HaCardWidget;
    }
}

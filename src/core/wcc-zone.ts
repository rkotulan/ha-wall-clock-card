import {css, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {createLogger} from '../utils/logger/logger';
import {BottomBarRequestUpdateMessage, Messenger} from '../utils';
import {defaultZoneAlignment, ZoneConfig, ZoneId} from './layout-types';
import {WidgetElement} from '../widgets/widget-element';

/**
 * One zone of the 3×3 layout grid.
 *
 * mode 'stack' renders all widgets in a flex stack. mode 'exclusive' renders the
 * highest-priority widget whose isActive is true, with a 500 ms crossfade on
 * change — the generalized BottomBarManager behavior. Activity re-evaluates on
 * BottomBarRequestUpdateMessage (published e.g. by the transportation controller).
 */
@customElement('wcc-zone')
export class WccZone extends LitElement {
    @property({attribute: false}) zoneId?: ZoneId;
    @property({attribute: false}) zoneConfig?: ZoneConfig;
    @property({attribute: false}) widgets: WidgetElement[] = [];

    @state() private activeWidget: WidgetElement | null = null;
    private previousWidget: WidgetElement | null = null;
    private transitionRevision = 0;
    private transitionAnimations: Animation[] = [];
    private messenger = Messenger.getInstance();
    private logger = createLogger('wcc-zone');

    private readonly animationOptions: KeyframeAnimationOptions = {
        duration: 500,
        fill: 'forwards',
    };

    static styles = css`
        :host {
            display: block;
            min-width: 0;
            min-height: 0;
        }

        .stack {
            display: flex;
            width: 100%;
            height: 100%;
            gap: var(--zone-gap, var(--wcc-widget-gap, 8px));
        }

        .stack.column {
            flex-direction: column;
            justify-content: center;
        }

        .stack.row {
            flex-direction: row;
            align-items: center;
        }

        /* Exclusive mode: all items share one grid cell; only the active one
           (plus the previous one during the crossfade) is visible. */
        .exclusive {
            display: grid;
            width: 100%;
        }

        .exclusive > .item {
            grid-column: 1;
            grid-row: 1;
            display: none;
            min-width: 0;
        }

        .exclusive > .item.active,
        .exclusive > .item.previous {
            display: block;
        }

        /* The outgoing layer is visual only. It must never intercept a click
           intended for the newly active action bar underneath/above it. */
        .exclusive > .item.previous {
            pointer-events: none;
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.messenger.subscribe(BottomBarRequestUpdateMessage, this.onRequestUpdate);
        this.updateActiveWidget();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.messenger.unsubscribe(BottomBarRequestUpdateMessage, this.onRequestUpdate);
        this.cancelTransition();
    }

    private onRequestUpdate = (_msg: BottomBarRequestUpdateMessage) => {
        this.updateActiveWidget();
    };

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('widgets') || changedProperties.has('zoneConfig')) {
            this.updateActiveWidget();
        }
    }

    private get isExclusive(): boolean {
        return this.zoneConfig?.mode === 'exclusive';
    }

    /** Picks the highest-priority active widget (exclusive mode only). */
    private updateActiveWidget(): void {
        if (!this.isExclusive) {
            return;
        }
        const sorted = [...this.widgets].sort((a, b) => b.priority - a.priority);
        const next = sorted.find(w => w.isActive) ?? null;
        if (next === this.activeWidget) {
            return;
        }
        this.logger.debug(`Exclusive zone ${this.zoneId}: switching to ${next?.config?.type ?? 'none'}`);

        this.cancelTransition();
        const previous = this.activeWidget;

        // Commit state before lifecycle hooks. A hook may synchronously publish
        // BottomBarRequestUpdateMessage; the nested evaluation must already see
        // the new active widget and return instead of starting the switch again.
        this.activeWidget = next;
        this.previousWidget = previous;
        previous?.deactivate();
        next?.activate();

        if (previous && next) {
            const revision = this.transitionRevision;
            void this.updateComplete.then(() => this.animateTransition(revision));
        } else {
            this.previousWidget = null;
        }
    }

    private cancelTransition(): void {
        this.transitionRevision++;
        for (const animation of this.transitionAnimations) animation.cancel();
        this.transitionAnimations = [];
    }

    private async animateTransition(revision: number): Promise<void> {
        if (revision !== this.transitionRevision) return;
        const current = this.shadowRoot?.querySelector('.item.active');
        const previous = this.shadowRoot?.querySelector('.item.previous');
        if (!current || !previous) {
            this.previousWidget = null;
            this.requestUpdate();
            return;
        }

        const animations = [
            previous.animate([{opacity: 1}, {opacity: 0}], {...this.animationOptions, easing: 'ease-out'}),
            current.animate([{opacity: 0}, {opacity: 1}], {...this.animationOptions, easing: 'ease-in'}),
        ];
        this.transitionAnimations = animations;

        try {
            await Promise.all(animations.map(animation => animation.finished));
        } catch {
            // A newer switch or disconnect cancelled this transition.
            return;
        }
        if (revision !== this.transitionRevision) return;

        // Remove the outgoing item from the rendered layer, then release the
        // finished animation effects so no invisible element remains on top.
        this.previousWidget = null;
        this.requestUpdate();
        await this.updateComplete;
        if (revision !== this.transitionRevision) return;
        for (const animation of animations) animation.cancel();
        this.transitionAnimations = [];
    }

    render(): TemplateResult {
        const config = this.zoneConfig;
        const gap = config?.gap ? `--zone-gap: ${config.gap};` : '';
        const padding = config?.padding ? `padding: ${config.padding};` : '';
        const align = ({start: 'flex-start', center: 'center', end: 'flex-end'} as const)[
            config?.align ?? defaultZoneAlignment(this.zoneId)
        ];

        if (this.isExclusive) {
            return html`
                <div class="exclusive" style="${padding}">
                    ${this.widgets.map(widget => html`
                        <div class="item
                                    ${widget === this.activeWidget ? 'active' : ''}
                                    ${widget === this.previousWidget ? 'previous' : ''}">
                            ${widget}
                        </div>
                    `)}
                </div>
            `;
        }

        const direction = config?.direction === 'row' ? 'row' : 'column';
        const alignStyle = direction === 'column' ? `align-items: ${align};` : `justify-content: ${align};`;
        return html`
            <div class="stack ${direction}" style="${gap} ${padding} ${alignStyle}">
                ${this.widgets}
            </div>
        `;
    }
}

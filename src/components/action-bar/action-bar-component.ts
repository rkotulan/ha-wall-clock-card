import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    ActiveComponentChangedMessage,
    ActiveComponentState,
    BottomBarRequestUpdateMessage,
    createLogger,
    getButtonSizeValue,
    getSizeValue,
    Messenger,
} from '../../utils';
import { ActionBarController } from './action-bar-controller';
import {
    ActionBarConfig,
    executeAction,
    ActionBarAlignment, ModuleActionConfig, ActionGesture
} from './types';
import { HomeAssistant, hasAction } from 'custom-card-helpers';
import { actionHandler } from './action-handler-directive';
import { PluginRegistry } from './plugin-registry';
import { BottomBarComponent } from '../bottom-bar';
import { Size } from '../../core/types';

export interface ActionBarComponentConfig {
    actionBar?: ActionBarConfig;
    fontColor?: string;
    size?: Size;
    iconSize?: string;
}

@customElement('ha-action-bar')
export class ActionBarComponent extends BottomBarComponent {
    /**
     * Priority of this component
     * Higher priority components take precedence when multiple are active
     */
    get priority(): number {
        return 5; // Lower than transportation
    }

    /**
     * Whether this component wants to be displayed
     */
    get isActive(): boolean {
        return !this.transportationActive
            && this.config?.enabled === true
            && !!this.config.actions?.length;
    }

    @property({ type: Object }) config?: ActionBarConfig;
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;
    @property({ type: String }) size?: Size;
    @property({ type: String }) iconSize?: string;
    @state() private transportationActive = false;

    private logger = createLogger('action-bar-component');
    private actionBarController: ActionBarController;

    constructor() {
        super();
        // Initialize the controller with the host (this component)
        this.actionBarController = new ActionBarController(this, {
            actionBar: this.config
        });
    }

    private readonly onActiveComponentChanged = (message: ActiveComponentChangedMessage): void => {
        if (message.componentName !== 'transportation' || this.transportationActive === message.state) return;
        this.transportationActive = message.state;
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.transportationActive = ActiveComponentState.getInstance().isActive('transportation');
        Messenger.getInstance().subscribe(ActiveComponentChangedMessage, this.onActiveComponentChanged);
    }

    disconnectedCallback(): void {
        Messenger.getInstance().unsubscribe(ActiveComponentChangedMessage, this.onActiveComponentChanged);
        super.disconnectedCallback();
    }

    get controller(): ActionBarController {
        return this.actionBarController;
    }

    getIconSize(): string {
        return getSizeValue(this.size, this.iconSize, 'iconSize');
    }

    getButtonSize(): string {
        return getButtonSizeValue(this.size, this.iconSize);
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own content. */
        .action-bar-container {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            z-index: 3;
            padding: var(--action-bar-padding, 16px);
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            gap: var(--action-button-gap, 16px);
            height: auto;
            min-height: var(--action-button-size, 144px);
        }

        .action-bar-container.horizontal {
            flex-direction: row;
            align-items: center;
        }

        .action-bar-container.vertical {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: fit-content;
            max-width: 100%;
            border-radius: var(--ha-card-border-radius, 4px);
        }

        .action-bar-container.vertical.align-left {
            margin-left: 0;
            margin-right: auto;
        }

        .action-bar-container.vertical.align-center {
            margin-left: auto;
            margin-right: auto;
        }

        .action-bar-container.vertical.align-right {
            margin-left: auto;
            margin-right: 0;
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90px;
            width: var(--action-button-size, 144px);
            height: var(--action-button-size, 144px);
            transition: all 0.3s ease;
        }

        .action-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .action-button:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }

        .action-button.active ha-icon {
            color: #ffeb3b; /* Yellow color for active state */
        }

        .action-button svg, .action-button ha-icon {
            width: 72px;
            height: 72px;
            fill: currentColor;
            margin-bottom: 0;
        }

        .action-button ha-icon {
            --mdc-icon-size: 72px;
            color: currentColor;
        }

        .action-title {
            font-size: 18px;
            font-weight: 400;
            text-align: center;
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('config')) {
            this.logger.debug('Config properties changed, updating ActionBarController');

            // Update ActionBarController with new configuration
            this.actionBarController.updateConfig({
                actionBar: this.config
            });

            Messenger.getInstance().publish(new BottomBarRequestUpdateMessage());
        }

        // If hass has changed, we need to re-render to update the icon and active state
        if (changedProperties.has('hass') && this.hass) {
            this.requestUpdate();
        }
    }

    /**
     * Get the CSS justify-content value based on the alignment setting
     */
    private getFlexAlignment(): string {
        if (!this.config || !this.config.alignment) {
            return 'center'; // Default to center for backward compatibility
        }

        switch (this.config.alignment) {
            case ActionBarAlignment.Left:
                return 'flex-start';
            case ActionBarAlignment.Right:
                return 'flex-end';
            case ActionBarAlignment.Center:
            default:
                return 'center';
        }
    }

    render() {
        if (this.transportationActive
            || !this.config
            || this.config.enabled === false
            || !this.config.actions
            || this.config.actions.length === 0) {
            return html``;
        }

        const orientation = this.config.orientation ?? 'horizontal';
        const flexAlignment = this.getFlexAlignment();
        const alignmentStyle = orientation === 'vertical'
            ? 'justify-content: center; align-items: center;'
            : `justify-content: ${flexAlignment}; align-items: center;`;
        const alignment = !this.config.alignment || this.config.alignment === ActionBarAlignment.Auto
            ? ActionBarAlignment.Center
            : this.config.alignment;
        const buttonSize = this.getButtonSize();

        // Use the configured backgroundOpacity or default to 0.3
        const opacity = this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.3;
        const buttonGap = this.config.buttonGap?.trim() || '16px';
        const padding = this.config.padding?.trim() || '16px';

        this.logger.debug(`Rendering action bar - ButtonSize: ${buttonSize}`);

        return html`
            <div class="action-bar-container ${orientation} align-${alignment}"
                style="color: ${this.fontColor}; 
                       ${alignmentStyle}
                       background-color: rgba(0, 0, 0, ${opacity});
                       --action-button-size: ${buttonSize};
                       --action-button-gap: ${buttonGap};
                       --action-bar-padding: ${padding};">
                ${this.config.actions.map(action => this.renderActionButton(action))}
            </div>
        `;
    }

    /**
     * Render an action button
     */
    private renderActionButton(action: ModuleActionConfig) {
        // Get the plugin for this action type
        const registry = PluginRegistry.getInstance();
        const plugin = registry.getPlugin(action.actionId);

        let isActive = action.active || false;
        // Use a local variable for the icon instead of modifying the action object
        let iconToUse = action.icon;

        // If the plugin has a getIconForState method, use it to get the icon
        if (plugin && 'getIconForState' in plugin && this.hass) {
            iconToUse = (plugin as any).getIconForState(action, this.hass);
        }

        // If the plugin has a getActiveState method, use it to determine active state
        if (plugin && 'getActiveState' in plugin) {
            isActive = (plugin as any).getActiveState();
        }

        const activeClass = isActive ? 'active' : '';

        // Use the configured activeColor or default to the CSS-defined color
        const activeColorStyle = isActive && action.activeColor 
            ? `--active-icon-color: ${action.activeColor};` 
            : '';

        return html`
            <div class="action-button ${activeClass}"
                 style="${activeColorStyle}"
                 role="button"
                 tabindex="0"
                 aria-label="${action.title}"
                 ${actionHandler({
                     hasHold: hasAction(action.hold_action),
                     hasDoubleClick: hasAction(action.double_tap_action),
                 })}
                 @action=${(ev: CustomEvent) => this._handleAction(action, ev.detail?.action || 'tap')}>
                ${iconToUse && iconToUse.startsWith('mdi:') 
                    ? html`<ha-icon icon="${iconToUse}" 
                                   style="${isActive && action.activeColor ? `color: ${action.activeColor};` : ''} 
                                          width: ${this.getIconSize()}; 
                                          height: ${this.getIconSize()}; 
                                          --mdc-icon-size: ${this.getIconSize()};">
                           </ha-icon>` 
                    : html`<svg viewBox="0 0 24 24"
                               style="${isActive && action.activeColor ? `fill: ${action.activeColor};` : ''} 
                                      width: ${this.getIconSize()}; 
                                      height: ${this.getIconSize()};">
                        <path d="${iconToUse}"></path>
                      </svg>`
                }
                <div class="action-title">${action.title}</div>
            </div>
        `;
    }

    /**
     * Handle a tap/hold/double-tap gesture on an action button
     */
    private _handleAction(action: ModuleActionConfig, gesture: ActionGesture): void {
        if (!this.hass) {
            this.logger.error('Home Assistant instance not available');
            return;
        }

        this.logger.debug(`Action ${gesture}:`, action);
        executeAction(action, this.hass, this, gesture);
    }
}

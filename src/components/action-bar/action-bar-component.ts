import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createLogger } from '../../utils';
import { ActionBarController } from './action-bar-controller';
import {
    ActionBarConfig,
    executeAction,
    ActionBarAlignment, ModuleActionConfig
} from './types';
import { HomeAssistant} from 'custom-card-helpers';
import { PluginRegistry } from './plugin-registry';
import { BottomBarComponent } from '../bottom-bar';

export interface ActionBarComponentConfig {
    actionBar?: ActionBarConfig;
    fontColor?: string;
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
        return this.config?.enabled===true && this.config.actions && this.config.actions.length > 0;
    }

    @property({ type: Object }) config?: ActionBarConfig;
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;

    private logger = createLogger('action-bar-component');
    private actionBarController: ActionBarController;

    constructor() {
        super();
        // Initialize the controller with the host (this component)
        this.actionBarController = new ActionBarController(this, {
            actionBar: this.config
        });
    }

    get controller(): ActionBarController {
        return this.actionBarController;
    }

    static styles = css`
        .action-bar-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            z-index: 3;
            padding: 16px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 0 0 var(--ha-card-border-radius, 4px) var(--ha-card-border-radius, 4px);
            gap: 16px;
            height: auto;
            min-height: 144px;
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90px;
            width: 144px;
            height: 144px;
            transition: all 0.3s ease;
        }

        .action-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
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
        }

        // If hass has changed, we need to re-render to update the icon and active state
        if (changedProperties.has('hass') && this.hass) {
            this.requestUpdate();
        }
    }

    /**
     * Get the CSS justify-content value based on the alignment setting
     */
    private getJustifyContent(): string {
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
        if (!this.config || this.config.enabled === false || !this.config.actions || this.config.actions.length === 0) {
            return html``;
        }

        const justifyContent = this.getJustifyContent();

        // Use the configured backgroundOpacity or default to 0.3
        const opacity = this.config.backgroundOpacity !== undefined ? this.config.backgroundOpacity : 0.3;

        return html`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${justifyContent}; 
                       background-color: rgba(0, 0, 0, ${opacity});">
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
                 @click=${() => this._handleActionClick(action)}>
                ${iconToUse && iconToUse.startsWith('mdi:') 
                    ? html`<ha-icon icon="${iconToUse}" 
                                   style="${isActive && action.activeColor ? `color: ${action.activeColor};` : ''}">
                           </ha-icon>` 
                    : html`<svg viewBox="0 0 24 24"
                               style="${isActive && action.activeColor ? `fill: ${action.activeColor};` : ''}">
                        <path d="${iconToUse}"></path>
                      </svg>`
                }
                <div class="action-title">${action.title}</div>
            </div>
        `;
    }

    /**
     * Handle click on an action button
     */
    private _handleActionClick(action: ModuleActionConfig): void {
        if (!this.hass) {
            this.logger.error('Home Assistant instance not available');
            return;
        }

        // const eventDetail = { entityId: 'cover.somfy_roleta_obyvak_prava_2', view: 'info' } as any;
        // fireEvent(this, 'hass-more-info', eventDetail);

        this.logger.debug('Action clicked:', action);
        executeAction(action, this.hass, this);
    }
}

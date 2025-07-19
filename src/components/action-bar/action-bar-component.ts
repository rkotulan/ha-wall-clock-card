import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createLogger } from '../../utils';
import { ActionBarController } from './action-bar-controller';
import {
    ActionBarConfig,
    executeAction,
    ActionBarAlignment, ModuleActionConfig
} from './types';
import { HomeAssistant } from 'custom-card-helpers';

export interface ActionBarComponentConfig {
    actionBar?: ActionBarConfig;
    enableActionBar?: boolean;
    fontColor?: string;
}

@customElement('ha-action-bar')
export class ActionBarComponent extends LitElement {
    @property({ type: Object }) actionBar?: ActionBarConfig;
    @property({ type: Boolean }) enableActionBar?: boolean = true;
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;

    private logger = createLogger('action-bar-component');
    private actionBarController: ActionBarController;

    constructor() {
        super();
        // Initialize the controller with the host (this component)
        this.actionBarController = new ActionBarController(this, {
            actionBar: this.actionBar,
            enableActionBar: this.enableActionBar
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
        }

        .action-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90px;
            padding: 12px;
            width: 144px;
            height: 144px;
            transition: all 0.3s ease;
        }

        .action-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .action-button svg, .action-button ha-icon {
            width: 72px;
            height: 72px;
            fill: currentColor;
            margin-bottom: 8px;
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

        if (changedProperties.has('actionBar') || 
            changedProperties.has('enableActionBar')) {

            this.logger.debug('Action bar properties changed, updating ActionBarController');

            // Update ActionBarController with new configuration
            this.actionBarController.updateConfig({
                actionBar: this.actionBar,
                enableActionBar: this.enableActionBar
            });
        }
    }

    /**
     * Get the CSS justify-content value based on the alignment setting
     */
    private getJustifyContent(): string {
        if (!this.actionBar || !this.actionBar.alignment) {
            return 'center'; // Default to center for backward compatibility
        }

        switch (this.actionBar.alignment) {
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
        if (!this.actionBar || this.enableActionBar === false || !this.actionBar.actions || this.actionBar.actions.length === 0) {
            return html``;
        }

        const justifyContent = this.getJustifyContent();

        // Use the configured backgroundOpacity or default to 0.3
        const opacity = this.actionBar.backgroundOpacity !== undefined ? this.actionBar.backgroundOpacity : 0.3;

        return html`
            <div class="action-bar-container" 
                style="color: ${this.fontColor}; 
                       justify-content: ${justifyContent}; 
                       background-color: rgba(0, 0, 0, ${opacity});">
                ${this.actionBar.actions.map(action => this.renderActionButton(action))}
            </div>
        `;
    }

    /**
     * Render an action button
     */
    private renderActionButton(action: ModuleActionConfig) {
        return html`
            <div class="action-button" @click=${() => this._handleActionClick(action)}>
                ${action.icon && action.icon.startsWith('mdi:') 
                    ? html`<ha-icon icon="${action.icon}"></ha-icon>` 
                    : html`<svg viewBox="0 0 24 24">
                        <path d="${action.icon}"></path>
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

        this.logger.debug('Action clicked:', action);
        executeAction(action, this.hass);
    }
}

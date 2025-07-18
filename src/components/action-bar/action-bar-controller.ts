import { ReactiveControllerHost } from 'lit';
import { BaseController } from '../../utils/controllers';
import { ActionBarConfig, ActionBarControllerConfig, ActionRegistry, ActionHandler, ExtendedActionType } from './types';

/**
 * A reactive controller that manages action bar functionality
 */
export class ActionBarController extends BaseController {
    // Configuration
    private config: ActionBarControllerConfig = {};
    private registry: ActionRegistry;

    constructor(host: ReactiveControllerHost, config: ActionBarControllerConfig = {}) {
        super(host, 'action-bar-controller');
        this.config = config;
        this.registry = ActionRegistry.getInstance();
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        // No initialization needed for action bar
        this.logger.debug('Action bar controller connected');
    }

    protected onHostDisconnected(): void {
        // No cleanup needed for action bar
        this.logger.debug('Action bar controller disconnected');
    }

    /**
     * Update the configuration
     */
    updateConfig(config: ActionBarControllerConfig): void {
        this.logger.debug('Updating ActionBarController config:', config);

        // Update config
        this.config = { ...this.config, ...config };

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Get the action bar configuration
     */
    get actionBarConfig(): ActionBarConfig | undefined {
        return this.config.actionBar;
    }

    /**
     * Check if action bar is enabled
     */
    get isActionBarEnabled(): boolean {
        return this.config.enableActionBar !== false && 
               !!this.config.actionBar && 
               this.config.actionBar.enabled !== false;
    }

    /**
     * Register a handler for an action type
     * @param actionType The action type to register a handler for
     * @param handler The handler function
     */
    public registerActionHandler(actionType: ExtendedActionType, handler: ActionHandler): void {
        this.logger.debug(`Registering handler for action type: ${actionType}`);
        this.registry.registerHandler(actionType, handler);
    }

    /**
     * Get the handler for an action type
     * @param actionType The action type to get the handler for
     * @returns The handler function, or undefined if no handler is registered
     */
    public getActionHandler(actionType: ExtendedActionType): ActionHandler | undefined {
        return this.registry.getHandler(actionType);
    }
}

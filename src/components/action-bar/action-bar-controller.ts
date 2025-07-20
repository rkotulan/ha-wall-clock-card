import { ReactiveControllerHost } from 'lit';
import { BaseController } from '../../utils/controllers';
import { ActionBarConfig, ActionBarControllerConfig, ActionRegistry, ActionHandler } from './types';

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
     * 
     * Returns true if actionBar exists and enabled is true
     * Default to false if actionBar doesn't exist or enabled is not set
     */
    get isActionBarEnabled(): boolean {
        // If actionBar exists and enabled is explicitly set to true
        return this.config.actionBar?.enabled === true;
    }

    /**
     * Register a handler for an action type
     * @param actionId The unique string identifier for the action type
     * @param handler The handler function
     */
    public registerActionHandler(actionId: string, handler: ActionHandler): void {
        this.logger.debug(`Registering handler for action type: ${actionId}`);
        this.registry.registerHandler(actionId, handler);
    }

    /**
     * Get the handler for an action type
     * @param actionId The unique string identifier for the action type
     * @returns The handler function, or undefined if no handler is registered
     */
    public getActionHandler(actionId: string): ActionHandler | undefined {
        return this.registry.getHandler(actionId);
    }
}

import {HomeAssistant} from 'custom-card-helpers';

/**
 * Alignment options for action bar buttons
 */
export enum ActionBarAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

/**
 * Base interface for all action configurations
 */
export interface BaseActionConfig {
    actionId: string;
    title: string;
    icon: string;
}

/**
 * Configuration for a module-provided action
 */
export interface ModuleActionConfig extends BaseActionConfig {
    // actionId is inherited from BaseActionConfig
    /**
     * Whether the action is in an active state
     */
    active?: boolean;

    /**
     * Color to use when the action is in active state
     */
    activeColor?: string;

    [key: string]: any; // Allow any additional properties for module-specific configuration
}

/**
 * Union type for all action configurations
 */
// export type ActionConfig = NavigateActionConfig | CallServiceActionConfig | ModuleActionConfig;

/**
 * Type for action handler functions
 */
export type ActionHandler<T extends ModuleActionConfig = ModuleActionConfig> = (action: T, hass: HomeAssistant) => void;

/**
 * Registry for action handlers
 */
export class ActionRegistry {
    private static instance: ActionRegistry;
    private handlers: Map<string, ActionHandler> = new Map();

    private constructor() {
        // Built-in handlers are registered by their respective plugins
    }

    /**
     * Get the singleton instance of the registry
     */
    public static getInstance(): ActionRegistry {
        if (!ActionRegistry.instance) {
            ActionRegistry.instance = new ActionRegistry();
        }
        return ActionRegistry.instance;
    }

    /**
     * Register a handler for an action type
     * @param actionId The unique string identifier for the action type
     * @param handler The handler function
     */
    public registerHandler<T extends ModuleActionConfig>(
        actionId: string, 
        handler: ActionHandler<T>
    ): void {
        this.handlers.set(actionId, handler as ActionHandler);
    }

    /**
     * Get the handler for an action type
     * @param actionId The unique string identifier for the action type
     * @returns The handler function, or undefined if no handler is registered
     */
    public getHandler(actionId: string): ActionHandler | undefined {
        return this.handlers.get(actionId);
    }
}

/**
 * Configuration for the action-bar component
 */
export interface ActionBarConfig {
    enabled?: boolean;
    actions: ModuleActionConfig[];
    alignment?: ActionBarAlignment;
    backgroundOpacity?: number; // Controls the opacity of the action bar background (0-1)
}

/**
 * Configuration for the action-bar controller
 */
export interface ActionBarControllerConfig {
    actionBar?: ActionBarConfig;
}

/**
 * Execute an action based on its configuration
 * @param action The action configuration
 * @param hass The Home Assistant instance
 */
export function executeAction(action: ModuleActionConfig, hass: HomeAssistant): void {
    const registry = ActionRegistry.getInstance();
    const handler = registry.getHandler(action.actionId);

    if (handler) {
        handler(action, hass);
    } else {
        console.warn(`No handler registered for action type: ${action.actionId}`);
    }
}

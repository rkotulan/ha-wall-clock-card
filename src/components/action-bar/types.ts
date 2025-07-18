import { HomeAssistant } from 'custom-card-helpers';

/**
 * Types of actions that can be performed by action-bar buttons
 * 
 * Note: While we use an enum for built-in action types for type safety,
 * plugins should use string constants for their action types.
 * The ExtendedActionType type allows for both enum values and string literals.
 */
export enum ActionType {
    Navigate = 'navigate',
    CallService = 'call-service',
    Custom = 'custom'
}

/**
 * String constants for built-in action types
 * These match the values in the ActionType enum and can be used
 * when string literals are preferred over enum values
 */
export const ACTION_TYPE = {
    NAVIGATE: 'navigate',
    CALL_SERVICE: 'call-service',
    CUSTOM: 'custom'
} as const;

// Type to allow extending ActionType with string literals
export type ExtendedActionType = ActionType | string;

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
    type: ExtendedActionType;
    title: string;
    icon: string;
}

/**
 * Configuration for a navigation action
 */
export interface NavigateActionConfig extends BaseActionConfig {
    type: ActionType.Navigate;
    path: string;
}

/**
 * Configuration for a service call action
 */
export interface CallServiceActionConfig extends BaseActionConfig {
    type: ActionType.CallService;
    service: string;
    service_data?: Record<string, any>;
}

/**
 * Configuration for a custom action
 */
export interface CustomActionConfig extends BaseActionConfig {
    type: ActionType.Custom;
    action: string;
}

/**
 * Configuration for a module-provided action
 */
export interface ModuleActionConfig extends BaseActionConfig {
    type: string; // This will be a string literal not in the ActionType enum
    [key: string]: any; // Allow any additional properties for module-specific configuration
}

/**
 * Union type for all action configurations
 */
export type ActionConfig = NavigateActionConfig | CallServiceActionConfig | CustomActionConfig | ModuleActionConfig;

/**
 * Type for action handler functions
 */
export type ActionHandler<T extends ActionConfig = ActionConfig> = (action: T, hass: HomeAssistant) => void;

/**
 * Registry for action handlers
 */
export class ActionRegistry {
    private static instance: ActionRegistry;
    private handlers: Map<string, ActionHandler> = new Map();

    private constructor() {
        // Register built-in handlers
        this.registerHandler<NavigateActionConfig>(ActionType.Navigate, (action) => {
            // Navigate to the specified path
            window.history.pushState(null, '', action.path);
            const event = new Event('location-changed', { composed: true });
            window.dispatchEvent(event);
        });

        this.registerHandler<CallServiceActionConfig>(ActionType.CallService, (action, hass) => {
            // Call the specified service
            const [domain, service] = action.service.split('.');
            hass.callService(domain, service, action.service_data);
        });

        this.registerHandler<CustomActionConfig>(ActionType.Custom, (action) => {
            // Execute custom action (to be implemented)
            console.log('Custom action:', action.action);
        });
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
     * @param actionType The action type to register a handler for
     * @param handler The handler function
     */
    public registerHandler<T extends ActionConfig = ActionConfig>(
        actionType: ExtendedActionType, 
        handler: ActionHandler<T>
    ): void {
        this.handlers.set(actionType.toString(), handler as ActionHandler);
    }

    /**
     * Get the handler for an action type
     * @param actionType The action type to get the handler for
     * @returns The handler function, or undefined if no handler is registered
     */
    public getHandler(actionType: ExtendedActionType): ActionHandler | undefined {
        return this.handlers.get(actionType.toString());
    }
}

/**
 * Configuration for the action-bar component
 */
export interface ActionBarConfig {
    enabled?: boolean;
    actions: ActionConfig[];
    alignment?: ActionBarAlignment;
}

/**
 * Configuration for the action-bar controller
 */
export interface ActionBarControllerConfig {
    actionBar?: ActionBarConfig;
    enableActionBar?: boolean;
}

/**
 * Execute an action based on its configuration
 * @param action The action configuration
 * @param hass The Home Assistant instance
 */
export function executeAction(action: ActionConfig, hass: HomeAssistant): void {
    const registry = ActionRegistry.getInstance();
    const handler = registry.getHandler(action.type);

    if (handler) {
        handler(action, hass);
    } else {
        console.warn(`No handler registered for action type: ${action.type}`);
    }
}

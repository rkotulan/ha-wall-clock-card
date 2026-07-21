import {HomeAssistant, ActionConfig, handleAction} from 'custom-card-helpers';
import type {WidgetOrientation} from '../../core/layout-types';

/**
 * Alignment options for action bar buttons
 */
export enum ActionBarAlignment {
    Auto = 'auto',
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

    /**
     * Entity read by handleAction() for the more-info and toggle actions
     */
    entity?: string;

    /**
     * Standard Home Assistant actions. When tap_action is set, executeAction()
     * routes the whole action through HA's handleAction() instead of a plugin
     * handler, so any action bar button can use standard HA actions.
     */
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;

    [key: string]: any; // Allow any additional properties for module-specific configuration
}

/**
 * Union type for all action configurations
 */
// export type ActionConfig = NavigateActionConfig | CallServiceActionConfig | ModuleActionConfig;

/**
 * Type for action handler functions
 */
export type ActionHandler<T extends ModuleActionConfig = ModuleActionConfig> = 
  (action: T, hass: HomeAssistant, element?: HTMLElement) => void;

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
    orientation?: WidgetOrientation;
    backgroundOpacity?: number; // Controls the opacity of the action bar background (0-1)
    /** CSS gap between action buttons (for example, `12px` or `0.75rem`). */
    buttonGap?: string;
    /** CSS padding shorthand inside the action bar panel. */
    padding?: string;
}

/**
 * Configuration for the action-bar controller
 */
export interface ActionBarControllerConfig {
    actionBar?: ActionBarConfig;
}

/**
 * Gesture that triggered an action, matching HA's handleAction contract
 */
export type ActionGesture = 'tap' | 'hold' | 'double_tap';

/**
 * Execute an action based on its configuration
 * @param action The action configuration
 * @param hass The Home Assistant instance
 * @param element Optional HTML element that triggered the action
 * @param gesture The gesture that triggered the action (default 'tap')
 */
/**
 * A valid standard HA action config is a plain object with a string `action`.
 * Anything else (e.g. an automation action sequence stored by mistake) is
 * ignored so the plugin handler still runs instead of a silent no-op.
 */
function isStandardActionConfig(value: unknown): value is ActionConfig {
    return !!value
        && typeof value === 'object'
        && !Array.isArray(value)
        && typeof (value as any).action === 'string';
}

export function executeAction(
    action: ModuleActionConfig,
    hass: HomeAssistant,
    element?: HTMLElement,
    gesture: ActionGesture = 'tap'
): void {
    let standardAction = gesture === 'hold' ? action.hold_action
        : gesture === 'double_tap' ? action.double_tap_action
        : action.tap_action;

    if (standardAction && !isStandardActionConfig(standardAction)) {
        console.warn(`Ignoring invalid ${gesture} action config (expected an object with an "action" key):`, standardAction);
        standardAction = undefined;
    }

    // Any action carrying a standard HA action config for this gesture goes
    // through HA's own handleAction(), regardless of which plugin it belongs to.
    if (standardAction) {
        const config: ModuleActionConfig = { ...action };
        // handleAction() reads `entity` from the top-level config for
        // more-info/toggle; also accept it nested inside the action config.
        const nestedEntity = (standardAction as any).entity
            || (standardAction as any).entity_id
            || action.entity_id;
        if (!config.entity && nestedEntity) {
            config.entity = nestedEntity;
        }
        handleAction(element || document.body, hass, config, gesture);
        return;
    }

    // Plugin handlers only respond to tap; a hold/double-tap without a
    // configured standard action does nothing.
    if (gesture !== 'tap') {
        return;
    }

    const registry = ActionRegistry.getInstance();
    const handler = registry.getHandler(action.actionId);

    if (handler) {
        handler(action, hass, element);
    } else {
        console.warn(`No handler registered for action type: ${action.actionId}`);
    }
}

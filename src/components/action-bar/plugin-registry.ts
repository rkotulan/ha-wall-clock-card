import { ActionRegistry, ActionHandler, ActionConfig } from './types';

/**
 * Interface for a complete plugin
 * This interface combines metadata, handler function, and editor component
 */
export interface ActionPlugin<T extends ActionConfig = ActionConfig> {
    /**
     * The unique string identifier for this plugin
     */
    readonly actionId: string;

    /**
     * The display name of the plugin
     */
    readonly name: string;

    /**
     * Optional description of the plugin
     */
    readonly description?: string;

    /**
     * Optional icon for the plugin
     */
    readonly icon?: string;

    /**
     * Handler function for actions of this type
     */
    readonly handler: ActionHandler<T>;

    /**
     * Optional editor component tag name
     */
    readonly editorComponent?: string;

    /**
     * Optional helper function to create action configurations
     */
    createActionConfig?: (...args: any[]) => T;

    /**
     * Register the plugin with the registry
     */
    register(): void;
}

/**
 * Registry for action plugins
 * This class manages the registration and retrieval of plugins
 */
export class PluginRegistry {
    private static instance: PluginRegistry;
    private plugins: Map<string, ActionPlugin<ActionConfig>> = new Map();
    private actionRegistry: ActionRegistry;

    private constructor() {
        this.actionRegistry = ActionRegistry.getInstance();
        // Plugins are registered explicitly in the index.ts file
    }

    /**
     * Get the singleton instance of the registry
     */
    public static getInstance(): PluginRegistry {
        if (!PluginRegistry.instance) {
            PluginRegistry.instance = new PluginRegistry();
        }
        return PluginRegistry.instance;
    }

    /**
     * Register a plugin
     * @param plugin The plugin to register
     */
    public registerPlugin<T extends ActionConfig>(plugin: ActionPlugin<T>): void {
        const actionId = plugin.actionId;
        this.plugins.set(actionId, plugin as unknown as ActionPlugin<ActionConfig>);
    }

    /**
     * Register a plugin with a handler
     * @param plugin The plugin to register
     */
    public registerPluginWithHandler<T extends ActionConfig>(plugin: ActionPlugin<T>): void {
        this.registerPlugin(plugin);
        this.actionRegistry.registerHandler(plugin.actionId, plugin.handler as ActionHandler);
    }

    /**
     * Get all registered plugins
     * @returns An array of plugins
     */
    public getAllPlugins(): ActionPlugin<ActionConfig>[] {
        return Array.from(this.plugins.values());
    }

    /**
     * Get a plugin by action ID
     * @param actionId The unique string identifier for the action type
     * @returns The plugin, or undefined if not found
     */
    public getPlugin(actionId: string): ActionPlugin<ActionConfig> | undefined {
        return this.plugins.get(actionId);
    }

    /**
     * Get all registered action IDs
     * @returns An array of action IDs
     */
    public getAllActionIds(): string[] {
        return Array.from(this.plugins.keys());
    }
}

/**
 * Register a plugin with the PluginRegistry
 * @param plugin The plugin to register
 */
export function registerPlugin<T extends ActionConfig = ActionConfig>(
    plugin: ActionPlugin<T>
): void {
    const registry = PluginRegistry.getInstance();
    registry.registerPluginWithHandler(plugin);
}

import {createLogger} from '../utils/logger/logger';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';

/**
 * A widget plugin: metadata + element factory for one widget type.
 * Mirrors the ActionPlugin pattern (src/components/action-bar/plugin-registry.ts)
 * so the codebase keeps a single plugin idiom.
 */
export interface WidgetPlugin<C extends WidgetConfig = WidgetConfig> {
    /** Unique widget type id ('clock', 'weather', ...). */
    readonly widgetId: string;
    /** Display name shown in the editor palette. */
    readonly name: string;
    readonly description?: string;
    /** mdi:* icon shown in the editor palette. */
    readonly icon: string;
    /** Custom element tag of the widget (must extend WidgetElement). */
    readonly elementTag: string;
    /** Custom element tag of the widget's config editor section. */
    readonly editorTag?: string;
    /** Only one instance may exist in a card layout. */
    readonly singleton?: boolean;
    /** Default configuration used when the widget is added from the palette. */
    defaultConfig(): C;
}

/**
 * Singleton registry of widget plugins. Built-ins are registered eagerly in
 * src/widgets/index.ts; custom widgets can be added at runtime via registerWidget().
 */
export class WidgetRegistry {
    private static instance: WidgetRegistry;
    private widgets: Map<string, WidgetPlugin> = new Map();
    private logger = createLogger('widget-registry');

    private constructor() {
    }

    public static getInstance(): WidgetRegistry {
        if (!WidgetRegistry.instance) {
            WidgetRegistry.instance = new WidgetRegistry();
        }
        return WidgetRegistry.instance;
    }

    public register<C extends WidgetConfig>(plugin: WidgetPlugin<C>): void {
        this.widgets.set(plugin.widgetId, plugin as unknown as WidgetPlugin);
    }

    public registerAll(plugins: WidgetPlugin[]): void {
        plugins.forEach(plugin => this.register(plugin));
    }

    public getWidget(widgetId: string): WidgetPlugin | undefined {
        return this.widgets.get(widgetId);
    }

    public getAllWidgets(): WidgetPlugin[] {
        return Array.from(this.widgets.values());
    }

    /**
     * Creates the element for a widget config. Unknown widget types log a warning
     * and return undefined (ignore invalid, don't break the card).
     */
    public createElement(config: WidgetConfig): WidgetElement | undefined {
        const plugin = this.widgets.get(config.type);
        if (!plugin) {
            this.logger.warn(`Unknown widget type '${config.type}', ignoring`);
            return undefined;
        }
        const element = document.createElement(plugin.elementTag) as WidgetElement;
        element.config = config;
        return element;
    }
}

/** Registers a widget plugin (public extension API). */
export function registerWidget<C extends WidgetConfig>(plugin: WidgetPlugin<C>): void {
    WidgetRegistry.getInstance().register(plugin);
}

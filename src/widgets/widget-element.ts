import {LitElement, PropertyValues} from 'lit';
import {property} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {AppearanceConfig, WidgetConfig, ZoneConfig, ZoneId} from '../core/layout-types';

/**
 * Base class for zone layout widgets.
 *
 * A widget is a thin Lit element hosted by a wcc-zone. It receives the card-wide
 * `appearance` defaults and its own `config` and forwards them to the underlying
 * feature component. The isActive/activate/deactivate contract generalizes the
 * former BottomBarComponent and drives 'exclusive' zones.
 */
export abstract class WidgetElement<C extends WidgetConfig = WidgetConfig> extends LitElement {
    @property({type: Object}) hass?: HomeAssistant;
    @property({type: Object}) config!: C;
    @property({type: Object}) appearance: AppearanceConfig = {};
    /** Hosting zone context used by widgets with responsive internal layout. */
    @property({attribute: false}) zoneId?: ZoneId;
    @property({attribute: false}) zoneAlignment?: NonNullable<ZoneConfig['align']>;

    /** Priority inside an 'exclusive' zone; higher wins. */
    get priority(): number {
        return this.config?.priority ?? 0;
    }

    /** Whether this widget wants to be shown in an 'exclusive' zone. */
    get isActive(): boolean {
        return true;
    }

    /** Called by an 'exclusive' zone when this widget becomes the visible one. */
    activate(): void {
    }

    /** Called by an 'exclusive' zone when this widget stops being visible. */
    deactivate(): void {
    }

    /** Effective font color: per-widget style override wins over the card default. */
    protected get fontColor(): string {
        return this.config?.style?.color ?? this.appearance?.fontColor ?? '#FFFFFF';
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (!this.config) {
            return;
        }
        if (changedProperties.has('config') || changedProperties.has('hass') || changedProperties.has('appearance')
            || changedProperties.has('zoneId') || changedProperties.has('zoneAlignment')) {
            this.applyWidgetState();
            this.applyStyleOverrides();
        }
    }

    /** Applies the WidgetStyle escape hatches on the host element. */
    private applyStyleOverrides(): void {
        const style = this.config?.style;
        const supportsBoundedWidth = !['sensors', 'weather', 'calendar'].includes(this.config?.type);
        const supportsBoundedHeight = !['clock', 'date', 'action-bar', 'sensors', 'weather', 'calendar'].includes(this.config?.type);
        this.style.margin = style?.margin ?? '';
        this.style.maxWidth = supportsBoundedWidth ? (style?.maxWidth ?? '') : '';
        this.style.maxHeight = supportsBoundedHeight ? (style?.maxHeight ?? '') : '';
        this.style.overflow = supportsBoundedHeight && style?.maxHeight ? 'auto' : '';
        this.style.fontSize = style?.fontSize ?? '';
        this.style.fontFamily = style?.fontFamily ?? this.appearance?.fontFamily ?? '';
        this.style.color = style?.color ?? '';
    }

    /** Forwards config/hass/appearance to the underlying feature component. */
    protected abstract applyWidgetState(): void;
}

/** Strips the common widget fields, leaving only the widget-specific configuration. */
export function widgetSpecificConfig<T extends object = Record<string, unknown>>(config: WidgetConfig): T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {type, id, priority, style, visibility, ...rest} = config;
    return rest as T;
}

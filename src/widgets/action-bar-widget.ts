import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ActionBarComponent} from '../components/action-bar';
import {ActionBarAlignment, ModuleActionConfig} from '../components/action-bar/types';
import {Size} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';

export interface ActionBarWidgetConfig extends WidgetConfig {
    enabled?: boolean;
    actions?: ModuleActionConfig[];
    alignment?: ActionBarAlignment;
    backgroundOpacity?: number;
    /** Custom icon size; only applied when appearance.size is 'custom'. */
    iconSize?: string;
}

@customElement('wcc-action-bar-widget')
export class ActionBarWidget extends WidgetElement<ActionBarWidgetConfig> {
    private actionBar = document.createElement('ha-action-bar') as ActionBarComponent;

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }
    `;

    /** Active when enabled with at least one action — delegated to the component. */
    get isActive(): boolean {
        return this.actionBar.isActive;
    }

    activate(): void {
        this.actionBar.activate();
    }

    deactivate(): void {
        this.actionBar.deactivate();
    }

    protected applyWidgetState(): void {
        this.actionBar.config = {
            enabled: this.config.enabled ?? true,
            actions: this.config.actions ?? [],
            alignment: this.config.alignment,
            backgroundOpacity: this.config.backgroundOpacity,
        };
        this.actionBar.fontColor = this.fontColor;
        this.actionBar.size = this.appearance?.size ?? Size.Medium;
        this.actionBar.iconSize = this.config.iconSize;
        if (this.hass) {
            this.actionBar.hass = this.hass;
        }
    }

    render() {
        return html`${this.actionBar}`;
    }
}

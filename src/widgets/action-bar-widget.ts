import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
// Side-effect import: registers the ha-action-bar element (the class is used type-only)
import '../components/action-bar';
import type {ActionBarComponent} from '../components/action-bar';
import {ActionBarAlignment, ModuleActionConfig} from '../components/action-bar/types';
import {Size} from '../core/types';
import {WidgetConfig, WidgetOrientation} from '../core/layout-types';
import {WidgetElement} from './widget-element';
import {resolveWidgetAlignment, resolveWidgetOrientation} from './widget-layout';

export interface ActionBarWidgetConfig extends WidgetConfig {
    enabled?: boolean;
    actions?: ModuleActionConfig[];
    alignment?: ActionBarAlignment;
    orientation?: WidgetOrientation;
    backgroundOpacity?: number;
    buttonGap?: string;
    padding?: string;
    /** Per-widget icon size; overrides the card-wide size preset when present. */
    iconSize?: string;
}

@customElement('wcc-action-bar-widget')
export class ActionBarWidget extends WidgetElement<ActionBarWidgetConfig> {
    private actionBar = document.createElement('ha-action-bar') as ActionBarComponent;
    private appliedConfig?: ActionBarWidgetConfig;
    private appliedZoneId?: string;
    private appliedZoneAlignment?: string;

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
        // Do not manufacture a new config on every hass update. Besides extra
        // renders it caused a BottomBarRequestUpdateMessage on every HA tick.
        if (this.appliedConfig !== this.config
            || this.appliedZoneId !== this.zoneId
            || this.appliedZoneAlignment !== this.zoneAlignment) {
            this.actionBar.config = {
                enabled: this.config.enabled ?? true,
                actions: this.config.actions ?? [],
                alignment: resolveWidgetAlignment(
                    this.config.alignment,
                    this.zoneId,
                    this.zoneAlignment,
                ) as ActionBarAlignment,
                orientation: resolveWidgetOrientation(this.config.orientation, this.zoneId),
                backgroundOpacity: this.config.backgroundOpacity,
                buttonGap: this.config.buttonGap,
                padding: this.config.padding,
            };
            this.actionBar.iconSize = this.config.iconSize;
            this.appliedConfig = this.config;
            this.appliedZoneId = this.zoneId;
            this.appliedZoneAlignment = this.zoneAlignment;
        }
        if (this.actionBar.fontColor !== this.fontColor) {
            this.actionBar.fontColor = this.fontColor;
        }
        const size = this.config.iconSize ? Size.Custom : (this.appearance?.size ?? Size.Medium);
        if (this.actionBar.size !== size) {
            this.actionBar.size = size;
        }
        if (this.hass && this.actionBar.hass !== this.hass) {
            this.actionBar.hass = this.hass;
        }
    }

    render() {
        return html`${this.actionBar}`;
    }
}

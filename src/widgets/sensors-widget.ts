import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
// Side-effect import: registers the ha-sensors element (the class is used type-only)
import '../components/sensors';
import type {SensorComponent} from '../components/sensors';
import {Size, SensorConfig} from '../core/types';
import {WidgetAlignment, WidgetConfig, WidgetOrientation} from '../core/layout-types';
import {WidgetElement} from './widget-element';
import {resolveWidgetAlignment, resolveWidgetOrientation} from './widget-layout';

export interface SensorsWidgetConfig extends WidgetConfig {
    sensors?: SensorConfig[];
    labelSize?: string;
    valueSize?: string;
    itemGap?: string;
    orientation?: WidgetOrientation;
    alignment?: WidgetAlignment;
}

@customElement('wcc-sensors-widget')
export class SensorsWidget extends WidgetElement<SensorsWidgetConfig> {
    private sensors = document.createElement('ha-sensors') as SensorComponent;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            max-height: 100%;
        }
    `;

    protected applyWidgetState(): void {
        const hasCustomSize = !!(this.config.labelSize || this.config.valueSize);
        this.sensors.sensors = this.config.sensors ?? [];
        this.sensors.fontColor = this.fontColor;
        this.sensors.size = hasCustomSize ? Size.Custom : (this.appearance?.size ?? Size.Medium);
        this.sensors.labelSize = this.config.labelSize;
        this.sensors.valueSize = this.config.valueSize;
        this.sensors.itemGap = this.config.itemGap;
        this.sensors.orientation = resolveWidgetOrientation(this.config.orientation, this.zoneId);
        this.sensors.alignment = resolveWidgetAlignment(
            this.config.alignment,
            this.zoneId,
            this.zoneAlignment,
        );
        if (this.hass) {
            this.sensors.hass = this.hass;
        }
    }

    render() {
        return html`${this.sensors}`;
    }
}

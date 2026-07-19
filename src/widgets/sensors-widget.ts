import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SensorComponent} from '../components/sensors';
import {Size, SensorConfig} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';

export interface SensorsWidgetConfig extends WidgetConfig {
    sensors?: SensorConfig[];
    labelSize?: string;
    valueSize?: string;
}

@customElement('wcc-sensors-widget')
export class SensorsWidget extends WidgetElement<SensorsWidgetConfig> {
    private sensors = document.createElement('ha-sensors') as SensorComponent;

    static styles = css`
        :host {
            display: block;
            max-height: 100%;
        }
    `;

    protected applyWidgetState(): void {
        this.sensors.sensors = this.config.sensors ?? [];
        this.sensors.fontColor = this.fontColor;
        this.sensors.size = this.appearance?.size ?? Size.Medium;
        this.sensors.labelSize = this.config.labelSize;
        this.sensors.valueSize = this.config.valueSize;
        if (this.hass) {
            this.sensors.hass = this.hass;
        }
    }

    render() {
        return html`${this.sensors}`;
    }
}

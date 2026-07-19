import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {TransportationComponent} from '../components/transportation';
import {TransportationConfig} from '../transportation-providers/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement, widgetSpecificConfig} from './widget-element';

/** TransportationConfig keys ride along at the widget's top level (see migration). */
export type TransportationWidgetConfig = WidgetConfig & Partial<TransportationConfig>;

@customElement('wcc-transportation-widget')
export class TransportationWidget extends WidgetElement<TransportationWidgetConfig> {
    private transportation = document.createElement('ha-transportation') as TransportationComponent;

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }
    `;

    /** Activity is message-driven (ShowTransportationMessage + auto-hide) — delegate to the component. */
    get isActive(): boolean {
        return this.transportation.isActive;
    }

    activate(): void {
        this.transportation.activate();
    }

    deactivate(): void {
        this.transportation.deactivate();
    }

    protected applyWidgetState(): void {
        this.transportation.transportation = widgetSpecificConfig<TransportationConfig>(this.config);
        this.transportation.fontColor = this.fontColor;
        if (this.hass) {
            this.transportation.hass = this.hass;
        }
    }

    render() {
        return html`${this.transportation}`;
    }
}

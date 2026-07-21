import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
// Side-effect import: registers the ha-transportation element (the class is used type-only)
import '../components/transportation';
import type {TransportationComponent} from '../components/transportation';
import {TransportationConfig} from '../transportation-providers/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement, widgetSpecificConfig} from './widget-element';
import {resolveLanguage} from '../utils/ha-locale';

/** TransportationConfig keys ride along at the widget's top level (see migration). */
export type TransportationWidgetConfig = WidgetConfig & Partial<TransportationConfig>;

@customElement('wcc-transportation-widget')
export class TransportationWidget extends WidgetElement<TransportationWidgetConfig> {
    private transportation = document.createElement('ha-transportation') as TransportationComponent;
    private appliedConfig?: TransportationWidgetConfig;

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
        // `applyWidgetState` also runs on every HA state update. Recreating the
        // config object there made TransportationController treat each hass tick
        // as a real config change, clear its timers and hide active departures.
        if (this.appliedConfig !== this.config) {
            this.transportation.transportation = widgetSpecificConfig<TransportationConfig>(this.config);
            this.appliedConfig = this.config;
        }
        if (this.transportation.fontColor !== this.fontColor) {
            this.transportation.fontColor = this.fontColor;
        }
        const language = resolveLanguage(this.appearance?.language, this.hass);
        if (this.transportation.language !== language) {
            this.transportation.language = language;
        }
        if (this.hass && this.transportation.hass !== this.hass) {
            this.transportation.hass = this.hass;
        }
    }

    render() {
        return html`${this.transportation}`;
    }
}

import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
// Side-effect import: registers the ha-clock element (the class is used type-only)
import '../components/clock';
import type {ClockComponent} from '../components/clock';
import {ExtendedDateTimeFormatOptions} from '../utils';
import {resolveLanguage} from '../utils/ha-locale';
import {Size} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';
import {normalizeTimeFormat} from './format-defaults';

export interface ClockWidgetConfig extends WidgetConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    /** Per-widget clock size; overrides the card-wide size preset when present. */
    clockSize?: string;
}

/** The time half of the former unified clock (the 'date' widget renders the other half). */
@customElement('wcc-clock-widget')
export class ClockWidget extends WidgetElement<ClockWidgetConfig> {
    private clock = document.createElement('ha-clock') as ClockComponent;

    static styles = css`
        :host {
            display: block;
        }
    `;

    protected applyWidgetState(): void {
        const clockSize = this.config.clockSize ?? this.config.style?.fontSize;
        this.clock.showDate = false;
        this.clock.timeFormat = normalizeTimeFormat(this.config.timeFormat, this.hass);
        this.clock.language = resolveLanguage(this.appearance?.language, this.hass);
        this.clock.timeZone = this.appearance?.timeZone ?? this.hass?.config?.time_zone;
        this.clock.fontColor = this.fontColor;
        this.clock.size = clockSize ? Size.Custom : (this.appearance?.size ?? Size.Medium);
        this.clock.clockSize = clockSize;
    }

    render() {
        return html`${this.clock}`;
    }
}

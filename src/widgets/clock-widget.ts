import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ClockComponent} from '../components/clock';
import {ExtendedDateTimeFormatOptions} from '../utils';
import {resolveLanguage} from '../utils/ha-locale';
import {Size} from '../core/types';
import {WidgetConfig} from '../core/layout-types';
import {WidgetElement} from './widget-element';
import {normalizeTimeFormat} from './format-defaults';

export interface ClockWidgetConfig extends WidgetConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    /** Custom font size; only applied when appearance.size is 'custom'. */
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
        this.clock.showDate = false;
        this.clock.timeFormat = normalizeTimeFormat(this.config.timeFormat, this.hass);
        this.clock.language = resolveLanguage(this.appearance?.language, this.hass);
        this.clock.timeZone = this.appearance?.timeZone ?? this.hass?.config?.time_zone;
        this.clock.fontColor = this.fontColor;
        this.clock.size = this.appearance?.size ?? Size.Medium;
        this.clock.clockSize = this.config.clockSize;
    }

    render() {
        return html`${this.clock}`;
    }
}

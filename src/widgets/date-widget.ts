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
import {normalizeDateFormat} from './format-defaults';

export interface DateWidgetConfig extends WidgetConfig {
    dateFormat?: ExtendedDateTimeFormatOptions;
    /** Custom font size; only applied when appearance.size is 'custom'. */
    dateSize?: string;
}

/** The date half of the former unified clock. */
@customElement('wcc-date-widget')
export class DateWidget extends WidgetElement<DateWidgetConfig> {
    private clock = document.createElement('ha-clock') as ClockComponent;

    static styles = css`
        :host {
            display: block;
        }
    `;

    protected applyWidgetState(): void {
        this.clock.showClock = false;
        this.clock.dateFormat = normalizeDateFormat(this.config.dateFormat);
        this.clock.language = resolveLanguage(this.appearance?.language, this.hass);
        this.clock.timeZone = this.appearance?.timeZone ?? this.hass?.config?.time_zone;
        this.clock.fontColor = this.fontColor;
        this.clock.size = this.appearance?.size ?? Size.Medium;
        this.clock.dateSize = this.config.dateSize;
    }

    render() {
        return html`${this.clock}`;
    }
}

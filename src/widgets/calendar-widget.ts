import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import '../components/calendar';
import type {CalendarComponent} from '../components/calendar';
import {WidgetConfig} from '../core/layout-types';
import {resolveHour12, resolveLanguage} from '../utils/ha-locale';
import {CalendarWidgetSettings} from './calendar/calendar-types';
import {WidgetElement} from './widget-element';

export interface CalendarWidgetConfig extends WidgetConfig, CalendarWidgetSettings {
}

@customElement('wcc-calendar-widget')
export class CalendarWidget extends WidgetElement<CalendarWidgetConfig> {
    private calendar = document.createElement('wcc-calendar-agenda') as CalendarComponent;

    static styles = css`
        :host {
            display: block;
            width: fit-content;
            max-width: 100%;
            min-width: 0;
        }
    `;

    get isActive(): boolean {
        return this.calendar.isActive;
    }

    protected applyWidgetState(): void {
        this.calendar.config = this.config;
        this.calendar.fontColor = this.fontColor;
        this.calendar.language = resolveLanguage(this.appearance?.language, this.hass);
        this.calendar.timeZone = this.appearance?.timeZone ?? this.hass?.config?.time_zone;
        this.calendar.hour12 = resolveHour12(undefined, this.hass);
        if (this.hass) this.calendar.hass = this.hass;
    }

    render() {
        return html`${this.calendar}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-calendar-widget': CalendarWidget;
    }
}

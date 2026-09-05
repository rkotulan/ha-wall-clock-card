import {css, html, PropertyValues} from 'lit';
import {customElement, state, query} from 'lit/decorators.js';
import {WidgetElement} from './widget-element';
import type {WidgetConfig} from '../core/layout-types';
import {CalendarController} from '../components/calendar/calendar-controller';
import '../components/calendar/calendar-event-dialog';
import {dayKey} from './calendar/calendar-data';
import {MonthSettings, weekStart, monthGrid, shiftMonth, monthRequestWindow, eventsOnDay} from './calendar/month-data';
import type {CalendarEventItem} from './calendar/calendar-types';
import {resolveLanguage, resolveHour12} from '../utils/ha-locale';
import {localize} from '../utils/localize';

export interface CalendarMonthConfig extends WidgetConfig, MonthSettings {}
@customElement('wcc-calendar-month')
export class CalendarMonthWidget extends WidgetElement<CalendarMonthConfig> {
    readonly controller = new CalendarController(this);
    @state() private displayedMonth = '';
    @state() private selectedDay?: string;
    @state() private selectedEvent?: CalendarEventItem;
    @query('dialog') private dayDialog?: HTMLDialogElement;
    private clockTimer?: number;
    private get language() { return resolveLanguage(this.appearance?.language, this.hass); }
    private get timeZone() { return this.appearance?.timeZone ?? this.hass?.config?.time_zone; }
    private get month() { return this.displayedMonth || dayKey(new Date(), this.timeZone).slice(0, 7); }
    private get days() { return monthGrid(this.month, weekStart(this.language, this.config?.firstDayOfWeek)); }
    private t(key: string, fallback: string) { return localize('month.' + key, this.language, fallback); }
    connectedCallback() {
        super.connectedCallback();
        this.clockTimer = window.setInterval(() => this.requestUpdate(), 60000);
    }
    disconnectedCallback() { window.clearInterval(this.clockTimer); super.disconnectedCallback(); }
    protected applyWidgetState() { this.syncController(); }
    private syncController() {
        if (!this.config) return;
        this.controller.updateConfig({...this.config, timeZone: this.timeZone, requestWindow: monthRequestWindow(this.days)}, this.hass);
    }
    updated(changed: PropertyValues) {
        super.updated(changed);
        this.syncController();
        if (this.selectedDay && !this.dayDialog?.open) this.dayDialog?.showModal();
        if (!this.selectedDay && this.dayDialog?.open) this.dayDialog.close();
    }
    private navigate(delta: number) { this.selectedDay = undefined; this.selectedEvent = undefined; this.displayedMonth = shiftMonth(this.month, delta); }
    private dateLabel(date: string, options: Intl.DateTimeFormatOptions) {
        return new Intl.DateTimeFormat(this.language, {...options, timeZone: 'UTC'}).format(new Date(date + 'T12:00:00Z'));
    }
    private eventLabel(event: CalendarEventItem, date: string) {
        if (event.allDay) return event.summary;
        const time = event.startDayKey < date ? '↳' : new Intl.DateTimeFormat(this.language, {
            hour:'numeric',minute:'2-digit',timeZone:this.timeZone,hour12:resolveHour12(undefined,this.hass),
        }).format(event.start);
        return time + ' ' + event.summary;
    }
    private renderEvent(event: CalendarEventItem, date: string) {
        return html`<button class="event" style=${'--event-color:' + event.color} title=${event.summary}
            @click=${() => {this.selectedDay = undefined; this.selectedEvent = event;}}><span class="event-text">${this.eventLabel(event, date)}</span></button>`;
    }
    static styles = css`
        :host {display:block;width:100%;min-width:0;}
        .month {color:var(--month-color);width:100%;}
        header {display:flex;align-items:center;gap:8px;margin-bottom:12px;}
        h2 {font-size:1.35em;margin:0;flex:1;font-weight:500;}
        button {font:inherit;color:inherit;cursor:pointer;}
        header button {background:transparent;border:1px solid currentColor;border-radius:6px;min-height:32px;padding:3px 10px;}
        button:focus-visible {outline:2px solid var(--primary-color,#03a9f4);outline-offset:2px;}
        .scroll {overflow-x:auto;}
        .grid {display:grid;grid-template-columns:repeat(7,minmax(0,1fr));min-width:490px;}
        .weekday {text-align:center;padding:8px 2px;font-size:.85em;border-bottom:1px solid var(--grid-color);}
        .day {min-width:0;min-height:var(--cell-height,110px);padding:5px;box-sizing:border-box;border-bottom:1px solid var(--grid-color);border-right:1px solid var(--grid-color);}
        .day:nth-child(7n + 1) {border-left:1px solid var(--grid-color);}
        .outside .number {opacity:.45;}
        .number {display:inline-grid;place-items:center;min-width:1.7em;height:1.7em;font-size:var(--date-size,1em);margin-bottom:4px;border-radius:50%;}
        .today .number {background:var(--primary-color,#1976d2);color:var(--text-primary-color,#fff);}
        .event {display:block;width:100%;text-align:left;font-size:var(--event-size,.8em);line-height:1.35;padding:3px 4px;margin:2px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:0;border-left:3px solid var(--event-color);border-radius:3px;background:color-mix(in srgb,var(--event-color) var(--event-opacity,20%),transparent);}
        .more {font-size:.75em;border:0;background:transparent;padding:4px;}
        .event-text {display:block;overflow:hidden;text-overflow:ellipsis;}
        .wrap-events .event-text {display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;white-space:normal;overflow-wrap:anywhere;}
        .status {font-size:.8em;padding:6px 0;}
        dialog {width:min(520px,calc(100vw - 40px));max-height:80vh;overflow:auto;border:1px solid var(--divider-color,#888);border-radius:12px;background:var(--card-background-color,#fff);color:var(--primary-text-color,#212121);padding:16px;}
        dialog::backdrop {background:#0008;}
        dialog .event {white-space:normal;}
        dialog .close {float:right;background:transparent;border:0;min-width:32px;min-height:32px;}
    `;
    render() {
        if (!this.config) return html``;
        const days = this.days;
        const today = dayKey(new Date(), this.timeZone);
        const limit = Math.max(1, Math.min(10, Math.trunc(Number(this.config.eventsPerDay) || 3)));
        const height = Math.max(70, Math.min(400, Number(this.config.cellMinHeight) || 110));
        const opacity = Math.max(0, Math.min(1, this.config.eventBackgroundOpacity ?? .2));
        const events = (date: string) => eventsOnDay(this.controller.events, date, this.timeZone, this.config.showAllDay !== false);
        return html`<section class="month ${this.config.wrapEventTitles === true ? 'wrap-events' : ''}" style=${'--month-color:' + this.fontColor + ';--cell-height:' + height + 'px;--grid-color:' + (this.config.gridColor || '#88888866') + ';--event-size:' + (this.config.eventTitleSize || '.8em') + ';--date-size:' + (this.config.calendarDateSize || '1em') + ';--event-opacity:' + opacity * 100 + '%;'}>
            <header><h2>${this.dateLabel(this.month + '-01', {month:'long',year:'numeric'})}</h2>
                <button aria-label=${this.t('previous','Previous month')} @click=${() => this.navigate(-1)}>‹</button>
                <button @click=${() => {this.displayedMonth = ''; this.selectedDay = undefined; this.selectedEvent = undefined;}}>${this.t('today','Today')}</button>
                <button aria-label=${this.t('next','Next month')} @click=${() => this.navigate(1)}>›</button>
            </header>
            ${this.controller.loading ? html`<div class="status" role="status">${this.t('loading','Loading calendar…')}</div>` : ''}
            ${this.controller.error ? html`<div class="status" role="status">${this.t('error','Some calendars could not be loaded.')}</div>` : ''}
            <div class="scroll"><div class="grid">
                ${days.slice(0,7).map(date => html`<div class="weekday">${this.dateLabel(date,{weekday:'short'})}</div>`)}
                ${days.map(date => {const items = events(date); return html`<div class="day ${date === today ? 'today' : ''} ${date.startsWith(this.month) ? '' : 'outside'}" data-date=${date}>
                    <span class="number" aria-current=${date === today ? 'date' : 'false'}>${Number(date.slice(-2))}</span>
                    ${items.slice(0,limit).map(event => this.renderEvent(event,date))}
                    ${items.length > limit ? html`<button class="more" @click=${() => {this.selectedDay=date;}}>+${items.length-limit} ${this.t('more','more')}</button>` : ''}
                </div>`;})}
            </div></div>
        </section>
        <dialog @close=${() => {this.selectedDay=undefined;}} @cancel=${() => {this.selectedDay=undefined;}}>
            <button class="close" aria-label=${this.t('close','Close')} @click=${() => {this.selectedDay=undefined;}}>×</button>
            <h3>${this.selectedDay ? this.dateLabel(this.selectedDay,{weekday:'long',day:'numeric',month:'long'}) : ''}</h3>
            ${this.selectedDay ? events(this.selectedDay).map(event => this.renderEvent(event,this.selectedDay!)) : ''}
        </dialog>
        <wcc-calendar-event-dialog .event=${this.selectedEvent} .open=${!!this.selectedEvent} .language=${this.language} .timeZone=${this.timeZone}
            .hour12=${resolveHour12(undefined,this.hass)} @wcc-calendar-dialog-close=${() => {this.selectedEvent=undefined;}}></wcc-calendar-event-dialog>`;
    }
}

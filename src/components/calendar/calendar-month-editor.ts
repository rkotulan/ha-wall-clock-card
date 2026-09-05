import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BaseEditorSection} from '../../editors/editor-base/base-editor-section';
import './calendar-editor';

@customElement('calendar-month-editor')
export class CalendarMonthEditor extends BaseEditorSection {
    render() {
        if (!this.config) return html``;
        const settings = this.config as any;
        const field = (key: string, fallback: string, selector: object, value: unknown) => html`
            <ha-row-selector .hass=${this.hass} .selector=${selector} .value=${value}
                .label=${this.t('month.' + key, fallback)} .propertyName=${key}
                @value-changed=${this._handleFormValueChanged}></ha-row-selector>`;
        const content = this.section === 'all' || this.section === 'content';
        const appearance = this.section === 'all' || this.section === 'appearance';
        return html`
            ${content ? html`<calendar-editor .hass=${this.hass} .config=${this.config} .sourcesOnly=${true} .section=${'content'} .editorSessionKey=${this.editorSessionKey}></calendar-editor>
                ${field('firstDayOfWeek','First day of week',{select:{options:[
                    {value:'auto',label:this.t('ui.auto','Auto')},
                    ...Array.from({length:7},(_,day) => ({value:String(day),label:new Intl.DateTimeFormat(this.hass?.locale?.language || 'en',{weekday:'long',timeZone:'UTC'}).format(new Date(Date.UTC(2026,0,4+day)))})),
                ],mode:'dropdown'}},settings.firstDayOfWeek === undefined ? 'auto' : String(settings.firstDayOfWeek))}
                ${field('eventsPerDay','Events per day',{number:{min:1,max:10,mode:'box'}},settings.eventsPerDay ?? 3)}
                ${field('showAllDay','Show all-day events',{boolean:{}},settings.showAllDay !== false)}
            ` : ''}
            ${appearance ? html`
                ${field('cellMinHeight','Minimum day height (px)',{number:{min:70,max:400,mode:'box'}},settings.cellMinHeight ?? 110)}
                ${field('calendarDateSize','Date text size',{text:{}},settings.calendarDateSize || '1em')}
                ${field('eventTitleSize','Event text size',{text:{}},settings.eventTitleSize || '.8em')}
                ${field('wrapEventTitles','Wrap event text to two lines',{boolean:{}},settings.wrapEventTitles === true)}
                ${field('gridColor','Grid color',{color_hex:{}},settings.gridColor || '#888888')}
                ${field('eventBackgroundOpacity','Event background opacity',{number:{min:0,max:1,step:.05,mode:'slider'}},settings.eventBackgroundOpacity ?? .2)}
            ` : ''}
            ${this.section === 'all' || this.section === 'behavior' ? field('updateInterval','Refresh interval (seconds)',{number:{min:60,max:86400,mode:'box'}},settings.updateInterval ?? 300) : ''}
        `;
    }
    protected _handleFormValueChanged(ev: CustomEvent) {
        if (ev.detail.propertyName === 'firstDayOfWeek') {
            ev.detail.value = ev.detail.value === 'auto' ? undefined : Number(ev.detail.value);
        }
        super._handleFormValueChanged(ev);
    }
}

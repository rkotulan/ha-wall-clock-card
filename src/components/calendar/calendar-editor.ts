import {css, html, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {fireEvent} from 'custom-card-helpers';
import {BaseEditorSection} from '../../editors/editor-base/base-editor-section';
import {LabelPosition} from '../ha-selector/types';
import {CalendarSourceConfig, CalendarWidgetSettings} from '../../widgets/calendar/calendar-types';

interface CalendarListEntry {
    entity_id: string;
    name?: string;
}

@customElement('calendar-editor')
export class CalendarEditor extends BaseEditorSection {
    @state() private sources: CalendarSourceConfig[] = [];
    @state() private addingAll = false;
    @state() private expandedSourceIndex: number | null = 0;

    static styles = css`
        .content {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 12px;
        }

        .section-title {
            margin: 2px 0 0;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.73rem;
            font-weight: 750;
            letter-spacing: 0.06em;
            text-transform: uppercase;
        }

        .source-card {
            padding: 10px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
            border-radius: 8px;
            background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
        }

        .source-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 34px;
            margin-bottom: 4px;
        }

        .source-card.collapsed .source-header {
            margin-bottom: 0;
        }

        .source-toggle {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            min-width: 0;
            min-height: 34px;
            padding: 0 4px 0 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            text-align: left;
            cursor: pointer;
            flex: 1;
        }

        .source-toggle:hover,
        .source-toggle:focus-visible {
            color: var(--primary-color, #03a9f4);
            outline: none;
        }

        .source-icon-button {
            display: grid;
            place-items: center;
            width: 32px;
            height: 32px;
            padding: 0;
            border: 0;
            border-radius: 6px;
            background: transparent;
            color: var(--secondary-text-color, #aaa);
            cursor: pointer;
            flex: 0 0 32px;
        }

        .source-icon-button ha-icon {
            --mdc-icon-size: 18px;
        }

        .source-icon-button:hover,
        .source-icon-button:focus-visible {
            background: rgba(255, 255, 255, 0.09);
            color: var(--primary-text-color, #fff);
            outline: none;
        }

        .source-icon-button.remove:hover,
        .source-icon-button.remove:focus-visible {
            color: var(--error-color, #ef5350);
        }

        .source-title {
            display: flex;
            align-items: center;
            gap: 8px;
            overflow: hidden;
            font-size: 0.8rem;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .source-color {
            flex: 0 0 auto;
            width: 12px;
            height: 12px;
            border: 1px solid color-mix(in srgb, currentColor 35%, transparent);
            border-radius: 50%;
            background: var(--source-color, #4fc3f7);
            box-shadow: 0 0 0 2px color-mix(in srgb, var(--source-color, #4fc3f7) 22%, transparent);
        }

        .source-card ha-row-selector {
            display: block;
            padding: 2px 0;
        }

        .source-body {
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        .empty {
            padding: 14px;
            border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
            border-radius: 8px;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.84rem;
            line-height: 1.45;
            text-align: center;
        }

        .button-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .button-row button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-height: 42px;
            padding: 0 10px;
            border: 1px solid var(--primary-color, #03a9f4);
            border-radius: 8px;
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent);
            color: var(--primary-color, #03a9f4);
            font: inherit;
            font-size: 0.84rem;
            font-weight: 650;
            cursor: pointer;
        }

        .button-row button:hover,
        .button-row button:focus-visible {
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 27%, transparent);
            outline: none;
        }

        .button-row button:disabled {
            cursor: progress;
            opacity: 0.55;
        }

        .button-row button ha-icon {
            --mdc-icon-size: 18px;
        }

        .options {
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        @media (max-width: 380px) {
            .button-row { grid-template-columns: 1fr; }
        }
    `;

    updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('config')) {
            const settings = this.config as unknown as CalendarWidgetSettings;
            this.sources = (settings.entities ?? []).map(source => ({...source}));
            if (this.expandedSourceIndex !== null && this.expandedSourceIndex >= this.sources.length) {
                this.expandedSourceIndex = this.sources.length > 0 ? this.sources.length - 1 : null;
            }
        }
    }

    private emitSources(sources: CalendarSourceConfig[]): void {
        this.sources = sources;
        fireEvent(this, 'config-changed', {
            config: {...this.config, entities: sources.map(source => ({...source}))},
        });
    }

    private addSource(): void {
        this.expandedSourceIndex = this.sources.length;
        this.emitSources([...this.sources, {entity: '', color: '#4fc3f7'}]);
    }

    private removeSource(index: number): void {
        if (this.expandedSourceIndex === index) {
            this.expandedSourceIndex = null;
        } else if (this.expandedSourceIndex !== null && this.expandedSourceIndex > index) {
            this.expandedSourceIndex--;
        }
        this.emitSources(this.sources.filter((_, sourceIndex) => sourceIndex !== index));
    }

    private toggleSource(index: number): void {
        this.expandedSourceIndex = this.expandedSourceIndex === index ? null : index;
    }

    private updateSource(index: number, key: keyof CalendarSourceConfig, value: string): void {
        this.emitSources(this.sources.map((source, sourceIndex) =>
            sourceIndex === index ? {...source, [key]: value} : source));
    }

    private async addAllCalendars(): Promise<void> {
        if (!this.hass || this.addingAll) return;
        this.addingAll = true;
        try {
            let calendars: CalendarListEntry[] = [];
            try {
                calendars = await this.hass.callApi<CalendarListEntry[]>('GET', 'calendars');
            } catch {
                calendars = Object.values(this.hass.states)
                    .filter(state => state.entity_id.startsWith('calendar.'))
                    .map(state => ({
                        entity_id: state.entity_id,
                        name: String(state.attributes.friendly_name ?? state.entity_id),
                    }));
            }

            const existing = new Set(this.sources.map(source => source.entity));
            const palette = ['#4fc3f7', '#ff6b6b', '#66bb6a', '#ffca28', '#ab47bc', '#26a69a'];
            const additions = calendars
                .filter(calendar => calendar.entity_id && !existing.has(calendar.entity_id))
                .map((calendar, index) => ({
                    entity: calendar.entity_id,
                    label: calendar.name || undefined,
                    color: palette[(this.sources.length + index) % palette.length],
                }));
            if (additions.length > 0) {
                if (this.sources.length === 0) this.expandedSourceIndex = 0;
                this.emitSources([...this.sources, ...additions]);
            }
        } finally {
            this.addingAll = false;
        }
    }

    render() {
        if (!this.hass || !this.config) return html``;
        const settings = this.config as unknown as CalendarWidgetSettings;

        return html`
            <div class="content">
                <div class="section-title">${this.t('editor.calendar.calendars', 'Calendars')}</div>
                ${this.sources.length === 0
                    ? html`<div class="empty">${this.t('editor.calendar.empty', 'Add one or more Home Assistant calendar entities.')}</div>`
                    : this.sources.map((source, index) => {
                        const expanded = this.expandedSourceIndex === index;
                        return html`
                        <div class="source-card ${expanded ? 'expanded' : 'collapsed'}">
                            <div class="source-header">
                                <button class="source-toggle"
                                        type="button"
                                        aria-expanded=${expanded ? 'true' : 'false'}
                                        @click=${() => this.toggleSource(index)}>
                                    <span class="source-title">
                                        <span class="source-color" style=${`--source-color:${source.color || '#4fc3f7'}`}></span>
                                        ${source.label || source.entity || this.t('editor.calendar.calendar', 'Calendar {number}', {number: index + 1})}
                                    </span>
                                </button>
                                <button class="source-icon-button remove"
                                        type="button"
                                        title=${this.t('editor.calendar.remove', 'Remove calendar')}
                                        aria-label=${this.t('editor.calendar.remove', 'Remove calendar')}
                                        @click=${() => this.removeSource(index)}>
                                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                                </button>
                                <button class="source-icon-button"
                                        type="button"
                                        title=${expanded ? this.t('editor.calendar.collapse', 'Collapse calendar') : this.t('editor.calendar.expand', 'Expand calendar')}
                                        aria-label=${expanded ? this.t('editor.calendar.collapse', 'Collapse calendar') : this.t('editor.calendar.expand', 'Expand calendar')}
                                        aria-expanded=${expanded ? 'true' : 'false'}
                                        @click=${() => this.toggleSource(index)}>
                                    <ha-icon .icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                                </button>
                            </div>
                            ${expanded ? html`<div class="source-body">
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{entity: {filter: {domain: 'calendar'}}}}
                                    .value=${source.entity}
                                    .label=${this.t('editor.calendar.entity', 'Calendar entity')}
                                    .labelPosition=${LabelPosition.Top}
                                    @value-changed=${(event: CustomEvent) => this.updateSource(index, 'entity', event.detail.value)}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{text: {type: 'text'}}}
                                    .value=${source.label ?? ''}
                                    .label=${this.t('editor.calendar.label', 'Label (optional)')}
                                    .labelPosition=${LabelPosition.Top}
                                    @value-changed=${(event: CustomEvent) => this.updateSource(index, 'label', event.detail.value)}>
                            </ha-row-selector>
                            <ha-row-selector
                                    .hass=${this.hass}
                                    .selector=${{color_hex: ''}}
                                    .value=${source.color ?? '#4fc3f7'}
                                    .label=${this.t('editor.calendar.event_color', 'Event color')}
                                    .labelPosition=${LabelPosition.Top}
                                    @value-changed=${(event: CustomEvent) => this.updateSource(index, 'color', event.detail.value)}>
                            </ha-row-selector>
                            </div>` : ''}
                        </div>
                    `;
                    })}

                <div class="button-row">
                    <button type="button" @click=${this.addSource}>
                        <ha-icon icon="mdi:plus"></ha-icon> ${this.t('editor.calendar.add', 'Add calendar')}
                    </button>
                    <button type="button" ?disabled=${this.addingAll} @click=${this.addAllCalendars}>
                        <ha-icon icon="mdi:calendar-multiple"></ha-icon> ${this.t('editor.calendar.add_all', 'Add all')}
                    </button>
                </div>

                <div class="section-title">${this.t('editor.calendar.display', 'Display')}</div>
                <div class="options">
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{select: {options: [
                                {value: 'agenda', label: this.t('editor.calendar.agenda', 'Agenda')},
                                {value: 'today', label: this.t('editor.calendar.today_only', 'Today only')},
                            ], mode: 'dropdown'}}}
                            .value=${settings.displayMode ?? 'agenda'}
                            .label=${this.t('editor.calendar.display_mode', 'Display mode')}
                            propertyName="displayMode"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    ${settings.displayMode !== 'today' ? html`
                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{number: {min: 1, max: 31, step: 1, mode: 'box'}}}
                                .value=${settings.daysAhead ?? 7}
                                .label=${this.t('editor.calendar.days_ahead', 'Days ahead')}
                                propertyName="daysAhead"
                                @value-changed=${this._handleFormValueChanged}>
                        </ha-row-selector>
                    ` : ''}
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number: {min: 1, max: 100, step: 1, mode: 'box'}}}
                            .value=${settings.maxEvents ?? 8}
                            .label=${this.t('editor.calendar.maximum_events', 'Maximum events')}
                            propertyName="maxEvents"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${settings.showAllDay !== false}
                            .label=${this.t('editor.calendar.show_all_day', 'Show all-day events')}
                            propertyName="showAllDay"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${settings.showLocation !== false}
                            .label=${this.t('editor.calendar.show_location', 'Show location')}
                            propertyName="showLocation"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${settings.showDescription === true}
                            .label=${this.t('editor.calendar.show_description', 'Show description')}
                            propertyName="showDescription"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${settings.hidePastTodayEvents !== false}
                            .label=${this.t('editor.calendar.hide_past', 'Hide past events today')}
                            propertyName="hidePastTodayEvents"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{boolean: {}}}
                            .value=${settings.hideWhenEmpty === true}
                            .label=${this.t('editor.calendar.hide_empty', 'Hide when empty')}
                            propertyName="hideWhenEmpty"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number: {min: 1, max: 1440, step: 1, mode: 'box'}}}
                            .value=${Math.max(1, Math.round((settings.updateInterval ?? 300) / 60))}
                            .label=${this.t('editor.calendar.update_interval', 'Update interval')}
                            .helper=${this.t('editor.calendar.update_help', 'Minutes (minimum 1)')}
                            .transformData=${(value: number) => value * 60}
                            propertyName="updateInterval"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                </div>

                <div class="section-title">${this.t('editor.calendar.event_background', 'Event appearance')}</div>
                <div class="options">
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{color_hex: ''}}
                            .value=${settings.eventBackgroundColor ?? '#202020'}
                            .label=${this.t('editor.calendar.event_background_color', 'Background color')}
                            propertyName="eventBackgroundColor"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{number: {min: 0, max: 1, step: 0.05, mode: 'slider'}}}
                            .value=${settings.eventBackgroundOpacity ?? 0.76}
                            .label=${this.t('editor.calendar.event_background_opacity', 'Background opacity')}
                            .helper=${`${Math.round((settings.eventBackgroundOpacity ?? 0.76) * 100)}%`}
                            propertyName="eventBackgroundOpacity"
                            @value-changed=${this._handleFormValueChanged}>
                    </ha-row-selector>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'calendar-editor': CalendarEditor;
    }
}

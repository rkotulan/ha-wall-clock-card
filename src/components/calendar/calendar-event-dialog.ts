import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {CalendarEventItem} from '../../widgets/calendar/calendar-types';
import {addDaysToKey} from '../../widgets/calendar/calendar-data';
import {localize} from '../../utils/localize';

@customElement('wcc-calendar-event-dialog')
export class CalendarEventDialog extends LitElement {
    @property({type: Object}) event?: CalendarEventItem;
    @property({type: Boolean}) open = false;
    @property({type: String}) language = 'en';
    @property({type: String}) timeZone?: string;
    @property({type: Boolean}) hour12 = false;

    @query('dialog') private dialog?: HTMLDialogElement;

    static styles = css`
        dialog {
            width: min(520px, calc(100vw - 32px));
            max-width: none;
            max-height: min(720px, calc(100vh - 32px));
            padding: 0;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.2));
            border-radius: 18px;
            box-sizing: border-box;
            overflow: hidden;
            background: var(--card-background-color, #1c1c1c);
            color: var(--primary-text-color, #fff);
            box-shadow: 0 18px 60px rgba(0, 0, 0, 0.58);
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.62);
            backdrop-filter: blur(2px);
        }

        .header {
            display: grid;
            grid-template-columns: 5px minmax(0, 1fr) 42px;
            align-items: stretch;
            min-height: 62px;
            border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
        }

        .accent {
            background: var(--event-color, var(--primary-color, #03a9f4));
        }

        .title {
            align-self: center;
            min-width: 0;
            margin: 0;
            padding: 13px 14px;
            overflow-wrap: anywhere;
            color: var(--event-color, var(--primary-text-color, #fff));
            font-size: 1.18rem;
            font-weight: 650;
            line-height: 1.3;
        }

        .close {
            display: grid;
            place-items: center;
            align-self: center;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: var(--secondary-text-color, #aaa);
            cursor: pointer;
        }

        .close:hover,
        .close:focus-visible {
            background: rgba(127, 127, 127, 0.18);
            color: var(--primary-text-color, #fff);
            outline: none;
        }

        .body {
            display: flex;
            flex-direction: column;
            gap: 14px;
            max-height: calc(100vh - 126px);
            padding: 18px 20px 22px;
            box-sizing: border-box;
            overflow: auto;
        }

        .detail {
            display: grid;
            grid-template-columns: 24px minmax(0, 1fr);
            gap: 10px;
            align-items: start;
            min-width: 0;
        }

        .detail ha-icon {
            --mdc-icon-size: 21px;
            margin-top: 1px;
            color: var(--event-color, var(--primary-color, #03a9f4));
        }

        .detail-content {
            min-width: 0;
            line-height: 1.45;
            overflow-wrap: anywhere;
        }

        .label {
            margin-bottom: 2px;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .description {
            padding-top: 14px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.14));
            white-space: pre-wrap;
        }

        @media (max-width: 520px) {
            dialog {
                width: calc(100vw - 16px);
                max-height: calc(100vh - 16px);
                border-radius: 14px;
            }

            .body {
                padding: 16px;
            }
        }
    `;

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (!changed.has('open') && !changed.has('event')) return;
        if (this.open && this.event && this.dialog && !this.dialog.open) {
            this.dialog.showModal();
        } else if ((!this.open || !this.event) && this.dialog?.open) {
            this.dialog.close();
        }
    }

    private formatDate(date: Date): string {
        return new Intl.DateTimeFormat(this.language, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: this.timeZone,
        }).format(date);
    }

    private formatTime(date: Date): string {
        return new Intl.DateTimeFormat(this.language, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: this.hour12,
            timeZone: this.timeZone,
        }).format(date);
    }

    private formatDayKey(value: string): string {
        const [year, month, day] = value.split('-').map(Number);
        return new Intl.DateTimeFormat(this.language, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
        }).format(new Date(Date.UTC(year, month - 1, day, 12)));
    }

    private dateTimeText(event: CalendarEventItem): string {
        if (event.allDay) {
            const start = this.formatDayKey(event.startDayKey);
            const end = this.formatDayKey(addDaysToKey(event.endDayKey, -1));
            const label = localize('editor.calendar.all_day', this.language, 'All day');
            return start === end ? `${start} · ${label}` : `${start} – ${end} · ${label}`;
        }

        const startDate = this.formatDate(event.start);
        const endDate = this.formatDate(event.end);
        if (startDate === endDate) {
            return `${startDate} · ${this.formatTime(event.start)} – ${this.formatTime(event.end)}`;
        }
        return `${startDate}, ${this.formatTime(event.start)} – ${endDate}, ${this.formatTime(event.end)}`;
    }

    private requestClose(): void {
        this.dialog?.close();
    }

    private handleCancel(event: Event): void {
        event.preventDefault();
        this.requestClose();
    }

    private handleBackdropClick(event: MouseEvent): void {
        if (event.target === this.dialog) this.requestClose();
    }

    private handleClosed(): void {
        this.dispatchEvent(new CustomEvent('wcc-calendar-dialog-close', {bubbles: true, composed: true}));
    }

    render() {
        const event = this.event;
        return html`
            <dialog
                    style=${`--event-color:${event?.color ?? '#4fc3f7'}`}
                    aria-label=${event?.summary ?? localize('editor.calendar.event', this.language, 'Calendar event')}
                    @cancel=${this.handleCancel}
                    @close=${this.handleClosed}
                    @click=${this.handleBackdropClick}>
                ${event ? html`
                    <div class="header">
                        <span class="accent"></span>
                        <h2 class="title">${event.summary}</h2>
                        <button class="close" type="button" aria-label=${localize('ui.close', this.language, 'Close')} @click=${this.requestClose}>
                            <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                    </div>
                    <div class="body">
                        <div class="detail">
                            <ha-icon icon="mdi:clock-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${localize('editor.calendar.when', this.language, 'When')}</div>
                                ${this.dateTimeText(event)}
                            </div>
                        </div>
                        <div class="detail">
                            <ha-icon icon="mdi:calendar-outline"></ha-icon>
                            <div class="detail-content">
                                <div class="label">${localize('editor.calendar.calendar_name', this.language, 'Calendar')}</div>
                                ${event.sourceLabel}
                            </div>
                        </div>
                        ${event.location ? html`
                            <div class="detail">
                                <ha-icon icon="mdi:map-marker-outline"></ha-icon>
                                <div class="detail-content">
                                    <div class="label">${localize('editor.calendar.location', this.language, 'Location')}</div>
                                    ${event.location}
                                </div>
                            </div>
                        ` : ''}
                        ${event.description ? html`
                            <div class="description detail-content">
                                <div class="label">${localize('editor.calendar.description', this.language, 'Description')}</div>
                                ${event.description}
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-calendar-event-dialog': CalendarEventDialog;
    }
}

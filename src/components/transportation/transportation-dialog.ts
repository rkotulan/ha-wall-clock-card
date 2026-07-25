import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {TransportationData, TransportationDeparture} from '../../transportation-providers';
import {localize} from '../../utils';
import {groupTransportationDepartures} from './transportation-groups';

@customElement('wcc-transportation-dialog')
export class TransportationDialog extends LitElement {
    @property({type: Boolean}) open = false;
    @property({type: Object}) data: TransportationData = {departures: [], loading: false};
    @property({type: String}) language?: string;
    @property({type: Object}) hass?: HomeAssistant;

    @query('dialog') private dialog?: HTMLDialogElement;

    static styles = css`
        dialog {
            width: min(800px, calc(100vw - 32px));
            max-width: none;
            max-height: min(760px, calc(100vh - 32px));
            padding: 0;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
            border-radius: 22px;
            box-sizing: border-box;
            overflow: hidden;
            background: var(--card-background-color, #171a18);
            color: var(--primary-text-color, #f5f5f5);
            box-shadow: 0 22px 72px rgba(0, 0, 0, 0.64);
        }

        dialog::backdrop {
            background: rgba(0, 0, 0, 0.68);
            backdrop-filter: blur(3px);
        }

        .header {
            display: grid;
            grid-template-columns: 28px minmax(0, 1fr) 40px;
            gap: 10px;
            align-items: center;
            min-height: 72px;
            padding: 0 24px 0 30px;
            border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
        }

        .header ha-icon {
            --mdc-icon-size: 25px;
            color: #f0ae3d;
        }

        .title {
            margin: 0;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1.35rem;
            font-weight: 700;
            line-height: 1.25;
        }

        .close {
            display: grid;
            place-items: center;
            width: 36px;
            height: 36px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.09);
            color: var(--primary-text-color, #f5f5f5);
            cursor: pointer;
        }

        .close:hover,
        .close:focus-visible {
            background: rgba(255, 255, 255, 0.16);
            outline: none;
        }

        .close ha-icon {
            --mdc-icon-size: 21px;
            color: inherit;
        }

        .body {
            max-height: calc(100vh - 106px);
            padding: 20px 30px 30px;
            box-sizing: border-box;
            overflow: auto;
        }

        .stop-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
        }

        .stop-card {
            min-width: 0;
            padding: 16px 18px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.11));
            border-radius: 15px;
            background: color-mix(
                in srgb,
                var(--card-background-color, #171a18) 90%,
                var(--primary-text-color, #fff) 10%
            );
        }

        .stop-name {
            margin: 0 0 12px;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.3;
            overflow-wrap: anywhere;
        }

        .departure-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .departure-row {
            display: grid;
            grid-template-columns: 40px minmax(0, 1fr) auto 22px;
            gap: 12px;
            align-items: center;
            min-width: 0;
        }

        .line {
            display: grid;
            place-items: center;
            min-width: 40px;
            min-height: 28px;
            padding: 1px 6px;
            border-radius: 8px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.11);
            color: var(--primary-text-color, #f5f5f5);
            font-size: 0.95rem;
            font-weight: 750;
        }

        .departure-row.soon .line {
            background: #efb044;
            color: #202020;
        }

        .destination {
            min-width: 0;
            overflow: hidden;
            color: var(--primary-text-color, #f5f5f5);
            font-size: 0.92rem;
            line-height: 1.25;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .time {
            color: var(--primary-text-color, #f5f5f5);
            font-size: 1rem;
            font-weight: 750;
            white-space: nowrap;
        }

        .departure-row.soon .time {
            color: #efb044;
        }

        .accessible {
            display: grid;
            place-items: center;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background: #2d82d8;
            color: #fff;
        }

        .accessible ha-icon {
            --mdc-icon-size: 15px;
        }

        .status {
            display: grid;
            place-items: center;
            min-height: 190px;
            padding: 24px;
            color: var(--secondary-text-color, #aaa);
            box-sizing: border-box;
            font-size: 1.05rem;
            text-align: center;
        }

        .status.error {
            color: var(--error-color, #f44336);
        }

        @media (max-width: 680px) {
            dialog {
                width: calc(100vw - 16px);
                max-height: calc(100vh - 16px);
                border-radius: 16px;
            }

            .header {
                min-height: 64px;
                padding: 0 14px 0 18px;
            }

            .body {
                padding: 14px;
            }

            .stop-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .stop-card {
                padding: 14px;
            }

            .departure-row {
                grid-template-columns: 38px minmax(0, 1fr) auto 20px;
                gap: 9px;
            }
        }
    `;

    protected updated(changed: PropertyValues): void {
        super.updated(changed);
        if (!changed.has('open')) return;
        if (this.open && this.dialog && !this.dialog.open) {
            this.dialog.showModal();
        } else if (!this.open && this.dialog?.open) {
            this.dialog.close();
        }
    }

    private isSoon(departure: TransportationDeparture): boolean {
        const match = String(departure.timeMark).match(/-?\d+/);
        if (!match) return false;
        const minutes = Number(match[0]);
        return minutes >= 0 && minutes <= 5;
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
        this.dispatchEvent(new CustomEvent('wcc-transportation-dialog-close', {
            bubbles: true,
            composed: true,
        }));
    }

    private renderBody() {
        if (this.data.loading) {
            return html`
                <div class="status">
                    ${localize(
                        'runtime.loading_transportation',
                        this.language || this.hass,
                        'Loading transportation data…',
                    )}
                </div>
            `;
        }
        if (this.data.error) {
            return html`<div class="status error">${this.data.error}</div>`;
        }
        if (!this.data.departures.length) {
            return html`
                <div class="status">
                    ${localize(
                        'runtime.no_departures',
                        this.language || this.hass,
                        'No departures available.',
                    )}
                </div>
            `;
        }

        return html`
            <div class="stop-grid">
                ${groupTransportationDepartures(this.data.departures).map(group => html`
                    <section class="stop-card">
                        <h3 class="stop-name">${group.stopName}</h3>
                        <div class="departure-list">
                            ${group.departures.map(departure => html`
                                <div class="departure-row ${this.isSoon(departure) ? 'soon' : ''}">
                                    <div class="line">${departure.lineName}</div>
                                    <div class="destination" title=${departure.finalStop}>
                                        ${departure.finalStop}
                                    </div>
                                    <div class="time">${departure.timeMark}</div>
                                    ${departure.isLowFloor ? html`
                                        <div
                                                class="accessible"
                                                title=${localize(
                                                    'runtime.wheelchair_accessible',
                                                    this.language || this.hass,
                                                    'Wheelchair accessible',
                                                )}>
                                            <ha-icon icon="mdi:wheelchair-accessibility"></ha-icon>
                                        </div>
                                    ` : html`<span></span>`}
                                </div>
                            `)}
                        </div>
                    </section>
                `)}
            </div>
        `;
    }

    render() {
        const title = localize(
            'runtime.transportation_title',
            this.language || this.hass,
            'Transit departures',
        );
        return html`
            <dialog
                    aria-label=${title}
                    @cancel=${this.handleCancel}
                    @close=${this.handleClosed}
                    @click=${this.handleBackdropClick}>
                <header class="header">
                    <ha-icon icon="mdi:bus-clock"></ha-icon>
                    <h2 class="title">${title}</h2>
                    <button
                            class="close"
                            type="button"
                            aria-label=${localize('ui.close', this.language || this.hass, 'Close')}
                            @click=${this.requestClose}>
                        <ha-icon icon="mdi:close"></ha-icon>
                    </button>
                </header>
                <div class="body">${this.renderBody()}</div>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-transportation-dialog': TransportationDialog;
    }
}

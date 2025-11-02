import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ExtendedDateTimeFormatOptions, createLogger, getSizeValue } from '../../utils';
import { ClockController } from './clock-controller';
import { Size } from '../../core/types';

export interface ClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    fontColor?: string;
    language?: string;
    timeZone?: string;
    size?: Size;
    clockSize?: string;
    dateSize?: string;
    clockTopMargin?: string;
}

@customElement('ha-clock')
export class ClockComponent extends LitElement {
    @property({ type: Object }) timeFormat?: ExtendedDateTimeFormatOptions;
    @property({ type: Object }) dateFormat?: ExtendedDateTimeFormatOptions;
    @property({ type: String }) fontColor?: string;
    @property({ type: String }) language?: string;
    @property({ type: String }) timeZone?: string;
    @property({ type: String }) size?: Size;
    @property({ type: String }) clockSize?: string;
    @property({ type: String }) dateSize?: string;
    @property({ type: String }) clockTopMargin?: string;

    private logger = createLogger('clock-component');
    private clockController: ClockController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.clockController = new ClockController(this, {
            timeFormat: this.timeFormat,
            dateFormat: this.dateFormat,
            language: this.language,
            timeZone: this.timeZone
        });
    }

    get controller(): ClockController {
        return this.clockController;
    }

    static styles = css`
        .clock {
            font-size: 16rem; /* Medium size (default) */
            line-height: 14rem;
            font-weight: 300;
            text-align: center;
            z-index: 2;
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }

        .hours-minutes {
            font-size: 1em;
            line-height: 1;
        }

        .seconds-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 0.1em;
            margin-top: 0.1em;
            justify-content: flex-start;
        }

        .seconds {
            font-size: 0.5em;
            font-weight: 400;
            line-height: 1;
            vertical-align: top;
        }

        .ampm {
            font-size: 0.3em;
            font-weight: 400;
            line-height: 1;
            text-transform: lowercase;
            opacity: 0.6;
        }

        /* Style for AM/PM when seconds are not displayed */
        .ampm-only {
            margin-top: 1.6em;
        }

        .date {
            font-size: 6rem; /* Medium size (default) */
            font-weight: 400;
            text-align: center;
            margin-top: 0.2rem;
            opacity: 1;
            z-index: 2;
            position: relative;
            line-height: 5rem;
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('timeFormat') ||
            changedProperties.has('dateFormat') ||
            changedProperties.has('language') ||
            changedProperties.has('timeZone') ||
            changedProperties.has('size') ||
            changedProperties.has('clockSize') ||
            changedProperties.has('dateSize') ||
            changedProperties.has('clockTopMargin')) {

            this.logger.debug('Clock properties changed, updating ClockController');

            // Log the changed properties for debugging
            if (changedProperties.has('timeFormat')) {
                const oldTimeFormat = changedProperties.get('timeFormat');
                this.logger.debug(`TimeFormat changed: ${JSON.stringify(oldTimeFormat)} -> ${JSON.stringify(this.timeFormat)}`);
            }

            if (changedProperties.has('dateFormat')) {
                const oldDateFormat = changedProperties.get('dateFormat');
                this.logger.debug(`DateFormat changed: ${JSON.stringify(oldDateFormat)} -> ${JSON.stringify(this.dateFormat)}`);
            }

            if (changedProperties.has('size')) {
                const oldSize = changedProperties.get('size');
                this.logger.debug(`Size changed: ${oldSize} -> ${this.size}`);
            }

            if (changedProperties.has('clockSize')) {
                const oldClockSize = changedProperties.get('clockSize');
                this.logger.debug(`ClockSize changed: ${oldClockSize} -> ${this.clockSize}`);
            }

            if (changedProperties.has('dateSize')) {
                const oldDateSize = changedProperties.get('dateSize');
                this.logger.debug(`DateSize changed: ${oldDateSize} -> ${this.dateSize}`);
            }

            if (changedProperties.has('clockTopMargin')) {
                const oldClockTopMargin = changedProperties.get('clockTopMargin');
                this.logger.debug(`ClockTopMargin changed: ${oldClockTopMargin} -> ${this.clockTopMargin}`);
            }

            // Update unified ClockController with new configuration
            this.clockController.updateConfig({
                timeFormat: this.timeFormat,
                dateFormat: this.dateFormat,
                language: this.language,
                timeZone: this.timeZone
            });
        }
    }

    getHours(): string {
        return this.clockController.hours;
    }

    getMinutes(): string {
        return this.clockController.minutes;
    }

    getSeconds(): string {
        return this.clockController.seconds;
    }

    getAmPm(): string {
        return this.clockController.ampm;
    }

    getCurrentDate(): string {
        return this.clockController.currentDate;
    }

    getClockSize(): string {
        return getSizeValue(this.size, this.clockSize, 'clockSize');
    }

    getDateSize(): string {
        return getSizeValue(this.size, this.dateSize, 'dateSize');
    }

    getClockTopMargin(): string {
        if (this.size === Size.Custom) {
            return this.clockTopMargin ?? '0rem';
        }

        return '0rem';
    }

    render() {
        // Log rendering information for debugging
        const seconds = this.getSeconds();
        const shouldShowSeconds = this.timeFormat?.second !== undefined && this.timeFormat?.second !== 'hidden';
        const clockSize = this.getClockSize();
        const dateSize = this.getDateSize();

        return html`
            <div class="clock" style="color: ${this.fontColor}; font-size: ${clockSize}; margin-top: ${this.getClockTopMargin()};">
                <span class="hours-minutes" style="color: ${this.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${shouldShowSeconds ? html`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.fontColor};">${seconds}</span>
                        ${this.getAmPm() ? html`<span class="ampm" style="color: ${this.fontColor};">${this.getAmPm()}</span>` : ''}
                    </div>
                ` : this.getAmPm() ? html`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.fontColor};">${this.getAmPm()}</span>
                    </div>
                ` : ''}
            </div>
            <div class="date" style="color: ${this.fontColor}; font-size: ${dateSize};">${this.getCurrentDate()}</div>
        `;
    }
}

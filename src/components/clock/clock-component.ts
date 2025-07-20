import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ExtendedDateTimeFormatOptions, createLogger } from '../../utils';
import { ClockController } from './clock-controller';

export interface ClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    fontColor?: string;
    language?: string;
    timeZone?: string;
}

@customElement('ha-clock')
export class ClockComponent extends LitElement {
    @property({ type: Object }) timeFormat?: ExtendedDateTimeFormatOptions;
    @property({ type: Object }) dateFormat?: ExtendedDateTimeFormatOptions;
    @property({ type: String }) fontColor?: string;
    @property({ type: String }) language?: string;
    @property({ type: String }) timeZone?: string;

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
            font-size: 12rem;
            line-height: 10rem;
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
            font-size: 4rem;
            font-weight: 400;
            text-align: center;
            margin-top: 0.2rem;
            opacity: 1;
            z-index: 2;
            position: relative;
        }

        /* Responsive adjustments */
        @media (min-width: 900px) {
            .clock {
                font-size: 16rem;
                line-height: 14rem;
            }

            .date {
                font-size: 6rem;
                line-height: 5rem;
            }
        }

        @media (min-width: 1280px) {
            .clock {
                font-size: 18rem;
                line-height: 14rem;
            }

            .date {
                font-size: 6rem;
            }
        }
    `;

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('timeFormat') || 
            changedProperties.has('dateFormat') || 
            changedProperties.has('language') || 
            changedProperties.has('timeZone')) {

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

    render() {
        // Log rendering information for debugging
        const seconds = this.getSeconds();
        const shouldShowSeconds = this.timeFormat?.second !== undefined && this.timeFormat?.second !== 'hidden';
        // this.logger.debug(`Rendering clock - Seconds: ${seconds}, Show seconds: ${shouldShowSeconds}, TimeFormat: ${JSON.stringify(this.timeFormat)}`);

        return html`
            <div class="clock" style="color: ${this.fontColor};">
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
            <div class="date" style="color: ${this.fontColor};">${this.getCurrentDate()}</div>
        `;
    }
}

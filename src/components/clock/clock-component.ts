import { html, TemplateResult, css, CSSResult } from 'lit-element';
import { ExtendedDateTimeFormatOptions } from '../../lokalify';
import { createLogger } from '../../utils/logger';
import { TimeModel, TimeModelConfig } from './time-model';
import { ClockTimer } from './clock-timer';

export interface ClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    fontColor?: string;
    language?: string;
    timeZone?: string;
    onTimeUpdate?: () => void; // Callback when time is updated
}

export class ClockComponent {
    private timeModel: TimeModel;
    private clockTimer: ClockTimer;
    private config: ClockConfig = {};
    private logger = createLogger('clock-component');

    constructor() {
        this.timeModel = new TimeModel();
        this.clockTimer = new ClockTimer({
            onTick: () => this.timeModel.updateTime()
        });
    }

    static get styles(): CSSResult {
        return css`
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
    }

    initialize(config: ClockConfig): void {
        this.logger.debug('Initializing ClockComponent');
        this.config = config;

        // Configure the TimeModel
        const timeModelConfig: TimeModelConfig = {
            timeFormat: config.timeFormat,
            dateFormat: config.dateFormat,
            language: config.language,
            timeZone: config.timeZone,
            onTimeUpdate: config.onTimeUpdate
        };
        this.timeModel.updateConfig(timeModelConfig);
        this.timeModel.updateTime();

        // Start the timer
        this.clockTimer.startTimer();
    }

    disconnect(): void {
        this.logger.debug('Disconnecting ClockComponent');
        this.clockTimer.stopTimer();
    }

    getHours(): string {
        return this.timeModel.getHours();
    }

    getMinutes(): string {
        return this.timeModel.getMinutes();
    }

    getSeconds(): string {
        return this.timeModel.getSeconds();
    }

    getAmPm(): string {
        return this.timeModel.getAmPm();
    }

    getCurrentDate(): string {
        return this.timeModel.getCurrentDate();
    }

    render(): TemplateResult {
        return html`
            <div class="clock" style="color: ${this.config.fontColor};">
                <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.getHours()}:${this.getMinutes()}</span>
                ${this.config.timeFormat?.second !== undefined && this.config.timeFormat?.second !== 'hidden' ? html`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.config.fontColor};">${this.getSeconds()}</span>
                        ${this.getAmPm() ? html`<span class="ampm" style="color: ${this.config.fontColor};">${this.getAmPm()}</span>` : ''}
                    </div>
                ` : this.getAmPm() ? html`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.config.fontColor};">${this.getAmPm()}</span>
                    </div>
                ` : ''}
            </div>
            <div class="date" style="color: ${this.config.fontColor};">${this.getCurrentDate()}</div>
        `;
    }
}

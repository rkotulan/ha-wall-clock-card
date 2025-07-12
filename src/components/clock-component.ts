import { html, TemplateResult, css, CSSResult } from 'lit-element';
import { formatDate, formatDateTime, ExtendedDateTimeFormatOptions } from '../lokalify';
import { createLogger } from '../utils/logger';

export interface ClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    fontColor?: string;
    language?: string;
    timeZone?: string;
    onTimeUpdate?: () => void; // Callback when time is updated
}

export class ClockComponent {
    private hours: string = '';
    private minutes: string = '';
    private seconds: string = '';
    private ampm: string = '';
    private currentDate: string = '';
    private timeTimer?: number;
    private config: ClockConfig = {};
    private logger = createLogger('clock-component');

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
        this.updateTime();
        this.startTimer();
    }

    disconnect(): void {
        this.logger.debug('Disconnecting ClockComponent');
        this.stopTimer();
    }

    private updateTime(): void {
        const now = new Date();
        const language = this.config.language || 'cs';
        const timeZone = this.config.timeZone;

        // Set hours, minutes, and seconds separately
        let hours, minutes, seconds;

        if (timeZone) {
            // Get time components in the specified time zone
            const timeString = formatDateTime(now, language, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }, timeZone);

            // Parse the time string (format: HH:MM:SS)
            const timeParts = timeString.split(':');
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
            seconds = parseInt(timeParts[2], 10);
        } else {
            // Use local time if no time zone is specified
            hours = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
        }

        // Handle 12-hour format if configured
        if (this.config.timeFormat?.hour12) {
            // Convert to 12-hour format
            const isPM = hours >= 12;
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
            this.ampm = isPM ? 'PM' : 'AM';
        } else {
            this.ampm = ''; // Clear AM/PM for 24-hour format
        }

        // Only pad with leading zeros if the format is '2-digit'
        this.hours = this.config.timeFormat?.hour === '2-digit' ? hours.toString().padStart(2, '0') : hours.toString();
        this.minutes = this.config.timeFormat?.minute === '2-digit' ? minutes.toString().padStart(2, '0') : minutes.toString();
        this.seconds = this.config.timeFormat?.second === '2-digit' ? seconds.toString().padStart(2, '0') : seconds.toString();

        // Format date with configurable format
        let formattedDate = formatDate(now, language, this.config.dateFormat || {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        }, timeZone);

        // Add comma after the day if it's not already there
        // This regex looks for a number (the day) followed by a space and then a letter (start of month)
        // and replaces it with the day, a comma, a space, and then the month
        formattedDate = formattedDate.replace(/(\d+)(\s+)([A-Za-z])/, '$1,$2$3');

        this.currentDate = formattedDate;

        // Call the onTimeUpdate callback if provided
        if (this.config.onTimeUpdate) {
            this.config.onTimeUpdate();
        }
    }

    private startTimer(): void {
        // Use a more precise timer mechanism with requestAnimationFrame
        let lastUpdateTime = Date.now();

        const updateFrame = () => {
            const now = Date.now();
            const elapsed = now - lastUpdateTime;

            // Update time if at least 1000ms have passed
            if (elapsed >= 1000) {
                this.updateTime();
                lastUpdateTime = now - (elapsed % 1000); // Adjust for any extra time
            }

            // Continue the animation loop
            this.timeTimer = window.requestAnimationFrame(updateFrame);
        };

        // Start the animation loop
        this.timeTimer = window.requestAnimationFrame(updateFrame);
        this.logger.debug('Clock timer started with requestAnimationFrame');
    }

    private stopTimer(): void {
        if (this.timeTimer) {
            window.cancelAnimationFrame(this.timeTimer);
            this.timeTimer = undefined;
            this.logger.debug('Clock timer stopped');
        }
    }

    getHours(): string {
        return this.hours;
    }

    getMinutes(): string {
        return this.minutes;
    }

    getSeconds(): string {
        return this.seconds;
    }

    getAmPm(): string {
        return this.ampm;
    }

    getCurrentDate(): string {
        return this.currentDate;
    }

    render(): TemplateResult {
        return html`
            <div class="clock" style="color: ${this.config.fontColor};">
                <span class="hours-minutes" style="color: ${this.config.fontColor};">${this.hours}:${this.minutes}</span>
                ${this.config.timeFormat?.second !== undefined && this.config.timeFormat?.second !== 'hidden' ? html`
                    <div class="seconds-container">
                        <span class="seconds" style="color: ${this.config.fontColor};">${this.seconds}</span>
                        ${this.ampm ? html`<span class="ampm" style="color: ${this.config.fontColor};">${this.ampm}</span>` : ''}
                    </div>
                ` : this.ampm ? html`
                    <div class="seconds-container">
                        <span class="ampm ampm-only" style="color: ${this.config.fontColor};">${this.ampm}</span>
                    </div>
                ` : ''}
            </div>
            <div class="date" style="color: ${this.config.fontColor};">${this.currentDate}</div>
        `;
    }
}

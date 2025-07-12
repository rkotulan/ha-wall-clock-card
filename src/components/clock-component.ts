import { html, TemplateResult } from 'lit-element';
import { formatDate, formatDateTime, ExtendedDateTimeFormatOptions } from '../lokalify';
import { createLogger } from '../utils/logger';

export interface ClockConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    fontColor?: string;
    language?: string;
    timeZone?: string;
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
    }

    private startTimer(): void {
        this.timeTimer = window.setInterval(() => this.updateTime(), 1000);
        this.logger.debug('Clock timer started');
    }

    private stopTimer(): void {
        if (this.timeTimer) {
            window.clearInterval(this.timeTimer);
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

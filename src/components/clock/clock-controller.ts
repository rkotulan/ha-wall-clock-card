import { ReactiveController, ReactiveControllerHost } from 'lit';
import { formatDateTime, formatDate, ExtendedDateTimeFormatOptions } from '../../lokalify';
import { createLogger } from '../../utils/logger';

export interface ClockControllerConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    language?: string;
    timeZone?: string;
}

/**
 * A unified reactive controller that manages both time and date data
 * This controller replaces the separate TimeController and DateController
 * to use a single timer for efficiency.
 */
export class ClockController implements ReactiveController {
    private host: ReactiveControllerHost;
    private logger = createLogger('clock-controller');
    private intervalId?: number;

    // Reactive properties for time components
    private _hours: string = '';
    private _minutes: string = '';
    private _seconds: string = '';
    private _ampm: string = '';

    // Reactive property for date
    private _currentDate: string = '';

    // Configuration
    private config: ClockControllerConfig = {};

    constructor(host: ReactiveControllerHost, config: ClockControllerConfig = {}) {
        this.host = host;
        this.config = config;

        // Register this controller with the host
        host.addController(this);
    }

    // ReactiveController lifecycle methods
    hostConnected(): void {
        this.logger.debug('ClockController host connected');

        // Update time and date immediately
        this.update();

        // Start interval to update time every second
        // This will also update the date when needed
        this.intervalId = window.setInterval(() => {
            this.update();
        }, 1000);
    }

    hostDisconnected(): void {
        this.logger.debug('ClockController host disconnected');

        // Clear interval when disconnected
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    /**
     * Update the configuration
     */
    updateConfig(config: ClockControllerConfig): void {
        this.logger.debug('Updating ClockController config:', config);
        this.config = { ...this.config, ...config };

        // Force an immediate update of both time and date
        const now = new Date();
        const language = this.config.language || 'cs';
        const timeZone = this.config.timeZone;

        // Update time
        this.updateTime(now, language, timeZone);

        // Always update date when config changes, regardless of seconds
        this.updateDate(now, language, timeZone);

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Update both time and date based on current configuration
     */
    private update(): void {
        const now = new Date();
        const language = this.config.language || 'cs';
        const timeZone = this.config.timeZone;

        // Update time
        this.updateTime(now, language, timeZone);

        // Update date - we only need to update the date once per minute
        // Check if seconds is 0 to update the date once per minute
        // OR if the currentDate is empty (first initialization)
        if (now.getSeconds() === 0 || this._currentDate === '') {
            this.updateDate(now, language, timeZone);
        }

        // Request an update from the host
        this.host.requestUpdate();
    }

    /**
     * Update the time based on current configuration
     */
    private updateTime(now: Date, language: string, timeZone?: string): void {
        // Get time components
        let hours: number, minutes: number, seconds: number;

        if (timeZone) {
            // Use the specified time zone
            const hour12 = this.config.timeFormat?.hour12 !== undefined ? this.config.timeFormat.hour12 : false;

            const timeString = formatDateTime(now, language, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: hour12
            }, timeZone);

            // Parse the time string
            const timeParts = timeString.split(':');

            if (hour12) {
                // For 12-hour format, handle AM/PM
                const lastPart = timeParts[timeParts.length - 1];
                const hasAmPm = lastPart.toLowerCase().includes('am') || lastPart.toLowerCase().includes('pm');

                if (hasAmPm) {
                    // Extract seconds and AM/PM
                    const secondsAndAmPm = lastPart.split(' ');
                    seconds = parseInt(secondsAndAmPm[0], 10);
                    this._ampm = secondsAndAmPm[1].toUpperCase();

                    // Parse hours and minutes
                    hours = parseInt(timeParts[0], 10);
                    minutes = parseInt(timeParts[1], 10);
                } else {
                    // No AM/PM in the string, parse normally
                    hours = parseInt(timeParts[0], 10);
                    minutes = parseInt(timeParts[1], 10);
                    seconds = parseInt(timeParts[2], 10);
                }
            } else {
                // For 24-hour format, parse normally
                hours = parseInt(timeParts[0], 10);
                minutes = parseInt(timeParts[1], 10);
                seconds = parseInt(timeParts[2], 10);
            }
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
            this._ampm = isPM ? 'PM' : 'AM';
        } else {
            this._ampm = ''; // Clear AM/PM for 24-hour format
        }

        // Format with leading zeros
        this._hours = hours.toString().padStart(2, '0');
        this._minutes = minutes.toString().padStart(2, '0');
        this._seconds = seconds.toString().padStart(2, '0');

        // Log the current time for debugging
        this.logger.debug(`Time updated - H:${this._hours} M:${this._minutes} S:${this._seconds}`);
    }

    /**
     * Update the date based on current configuration
     */
    private updateDate(now: Date, language: string, timeZone?: string): void {
        // Log the date format options for debugging
        this.logger.debug(`Updating date with format: ${JSON.stringify(this.config.dateFormat)}, language: ${language}, timeZone: ${timeZone || 'default'}`);

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

        this._currentDate = formattedDate;

        // Log the current date for debugging
        this.logger.debug(`Date updated: ${this._currentDate}`);
    }

    // Getter methods for time
    get hours(): string {
        return this._hours;
    }

    get minutes(): string {
        return this._minutes;
    }

    get seconds(): string {
        return this._seconds;
    }

    get ampm(): string {
        return this._ampm;
    }

    // Getter method for date
    get currentDate(): string {
        return this._currentDate;
    }
}

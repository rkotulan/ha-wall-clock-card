import { ReactiveControllerHost } from 'lit';
import { formatDate, ExtendedDateTimeFormatOptions } from '../../utils/localize/lokalify';
import { BaseController } from '../../utils/controllers';

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
export class ClockController extends BaseController {
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
        super(host, 'clock-controller');
        this.config = config;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        // Update time and date immediately
        this.update();

        // Start interval to update time every second
        // This will also update the date when needed
        this.intervalId = window.setInterval(() => {
            this.update();
        }, 1000);
    }

    protected onHostDisconnected(): void {
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
        const language = this.config.language || 'en';
        const timeZone = this.config.timeZone;

        // Update time
        this.updateTime(now, timeZone);

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
        const language = this.config.language || 'en';
        const timeZone = this.config.timeZone;

        // Update time
        this.updateTime(now, timeZone);

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
     * @param now The current date
     * @param timeZone Optional time zone to use for formatting
     */
    private updateTime(
        now: Date,
        timeZone?: string
    ): void {
        // Check for hidden format options
        const secondHidden = this.config.timeFormat?.second === 'hidden';

        // Determine if 12-hour format is configured
        const hour12 = this.config.timeFormat?.hour12 === true;

        // Get time components
        let hours: number, minutes: number, seconds: number;

        if (timeZone) {
            // Use Intl.DateTimeFormat to get time components in the specified time zone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timeZone,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false // Ensure 24-hour format for internal calculations
            });

            // Format the date and parse the components
            const parts = formatter.formatToParts(now);

            // Extract hour, minute, and second from the formatted parts
            hours = parseInt(parts.find(part => part.type === 'hour')?.value || '0', 10);
            minutes = parseInt(parts.find(part => part.type === 'minute')?.value || '0', 10);
            seconds = parseInt(parts.find(part => part.type === 'second')?.value || '0', 10);
        } else {
            // Use local time if no time zone is specified
            hours = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
        }

        // Handle hidden seconds
        if (secondHidden) {
            this._seconds = '';
        }

        // Handle 12-hour format if configured
        if (hour12) {
            // Convert to 12-hour format
            const isPM = hours >= 12;
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
            this._ampm = isPM ? 'PM' : 'AM';
        } else {
            this._ampm = ''; // Clear AM/PM for 24-hour format
        }

        // Format time components according to configuration
        // Always format hours and minutes, they can't be hidden anymore
        const shouldPadHours = this.config.timeFormat?.hour !== 'numeric';
        this._hours = shouldPadHours ? hours.toString().padStart(2, '0') : hours.toString();

        const shouldPadMinutes = this.config.timeFormat?.minute !== 'numeric';
        this._minutes = shouldPadMinutes ? minutes.toString().padStart(2, '0') : minutes.toString();

        // Only format seconds if they're not hidden
        if (!secondHidden) {
            const shouldPadSeconds = this.config.timeFormat?.second !== 'numeric';
            this._seconds = shouldPadSeconds ? seconds.toString().padStart(2, '0') : seconds.toString();
        }
    }

    /**
     * Update the date based on current configuration
     */
    private updateDate(now: Date, language: string, timeZone?: string): void {
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

import { formatDate, formatDateTime, ExtendedDateTimeFormatOptions } from '../../lokalify';

export interface TimeModelConfig {
    timeFormat?: ExtendedDateTimeFormatOptions;
    dateFormat?: ExtendedDateTimeFormatOptions;
    language?: string;
    timeZone?: string;
    onTimeUpdate?: () => void; // Callback when time is updated
}

export class TimeModel {
    private hours: string = '';
    private minutes: string = '';
    private seconds: string = '';
    private ampm: string = '';
    private currentDate: string = '';
    private config: TimeModelConfig = {};

    constructor(config: TimeModelConfig = {}) {
        this.config = config;
    }

    /**
     * Update the configuration
     */
    updateConfig(config: TimeModelConfig): void {
        this.config = config;
    }

    /**
     * Update the time based on current configuration
     */
    updateTime(): void {
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

    /**
     * Get the hours
     */
    getHours(): string {
        return this.hours;
    }

    /**
     * Get the minutes
     */
    getMinutes(): string {
        return this.minutes;
    }

    /**
     * Get the seconds
     */
    getSeconds(): string {
        return this.seconds;
    }

    /**
     * Get the AM/PM indicator
     */
    getAmPm(): string {
        return this.ampm;
    }

    /**
     * Get the current date
     */
    getCurrentDate(): string {
        return this.currentDate;
    }
}

// Pure helpers applying the time/date format defaults that v2 applied in
// WallClockCard.applyConfig(). Shared by the clock and date widgets; node-testable.
import {HomeAssistant} from 'custom-card-helpers';
import type {ExtendedDateTimeFormatOptions} from '../utils/localize/lokalify';
import {resolveHour12} from '../utils/ha-locale';

/**
 * Merges the configured time format over the defaults. When hour12 is not set
 * in the config it follows the user's HA profile (hass.locale.time_format).
 * An explicitly undefined `second` hides the seconds display.
 */
export function normalizeTimeFormat(
    configFormat: ExtendedDateTimeFormatOptions | undefined,
    hass?: HomeAssistant,
): ExtendedDateTimeFormatOptions {
    const timeFormat: ExtendedDateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: resolveHour12(configFormat?.hour12, hass),
    };
    if (configFormat) {
        Object.assign(timeFormat, configFormat, {hour12: timeFormat.hour12});
        if (configFormat.second === undefined) {
            timeFormat.second = undefined;
        }
    }
    return timeFormat;
}

/**
 * Merges the configured date format over the defaults. An explicitly undefined
 * `year` hides the year display.
 */
export function normalizeDateFormat(
    configFormat: ExtendedDateTimeFormatOptions | undefined,
): ExtendedDateTimeFormatOptions {
    const dateFormat: ExtendedDateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    if (configFormat) {
        Object.assign(dateFormat, configFormat);
        if (configFormat.year === undefined) {
            dateFormat.year = undefined;
        }
    }
    return dateFormat;
}

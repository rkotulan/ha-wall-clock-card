import { HomeAssistant } from 'custom-card-helpers';

/**
 * Helpers for resolving display settings from the user's Home Assistant
 * profile (hass.locale) with card config taking precedence.
 */

/**
 * Resolve the display language: explicit card config wins, then the user's
 * HA profile language (hass.locale.language, with the legacy hass.language
 * as fallback), then English.
 */
export function resolveLanguage(configLanguage: string | undefined, hass?: HomeAssistant): string {
    return configLanguage
        || hass?.locale?.language
        || hass?.language
        || 'en';
}

/**
 * Resolve whether to use the 12-hour clock: explicit card config wins,
 * then the user's HA profile time format (hass.locale.time_format:
 * '12' | '24' | 'language' | 'system'), falling back to what the locale
 * itself implies.
 */
export function resolveHour12(configHour12: boolean | undefined, hass?: HomeAssistant): boolean {
    if (configHour12 !== undefined) {
        return Boolean(configHour12);
    }

    const timeFormat = hass?.locale?.time_format as string | undefined;
    if (timeFormat === '12') {
        return true;
    }
    if (timeFormat === '24') {
        return false;
    }

    // 'language' derives from the profile language; 'system' from the browser locale.
    const locale = timeFormat === 'system' ? undefined : resolveLanguage(undefined, hass);
    try {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).resolvedOptions().hour12 ?? false;
    } catch {
        return false;
    }
}

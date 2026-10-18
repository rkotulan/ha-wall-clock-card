import type {WeatherForecastType} from '../../weather-providers/types';
import {formatDate} from '../../utils/localize';

/** Format forecast labels without changing the locale's clock or day period. */
export function formatForecastDate(
    date: Date,
    language = 'en',
    forecastType?: WeatherForecastType,
    leadingZero = true
): string {
    if (forecastType !== 'hourly' && forecastType !== 'twice_daily') {
        return formatDate(date, language, {weekday: 'short'});
    }

    const formatter = new Intl.DateTimeFormat(language, forecastType === 'hourly'
        ? {hour: '2-digit', minute: '2-digit'}
        : {weekday: 'short', hour: '2-digit'});
    if (leadingZero) return formatter.format(date);

    // Some 24-hour locales pad hours even with hour: 'numeric' when minutes
    // are present. Remove padding only from the hour, preserving minute zeros
    // and localized digits, separators and AM/PM text.
    const zero = new Intl.NumberFormat(language, {useGrouping: false}).format(0);
    return formatter.formatToParts(date).map(part =>
        part.type === 'hour' && part.value.length > zero.length && part.value.startsWith(zero)
            ? part.value.slice(zero.length)
            : part.value
    ).join('');
}

import {formatForecastDate} from '../src/components/weather/forecast-date';

const at = (hour: number, minute = 0) => new Date(2026, 9, 15, hour, minute);
const spaces = (value: string) => value.replace(/\s/g, ' ');

describe('forecast time labels', () => {
    it('keeps the existing padded hour by default', () => {
        expect(spaces(formatForecastDate(at(9), 'en-US', 'hourly'))).toBe('09:00 AM');
        expect(formatForecastDate(at(9), 'en-GB', 'hourly', true)).toBe('09:00');
    });

    it('removes only hour padding and keeps AM/PM and minute padding', () => {
        expect(spaces(formatForecastDate(at(9, 5), 'en-US', 'hourly', false))).toBe('9:05 AM');
        expect(spaces(formatForecastDate(at(21), 'en-US', 'hourly', false))).toBe('9:00 PM');
        expect(spaces(formatForecastDate(at(0), 'en-US', 'hourly', false))).toBe('12:00 AM');
        expect(spaces(formatForecastDate(at(12), 'en-US', 'hourly', false))).toBe('12:00 PM');
    });

    it.each(['en-GB', 'cs', 'de'])('also removes hour padding in 24-hour locale %s', language => {
        expect(formatForecastDate(at(9, 5), language, 'hourly', false)).toBe('9:05');
        expect(formatForecastDate(at(0), language, 'hourly', false)).toBe('0:00');
        expect(formatForecastDate(at(23), language, 'hourly', false)).toBe('23:00');
    });

    it('preserves localized digits and day periods', () => {
        const padded = formatForecastDate(at(9, 5), 'ar-EG', 'hourly');
        expect(padded).toContain('٠٩:٠٥');
        expect(formatForecastDate(at(9, 5), 'ar-EG', 'hourly', false)).toBe(padded.replace('٠٩', '٩'));
    });

    it('applies the option to twice-daily labels while preserving the weekday', () => {
        const padded = new Intl.DateTimeFormat('en-US', {weekday: 'short', hour: '2-digit'}).format(at(9));
        expect(formatForecastDate(at(9), 'en-US', 'twice_daily')).toBe(padded);
        expect(spaces(formatForecastDate(at(9), 'en-US', 'twice_daily', false))).toBe(spaces(padded).replace('09', '9'));
    });

    it.each([undefined, 'daily'] as const)('keeps daily/legacy labels unchanged (%s)', type => {
        expect(formatForecastDate(at(9), 'en', type, false)).toBe('Thu');
        expect(formatForecastDate(at(9), 'en', type)).toBe('Thu');
    });
});

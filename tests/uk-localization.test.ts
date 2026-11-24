import { HomeAssistant } from 'custom-card-helpers';
import en from '../src/translations/en.json';
import uk from '../src/translations/uk.json';
import {
    formatDate, formatTime, getLanguageOptions, getLocaleForLanguage,
    loadTranslationsAsync, localize, normalizeLanguage, translate,
} from '../src/utils/localize/lokalify';
import { resolveHour12, resolveLanguage } from '../src/utils/ha-locale';

const flatten = (value: Record<string, unknown>, prefix = ''): Record<string, string> =>
    Object.fromEntries(Object.entries(value).flatMap(([key, child]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        return child && typeof child === 'object'
            ? Object.entries(flatten(child as Record<string, unknown>, path))
            : [[path, child as string]];
    }));

const date = new Date('2026-01-15T12:30:45Z');
const zone = 'Europe/Kyiv';

describe('Ukrainian localization', () => {
    test('covers the English catalog with nonempty strings and preserves placeholders', () => {
        const english = flatten(en);
        const ukrainian = flatten(uk);
        expect(Object.keys(ukrainian).sort()).toEqual(Object.keys(english).sort());
        for (const [key, value] of Object.entries(ukrainian)) {
            expect(value.trim()).not.toBe('');
            expect(value.match(/\{[^}]+\}/g)?.sort() || [])
                .toEqual(english[key].match(/\{[^}]+\}/g)?.sort() || []);
        }
    });

    test.each(['uk', 'uk-UA', 'uk_UA', 'UK-ua'])('resolves %s and exposes an editor option', language => {
        expect(normalizeLanguage(language)).toBe('uk');
        expect(getLocaleForLanguage(language)).toBe('uk-UA');
        expect(translate('conditions.light_snow', language)).toBe('Невеликий сніг');
        expect(getLanguageOptions()).toContainEqual({ value: 'uk', label: 'Ukrainian (Українська)' });
    });

    test('loads embedded translations and uses the HA profile language', async () => {
        await loadTranslationsAsync();
        const hass = { locale: { language: 'uk-UA', time_format: 'language' }, language: 'en' } as unknown as HomeAssistant;
        expect(resolveLanguage(undefined, hass)).toBe('uk-UA');
        expect(localize('designer.remove_widget', hass, undefined, { name: 'Календар' })).toBe('Видалити: Календар');
        expect(localize('forecast.tomorrow', hass)).toBe('Завтра');
        expect(localize('editor.weather.days', hass, undefined, { count: 1 })).toBe('Днів: 1');
        expect(resolveHour12(undefined, hass)).toBe(false);
        expect(resolveHour12(true, hass)).toBe(true);
    });

    test.each(['uk', 'uk-UA'])('formats Ukrainian dates and 24-hour time for %s', language => {
        const full = formatDate(date, language, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }, zone);
        expect(full).toContain('четвер');
        expect(full).toContain('15 січня 2026');
        expect(formatDate(date, language, { day: '2-digit', month: '2-digit', year: 'numeric' }, zone)).toBe('15.01.2026');
        expect(formatTime(date, language, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }, zone)).toBe('14:30:45');
        expect(formatDate(date, language, { custom: 'dd.MM.yyyy' }, zone)).toBe('15.01.2026');
    });

    test('uses Kyiv summer time and applies date rollover', () => {
        expect(formatTime(new Date('2026-07-15T12:30:00Z'), 'uk', { hour: '2-digit', minute: '2-digit', hour12: false }, zone)).toBe('15:30');
        expect(formatDate(new Date('2026-01-15T23:30:00Z'), 'uk', { day: '2-digit', month: '2-digit', year: 'numeric' }, zone)).toBe('16.01.2026');
    });
});

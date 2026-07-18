import { resolveLanguage, resolveHour12 } from '../src/utils/ha-locale';
import { HomeAssistant } from 'custom-card-helpers';

const hassWith = (locale?: Partial<{ language: string; time_format: string }>, language?: string) =>
    ({ locale, language } as unknown as HomeAssistant);

describe('resolveLanguage', () => {
    it('prefers explicit config language', () => {
        expect(resolveLanguage('de', hassWith({ language: 'cs' }))).toBe('de');
    });

    it('falls back to hass.locale.language', () => {
        expect(resolveLanguage(undefined, hassWith({ language: 'cs' }, 'sk'))).toBe('cs');
    });

    it('falls back to legacy hass.language', () => {
        expect(resolveLanguage(undefined, hassWith(undefined, 'sk'))).toBe('sk');
    });

    it('defaults to en without hass', () => {
        expect(resolveLanguage(undefined, undefined)).toBe('en');
    });
});

describe('resolveHour12', () => {
    it('explicit config wins over profile', () => {
        expect(resolveHour12(true, hassWith({ time_format: '24' }))).toBe(true);
        expect(resolveHour12(false, hassWith({ time_format: '12' }))).toBe(false);
    });

    it('uses the HA profile 12/24 setting', () => {
        expect(resolveHour12(undefined, hassWith({ time_format: '12' }))).toBe(true);
        expect(resolveHour12(undefined, hassWith({ time_format: '24' }))).toBe(false);
    });

    it('derives from the profile language when time_format is language', () => {
        expect(resolveHour12(undefined, hassWith({ time_format: 'language', language: 'en' }))).toBe(true);
        expect(resolveHour12(undefined, hassWith({ time_format: 'language', language: 'cs' }))).toBe(false);
    });

    it('derives from the language when time_format is missing', () => {
        expect(resolveHour12(undefined, hassWith({ language: 'cs' }))).toBe(false);
    });

    it('defaults to 24h without hass and a 24h system locale', () => {
        expect(typeof resolveHour12(undefined, undefined)).toBe('boolean');
    });
});

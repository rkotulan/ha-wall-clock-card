import {normalizeTimeFormat} from '../src/widgets/format-defaults';

describe('normalizeTimeFormat', () => {
    it('preserves the configured colon blink mode', () => {
        expect(normalizeTimeFormat({colonBlink: 'slow'}).colonBlink).toBe('slow');
    });

    it('leaves colon blinking unset by default for backwards compatibility', () => {
        expect(normalizeTimeFormat(undefined).colonBlink).toBeUndefined();
    });
});

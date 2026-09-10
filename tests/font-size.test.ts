import {getSizeValue, normalizeFontSize} from '../src/utils/size';
import {Size} from '../src/core/types';

describe('custom font sizes', () => {
    test.each([['2', '2rem'], [' .5 ', '.5rem'], ['3rem', '3rem'], ['24px', '24px'], ['clamp(1rem, 2vw, 3rem)', 'clamp(1rem, 2vw, 3rem)'], ['', '']])('normalizes %s', (value, expected) => {
        expect(normalizeFontSize(value)).toBe(expected);
    });
    test('normalizes YAML font sizes without changing icon units or presets', () => {
        expect(getSizeValue(Size.Custom, '2', 'valueSize')).toBe('2rem');
        expect(getSizeValue(Size.Custom, '72px', 'iconSize')).toBe('72px');
        expect(getSizeValue(Size.Medium, '2', 'clockSize')).toBe('16rem');
    });
});

import {isHomeAssistantIconName} from '../src/components/action-bar/action-icon-kind';

describe('isHomeAssistantIconName', () => {
    test.each([
        'mdi:home',
        'local:custom-icon',
        'fa6-solid:house',
    ])('recognizes the namespaced icon %s', icon => {
        expect(isHomeAssistantIconName(icon)).toBe(true);
    });

    test.each([
        'M12,2L2,22H22Z',
        '',
        undefined,
    ])('does not treat SVG path data or an empty value as an icon name', icon => {
        expect(isHomeAssistantIconName(icon)).toBe(false);
    });
});

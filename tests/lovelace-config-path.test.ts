import {
    cloneWithConfigAtPath,
    configAtPath,
    findConfigPath,
    synchronizeLiveConfigAtPath,
} from '../src/core/lovelace-config-path';

describe('Lovelace config path synchronization', () => {
    const dashboard = () => ({
        views: [{
            cards: [
                {type: 'custom:wall-clock-card', appearance: {fontColor: '#fff'}},
                {type: 'custom:wall-clock-card', appearance: {fontColor: '#fff'}},
            ],
        }],
    });

    it('finds identical cards by object identity, not JSON equality', () => {
        const config = dashboard();
        expect(findConfigPath(config, config.views[0].cards[1])).toEqual(['views', 0, 'cards', 1]);
    });

    it('clones the dashboard and replaces only the selected card', () => {
        const config = dashboard();
        const replacement = {
            type: 'custom:wall-clock-card',
            appearance: {fontColor: '#fff', fontFamily: 'Georgia, serif'},
        };
        const cloned = cloneWithConfigAtPath(config, ['views', 0, 'cards', 0], replacement)!;

        expect(cloned).not.toBe(config);
        expect(configAtPath(cloned, ['views', 0, 'cards', 0])).toBe(replacement);
        expect(cloned.views[0].cards[1]).toEqual(config.views[0].cards[1]);
        expect(config.views[0].cards[0].appearance).toEqual({fontColor: '#fff'});
    });

    it('updates the live edit model so Done cannot restore stale config', () => {
        const config = dashboard();
        const original = config.views[0].cards[0];
        const replacement = {
            type: 'custom:wall-clock-card',
            appearance: {fontColor: '#fff', fontFamily: 'Georgia, serif'},
        };

        expect(synchronizeLiveConfigAtPath(
            config,
            ['views', 0, 'cards', 0],
            original,
            replacement,
        )).toBe(true);
        expect(config.views[0].cards[0]).toBe(replacement);
    });

    it('refuses to overwrite a concurrent change at the saved path', () => {
        const config = dashboard();
        const expected = config.views[0].cards[0];
        config.views[0].cards[0] = {
            type: 'custom:wall-clock-card',
            appearance: {fontColor: '#123456'},
        };

        expect(synchronizeLiveConfigAtPath(
            config,
            ['views', 0, 'cards', 0],
            expected,
            {type: 'custom:wall-clock-card', appearance: {fontFamily: 'Georgia, serif'}},
        )).toBe(false);
        expect(config.views[0].cards[0].appearance).toEqual({fontColor: '#123456'});
    });
});

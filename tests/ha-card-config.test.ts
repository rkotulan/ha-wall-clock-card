import {containsWallClockCard, createCardStub} from '../src/widgets/ha-card-config';

describe('embedded Home Assistant card config', () => {
    test('rejects a direct wall-clock-card', () => {
        expect(containsWallClockCard({type: 'custom:wall-clock-card'})).toBe(true);
    });

    test('rejects wall-clock-card nested in stacks and conditions', () => {
        expect(containsWallClockCard({
            type: 'vertical-stack',
            cards: [
                {type: 'tile', entity: 'light.kitchen'},
                {type: 'conditional', card: {type: 'custom:wall-clock-card'}},
            ],
        })).toBe(true);
    });

    test('allows ordinary nested cards', () => {
        expect(containsWallClockCard({
            type: 'horizontal-stack',
            cards: [{type: 'tile'}, {type: 'gauge'}],
        })).toBe(false);
    });

    test('handles cyclic objects defensively', () => {
        const config: Record<string, unknown> = {type: 'custom:test-card'};
        config.self = config;
        expect(containsWallClockCard(config)).toBe(false);
    });

    test('creates useful stubs for container cards', () => {
        expect(createCardStub('entities')).toEqual({type: 'entities', entities: []});
        expect(createCardStub('vertical-stack')).toEqual({type: 'vertical-stack', cards: []});
        expect(createCardStub('tile')).toEqual({type: 'tile'});
    });
});

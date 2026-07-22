import {moveListItem, movedListIndex} from '../src/editors/sortable-list';

describe('sortable list helpers', () => {
    test('moves an item without mutating the original list', () => {
        const original = ['a', 'b', 'c', 'd'];
        expect(moveListItem(original, 1, 3)).toEqual(['a', 'c', 'd', 'b']);
        expect(original).toEqual(['a', 'b', 'c', 'd']);
    });

    test('keeps the expanded item selected while moving down', () => {
        expect(movedListIndex(1, 1, 3)).toBe(3);
        expect(movedListIndex(2, 1, 3)).toBe(1);
        expect(movedListIndex(3, 1, 3)).toBe(2);
    });

    test('keeps the expanded item selected while moving up', () => {
        expect(movedListIndex(3, 3, 1)).toBe(1);
        expect(movedListIndex(1, 3, 1)).toBe(2);
        expect(movedListIndex(2, 3, 1)).toBe(3);
    });
});

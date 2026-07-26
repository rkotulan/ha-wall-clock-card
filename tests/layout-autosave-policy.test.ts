import {shouldDeferLayoutAutosave} from '../src/core/layout-autosave-policy';

describe('layout autosave policy', () => {
    it('autosaves non-text changes in the permanent panel designer', () => {
        expect(shouldDeferLayoutAutosave('timer', {
            textEditPending: false,
            explicitDesignerOpen: false,
        })).toBe(false);
    });

    it('waits for focusout before saving a panel text edit', () => {
        const context = {
            textEditPending: true,
            explicitDesignerOpen: false,
        };

        expect(shouldDeferLayoutAutosave('timer', context)).toBe(true);
        expect(shouldDeferLayoutAutosave('focusout', context)).toBe(false);
    });

    it('defers timer and focusout saves while the promoted designer is open', () => {
        const context = {
            textEditPending: false,
            explicitDesignerOpen: true,
        };

        expect(shouldDeferLayoutAutosave('timer', context)).toBe(true);
        expect(shouldDeferLayoutAutosave('focusout', context)).toBe(true);
    });

    it('commits the promoted designer when Done is used', () => {
        expect(shouldDeferLayoutAutosave('commit', {
            textEditPending: true,
            explicitDesignerOpen: true,
        })).toBe(false);
    });
});

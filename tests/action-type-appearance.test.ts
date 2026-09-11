import {changeActionTypeAppearance} from '../src/components/action-bar/action-type-appearance';

const navigation = {
    name: 'Navigate to Page',
    icon: 'mdi:arrow-right',
    defaultActionConfig: () => ({actionId: 'action-navigate', title: 'Navigate', icon: 'mdi:arrow-right'}),
};
const transportation = {
    name: 'Transportation',
    icon: 'mdi:bus-clock',
    defaultActionConfig: () => ({actionId: 'transportation', title: 'Transportation', icon: 'mdi:bus-clock'}),
};
const light = {
    name: 'Toggle Light',
    icon: 'mdi:lightbulb',
    defaultActionConfig: () => ({actionId: 'light-toggle', title: 'Toggle Light', icon: 'mdi:lightbulb'}),
};

describe('action type appearance', () => {
    it('follows successive type selections with the default title and icon', () => {
        const action = navigation.defaultActionConfig();
        const bus = changeActionTypeAppearance(action, 'transportation', navigation, transportation);
        expect(bus).toEqual(transportation.defaultActionConfig());
        expect(changeActionTypeAppearance(bus, 'light-toggle', transportation, light))
            .toEqual(light.defaultActionConfig());
        expect(action).toEqual(navigation.defaultActionConfig());
    });

    it.each([
        ['Kitchen', 'mdi:arrow-right', 'Kitchen', 'mdi:lightbulb'],
        ['Navigate', 'mdi:home', 'Toggle Light', 'mdi:home'],
        ['Kitchen', 'mdi:home', 'Kitchen', 'mdi:home'],
        ['', ' ', 'Toggle Light', 'mdi:lightbulb'],
    ])('preserves custom fields independently (%s, %s)', (title, icon, expectedTitle, expectedIcon) => {
        const action = {...navigation.defaultActionConfig(), title, icon, path: '/config', color: '#123456'};
        expect(changeActionTypeAppearance(action, 'light-toggle', navigation, light)).toEqual({
            ...action, actionId: 'light-toggle', title: expectedTitle, icon: expectedIcon,
        });
    });

    it('recognizes the translated type label and uses the next translated label', () => {
        const action = {...navigation.defaultActionConfig(), title: 'Přejít na stránku'};
        expect(changeActionTypeAppearance(action, 'light-toggle', navigation, light,
            'Přejít na stránku', 'Přepnout světlo').title).toBe('Přepnout světlo');
    });

    it('leaves appearance intact for an unknown destination plugin', () => {
        const action = navigation.defaultActionConfig();
        expect(changeActionTypeAppearance(action, 'custom', navigation)).toEqual({...action, actionId: 'custom'});
    });

    it('preserves nonempty values when the previous plugin is unavailable', () => {
        const action = {actionId: 'custom', title: 'My action', icon: 'mdi:star'};
        expect(changeActionTypeAppearance(action, 'light-toggle', undefined, light))
            .toEqual({...action, actionId: 'light-toggle'});
    });

    it('does not replace appearance when selecting the same type again', () => {
        const action = navigation.defaultActionConfig();
        expect(changeActionTypeAppearance(action, action.actionId, navigation, navigation)).toBe(action);
    });
});

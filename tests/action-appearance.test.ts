import {resolveActionAppearance} from '../src/components/action-bar/action-appearance';
import type {ModuleActionConfig} from '../src/components/action-bar/types';

const fallback = {icon: 'mdi:garage-alert', color: '#999999'};
const action: ModuleActionConfig = {
    actionId: 'action-ha', title: 'Garage', icon: fallback.icon,
    entity: 'light.garage', stateEntity: 'cover.garage',
    tap_action: {action: 'more-info'},
    stateRules: [
        {state: 'open', icon: 'mdi:garage-open', color: '#ff0000'},
        {state: 'closed', icon: 'mdi:garage', color: '#00ff00'},
        {state: 'opening', color: '#ffa500'},
        {state: 'closing', color: '#ffa500'},
        {state: 'unavailable', icon: 'mdi:alert'},
        {state: 'unknown', icon: 'mdi:help'},
    ],
};

describe('action appearance', () => {
    it('follows open/closed/transitional states without retaining a previous appearance', () => {
        const states = { 'cover.garage': {state: 'open'} };
        for (const [state, icon, color] of [
            ['open', 'mdi:garage-open', '#ff0000'],
            ['closing', fallback.icon, '#ffa500'],
            ['closed', 'mdi:garage', '#00ff00'],
            ['opening', fallback.icon, '#ffa500'],
            ['unexpected', fallback.icon, fallback.color],
        ]) {
            states['cover.garage'].state = state;
            expect(resolveActionAppearance(action, states, fallback)).toEqual({icon, color});
        }
    });

    it('handles missing, unavailable and unknown entities separately from closed', () => {
        expect(resolveActionAppearance(action, {}, fallback).icon).toBe('mdi:alert');
        expect(resolveActionAppearance(action, {'cover.garage': {state: 'unavailable'}}, fallback).icon).toBe('mdi:alert');
        expect(resolveActionAppearance(action, {'cover.garage': {state: 'unknown'}}, fallback).icon).toBe('mdi:help');
        expect(resolveActionAppearance(action, undefined, fallback)).toEqual(fallback);
    });

    it('uses the first exact match and retains unspecified appearance fields', () => {
        const configured = {...action, stateRules: [
            {state: 'Open', icon: 'wrong'},
            {state: 'open', color: '#123456'},
            {state: 'open', icon: 'ignored'},
        ]};
        expect(resolveActionAppearance(configured, {'cover.garage': {state: 'open'}}, fallback))
            .toEqual({icon: fallback.icon, color: '#123456'});
    });

    it('preserves the supplied plugin appearance when state styling is not configured', () => {
        const states = {'cover.garage': {state: 'open'}};
        expect(resolveActionAppearance({...action, stateEntity: ''}, states, fallback)).toEqual(fallback);
        expect(resolveActionAppearance({...action, stateRules: undefined}, states, fallback)).toEqual(fallback);
        expect(resolveActionAppearance({...action, stateRules: []}, states, fallback)).toEqual(fallback);
    });

    it('supports arbitrary states and SVG paths with independent buttons', () => {
        const states = {'lock.door': {state: 'locked'}, 'cover.garage': {state: 'open'}};
        const lock = {...action, stateEntity: 'lock.door', stateRules: [{state: 'locked', icon: 'M0 0h24v24z'}]};
        expect(resolveActionAppearance(lock, states, fallback).icon).toBe('M0 0h24v24z');
        expect(resolveActionAppearance(action, states, fallback).icon).toBe('mdi:garage-open');
    });

    it('does not mutate configuration or gesture targets', () => {
        const before = JSON.stringify(action);
        resolveActionAppearance(action, {'cover.garage': {state: 'closed'}}, fallback);
        expect(JSON.stringify(action)).toBe(before);
        expect(action.entity).toBe('light.garage');
    });
});

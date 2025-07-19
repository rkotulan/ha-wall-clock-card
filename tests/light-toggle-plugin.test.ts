import { LightTogglePlugin, LIGHT_TOGGLE_ACTION } from '../src/components/action-bar/plugins/light-toggle/light-toggle-plugin';
import { LightToggleActionConfig } from '../src/components/action-bar/plugins/light-toggle/types';
import { HomeAssistant } from 'custom-card-helpers';

describe('Light Toggle Plugin', () => {
    let plugin: LightTogglePlugin;

    // Mock HomeAssistant with a light entity
    const mockHass = {
        callService: jest.fn(),
        states: {
            'light.test_light': {
                state: 'on',
                attributes: {
                    friendly_name: 'Test Light',
                    brightness: 255
                }
            },
            'light.off_light': {
                state: 'off',
                attributes: {
                    friendly_name: 'Off Light'
                }
            }
        }
    } as unknown as HomeAssistant;

    beforeEach(() => {
        plugin = new LightTogglePlugin();
        jest.clearAllMocks();
    });

    it('should have the correct action ID', () => {
        expect(plugin.actionId).toBe(LIGHT_TOGGLE_ACTION);
    });

    it('should return the default on icon for an on light when icon_on is not provided', () => {
        const action: LightToggleActionConfig = {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: 'light.test_light',
            title: 'Test Light',
            icon: 'mdi:lightbulb'
        };

        const icon = plugin.getIconForState(action, mockHass);

        expect(icon).toBe('mdi:lightbulb-on');
        expect(plugin.getActiveState()).toBe(true);
    });

    it('should return the custom icon_on for an on light when provided', () => {
        const action: LightToggleActionConfig = {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: 'light.test_light',
            title: 'Test Light',
            icon: 'mdi:lightbulb',
            icon_on: 'mdi:lamp'
        };

        const icon = plugin.getIconForState(action, mockHass);

        expect(icon).toBe('mdi:lamp');
        expect(plugin.getActiveState()).toBe(true);
    });

    it('should return the correct icon for an off light', () => {
        const action: LightToggleActionConfig = {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: 'light.off_light',
            title: 'Off Light',
            icon: 'mdi:lightbulb'
        };

        const icon = plugin.getIconForState(action, mockHass);

        expect(icon).toBe('mdi:lightbulb');
        expect(plugin.getActiveState()).toBe(false);
    });

    it('should return the default icon when entity_id is not specified', () => {
        const action: LightToggleActionConfig = {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: '',
            title: 'No Entity',
            icon: 'mdi:lightbulb'
        };

        const icon = plugin.getIconForState(action, mockHass);

        expect(icon).toBe('mdi:lightbulb');
    });

    it('should return the default icon when entity is not found', () => {
        const action: LightToggleActionConfig = {
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: 'light.non_existent',
            title: 'Non-existent Light',
            icon: 'mdi:lightbulb'
        };

        const icon = plugin.getIconForState(action, mockHass);

        expect(icon).toBe('mdi:lightbulb');
    });

    it('should create a default action config', () => {
        const defaultConfig = plugin.defaultActionConfig();

        expect(defaultConfig).toEqual({
            actionId: LIGHT_TOGGLE_ACTION,
            entity_id: '',
            title: 'Toggle Light',
            icon: 'mdi:lightbulb',
            icon_on: 'mdi:lightbulb-on'
        });
    });
});

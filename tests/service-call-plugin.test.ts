// Import directly from the plugin/types files (not the action-bar barrel):
// the barrel pulls in LitElement components whose ESM Jest cannot load.
import { ActionRegistry } from '../src/components/action-bar/types';
import {
    SERVICE_CALL_ACTION,
    serviceCallHandler,
    registerServiceCallPlugin,
} from '../src/components/action-bar/plugins/service-call/service-call-plugin';
import { ServiceCallActionConfig } from '../src/components/action-bar/plugins/service-call/types';
import { HomeAssistant, handleAction } from 'custom-card-helpers';

// handleAction touches the DOM; mock it out for the node test environment.
jest.mock('custom-card-helpers', () => ({
    handleAction: jest.fn(),
}));

const mockHass = {} as HomeAssistant;
const fakeElement = {} as HTMLElement;

describe('Service Call Plugin', () => {
    beforeEach(() => {
        (ActionRegistry as any).instance = undefined;
        (handleAction as jest.Mock).mockClear();
    });

    it('should register the service call handler', () => {
        registerServiceCallPlugin();

        const handler = ActionRegistry.getInstance().getHandler(SERVICE_CALL_ACTION);
        expect(handler).toBe(serviceCallHandler);
    });

    it('should call the service through handleAction', () => {
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'light.turn_on',
            service_data: { entity_id: 'light.living_room', brightness: 255 },
        };

        serviceCallHandler(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({
                tap_action: expect.objectContaining({
                    action: 'call-service',
                    service: 'light.turn_on',
                    service_data: { entity_id: 'light.living_room', brightness: 255 },
                    confirmation: undefined,
                }),
            }),
            'tap',
        );
    });

    it('should pass a confirmation config with custom text', () => {
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'script.restart',
            confirmation: true,
            confirmation_text: 'Are you sure you want to restart?',
        };

        serviceCallHandler(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({
                tap_action: expect.objectContaining({
                    confirmation: { text: 'Are you sure you want to restart?' },
                }),
            }),
            'tap',
        );
    });

    it('should build a default confirmation text', () => {
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'script.restart',
            confirmation: true,
        };

        serviceCallHandler(action, mockHass, fakeElement);

        expect(handleAction).toHaveBeenCalledWith(
            fakeElement,
            mockHass,
            expect.objectContaining({
                tap_action: expect.objectContaining({
                    confirmation: { text: 'Are you sure you want to call script.restart?' },
                }),
            }),
            'tap',
        );
    });
});

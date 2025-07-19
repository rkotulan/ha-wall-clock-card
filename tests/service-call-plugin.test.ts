import { ActionRegistry } from '../src/components/action-bar';
import { HomeAssistant } from 'custom-card-helpers';
import { 
    SERVICE_CALL_ACTION, 
    ServiceCallActionConfig, 
    serviceCallHandler, 
    registerServiceCallPlugin

} from '../src/components/action-bar';

// Mock confirm function
const mockConfirm = jest.fn().mockReturnValue(true);
global.confirm = mockConfirm;

// Mock HomeAssistant
const mockCallService = jest.fn();
const mockHass = {
    callService: mockCallService,
    states: {}
} as unknown as HomeAssistant;

describe('Service Call Plugin', () => {
    let registry: ActionRegistry;

    beforeEach(() => {
        // Reset the registry instance for each test
        (ActionRegistry as any).instance = undefined;
        registry = ActionRegistry.getInstance();

        // Clear mocks
        mockCallService.mockClear();
        mockConfirm.mockClear();
    });

    it('should register the service call handler', () => {
        // Register the service call plugin
        registerServiceCallPlugin();

        // Get the handler
        const handler = registry.getHandler(SERVICE_CALL_ACTION);

        // Verify the handler is registered
        expect(handler).toBeDefined();
    });

    it('should call a service without confirmation', () => {
        // Create a service call action
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'light.turn_on',
            service_data: { entity_id: 'light.living_room', brightness: 255 }
        };

        // Execute the handler
        serviceCallHandler(action, mockHass);

        // Verify hass.callService was called with the correct parameters
        expect(mockCallService).toHaveBeenCalledWith(
            'light', 
            'turn_on', 
            { entity_id: 'light.living_room', brightness: 255 }
        );

        // Verify confirm was not called
        expect(mockConfirm).not.toHaveBeenCalled();
    });

    it('should call a service with confirmation when confirmed', () => {
        // Mock confirm to return true (user confirmed)
        mockConfirm.mockReturnValueOnce(true);

        // Create a service call action with confirmation
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'script.restart',
            confirmation: true,
            confirmation_text: 'Are you sure you want to restart?'
        };

        // Execute the handler
        serviceCallHandler(action, mockHass);

        // Verify confirm was called with the correct message
        expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to restart?');

        // Verify hass.callService was called
        expect(mockCallService).toHaveBeenCalledWith('script', 'restart', undefined);
    });

    it('should not call a service when confirmation is cancelled', () => {
        // Mock confirm to return false (user cancelled)
        mockConfirm.mockReturnValueOnce(false);

        // Create a service call action with confirmation
        const action: ServiceCallActionConfig = {
            actionId: SERVICE_CALL_ACTION,
            title: 'Test Service Call',
            icon: 'mdi:test',
            service: 'script.restart',
            confirmation: true
        };

        // Execute the handler
        serviceCallHandler(action, mockHass);

        // Verify confirm was called with the default message
        expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to call script.restart?');

        // Verify hass.callService was not called
        expect(mockCallService).not.toHaveBeenCalled();
    });

});

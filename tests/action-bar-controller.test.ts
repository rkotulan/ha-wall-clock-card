import { ActionBarController } from '../src/components/action-bar';

// Mock ReactiveControllerHost
const mockHost = {
    requestUpdate: jest.fn(),
    addController: jest.fn(),
    removeController: jest.fn()
};

describe('ActionBarController', () => {
    let controller: ActionBarController;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
    });

    describe('isActionBarEnabled', () => {
        it('should return true when actionBar.enabled is true', () => {
            // Create controller with actionBar.enabled = true
            controller = new ActionBarController(mockHost as any, {
                actionBar: {
                    enabled: true,
                    actions: []
                }
            });

            // Verify isActionBarEnabled returns true
            expect(controller.isActionBarEnabled).toBe(true);
        });

        it('should return false when actionBar.enabled is false', () => {
            // Create controller with actionBar.enabled = false
            controller = new ActionBarController(mockHost as any, {
                actionBar: {
                    enabled: false,
                    actions: []
                }
            });

            // Verify isActionBarEnabled returns false
            expect(controller.isActionBarEnabled).toBe(false);
        });


        it('should return false when actionBar is undefined', () => {
            // Create controller with no configuration
            controller = new ActionBarController(mockHost as any);

            // Verify isActionBarEnabled returns false (default)
            expect(controller.isActionBarEnabled).toBe(false);
        });
    });
});

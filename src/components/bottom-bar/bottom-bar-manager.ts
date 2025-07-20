import { ReactiveControllerHost } from 'lit';
import { BaseController } from '../../utils/controllers';
import { BottomBarComponent } from './bottom-bar-component';

/**
 * A controller that manages bottom bar components
 * It determines which component should be displayed based on priority and active state
 */
export class BottomBarManager extends BaseController {
  private components: BottomBarComponent[] = [];
  private activeComponent: BottomBarComponent | null = null;

  constructor(host: ReactiveControllerHost) {
    super(host, 'bottom-bar-manager');
  }

  /**
   * Register a component with the manager
   * @param component The component to register
   */
  registerComponent(component: BottomBarComponent): void {
    this.logger.info(`Registering component ${component.className} with priority ${component.priority}`);
    this.components.push(component);
    // Sort components by priority (highest first)
    this.components.sort((a, b) => b.priority - a.priority);
    // Update active component in case the new component should be active
    this.updateActiveComponent();
  }

  /**
   * Update the active component based on priority and active state
   */
  updateActiveComponent(): void {
    // Find the highest priority active component
    const newActiveComponent = this.components.find(c => c.isActive) || null;
    
    if (this.activeComponent !== newActiveComponent) {
      this.logger.debug(`Changing active component from ${this.activeComponent?.constructor.name || 'none'} to ${newActiveComponent?.constructor.name || 'none'}`);
      
      // Deactivate current component
      if (this.activeComponent) {
        this.activeComponent.deactivate();
      }
      
      // Activate new component
      this.activeComponent = newActiveComponent;
      if (this.activeComponent) {
        this.activeComponent.activate();
      }
      
      // Request update from host
      this.host.requestUpdate();
    }
  }

  /**
   * Get the current active component
   */
  get currentComponent(): BottomBarComponent | null {
    return this.activeComponent;
  }

  // Implementation of abstract methods from BaseController
  protected onHostConnected(): void {
    this.logger.debug('Bottom bar manager connected');
  }

  protected onHostDisconnected(): void {
    this.logger.debug('Bottom bar manager disconnected');
  }
}
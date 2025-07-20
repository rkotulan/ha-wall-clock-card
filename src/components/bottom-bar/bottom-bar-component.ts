import { LitElement } from 'lit';

/**
 * Base component that all bottom bar components should extend
 * This provides a common interface for the BottomBarManager to interact with
 */
export abstract class BottomBarComponent extends LitElement {
  /**
   * Priority of this component
   * Higher priority components take precedence when multiple are active
   */
  abstract get priority(): number;
  
  /**
   * Whether this component wants to be displayed
   */
  abstract get isActive(): boolean;
  
  /**
   * Lifecycle hook called when the component is activated
   * This is called when the component becomes the active component
   */
  activate(): void {}
  
  /**
   * Lifecycle hook called when the component is deactivated
   * This is called when the component is no longer the active component
   */
  deactivate(): void {}
}
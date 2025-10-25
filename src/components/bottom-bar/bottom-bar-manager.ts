import {ReactiveControllerHost, TemplateResult} from 'lit';
import {BaseController, BottomBarRequestUpdateMessage, Messenger, findComponentsInShadowRoot} from '../../utils';
import {BottomBarComponent} from './bottom-bar-component';
import {html, css, CSSResult} from 'lit';

/**
 * A controller that manages bottom bar components
 * It determines which component should be displayed based on priority and active state
 */

export class BottomBarManager extends BaseController {
    private components: BottomBarComponent[] = [];
    private activeComponent: BottomBarComponent | null = null;
    private previousActiveComponent: BottomBarComponent | null = null;
    private messenger: Messenger = Messenger.getInstance();

    // Animation configurations
    private readonly fadeInKeyframes = [
        {opacity: 0},
        {opacity: 1}
    ];

    private readonly fadeOutKeyframes = [
        {opacity: 1},
        {opacity: 0}
    ];

    private readonly animationOptions = {
        duration: 500,
        fill: 'forwards' as FillMode
    };

    static get styles(): CSSResult {
        return css`
            .bottom-bar-container {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                z-index: 2;
            }

            .bottom-bar-item {
                display: none;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            .bottom-bar-item.active {
                display: block;
            }

            .bottom-bar-item.previous {
                display: block;
            }
        `;
    }

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

        this.host.requestUpdate();
    }

    /**
     * Update the active component based on priority and active state
     */
    updateActiveComponent(): void {
        // Find the highest priority active component
        const newActiveComponent = this.components.find(c => c.isActive) || null;

        if (this.activeComponent !== newActiveComponent) {
            this.logger.debug(`Changing active component from ${this.activeComponent?.constructor.name || 'none'} to ${newActiveComponent?.constructor.name || 'none'}`);

            // Store the previous component before updating
            this.previousActiveComponent = this.activeComponent;

            // Deactivate current component
            if (this.activeComponent) {
                this.activeComponent.deactivate();
            }

            // Activate new component
            this.activeComponent = newActiveComponent;
            if (this.activeComponent) {
                this.activeComponent.activate();
            }

            if (this.previousActiveComponent && this.activeComponent) {
                this.host.requestUpdate();
                this.host.updateComplete.then(() => {
                    this.animateComponentChange();
                });
            }
        }
    }

    /**
     * Animate the transition between components
     */
    private animateComponentChange(): void {
        // Find the DOM elements for the current and previous components
        if (!this.activeComponent || !this.previousActiveComponent) {
            return;
        }

        // Find the active and previous elements by their classes
        const currentElement = findComponentsInShadowRoot(this.host, '.bottom-bar-item.active')[0];
        const previousElement = findComponentsInShadowRoot(this.host, '.bottom-bar-item.previous')[0];

        if (!currentElement || !previousElement) {
            this.logger.warn('Could not find elements for animation');
            return;
        }

        previousElement.animate(
            this.fadeOutKeyframes,
            {...this.animationOptions, easing: 'ease-out'}
        );

        // Apply animations
        currentElement.animate(
            this.fadeInKeyframes,
            {...this.animationOptions, easing: 'ease-in'}
        );
    }

    /**
     * Get the current active component
     */
    get currentComponent(): BottomBarComponent | null {
        return this.activeComponent;
    }

    public render(): TemplateResult {

        return html`
            <div class="bottom-bar-container">
                ${this.components.map(component => {
                    // Show component if it's the current active one or the previous one during transition
                    const isActive = component == this.currentComponent;
                    const isPrevious = component == this.previousActiveComponent;

                    return html`
                        <div class="bottom-bar-item ${isActive ? 'active' : ''} ${isPrevious ? 'previous' : ''}">
                            ${component}
                        </div>
                    `;
                })}
            </div>
        `;
    }

    // Implementation of abstract methods from BaseController
    protected onHostConnected(): void {
        this.logger.debug('Bottom bar manager connected');
        this.messenger.subscribe(BottomBarRequestUpdateMessage, this.onRequestUpdateMessage);
        
        this.updateActiveComponent();
    }

    protected onHostDisconnected(): void {
        this.logger.debug('Bottom bar manager disconnected');
        this.messenger.unsubscribe(BottomBarRequestUpdateMessage, this.onRequestUpdateMessage);
    }

    private onRequestUpdateMessage = (_msg: BottomBarRequestUpdateMessage) => {
        this.updateActiveComponent();
    };
}

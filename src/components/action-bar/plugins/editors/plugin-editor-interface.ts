import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { ActionConfig } from '../../types';

/**
 * Interface for plugin editor components
 * All plugin editors should implement this interface
 */
export interface PluginEditorInterface {
    /**
     * The Home Assistant instance
     */
    hass: HomeAssistant;

    /**
     * The action configuration
     */
    action: ActionConfig;

    /**
     * The index of the action in the actions array
     */
    index: number;

    /**
     * Callback function to update the action configuration
     * @param index The index of the action in the actions array
     * @param property The property to update
     * @param value The new value
     */
    actionChanged: (index: number, property: string, value: any) => void;

    /**
     * Render the editor UI
     */
    render(): unknown;
}

/**
 * Base class for plugin editor components
 * All plugin editors should extend this class
 */
export abstract class BasePluginEditor extends LitElement implements PluginEditorInterface {
    @property({ type: Object }) hass!: HomeAssistant;
    @property({ type: Object }) action!: ActionConfig;
    @property({ type: Number }) index!: number;
    @property({ type: Function }) actionChanged!: (index: number, property: string, value: any) => void;

    /**
     * Update callback
     * @param changedProperties The changed properties
     */
    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
    }

    /**
     * Helper method to handle input events
     * @param property The property to update
     * @param event The input event
     */
    protected handleInputChange(property: string, event: CustomEvent): void {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLElement & { value?: string };
        if (!target) return;
        this.actionChanged(this.index, property, target.value || '');
    }

    /**
     * Helper method to handle value-changed events
     * @param property The property to update
     * @param event The value-changed event
     */
    protected handleValueChange(property: string, event: CustomEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.actionChanged(this.index, property, event.detail.value);
    }

    /**
     * Render the editor UI
     * This method should be implemented by subclasses
     */
    abstract render(): unknown;
}

import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { WallClockConfig } from '../../core/wall-clock-card';

/**
 * Interface for editor section components
 * All editor sections should implement this interface
 */
export interface EditorSectionInterface {
    /**
     * The Home Assistant instance
     */
    hass: HomeAssistant;

    /**
     * The card configuration
     */
    config: WallClockConfig;

    /**
     * Render the editor UI
     */
    render(): unknown;
}

/**
 * Base class for editor section components
 * All editor sections should extend this class
 */
export abstract class BaseEditorSection extends LitElement implements EditorSectionInterface {
    @property({ type: Object }) hass!: HomeAssistant;
    @property({ type: Object }) config!: WallClockConfig;

    /**
     * Update callback
     * @param changedProperties The changed properties
     */
    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
    }

    /**
     * Helper method to handle form value changes
     * @param ev The custom event
     */
    protected _handleFormValueChanged(ev: CustomEvent): void {
        ev.stopPropagation();

        if (!this.config) return;

        // Create a deep copy of the config and set the property value
        const newConfig = JSON.parse(JSON.stringify(this.config));

        // Set the property value using the property path
        this.setPropertyByPath(newConfig, ev.detail.propertyName, ev.detail.value);

        // Fire the config-changed event with the new config
        fireEvent(this, 'config-changed', { config: newConfig });
    }

    /**
     * Set a property value using a dot-notation path
     * @param obj The object to modify
     * @param path The property path (e.g., "timeFormat.hour12")
     * @param value The new value
     * @returns The modified object
     */
    protected setPropertyByPath(obj: any, path: string, value: any): any {
        if (!path) return obj;

        const parts = path.split('.');
        let current = obj;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];

            // Handle array indices in the path (e.g., "sensors.0.entity")
            if (part.includes('[') && part.includes(']')) {
                const arrayName = part.substring(0, part.indexOf('['));
                const index = parseInt(part.substring(part.indexOf('[') + 1, part.indexOf(']')), 10);

                if (!current[arrayName]) {
                    current[arrayName] = [];
                }

                if (!current[arrayName][index]) {
                    current[arrayName][index] = {};
                }

                current = current[arrayName][index];
            } else {
                // Regular property
                if (!current[part]) {
                    current[part] = {};
                }
                current = current[part];
            }
        }

        // Set the final property value
        const lastPart = parts[parts.length - 1];
        current[lastPart] = value;

        return obj;
    }

    /**
     * Render the editor UI
     * This method should be implemented by subclasses
     */
    abstract render(): unknown;
}

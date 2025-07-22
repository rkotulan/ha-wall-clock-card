import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";
import {LabelPosition, Selector} from "./types";

declare global {
    interface HASSDomEvents {
        "action-click": {};
        "action-click-0": {};
        "action-click-1": {};
        "action-click-2": {};
        "action-click-3": {};
        "action-click-4": {};
    }
}

/**
 * A row selector component that provides a standardized layout for form fields
 * with optional action buttons.
 * 
 * The component supports:
 * - Label positioning (left, top, or hidden)
 * - Helper text
 * - Value transformation
 * - Multiple action buttons (either individual or as an array)
 * 
 * @example
 * ```html
 * <ha-row-selector
 *   .hass=${this.hass}
 *   .selector=${{text: {type: "text"}}}
 *   .value=${value}
 *   .label=${"My Label"}
 *   .helper=${"Helper text"}
 *   .labelPosition=${LabelPosition.Top}
 *   @value-changed=${this._handleValueChanged}
 * ></ha-row-selector>
 * ```
 * 
 * @example With action buttons
 * ```html
 * <ha-row-selector
 *   .hass=${this.hass}
 *   .selector=${{text: {type: "text"}}}
 *   .value=${value}
 *   .label=${"My Label"}
 *   .actionButtons=${[
 *     {
 *       icon: 'M19,13H5V11H19V13Z',
 *       tooltip: "Remove",
 *       eventName: "action-click"
 *     },
 *     {
 *       icon: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
 *       tooltip: "Move up",
 *       eventName: "action-click-0"
 *     }
 *   ]}
 *   @value-changed=${this._handleValueChanged}
 *   @action-click=${this._handleRemove}
 *   @action-click-0=${this._handleMoveUp}
 * ></ha-row-selector>
 * ```
 */
@customElement("ha-row-selector")
export class HaRowSelector extends LitElement {
    /**
     * The Home Assistant instance
     * Required for accessing entity states and services
     */
    @property({attribute: false}) public hass!: HomeAssistant;

    /**
     * The selector configuration that defines the input type
     * @see Selector
     */
    @property({attribute: false}) public selector!: Selector;

    /**
     * The current value of the input
     */
    @property() public value?: string;

    /**
     * The label to display next to the input
     */
    @property() public label?: string;

    /**
     * Helper text to display below the input
     */
    @property() public helper?: string;

    /**
     * Whether the input is disabled
     */
    @property({type: Boolean, reflect: true}) public disabled = false;

    /**
     * Whether the input is required
     */
    @property({type: Boolean}) public required = true;

    /**
     * Optional property name to include in the value-changed event
     * Useful when handling multiple inputs in a form
     */
    @property() public propertyName?: string;

    /**
     * Optional function to transform the input value before firing the value-changed event
     * @param value The input value to transform
     * @returns The transformed value
     */
    @property({attribute: false}) public transformData?: (value: any) => any;

    /**
     * The position of the label relative to the input
     * @default LabelPosition.Left
     */
    @property({attribute: false}) public labelPosition: LabelPosition = LabelPosition.Left;


    /**
     * Array of action buttons to display
     * Each button can have an icon, tooltip, and custom event name
     * 
     * @example
     * ```typescript
     * [
     *   {
     *     icon: 'M19,13H5V11H19V13Z', // SVG path for the icon
     *     tooltip: "Remove item",      // Tooltip text
     *     eventName: "action-click"    // Event to fire when clicked
     *   }
     * ]
     * ```
     */
    @property({attribute: false}) public actionButtons?: Array<{
        icon: string;
        tooltip?: string;
        eventName?: string;
    }>;

    /**
     * Renders the component
     * @returns The rendered template
     */
    protected render() {
        return html`
            <div class="row ${this.labelPosition.toLowerCase()}">
                ${this.label && this.labelPosition !== LabelPosition.Hidden ? html`
                    <div class="label">${this.label}</div>
                ` : ''}
                <div class="value">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${this.selector}
                        .value=${this.value || ''}
                        .helper=${this.helper}
                        .disabled=${this.disabled}
                        .required=${this.required}
                        @value-changed=${this._valueChanged}
                    ></ha-selector>
                </div>
                <div class="action-buttons">
                    ${this.actionButtons ? 
                        this.actionButtons.map((button, index) => html`
                            <div class="action-button">
                                <ha-icon-button
                                    .path=${button.icon}
                                    .title=${button.tooltip || ''}
                                    @click=${(ev: MouseEvent) => this._handleDynamicActionClick(ev, index, button.eventName)}
                                ></ha-icon-button>
                            </div>
                        `) 
                    : ''}
                </div>
            </div>
        `;
    }


    /**
     * Handles clicks on dynamically created action buttons
     * @param ev The mouse event
     * @param index The index of the button in the actionButtons array
     * @param eventName Optional custom event name to fire
     */
    private _handleDynamicActionClick(ev: MouseEvent, index: number, eventName?: string) {
        ev.stopPropagation();
        fireEvent(this, (eventName || `action-click-${index}`) as keyof HASSDomEvents, {});
    }

    /**
     * Handles value changes from the ha-selector component
     * @param ev The custom event containing the new value
     */
    private _valueChanged(ev: CustomEvent) {
        ev.stopPropagation();
        let value = ev.detail.value;

        // Apply transformation function if provided
        if (this.transformData) {
            value = this.transformData(value);
        }

        // Use type assertion to allow additional properties
        fireEvent(this, "value-changed", {
            value,
            propertyName: this.propertyName
        } as any);
    }

    static styles = css`
        .row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }

        /* Default style for left position */
        .row.left {
            flex-direction: row;
        }

        .row.left .label {
            flex: 0 0 30%;
            font-weight: 500;
        }

        /* Style for top position */
        .row.top {
            flex-direction: column;
            align-items: flex-start;
        }

        .row.top .label {
            margin-bottom: 8px;
            font-weight: 500;
        }

        .row.top .value {
            width: 100%;
        }

        /* Common styles */
        .value {
            flex: 1;
            display: flex;
            align-items: center;
            overflow: hidden; /* Already present */
            text-overflow: ellipsis; /* Add this */
            white-space: nowrap; /* Add this */
        }

        ha-selector {
            width: 100%;
            overflow: hidden; /* Add this */
            text-overflow: ellipsis; /* Add this */
        }

        /* Action buttons container */
        .action-buttons {
            display: flex;
            align-items: center;
            margin-left: 8px;
        }

        /* Action button styles */
        .action-button {
            display: flex;
            align-items: center;
            margin-left: 4px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ha-row-selector": HaRowSelector;
    }
}

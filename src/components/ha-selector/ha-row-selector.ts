import {css, html, LitElement, PropertyValues} from "lit";
import {customElement, property, state} from "lit/decorators.js";
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
 *       icon: 'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z',
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
    private lastEmittedValue: unknown = Symbol('initial-value');
    @state() private hasNumberDraft = false;
    @state() private numberDraft: unknown = '';
    private readonly nativeInputListener = (ev: Event) => this._nativeInputChanged(ev);
    private readonly fieldCommitListener = () => this._commitNestedFieldValue();

    public connectedCallback(): void {
        super.connectedCallback();
        // Capture before an HA/Web Awesome child can stop propagation.
        this.addEventListener('input', this.nativeInputListener, {capture: true});
        this.addEventListener('focusout', this.fieldCommitListener, {capture: true});
    }

    public disconnectedCallback(): void {
        this.removeEventListener('input', this.nativeInputListener, {capture: true});
        this.removeEventListener('focusout', this.fieldCommitListener, {capture: true});
        super.disconnectedCallback();
    }

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
    @property({attribute: false}) public value?: unknown;

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
     *     icon: 'M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z', // SVG path for the icon
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

    private get isBooleanSelector(): boolean {
        return !!this.selector && Object.prototype.hasOwnProperty.call(this.selector, 'boolean');
    }

    private get isNumberBoxSelector(): boolean {
        return !!this.selector && 'number' in this.selector &&
            !!this.selector.number && this.selector.number.mode !== 'slider';
    }

    private get selectorValue(): unknown {
        return this.isNumberBoxSelector && this.hasNumberDraft
            ? this.numberDraft
            : this.value ?? '';
    }

    /**
     * Renders the component
     * @returns The rendered template
     */
    protected render() {
        return html`
            <div class="row ${this.labelPosition.toLowerCase()} ${this.isBooleanSelector ? 'boolean' : ''}">
                ${this.label && this.labelPosition !== LabelPosition.Hidden ? html`
                    <div class="label">${this.label}</div>
                ` : ''}
                <div class="value">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${this.selector}
                        .value=${this.selectorValue}
                        .helper=${this.isBooleanSelector ? undefined : this.helper}
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
                ${this.isBooleanSelector && this.helper ? html`
                    <div class="boolean-helper">${this.helper}</div>
                ` : ''}
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
        const value = ev.detail.value;

        // A number box temporarily becomes empty while its value is being
        // replaced. Keep that draft local instead of writing `undefined` into
        // the config, where the editor would immediately substitute a default.
        if (this.isNumberBoxSelector && this._isEmptyNumberValue(value)) {
            this.numberDraft = '';
            this.hasNumberDraft = true;
            return;
        }

        if (this.isNumberBoxSelector) {
            this.hasNumberDraft = false;
        }
        this._emitValue(value);
    }

    /**
     * Text selectors in newer Home Assistant/Web Awesome combinations do not
     * consistently re-emit `value-changed` from their nested native input.
     * Native input events are composed, so use them as a compatibility fallback.
     */
    private _nativeInputChanged(ev: Event) {
        const isTextSelector = !!this.selector && Object.prototype.hasOwnProperty.call(this.selector, 'text');
        if (!isTextSelector && !this.isNumberBoxSelector) {
            return;
        }

        const source = ev.composedPath().find((item): item is HTMLInputElement =>
            typeof (item as HTMLInputElement | undefined)?.value === 'string'
        );
        if (!source) {
            return;
        }

        if (this.isNumberBoxSelector) {
            if (source.value === '') {
                this.numberDraft = '';
                this.hasNumberDraft = true;
                return;
            }

            const value = Number(source.value);
            if (Number.isFinite(value)) {
                this.hasNumberDraft = false;
                this._emitValue(value);
            }
            return;
        }

        this._emitValue(source.value);
    }

    private _commitNestedFieldValue() {
        if (this.isNumberBoxSelector) {
            // Required numeric fields cannot be persisted empty. Leaving an
            // empty draft restores the last valid configured value.
            if (this.hasNumberDraft) {
                this.hasNumberDraft = false;
            }
            return;
        }

        if (!this.selector || !Object.prototype.hasOwnProperty.call(this.selector, 'text')) {
            return;
        }

        const queue: ParentNode[] = [this.renderRoot];
        while (queue.length) {
            const root = queue.shift()!;
            for (const element of Array.from(root.querySelectorAll('*'))) {
                if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                    this._emitValue(element.value);
                    return;
                }
                if (element.shadowRoot) queue.push(element.shadowRoot);
            }
        }
    }

    private _isEmptyNumberValue(value: unknown): boolean {
        return value === '' || value === null || value === undefined ||
            (typeof value === 'number' && Number.isNaN(value));
    }

    private _emitValue(inputValue: unknown) {
        let value = inputValue;

        // Apply transformation function if provided
        if (this.transformData) {
            value = this.transformData(value);
        }

        // HA may emit both its custom event and the composed native input event.
        if (Object.is(this.lastEmittedValue, value)) {
            return;
        }
        this.lastEmittedValue = value;

        // Use type assertion to allow additional properties
        fireEvent(this, "value-changed", {
            value,
            propertyName: this.propertyName
        } as any);
    }

    protected updated(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('value')) {
            this.lastEmittedValue = this.value;
        }
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

        .row.left.boolean {
            display: grid;
            grid-template-columns: minmax(0, 30%) minmax(0, 1fr) auto;
            column-gap: 8px;
            row-gap: 4px;
        }

        .row.left.boolean .value {
            min-width: 0;
            justify-content: flex-end;
            overflow: visible;
        }

        .row.left.boolean .value ha-selector {
            flex: 0 0 auto;
            width: auto;
            overflow: visible;
        }

        .row.left.boolean .action-buttons {
            grid-column: 3;
            grid-row: 1;
        }

        .row.boolean .action-buttons:empty {
            display: none;
        }

        .row.left.boolean .boolean-helper {
            grid-column: 2 / -1;
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

        .row.top.boolean .value {
            width: auto;
            align-self: flex-end;
            overflow: visible;
        }

        .row.top.boolean .value ha-selector {
            width: auto;
            overflow: visible;
        }

        .boolean-helper {
            min-width: 0;
            color: var(--secondary-text-color, #727272);
            font-size: 0.75rem;
            line-height: 1.35;
            white-space: normal;
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

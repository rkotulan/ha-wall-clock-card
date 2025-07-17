import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";
import {Selector} from "./types";

@customElement("ha-row-selector")
export class HaRowSelector extends LitElement {
    @property({attribute: false}) public hass!: HomeAssistant;

    @property({attribute: false}) public selector!: Selector;

    @property() public value?: string;

    @property() public label?: string;

    @property() public helper?: string;

    @property({type: Boolean, reflect: true}) public disabled = false;

    @property({type: Boolean}) public required = true;

    @property() public propertyName?: string;

    // Add the new transformData property
    @property({attribute: false}) public transformData?: (value: any) => any;

    protected render() {
        return html`
            <div class="row">
                <div class="label">${this.label}</div>
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
            </div>
        `;
    }

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

        .label {
            flex: 0 0 30%;
            font-weight: 500;
        }

        .value {
            flex: 1;
            display: flex;
            align-items: center;
        }

        ha-selector {
            width: 100%;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ha-row-selector": HaRowSelector;
    }
}

import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";

// Define the RowSelector interface
interface RowSelector {
    select: {
        options: any[];
        mode: string;
    };
}

@customElement("ha-row-selector")
export class HaRowSelector extends LitElement {
    @property({attribute: false}) public hass!: HomeAssistant;

    @property({attribute: false}) public selector!: RowSelector;

    @property() public value?: string;

    @property() public label?: string;

    @property() public helper?: string;

    @property({type: Boolean, reflect: true}) public disabled = false;

    @property({type: Boolean}) public required = true;

    @property() public propertyName?: string;

    protected render() {
        return html`
            <div class="row">
                <div class="label">${this.label}</div>
                <div class="value">
                    <ha-selector
                        .hass=${this.hass}
                        .selector=${{
                            select: {
                                options: this.selector.select.options,
                                mode: this.selector.select.mode || 'dropdown'
                            }
                        }}
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
        const value = ev.detail.value;

        // Use type assertion to allow additional properties
        fireEvent(this, "value-changed", {
            value,
            propertyName: this.propertyName
        } as {value: unknown});
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
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ha-row-selector": HaRowSelector;
    }
}

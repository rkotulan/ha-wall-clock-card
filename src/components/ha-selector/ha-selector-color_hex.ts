import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";

// Define the ColorHexSelector type
interface ColorHexSelector {
    color_hex: string;
}

@customElement("ha-selector-color_hex")
export class HaColorHexSelector extends LitElement {
    @property({attribute: false}) public hass!: HomeAssistant;

    @property({attribute: false}) public selector!: ColorHexSelector;

    @property() public value?: string;

    @property() public label?: string;

    @property() public helper?: string;

    @property({type: Boolean, reflect: true}) public disabled = false;

    @property({type: Boolean}) public required = true;

    protected render() {
        return html`
            <ha-textfield
                    type="color"
                    .value=${this.value || ""}
                    .label=${this.label}
                    .helper=${this.helper}
                    .disabled=${this.disabled}
                    .required=${this.required}
                    @change=${this._valueChanged}
            ></ha-textfield>
        `;
    }

    private _valueChanged(ev: Event) {
        const value = (ev.target as any).value;

        // Validate hex color format
        if (value && !/^#[0-9a-fA-F]{6}$/.test(value)) {
            return;
        }

        fireEvent(this, "value-changed", {value});
    }

    static styles = css`
        :host {
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }

        ha-textfield {
            --text-field-padding: 8px;
            min-width: 75px;
            flex-grow: 1;
            margin: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ha-selector-color_hex": HaColorHexSelector;
    }
}

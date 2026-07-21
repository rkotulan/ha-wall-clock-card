import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";
import {ColorHexSelector} from "./types";


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
        const value = this.validColor(this.value) ? this.value! : '#ffffff';
        return html`
            <div class="color-control">
                <input
                    class="color-swatch"
                    type="color"
                    .value=${value}
                    .disabled=${this.disabled}
                    aria-label=${this.label || 'Choose color'}
                    @change=${this._valueChanged}
                >
                <input
                    class="hex-input"
                    type="text"
                    .value=${this.value || ""}
                    ?disabled=${this.disabled}
                    aria-label=${this.label || "Hex color"}
                    placeholder="#RRGGBB"
                    @change=${this._valueChanged}
                ></input>
            </div>
        `;
    }

    private validColor(value?: string): boolean {
        return Boolean(value && /^#[0-9a-fA-F]{6}$/.test(value));
    }

    private _valueChanged(ev: Event) {
        const value = (ev.target as any).value;

        // Validate hex color format
        if (value && !this.validColor(value)) {
            return;
        }

        fireEvent(this, "value-changed", {value});
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .color-control {
            display: grid;
            grid-template-columns: 52px minmax(0, 1fr);
            align-items: center;
            gap: 10px;
            width: 100%;
        }

        .color-swatch {
            width: 52px;
            height: 44px;
            padding: 3px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.24));
            border-radius: 7px;
            box-sizing: border-box;
            background: var(--secondary-background-color, #333);
            cursor: pointer;
        }

        .color-swatch::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        .color-swatch::-webkit-color-swatch {
            border: 0;
            border-radius: 4px;
        }

        .color-swatch:disabled {
            cursor: default;
            opacity: 0.5;
        }

        .hex-input {
            width: 100%;
            min-width: 0;
            height: 44px;
            box-sizing: border-box;
            margin: 0;
            padding: 0 10px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.24));
            border-radius: 7px;
            background: var(--secondary-background-color, #333);
            color: var(--primary-text-color, #e1e1e1);
            font-family: inherit;
            font-size: 14px;
        }

        .hex-input::placeholder {
            color: var(--secondary-text-color, rgba(255, 255, 255, 0.5));
        }

        .hex-input:focus {
            outline: none;
            border-color: var(--primary-color, #03a9f4);
        }

        .hex-input:disabled {
            opacity: 0.5;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "ha-selector-color_hex": HaColorHexSelector;
    }
}

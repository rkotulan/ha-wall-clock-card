import {css, html, LitElement} from "lit";
import {customElement, property} from "lit/decorators.js";
import {HomeAssistant, fireEvent} from "custom-card-helpers";
import {LabelPosition, Selector} from "./types";

declare global {
    interface HASSDomEvents {
        "action-click": {};
        "secondary-action-click": {};
        "tertiary-action-click": {};
    }
}

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

    // Add the labelPosition property
    @property({attribute: false}) public labelPosition: LabelPosition = LabelPosition.Left;

    // Properties for the action buttons
    @property({attribute: false}) public actionIcon?: string;
    @property({attribute: false}) public actionTooltip?: string;

    // Properties for secondary action button
    @property({attribute: false}) public secondaryActionIcon?: string;
    @property({attribute: false}) public secondaryActionTooltip?: string;

    // Properties for tertiary action button
    @property({attribute: false}) public tertiaryActionIcon?: string;
    @property({attribute: false}) public tertiaryActionTooltip?: string;

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
                    ${this.secondaryActionIcon ? html`
                        <div class="action-button">
                            <ha-icon-button
                                .path=${this.secondaryActionIcon}
                                .title=${this.secondaryActionTooltip || ''}
                                @click=${this._handleSecondaryActionClick}
                            ></ha-icon-button>
                        </div>
                    ` : ''}
                    ${this.tertiaryActionIcon ? html`
                        <div class="action-button">
                            <ha-icon-button
                                .path=${this.tertiaryActionIcon}
                                .title=${this.tertiaryActionTooltip || ''}
                                @click=${this._handleTertiaryActionClick}
                            ></ha-icon-button>
                        </div>
                    ` : ''}
                    ${this.actionIcon ? html`
                        <div class="action-button">
                            <ha-icon-button
                                .path=${this.actionIcon}
                                .title=${this.actionTooltip || ''}
                                @click=${this._handleActionClick}
                            ></ha-icon-button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    private _handleActionClick(ev: MouseEvent) {
        ev.stopPropagation();
        fireEvent(this, "action-click", {});
    }

    private _handleSecondaryActionClick(ev: MouseEvent) {
        ev.stopPropagation();
        fireEvent(this, "secondary-action-click", {});
    }

    private _handleTertiaryActionClick(ev: MouseEvent) {
        ev.stopPropagation();
        fireEvent(this, "tertiary-action-click", {});
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

import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {MoreInfoActionConfig} from "./types";
import {LabelPosition} from "../../../ha-selector/types";

/**
 * Editor component for more-info actions
 * This component provides the UI for configuring more-info actions
 */
@customElement('more-info-editor-plugin')
export class MoreInfoEditorPlugin extends BasePluginEditor {
    static styles = css`
        .row {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }

        .entity {
            flex: 1;
            margin-right: 8px;
        }

        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `;

    /**
     * Cast the action to MoreInfoActionConfig
     */
    get moreInfoAction(): MoreInfoActionConfig {
        return this.actionConfig as MoreInfoActionConfig;
    }

    render() {
        return html`
            <ha-row-selector
                    .hass=${this.hass}
                    .selector=${{
                        entity: {}
                    }}
                    .value=${this.moreInfoAction.entity_id || ''}
                    .label=${"Entity"}
                    .helper=${"Select an entity to show more info for"}
                    .labelPosition=${LabelPosition.Hidden}
                    @value-changed=${(ev: CustomEvent) => this.handleValueChange('entity_id', ev)}
            ></ha-row-selector>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'more-info-editor-plugin': MoreInfoEditorPlugin;
    }
}
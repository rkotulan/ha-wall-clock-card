import {html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {BasePluginEditor} from '../editors';
import {WeatherUpdateActionConfig} from "./types";

/**
 * Editor component for weather update actions
 * This component provides the UI for configuring weather update actions
 */
@customElement('weather-update-editor-plugin')
export class WeatherUpdateEditorPlugin extends BasePluginEditor {
    static styles = css`
        .helper-text {
            color: #666;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 8px;
        }
    `;

    /**
     * Cast the action to WeatherUpdateActionConfig
     */
    get weatherUpdateAction(): WeatherUpdateActionConfig {
        return this.actionConfig as WeatherUpdateActionConfig;
    }

    render() {
        return html`
            <div class="helper-text">
                This action will trigger an immediate weather update when clicked.
                No additional configuration is needed.
            </div>
        `;
    }
}

// Define the element in the custom elements registry
declare global {
    interface HTMLElementTagNameMap {
        'weather-update-editor-plugin': WeatherUpdateEditorPlugin;
    }
}
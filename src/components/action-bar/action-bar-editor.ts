import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { ActionBarAlignment, ModuleActionConfig, NAVIGATION_ACTION } from '../../components/action-bar';
import { PluginRegistry } from './plugin-registry';
import { LabelPosition } from '../ha-selector/types';

/**
 * Editor component for action bar settings
 */
@customElement('action-bar-editor')
export class ActionBarEditor extends BaseEditorSection {
    @property({ type: Array }) _actions: ModuleActionConfig[] = [];
    
    // Cache for editor components to prevent flickering
    private _editorComponentCache: Map<string, HTMLElement> = new Map();

    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        // Load actions from config when config changes
        if (changedProps.has('config') && this.config) {
            this._loadActions();
        }
    }

    private _loadActions(): void {
        if (!this.config?.actionBar) {
            this._actions = [];
            return;
        }

        if (this.config.actionBar.actions && this.config.actionBar.actions.length > 0) {
            // Load actions from configuration
            this._actions = [...this.config.actionBar.actions];
        } else {
            // No actions configured
            this._actions = [];
        }
    }

    /**
     * Get the list of available action types from the PluginRegistry
     * @returns An array of action type options for the dropdown
     */
    private _getActionTypeOptions(): { value: string, label: string }[] {
        const registry = PluginRegistry.getInstance();
        const plugins = registry.getAllPlugins();

        return plugins.map(plugin => ({
            value: plugin.actionId,
            label: plugin.name
        }));
    }

    /**
     * Get the editor component tag name for an action type
     * @param actionId The unique string identifier for the action type
     * @returns The editor component tag name or null if no editor is available
     */
    private _getEditorTagName(actionId: string): string | null {
        // Use the PluginRegistry to get the plugin metadata
        const registry = PluginRegistry.getInstance();
        const plugin = registry.getPlugin(actionId);

        if (!plugin) {
            return null;
        }

        // Get the editor component tag name directly from the plugin if available
        if (plugin.editorTag) {
            return plugin.editorTag;
        }

        return null;
    }

    /**
     * Create an editor component for an action
     * @param actionConfig The action configuration
     * @param index The index of the action in the actions array
     * @returns The editor component or an empty string if no editor is available
     */
    private _createEditorTagComponent(actionConfig: ModuleActionConfig, index: number) {
        const tagName = this._getEditorTagName(actionConfig.actionId);

        if (!tagName) {
            return '';
        }

        // Create a cache key based on the action ID and index
        const cacheKey = `${actionConfig.actionId}-${index}`;

        // Check if we already have a cached component
        if (this._editorComponentCache.has(cacheKey)) {
            const cachedComponent = this._editorComponentCache.get(cacheKey);

            // Update the properties in case they've changed
            if (this.hass) {
                (cachedComponent as any).hass = this.hass;
            }
            (cachedComponent as any).actionConfig = actionConfig;

            return cachedComponent;
        }

        // Create the component dynamically using document.createElement
        try {
            // Create the element
            const editorComponent = document.createElement(tagName);

            // Set the properties
            if (this.hass) {
                (editorComponent as any).hass = this.hass;
            }
            (editorComponent as any).actionConfig = actionConfig;
            (editorComponent as any).index = index;
            (editorComponent as any).actionChanged = this._actionChanged.bind(this);

            // Store in cache
            this._editorComponentCache.set(cacheKey, editorComponent);

            // Return the component
            return editorComponent;
        } catch (error) {
            console.error(`Error creating editor component ${tagName}:`, error);
            return '';
        }
    }

    private _addAction(): void {
        // Get the list of available action types
        const actionTypes = this._getActionTypeOptions();

        // Default to the first available action type, or Navigate if none are available
        const defaultType = actionTypes.length > 0 ? actionTypes[0].value : NAVIGATION_ACTION;

        // Create a new action with default values based on the type
        let newAction: ModuleActionConfig;

        // Get the navigation plugin from the registry
        const plugin = PluginRegistry.getInstance().getPlugin(defaultType);
        if (plugin && plugin.defaultActionConfig) {
            // Use the plugin to create the default navigation action
            newAction = plugin.defaultActionConfig();
        } else {
            // Default fallback
            newAction = {
                actionId: defaultType,
                title: 'Action',
                icon: 'mdi:flash'
            };
        }

        // Clear the entire cache since adding an action changes indices
        this._editorComponentCache.clear();

        this._actions = [...this._actions, newAction];

        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure actionBar config exists
            if (!newConfig.actionBar) {
                newConfig.actionBar = {
                    enabled: true,
                    actions: [],
                    backgroundOpacity: 0.3 // Default background opacity
                };
            }

            // Ensure actions array exists
            if (!newConfig.actionBar.actions) {
                newConfig.actionBar.actions = [];
            }

            // Update actions
            newConfig.actionBar.actions = [...this._actions];

            // Enable action bar
            newConfig.actionBar.enabled = true;

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    /**
     * Move an action up in the list (swap with the previous action)
     * @param index The index of the action to move up
     */
    private _moveActionUp(index: number): void {
        // Can't move the first item up
        if (index <= 0 || index >= this._actions.length) {
            return;
        }

        // Clear the entire cache since changing indices affects the cache
        this._editorComponentCache.clear();

        // Swap the action with the one above it
        const newActions = [...this._actions];
        const temp = newActions[index];
        newActions[index] = newActions[index - 1];
        newActions[index - 1] = temp;
        this._actions = newActions;

        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure actionBar config exists
            if (!newConfig.actionBar) {
                newConfig.actionBar = {
                    enabled: true,
                    actions: [],
                    backgroundOpacity: 0.3
                };
            }

            // Ensure actions array exists
            if (!newConfig.actionBar.actions) {
                newConfig.actionBar.actions = [];
            }

            // Update actions
            newConfig.actionBar.actions = [...this._actions];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    /**
     * Move an action down in the list (swap with the next action)
     * @param index The index of the action to move down
     */
    private _moveActionDown(index: number): void {
        // Can't move the last item down
        if (index < 0 || index >= this._actions.length - 1) {
            return;
        }

        // Clear the entire cache since changing indices affects the cache
        this._editorComponentCache.clear();

        // Swap the action with the one below it
        const newActions = [...this._actions];
        const temp = newActions[index];
        newActions[index] = newActions[index + 1];
        newActions[index + 1] = temp;
        this._actions = newActions;

        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure actionBar config exists
            if (!newConfig.actionBar) {
                newConfig.actionBar = {
                    enabled: true,
                    actions: [],
                    backgroundOpacity: 0.3
                };
            }

            // Ensure actions array exists
            if (!newConfig.actionBar.actions) {
                newConfig.actionBar.actions = [];
            }

            // Update actions
            newConfig.actionBar.actions = [...this._actions];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _removeAction(index: number): void {
        // Clear the entire cache since removing an action changes indices
        this._editorComponentCache.clear();

        this._actions = this._actions.filter((_, i) => i !== index);
        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure actionBar config exists
            if (!newConfig.actionBar) {
                newConfig.actionBar = {
                    enabled: true,
                    actions: [],
                    backgroundOpacity: 0.3 // Default background opacity
                };
            }

            // Ensure actions array exists
            if (!newConfig.actionBar.actions) {
                newConfig.actionBar.actions = [];
            }

            // Update actions
            newConfig.actionBar.actions = [...this._actions];

            // If no actions left, disable action bar
            if (this._actions.length === 0) {
                if (newConfig.actionBar) {
                    newConfig.actionBar.enabled = false;
                }
                newConfig.actionBar = undefined;
            }

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    private _actionChanged(index: number, property: string, value: any): void {
        // If the action type (actionId) is changing, clear the cache entry for this action
        if (property === 'actionId') {
            // Create a cache key based on the old action ID and index
            const oldAction = this._actions[index];
            if (oldAction) {
                const oldCacheKey = `${oldAction.actionId}-${index}`;
                // Remove the old component from cache
                this._editorComponentCache.delete(oldCacheKey);
            }
        }

        this._actions = this._actions.map((action, i) => {
            if (i === index) {
                return {...action, [property]: value};
            }
            return action;
        });

        // Update the config with a deep copy
        if (this.config) {
            // Create a deep copy of the config
            const newConfig = JSON.parse(JSON.stringify(this.config));

            // Ensure actionBar config exists
            if (!newConfig.actionBar) {
                newConfig.actionBar = {
                    enabled: true,
                    actions: [],
                    backgroundOpacity: 0.3 // Default background opacity
                };
            }

            // Ensure actions array exists
            if (!newConfig.actionBar.actions) {
                newConfig.actionBar.actions = [];
            }

            // Update actions
            newConfig.actionBar.actions = [...this._actions];

            // Fire the config-changed event with the new config
            this.dispatchEvent(new CustomEvent('config-changed', {
                detail: { config: newConfig }
            }));
        }
    }

    static get styles() {
        return css`
            .content {
                padding: 12px;
            }
            
            .info-text {
                font-size: 14px;
                color: var(--secondary-text-color, #727272);
                margin: 5px 0 15px 0;
            }
            
            .action-item {
                border: 1px solid var(--divider-color, #e0e0e0);
                border-radius: 4px;
                padding: 10px;
                margin-bottom: 15px;
            }
            
            .action-row {
                display: flex;
                margin-bottom: 8px;
                align-items: center;
            }
            
            .action-field {
                flex: 2;
                margin-right: 8px;
            }
            
            .action-buttons {
                flex: 0 0 40px;
                text-align: center;
            }
        `;
    }

    render() {
        if (!this.hass || !this.config) {
            return html``;
        }

        return html`
            <div class="content">
                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean: {}}}
                        .value=${this.config.actionBar?.enabled === true}
                        .label= ${"Enable Action Bar"}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.actionBar?.enabled === true ? html`
                    <div class="info-text">
                        Configure action buttons that will appear at the bottom of the card.
                        Action bar and transportation cannot be displayed simultaneously - action bar takes
                        precedence.
                    </div>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                select: {
                                    options: [
                                        {value: ActionBarAlignment.Left, label: 'Left'},
                                        {value: ActionBarAlignment.Center, label: 'Center'},
                                        {value: ActionBarAlignment.Right, label: 'Right'}
                                    ],
                                    mode: 'dropdown'
                                }
                            }}
                            .value=${this.config.actionBar?.alignment || ActionBarAlignment.Center}
                            .label= ${"Button Alignment"}
                            .helper= ${"Align buttons to the left, center, or right"}
                            .labelPosition=${LabelPosition.Top}
                            propertyName="actionBar.alignment"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <ha-row-selector
                            .hass=${this.hass}
                            .selector=${{
                                number: {
                                    min: 0,
                                    max: 1,
                                    step: 0.05,
                                    mode: 'slider'
                                }
                            }}
                            .value=${this.config.actionBar?.backgroundOpacity !== undefined ? this.config.actionBar.backgroundOpacity : 0.3}
                            .label= ${"Background Opacity"}
                            .helper= ${"Adjust the transparency of the action bar background (0 = fully transparent, 1 = fully opaque)"}
                            .labelPosition=${LabelPosition.Top}
                            propertyName="actionBar.backgroundOpacity"
                            @value-changed=${this._handleFormValueChanged}
                    ></ha-row-selector>

                    <div class="section-subheader">Actions</div>

                    ${this._actions.map((action, index) => html`
                        ${index > 0 ? html`<hr style="width: 100%; border: none; border-top: 1px solid var(--divider-color, rgba(0,0,0,0.8)); margin: 8px 0 16px 0;">` : ''}

                        <ha-row-selector
                                style="flex: 2;"
                                .hass=${this.hass}
                                .selector=${{
                                    select: {
                                        options: this._getActionTypeOptions(),
                                        mode: 'dropdown'
                                    }
                                }}
                                .value=${action.actionId}
                                .label= ${"Action Type"}
                                .labelPosition=${LabelPosition.Hidden}
                                .helper= ${"Select Action type"}
                                .actionButtons=${[
                                    {
                                        icon: 'M19,13H5V11H19V13Z',
                                        tooltip: "Remove action",
                                        eventName: "action-click"
                                    },
                                    ...(index > 0 ? [{
                                        icon: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
                                        tooltip: "Move action up",
                                        eventName: "action-click-0"
                                    }] : []),
                                    ...(index < this._actions.length - 1 ? [{
                                        icon: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
                                        tooltip: "Move action down",
                                        eventName: "action-click-1"
                                    }] : [])
                                ]}
                                @value-changed=${(ev: CustomEvent) => {
                                    this._actionChanged(index, 'actionId', ev.detail.value);
                                }}
                                @action-click=${() => this._removeAction(index)}
                                @action-click-0=${index > 0 ? () => this._moveActionUp(index) : null}
                                @action-click-1=${index < this._actions.length - 1 ? () => this._moveActionDown(index) : null}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    text: {
                                        type: "text"
                                    }
                                }}
                                .value=${action.title || ''}
                                .label=${"Title"}
                                .helper= ${"Title for the action button"}
                                .labelPosition=${LabelPosition.Hidden}
                                @value-changed=${(ev: CustomEvent) => {
                                    ev.stopPropagation();
                                    ev.preventDefault();
                                    const value = ev.detail.value;
                                    this._actionChanged(index, 'title', value || '');
                                }}
                        ></ha-row-selector>

                        <ha-row-selector
                                .hass=${this.hass}
                                .selector=${{
                                    icon: {
                                        placeholder: "mdi:clock"
                                    }
                                }}
                                .value=${action.icon || ''}
                                .label=${"Icon"}
                                .helper= ${"Icon for the action button"}
                                .labelPosition=${LabelPosition.Hidden}
                                @value-changed=${(ev: CustomEvent) => {
                                    ev.stopPropagation();
                                    ev.preventDefault();
                                    const value = ev.detail.value;
                                    this._actionChanged(index, 'icon', value || '');
                                }}
                        ></ha-row-selector>

                        <!-- Editor components are now dynamically created by the factory pattern -->
                        ${this._createEditorTagComponent(action, index)}
                    `)}

                    <mwc-button @click=${this._addAction}>Add Action</mwc-button>
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'action-bar-editor': ActionBarEditor;
    }
}
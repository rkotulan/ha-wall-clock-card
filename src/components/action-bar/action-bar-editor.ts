import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseEditorSection } from '../../editors/editor-base/base-editor-section';
import { ModuleActionConfig, NAVIGATION_ACTION } from '../../components/action-bar';
import { PluginRegistry } from './plugin-registry';
import { LabelPosition } from '../ha-selector/types';

/**
 * Editor component for action bar settings
 */
@customElement('action-bar-editor')
export class ActionBarEditor extends BaseEditorSection {
    @property({ type: Array }) _actions: ModuleActionConfig[] = [];
    @state() private _expandedActionIndex: number | null = 0;
    
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
            this._expandedActionIndex = null;
            return;
        }

        if (this.config.actionBar.actions && this.config.actionBar.actions.length > 0) {
            // Load actions from configuration
            this._actions = [...this.config.actionBar.actions];
        } else {
            // No actions configured
            this._actions = [];
        }
        if (this._actions.length === 0) {
            this._expandedActionIndex = null;
        } else if (this._expandedActionIndex !== null) {
            this._expandedActionIndex = Math.min(this._expandedActionIndex, this._actions.length - 1);
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
            label: this.t(`editor.actions.types.${plugin.actionId.replace(/-/g, '_')}`, plugin.name)
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

        this._expandedActionIndex = this._actions.length;
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
        if (this._expandedActionIndex === index) {
            this._expandedActionIndex = index - 1;
        } else if (this._expandedActionIndex === index - 1) {
            this._expandedActionIndex = index;
        }

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
        if (this._expandedActionIndex === index) {
            this._expandedActionIndex = index + 1;
        } else if (this._expandedActionIndex === index + 1) {
            this._expandedActionIndex = index;
        }

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
        if (this._actions.length === 0) {
            this._expandedActionIndex = null;
        } else if (this._expandedActionIndex === index) {
            this._expandedActionIndex = Math.min(index, this._actions.length - 1);
        } else if (this._expandedActionIndex !== null && this._expandedActionIndex > index) {
            this._expandedActionIndex -= 1;
        }
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

    private _toggleAction(index: number): void {
        this._expandedActionIndex = this._expandedActionIndex === index ? null : index;
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
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
                border-radius: 8px;
                padding: 10px;
                margin: 10px 0;
                background: var(--secondary-background-color, rgba(255, 255, 255, 0.035));
            }

            .action-item.collapsed .action-header { margin-bottom: 0; }

            .action-header {
                display: flex;
                align-items: center;
                min-height: 36px;
                margin-bottom: 4px;
            }

            .action-toggle {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex: 1;
                min-width: 0;
                min-height: 32px;
                padding: 0 4px;
                border: 0;
                background: transparent;
                color: var(--primary-text-color, #fff);
                font: inherit;
                text-align: left;
                cursor: pointer;
            }

            .action-item-title {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
            }

            .action-icon-button {
                display: grid;
                place-items: center;
                flex: 0 0 32px;
                width: 32px;
                height: 32px;
                padding: 0;
                border: 0;
                border-radius: 6px;
                background: transparent;
                color: var(--secondary-text-color, #aaa);
                cursor: pointer;
            }

            .action-icon-button ha-icon { --mdc-icon-size: 18px; }

            .action-icon-button:hover,
            .action-icon-button:focus-visible {
                background: rgba(255, 255, 255, 0.08);
                color: var(--primary-text-color, #fff);
                outline: none;
            }

            .action-icon-button.remove:hover { color: var(--error-color, #db4437); }

            .action-body {
                padding-top: 4px;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
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

            .empty-actions {
                margin: 8px 0;
                padding: 12px;
                border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
                border-radius: 8px;
                color: var(--secondary-text-color, #aaa);
                font-size: 0.85rem;
                text-align: center;
            }

            .add-action {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                width: 100%;
                min-height: 42px;
                margin-top: 10px;
                border: 1px solid var(--primary-color, #03a9f4);
                border-radius: 8px;
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 18%, transparent);
                color: var(--primary-color, #03a9f4);
                font: inherit;
                font-weight: 600;
                cursor: pointer;
            }

            .add-action:hover,
            .add-action:focus-visible {
                background: color-mix(in srgb, var(--primary-color, #03a9f4) 28%, transparent);
                outline: none;
            }

            .add-action ha-icon {
                --mdc-icon-size: 19px;
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
                        .label=${this.t('editor.actions.enable', 'Enable action bar')}
                        propertyName="actionBar.enabled"
                        @value-changed=${this._handleFormValueChanged}
                ></ha-row-selector>

                ${this.config.actionBar?.enabled === true ? html`
                    <div class="info-text">
                        ${this.t('editor.actions.description', 'Configure action buttons displayed in this widget.')}
                    </div>

                    <div class="section-subheader">${this.t('editor.actions.title', 'Actions')}</div>

                    ${this._actions.length === 0 ? html`
                        <div class="empty-actions">${this.t('editor.actions.empty', 'No actions configured yet.')}</div>
                    ` : ''}
                    ${this._actions.map((action, index) => {
                        const expanded = this._expandedActionIndex === index;
                        const actionPlugin = PluginRegistry.getInstance().getPlugin(action.actionId);
                        const pluginName = actionPlugin
                            ? this.t(`editor.actions.types.${action.actionId.replace(/-/g, '_')}`, actionPlugin.name)
                            : undefined;
                        const title = action.title || pluginName || this.t('editor.actions.action', 'Action {number}', {number: index + 1});
                        return html`
                        <div class="action-item ${expanded ? '' : 'collapsed'}">
                        <div class="action-header">
                            <button class="action-toggle" type="button"
                                    aria-expanded=${expanded}
                                    @click=${() => this._toggleAction(index)}>
                                <span class="action-item-title">${title}</span>
                            </button>
                            <button class="action-icon-button remove" type="button"
                                    title=${this.t('editor.actions.remove', 'Remove action')}
                                    aria-label=${this.t('editor.actions.remove', 'Remove action')}
                                    @click=${() => this._removeAction(index)}>
                                <ha-icon icon="mdi:delete-outline"></ha-icon>
                            </button>
                            <button class="action-icon-button" type="button"
                                    title=${expanded ? this.t('editor.actions.collapse', 'Collapse action') : this.t('editor.actions.expand', 'Expand action')}
                                    aria-label=${expanded ? this.t('editor.actions.collapse', 'Collapse action') : this.t('editor.actions.expand', 'Expand action')}
                                    @click=${() => this._toggleAction(index)}>
                                <ha-icon icon=${expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
                            </button>
                        </div>
                        ${expanded ? html`<div class="action-body">
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
                                .label=${this.t('editor.actions.type', 'Action type')}
                                .labelPosition=${LabelPosition.Hidden}
                                .helper=${this.t('editor.actions.select_type', 'Select action type')}
                                .actionButtons=${[
                                    ...(index > 0 ? [{
                                        icon: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z',
                                        tooltip: this.t('editor.actions.move_up', 'Move action up'),
                                        eventName: "action-click-0"
                                    }] : []),
                                    ...(index < this._actions.length - 1 ? [{
                                        icon: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z',
                                        tooltip: this.t('editor.actions.move_down', 'Move action down'),
                                        eventName: "action-click-1"
                                    }] : [])
                                ]}
                                @value-changed=${(ev: CustomEvent) => {
                                    this._actionChanged(index, 'actionId', ev.detail.value);
                                }}
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
                                .label=${this.t('editor.actions.button_title', 'Title')}
                                .helper=${this.t('editor.actions.title_help', 'Title for the action button')}
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
                                .label=${this.t('editor.actions.icon', 'Icon')}
                                .helper=${this.t('editor.actions.icon_help', 'Icon for the action button')}
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
                        </div>` : ''}
                        </div>
                    `;})}

                    <button class="add-action" type="button" @click=${this._addAction}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${this.t('editor.actions.add', 'Add action')}
                    </button>
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

import {css, html, nothing, PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {fireEvent, LovelaceCardConfig} from 'custom-card-helpers';
import {BaseEditorSection} from '../../editors/editor-base/base-editor-section';
import {LabelPosition} from '../ha-selector/types';
import {containsWallClockCard, createCardStub} from '../../widgets/ha-card-config';
import type {HaCardWidgetConfig} from '../../widgets/ha-card-widget';

interface NativeCardEditor extends HTMLElement {
    hass?: unknown;
    lovelace?: {views: unknown[]};
    value?: LovelaceCardConfig;
    inDialog?: boolean;
}

interface NativeCardPicker extends HTMLElement {
    hass?: unknown;
    lovelace?: {views: unknown[]};
}

interface DirectCardEditor extends HTMLElement {
    hass?: unknown;
    lovelace?: {views: unknown[]};
    setConfig(config: LovelaceCardConfig): void;
}

interface CardHelpers {
    createCardElement(config: LovelaceCardConfig): HTMLElement | Promise<HTMLElement>;
}

type CardHelpersWindow = Window & {
    loadCardHelpers?: () => Promise<CardHelpers>;
};

type CardElementConstructor = CustomElementConstructor & {
    getConfigElement?: () => DirectCardEditor | Promise<DirectCardEditor>;
};

interface CustomCardEntry {
    type?: string;
    name?: string;
}

const CORE_CARD_TYPES = [
    'alarm-panel', 'area', 'button', 'calendar', 'conditional', 'entities', 'entity',
    'entity-filter', 'gauge', 'glance', 'grid', 'history-graph', 'horizontal-stack',
    'humidifier', 'iframe', 'light', 'logbook', 'map', 'markdown', 'media-control',
    'picture', 'picture-elements', 'picture-entity', 'picture-glance', 'plant-status',
    'sensor', 'shopping-list', 'statistic', 'statistics-graph', 'thermostat', 'tile',
    'todo-list', 'vertical-stack', 'weather-forecast',
] as const;

@customElement('ha-card-widget-editor')
export class HaCardEditor extends BaseEditorSection {
    @state() private choosing = false;
    @state() private validationError?: string;
    @state() private jsonValue = '';
    @state() private editorOpen = false;
    @state() private draftCard?: LovelaceCardConfig;
    @state() private directEditor?: DirectCardEditor;
    @state() private directEditorLoading = false;
    @state() private directEditorUnavailable = false;

    private readonly lovelace = {views: []};
    private directEditorType?: string;
    private directEditorSignature?: string;
    private directEditorRevision = 0;

    static styles = css`
        :host { display: block; }

        .content {
            display: flex;
            flex-direction: column;
            gap: 14px;
            padding: 12px;
        }

        .hint {
            margin: 0;
            color: var(--secondary-text-color, #aaa);
            font-size: 0.82rem;
            line-height: 1.45;
        }

        .error {
            padding: 10px 12px;
            border: 1px solid var(--error-color, #db4437);
            border-radius: 8px;
            color: var(--error-color, #db4437);
            font-size: 0.82rem;
        }

        .native-editor,
        .native-picker {
            display: block;
            min-width: 0;
            padding-top: 4px;
            border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
        }

        .native-picker {
            min-height: 360px;
            max-height: min(65vh, 720px);
            overflow: auto;
        }

        ha-dialog {
            --dialog-z-index: 7;
            --dialog-content-padding: 8px;
        }

        .dialog-content {
            width: min(920px, calc(100vw - 56px));
            max-width: 100%;
            max-height: calc(100vh - 190px);
            overflow: auto;
            padding: 4px 10px 12px;
            box-sizing: border-box;
        }

        .dialog-content .native-editor {
            padding-top: 0;
            border-top: 0;
        }

        @media (max-width: 600px) {
            .dialog-content {
                width: calc(100vw - 24px);
                padding-inline: 2px;
            }
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-height: 42px;
            width: 100%;
            padding: 0 12px;
            border: 1px solid var(--primary-color, #03a9f4);
            border-radius: 8px;
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent);
            color: var(--primary-color, #03a9f4);
            font: inherit;
            font-size: 0.84rem;
            font-weight: 650;
            cursor: pointer;
        }

        button:hover,
        button:focus-visible {
            background: color-mix(in srgb, var(--primary-color, #03a9f4) 27%, transparent);
            outline: none;
        }

        button ha-icon { --mdc-icon-size: 18px; }

        .json-field {
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .json-field label {
            color: var(--primary-text-color, #fff);
            font-size: 0.82rem;
            font-weight: 600;
        }

        textarea {
            min-height: 220px;
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.22));
            border-radius: 8px;
            outline: none;
            box-sizing: border-box;
            resize: vertical;
            background: var(--code-editor-background-color, var(--secondary-background-color, #222));
            color: var(--primary-text-color, #fff);
            font: 0.8rem/1.5 var(--code-font-family, ui-monospace, SFMono-Regular, Consolas, monospace);
        }

        textarea:focus {
            border-color: var(--primary-color, #03a9f4);
        }
    `;

    updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('config')) {
            const serialized = this.widgetConfig.card ? JSON.stringify(this.widgetConfig.card, null, 2) : '';
            if (this.jsonValue !== serialized) this.jsonValue = serialized;
        }
        if (this.editorOpen && (changed.has('draftCard') || changed.has('editorOpen'))) {
            const card = this.draftCard;
            if (card?.type?.startsWith('custom:')) void this.ensureDirectEditor(card);
            else this.clearDirectEditor();
        }
        if (changed.has('config') || changed.has('hass') || changed.has('choosing') ||
            changed.has('editorOpen') || changed.has('draftCard')) {
            this.syncNativeElements();
        }
    }

    private get widgetConfig(): HaCardWidgetConfig {
        return this.config as unknown as HaCardWidgetConfig;
    }

    private get editorDirty(): boolean {
        return JSON.stringify(this.draftCard) !== JSON.stringify(this.widgetConfig.card);
    }

    private get cardTypeOptions(): Array<{value: string; label: string}> {
        const core = CORE_CARD_TYPES.map(type => ({
            value: type,
            label: this.hass.localize(`ui.panel.lovelace.editor.card.${type}.name`) || this.humanize(type),
        }));
        const customEntries = ((window.customCards ?? []) as CustomCardEntry[])
            .filter(entry => entry.type && !['wall-clock-card', 'custom:wall-clock-card'].includes(entry.type))
            .map(entry => ({
                value: entry.type!.startsWith('custom:') ? entry.type! : `custom:${entry.type}`,
                label: entry.name || this.humanize(entry.type!),
            }));
        return [...core, ...customEntries]
            .filter((option, index, options) => options.findIndex(item => item.value === option.value) === index)
            .sort((a, b) => a.label.localeCompare(b.label, this.hass.language));
    }

    private humanize(value: string): string {
        return value.replace(/^custom:/, '').replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }

    private emit(config: HaCardWidgetConfig): void {
        fireEvent(this, 'config-changed', {config});
    }

    private updateCard(card: LovelaceCardConfig): void {
        if (containsWallClockCard(card)) {
            this.validationError = this.t(
                'editor.ha_card.recursion_error',
                'wall-clock-card cannot be embedded inside itself.',
            );
            return;
        }
        this.validationError = undefined;
        this.choosing = false;
        this.emit({...this.widgetConfig, card: {...card}});
    }

    private changeType(type: string): void {
        const normalized = type?.trim();
        if (!normalized || normalized === this.widgetConfig.card?.type) return;
        this.updateCard(createCardStub(normalized));
    }

    private updateTransparent(transparent: boolean): void {
        const config = {...this.widgetConfig};
        if (transparent) config.transparent = true;
        else delete config.transparent;
        this.emit(config);
    }

    private onPickerConfigChanged(event: CustomEvent): void {
        event.stopPropagation();
        if (event.detail?.error || !event.detail?.config) return;
        const next = event.detail.config as LovelaceCardConfig;
        if (JSON.stringify(next) === JSON.stringify(this.widgetConfig.card)) return;
        this.updateCard(next);
    }

    private onDialogConfigChanged(event: CustomEvent): void {
        event.stopPropagation();
        if (!event.detail?.config) return;
        if (event.detail.error) {
            this.validationError = String(event.detail.error);
            return;
        }
        this.setDraftCard(event.detail.config as LovelaceCardConfig);
    }

    private readonly onDirectConfigChanged = (event: Event): void => {
        event.stopPropagation();
        const detail = (event as CustomEvent).detail;
        if (detail?.error || !detail?.config) return;
        const next = detail.config as LovelaceCardConfig;
        if (JSON.stringify(next) === JSON.stringify(this.draftCard)) return;

        // The custom editor already owns this state. Remember the emitted value so the
        // dialog's following update does not feed it straight back and reset
        // transient UI state such as expanded accordions or active tabs.
        this.directEditorSignature = JSON.stringify(next);
        this.setDraftCard(next);
    };

    private setDraftCard(card: LovelaceCardConfig): void {
        if (containsWallClockCard(card)) {
            this.validationError = this.t(
                'editor.ha_card.recursion_error',
                'wall-clock-card cannot be embedded inside itself.',
            );
            return;
        }
        this.validationError = undefined;
        this.draftCard = {...card};
    }

    private openEditor(): void {
        if (!this.widgetConfig.card) return;
        this.validationError = undefined;
        this.draftCard = JSON.parse(JSON.stringify(this.widgetConfig.card)) as LovelaceCardConfig;
        this.jsonValue = JSON.stringify(this.draftCard, null, 2);
        this.editorOpen = true;
    }

    private closeEditor(): void {
        this.editorOpen = false;
    }

    private dialogClosed(): void {
        this.clearDirectEditor();
        this.draftCard = undefined;
        this.validationError = undefined;
    }

    private saveEditor(): void {
        if (!this.draftCard || this.validationError || !this.editorDirty) return;
        this.updateCard(this.draftCard);
        this.editorOpen = false;
    }

    private onJsonChanged(event: Event): void {
        this.jsonValue = (event.target as HTMLTextAreaElement).value;
        try {
            const parsed = JSON.parse(this.jsonValue) as LovelaceCardConfig;
            if (!parsed || typeof parsed !== 'object' || typeof parsed.type !== 'string' || !parsed.type.trim()) {
                this.validationError = this.t('editor.ha_card.json_type_error', 'The card configuration must contain a type.');
                return;
            }
            if (JSON.stringify(parsed) === JSON.stringify(this.draftCard)) {
                this.validationError = undefined;
                return;
            }
            this.setDraftCard(parsed);
        } catch {
            this.validationError = this.t('editor.ha_card.json_error', 'The card configuration is not valid JSON.');
        }
    }

    private syncNativeElements(): void {
        const editor = this.renderRoot.querySelector<NativeCardEditor>('hui-card-element-editor');
        if (editor) {
            editor.hass = this.hass;
            editor.lovelace = this.lovelace;
            editor.inDialog = true;
            editor.value = this.draftCard;
        }
        const picker = this.renderRoot.querySelector<NativeCardPicker>('hui-card-picker');
        if (picker) {
            picker.hass = this.hass;
            picker.lovelace = this.lovelace;
        }
    }

    private clearDirectEditor(): void {
        if (!this.directEditor && !this.directEditorLoading && !this.directEditorType) return;
        this.directEditorRevision++;
        this.directEditor?.removeEventListener('config-changed', this.onDirectConfigChanged);
        this.directEditor = undefined;
        this.directEditorLoading = false;
        this.directEditorUnavailable = false;
        this.directEditorType = undefined;
        this.directEditorSignature = undefined;
    }

    private async ensureDirectEditor(card: LovelaceCardConfig): Promise<void> {
        const type = card.type;
        const signature = JSON.stringify(card);

        if (this.directEditor && this.directEditorType === type) {
            if (this.directEditorSignature !== signature) {
                this.directEditor.setConfig(card);
                this.directEditorSignature = signature;
            }
            return;
        }
        if (this.directEditorLoading && this.directEditorType === type) return;

        this.clearDirectEditor();
        const revision = ++this.directEditorRevision;
        this.directEditorType = type;
        this.directEditorLoading = true;

        try {
            const loadCardHelpers = (window as CardHelpersWindow).loadCardHelpers;
            if (!loadCardHelpers) throw new Error('Home Assistant card helpers are unavailable.');

            const helpers = await loadCardHelpers();
            const cardElement = await Promise.resolve(helpers.createCardElement(card));
            await customElements.whenDefined(cardElement.localName);
            const constructor = customElements.get(cardElement.localName) as CardElementConstructor | undefined;
            if (!constructor?.getConfigElement) throw new Error(`No visual editor is available for ${type}.`);

            const editor = await Promise.resolve(constructor.getConfigElement());
            if (revision !== this.directEditorRevision || !this.editorOpen || this.draftCard?.type !== type) return;

            const currentCard = this.draftCard;
            if (!currentCard) return;
            editor.hass = this.hass;
            editor.lovelace = this.lovelace;
            editor.setConfig(currentCard);
            editor.addEventListener('config-changed', this.onDirectConfigChanged);
            this.directEditorSignature = JSON.stringify(currentCard);
            this.directEditor = editor;
            this.directEditorUnavailable = false;
        } catch {
            if (revision !== this.directEditorRevision) return;
            this.directEditorUnavailable = true;
        } finally {
            if (revision === this.directEditorRevision) this.directEditorLoading = false;
        }
    }

    private renderEditorDialog(editorAvailable: boolean) {
        const card = this.draftCard;
        if (!card) return nothing;
        const customCard = card.type?.startsWith('custom:') === true;
        const cancel = this.hass.localize('ui.common.cancel') || 'Cancel';
        const save = this.hass.localize('ui.common.save') || 'Save';

        return html`
            <ha-dialog
                    .open=${this.editorOpen}
                    @closed=${this.dialogClosed}
                    @keydown=${(event: KeyboardEvent) => event.stopPropagation()}>
                <span slot="headerTitle">${this.t(
                    'editor.ha_card.dialog_title',
                    'Edit Home Assistant card',
                )}</span>

                <div class="dialog-content">
                    ${this.validationError ? html`<div class="error">${this.validationError}</div>` : nothing}

                    ${customCard && this.directEditor ? html`
                        <div class="native-editor direct-editor">${this.directEditor}</div>
                    ` : customCard && !this.directEditorUnavailable ? html`
                        <p class="hint">${this.t('editor.ha_card.loading', 'Loading Home Assistant card…')}</p>
                    ` : editorAvailable ? html`
                        <hui-card-element-editor
                                class="native-editor"
                                @config-changed=${this.onDialogConfigChanged}>
                        </hui-card-element-editor>
                    ` : html`
                        <p class="hint">${this.t(
                            'editor.ha_card.native_editor_unavailable',
                            'The native Home Assistant card editor is unavailable in this view. Edit the complete card configuration below.',
                        )}</p>
                        <div class="json-field">
                            <label for="card-json">${this.t('editor.ha_card.json_config', 'Card configuration (JSON)')}</label>
                            <textarea id="card-json"
                                      .value=${this.jsonValue}
                                      spellcheck="false"
                                      @input=${this.onJsonChanged}></textarea>
                        </div>
                    `}
                </div>

                <ha-dialog-footer slot="footer">
                    <ha-button slot="secondaryAction" appearance="plain" @click=${this.closeEditor}>
                        ${cancel}
                    </ha-button>
                    <ha-button slot="primaryAction" ?disabled=${!!this.validationError || !this.editorDirty} @click=${this.saveEditor}>
                        ${save}
                    </ha-button>
                </ha-dialog-footer>
            </ha-dialog>
        `;
    }

    render() {
        if (!this.hass || !this.config) return nothing;
        const card = this.widgetConfig.card;
        const pickerAvailable = !!customElements.get('hui-card-picker');
        const editorAvailable = !!customElements.get('hui-card-element-editor');

        return html`
            <div class="content">
                <p class="hint">${this.t(
                    'editor.ha_card.description',
                    'Embed a built-in or installed custom Home Assistant dashboard card.',
                )}</p>

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{select: {
                            options: this.cardTypeOptions,
                            custom_value: true,
                            mode: 'dropdown',
                        }}}
                        .value=${card?.type ?? ''}
                        .label=${this.t('editor.ha_card.card_type', 'Card type')}
                        .helper=${this.t('editor.ha_card.card_type_help', 'Choose a card or enter its type, for example custom:mushroom-template-card.')}
                        .labelPosition=${LabelPosition.Top}
                        @value-changed=${(event: CustomEvent) => this.changeType(event.detail.value)}>
                </ha-row-selector>

                ${pickerAvailable ? html`
                    <button type="button" @click=${() => this.choosing = !this.choosing}>
                        <ha-icon .icon=${this.choosing ? 'mdi:close' : 'mdi:view-dashboard-edit-outline'}></ha-icon>
                        ${this.choosing
                            ? this.t('ui.close', 'Close')
                            : this.t(card ? 'editor.ha_card.change_card' : 'editor.ha_card.choose_card', card ? 'Choose another card' : 'Choose card')}
                    </button>
                ` : nothing}

                ${this.validationError && !this.editorOpen ? html`<div class="error">${this.validationError}</div>` : nothing}

                ${this.choosing && pickerAvailable ? html`
                    <hui-card-picker
                            class="native-picker"
                            @config-changed=${this.onPickerConfigChanged}>
                    </hui-card-picker>
                ` : nothing}

                ${card && !this.choosing ? html`
                    <button type="button" @click=${this.openEditor}>
                        <ha-icon icon="mdi:pencil-box-outline"></ha-icon>
                        ${this.t('editor.ha_card.edit_card', 'Edit card in Home Assistant editor')}
                    </button>
                ` : nothing}

                <ha-row-selector
                        .hass=${this.hass}
                        .selector=${{boolean: {}}}
                        .value=${this.widgetConfig.transparent === true}
                        .label=${this.t('editor.ha_card.transparent', 'Transparent card background')}
                        .helper=${this.t('editor.ha_card.transparent_help', 'Removes the standard HA card surface where the embedded card supports theme variables.')}
                        .labelPosition=${LabelPosition.Top}
                        @value-changed=${(event: CustomEvent) => this.updateTransparent(event.detail.value)}>
                </ha-row-selector>
            </div>

            ${this.renderEditorDialog(editorAvailable)}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'ha-card-widget-editor': HaCardEditor;
    }
}

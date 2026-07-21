import {css, CSSResult, html, LitElement, PropertyValues, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {HomeAssistant} from 'custom-card-helpers';
import {defaultZoneAlignment, LayoutConfig, WallClockConfigV3, WidgetConfig, WidgetStyle, ZoneId} from '../core/layout-types';
import {Size} from '../core/types';
import {WidgetRegistry} from '../widgets/widget-registry';
import {applyGeneralSetting, findWidgetById} from './layout-editor-logic';
import {fromBackgroundEditorConfig, fromEditorConfig, toBackgroundEditorConfig, toEditorConfig} from './widget-editor-adapters';
import {WidgetSelection, ZONE_LABELS} from './zone-overlay';
import {getLanguageOptions, localize, normalizeLanguage} from '../utils';
import {LabelPosition} from '../components/ha-selector/types';
import './layout-editor';
import '../components/background-image/background-editor';

type EditorElement = HTMLElement & {hass?: HomeAssistant; config?: unknown};

/** Shared contextual inspector used by the edit dialog and in-place card editor. */
@customElement('wcc-layout-inspector')
export class WccLayoutInspector extends LitElement {
    @property({attribute: false}) hass?: HomeAssistant;
    @property({attribute: false}) config?: WallClockConfigV3;
    @property({attribute: false}) layout: LayoutConfig = {zones: {}};
    @property({attribute: false}) selectedWidget: WidgetSelection | null = null;
    @property({attribute: false}) selectedZone: ZoneId | null = null;
    @state() private activeTab: 'content' | 'appearance' | 'behavior' = 'content';
    @state() private activeCardTab: 'general' | 'spacing' | 'background' = 'general';

    private editorCache = new Map<string, EditorElement>();
    private readonly languageOptions = getLanguageOptions();
    private readonly fontColors = ['#fff7bb', '#ffffff', '#ffe59a', '#79c4ff', '#8be0aa', '#e6a6df'];

    private t(key: string, fallback: string, replacements: Record<string, string | number> = {}): string {
        return localize(key, this.hass, fallback, replacements);
    }

    private zoneLabel(zone: ZoneId): string {
        return this.t(`zones.${zone.replace(/-/g, '_')}`, ZONE_LABELS[zone]);
    }

    static get styles(): CSSResult {
        return css`
            :host {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                height: 100%;
                min-width: 0;
                min-height: 0;
                color: var(--primary-text-color, #fff);
                background: #111217;
            }

            .header {
                display: flex;
                align-items: center;
                gap: 12px;
                min-height: 60px;
                padding: 0 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.09);
                background: #101116;
            }

            .header-icon {
                display: grid;
                place-items: center;
                width: 36px;
                height: 36px;
                border-radius: 9px;
                background: var(--primary-color, #2878d8);
                color: #fff;
                flex: 0 0 auto;
            }

            .header-icon ha-icon {
                --mdc-icon-size: 20px;
            }

            .title {
                min-width: 0;
                flex: 1;
            }

            .title strong,
            .title span {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .title span {
                margin-top: 1px;
                font-size: 0.75rem;
                opacity: 0.65;
            }

            .tabs {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                padding: 8px 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                background: #111217;
            }

            .tab {
                min-height: 38px;
                padding: 0 6px;
                border: 0;
                border-bottom: 2px solid transparent;
                background: transparent;
                color: #9297a8;
                font: inherit;
                font-size: 0.78rem;
                cursor: pointer;
            }

            .tab:hover,
            .tab:focus-visible {
                color: #fff;
                outline: none;
            }

            .tab.active {
                border-bottom-color: var(--primary-color, #3b82f6);
                color: #fff;
                background: linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent 72%);
            }

            .body {
                flex: 1;
                min-height: 0;
                /* Keep the final control fully scrollable above the designer
                   status bar, especially when an expanded list item is tall. */
                padding: 12px 12px 64px;
                box-sizing: border-box;
                scroll-padding-bottom: 64px;
                background: #111217;
                overflow-y: auto;
            }

            .hint {
                margin: 12px 4px;
                font-size: 0.85rem;
                opacity: 0.7;
            }

            .section-title {
                margin: 0 0 8px;
                font-size: 0.78rem;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                color: var(--secondary-text-color, #aaa);
            }

            .section-card {
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.028);
            }

            .section-card + .section-card {
                margin-top: 12px;
            }

            .feature-editor {
                overflow: hidden;
                border-radius: 6px;
            }

            .settings-list ha-row-selector {
                padding: 5px 0;
                border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
            }

            .settings-list ha-row-selector:first-child {
                border-top: 0;
            }

            ha-row-selector {
                display: block;
                width: 100%;
            }

            .card-settings-body {
                flex: 1;
                min-height: 0;
                padding: 10px 16px 64px;
                box-sizing: border-box;
                overflow-y: auto;
                background: #111217;
            }

            .card-settings-body ha-row-selector {
                margin-bottom: 4px;
            }

            .font-color-field {
                margin: 4px 0 12px;
            }

            .field-label {
                display: block;
                margin-bottom: 7px;
                color: var(--secondary-text-color, #a8adbd);
                font-size: 0.76rem;
            }

            .color-palette {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 8px;
            }

            .color-choice,
            .color-custom {
                position: relative;
                display: grid;
                place-items: center;
                width: 28px;
                height: 28px;
                padding: 0;
                box-sizing: border-box;
                border: 2px solid transparent;
                border-radius: 7px;
                background: var(--color-choice, transparent);
                color: #8c91a1;
                cursor: pointer;
            }

            .color-choice:hover,
            .color-choice:focus-visible,
            .color-custom:hover,
            .color-custom:focus-within {
                outline: 1px solid rgba(255, 255, 255, 0.42);
                outline-offset: 2px;
            }

            .color-choice.selected,
            .color-custom.selected {
                border-color: #111217;
                outline: 2px solid var(--color-choice, var(--primary-color, #3b82f6));
                outline-offset: 1px;
            }

            .color-custom {
                border: 1px dashed rgba(255, 255, 255, 0.24);
                background: var(--custom-color, transparent);
            }

            .color-custom ha-icon {
                --mdc-icon-size: 15px;
            }

            .color-custom input {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }

            layout-editor,
            background-editor {
                display: block;
                margin: 0 -12px;
            }

            .empty-inspector {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                padding: 28px;
                color: #858a9b;
                text-align: center;
                line-height: 1.5;
            }
        `;
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('selectedWidget') || changedProperties.has('selectedZone')) {
            if (this.selectedWidget || this.selectedZone) {
                this.activeTab = 'content';
            }
        }
    }

    private resolveWidget(): {zone: ZoneId; index: number; widget: WidgetConfig} | undefined {
        const selection = this.selectedWidget;
        if (!selection) return undefined;
        if (selection.widgetId) {
            const located = findWidgetById(this.layout, selection.widgetId);
            if (located) return located;
        }
        const widget = this.layout.zones[selection.zone]?.widgets[selection.index];
        return widget ? {zone: selection.zone, index: selection.index, widget} : undefined;
    }

    private getEditor(editorTag: string): EditorElement {
        let editor = this.editorCache.get(editorTag);
        if (!editor) {
            editor = document.createElement(editorTag) as EditorElement;
            editor.addEventListener('config-changed', event => {
                event.stopPropagation();
                const located = this.resolveWidget();
                if (!located) return;
                const config = (event as CustomEvent).detail.config as Record<string, unknown>;
                this.emitWidget(located.zone, located.index, fromEditorConfig(located.widget, config));
            });
            this.editorCache.set(editorTag, editor);
        }
        return editor;
    }

    private emitWidget(zone: ZoneId, index: number, widget: WidgetConfig): void {
        this.dispatchEvent(new CustomEvent('wcc-widget-config-changed', {
            detail: {zone, index, widget}, bubbles: true, composed: true,
        }));
    }

    private updateWidgetField(key: string, value: unknown): void {
        const located = this.resolveWidget();
        if (!located) return;
        const widget = {...located.widget};
        if (value === undefined || value === '') delete widget[key];
        else widget[key] = value;
        this.emitWidget(located.zone, located.index, widget);
    }

    private updateWidgetSize(key: string, value: string): void {
        const located = this.resolveWidget();
        if (!located) return;
        const widget = {...located.widget};
        if (value === '') delete widget[key];
        else widget[key] = value;

        // Older inspector builds stored this misleading generic override. Move
        // it to the component's real size key in the same atomic config change.
        if (widget.style?.fontSize !== undefined) {
            const style = {...widget.style};
            delete style.fontSize;
            if (Object.keys(style).length === 0) delete widget.style;
            else widget.style = style;
        }
        this.emitWidget(located.zone, located.index, widget);
    }

    private updateStyle(key: keyof WidgetStyle, value: string): void {
        const located = this.resolveWidget();
        if (!located) return;
        const style: WidgetStyle = {...(located.widget.style ?? {})};
        if (value === '') delete style[key];
        else style[key] = value;
        const widget = {...located.widget};
        if (Object.keys(style).length === 0) delete widget.style;
        else widget.style = style;
        this.emitWidget(located.zone, located.index, widget);
    }

    private updateZone(settings: Record<string, unknown>, zone: ZoneId | null = this.selectedZone): void {
        if (!zone) return;
        this.dispatchEvent(new CustomEvent('wcc-zone-settings-changed', {
            detail: {zone, settings}, bubbles: true, composed: true,
        }));
    }

    private emitCardConfig(config: WallClockConfigV3): void {
        this.dispatchEvent(new CustomEvent('wcc-card-config-changed', {
            detail: {config}, bubbles: true, composed: true,
        }));
    }

    private updateGeneralSetting(propertyPath: string, value: unknown): void {
        if (!this.config) return;
        this.emitCardConfig(applyGeneralSetting(this.config, propertyPath, value));
    }

    private supportedStyleKeys(widget: WidgetConfig): (keyof WidgetStyle)[] {
        const supportsWidth = !['sensors', 'weather', 'calendar'].includes(widget.type);
        const supportsHeight = !['clock', 'date', 'action-bar', 'sensors', 'weather', 'calendar'].includes(widget.type);
        const keys: (keyof WidgetStyle)[] = [];
        if (supportsWidth || widget.style?.maxWidth !== undefined) {
            keys.push('maxWidth');
        }
        // Clock/date content and Action bar buttons have an intrinsic minimum
        // height. Sensors/weather already fit their grid track; bounding them
        // creates nested scrollbars and clips their fixed internal layout.
        if (supportsHeight || widget.style?.maxHeight !== undefined) {
            keys.push('maxHeight');
        }
        keys.push('margin');
        return keys;
    }

    private renderZoneAlignment(zone: ZoneId): TemplateResult {
        const configured = this.layout.zones[zone]?.align;
        const effectiveDefault = defaultZoneAlignment(zone);
        const defaultLabel = ({
            start: this.t('ui.left', 'Left'),
            center: this.t('ui.center', 'Center'),
            end: this.t('ui.right', 'Right'),
        } as const)[effectiveDefault];
        return html`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'auto', label: this.t('inspector.zone_default', 'Zone default ({alignment})', {alignment: defaultLabel})},
                        {value: 'start', label: this.t('ui.left', 'Left')},
                        {value: 'center', label: this.t('ui.center', 'Center')},
                        {value: 'end', label: this.t('ui.right', 'Right')},
                    ], mode: 'dropdown'}}}
                    .value=${configured ?? 'auto'}
                    .label=${this.t('inspector.zone_alignment', 'Zone alignment')}
                    .helper=${this.t('inspector.zone_alignment_help', 'Applies to every widget in this zone')}
                    @value-changed=${(ev: CustomEvent) => this.updateZone({
                        align: ev.detail.value === 'auto' ? undefined : ev.detail.value,
                    }, zone)}>
            </ha-row-selector>
        `;
    }

    private renderHeader(icon: string, title: string, subtitle: string): TemplateResult {
        return html`
            <div class="header">
                <span class="header-icon"><ha-icon .icon=${icon}></ha-icon></span>
                <div class="title"><strong>${title}</strong><span>${subtitle}</span></div>
            </div>
        `;
    }

    private renderTabs(): TemplateResult {
        const tabs: {id: 'content' | 'appearance' | 'behavior'; label: string}[] = [
            {id: 'content', label: this.t('ui.content', 'Content')},
            {id: 'appearance', label: this.t('ui.appearance', 'Appearance')},
            {id: 'behavior', label: this.t('ui.behavior', 'Behavior')},
        ];
        return html`
            <div class="tabs" role="tablist" aria-label=${this.t('inspector.widget_settings', 'Widget settings')}>
                ${tabs.map(tab => html`
                    <button
                            class="tab ${this.activeTab === tab.id ? 'active' : ''}"
                            role="tab"
                            aria-selected=${this.activeTab === tab.id ? 'true' : 'false'}
                            @click=${() => { this.activeTab = tab.id; }}>
                        ${tab.label}
                    </button>
                `)}
            </div>
        `;
    }

    private renderWidgetPresentationFields(widget: WidgetConfig): TemplateResult {
        if (widget.type !== 'sensors' && widget.type !== 'action-bar') return html``;
        const translationGroup = widget.type === 'sensors' ? 'sensors' : 'actions';
        const itemName = widget.type === 'sensors' ? 'Item' : 'Button';
        return html`
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'auto', label: this.t('ui.auto', 'Auto (by zone)')},
                        {value: 'horizontal', label: this.t('ui.horizontal', 'Horizontal')},
                        {value: 'vertical', label: this.t('ui.vertical', 'Vertical')},
                    ], mode: 'dropdown'}}}
                    .value=${widget.orientation ?? 'auto'}
                    .label=${this.t(`editor.${translationGroup}.orientation`, `${itemName} orientation`)}
                    .helper=${this.t(`editor.${translationGroup}.orientation_help`, 'Auto uses a row in center zones and a column in side zones.')}
                    @value-changed=${(ev: CustomEvent) =>
                        this.updateWidgetField('orientation', ev.detail.value === 'auto' ? undefined : ev.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'auto', label: this.t('ui.zone_default', 'Zone default')},
                        {value: 'left', label: this.t('ui.left', 'Left')},
                        {value: 'center', label: this.t('ui.center', 'Center')},
                        {value: 'right', label: this.t('ui.right', 'Right')},
                    ], mode: 'dropdown'}}}
                    .value=${widget.alignment ?? 'auto'}
                    .label=${this.t(`editor.${translationGroup}.alignment`, `${itemName} alignment`)}
                    .helper=${this.t(`editor.${translationGroup}.alignment_help`, 'Use the zone alignment or override it for this widget.')}
                    @value-changed=${(ev: CustomEvent) =>
                        this.updateWidgetField('alignment', ev.detail.value === 'auto' ? undefined : ev.detail.value)}>
            </ha-row-selector>
            ${widget.type === 'action-bar' ? html`
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text: {}}}
                        .value=${widget.buttonGap ?? ''}
                        .label=${this.t('editor.actions.button_gap', 'Button gap')}
                        .helper=${this.t('editor.actions.button_gap_help', 'CSS length between buttons (default: 16px)')}
                        @value-changed=${(ev: CustomEvent) =>
                            this.updateWidgetField('buttonGap', ev.detail.value?.trim() || undefined)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{text: {}}}
                        .value=${widget.padding ?? ''}
                        .label=${this.t('editor.actions.panel_padding', 'Panel padding')}
                        .helper=${this.t('editor.actions.panel_padding_help', 'CSS padding shorthand (default: 16px)')}
                        @value-changed=${(ev: CustomEvent) =>
                            this.updateWidgetField('padding', ev.detail.value?.trim() || undefined)}>
                </ha-row-selector>
                <ha-row-selector .hass=${this.hass}
                        .selector=${{number: {min: 0, max: 1, step: 0.05, mode: 'slider'}}}
                        .value=${widget.backgroundOpacity ?? 0.3}
                        .label=${this.t('editor.actions.opacity', 'Background opacity')}
                        .helper=${this.t('editor.actions.opacity_help', 'Adjust the action bar background transparency')}
                        @value-changed=${(ev: CustomEvent) =>
                            this.updateWidgetField('backgroundOpacity', ev.detail.value)}>
                </ha-row-selector>
            ` : ''}
        `;
    }

    private renderWidget(): TemplateResult {
        const located = this.resolveWidget();
        if (!located) return html``;
        const {zone, widget} = located;
        const plugin = WidgetRegistry.getInstance().getWidget(widget.type);
        const widgetName = this.t(`widgets.${widget.type.replace(/-/g, '_')}`, plugin?.name ?? widget.type);
        let featureEditor: HTMLElement | TemplateResult = html`
            <p class="hint">${this.t('inspector.no_content', 'This widget has no content settings.')}</p>
        `;
        if (plugin?.editorTag) {
            const editor = this.getEditor(plugin.editorTag);
            editor.hass = this.hass;
            editor.config = toEditorConfig(widget);
            featureEditor = editor;
        }
        const style = widget.style ?? {};
        const exclusive = this.layout.zones[zone]?.mode === 'exclusive';
        return html`
            ${this.renderHeader(plugin?.icon ?? 'mdi:puzzle', widgetName, this.zoneLabel(zone))}
            ${this.renderTabs()}
            <div class="body">
                ${this.activeTab === 'content' ? html`
                    <section class="section-card">
                        <div class="section-title">${this.t('inspector.widget_settings', 'Widget settings')}</div>
                        <div class="feature-editor">${featureEditor}</div>
                    </section>
                ` : ''}
                ${this.activeTab === 'appearance' ? html`
                    <section class="section-card">
                    <div class="section-title">${this.t('inspector.appearance_layout', 'Appearance and layout')}</div>
                    <div class="settings-list">
                        ${this.renderWidgetPresentationFields(widget)}
                        <ha-row-selector .hass=${this.hass} .selector=${{color_hex: ''}}
                                .value=${style.color ?? ''} .label=${this.t('inspector.color', 'Color override')}
                                @value-changed=${(ev: CustomEvent) => this.updateStyle('color', ev.detail.value)}>
                        </ha-row-selector>
                        <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                                .value=${style.fontFamily ?? ''}
                                .label=${this.t('inspector.font_family', 'Font family override')}
                                .helper=${this.t('inspector.font_family_help', 'CSS font family or stack; empty uses the card font')}
                                @value-changed=${(ev: CustomEvent) => this.updateStyle('fontFamily', ev.detail.value)}>
                        </ha-row-selector>
                        ${this.renderWidgetSizeFields(widget, style)}
                        ${widget.type === 'clock' || widget.type === 'date'
                            ? this.renderZoneAlignment(zone)
                            : ''}
                        ${this.supportedStyleKeys(widget).map(key => html`
                            <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                                    .value=${style[key] ?? ''} .label=${this.styleLabel(key, widget)}
                                    @value-changed=${(ev: CustomEvent) => this.updateStyle(key, ev.detail.value)}>
                            </ha-row-selector>
                        `)}
                    </div>
                    </section>
                ` : ''}
                ${this.activeTab === 'behavior' ? html`
                    <section class="section-card">
                        <div class="section-title">${this.t('ui.behavior', 'Behavior')}</div>
                        <div class="settings-list">
                        ${exclusive ? html`
                            <ha-row-selector .hass=${this.hass} .selector=${{number: {mode: 'box'}}}
                                    .value=${widget.priority ?? 0} .label=${this.t('inspector.display_priority', 'Display priority')}
                                    .helper=${this.t('inspector.priority_help', 'Higher active value wins in this exclusive zone')}
                                    @value-changed=${(ev: CustomEvent) =>
                                        this.updateWidgetField('priority', ev.detail.value === 0 ? undefined : ev.detail.value)}>
                            </ha-row-selector>
                        ` : html`<p class="hint">${this.t('inspector.no_behavior', 'This widget has no additional behavior settings.')}</p>`}
                        </div>
                    </section>
                ` : ''}
            </div>
        `;
    }

    private renderWidgetSizeFields(widget: WidgetConfig, style: WidgetStyle): TemplateResult {
        const field = (key: string, label: string, fallback?: string) => html`
            <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                    .value=${(widget[key] as string | undefined) ?? fallback ?? ''}
                    .label=${label}
                    @value-changed=${(ev: CustomEvent) => this.updateWidgetSize(key, ev.detail.value)}>
            </ha-row-selector>
        `;
        switch (widget.type) {
            case 'clock':
                return field('clockSize', this.t('inspector.clock_size', 'Clock size (e.g., 16rem)'), style.fontSize);
            case 'date':
                return field('dateSize', this.t('inspector.date_size', 'Date size (e.g., 6rem)'), style.fontSize);
            case 'sensors':
            case 'weather':
                return html`
                    ${field('labelSize', this.t('inspector.label_size', 'Label size (e.g., 1.2rem)'))}
                    ${field('valueSize', this.t('inspector.value_size', 'Value size (e.g., 2rem)'))}
                `;
            case 'action-bar':
                return field('iconSize', this.t('inspector.icon_size', 'Icon size (button is 2×, e.g., 72px)'));
            case 'calendar':
                return html`
                    ${field('calendarDateSize', this.t('inspector.calendar_date_size', 'Date block size (e.g., 1rem)'))}
                    ${field('eventTitleSize', this.t('inspector.event_title_size', 'Event title size (e.g., 1rem)'))}
                    ${field('eventDetailSize', this.t('inspector.event_detail_size', 'Event detail size (e.g., 0.82rem)'))}
                `;
            case 'transportation':
                return html``;
            default:
                return html`
                    <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                            .value=${style.fontSize ?? ''} .label=${this.styleLabel('fontSize')}
                            @value-changed=${(ev: CustomEvent) => this.updateStyle('fontSize', ev.detail.value)}>
                    </ha-row-selector>
                `;
        }
    }

    private styleLabel(key: keyof WidgetStyle, widget?: WidgetConfig): string {
        if (widget) {
            if (key === 'maxWidth' && ['sensors', 'weather', 'calendar'].includes(widget.type)) {
                return this.t('inspector.unsupported_width', 'Maximum width (unsupported — clear this value)');
            }
            if (key === 'maxHeight' && ['clock', 'date', 'action-bar', 'sensors', 'weather', 'calendar'].includes(widget.type)) {
                return this.t('inspector.unsupported_height', 'Maximum height (unsupported — clear this value)');
            }
        }
        const labels: Record<keyof WidgetStyle, string> = {
            color: this.t('inspector.color', 'Color override'),
            fontSize: this.t('inspector.font_size', 'Font size (e.g., 2rem)'),
            fontFamily: this.t('inspector.font_family', 'Font family override'),
            maxWidth: this.t('inspector.max_width', 'Maximum width (e.g., 420px)'),
            maxHeight: this.t('inspector.max_height', 'Maximum height (e.g., 50vh)'),
            margin: this.t('inspector.margin', 'Margin (CSS shorthand)'),
        };
        return labels[key];
    }

    private renderZone(): TemplateResult {
        const zone = this.selectedZone;
        const config = zone ? this.layout.zones[zone] : undefined;
        if (!zone) return html``;
        return html`
            ${this.renderHeader('mdi:view-grid-outline', this.t('inspector.zone', 'Zone: {name}', {name: this.zoneLabel(zone)}), this.t('inspector.layout_settings', 'Layout settings'))}
            <div class="body">
                <section class="section-card settings-list">
                ${!config ? html`<p class="hint">${this.t('inspector.add_widget_first', 'Add a widget to this zone before changing its settings.')}</p>` : html`
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select: {options: [
                                {value: 'stack', label: this.t('inspector.stack', 'Stack (show all widgets)')},
                                {value: 'exclusive', label: this.t('inspector.exclusive', 'Exclusive (highest-priority active widget)')},
                            ], mode: 'dropdown'}}}
                            .value=${config.mode ?? 'stack'} .label=${this.t('inspector.mode', 'Mode')}
                            @value-changed=${(ev: CustomEvent) =>
                                this.updateZone({mode: ev.detail.value === 'stack' ? undefined : ev.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select: {options: [
                                {value: 'column', label: this.t('inspector.column', 'Column')}, {value: 'row', label: this.t('inspector.row', 'Row')},
                            ], mode: 'dropdown'}}}
                            .value=${config.direction ?? 'column'} .label=${this.t('inspector.direction', 'Direction')}
                            @value-changed=${(ev: CustomEvent) =>
                                this.updateZone({direction: ev.detail.value === 'column' ? undefined : ev.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass}
                            .selector=${{select: {options: [
                                {value: 'auto', label: this.t('inspector.zone_default', 'Zone default ({alignment})', {alignment: ({
                                    start: this.t('ui.left', 'Left'), center: this.t('ui.center', 'Center'), end: this.t('ui.right', 'Right'),
                                } as const)[defaultZoneAlignment(zone)]})},
                                {value: 'start', label: this.t('ui.left', 'Left')},
                                {value: 'center', label: this.t('ui.center', 'Center')},
                                {value: 'end', label: this.t('ui.right', 'Right')},
                            ], mode: 'dropdown'}}}
                            .value=${config.align ?? 'auto'} .label=${this.t('inspector.horizontal_alignment', 'Horizontal alignment')}
                            @value-changed=${(ev: CustomEvent) =>
                                this.updateZone({align: ev.detail.value === 'auto' ? undefined : ev.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                            .value=${config.gap ?? ''} .label=${this.t('inspector.widget_gap', 'Widget gap override (e.g., 4px)')}
                            @value-changed=${(ev: CustomEvent) => this.updateZone({gap: ev.detail.value})}>
                    </ha-row-selector>
                    <ha-row-selector .hass=${this.hass} .selector=${{text: {}}}
                            .value=${config.padding ?? ''} .label=${this.t('inspector.zone_padding', 'Zone padding (e.g., 0 16px)')}
                            @value-changed=${(ev: CustomEvent) => this.updateZone({padding: ev.detail.value})}>
                    </ha-row-selector>
                `}
                </section>
            </div>
        `;
    }

    private renderCardTabs(): TemplateResult {
        const tabs: {id: 'general' | 'spacing' | 'background'; label: string}[] = [
            {id: 'general', label: this.t('general.title', 'General')},
            {id: 'spacing', label: this.t('general.spacing', 'Spacing')},
            {id: 'background', label: this.t('general.background', 'Background')},
        ];
        return html`
            <div class="tabs" role="tablist" aria-label=${this.t('designer.card_settings', 'Card settings')}>
                ${tabs.map(tab => html`
                    <button
                            class="tab ${this.activeCardTab === tab.id ? 'active' : ''}"
                            role="tab"
                            aria-selected=${this.activeCardTab === tab.id ? 'true' : 'false'}
                            @click=${() => { this.activeCardTab = tab.id; }}>
                        ${tab.label}
                    </button>
                `)}
            </div>
        `;
    }

    private renderFontColor(): TemplateResult {
        const color = this.config?.appearance?.fontColor ?? '#FFFFFF';
        const normalized = color.toLowerCase();
        const paletteSelected = this.fontColors.some(option => option.toLowerCase() === normalized);
        const customColor = /^#[0-9a-f]{6}$/i.test(color) ? color : '#ffffff';
        return html`
            <div class="font-color-field">
                <span class="field-label">${this.t('general.font_color', 'Font color')}</span>
                <div class="color-palette">
                    ${this.fontColors.map(option => html`
                        <button class="color-choice ${option.toLowerCase() === normalized ? 'selected' : ''}"
                                type="button"
                                style=${`--color-choice: ${option}`}
                                title=${option}
                                aria-label=${`${this.t('general.font_color', 'Font color')} ${option}`}
                                @click=${() => this.updateGeneralSetting('fontColor', option)}>
                        </button>
                    `)}
                    <label class="color-custom ${!paletteSelected ? 'selected' : ''}"
                            style=${`--custom-color: ${!paletteSelected ? customColor : 'transparent'}; --color-choice: ${customColor}`}
                            title=${this.t('general.custom_color', 'Custom color')}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        <input type="color" .value=${customColor}
                                aria-label=${this.t('general.custom_color', 'Custom color')}
                                @change=${(ev: Event) => this.updateGeneralSetting(
                                    'fontColor', (ev.target as HTMLInputElement).value,
                                )}>
                    </label>
                </div>
            </div>
        `;
    }

    private renderCardGeneral(): TemplateResult {
        const appearance = this.config?.appearance ?? {};
        const language = normalizeLanguage(String(
            appearance.language || this.hass?.locale?.language || this.hass?.language || 'en',
        ));
        return html`
            ${this.renderFontColor()}
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: this.languageOptions, mode: 'dropdown'}}}
                    .value=${language}
                    .label=${this.t('general.language', 'Language')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.updateGeneralSetting('language', ev.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: 'debug', label: 'Debug'},
                        {value: 'info', label: 'Info'},
                        {value: 'warn', label: 'Warning'},
                        {value: 'error', label: 'Error'},
                        {value: 'none', label: this.t('ui.none', 'None')},
                    ], mode: 'dropdown'}}}
                    .value=${this.config?.logLevel ?? 'info'}
                    .label=${this.t('general.log_level', 'Log level')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.updateGeneralSetting('logLevel', ev.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{select: {options: [
                        {value: Size.Large, label: this.t('general.large', 'Large')},
                        {value: Size.Medium, label: this.t('general.medium', 'Medium')},
                        {value: Size.Small, label: this.t('general.small', 'Small')},
                        {value: Size.Custom, label: this.t('spacing.custom', 'Custom')},
                    ], mode: 'dropdown'}}}
                    .value=${appearance.size ?? Size.Medium}
                    .label=${this.t('general.size', 'Size')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.updateGeneralSetting('size', ev.detail.value)}>
            </ha-row-selector>
            <ha-row-selector .hass=${this.hass}
                    .selector=${{text: {}}}
                    .value=${appearance.fontFamily ?? ''}
                    .label=${this.t('general.font_family', 'Font family')}
                    .helper=${this.t('general.font_family_help', 'CSS font family or stack; the font must already be loaded')}
                    .labelPosition=${LabelPosition.Top}
                    @value-changed=${(ev: CustomEvent) => this.updateGeneralSetting('fontFamily', ev.detail.value)}>
            </ha-row-selector>
        `;
    }

    private renderCardSettings(): TemplateResult {
        if (!this.config) {
            return html`
                ${this.renderHeader('mdi:theme-light-dark', 'Wall Clock', this.t('designer.card_settings', 'Card settings'))}
                <div class="empty-inspector">${this.t('designer.card_settings_unavailable', 'Card settings are not available.')}</div>
            `;
        }
        return html`
            ${this.renderHeader('mdi:theme-light-dark', 'Wall Clock', this.t('designer.card_settings', 'Card settings'))}
            ${this.renderCardTabs()}
            <div class="card-settings-body">
                ${this.activeCardTab === 'general' ? this.renderCardGeneral() : ''}
                ${this.activeCardTab === 'spacing' ? html`
                    <layout-editor
                            .hass=${this.hass}
                            .config=${this.config}
                            inspector
                            @config-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.emitCardConfig(ev.detail.config as WallClockConfigV3);
                            }}>
                    </layout-editor>
                ` : ''}
                ${this.activeCardTab === 'background' ? html`
                    <background-editor
                            .hass=${this.hass}
                            .config=${toBackgroundEditorConfig(this.config)}
                            @config-changed=${(ev: CustomEvent) => {
                                ev.stopPropagation();
                                this.emitCardConfig({
                                    ...this.config!,
                                    background: fromBackgroundEditorConfig(ev.detail.config),
                                });
                            }}>
                    </background-editor>
                ` : ''}
            </div>
        `;
    }

    render(): TemplateResult {
        if (this.selectedWidget) return this.renderWidget();
        if (this.selectedZone) return this.renderZone();
        return this.renderCardSettings();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-layout-inspector': WccLayoutInspector;
    }
}

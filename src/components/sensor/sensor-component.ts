import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { createLogger, getSizeValue } from '../../utils';
import { SensorController } from './sensor-controller';
import type {SensorConfig} from './sensor-types';
import { Size } from '../../core/types';
import type {ResolvedWidgetAlignment, ResolvedWidgetOrientation} from '../../widgets/widget-layout';

export interface SensorComponentConfig {
    sensors?: SensorConfig[];
    fontColor?: string;
    size?: Size;
    labelSize?: string;
    valueSize?: string;
    itemGap?: string;
    showIcons?: boolean;
    iconSize?: string;
    showSeparator?: boolean;
    separatorColor?: string;
    separatorOpacity?: number;
    orientation?: ResolvedWidgetOrientation;
    alignment?: ResolvedWidgetAlignment;
}

@customElement('ha-sensors')
export class SensorComponent extends LitElement {
    @property({ type: Array }) sensors?: SensorConfig[];
    @property({ type: String }) fontColor?: string;
    @property({ type: Object }) hass?: HomeAssistant;
    @property({ type: String }) size?: Size;
    @property({ type: String }) labelSize?: string;
    @property({ type: String }) valueSize?: string;
    @property({ type: String }) itemGap?: string;
    @property({ type: Boolean }) showIcons = true;
    @property({ type: String }) iconSize?: string;
    @property({ type: Boolean }) showSeparator = true;
    @property({ type: String }) separatorColor?: string;
    @property({ type: Number }) separatorOpacity?: number;
    @property({ type: String }) orientation: ResolvedWidgetOrientation = 'vertical';
    @property({ type: String }) alignment: ResolvedWidgetAlignment = 'left';

    private logger = createLogger('sensor-component');
    private sensorController: SensorController;

    constructor() {
        super();
        // Initialize the unified controller with the host (this component)
        this.sensorController = new SensorController(this, {
            sensors: this.sensors
        });
    }

    get controller(): SensorController {
        return this.sensorController;
    }

    static styles = css`
        :host {
            display: block;
            width: var(--sensor-component-width, 100%);
            max-height: 100%;
            container-type: var(--sensor-container-type, inline-size);
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own items. */
        .sensor-container {
            display: flex;
            width: var(--sensor-component-width, 100%);
            box-sizing: border-box;
            max-height: 100%;
            gap: var(--sensor-item-gap, 16px);
            --sensor-icon-copy-gap: clamp(4px, 1cqw, 10px);
        }

        .sensor-item {
            flex: 0 0 auto;
            min-width: 0;
            max-width: 100%;
            cursor: pointer;
            color: var(--sensor-color, inherit);
        }

        .sensor-container.horizontal {
            display: grid;
            grid-template-columns: repeat(
                var(--sensor-count),
                minmax(max-content, 1fr)
            );
            column-gap: var(--sensor-item-gap, 16px);
            align-items: stretch;
            overflow-x: auto;
            overflow-y: hidden;
        }

        .sensor-container.vertical {
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .sensor-container.horizontal .sensor-item,
        .sensor-container.show-icons .sensor-item {
            display: flex;
            align-items: center;
        }

        .sensor-container.horizontal .sensor-item {
            position: relative;
            min-width: max-content;
            justify-content: center;
        }

        .sensor-content {
            min-width: 0;
            max-width: 100%;
        }

        .sensor-container.show-icons .sensor-content {
            display: flex;
            align-items: center;
            gap: var(--sensor-icon-copy-gap);
        }

        .sensor-container.horizontal .sensor-content {
            display: grid;
            grid-template-columns: max-content;
            align-items: center;
            width: max-content;
            max-width: none;
        }

        .sensor-container.horizontal.show-icons .sensor-content {
            grid-template-columns:
                var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem))
                max-content;
        }

        .sensor-container.horizontal.show-icons .sensor-copy {
            grid-column: 2;
        }

        .sensor-copy {
            min-width: 0;
        }

        .sensor-icon-slot {
            display: grid;
            place-items: center;
            width: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
            height: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
        }

        .sensor-icon {
            --mdc-icon-size: var(--sensor-icon-size, clamp(1.8rem, 6cqw, 2.25rem));
            opacity: 0.9;
            color: var(--sensor-color, currentColor);
        }

        .sensor-container.horizontal.show-separators .sensor-item:not(:first-child)::before {
            content: '';
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: calc(0px - var(--sensor-item-gap, 16px));
            width: var(--sensor-item-gap, 16px);
            min-height: 3rem;
            background: linear-gradient(
                to right,
                transparent calc(50% - 0.5px),
                var(--sensor-separator-color, currentColor) calc(50% - 0.5px),
                var(--sensor-separator-color, currentColor) calc(50% + 0.5px),
                transparent calc(50% + 0.5px)
            );
            opacity: var(--sensor-separator-opacity, 0.28);
            pointer-events: none;
        }

        .sensor-container.horizontal.align-left .sensor-item { justify-content: flex-start; }
        .sensor-container.horizontal.align-center .sensor-item { justify-content: center; }
        .sensor-container.horizontal.align-right .sensor-item { justify-content: flex-end; }
        .sensor-container.vertical.align-left { align-items: flex-start; }
        .sensor-container.vertical.align-center { align-items: center; }
        .sensor-container.vertical.align-right { align-items: flex-end; }

        .sensor-container.align-left .sensor-item { text-align: left; }
        .sensor-container.align-center .sensor-item { text-align: center; }
        .sensor-container.align-right .sensor-item { text-align: right; }

        .sensor-label {
            font-size: 1.0rem;
            font-weight: 300;
            opacity: 0.8;
            color: var(--sensor-color, currentColor);
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--sensor-color, var(--sensor-value-color, #ffffff));
            white-space: nowrap;
        }

        /* Responsive adjustments */
        @media (min-width: 900px) {
            .sensor-label {
                font-size: 1.2rem;
            }

            .sensor-value {
                font-size: 2rem;
            }
        }

        @media (min-width: 1280px) {
            .sensor-label {
                font-size: 1.5rem;
            }

            .sensor-value {
                font-size: 2.5rem;
            }
        }
    `;

    getLabelSize(): string {
        return getSizeValue(this.size, this.labelSize, 'labelSize');
    }

    getValueSize(): string {
        return getSizeValue(this.size, this.valueSize, 'valueSize');
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('sensors')) {
            this.logger.debug('Sensors changed, updating SensorController');

            // Update unified SensorController with new configuration
            this.sensorController.updateConfig({
                sensors: this.sensors
            });
        }

        if (changedProperties.has('hass') && this.hass) {
            // Update the hass instance in the controller
            this.sensorController.updateHass(this.hass);
        }

        if (changedProperties.has('size') ||
            changedProperties.has('labelSize') ||
            changedProperties.has('valueSize')) {

            this.logger.debug('Size properties changed');

            if (changedProperties.has('size')) {
                const oldSize = changedProperties.get('size');
                this.logger.debug(`Size changed: ${oldSize} -> ${this.size}`);
            }

            if (changedProperties.has('labelSize')) {
                const oldLabelSize = changedProperties.get('labelSize');
                this.logger.debug(`LabelSize changed: ${oldLabelSize} -> ${this.labelSize}`);
            }

            if (changedProperties.has('valueSize')) {
                const oldValueSize = changedProperties.get('valueSize');
                this.logger.debug(`ValueSize changed: ${oldValueSize} -> ${this.valueSize}`);
            }

            // Force re-render to apply new sizes
            this.requestUpdate();
        }
    }

    private _openMoreInfo(entityId: string): void {
        if (!entityId) {
            return;
        }
        fireEvent(this, 'hass-more-info', { entityId } as any);
    }

    render() {
        const sensorValues = this.sensorController.sensorValues;

        if (sensorValues.length === 0) {
            return html``;
        }

        const labelSize = this.getLabelSize();
        const valueSize = this.getValueSize();
        const itemGap = this.itemGap?.trim() || '16px';
        const iconSize = this.iconSize?.trim() || 'clamp(1.8rem, 6cqw, 2.25rem)';
        const separatorColor = this.separatorColor?.trim() || 'currentColor';
        const separatorOpacity = Math.min(1, Math.max(0, this.separatorOpacity ?? 0.28));

        this.logger.debug(`Rendering sensors - LabelSize: ${labelSize}, ValueSize: ${valueSize}`);

        return html`
            <div class="sensor-container ${this.orientation} align-${this.alignment}
                        ${this.showIcons ? 'show-icons' : ''}
                        ${this.orientation === 'horizontal' && this.showSeparator ? 'show-separators' : ''}"
                 style="color: ${this.fontColor};
                        --sensor-count: ${sensorValues.length};
                        --sensor-item-gap: ${itemGap};
                        --sensor-icon-size: ${iconSize};
                        --sensor-separator-color: ${separatorColor};
                        --sensor-separator-opacity: ${separatorOpacity};">
                ${sensorValues.map(sensor => html`
                    <div class="sensor-item"
                         style=${sensor.color ? `--sensor-color: ${sensor.color};` : ''}
                         role="button"
                         tabindex="0"
                         @click=${() => this._openMoreInfo(sensor.entity)}
                         @keydown=${(ev: KeyboardEvent) => {
                             if (ev.key === 'Enter' || ev.key === ' ') {
                                 ev.preventDefault();
                                 this._openMoreInfo(sensor.entity);
                             }
                         }}>
                        <div class="sensor-content">
                            ${this.showIcons ? html`
                                <span class="sensor-icon-slot" aria-hidden="true">
                                    ${sensor.icon
                                        ? html`<ha-icon class="sensor-icon" .icon=${sensor.icon}></ha-icon>`
                                        : ''}
                                </span>
                            ` : ''}
                            <div class="sensor-copy">
                                ${sensor.label ?
                                    html`
                                        <div class="sensor-label" style="font-size: ${labelSize};">
                                            ${sensor.label}
                                        </div>` :
                                    ''
                                }
                                <div class="sensor-value" style="font-size: ${valueSize};">
                                    ${sensor.value}
                                </div>
                            </div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

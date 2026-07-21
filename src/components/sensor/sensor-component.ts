import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { createLogger, getSizeValue } from '../../utils';
import { SensorController, SensorConfig } from './sensor-controller';
import { Size } from '../../core/types';
import type {ResolvedWidgetAlignment, ResolvedWidgetOrientation} from '../../widgets/widget-layout';

export interface SensorComponentConfig {
    sensors?: SensorConfig[];
    fontColor?: string;
    size?: Size;
    labelSize?: string;
    valueSize?: string;
    itemGap?: string;
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
            width: 100%;
            max-height: 100%;
        }

        /* Placement is provided by the hosting zone (wcc-zone); the component
           only lays out its own items. */
        .sensor-container {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            max-height: 100%;
            gap: var(--sensor-item-gap, 16px);
        }

        .sensor-item {
            flex: 0 0 auto;
            min-width: 0;
            max-width: 100%;
            cursor: pointer;
        }

        .sensor-container.horizontal {
            flex-direction: row;
            align-items: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
        }

        .sensor-container.vertical {
            flex-direction: column;
            overflow-x: hidden;
            overflow-y: auto;
        }

        .sensor-container.horizontal.align-left { justify-content: flex-start; }
        .sensor-container.horizontal.align-center { justify-content: center; }
        .sensor-container.horizontal.align-right { justify-content: flex-end; }
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
        }

        .sensor-value {
            font-size: 1.5rem;
            font-weight: 400;
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

        this.logger.debug(`Rendering sensors - LabelSize: ${labelSize}, ValueSize: ${valueSize}`);

        return html`
            <div class="sensor-container ${this.orientation} align-${this.alignment}"
                 style="color: ${this.fontColor}; --sensor-item-gap: ${itemGap};">
                ${sensorValues.map(sensor => html`
                    <div class="sensor-item"
                         role="button"
                         tabindex="0"
                         @click=${() => this._openMoreInfo(sensor.entity)}
                         @keydown=${(ev: KeyboardEvent) => {
                             if (ev.key === 'Enter' || ev.key === ' ') {
                                 ev.preventDefault();
                                 this._openMoreInfo(sensor.entity);
                             }
                         }}>
                        ${sensor.label ?
                            html`
                                <div class="sensor-label" style="color: ${this.fontColor}; font-size: ${labelSize};">
                                    ${sensor.label}
                                </div>` :
                            ''
                        }
                        <div class="sensor-value" style="color: ${this.fontColor}; font-size: ${valueSize};">
                            ${sensor.value}
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

import {css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {WidgetConfig, WidgetOrientation} from '../core/layout-types';
import {WidgetElement} from './widget-element';

export interface SeparatorWidgetConfig extends WidgetConfig {
    orientation?: WidgetOrientation;
    color?: string;
    opacity?: number;
    /** CSS length used for the line thickness. */
    thickness?: string;
    /** CSS length or percentage used along the line's main axis. */
    length?: string;
}

@customElement('wcc-separator-widget')
export class SeparatorWidget extends WidgetElement<SeparatorWidgetConfig> {
    static styles = css`
        :host {
            display: block;
            flex: 0 0 auto;
            min-width: 0;
            min-height: 0;
            pointer-events: none;
        }

        :host([data-orientation='horizontal']) {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            padding-inline:
                var(--wcc-separator-inline-start-inset, 0)
                var(--wcc-separator-inline-end-inset, 0);
        }

        :host([data-orientation='vertical']) {
            width: auto;
            height: 100%;
            box-sizing: border-box;
            padding-block:
                var(--wcc-separator-block-start-inset, 0)
                var(--wcc-separator-block-end-inset, 0);
        }

        .separator {
            display: block;
            box-sizing: border-box;
            border-radius: 999px;
            background: var(--separator-color, #ffffff);
            opacity: var(--separator-opacity, 0.35);
        }

        .separator.horizontal {
            width: min(var(--separator-length, 100%), 100%);
            height: var(--separator-thickness, 1px);
            margin-inline: auto;
        }

        .separator.vertical {
            width: var(--separator-thickness, 1px);
            height: min(var(--separator-length, 100%), 100%);
            margin-block: auto;
        }
    `;

    private get resolvedOrientation(): Exclude<WidgetOrientation, 'auto'> {
        if (this.config.orientation && this.config.orientation !== 'auto') {
            return this.config.orientation;
        }
        return this.zoneDirection === 'row' ? 'vertical' : 'horizontal';
    }

    protected applyWidgetState(): void {
        this.setAttribute('data-orientation', this.resolvedOrientation);
    }

    render() {
        const orientation = this.resolvedOrientation;
        const opacity = Math.min(1, Math.max(0, Number(this.config.opacity ?? 0.35)));
        const color = this.config.color?.trim() || '#ffffff';
        const thickness = this.config.thickness?.trim() || '1px';
        const length = this.config.length?.trim() || '100%';
        return html`
            <div class="separator ${orientation}"
                 role="separator"
                 aria-orientation=${orientation}
                 style="
                     --separator-color: ${color};
                     --separator-opacity: ${opacity};
                     --separator-thickness: ${thickness};
                     --separator-length: ${length};
                 ">
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wcc-separator-widget': SeparatorWidget;
    }
}

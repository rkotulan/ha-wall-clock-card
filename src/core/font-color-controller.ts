import {ReactiveController, ReactiveControllerHost} from 'lit';
import type {HomeAssistant} from 'custom-card-helpers';
import {createLogger} from '../utils/logger/logger';

export const DEFAULT_FONT_COLOR = '#FFFFFF';
export const FONT_COLOR_CSS_VARIABLE = '--wall-clock-font-color';

interface RenderTemplateResult {
    result?: unknown;
    error?: string;
    level?: string;
}

type CssColorValidator = (value: string) => boolean;

/** Matches the template markers supported by Home Assistant's Jinja renderer. */
export function isHomeAssistantTemplate(value?: string): boolean {
    return Boolean(value && /{{|{%|{#/.test(value));
}

/**
 * Makes the public CSS custom property the highest-priority color source while
 * preserving the configured/template color as its backwards-compatible fallback.
 */
export function withFontColorCssVariable(color: string): string {
    return `var(${FONT_COLOR_CSS_VARIABLE}, ${color})`;
}

function browserSupportsCssColor(value: string): boolean {
    return typeof CSS === 'undefined' || typeof CSS.supports !== 'function'
        ? true
        : CSS.supports('color', value);
}

/** Trim and validate a backend template result before it reaches an inline style. */
export function normalizeTemplateColor(
    value: unknown,
    supportsColor: CssColorValidator = browserSupportsCssColor,
): string | undefined {
    if (value === null || value === undefined) {
        return undefined;
    }
    const candidate = String(value).trim();
    return candidate && supportsColor(candidate) ? candidate : undefined;
}

/**
 * Owns the Home Assistant render_template subscription for appearance.fontColor.
 * The backend tracks referenced entities and pushes a new result whenever one
 * changes, so normal hass state updates must not recreate this subscription.
 */
export class FontColorController implements ReactiveController {
    private readonly logger = createLogger('font-color-controller');
    private connected = false;
    private configuredColor = DEFAULT_FONT_COLOR;
    private effectiveColor = DEFAULT_FONT_COLOR;
    private connection?: HomeAssistant['connection'];
    private templateConfig?: object;
    private user?: string;
    private subscription?: Promise<() => void>;
    private subscriptionGeneration = 0;

    constructor(
        private readonly host: ReactiveControllerHost,
        private readonly onColorChanged: () => void,
        private readonly supportsColor: CssColorValidator = browserSupportsCssColor,
    ) {
        host.addController(this);
    }

    get color(): string {
        return this.effectiveColor;
    }

    update(configuredColor: string | undefined, hass: HomeAssistant | undefined, config: object): void {
        const nextColor = configuredColor ?? DEFAULT_FONT_COLOR;
        const nextConnection = hass?.connection;
        const nextUser = hass?.user?.name;
        const changed = nextColor !== this.configuredColor
            || nextConnection !== this.connection
            || config !== this.templateConfig
            || nextUser !== this.user;

        if (!changed) {
            return;
        }

        this.stopSubscription();
        this.configuredColor = nextColor;
        this.connection = nextConnection;
        this.templateConfig = config;
        this.user = nextUser;

        if (isHomeAssistantTemplate(nextColor)) {
            this.setEffectiveColor(DEFAULT_FONT_COLOR);
            this.startSubscription();
        } else {
            this.setEffectiveColor(nextColor);
        }
    }

    hostConnected(): void {
        this.connected = true;
        this.startSubscription();
    }

    hostDisconnected(): void {
        this.connected = false;
        this.stopSubscription();
    }

    private startSubscription(): void {
        if (!this.connected || this.subscription || !this.connection
            || !isHomeAssistantTemplate(this.configuredColor)) {
            return;
        }

        const generation = ++this.subscriptionGeneration;
        const subscription = this.connection.subscribeMessage<RenderTemplateResult>(
            event => {
                if (generation !== this.subscriptionGeneration) {
                    return;
                }
                if (event?.error) {
                    this.logger.warn(`Font color template error: ${event.error}`);
                    return;
                }
                const color = normalizeTemplateColor(event?.result, this.supportsColor);
                if (!color) {
                    this.logger.warn(`Ignoring invalid font color template result: ${String(event?.result ?? '')}`);
                    return;
                }
                this.setEffectiveColor(color);
            },
            {
                type: 'render_template',
                template: this.configuredColor,
                variables: {
                    config: this.templateConfig,
                    user: this.user,
                },
                strict: true,
                report_errors: true,
            },
        );
        this.subscription = subscription;
        void subscription.catch(error => {
            if (generation === this.subscriptionGeneration) {
                this.subscription = undefined;
                this.logger.warn('Unable to subscribe to the font color template:', error);
            }
        });
    }

    private stopSubscription(): void {
        this.subscriptionGeneration++;
        const subscription = this.subscription;
        this.subscription = undefined;
        if (subscription) {
            void subscription.then(unsubscribe => unsubscribe()).catch(() => undefined);
        }
    }

    private setEffectiveColor(color: string): void {
        if (color === this.effectiveColor) {
            return;
        }
        this.effectiveColor = color;
        this.onColorChanged();
        this.host.requestUpdate();
    }
}

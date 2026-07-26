import {LitElement, TemplateResult, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {resolveWeatherIconKind, WeatherIconKind} from './weather-icon-kind';

@customElement('wall-clock-weather-icon')
export class WallClockWeatherIcon extends LitElement {
    @property({type: String}) condition = '';
    @property({type: String}) source = '';
    @property({type: String}) label = '';
    @property({type: Boolean, reflect: true}) animated = true;

    static styles = css`
        :host {
            display: inline-block;
            width: 64px;
            height: 64px;
            line-height: 0;
            vertical-align: middle;
        }

        svg {
            display: block;
            width: 100%;
            height: 100%;
            overflow: visible;
        }

        .sun-rays,
        .sun-core,
        .moon,
        .star,
        .cloud-drift,
        .rain-drop,
        .snow-flake,
        .fog-line,
        .wind-line,
        .lightning,
        .hail-stone,
        .alert {
            transform-box: fill-box;
            transform-origin: center;
        }

        :host([animated]) .sun-rays {
            animation: sun-spin 18s linear infinite;
        }

        :host([animated]) .sun-core {
            animation: sun-pulse 3.4s ease-in-out infinite;
        }

        :host([animated]) .moon {
            animation: moon-float 4.8s ease-in-out infinite;
        }

        :host([animated]) .star {
            animation: star-twinkle 2.8s ease-in-out infinite;
        }

        :host([animated]) .star.delay-1 {
            animation-delay: -0.9s;
        }

        :host([animated]) .star.delay-2 {
            animation-delay: -1.8s;
        }

        :host([animated]) .cloud-drift {
            animation: cloud-drift 5.5s ease-in-out infinite;
        }

        :host([animated]) .rain-drop {
            animation: rain-fall 1.15s linear infinite;
        }

        :host([animated]) .rain-drop.delay-1 {
            animation-delay: -0.38s;
        }

        :host([animated]) .rain-drop.delay-2 {
            animation-delay: -0.76s;
        }

        :host([animated]) .rain-drop.delay-3 {
            animation-delay: -0.95s;
        }

        :host([animated]) .snow-flake {
            animation: snow-fall 2.6s ease-in-out infinite;
        }

        :host([animated]) .snow-flake.delay-1 {
            animation-delay: -0.85s;
        }

        :host([animated]) .snow-flake.delay-2 {
            animation-delay: -1.7s;
        }

        :host([animated]) .lightning {
            animation: lightning-flash 3.8s ease-in-out infinite;
        }

        :host([animated]) .fog-line {
            animation: fog-flow 4.4s ease-in-out infinite;
        }

        :host([animated]) .fog-line.delay-1 {
            animation-delay: -1.45s;
        }

        :host([animated]) .fog-line.delay-2 {
            animation-delay: -2.9s;
        }

        :host([animated]) .wind-line {
            animation: wind-flow 2.8s ease-in-out infinite;
        }

        :host([animated]) .wind-line.delay-1 {
            animation-delay: -0.9s;
        }

        :host([animated]) .wind-line.delay-2 {
            animation-delay: -1.8s;
        }

        :host([animated]) .hail-stone {
            animation: hail-fall 1.5s ease-in infinite;
        }

        :host([animated]) .hail-stone.delay-1 {
            animation-delay: -0.5s;
        }

        :host([animated]) .hail-stone.delay-2 {
            animation-delay: -1s;
        }

        :host([animated]) .alert {
            animation: alert-pulse 2.2s ease-in-out infinite;
        }

        @keyframes sun-spin {
            to { transform: rotate(360deg); }
        }

        @keyframes sun-pulse {
            0%, 100% { transform: scale(0.96); filter: brightness(0.98); }
            50% { transform: scale(1.04); filter: brightness(1.08); }
        }

        @keyframes moon-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1.5px); }
        }

        @keyframes star-twinkle {
            0%, 100% { opacity: 0.45; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes cloud-drift {
            0%, 100% { transform: translateX(-0.8px); }
            50% { transform: translateX(0.8px); }
        }

        @keyframes rain-fall {
            0% { opacity: 0; transform: translateY(-3px); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(6px); }
        }

        @keyframes snow-fall {
            0% { opacity: 0; transform: translate(-1px, -3px) rotate(0deg); }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; transform: translate(2px, 5px) rotate(90deg); }
        }

        @keyframes lightning-flash {
            0%, 9%, 13%, 100% { opacity: 0.78; filter: brightness(1); }
            10%, 12% { opacity: 1; filter: brightness(1.55) drop-shadow(0 0 5px #ffd44f); }
        }

        @keyframes fog-flow {
            0%, 100% { opacity: 0.55; transform: translateX(-2px); }
            50% { opacity: 0.95; transform: translateX(2px); }
        }

        @keyframes wind-flow {
            0%, 100% { opacity: 0.45; transform: translateX(-2px); }
            50% { opacity: 1; transform: translateX(2px); }
        }

        @keyframes hail-fall {
            0% { opacity: 0; transform: translateY(-3px); }
            25%, 80% { opacity: 1; }
            100% { opacity: 0; transform: translateY(5px); }
        }

        @keyframes alert-pulse {
            0%, 100% { transform: scale(0.96); filter: brightness(0.95); }
            50% { transform: scale(1.04); filter: brightness(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
            :host([animated]) * {
                animation: none !important;
            }
        }
    `;

    private renderDefs(): TemplateResult {
        return svg`
            <defs>
                <linearGradient id="sun" x1="18" y1="15" x2="44" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE06A"/>
                    <stop offset="1" stop-color="#FFAE18"/>
                </linearGradient>
                <linearGradient id="moon" x1="18" y1="13" x2="44" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="1" stop-color="#B8C9E3"/>
                </linearGradient>
                <linearGradient id="cloud" x1="19" y1="13" x2="42" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="0.55" stop-color="#EAF1F8"/>
                    <stop offset="1" stop-color="#BCC9D6"/>
                </linearGradient>
                <linearGradient id="cloud-dark" x1="17" y1="12" x2="44" y2="47" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D5DEE9"/>
                    <stop offset="1" stop-color="#77889D"/>
                </linearGradient>
                <linearGradient id="rain" x1="0" y1="43" x2="0" y2="62" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#53D8FF"/>
                    <stop offset="1" stop-color="#138CF2"/>
                </linearGradient>
                <linearGradient id="snow" x1="0" y1="43" x2="0" y2="61" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFFFFF"/>
                    <stop offset="1" stop-color="#BDEBFF"/>
                </linearGradient>
                <filter id="shadow" x="-25%" y="-25%" width="150%" height="165%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#06101C" flood-opacity="0.38"/>
                </filter>
                <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <mask id="crescent">
                    <rect width="64" height="64" fill="black"/>
                    <circle cx="30" cy="29" r="15" fill="white"/>
                    <circle cx="37" cy="23" r="15" fill="black"/>
                </mask>
            </defs>
        `;
    }

    private renderSun(cx = 32, cy = 31, scale = 1): TemplateResult {
        return svg`
            <g transform="translate(${cx} ${cy}) scale(${scale}) translate(-32 -31)">
                <g class="sun-rays" stroke="#FFC12E" stroke-width="3" stroke-linecap="round">
                    <path d="M32 5v7M32 50v7M6 31h7M51 31h7"/>
                    <path d="m13.6 12.6 5 5M45.4 44.4l5 5M13.6 49.4l5-5M45.4 17.6l5-5"/>
                </g>
                <circle class="sun-core" cx="32" cy="31" r="12" fill="url(#sun)" filter="url(#glow)"/>
            </g>
        `;
    }

    private renderMoon(cx = 30, cy = 29, scale = 1): TemplateResult {
        return svg`
            <g transform="translate(${cx - 30} ${cy - 29}) scale(${scale})">
                <circle class="moon" cx="30" cy="29" r="17" fill="url(#moon)" mask="url(#crescent)" filter="url(#shadow)"/>
                <circle class="star" cx="46" cy="16" r="1.8" fill="#FFF4B8"/>
                <circle class="star delay-1" cx="49" cy="28" r="1.2" fill="#FFFFFF"/>
                <circle class="star delay-2" cx="39" cy="9" r="1.1" fill="#FFFFFF"/>
            </g>
        `;
    }

    private renderCloud(dark = false): TemplateResult {
        return svg`
            <g class="cloud-drift" filter="url(#shadow)">
                <path
                    d="M16.2 43C10 43 5 38.6 5 33.1c0-5 4-9.2 9.2-9.8C16.5 16.7 22.2 12 29.2 12c8.7 0 15.8 6.6 16.4 15 1.1-.4 2.3-.6 3.5-.6 5.8 0 10.4 4.2 10.4 9.3S54.9 45 49.1 45H16.2z"
                    fill="${dark ? 'url(#cloud-dark)' : 'url(#cloud)'}"
                />
                <path d="M14 27c2.1-2.3 5-3.7 8.2-3.7 1.6-4.4 5.7-7.5 10.6-7.5 4.6 0 8.6 2.8 10.4 6.8-2.1-6.2-7.5-10.6-14-10.6-7 0-12.7 4.7-15 11.3-5.2.6-9.2 4.8-9.2 9.8 0 .7.1 1.3.2 1.9.6-3.2 4-6.3 8.8-8z" fill="#FFFFFF" opacity="${dark ? '0.16' : '0.42'}"/>
            </g>
        `;
    }

    private renderDrops(heavy = false): TemplateResult {
        const width = heavy ? 3.4 : 2.8;
        return svg`
            <g stroke="url(#rain)" stroke-width="${width}" stroke-linecap="round">
                <path class="rain-drop" d="m18 46-4 9"/>
                <path class="rain-drop delay-1" d="m31 46-4 11"/>
                <path class="rain-drop delay-2" d="m44 46-4 9"/>
                ${heavy ? svg`<path class="rain-drop delay-3" d="m55 45-4 11"/>` : svg``}
            </g>
        `;
    }

    private renderSnowflakes(): TemplateResult {
        return svg`
            <g stroke="url(#snow)" stroke-width="1.8" stroke-linecap="round">
                <g transform="translate(18 52)">
                    <g class="snow-flake">
                        <path d="M-4 0h8M0-4v8M-2.8-2.8l5.6 5.6M2.8-2.8l-5.6 5.6"/>
                    </g>
                </g>
                <g transform="translate(33 55)">
                    <g class="snow-flake delay-1">
                        <path d="M-3.5 0h7M0-3.5v7M-2.5-2.5l5 5M2.5-2.5l-5 5"/>
                    </g>
                </g>
                <g transform="translate(49 51)">
                    <g class="snow-flake delay-2">
                        <path d="M-4 0h8M0-4v8M-2.8-2.8l5.6 5.6M2.8-2.8l-5.6 5.6"/>
                    </g>
                </g>
            </g>
        `;
    }

    private renderGlyph(kind: WeatherIconKind): TemplateResult {
        switch (kind) {
            case 'clear-day':
                return svg`${this.renderSun()}`;
            case 'clear-night':
                return svg`${this.renderMoon()}`;
            case 'partly-cloudy-day':
                return svg`
                    <g transform="translate(-7 -8) scale(.78)">${this.renderSun()}</g>
                    <g transform="translate(7 9) scale(.88)">${this.renderCloud()}</g>
                `;
            case 'partly-cloudy-night':
                return svg`
                    <g transform="translate(-7 -7) scale(.8)">${this.renderMoon()}</g>
                    <g transform="translate(7 9) scale(.88)">${this.renderCloud()}</g>
                `;
            case 'cloudy':
                return svg`
                    <g transform="translate(-8 -4) scale(.82)" opacity=".62">${this.renderCloud(true)}</g>
                    <g transform="translate(6 7) scale(.9)">${this.renderCloud()}</g>
                `;
            case 'rain':
                return svg`${this.renderCloud()}${this.renderDrops()}`;
            case 'pouring':
                return svg`${this.renderCloud(true)}${this.renderDrops(true)}`;
            case 'thunderstorm':
                return svg`
                    ${this.renderCloud(true)}
                    <path class="lightning" d="M35 42h-8l-3 10h7l-2 10 13-16h-8z" fill="url(#sun)" filter="url(#glow)"/>
                    <path class="rain-drop delay-1" d="m49 46-4 10" stroke="url(#rain)" stroke-width="2.7" stroke-linecap="round"/>
                `;
            case 'snow':
                return svg`${this.renderCloud()}${this.renderSnowflakes()}`;
            case 'sleet':
                return svg`
                    ${this.renderCloud(true)}
                    <g stroke="url(#rain)" stroke-width="2.6" stroke-linecap="round">
                        <path class="rain-drop" d="m17 46-4 9"/>
                        <path class="rain-drop delay-1" d="m47 46-4 9"/>
                    </g>
                    <g transform="translate(1 0)">${this.renderSnowflakes()}</g>
                `;
            case 'fog':
                return svg`
                    <g transform="translate(3 -7) scale(.9)" opacity=".82">${this.renderCloud()}</g>
                    <g fill="none" stroke="#C9D6E2" stroke-width="3" stroke-linecap="round">
                        <path class="fog-line" d="M10 43h35"/>
                        <path class="fog-line delay-1" d="M18 50h36"/>
                        <path class="fog-line delay-2" d="M9 57h33"/>
                    </g>
                `;
            case 'hail':
                return svg`
                    ${this.renderCloud(true)}
                    <g fill="url(#snow)" stroke="#91CDE8" stroke-width=".8">
                        <circle class="hail-stone" cx="18" cy="51" r="3"/>
                        <circle class="hail-stone delay-1" cx="33" cy="55" r="3"/>
                        <circle class="hail-stone delay-2" cx="49" cy="50" r="3"/>
                    </g>
                `;
            case 'windy':
                return svg`
                    <g transform="translate(10 -7) scale(.72)" opacity=".7">${this.renderCloud()}</g>
                    <g fill="none" stroke="#DCEAF5" stroke-width="3" stroke-linecap="round">
                        <path class="wind-line" d="M7 35h35c7 0 7-8 1-8-3 0-4 2-4 3"/>
                        <path class="wind-line delay-1" d="M12 44h39c7 0 7 8 1 8-3 0-4-2-4-3"/>
                        <path class="wind-line delay-2" d="M7 53h26"/>
                    </g>
                `;
            case 'exceptional':
                return svg`
                    ${this.renderCloud(true)}
                    <g class="alert" filter="url(#glow)">
                        <path d="M32 40 19 61h26z" fill="#FFB52D"/>
                        <path d="M32 47v7" stroke="#35220A" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="32" cy="57" r="1.7" fill="#35220A"/>
                    </g>
                `;
        }
    }

    render(): TemplateResult {
        const kind = resolveWeatherIconKind(this.condition, this.source);
        return svg`
            <svg
                viewBox="0 0 64 64"
                role="img"
                aria-label="${this.label || this.condition || kind}"
                focusable="false"
            >
                ${this.renderDefs()}
                ${this.renderGlyph(kind)}
            </svg>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'wall-clock-weather-icon': WallClockWeatherIcon;
    }
}

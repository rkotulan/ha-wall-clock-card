import type {ReactiveController, ReactiveControllerHost} from 'lit';
import type {HomeAssistant} from 'custom-card-helpers';
import {
    DEFAULT_FONT_COLOR,
    FONT_COLOR_CSS_VARIABLE,
    FontColorController,
    isHomeAssistantTemplate,
    normalizeTemplateColor,
    withFontColorCssVariable,
} from '../src/core/font-color-controller';

class TestHost implements ReactiveControllerHost {
    readonly controllers: ReactiveController[] = [];
    readonly requestUpdate = jest.fn();
    readonly updateComplete = Promise.resolve(true);

    addController(controller: ReactiveController): void {
        this.controllers.push(controller);
    }

    removeController(controller: ReactiveController): void {
        const index = this.controllers.indexOf(controller);
        if (index >= 0) this.controllers.splice(index, 1);
    }
}

function hassWithConnection(subscribeMessage: jest.Mock, name = 'Wall Panel'): HomeAssistant {
    return {
        connection: {subscribeMessage},
        user: {name},
    } as unknown as HomeAssistant;
}

describe('font color templates', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    });

    afterEach(() => {
        warnSpy.mockRestore();
    });

    it('detects Home Assistant template markers', () => {
        expect(isHomeAssistantTemplate('#ffffff')).toBe(false);
        expect(isHomeAssistantTemplate('{{ states("sensor.color") }}')).toBe(true);
        expect(isHomeAssistantTemplate('{% if true %}red{% endif %}')).toBe(true);
        expect(isHomeAssistantTemplate('{# explanation #}red')).toBe(true);
    });

    it('normalizes valid CSS colors and rejects invalid results', () => {
        const supportsColor = (value: string) => ['red', 'rgb(1, 2, 3)'].includes(value);
        expect(normalizeTemplateColor('  red\n', supportsColor)).toBe('red');
        expect(normalizeTemplateColor('rgb(1, 2, 3)', supportsColor)).toBe('rgb(1, 2, 3)');
        expect(normalizeTemplateColor('red; background: url(x)', supportsColor)).toBeUndefined();
        expect(normalizeTemplateColor('   ', supportsColor)).toBeUndefined();
    });

    it('wraps colors in the public CSS custom property with a fallback', () => {
        expect(withFontColorCssVariable('#123456'))
            .toBe(`var(${FONT_COLOR_CSS_VARIABLE}, #123456)`);
    });

    it('keeps static colors local and does not create a websocket subscription', () => {
        const host = new TestHost();
        const subscribeMessage = jest.fn();
        const changed = jest.fn();
        const controller = new FontColorController(host, changed);
        controller.hostConnected();

        controller.update('#123456', hassWithConnection(subscribeMessage), {});

        expect(controller.color).toBe('#123456');
        expect(subscribeMessage).not.toHaveBeenCalled();
        expect(changed).toHaveBeenCalledTimes(1);
    });

    it('subscribes to render_template and applies valid pushed colors', () => {
        const host = new TestHost();
        const changed = jest.fn();
        let onResult: ((event: {result?: unknown}) => void) | undefined;
        const subscribeMessage = jest.fn((callback: typeof onResult) => {
            onResult = callback;
            return Promise.resolve(jest.fn());
        });
        const controller = new FontColorController(
            host,
            changed,
            value => value === 'rgb(12, 34, 56)',
        );
        const config = {appearance: {fontColor: '{{ states("sensor.color") }}'}};
        controller.hostConnected();

        controller.update(config.appearance.fontColor, hassWithConnection(subscribeMessage), config);
        onResult?.({result: '  rgb(12, 34, 56)\n'});

        expect(subscribeMessage).toHaveBeenCalledWith(expect.any(Function), {
            type: 'render_template',
            template: config.appearance.fontColor,
            variables: {config, user: 'Wall Panel'},
            strict: true,
            report_errors: true,
        });
        expect(controller.color).toBe('rgb(12, 34, 56)');
        expect(host.requestUpdate).toHaveBeenCalled();
        expect(changed).toHaveBeenCalled();
    });

    it('uses the default initially and preserves the last valid color after invalid updates', () => {
        const host = new TestHost();
        let onResult: ((event: {result?: unknown; error?: string}) => void) | undefined;
        const subscribeMessage = jest.fn((callback: typeof onResult) => {
            onResult = callback;
            return Promise.resolve(jest.fn());
        });
        const controller = new FontColorController(host, jest.fn(), value => value === 'red');
        controller.hostConnected();
        controller.update('{{ states("sensor.color") }}', hassWithConnection(subscribeMessage), {});

        expect(controller.color).toBe(DEFAULT_FONT_COLOR);
        onResult?.({result: 'red'});
        expect(controller.color).toBe('red');
        onResult?.({result: 'not-a-color; display: none'});
        expect(controller.color).toBe('red');
        onResult?.({error: 'Entity unavailable'});
        expect(controller.color).toBe('red');
    });

    it('does not resubscribe for ordinary hass updates using the same connection', () => {
        const host = new TestHost();
        const connection = {subscribeMessage: jest.fn().mockResolvedValue(jest.fn())};
        const firstHass = {connection, user: {name: 'Wall Panel'}} as unknown as HomeAssistant;
        const nextHass = {connection, user: {name: 'Wall Panel'}} as unknown as HomeAssistant;
        const config = {};
        const controller = new FontColorController(host, jest.fn());
        controller.hostConnected();

        controller.update('{{ states("sensor.color") }}', firstHass, config);
        controller.update('{{ states("sensor.color") }}', nextHass, config);

        expect(connection.subscribeMessage).toHaveBeenCalledTimes(1);
    });

    it('unsubscribes and ignores stale events when the configuration changes', async () => {
        const host = new TestHost();
        const unsubscribe = jest.fn();
        let onResult: ((event: {result?: unknown}) => void) | undefined;
        const subscribeMessage = jest.fn((callback: typeof onResult) => {
            onResult = callback;
            return Promise.resolve(unsubscribe);
        });
        const controller = new FontColorController(host, jest.fn(), () => true);
        controller.hostConnected();
        controller.update('{{ states("sensor.color") }}', hassWithConnection(subscribeMessage), {});
        const staleResult = onResult;

        controller.update('#abcdef', hassWithConnection(subscribeMessage), {});
        await Promise.resolve();
        staleResult?.({result: 'red'});

        expect(unsubscribe).toHaveBeenCalledTimes(1);
        expect(controller.color).toBe('#abcdef');
    });
});

import { noChange, ElementPart } from 'lit';
import { Directive, directive, DirectiveParameters, PartInfo, PartType } from 'lit/directive.js';
import { fireEvent } from 'custom-card-helpers';

/**
 * Lit directive replicating Home Assistant's standard actionHandler:
 * turns pointer/keyboard interaction on an element into a single `action`
 * event with detail.action = 'tap' | 'hold' | 'double_tap', the same event
 * built-in HA cards handle. HA does not export its directive, so cards
 * ship their own copy.
 */

export interface ActionHandlerOptions {
    hasHold?: boolean;
    hasDoubleClick?: boolean;
}

export type ActionGesture = 'tap' | 'hold' | 'double_tap';

const HOLD_TIME = 500;
const DOUBLE_CLICK_TIME = 250;

interface ActionHandlerElement extends HTMLElement {
    _actionHandlerOptions?: ActionHandlerOptions;
    _actionHandlerAttached?: boolean;
}

class ActionHandlerDirective extends Directive {
    constructor(partInfo: PartInfo) {
        super(partInfo);
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('actionHandler must be attached to an element');
        }
    }

    render(_options?: ActionHandlerOptions) {
        return noChange;
    }

    update(part: ElementPart, [options]: DirectiveParameters<this>) {
        this.attach(part.element as ActionHandlerElement, options || {});
        return noChange;
    }

    private attach(element: ActionHandlerElement, options: ActionHandlerOptions): void {
        // Options can change between renders; listeners are attached once.
        element._actionHandlerOptions = options;
        if (element._actionHandlerAttached) {
            return;
        }
        element._actionHandlerAttached = true;

        let holdTimeout: number | undefined;
        let held = false;
        let doubleClickTimeout: number | undefined;

        const fire = (action: ActionGesture) => {
            fireEvent(element, 'action', { action } as any);
        };

        const cancelHold = () => {
            if (holdTimeout !== undefined) {
                window.clearTimeout(holdTimeout);
                holdTimeout = undefined;
            }
        };

        element.addEventListener('pointerdown', () => {
            held = false;
            if (element._actionHandlerOptions?.hasHold) {
                cancelHold();
                holdTimeout = window.setTimeout(() => {
                    held = true;
                    fire('hold');
                }, HOLD_TIME);
            }
        });
        element.addEventListener('pointerup', cancelHold);
        element.addEventListener('pointercancel', cancelHold);
        element.addEventListener('pointerleave', cancelHold);

        element.addEventListener('click', () => {
            if (held) {
                // The hold action already fired for this press.
                held = false;
                return;
            }
            if (element._actionHandlerOptions?.hasDoubleClick) {
                if (doubleClickTimeout !== undefined) {
                    window.clearTimeout(doubleClickTimeout);
                    doubleClickTimeout = undefined;
                    fire('double_tap');
                } else {
                    doubleClickTimeout = window.setTimeout(() => {
                        doubleClickTimeout = undefined;
                        fire('tap');
                    }, DOUBLE_CLICK_TIME);
                }
            } else {
                fire('tap');
            }
        });

        element.addEventListener('keydown', (ev: KeyboardEvent) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                fire('tap');
            }
        });
    }
}

export const actionHandler = directive(ActionHandlerDirective);

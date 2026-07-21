import {Messenger} from './messenger';
import {ActiveComponentChangedMessage} from './messages';

/**
 * Retained activity state for components whose visibility affects widgets in
 * other zones. New subscribers can read the current value instead of waiting
 * for the next edge-triggered message.
 */
export class ActiveComponentState {
    private static instance: ActiveComponentState;
    private states = new Map<string, boolean>();

    static getInstance(): ActiveComponentState {
        if (!ActiveComponentState.instance) {
            ActiveComponentState.instance = new ActiveComponentState();
        }
        return ActiveComponentState.instance;
    }

    isActive(componentName: string): boolean {
        return this.states.get(componentName) === true;
    }

    setActive(componentName: string, active: boolean): void {
        if (this.isActive(componentName) === active) return;
        this.states.set(componentName, active);
        Messenger.getInstance().publish(new ActiveComponentChangedMessage(componentName, active));
    }
}

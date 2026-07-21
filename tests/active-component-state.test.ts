import {ActiveComponentState} from '../src/utils/messenger/active-component-state';
import {Messenger} from '../src/utils/messenger/messenger';
import {ActiveComponentChangedMessage} from '../src/utils/messenger/messages';

describe('ActiveComponentState', () => {
    it('retains state and publishes only actual changes', () => {
        const component = 'test-transportation-state';
        const received: boolean[] = [];
        const handler = (message: ActiveComponentChangedMessage) => {
            if (message.componentName === component) received.push(message.state);
        };
        Messenger.getInstance().subscribe(ActiveComponentChangedMessage, handler);

        const state = ActiveComponentState.getInstance();
        expect(state.isActive(component)).toBe(false);
        state.setActive(component, true);
        state.setActive(component, true);
        state.setActive(component, false);

        expect(received).toEqual([true, false]);
        expect(state.isActive(component)).toBe(false);
        Messenger.getInstance().unsubscribe(ActiveComponentChangedMessage, handler);
    });
});

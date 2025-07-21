import {IMessage} from '.';

export type Handler<T extends IMessage> = (msg: T) => void;

export class Messenger {
    private static instance: Messenger;
    private subscribers = new Map<Function, Handler<IMessage>[]>();

    private constructor() {
    }

    static getInstance(): Messenger {
        if (!Messenger.instance) {
            Messenger.instance = new Messenger();
        }
        return Messenger.instance;
    }

    subscribe<T extends IMessage>(messageType: Function, handler: Handler<T>) {
        if (!this.subscribers.has(messageType)) {
            this.subscribers.set(messageType, []);
        }
        this.subscribers.get(messageType)!.push(handler as Handler<IMessage>);
    }

    unsubscribe<T extends IMessage>(messageType: Function, handler: Handler<T>) {
        const handlers = this.subscribers.get(messageType);
        if (handlers) {
            this.subscribers.set(
                messageType,
                handlers.filter(h => h !== handler)
            );
        }
    }

    publish<T extends IMessage>(message: T) {
        const type = message.constructor;
        const handlers = this.subscribers.get(type) || [];
        handlers.forEach(handler => handler(message));
    }
}
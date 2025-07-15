import { ReactiveController, ReactiveControllerHost } from 'lit';
import { createLogger } from '../';

// Define Logger type based on the return type of createLogger
type Logger = ReturnType<typeof createLogger>;

/**
 * Base controller class that implements the ReactiveController interface
 * and provides a ready state pattern implementation.
 */
export abstract class BaseController implements ReactiveController {
    protected host: ReactiveControllerHost;
    protected logger: Logger;

    // Ready state implementation
    private _readyResolve: (() => void) | null = null;
    public ready: Promise<void>;

    /**
     * Constructor for the base controller
     * @param host The reactive controller host
     * @param loggerName The name to use for the logger
     */
    constructor(host: ReactiveControllerHost, loggerName: string) {
        this.host = host;
        this.logger = createLogger(loggerName);
        host.addController(this);

        // Initialize the ready promise
        this.ready = new Promise((resolve) => {
            this._readyResolve = resolve;
        });
    }

    /**
     * Called when the host is connected
     * Resolves the ready promise
     */
    hostConnected(): void {
        this.logger.debug('Host connected');

        // Resolve the ready promise
        if (this._readyResolve) {
            this._readyResolve();
            this._readyResolve = null;
        }

        // Call the onHostConnected method for additional initialization
        this.onHostConnected();
    }

    /**
     * Called when the host is disconnected
     * Resets the ready promise
     */
    hostDisconnected(): void {
        this.logger.debug('Host disconnected');

        // Reset the ready promise
        this.ready = new Promise((resolve) => {
            this._readyResolve = resolve;
        });

        // Call the onHostDisconnected method for additional cleanup
        this.onHostDisconnected();
    }

    /**
     * Method to be implemented by derived classes for additional initialization
     * when the host is connected
     */
    protected abstract onHostConnected(): void;

    /**
     * Method to be implemented by derived classes for additional cleanup
     * when the host is disconnected
     */
    protected abstract onHostDisconnected(): void;
}

import {ReactiveController, ReactiveControllerHost} from 'lit';
import {getEditorSessionState, setEditorSessionState} from './editor-session-state';

/** Retains only the inspector's own scroll viewport, scoped to its current view. */
export class InspectorScrollController implements ReactiveController {
    private viewport?: HTMLElement;
    private view?: string;
    private session?: string;
    private localPositions = new Map<string, number>();
    private target?: number;
    private observer?: ResizeObserver;
    private frame?: number;

    constructor(
        private host: ReactiveControllerHost & HTMLElement,
        private context: () => {session?: string; view: string},
    ) {
        host.addController(this);
    }

    /** Call before emitting a config change: HA may replace the host synchronously. */
    save = (): void => {
        if (!this.viewport || !this.view || this.target !== undefined) return;
        const value = this.viewport.scrollTop;
        if (this.session) setEditorSessionState(this.session, this.view, value);
        else this.localPositions.set(this.view, value);
    };

    hostUpdate(): void {
        this.save();
    }

    hostUpdated(): void {
        const {session, view} = this.context();
        const viewport = this.host.shadowRoot?.querySelector<HTMLElement>('.body, .card-settings-body');
        const changed = viewport !== this.viewport || view !== this.view || session !== this.session;
        if (changed) {
            this.cleanup();
            this.viewport = viewport ?? undefined;
            this.view = view;
            this.session = session;
            this.target = session ? getEditorSessionState<number>(session, view) ?? 0
                : this.localPositions.get(view) ?? 0;
            this.viewport?.addEventListener('scroll', this.save);
            this.viewport?.addEventListener('wheel', this.cancelRestore, {passive: true});
            this.viewport?.addEventListener('touchstart', this.cancelRestore, {passive: true});
            this.viewport?.addEventListener('pointerdown', this.cancelRestore, {passive: true});
            this.viewport?.addEventListener('keydown', this.cancelRestore);
        }
        if (this.target !== undefined && this.viewport) {
            // Nested editors render asynchronously. Observe their containing blocks
            // until enough content exists to restore the saved position.
            this.observer?.disconnect();
            this.observer = new ResizeObserver(this.restore);
            this.observer.observe(this.viewport);
            for (const child of this.viewport.children) this.observer.observe(child);
            if (this.frame !== undefined) cancelAnimationFrame(this.frame);
            this.frame = requestAnimationFrame(this.restore);
        }
    }

    private restore = (): void => {
        if (!this.viewport || this.target === undefined) return;
        this.viewport.scrollTop = this.target;
        if (Math.abs(this.viewport.scrollTop - this.target) < 1) {
            this.target = undefined;
            this.observer?.disconnect();
        }
    };

    private cancelRestore = (): void => {
        this.target = undefined;
        this.observer?.disconnect();
    };

    private cleanup(): void {
        if (this.frame !== undefined) cancelAnimationFrame(this.frame);
        this.observer?.disconnect();
        this.viewport?.removeEventListener('scroll', this.save);
        this.viewport?.removeEventListener('wheel', this.cancelRestore);
        this.viewport?.removeEventListener('touchstart', this.cancelRestore);
        this.viewport?.removeEventListener('pointerdown', this.cancelRestore);
        this.viewport?.removeEventListener('keydown', this.cancelRestore);
    }

    hostDisconnected(): void {
        // A removed viewport may already report zero; scroll/config events saved
        // its position while it was still connected. Never overwrite it here.
        this.cleanup();
        this.viewport = undefined;
    }

    hostConnected(): void {
        this.host.requestUpdate();
    }
}

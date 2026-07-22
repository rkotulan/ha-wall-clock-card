import Sortable, {SortableEvent} from 'sortablejs';

interface SortableHost extends HTMLElement {
    updateComplete: Promise<unknown>;
}

export interface SortableListOptions {
    containerSelector: string;
    draggable?: string;
    handle?: string;
    ghostClass?: string;
    onMove: (fromIndex: number, toIndex: number) => void;
}

/** Return a reordered copy without mutating the original list. */
export function moveListItem<T>(items: readonly T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0
        || fromIndex >= items.length || toIndex >= items.length) {
        return [...items];
    }
    const result = [...items];
    const [item] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, item);
    return result;
}

/** Keep an expanded editor attached to the same logical item after a move. */
export function movedListIndex(
    expandedIndex: number | null,
    fromIndex: number,
    toIndex: number,
): number | null {
    if (expandedIndex === null) return null;
    if (expandedIndex === fromIndex) return toIndex;
    if (fromIndex < expandedIndex && expandedIndex <= toIndex) return expandedIndex - 1;
    if (toIndex <= expandedIndex && expandedIndex < fromIndex) return expandedIndex + 1;
    return expandedIndex;
}

/**
 * SortableJS adapter for Lit-rendered lists.
 *
 * Sortable temporarily moves the rendered node. Before emitting the logical
 * reorder we put it back between Lit's original part markers, then let the
 * subsequent render apply the new array order safely.
 */
export class SortableListController {
    private sortable?: Sortable;
    private element?: HTMLElement;
    private setupRevision = 0;
    private dragOrigin?: {parent: Node; next: Node | null};

    constructor(
        private readonly host: SortableHost,
        private readonly options: SortableListOptions,
    ) {}

    schedule(): void {
        const revision = ++this.setupRevision;
        void this.host.updateComplete.then(() => {
            requestAnimationFrame(() => {
                if (revision !== this.setupRevision || !this.host.isConnected) return;
                const element = this.host.shadowRoot?.querySelector<HTMLElement>(
                    this.options.containerSelector,
                );
                if (element === this.element && this.sortable) return;
                this.rebuild(element ?? undefined);
            });
        });
    }

    disconnect(): void {
        this.setupRevision += 1;
        this.destroy();
    }

    private destroy(): void {
        this.sortable?.destroy();
        this.sortable = undefined;
        this.element = undefined;
        this.dragOrigin = undefined;
    }

    private rebuild(element?: HTMLElement): void {
        this.destroy();
        if (!element) return;
        this.sortable = new Sortable(element, {
            animation: 150,
            draggable: this.options.draggable ?? '.sortable-item',
            handle: this.options.handle ?? '.sortable-drag-handle',
            ghostClass: this.options.ghostClass ?? 'sortable-list-ghost',
            onStart: event => {
                this.dragOrigin = {parent: event.from, next: event.item.nextSibling};
            },
            onEnd: event => this.handleEnd(event),
        });
        this.element = element;
    }

    private handleEnd(event: SortableEvent): void {
        const origin = this.dragOrigin;
        this.dragOrigin = undefined;
        if (origin) origin.parent.insertBefore(event.item, origin.next);
        if (event.oldIndex == null || event.newIndex == null || event.oldIndex === event.newIndex) {
            return;
        }
        this.options.onMove(event.oldIndex, event.newIndex);
    }
}

import type {LovelaceCardConfig} from 'custom-card-helpers';

const WALL_CLOCK_CARD_TYPES = new Set([
    'custom:wall-clock-card',
    'wall-clock-card',
]);

/**
 * Detects wall-clock-card anywhere in a nested Lovelace card configuration.
 * Stack and conditional cards can otherwise bypass a direct type check and
 * recursively instantiate the complete dashboard inside itself.
 */
export function containsWallClockCard(value: unknown, visited = new Set<object>()): boolean {
    if (!value || typeof value !== 'object') return false;
    if (visited.has(value)) return false;
    visited.add(value);

    if (Array.isArray(value)) {
        return value.some(item => containsWallClockCard(item, visited));
    }

    const record = value as Record<string, unknown>;
    if (typeof record.type === 'string' && WALL_CLOCK_CARD_TYPES.has(record.type.trim().toLowerCase())) {
        return true;
    }
    return Object.values(record).some(item => containsWallClockCard(item, visited));
}

/** Minimal starting points; the native HA editor fills required fields. */
export function createCardStub(type: string): LovelaceCardConfig {
    const normalized = type.trim();
    switch (normalized) {
        case 'entities':
        case 'glance':
        case 'history-graph':
        case 'statistics-graph':
            return {type: normalized, entities: []};
        case 'grid':
            return {type: normalized, cards: [], columns: 2};
        case 'horizontal-stack':
        case 'vertical-stack':
            return {type: normalized, cards: []};
        case 'markdown':
            return {type: normalized, content: ''};
        default:
            return {type: normalized};
    }
}

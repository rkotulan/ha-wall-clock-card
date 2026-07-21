export type LovelaceConfigPath = Array<string | number>;

/** Finds a nested value by object identity, preserving the exact card instance. */
export function findConfigPath(
    node: unknown,
    target: unknown,
    path: LovelaceConfigPath = [],
): LovelaceConfigPath | undefined {
    if (node === target) return path;
    if (!node || typeof node !== 'object') return undefined;

    if (Array.isArray(node)) {
        for (let index = 0; index < node.length; index++) {
            const found = findConfigPath(node[index], target, [...path, index]);
            if (found) return found;
        }
        return undefined;
    }

    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
        const found = findConfigPath(value, target, [...path, key]);
        if (found) return found;
    }
    return undefined;
}

export function configAtPath(root: unknown, path: LovelaceConfigPath): unknown {
    return path.reduce<unknown>((node, segment) => {
        if (!node || typeof node !== 'object') return undefined;
        return (node as Record<string | number, unknown>)[segment];
    }, root);
}

function configsEqual(left: unknown, right: unknown): boolean {
    return left === right || JSON.stringify(left) === JSON.stringify(right);
}

/** Returns a detached dashboard config with one card replaced. */
export function cloneWithConfigAtPath<T>(
    root: T,
    path: LovelaceConfigPath,
    replacement: unknown,
): T | undefined {
    if (!path.length) return undefined;
    const cloned = JSON.parse(JSON.stringify(root)) as T;
    const parent = configAtPath(cloned, path.slice(0, -1));
    if (!parent || typeof parent !== 'object') return undefined;
    (parent as Record<string | number, unknown>)[path[path.length - 1]] = replacement;
    return cloned;
}

/**
 * Keeps HA's live Lovelace model in sync with an autosaved card. Dashboard edit
 * mode holds this object until the global Done action; without this update Done
 * can write its stale card config back over the successful autosave.
 *
 * The write fails closed if another actor changed the card at the same path.
 */
export function synchronizeLiveConfigAtPath(
    root: unknown,
    path: LovelaceConfigPath,
    expected: unknown,
    replacement: unknown,
): boolean {
    if (!path.length) return false;
    const current = configAtPath(root, path);
    if (!configsEqual(current, expected) && !configsEqual(current, replacement)) {
        return false;
    }

    const parent = configAtPath(root, path.slice(0, -1));
    if (!parent || typeof parent !== 'object') return false;
    (parent as Record<string | number, unknown>)[path[path.length - 1]] = replacement;
    return true;
}

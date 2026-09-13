/** Percent stored in YAML. Invalid values preserve the existing appearance. */
export function normalizeContentScale(value: unknown): number {
    return typeof value === 'number' && Number.isFinite(value)
        ? Math.min(200, Math.max(50, value)) : 100;
}

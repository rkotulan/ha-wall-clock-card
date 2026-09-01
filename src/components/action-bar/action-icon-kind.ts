/**
 * Home Assistant icon references are namespaced (for example `mdi:home` or
 * `local:custom-icon`). Values without a namespace are treated as raw SVG
 * path data for backwards compatibility.
 */
export function isHomeAssistantIconName(icon?: string): boolean {
    return Boolean(icon?.includes(':'));
}

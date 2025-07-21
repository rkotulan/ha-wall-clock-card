/**
 * Utility functions for DOM manipulation
 */

import {ReactiveControllerHost} from "lit";

/**
 * Finds a component in the document by its tag name, searching through shadow DOM if necessary
 * @param componentName The tag name of the component to find (e.g., 'wall-clock-card')
 * @returns The found element or null if not found
 */
export function findComponentInDocument(componentName: string): Element | null {
    // Try to find the component directly in the document
    let component = document.querySelector(componentName);

    // If not found directly, try to find it in the shadow DOM
    if (!component) {
        // Try to find it in all shadow roots
        const searchInShadowRoots = (root: Document | ShadowRoot): Element | null => {
            // Check direct children first
            const elements = root.querySelectorAll('*');
            for (const element of Array.from(elements)) {
                if (element.tagName.toLowerCase() === componentName.toLowerCase()) {
                    return element;
                }

                // Check shadow roots if available
                if (element.shadowRoot) {
                    const found = searchInShadowRoots(element.shadowRoot);
                    if (found) return found;
                }
            }
            return null;
        };

        component = searchInShadowRoots(document);
    }

    return component;
}

/**
 * Finds elements with a specific selector within a host element's shadow root
 * @param host The host element containing the shadow root
 * @param selector The CSS selector to find elements (e.g., '.background-image')
 * @returns An array of found elements or empty array if none found or no shadow root
 */
export function findComponentsInShadowRoot(host: ReactiveControllerHost, selector: string): HTMLElement[] {
    const element = host as unknown as HTMLElement & { shadowRoot: ShadowRoot };
    if (!element.shadowRoot) return [];

    return  Array.from(element.shadowRoot.querySelectorAll(selector)) as HTMLElement[];
}

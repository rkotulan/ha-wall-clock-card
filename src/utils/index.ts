/**
 * Utils module index file
 * Re-exports all utility modules
 */

// Re-export logger module
export * from './logger';

// Re-export localization module
export * from './localize';

// Re-export controllers module
export * from './controllers';

/**
 * Creates a deep copy of an object and sets a property value by path
 * @param obj The object to copy and modify
 * @param propertyPath The property path (can include dots for nested properties)
 * @param value The new value to set
 * @returns A new object with the updated property
 */
export function setPropertyByPath(obj: any, propertyPath: string, value: any): any {
    // Create a deep copy of the object
    const result = JSON.parse(JSON.stringify(obj));

    // Split the property path by dots
    const parts = propertyPath.split('.');

    // Navigate to the target property
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        // Create the property if it doesn't exist
        if (current[part] === undefined) {
            current[part] = {};
        }
        current = current[part];
    }

    // Set the value on the target property
    const lastPart = parts[parts.length - 1];
    current[lastPart] = value;

    return result;
}

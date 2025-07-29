// Import types from the types.ts file
import {
  TimeOfDay,
  Weather,
  ValidWeather,
  ValidTimeOfDay,
  BackgroundImage,
  ImageSourceConfig,
  ImageSource
} from './types';

// Re-export types for backward compatibility
export {
  TimeOfDay,
  Weather,
  ValidWeather,
  ValidTimeOfDay,
  BackgroundImage,
  ImageSourceConfig,
  ImageSource
};

/**
 * Get the current time of day based on the current hour
 * @returns The current time of day
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if ((hour >= 5 && hour < 9) || (hour >= 17 && hour < 21)) {
    return TimeOfDay.SunriseSunset;
  } else if (hour >= 9 && hour < 17) {
    return TimeOfDay.Day;
  } else if (hour >= 21 || hour < 5) {
    return TimeOfDay.Night;
  }

  return TimeOfDay.Unspecified;
}

/**
 * Find an attribute in a path
 * @param path The path to search in
 * @param validValues Array of valid values to look for
 * @returns The found attribute, or undefined if not found
 */
export function FindAttributeInPath(path: string, validValues: string[]): string | undefined {
  if (!path) return undefined;

  // Convert path to lowercase for case-insensitive comparison
  const lowerPath = path.toLowerCase();

  // Look for each valid value in the path
  for (const value of validValues) {
    if (lowerPath.includes(value.toLowerCase().replace(' ', '-'))) {
      return value;
    }
  }

  return undefined;
}


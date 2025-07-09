/**
 * Lokalify - A simple localization system for the Wall Clock Card
 * Provides translations directly embedded in the JS file
 */

// Define the structure of the translations
// This allows for both flat key-value pairs and nested objects
export interface Translations {
  [key: string]: string | Translations;
}

// Import translations directly from JSON files
import csTranslations from './translations/cs.json';
import deTranslations from './translations/de.json';
import skTranslations from './translations/sk.json';
import plTranslations from './translations/pl.json';
import esTranslations from './translations/es.json';
import frTranslations from './translations/fr.json';
import ruTranslations from './translations/ru.json';
import itTranslations from './translations/it.json';
import ptTranslations from './translations/pt.json';
import nlTranslations from './translations/nl.json';
import svTranslations from './translations/sv.json';
import noTranslations from './translations/no.json';
import daTranslations from './translations/da.json';
import fiTranslations from './translations/fi.json';
import elTranslations from './translations/el.json';
import huTranslations from './translations/hu.json';
import roTranslations from './translations/ro.json';

// Map of language codes to translations
const embeddedTranslations: { [language: string]: Translations } = {
  cs: csTranslations,
  de: deTranslations,
  sk: skTranslations,
  pl: plTranslations,
  es: esTranslations,
  fr: frTranslations,
  ru: ruTranslations,
  it: itTranslations,
  pt: ptTranslations,
  nl: nlTranslations,
  sv: svTranslations,
  no: noTranslations,
  da: daTranslations,
  fi: fiTranslations,
  el: elTranslations,
  hu: huTranslations,
  ro: roTranslations
};

// Cache for loaded translations by language
let loadedTranslations: { [language: string]: Translations } = {};

/**
 * Load translations for a specific language
 * @param language The language code (cs, de, sk, pl, es, fr, ru)
 * @returns A promise that resolves when the translations are loaded
 */
export async function loadLanguageTranslations(language: string): Promise<void> {
  try {
    // Use embedded translations instead of fetching from external files
    if (embeddedTranslations[language]) {
      loadedTranslations[language] = embeddedTranslations[language];
      console.log(`[lokalify] Loaded translations for ${language}`);
    } else {
      console.warn(`[lokalify] No embedded translations found for ${language}`);
    }
  } catch (error) {
    console.error(`[lokalify] Error loading translations for ${language}: ${error}`);
  }
}

/**
 * Load translations for all supported languages
 * @returns A promise that resolves when all translations are loaded
 */
export async function loadTranslations(): Promise<void> {
  const languages = getSupportedLanguages();
  const promises = languages.map(lang => loadLanguageTranslations(lang));
  await Promise.all(promises);
}

/**
 * Get a value from a nested object using a dot-separated path
 * @param obj The object to search in
 * @param path The dot-separated path to the value
 * @returns The value at the path, or undefined if not found
 */
function getNestedValue(obj: any, path: string): any {
  // Handle flat keys directly
  if (obj[path] !== undefined) {
    return obj[path];
  }

  // Handle nested paths
  const parts = path.split('.');
  let current = obj;

  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[part];
  }

  return current;
}

/**
 * Get a translation for a key in the specified language
 * @param key The translation key (can be a dot-separated path for nested objects)
 * @param language The language code (cs, de, sk, pl, es, fr, ru)
 * @param defaultValue The default value to return if the translation is not found
 * @returns The translated string, or the default value if not found
 */
export function translate(key: string, language: string, defaultValue: string | null = key): string {
  // Default to English if language is not supported
  if (!getSupportedLanguages().includes(language)) {
    return defaultValue !== null ? defaultValue : key;
  }

  // Get the translations for the specified language
  const translations = loadedTranslations[language];
  if (!translations) {
    return defaultValue !== null ? defaultValue : key;
  }

  // Try to get the translation using the nested path
  const translation = getNestedValue(translations, key);

  // Return the translation if it exists and is a string, otherwise return the default value
  return typeof translation === 'string' ? translation : (defaultValue !== null ? defaultValue : key);
}

/**
 * Get all supported languages
 * @returns An array of language codes
 */
export function getSupportedLanguages(): string[] {
  return ['cs', 'de', 'sk', 'pl', 'es', 'fr', 'ru', 'it', 'pt', 'nl', 'sv', 'no', 'da', 'fi', 'el', 'hu', 'ro'];
}

/**
 * Get the language options for the editor
 * @returns An array of language options with value and label
 */
export function getLanguageOptions(): { value: string, label: string }[] {
  return [
    {value: 'cs', label: 'Czech (Čeština)'},
    {value: 'da', label: 'Danish (Dansk)'},
    {value: 'de', label: 'German (Deutsch)'},
    {value: 'el', label: 'Greek (Ελληνικά)'},
    {value: 'es', label: 'Spanish (Español)'},
    {value: 'fi', label: 'Finnish (Suomi)'},
    {value: 'fr', label: 'French (Français)'},
    {value: 'hu', label: 'Hungarian (Magyar)'},
    {value: 'it', label: 'Italian (Italiano)'},
    {value: 'nl', label: 'Dutch (Nederlands)'},
    {value: 'no', label: 'Norwegian (Norsk)'},
    {value: 'pl', label: 'Polish (Polski)'},
    {value: 'pt', label: 'Portuguese (Português)'},
    {value: 'ro', label: 'Romanian (Română)'},
    {value: 'ru', label: 'Russian (Русский)'},
    {value: 'sk', label: 'Slovak (Slovenčina)'},
    {value: 'sv', label: 'Swedish (Svenska)'},
  ];
}

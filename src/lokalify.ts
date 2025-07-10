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
import daTranslations from './translations/da.json';
import deTranslations from './translations/de.json';
import elTranslations from './translations/el.json';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import fiTranslations from './translations/fi.json';
import frTranslations from './translations/fr.json';
import huTranslations from './translations/hu.json';
import itTranslations from './translations/it.json';
import nlTranslations from './translations/nl.json';
import noTranslations from './translations/no.json';
import plTranslations from './translations/pl.json';
import ptTranslations from './translations/pt.json';
import roTranslations from './translations/ro.json';
import ruTranslations from './translations/ru.json';
import skTranslations from './translations/sk.json';
import svTranslations from './translations/sv.json';

// Unified language definition with code, label, and translations
export interface LanguageDefinition {
  code: string;
  label: string;
  locale: string;
  translations: Translations;
}

// Single source of truth for all language-related data
export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: 'cs', label: 'Czech (Čeština)', locale: 'cs-CZ', translations: csTranslations },
  { code: 'da', label: 'Danish (Dansk)', locale: 'da-DK', translations: daTranslations },
  { code: 'de', label: 'German (Deutsch)', locale: 'de-DE', translations: deTranslations },
  { code: 'el', label: 'Greek (Ελληνικά)', locale: 'el-GR', translations: elTranslations },
  { code: 'en', label: 'English', locale: 'en-US', translations: enTranslations },
  { code: 'es', label: 'Spanish (Español)', locale: 'es-ES', translations: esTranslations },
  { code: 'fi', label: 'Finnish (Suomi)', locale: 'fi-FI', translations: fiTranslations },
  { code: 'fr', label: 'French (Français)', locale: 'fr-FR', translations: frTranslations },
  { code: 'hu', label: 'Hungarian (Magyar)', locale: 'hu-HU', translations: huTranslations },
  { code: 'it', label: 'Italian (Italiano)', locale: 'it-IT', translations: itTranslations },
  { code: 'nl', label: 'Dutch (Nederlands)', locale: 'nl-NL', translations: nlTranslations },
  { code: 'no', label: 'Norwegian (Norsk)', locale: 'no-NO', translations: noTranslations },
  { code: 'pl', label: 'Polish (Polski)', locale: 'pl-PL', translations: plTranslations },
  { code: 'pt', label: 'Portuguese (Português)', locale: 'pt-PT', translations: ptTranslations },
  { code: 'ro', label: 'Romanian (Română)', locale: 'ro-RO', translations: roTranslations },
  { code: 'ru', label: 'Russian (Русский)', locale: 'ru-RU', translations: ruTranslations },
  { code: 'sk', label: 'Slovak (Slovenčina)', locale: 'sk-SK', translations: skTranslations },
  { code: 'sv', label: 'Swedish (Svenska)', locale: 'sv-SE', translations: svTranslations },
];

// Map of language codes to translations (derived from SUPPORTED_LANGUAGES)
const embeddedTranslations: { [language: string]: Translations } = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(lang => [lang.code, lang.translations])
);

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
  console.log(`[lokalify] Loading all translations`);
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
  return SUPPORTED_LANGUAGES.map(lang => lang.code);
}

/**
 * Get the language options for the editor
 * @returns An array of language options with value and label
 */
export function getLanguageOptions(): { value: string, label: string }[] {
  return SUPPORTED_LANGUAGES.map(lang => ({
    value: lang.code,
    label: lang.label
  }));
}

/**
 * Map a language code to a locale code for use with toLocaleString, toLocaleDateString, etc.
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @returns The corresponding locale code (cs-CZ, de-DE, etc.)
 */
export function getLocaleForLanguage(language: string): string {
  // Find the language in SUPPORTED_LANGUAGES
  const langDef = SUPPORTED_LANGUAGES.find(lang => lang.code === language);

  // Return the locale if found, otherwise default to English (en-US)
  return langDef?.locale || 'en-US';
}

/**
 * Format a date for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The Intl.DateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted date string
 */
export function formatDate(
  date: Date, 
  language: string, 
  options: Intl.DateTimeFormatOptions = {}, 
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Format the date
  return date.toLocaleDateString(locale, formatOptions);
}

/**
 * Format a time for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The Intl.DateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted time string
 */
export function formatTime(
  date: Date, 
  language: string, 
  options: Intl.DateTimeFormatOptions = {}, 
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Format the time
  return date.toLocaleTimeString(locale, formatOptions);
}

/**
 * Format a date and time for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The Intl.DateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted date and time string
 */
export function formatDateTime(
  date: Date, 
  language: string, 
  options: Intl.DateTimeFormatOptions = {}, 
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Format the date and time
  return date.toLocaleString(locale, formatOptions);
}

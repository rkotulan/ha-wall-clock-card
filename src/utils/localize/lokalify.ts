/**
 * Lokalify - A simple localization system for the Wall Clock Card
 * Provides translations directly embedded in the JS file
 */
import { logger } from '../logger';

// Define the structure of the translations
// This allows for both flat key-value pairs and nested objects
export interface Translations {
  [key: string]: string | Translations;
}

// Import translations directly from JSON files
import bgTranslations from '../../translations/bg.json';
import csTranslations from '../../translations/cs.json';
import daTranslations from '../../translations/da.json';
import deTranslations from '../../translations/de.json';
import elTranslations from '../../translations/el.json';
import enTranslations from '../../translations/en.json';
import esTranslations from '../../translations/es.json';
import fiTranslations from '../../translations/fi.json';
import frTranslations from '../../translations/fr.json';
import huTranslations from '../../translations/hu.json';
import itTranslations from '../../translations/it.json';
import nlTranslations from '../../translations/nl.json';
import noTranslations from '../../translations/no.json';
import plTranslations from '../../translations/pl.json';
import ptTranslations from '../../translations/pt.json';
import roTranslations from '../../translations/ro.json';
import ruTranslations from '../../translations/ru.json';
import skTranslations from '../../translations/sk.json';
import svTranslations from '../../translations/sv.json';

// Unified language definition with code, label, and translations
export interface LanguageDefinition {
  code: string;
  label: string;
  locale: string;
  translations: Translations;
}

// Single source of truth for all language-related data
export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: 'bg', label: 'Bulgarian (Български)', locale: 'bg-BG', translations: bgTranslations },
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
export async function loadLanguageTranslationsAsync(language: string): Promise<void> {
  try {
    // Use embedded translations instead of fetching from external files
    if (embeddedTranslations[language]) {
      loadedTranslations[language] = embeddedTranslations[language];
      logger.debug(`Loaded translations for ${language}`);
    } else {
      logger.warn(`No embedded translations found for ${language}`);
    }
  } catch (error) {
    logger.error(`Error loading translations for ${language}: ${error}`);
  }
}

/**
 * Load translations for all supported languages
 * @returns A promise that resolves when all translations are loaded
 */
export async function loadTranslationsAsync(): Promise<void> {
  logger.debug(`Loading all translations`);
  const languages = getSupportedLanguages();
  const promises = languages.map(lang => loadLanguageTranslationsAsync(lang));
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
  let translations = loadedTranslations[language];

  // If translations for this language aren't loaded yet, load them synchronously
  if (!translations) {
    // Use embedded translations directly
    if (embeddedTranslations[language]) {
      loadedTranslations[language] = embeddedTranslations[language];
      translations = loadedTranslations[language];
      logger.debug(`Loaded translations for ${language} on-demand`);
    } else {
      logger.warn(`No embedded translations found for ${language}`);
      return defaultValue !== null ? defaultValue : key;
    }
  }

  // Try to get the translation using the nested path
  const translation = getNestedValue(translations, key);

  // Log the result for debugging
  if (typeof translation === 'string') {
    logger.debug(`Translation found for key "${key}" in language "${language}": "${translation}"`);
  } else {
    logger.debug(`No translation found for key "${key}" in language "${language}", using default: "${defaultValue !== null ? defaultValue : key}"`);
  }

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

// Define a custom type that extends Intl.DateTimeFormatOptions to include 'hidden'
export type ExtendedDateTimeFormatOptions = Omit<
    Intl.DateTimeFormatOptions,
    'weekday' | 'year' | 'month' | 'day' | 'second'
> & {
  weekday?: 'long' | 'short' | 'narrow' | 'hidden';
  year?: 'numeric' | '2-digit' | 'hidden';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | 'hidden';
  day?: 'numeric' | '2-digit' | 'hidden';
  second?: 'numeric' | '2-digit' | 'hidden';
  custom?: string;
};

/**
 * Apply a custom format string to a date
 * @param date The date to format
 * @param language The language code
 * @param format The custom format string (e.g., 'EEEE, MMMM d, yyyy')
 * @param timeZone Optional time zone
 * @returns The formatted date string
 */
function applyCustomFormat(date: Date, language: string, format: string, timeZone?: string): string {
  const locale = getLocaleForLanguage(language);

  // Map format tokens to their respective Intl component types
  const tokenToType: Record<string, string> = {
    EEEE: 'weekday',
    EEE: 'weekday',
    MMMM: 'month',
    MMM: 'month',
    MM: 'month',
    M: 'month',
    dd: 'day',
    d: 'day',
    yyyy: 'year',
    yy: 'year',
    HH: 'hour',
    H: 'hour',
    mm: 'minute',
    m: 'minute',
    ss: 'second',
    s: 'second',
  };

  // Create formatters for different components
  // We use objects to avoid creating new formatters in every replace call if we had many
  const formatters: Record<string, Intl.DateTimeFormat> = {
    EEEE: new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone }),
    EEE: new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone }),
    MMMM: new Intl.DateTimeFormat(locale, { month: 'long', timeZone }),
    MMM: new Intl.DateTimeFormat(locale, { month: 'short', timeZone }),
    MM: new Intl.DateTimeFormat(locale, { month: '2-digit', timeZone }),
    M: new Intl.DateTimeFormat(locale, { month: 'numeric', timeZone }),
    dd: new Intl.DateTimeFormat(locale, { day: '2-digit', timeZone }),
    d: new Intl.DateTimeFormat(locale, { day: 'numeric', timeZone }),
    yyyy: new Intl.DateTimeFormat(locale, { year: 'numeric', timeZone }),
    yy: new Intl.DateTimeFormat(locale, { year: '2-digit', timeZone }),
    HH: new Intl.DateTimeFormat(locale, { hour: '2-digit', hour12: false, timeZone }),
    H: new Intl.DateTimeFormat(locale, { hour: 'numeric', hour12: false, timeZone }),
    mm: new Intl.DateTimeFormat(locale, { minute: '2-digit', timeZone }),
    m: new Intl.DateTimeFormat(locale, { minute: 'numeric', timeZone }),
    ss: new Intl.DateTimeFormat(locale, { second: '2-digit', timeZone }),
    s: new Intl.DateTimeFormat(locale, { second: 'numeric', timeZone }),
  };

  const regex = /EEEE|EEE|MMMM|MMM|MM|M|dd|d|yyyy|yy|HH|H|mm|m|ss|s/g;

  return format.replace(regex, (match) => {
    const type = tokenToType[match];
    const parts = formatters[match].formatToParts(date);
    // Find the part that matches the type we're looking for
    // This ignores literal parts like dots or spaces added by the locale
    return parts.find(part => part.type === type)?.value || '';
  });
}

/**
 * Format a date for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The ExtendedDateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted date string
 */
export function formatDate(
  date: Date,
  language: string,
  options: ExtendedDateTimeFormatOptions = {},
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // If custom format is specified, use it
  if (formatOptions.custom) {
    return applyCustomFormat(date, language, formatOptions.custom, timeZone);
  }

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Convert 'hidden' values to undefined
  // Handle each property that might be 'hidden' explicitly
  if (formatOptions.weekday === 'hidden') formatOptions.weekday = undefined;
  if (formatOptions.year === 'hidden') formatOptions.year = undefined;
  if (formatOptions.month === 'hidden') formatOptions.month = undefined;
  if (formatOptions.day === 'hidden') formatOptions.day = undefined;

  // Check if all date components are hidden or undefined
  const allDateComponentsHidden = 
    (formatOptions.weekday === undefined ) &&
    (formatOptions.year === undefined) &&
    (formatOptions.month === undefined ) &&
    (formatOptions.day === undefined);

  // If all date components are hidden, return an empty string
  if (allDateComponentsHidden) {
    return '';
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Special handling for month: short to ensure it's displayed as a name, not a number
  if (formatOptions.month === 'short') {
    // Create a formatter specifically for the month
    const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'short', timeZone });
    const monthName = monthFormatter.format(date);

    // Create a formatter for the rest of the date parts
    const otherOptions = { ...formatOptions };
    delete otherOptions.month; // Remove month from options since we'll handle it separately

    // Format the date without the month
    let formattedDate = date.toLocaleDateString(locale, otherOptions as Intl.DateTimeFormatOptions);

    // If day is specified as 2-digit, we need to ensure the month is properly placed
    if (formatOptions.day === '2-digit') {
      // Replace any numeric month (like "7" in "11.7.") with the short month name
      formattedDate = formattedDate.replace(/(\d+)[\.\/\-](\d+)\.?/, `$1. ${monthName}`);

      // If the replacement didn't work (no numeric month found), just append the month
      if (!formattedDate.includes(monthName)) {
        formattedDate = `${formattedDate} ${monthName}`;
      }
    } else {
      // For other formats, just use the standard formatter
      formattedDate = date.toLocaleDateString(locale, formatOptions as Intl.DateTimeFormatOptions);
    }

    return formattedDate;
  }

  // For all other cases, use the standard formatter
  return date.toLocaleDateString(locale, formatOptions as Intl.DateTimeFormatOptions);
}

/**
 * Format a time for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The ExtendedDateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted time string
 */
export function formatTime(
  date: Date,
  language: string,
  options: ExtendedDateTimeFormatOptions = {},
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // If custom format is specified, use it
  if (formatOptions.custom) {
    return applyCustomFormat(date, language, formatOptions.custom, timeZone);
  }

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Convert 'hidden' values to undefined
  // Handle each property that might be 'hidden' explicitly
  if (formatOptions.second === 'hidden') formatOptions.second = undefined;

  const allTimeComponentsHidden =
      (formatOptions.hour === undefined ) &&
      (formatOptions.minute === undefined) &&
      (formatOptions.second === undefined );

  // If all date components are hidden, return an empty string
  if (allTimeComponentsHidden) {
    return '';
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Format the time
  return date.toLocaleTimeString(locale, formatOptions as Intl.DateTimeFormatOptions);
}

/**
 * Format a date and time for display using the specified language and options
 * @param date The date to format
 * @param language The language code (cs, de, sk, pl, es, fr, ru, en, etc.)
 * @param options The ExtendedDateTimeFormatOptions to use for formatting
 * @param timeZone Optional time zone to use for formatting
 * @returns The formatted date and time string
 */
export function formatDateTime(
  date: Date,
  language: string,
  options: ExtendedDateTimeFormatOptions = {},
  timeZone?: string
): string {
  // Create a copy of the options to avoid modifying the original
  const formatOptions = { ...options };

  // If custom format is specified, use it
  if (formatOptions.custom) {
    return applyCustomFormat(date, language, formatOptions.custom, timeZone);
  }

  // Add time zone if provided
  if (timeZone) {
    formatOptions.timeZone = timeZone;
  }

  // Convert 'hidden' values to undefined
  // Handle each property that might be 'hidden' explicitly
  if (formatOptions.weekday === 'hidden') formatOptions.weekday = undefined;
  if (formatOptions.year === 'hidden') formatOptions.year = undefined;
  if (formatOptions.month === 'hidden') formatOptions.month = undefined;
  if (formatOptions.day === 'hidden') formatOptions.day = undefined;
  if (formatOptions.second === 'hidden') formatOptions.second = undefined;

  const allDateTimeComponentsHidden =
      (formatOptions.weekday === undefined ) &&
      (formatOptions.year === undefined) &&
      (formatOptions.month === undefined ) &&
      (formatOptions.day === undefined) &&
      (formatOptions.hour === undefined ) &&
      (formatOptions.minute === undefined) &&
      (formatOptions.second === undefined );

  // If all date time components are hidden, return an empty string
  if (allDateTimeComponentsHidden) {
    return '';
  }

  // Get the locale for the language
  const locale = getLocaleForLanguage(language);

  // Format the date and time
  return date.toLocaleString(locale, formatOptions as Intl.DateTimeFormatOptions);
}

/**
 * Translations for weather conditions
 * Supports Czech (cs), German (de), Slovak (sk), Polish (pl), Spanish (es), and French (fr)
 */

export interface WeatherTranslations {
  [key: string]: {
    [language: string]: string;
  };
}

/**
 * Translations for weather conditions
 * The keys are the standard OpenWeatherMap conditions
 * The values are objects with language codes as keys and translations as values
 */
export const weatherTranslations: WeatherTranslations = {
  'all': {
    'cs': 'Všechny povětrnostní podmínky',
    'de': 'Alle Wetterbedingungen',
    'sk': 'Všetky poveternostné podmienky',
    'pl': 'Wszystkie warunki pogodowe',
    'es': 'Todas las condiciones climáticas',
    'fr': 'Toutes les conditions météorologiques'
  },
  'clouds': {
    'cs': 'Oblačno',
    'de': 'Bewölkt',
    'sk': 'Oblačno',
    'pl': 'Zachmurzenie',
    'es': 'Nubes',
    'fr': 'Nuages'
  },
  'clear sky': {
    'cs': 'Jasná obloha',
    'de': 'Klarer Himmel',
    'sk': 'Jasná obloha',
    'pl': 'Czyste niebo',
    'es': 'Cielo despejado',
    'fr': 'Ciel dégagé'
  },
  'few clouds': {
    'cs': 'Málo oblačnosti',
    'de': 'Wenige Wolken',
    'sk': 'Malá oblačnosť',
    'pl': 'Niewielkie zachmurzenie',
    'es': 'Pocas nubes',
    'fr': 'Quelques nuages'
  },
  'scattered clouds': {
    'cs': 'Polojasno',
    'de': 'Aufgelockerte Bewölkung',
    'sk': 'Polojasno',
    'pl': 'Rozproszone chmury',
    'es': 'Nubes dispersas',
    'fr': 'Nuages épars'
  },
  'broken clouds': {
    'cs': 'Oblačno',
    'de': 'Bewölkt',
    'sk': 'Oblačno',
    'pl': 'Zachmurzenie',
    'es': 'Nubes rotas',
    'fr': 'Nuages fragmentés'
  },
  'shower rain': {
    'cs': 'Přeháňky',
    'de': 'Regenschauer',
    'sk': 'Prehánky',
    'pl': 'Przelotny deszcz',
    'es': 'Lluvia intermitente',
    'fr': 'Averses'
  },
  'rain': {
    'cs': 'Déšť',
    'de': 'Regen',
    'sk': 'Dážď',
    'pl': 'Deszcz',
    'es': 'Lluvia',
    'fr': 'Pluie'
  },
  'thunderstorm': {
    'cs': 'Bouřka',
    'de': 'Gewitter',
    'sk': 'Búrka',
    'pl': 'Burza',
    'es': 'Tormenta',
    'fr': 'Orage'
  },
  'snow': {
    'cs': 'Sněžení',
    'de': 'Schnee',
    'sk': 'Sneženie',
    'pl': 'Śnieg',
    'es': 'Nieve',
    'fr': 'Neige'
  },
  'mist': {
    'cs': 'Mlha',
    'de': 'Nebel',
    'sk': 'Hmla',
    'pl': 'Mgła',
    'es': 'Niebla',
    'fr': 'Brouillard'
  },
  'light rain': {
    'cs': 'Slabý déšť',
    'de': 'Leichter Regen',
    'sk': 'Slabý dážď',
    'pl': 'Lekki deszcz',
    'es': 'Lluvia ligera',
    'fr': 'Pluie légère'
  }
};

/**
 * Get the translation for a weather condition
 * @param condition The weather condition to translate
 * @param language The language code (cs, de, sk, pl, es, fr)
 * @returns The translated weather condition, or the original condition if no translation is found
 */
export function translateWeatherCondition(condition: string, language: string): string {
  // Default to English if language is not supported
  if (!['cs', 'de', 'sk', 'pl', 'es', 'fr'].includes(language)) {
    return condition;
  }

  // Convert condition to lowercase for case-insensitive lookup
  const lowerCondition = condition.toLowerCase();

  // Simplify cloud conditions
  if (lowerCondition === 'few clouds' || lowerCondition === 'scattered clouds' || lowerCondition === 'broken clouds') {
    return weatherTranslations['clouds'][language];
  }

  // Simplify rain conditions
  if (lowerCondition === 'thunderstorm' || lowerCondition === 'shower rain') {
    return weatherTranslations['rain'][language];
  }

  // Return the translation if it exists, otherwise return the original condition
  return weatherTranslations[lowerCondition]?.[language] || condition;
}

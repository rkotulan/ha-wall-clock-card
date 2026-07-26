export type WeatherIconKind =
    | 'clear-day'
    | 'clear-night'
    | 'partly-cloudy-day'
    | 'partly-cloudy-night'
    | 'cloudy'
    | 'rain'
    | 'pouring'
    | 'thunderstorm'
    | 'snow'
    | 'sleet'
    | 'fog'
    | 'hail'
    | 'windy'
    | 'exceptional';

/**
 * Resolves provider-specific conditions and icon URLs to the card's own
 * weather artwork. The URL is used only as a day/night hint; it is never
 * fetched by the custom icon component.
 */
export function resolveWeatherIconKind(condition?: string, source?: string): WeatherIconKind {
    const value = `${condition ?? ''} ${source ?? ''}`.toLowerCase();
    const night = /clear-night|partly-cloudy-night|_night|-night|0[1-2]n(?:\D|$)/.test(value);
    const openWeatherMapCode = value.match(/(?:^|\/)(01|02|03|04|09|10|11|13|50)[dn](?:@|\D|$)/)?.[1];

    if (/exceptional|tornado|hurricane|cyclone/.test(value)) return 'exceptional';
    if (/lightning|thunder/.test(value)) return 'thunderstorm';
    if (/snowy-rainy|sleet|freezing.rain|rain.and.snow/.test(value)) return 'sleet';
    if (/pouring|heavy.intensity.rain|extreme-rain|heavyrain/.test(value)) return 'pouring';
    if (/hail|ice.pellet/.test(value)) return 'hail';
    if (/snow|flurr/.test(value)) return 'snow';
    if (/rain|drizzle|shower/.test(value)) return 'rain';
    if (/fog|mist|haze|smoke|dust/.test(value)) return 'fog';
    if (/wind|squall/.test(value)) return 'windy';

    // OpenWeatherMap localizes condition descriptions, so its stable icon code
    // is the reliable fallback when the text is not English.
    switch (openWeatherMapCode) {
        case '02':
            return night ? 'partly-cloudy-night' : 'partly-cloudy-day';
        case '03':
        case '04':
            return 'cloudy';
        case '09':
            return 'pouring';
        case '10':
            return 'rain';
        case '11':
            return 'thunderstorm';
        case '13':
            return 'snow';
        case '50':
            return 'fog';
        case '01':
            return night ? 'clear-night' : 'clear-day';
    }

    if (/partlycloudy|partly.cloudy|scattered.cloud|few.cloud|fair_/.test(value)) {
        return night ? 'partly-cloudy-night' : 'partly-cloudy-day';
    }
    if (/cloud|overcast|broken.cloud/.test(value)) return 'cloudy';
    if (night) return 'clear-night';
    return 'clear-day';
}

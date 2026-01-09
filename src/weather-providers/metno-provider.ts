import { WeatherProvider, WeatherProviderConfig, WeatherData } from './weather-provider';
import { Weather } from '../image-sources/types';
import { logger } from '../utils';

/**
 * Configuration for the Met.no weather provider
 */
export interface MetNoConfig extends WeatherProviderConfig {
  latitude: number;
  longitude: number;
}

/**
 * Met.no weather provider plugin
 * Fetches weather data from Meteorologisk institutt (Met.no) API
 */
export class MetNoProvider implements WeatherProvider {
  readonly id = 'metno';
  readonly name = 'Met.no';
  readonly description = 'Weather forecasts from Meteorologisk institutt (Met.no)';

  /**
   * Fetch weather data from Met.no
   * @param config Configuration for the Met.no provider
   * @returns Promise that resolves to weather data
   */
  async fetchWeatherAsync(config: MetNoConfig): Promise<WeatherData> {
    const latitude = config.latitude || 59.9139; // Default to Oslo, Norway
    const longitude = config.longitude || 10.7522;

    try {
      const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
      
      // Use AllOrigins proxy to bypass CORS issues
      // Met.no doesn't support CORS and requires a specific User-Agent which cannot be set in browsers
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

      logger.debug(`[Met.no] Fetching weather from: ${url} via proxy`);

      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Met.no API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.properties || !data.properties.timeseries || !data.properties.timeseries.length) {
        throw new Error('No weather data available from Met.no');
      }

      return this.parseMetNoData(data);
    } catch (error) {
      logger.error('Error fetching weather data from Met.no:', error);
      throw error;
    }
  }

  /**
   * Parse Met.no API response into WeatherData
   * @param data Met.no API response
   * @returns Parsed WeatherData
   */
  private parseMetNoData(data: any): WeatherData {
    const timeseries = data.properties.timeseries;
    const current = timeseries[0];
    const currentDetails = current.data.instant.details;
    
    // Use next_1_hours or next_6_hours for current condition
    const currentSummary = current.data.next_1_hours?.summary || current.data.next_6_hours?.summary;
    const symbolCode = currentSummary?.symbol_code || 'clearsky_day';

    const weatherData: WeatherData = {
      current: {
        temperature: currentDetails.air_temperature,
        condition: this.mapSymbolToCondition(symbolCode),
        conditionUnified: this.mapSymbolToWeather(symbolCode),
        icon: this.getIconUrl(symbolCode),
        humidity: currentDetails.relative_humidity,
        windSpeed: currentDetails.wind_speed,
        pressure: currentDetails.air_pressure_at_sea_level,
      },
      daily: this.parseForecast(timeseries)
    };

    return weatherData;
  }

  /**
   * Parse forecast data from Met.no timeseries
   * @param timeseries Met.no timeseries data
   * @returns Array of daily forecast data
   */
  private parseForecast(timeseries: any[]): WeatherData['daily'] {
    const dailyForecast: WeatherData['daily'] = [];
    const days = new Map<string, any[]>();

    // Group items by day
    timeseries.forEach(item => {
      const date = new Date(item.time);
      const dateString = date.toISOString().split('T')[0];
      
      if (!days.has(dateString)) {
        days.set(dateString, []);
      }
      days.get(dateString)?.push(item);
    });

    // Process each day
    Array.from(days.entries()).forEach(([dateString, items]) => {
      let minTemp = Infinity;
      let maxTemp = -Infinity;
      let representativeSymbol = '';

      items.forEach(item => {
        const temp = item.data.instant.details.air_temperature;
        if (temp < minTemp) minTemp = temp;
        if (temp > maxTemp) maxTemp = temp;

        // Try to get a representative symbol (ideally around midday)
        const hour = new Date(item.time).getUTCHours();
        if (hour >= 10 && hour <= 14 && !representativeSymbol) {
          representativeSymbol = item.data.next_6_hours?.summary.symbol_code || 
                                 item.data.next_1_hours?.summary.symbol_code;
        }
      });

      // Fallback symbol if midday not found
      if (!representativeSymbol && items.length > 0) {
        representativeSymbol = items[0].data.next_6_hours?.summary.symbol_code || 
                               items[0].data.next_1_hours?.summary.symbol_code ||
                               'clearsky_day';
      }

      dailyForecast.push({
        date: new Date(dateString),
        temperatureMin: minTemp,
        temperatureMax: maxTemp,
        condition: this.mapSymbolToCondition(representativeSymbol),
        icon: this.getIconUrl(representativeSymbol)
      });
    });

    // Return the next 7 days (including today)
    return dailyForecast.slice(0, 7);
  }

  /**
   * Get the URL for a weather icon
   * @param symbolCode Met.no symbol code
   * @returns URL to the icon image
   */
  private getIconUrl(symbolCode: string): string {
    // Use jsDelivr CDN to fetch Met.no icons from their official repository
    // This is more reliable and avoids some of the issues with the static API
    return `https://cdn.jsdelivr.net/gh/metno/weathericons@main/weather/svg/${symbolCode}.svg`;
  }

  /**
   * Map Met.no symbol code to a condition key used in translations
   * @param symbol Met.no symbol code
   * @returns Condition key
   */
  private mapSymbolToCondition(symbol: string): string {
    // Remove day/night suffix
    const base = symbol.split('_')[0].toLowerCase();
    
    // Map Met.no symbols to existing translation keys in en.json if possible
    if (base.includes('thunder')) return 'thunderstorm';
    if (base.includes('heavysnow')) return 'snow';
    if (base.includes('lightsnow')) return 'snow';
    if (base.includes('snow')) return 'snow';
    if (base.includes('heavyrain')) return 'heavy_intensity_rain';
    if (base.includes('lightrain')) return 'light_rain';
    if (base.includes('rainshowers')) return 'shower_rain';
    if (base.includes('rain')) return 'rain';
    if (base.includes('sleet')) return 'rain';
    if (base === 'clearsky') return 'clear_sky';
    if (base === 'fair') return 'few_clouds';
    if (base === 'partlycloudy') return 'scattered_clouds';
    if (base === 'cloudy') return 'overcast_clouds';
    if (base === 'fog') return 'mist';

    return base;
  }

  /**
   * Map Met.no symbol code to the Weather enum
   * @param symbol Met.no symbol code
   * @returns Weather enum value
   */
  private mapSymbolToWeather(symbol: string): Weather {
    const base = symbol.split('_')[0];
    
    if (base === 'clearsky' || base === 'fair') {
      return Weather.ClearSky;
    }
    if (base === 'partlycloudy' || base === 'cloudy') {
      return Weather.Clouds;
    }
    if (base.includes('rain') || base.includes('drizzle') || base.includes('sleet') || base.includes('thunder')) {
      return Weather.Rain;
    }
    if (base.includes('snow')) {
      return Weather.Snow;
    }
    if (base === 'fog') {
      return Weather.Mist;
    }
    
    return Weather.All;
  }

  /**
   * Get the default configuration for the Met.no provider
   * @returns Default configuration
   */
  getDefaultConfig(): MetNoConfig {
    return {
      latitude: 59.9139, // Oslo, Norway
      longitude: 10.7522,
      units: 'metric',
      language: 'en'
    };
  }
}

// Export a singleton instance of the Met.no provider
export const metNoProvider = new MetNoProvider();

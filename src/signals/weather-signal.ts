import { signal } from '@lit-labs/signals';
import { Weather } from '../image-sources';

// Class for creating instances of weather signal
export class WeatherSignalProvider {
  private _weatherSignal = signal<Weather | undefined>(undefined);

  get weatherSignal() {
    return this._weatherSignal;
  }

  updateWeatherSignal(weather: Weather | undefined): void {
    this._weatherSignal.set(undefined);
    this._weatherSignal.set(weather);
  }
}

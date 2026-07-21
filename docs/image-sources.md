# Image sources

Background configuration is card-wide in 3.0:

```yaml
background:
  source: local
  opacity: 0.3
  rotationInterval: 90
  objectFit: cover
  images: []
  config: {}
```

`source` selects an image-source plugin. `images` is the local/background image
list; `config` contains source-specific values. The Designer exposes all built-in
sources.

## None

```yaml
background:
  source: none
```

No image is rendered.

## Local images

Files under `/config/www` are served as `/local/...` URLs:

```yaml
background:
  source: local
  images:
    - url: /local/wallpapers/default.jpg
      weather: all
      timeOfDay: unspecified
    - url: /local/wallpapers/rain-night.jpg
      weather: rain
      timeOfDay: night
```

Supported `weather` values are `all`, `clear sky`, `clouds`, `rain`, `snow` and
`mist`. Supported `timeOfDay` values are `unspecified`, `sunrise-sunset`, `day` and
`night`. The source first selects matching entries and falls back safely when no
exact match exists.

Home Assistant `media-source://...` URLs are also accepted. The card resolves them
through Home Assistant before loading the image.

## Picsum Photos

```yaml
background:
  source: picsum
  rotationInterval: 90
```

Picsum generates a random 1920×1080 landscape image URL for each fetch and does not
require an API key.

## Unsplash

```yaml
background:
  source: unsplash
  config:
    apiKey: YOUR_UNSPLASH_ACCESS_KEY
    category: nature,water
    count: 5
    contentFilter: high       # low | high
```

Unsplash requires an access key. The source requests landscape images from the
official random-photo endpoint and augments the query with the current weather and
time of day. Defaults are category `nature`, count `5` and content filter `high`.
Usage remains subject to Unsplash API limits and terms.

## Home Assistant sensor

The sensor source reads a string array from an entity's `files` attribute and caches
it for ten minutes:

```yaml
background:
  source: sensor
  config:
    entity: sensor.wallpaper_files
```

Example template sensor:

```yaml
template:
  - sensor:
      - name: Wallpaper files
        state: "{{ now().isoformat() }}"
        attributes:
          files: >-
            {{ [
              '/local/wallpapers/clear-day.jpg',
              'media-source://media_source/local/wallpapers/rain-night.jpg'
            ] }}
```

Filename/path text is used to infer weather and time categories for sensor entries.

## Custom image-source plugin

Implement `ImageSource` from `src/image-sources/types.ts` and register it before the
card initializes:

```typescript
import {
  ImageSource,
  ImageSourceConfig,
  TimeOfDay,
  Weather,
  registerImageSource,
} from './image-sources';

class MySource implements ImageSource {
  readonly id = 'my-source';
  readonly name = 'My source';
  readonly description = 'Images from my service';

  async fetchImagesAsync(
    config: ImageSourceConfig,
    weather: Weather,
    timeOfDay: TimeOfDay,
  ): Promise<string[]> {
    return [`https://example.test/image?weather=${weather}&time=${timeOfDay}`];
  }

  async getNextImageUrlAsync(
    config: ImageSourceConfig,
    weather: Weather,
    timeOfDay: TimeOfDay,
  ): Promise<string> {
    return (await this.fetchImagesAsync(config, weather, timeOfDay))[0] ?? '';
  }

  getDefaultConfig(): ImageSourceConfig {
    return {};
  }
}

registerImageSource(new MySource());
```

Built-ins extend `AbstractImageSource`, which supplies caching, randomized rotation
and weather/time filtering. Runtime registration is an advanced integration API;
the stock Designer has no generated form for arbitrary provider-specific fields.

Legacy 2.x `imageSource`, `imageConfig` and `backgroundImages` keys are migrated to
the structure above.

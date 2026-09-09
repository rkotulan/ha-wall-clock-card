import type {BackgroundConfig} from './layout-types';
import type {ImageSourceConfig} from '../image-sources/types';

/** Preserve provider-specific settings when passing the card config to the source. */
export function backgroundSourceConfig(background: BackgroundConfig): ImageSourceConfig {
    return {
        ...background.config,
        imageSourceId: background.source || 'none',
        backgroundImages: background.images,
    };
}

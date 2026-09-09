import type {HomeAssistant} from 'custom-card-helpers';
import {AbstractImageSource} from './abstract-image-source';
import type {ImageSourceConfig} from './types';
import {TimeOfDay, Weather} from './types';

export interface MediaItem {
    title: string;
    media_content_id: string;
    media_content_type?: string;
    can_expand?: boolean;
    can_play?: boolean;
    children?: MediaItem[];
}

export function mediaImages(item: MediaItem): string[] {
    return [...new Set((item.children ?? [item])
        .filter(child => !child.can_expand && child.media_content_type?.startsWith('image/'))
        .map(child => child.media_content_id)
        .filter(id => id.startsWith('media-source://')))];
}

export class MediaSource extends AbstractImageSource {
    readonly id = 'media-source';
    readonly name = 'Home Assistant media';
    readonly description = 'Photos from a Home Assistant media album or folder';
    private hass?: HomeAssistant;
    private selection = '';

    setHass(hass?: HomeAssistant): void { this.hass = hass; }
    getDefaultConfig(): ImageSourceConfig { return {mediaContentId: ''}; }

    async getNextImageUrlAsync(config: ImageSourceConfig, weather: Weather, time: TimeOfDay): Promise<string> {
        const selection = String(config.mediaContentId ?? '');
        if (selection !== this.selection) {
            this.selection = selection;
            this.imageUrlCache.clear();
            this.currentIndex = 0;
            this.cacheFullyCycled = false;
        }
        return super.getNextImageUrlAsync(config, weather, time);
    }

    protected async fetchImagesInternalAsync(config: ImageSourceConfig): Promise<string[]> {
        const id = String(config.mediaContentId ?? '');
        if (!id) return [];
        if (!id.startsWith('media-source://')) throw new Error('Select a Home Assistant media album or folder');
        if (!this.hass) throw new Error('Home Assistant is not connected');
        const media = await this.hass.callWS<MediaItem>({
            type: 'media_source/browse_media', media_content_id: id,
        });
        // Browse only the selected folder: do not crawl entire photo libraries.
        return mediaImages(media);
    }
}

export const mediaSource = new MediaSource();

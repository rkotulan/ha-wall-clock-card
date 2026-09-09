import {MediaSource, mediaImages, MediaItem} from '../src/image-sources/media-source';
import {Weather, TimeOfDay} from '../src/image-sources/types';
import {getImageSource} from '../src/image-sources/image-source-factory';
import {BackgroundImageManager} from '../src/image-sources/background-image-manager';
import {backgroundSourceConfig} from '../src/core/background-source-config';

const photo = (id: string): MediaItem => ({title: id, media_content_id: `media-source://test/${id}`, media_content_type: 'image/jpeg'});
const album = (children: MediaItem[]): MediaItem => ({title: 'Album', media_content_id: 'media-source://test/album', can_expand: true, children});
const weather = Weather.All;
const time = TimeOfDay.Unspecified;

describe('Home Assistant media backgrounds', () => {
    it('only selects direct image children and removes duplicates', () => {
        expect(mediaImages(album([photo('one'), photo('one'),
            {...photo('video'), media_content_type: 'video/mp4'},
            {...photo('folder'), can_expand: true, children: [photo('nested')]},
            {...photo('external'), media_content_id: 'http://internal/private.jpg'},
        ]))).toEqual(['media-source://test/one']);
        expect(mediaImages(album([]))).toEqual([]);
    });

    it('cycles without repeats and refreshes the album on the next cycle', async () => {
        const source = new MediaSource();
        const callWS = jest.fn().mockResolvedValue(album([photo('one'), photo('two')]));
        source.setHass({callWS} as never);
        const config = {mediaContentId: 'media-source://test/album'};
        const first = await source.getNextImageUrlAsync(config, weather, time);
        const second = await source.getNextImageUrlAsync(config, weather, time);
        expect(new Set([first, second]).size).toBe(2);
        expect(callWS).toHaveBeenCalledTimes(1);
        callWS.mockResolvedValue(album([photo('new')]));
        expect(await source.getNextImageUrlAsync(config, weather, time)).toBe('media-source://test/new');
        expect(callWS).toHaveBeenCalledTimes(2);
    });

    it('resets the queue when the selected album changes', async () => {
        const source = new MediaSource();
        const callWS = jest.fn().mockResolvedValueOnce(album([photo('old1'), photo('old2')]))
            .mockResolvedValueOnce(album([photo('new')]));
        source.setHass({callWS} as never);
        await source.getNextImageUrlAsync({mediaContentId:'media-source://test/old'}, weather, time);
        expect(await source.getNextImageUrlAsync({mediaContentId:'media-source://test/new'}, weather, time))
            .toBe('media-source://test/new');
    });

    it('creates an independent provider for each card', () => {
        expect(getImageSource('media-source')).not.toBe(getImageSource('media-source'));
    });

    it('does not browse before an album is selected and recovers after a browse failure', async () => {
        const source = new MediaSource();
        const callWS = jest.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(album([photo('one')]));
        source.setHass({callWS} as never);
        expect(await source.getNextImageUrlAsync({}, weather, time)).toBe('');
        expect(callWS).not.toHaveBeenCalled();
        const config = {mediaContentId:'media-source://test/album'};
        await expect(source.getNextImageUrlAsync(config, weather, time)).rejects.toThrow('offline');
        expect(await source.getNextImageUrlAsync(config, weather, time)).toBe('media-source://test/one');
    });

    it('resolves a fresh authorized URL for every display and fails closed', async () => {
        let resolution = 0;
        const callWS = jest.fn(async (request: {type: string}) => {
            if (request.type === 'media_source/browse_media') return album([photo('one')]);
            return {url: `/immich/photo?authSig=${++resolution}`, mime_type:'image/jpeg'};
        });
        const manager = new BackgroundImageManager({callWS} as never);
        manager.initialize(backgroundSourceConfig({
            source: 'media-source',
            config: {mediaContentId: 'media-source://test/album', mediaTitle: 'Album'},
        }));
        expect(await manager.getNextImageUrlAsync(weather, time)).toBe('/immich/photo?authSig=1');
        expect(callWS).toHaveBeenCalledWith({
            type: 'media_source/browse_media', media_content_id: 'media-source://test/album',
        });
        expect(await manager.getNextImageUrlAsync(weather, time)).toBe('/immich/photo?authSig=2');
        callWS.mockImplementation(async request => {
            if (request.type === 'media_source/browse_media') return album([photo('one')]);
            throw new Error('unauthorized');
        });
        expect(await manager.getNextImageUrlAsync(weather, time)).toBe('');
    });
});

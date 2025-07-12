import { ImageSourceConfig, TimeOfDay, Weather } from './image-source';
import { AbstractImageSource } from './abstract-image-source';
import { createLogger } from '../utils/logger';

/**
 * Configuration for the Unsplash image source
 */
export interface UnsplashSourceConfig extends ImageSourceConfig {
    // API key for Unsplash API (required for API mode)
    apiKey?: string;

    // Whether to use the official Unsplash API (requires apiKey)
    // Note: This property is kept for backward compatibility but is no longer used
    // as the API is always used when an API key is provided
    useApi?: boolean;

    // Content filter for Unsplash API (low, high)
    // Controls the level of potentially sensitive content in the images
    contentFilter?: 'low' | 'high';

    // Note: category and count are inherited from ImageSourceConfig
}

/**
 * Unsplash image source plugin
 * Fetches random images from Unsplash collections
 */
export class UnsplashSource extends AbstractImageSource {
    readonly id = 'unsplash';
    readonly name = 'Unsplash';
    readonly description = 'Beautiful, free photos from Unsplash collections';
    private logger = createLogger('unsplash-source');

    // Collection IDs for different categories (these are popular collections on Unsplash)
    private readonly collections: Record<string, string[]> = {
        'nature': ['3330448', '4378039', '1319040', '3694365'],
        'water': ['3694365', '1053828', '2411979', '981639'],
        'architecture': ['3348849', '4468022', '3348849', '922312'],
        'city': ['3470372', '1079798', '2563', '1110498'],
        'landscape': ['4466935', '3694365', '827743', '2422483'],
        'animals': ['3106804', '1242150', '139386', '162213'],
        'food': ['3687999', '2059134', '2489501', '2252258'],
        'travel': ['3349809', '3356576', '2476111', '1901880'],
        'people': ['3641869', '4468022', '181581', '139941'],
        'technology': ['4587649', '8761738', '2059134', '1263277'],
        'abstract': ['4587649', '8761738', '2059134', '1263277'],
        'space': ['2022043', '2159937', '2506084', '531563'],
        'interior': ['1118894', '4466935', '3330452', '4468022'],
        'flowers': ['2411979', '827743', '1079798', '3694365'],
        'dark': ['4466935', '3694365', '827743', '2422483'],
        'light': ['4466935', '3694365', '827743', '2422483'],
        'minimal': ['4466935', '3694365', '827743', '2422483'],
        'colorful': ['4466935', '3694365', '827743', '2422483'],
        'black': ['4466935', '3694365', '827743', '2422483'],
        'white': ['4466935', '3694365', '827743', '2422483'],
        'red': ['4466935', '3694365', '827743', '2422483'],
        'blue': ['4466935', '3694365', '827743', '2422483'],
        'green': ['4466935', '3694365', '827743', '2422483'],
        'yellow': ['4466935', '3694365', '827743', '2422483'],
        'orange': ['4466935', '3694365', '827743', '2422483'],
        'purple': ['4466935', '3694365', '827743', '2422483'],
        'pink': ['4466935', '3694365', '827743', '2422483'],
        'brown': ['4466935', '3694365', '827743', '2422483'],
        'gray': ['4466935', '3694365', '827743', '2422483'],
        'black-and-white': ['4466935', '3694365', '827743', '2422483'],
    };

    // Default collection IDs if category doesn't match any predefined ones
    private readonly defaultCollections = ['3694365', '1053828', '4466935', '3348849'];

    /**
     * Fetch images from Unsplash
     * @param config Configuration for the Unsplash image source
     * @param weather Optional weather data to use for selecting images
     * @timeOfDay Current time of day to use for selecting images
     * @returns Promise that resolves to an array of image URLs
     */
    protected async fetchImagesInternalAsync(config: UnsplashSourceConfig, weather: Weather, timeOfDay: TimeOfDay): Promise<string[]> {
        const count = config.count || 5;
        let category = config.category || '';
        const apiKey = config.apiKey || '';
        const fetchedImages: string[] = [];


        // Log the current weather and time of day
        this.logger.info(`Current weather: ${weather}, time of day: ${timeOfDay}`);

        this.logger.info(`Using category with weather and time: ${category}`);

        // If apiKey is provided, use the official Unsplash API (always use API when possible)
        if (apiKey) {
            try {
                this.logger.info('Using official Unsplash API');
                return await this.fetchImagesFromApiAsync(apiKey, category, count, weather, timeOfDay, config);
            } catch (error) {
                this.logger.error('Error fetching images from Unsplash API:', error);
                this.logger.info('Falling back to direct URL method');
                // Fall back to the direct URL method if the API fails
            }
        }

        // Direct URL method (fallback or default if useApi is false)
        this.logger.info('Using direct URL method for Unsplash images');

        // Parse the category string to get individual categories
        const categories = category.split(',').map(c => c.trim().toLowerCase());
        this.logger.info(`Categories for direct URL method: ${categories.join(', ')}`);

        // Get collection IDs for the specified categories
        let collectionIds: string[] = [];
        categories.forEach(cat => {
            if (this.collections[cat]) {
                collectionIds = [...collectionIds, ...this.collections[cat]];
            }
        });

        // If no matching collections found, use default
        if (collectionIds.length === 0) {
            this.logger.info('No matching collections found, using default collections');
            collectionIds = this.defaultCollections;
        } else {
            this.logger.info(`Using collection IDs: ${collectionIds.join(', ')}`);
        }

        // Generate direct image URLs using Unsplash's photo API
        // Format: https://images.unsplash.com/photo-{photoId}?w=1920&h=1080
        // We'll use collection IDs and random photo indices
        for (let i = 0; i < count; i++) {
            try {
                // Select a random collection ID
                const collectionId = collectionIds[Math.floor(Math.random() * collectionIds.length)];

                // Generate a timestamp-based random seed to avoid caching
                const randomSeed = Date.now() + i;

                // Create a direct URL to an Unsplash image using their CDN
                // Using a more reliable format with source parameter and fit=crop
                // This format is more stable and less likely to be rejected
                const imageUrl = `https://source.unsplash.com/collection/${collectionId}/1920x1080/?sig=${randomSeed}`;

                this.logger.info(`Generated direct URL (${i + 1}/${count}): ${imageUrl}`);

                fetchedImages.push(imageUrl);
            } catch (err) {
                this.logger.warn(`Failed to generate Unsplash image URL (attempt ${i + 1}/${count})`, err);
                // Continue with next attempt
            }
        }

        return fetchedImages;
    }

    /**
     * Fetch images from the official Unsplash API
     * @param apiKey Unsplash API key
     * @param category Category for images
     * @param count Number of images to fetch
     * @param weather Optional weather data to enhance image queries
     * @param timeOfDay Current time of day to enhance image queries
     * @param config Optional configuration for the Unsplash source
     * @returns Promise that resolves to an array of image URLs
     */
    private async fetchImagesFromApiAsync(apiKey: string, category: string, count: number, weather: Weather, timeOfDay: TimeOfDay, config?: UnsplashSourceConfig): Promise<string[]> {
        const fetchedImages: string[] = [];

        // Get content filter from config or use default
        const contentFilter = config?.contentFilter || 'high';

        // Prepare the search query from categories
        let query = '';
        if (category) {
            // Use the first category as the main query
            const categories = category.split(',').map(c => c.trim().toLowerCase());
            if (categories.length > 0) {
                query = categories[0];
            }

            // Add weather and time of day as additional keywords in the query
            if (categories.length > 1) {
                const additionalKeywords = categories.slice(1).join(' ');
                query += ` ${additionalKeywords}`;
            }

            // Log the categories being used
            this.logger.info(`Using categories: ${categories.join(', ')}`);
        }


        const weatherCondition = weather.toLowerCase();


        // Add weather condition to the query
        query += ` ${weatherCondition}`;

        // Add time-specific modifiers
        if (timeOfDay === 'sunrise-sunset') {
            query += ' sunrise sunset dawn dusk';
        } else if (timeOfDay === 'day') {
            query += ' daylight midday day';
        } else if (timeOfDay === 'night') {
            query += ' night dark stars moonlight';
        }

        this.logger.info(`Enhanced query with weather data: ${query}`);
        this.logger.info(`Weather condition: ${weatherCondition}, Time of day: ${timeOfDay}`);


        try {
            // Construct the API URL
            let apiUrl = 'https://api.unsplash.com/photos/random?';
            const params = new URLSearchParams({
                client_id: apiKey,
                count: count.toString(),
                orientation: 'landscape',
                content_filter: contentFilter
            });

            // Add query if provided
            if (query) {
                params.append('query', query);
            }

            // Log the API parameters (excluding the API key for security)
            const logParams = new URLSearchParams(params);
            logParams.delete('client_id');
            logParams.append('client_id', '***API_KEY_HIDDEN***');
            this.logger.info(`API parameters: ${logParams.toString()}`);

            apiUrl += params.toString();

            // Log the API request URL (with API key hidden)
            const logUrl = apiUrl.replace(/client_id=[^&]+/, 'client_id=***API_KEY_HIDDEN***');
            this.logger.info(`Making API request to: ${logUrl}`);

            // Make the API request
            const response = await fetch(apiUrl);

            if (!response.ok) {
                this.logger.error(`API error: ${response.status} ${response.statusText}`);
                throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Log the API response summary
            this.logger.info(`API response received with ${Array.isArray(data) ? data.length : 0} images`);

            // Extract image URLs from the response
            if (Array.isArray(data)) {
                data.forEach(photo => {
                    // Use the raw URL for highest quality
                    const imageUrl = photo.urls.raw + '&w=1920&h=1080&fit=crop';
                    fetchedImages.push(imageUrl);
                });
            }

            this.logger.info(`Fetched ${fetchedImages.length} images from Unsplash API`);
        } catch (error) {
            this.logger.error('Error fetching from Unsplash API:', error);
            throw error; // Re-throw to allow fallback
        }

        return fetchedImages;
    }

    /**
     * Get the default configuration for the Unsplash image source
     * @returns Default configuration
     */
    getDefaultConfig(): UnsplashSourceConfig {
        return {
            count: 5,
            category: 'nature',
            apiKey: '',
            useApi: true,
            contentFilter: 'high'
        };
    }

    /**
     * Get all available categories
     * @returns Array of category names
     */
    getCategories(): string[] {
        return Object.keys(this.collections);
    }

}

// Export a singleton instance of the Unsplash image source
export const unsplashSource = new UnsplashSource();

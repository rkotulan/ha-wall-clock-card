import { ImageSourceConfig, TimeOfDay, Weather } from './image-source';
import { AbstractImageSource } from './abstract-image-source';
import { createLogger } from '../utils/logger';

/**
 * Configuration for the Unsplash image source
 */
export interface UnsplashSourceConfig extends ImageSourceConfig {
    // API key for Unsplash API (required)
    apiKey: string;

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

    // List of predefined categories for Unsplash API
    private readonly categories = [
        'nature', 'water', 'architecture', 'city', 'landscape', 
        'animals', 'food', 'travel', 'people', 'technology', 
        'abstract', 'space', 'interior', 'flowers', 'dark', 
        'light', 'minimal', 'colorful', 'black', 'white', 
        'red', 'blue', 'green', 'yellow', 'orange', 
        'purple', 'pink', 'brown', 'gray', 'black-and-white'
    ];

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

        // Log the current weather and time of day
        this.logger.debug(`Current weather: ${weather}, time of day: ${timeOfDay}`);
        this.logger.debug(`Using category with weather and time: ${category}`);

        // API key is required
        if (!apiKey) {
            this.logger.error('Unsplash API key is required');
            return [];
        }

        // Use the official Unsplash API
        this.logger.debug('Using official Unsplash API');
        return await this.fetchImagesFromApiAsync(apiKey, category, count, weather, timeOfDay, config);
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
            this.logger.debug(`Using categories: ${categories.join(', ')}`);
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

        this.logger.debug(`Enhanced query with weather data: ${query}`);
        this.logger.debug(`Weather condition: ${weatherCondition}, Time of day: ${timeOfDay}`);


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
            this.logger.debug(`API parameters: ${logParams.toString()}`);

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
            this.logger.debug(`API response received with ${Array.isArray(data) ? data.length : 0} images`);

            // Extract image URLs from the response
            if (Array.isArray(data)) {
                data.forEach(photo => {
                    // Use the raw URL for highest quality
                    const imageUrl = photo.urls.raw + '&w=1920&h=1080&fit=crop';
                    fetchedImages.push(imageUrl);
                });
            }

            this.logger.debug(`Fetched ${fetchedImages.length} images from Unsplash API`);
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
            apiKey: '', // This will need to be set by the user
            contentFilter: 'high'
        };
    }

    /**
     * Get all available categories
     * @returns Array of category names
     */
    getCategories(): string[] {
        return [...this.categories];
    }

}

// Export a singleton instance of the Unsplash image source
export const unsplashSource = new UnsplashSource();

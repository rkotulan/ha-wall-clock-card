import { ImageSource, ImageSourceConfig } from './image-source';

/**
 * Configuration for the Unsplash image source
 */
export interface UnsplashSourceConfig extends ImageSourceConfig {
  // Category for Unsplash images (e.g., 'nature,water')
  category?: string;
  // API key for Unsplash API (required for API mode)
  apiKey?: string;
  // Whether to use the official Unsplash API (requires apiKey)
  useApi?: boolean;
}

/**
 * Unsplash image source plugin
 * Fetches random images from Unsplash collections
 */
export class UnsplashSource implements ImageSource {
  readonly id = 'unsplash';
  readonly name = 'Unsplash';
  readonly description = 'Beautiful, free photos from Unsplash collections';

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
   * @returns Promise that resolves to an array of image URLs
   */
  async fetchImages(config: UnsplashSourceConfig): Promise<string[]> {
    const count = config.count || 5;
    const category = config.category || '';
    const useApi = config.useApi || false;
    const apiKey = config.apiKey || '';
    const fetchedImages: string[] = [];

    // If useApi is true and apiKey is provided, use the official Unsplash API
    if (useApi && apiKey) {
      try {
        console.log('Using official Unsplash API');
        return await this.fetchImagesFromApi(apiKey, category, count);
      } catch (error) {
        console.error('Error fetching images from Unsplash API:', error);
        console.log('Falling back to direct URL method');
        // Fall back to the direct URL method if the API fails
      }
    }

    // Direct URL method (fallback or default if useApi is false)
    console.log('Using direct URL method for Unsplash images');

    // Parse the category string to get individual categories
    const categories = category.split(',').map(c => c.trim().toLowerCase());

    // Get collection IDs for the specified categories
    let collectionIds: string[] = [];
    categories.forEach(cat => {
      if (this.collections[cat]) {
        collectionIds = [...collectionIds, ...this.collections[cat]];
      }
    });

    // If no matching collections found, use default
    if (collectionIds.length === 0) {
      collectionIds = this.defaultCollections;
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

        fetchedImages.push(imageUrl);
      } catch (err) {
        console.warn(`Failed to generate Unsplash image URL (attempt ${i+1}/${count})`, err);
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
   * @returns Promise that resolves to an array of image URLs
   */
  private async fetchImagesFromApi(apiKey: string, category: string, count: number): Promise<string[]> {
    const fetchedImages: string[] = [];

    // Prepare the search query from categories
    let query = '';
    if (category) {
      // Use the first category as the main query
      const categories = category.split(',').map(c => c.trim().toLowerCase());
      if (categories.length > 0) {
        query = categories[0];
      }
    }

    try {
      // Construct the API URL
      let apiUrl = 'https://api.unsplash.com/photos/random?';
      const params = new URLSearchParams({
        client_id: apiKey,
        count: count.toString(),
        orientation: 'landscape',
        content_filter: 'high'
      });

      // Add query if provided
      if (query) {
        params.append('query', query);
      }

      apiUrl += params.toString();

      // Make the API request
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract image URLs from the response
      if (Array.isArray(data)) {
        data.forEach(photo => {
          // Use the raw URL for highest quality
          const imageUrl = photo.urls.raw + '&w=1920&h=1080&fit=crop';
          fetchedImages.push(imageUrl);
        });
      }

      console.log(`Fetched ${fetchedImages.length} images from Unsplash API`);
    } catch (error) {
      console.error('Error fetching from Unsplash API:', error);
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
      useApi: false
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

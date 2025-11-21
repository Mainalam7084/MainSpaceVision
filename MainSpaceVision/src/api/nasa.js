const BASE_URL = 'https://api.nasa.gov';
const IMAGE_LIB_URL = 'https://images-api.nasa.gov';
const DEFAULT_API_KEY = '4scGYxzjKIHiA70S9Ca7vYBfgb6KXhWScE4NRMaz'; // In a real app, use react-native-dotenv

// Helper for retries
const fetchWithRetry = async (url, retries = 3, backoff = 300) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // 429 Too Many Requests - specific to DEMO_KEY limits often
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, retries - 1, backoff * 2);
        }
        throw error;
    }
};

export const getAPOD = async (date = '') => {
    const dateParam = date ? `&date=${date}` : '';
    const url = `${BASE_URL}/planetary/apod?api_key=${DEFAULT_API_KEY}${dateParam}`;
    return fetchWithRetry(url);
};

export const getRandomAPOD = async (count = 1) => {
    const url = `${BASE_URL}/planetary/apod?api_key=${DEFAULT_API_KEY}&count=${count}`;
    return fetchWithRetry(url);
};

export const getMarsPhotos = async ({ rover = 'curiosity', sol = 1000, camera = 'fhaz' }) => {
    const cameraParam = camera && camera !== 'all' ? `&camera=${camera}` : '';
    const url = `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}${cameraParam}&api_key=${DEFAULT_API_KEY}`;
    return fetchWithRetry(url);
};

export const getNEOFeed = async (startDate, endDate) => {
    const url = `${BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${DEFAULT_API_KEY}`;
    return fetchWithRetry(url);
};

export const searchNASAImages = async (query, page = 1) => {
    const url = `${IMAGE_LIB_URL}/search?q=${encodeURIComponent(query)}&page=${page}&media_type=image`;
    // Image library doesn't require API key
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

import { getAPOD } from '../src/api/nasa';

// Rely on global fetch (Node 18+ or RN environment)
if (!global.fetch) {
    console.warn('Global fetch not found! This test might fail if not running in Node 18+ or an environment with fetch polyfill.');
}

describe('Real NASA API Verification', () => {
    // Increase timeout for real network request
    jest.setTimeout(10000);

    it('successfully fetches APOD data with real API key', async () => {
        try {
            console.log('Initiating real API request to NASA APOD endpoint...');
            const data = await getAPOD();
            console.log('API Response received:', JSON.stringify(data, null, 2));

            expect(data).toBeDefined();
            expect(data.title).toBeDefined();
            expect(data.url).toBeDefined();

            if (data.error) {
                console.error('API returned an error object:', data);
                throw new Error('API Error: ' + JSON.stringify(data));
            }
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    });
});

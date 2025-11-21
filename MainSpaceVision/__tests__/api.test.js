import { getAPOD, getMarsPhotos, getNEOFeed } from '../src/api/nasa';

// Mock global fetch
global.fetch = jest.fn();

describe('NASA API Layer', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('getAPOD calls the correct URL', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ title: 'Test APOD' }),
        }));

        const data = await getAPOD();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/planetary/apod'));
        expect(data).toEqual({ title: 'Test APOD' });
    });

    it('getMarsPhotos calls the correct URL with parameters', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ photos: [] }),
        }));

        await getMarsPhotos({ rover: 'curiosity', sol: 1000, camera: 'fhaz' });
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/mars-photos/api/v1/rovers/curiosity/photos'));
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('sol=1000'));
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('camera=fhaz'));
    });

    it('getNEOFeed handles date range correctly', async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ near_earth_objects: {} }),
        }));

        await getNEOFeed('2023-01-01', '2023-01-07');
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/neo/rest/v1/feed'));
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('start_date=2023-01-01'));
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('end_date=2023-01-07'));
    });
});

import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@mainspacevision_favorites';

export const saveFavorite = async (item) => {
    try {
        const favorites = await getFavorites();
        // Avoid duplicates based on date (APOD) or id (Mars/NASA images)
        const exists = favorites.some(f =>
            (f.date && f.date === item.date) ||
            (f.id && f.id === item.id)
        );

        if (!exists) {
            const newFavorites = [item, ...favorites];
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            return newFavorites;
        }
        return favorites;
    } catch (e) {
        console.error('Error saving favorite', e);
        return [];
    }
};

export const removeFavorite = async (item) => {
    try {
        const favorites = await getFavorites();
        const newFavorites = favorites.filter(f =>
            !((f.date && f.date === item.date) || (f.id && f.id === item.id))
        );
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
        return newFavorites;
    } catch (e) {
        console.error('Error removing favorite', e);
        return [];
    }
};

export const getFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading favorites', e);
        return [];
    }
};

export const clearFavorites = async () => {
    try {
        await AsyncStorage.removeItem(FAVORITES_KEY);
        return [];
    } catch (e) {
        console.error('Error clearing favorites', e);
    }
};

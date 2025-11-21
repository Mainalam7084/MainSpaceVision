import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFavorites, saveFavorite, removeFavorite } from '../utils/storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const data = await getFavorites();
        setFavorites(data);
        setLoading(false);
    };

    const addFavorite = async (item) => {
        const updated = await saveFavorite(item);
        setFavorites(updated);
    };

    const removeFavoriteItem = async (item) => {
        const updated = await removeFavorite(item);
        setFavorites(updated);
    };

    const isFavorite = (item) => {
        return favorites.some(f =>
            (f.date && item.date && f.date === item.date) ||
            (f.id && item.id && f.id === item.id)
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite: removeFavoriteItem, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);

import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(new Set(JSON.parse(storedFavorites)));
        }
      } catch (error) {
        console.error('Failed to load favorites from AsyncStorage', error);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify([...favorites]));
      } catch (error) {
        console.error('Failed to save favorites to AsyncStorage', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  const toggleFavorite = useCallback((characterId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(characterId)) {
        newFavorites.delete(characterId);
      } else {
        newFavorites.add(characterId);
      }
      return newFavorites;
    });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

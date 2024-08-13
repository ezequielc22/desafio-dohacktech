import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import CharacterList from '../components/CharacterList';
import EmptyState from '../components/EmptyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavoriteCharacters } from '../services/FavoritesService';

const FavoriteCharactersScreen = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  /**
   * useCallback para memorizar la función loadFavorites
   * y evitar su recreación en cada render.
   */
  const loadFavorites = useCallback(async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem('favorites');
      const favoritesSet = favoritesJSON ? new Set(JSON.parse(favoritesJSON)) : new Set();
      
      if (favoritesSet.size > 0) {
        const fetchedFavorites = await getFavoriteCharacters(favoritesSet);
        setFavoriteCharacters(fetchedFavorites);
      } else {
        setFavoriteCharacters([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  /**
   * useEffect para ejecutar loadFavorites cuando el componente
   * se monta, asegurando que los datos se carguen al inicio.
   */
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  /**
   * useMemo para memorizar el contenido de la pantalla basado en si hay favoritos,
   * evitando renders innecesarios.
   */
  const content = useMemo(() => {
    return favoriteCharacters.length > 0 ? (
      <CharacterList characters={favoriteCharacters} />
    ) : (
      <EmptyState 
        message="Oops, it looks like you don't have any favorites yet." 
        iconName="sentiment-dissatisfied"
      />
    );
  }, [favoriteCharacters]);

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2EB',
    padding: 10,
  },
});

export default FavoriteCharactersScreen;

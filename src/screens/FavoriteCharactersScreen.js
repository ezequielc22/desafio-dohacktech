import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CharacterList from '../components/CharacterList/index';
import EmptyState from '../components/EmptyCard/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavoriteCharacters } from '../services/FavoritesService';

const FavoriteCharactersScreen = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
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
        console.error('Error loading favorites', error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={styles.container}>
      {favoriteCharacters.length > 0 ? (
        <CharacterList characters={favoriteCharacters} />
      ) : (
        <EmptyState 
          message="Ups, parece que aún no tienes favoritos" 
          iconName="sentiment-dissatisfied"
        />
      )}
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

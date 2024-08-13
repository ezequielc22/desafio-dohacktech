import React, { useState, useContext, useCallback, useMemo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EpisodeList from '../EpisodeList/index';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import TypewriterText from '../TyperwriterText';

const CharacterDetailCard = ({ character }) => {
  // Devuelve null si no hay personaje
  if (!character) {
    return null;
  }

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  // Memoiza la lista de números de episodios para optimizar el rendimiento
  const episodeNumbers = useMemo(() => {
    return character.episode
      .map(url => {
        const match = url.match(/episode\/(\d+)/);
        return match ? parseInt(match[1], 10) : null;
      })
      .filter(num => num !== null);
  }, [character.episode]);

  // Maneja el toggle de favoritos con useCallback
  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(character.id);
  }, [character.id, toggleFavorite]);

  return (
    <View style={styles.card}>
      <TouchableOpacity testID='fav-button' style={styles.favoriteButton} onPress={handleToggleFavorite}>
        <Icon
        testID='fav-icon'
          name={favorites.has(character.id) ? 'star' : 'star-outline'}
          size={30}
          color={favorites.has(character.id) ? '#ffd700' : '#ffffff'}
        />
      </TouchableOpacity>
      <Image source={{ uri: character.image }} style={styles.image} />
        <View testID='container' style={styles.textContainer}>
          {character.name && <TypewriterText testID='name-field' text={character.name} style={styles.name} />}
          {character.status && <TypewriterText testID='status-field' text={`Status: ${character.status}`} style={styles.text} />}
          {character.species && <TypewriterText testID='species-field' text={`Species: ${character.species}`} style={styles.text} />}
          {character.gender && <TypewriterText testID='gender-field' text={`Gender: ${character.gender}`} style={styles.text} />}
          {character.type && <TypewriterText testID='type-field' text={`Type: ${character.type}`} style={styles.text} />}
          {character.origin?.name && <TypewriterText testID='origin-field' text={`Origin: ${character.origin.name}`} style={styles.text} />}
        </View>
      {episodeNumbers.length > 0 && <EpisodeList episodes={episodeNumbers} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5CAD4A',
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    color: '#5CAD4A',
    marginBottom: 5,
  },
});

export default CharacterDetailCard;

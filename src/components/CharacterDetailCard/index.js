import React, { useEffect, useState, useContext } from 'react';
import { View, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EpisodeList from '../EpisodeList/index';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import TypewriterText from '../TyperwriterText';

const CharacterDetailCard = ({ character }) => {
  if(!character){
    return null;
  }
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showText, setShowText] = useState(false);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        setShowText(true);
      }, 500);
    });
  }, [fadeAnim]);

  const episodeNumbers = character.episode.map(url => {
    const match = url.match(/episode\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }).filter(num => num !== null);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(character.id)}>
        <Icon
          name={favorites.has(character.id) ? 'star' : 'star-outline'}
          size={30}
          color={favorites.has(character.id) ? '#ffd700' : '#ffffff'}
        />
      </TouchableOpacity>
      <Image source={{ uri: character.image }} style={styles.image} />
      {showText && (
        <View style={styles.textContainer}>
          {character.name && <TypewriterText text={character.name} style={styles.name} />}
          {character.status && <TypewriterText text={`Status: ${character.status}`} style={styles.text} />}
          {character.species && <TypewriterText text={`Species: ${character.species}`} style={styles.text} />}
          {character.gender && <TypewriterText text={`Gender: ${character.gender}`} style={styles.text} />}
          {character.type && <TypewriterText text={`Type: ${character.type}`} style={styles.text} />}
          {character.origin?.name && <TypewriterText text={`Origin: ${character.origin.name}`} style={styles.text} />}
        </View>
      )}
      {episodeNumbers.length > 0 && (
        <EpisodeList episodes={episodeNumbers}/>
      )}
    </Animated.View>
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


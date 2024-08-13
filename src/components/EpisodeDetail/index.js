import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TypewriterText from '../TyperwriterText';

const EpisodeDetail = ({ episode, characters }) => {
    // Devuelve null si no hay episodios
  if(!episode || !characters){
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TypewriterText 
          testID='title'
          text={`${episode?.episode}: ${episode?.name}`} 
          style={styles.title} 
        />
        <TypewriterText testID='subtitle' text={`Air Date: ${episode?.air_date}`} style={styles.text} />
      </View>
      <View style={styles.characterList}>
        {characters.map((character) => (
          <View key={character.id} style={styles.characterContainer}>
            <Image source={{ uri: character.image }} style={styles.characterImage} />
            <Text style={styles.characterName}>{character.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
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
  characterList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  characterContainer: {
    width: 100,
    height: 150,
    alignItems: 'center',
    margin: 10,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  characterName: {
    fontSize: 16,
    color: '#5CAD4A',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default EpisodeDetail;

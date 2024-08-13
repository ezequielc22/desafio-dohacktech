import React, { memo } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EpisodePill = memo(({ item }) => {
  const navigation = useNavigation();
  // Navega hacia el detalle del episodio seleccionado
  const handleEpisodePress = (episodeId) => {
  navigation.navigate('EpisodeDetail', { episodeId });
  };
  return (
    <TouchableOpacity style={styles.episodePill} onPress={() => handleEpisodePress(item)}>
      <Text style={styles.episodeText}>{item}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  episodePill: {
    backgroundColor: '#5CAD4A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  episodeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default EpisodePill;

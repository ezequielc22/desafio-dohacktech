import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EpisodePill from '../EpisodePill';

const EpisodeList = React.memo(({ episodes }) => {
  const renderEpisodeItem = ({ item }) => (
    <EpisodePill item={item} />
  );

  return (
    <View style={styles.footer}>
      <Text style={styles.episodesTitle}>Episodes:</Text>
      <FlatList
        data={episodes}
        renderItem={renderEpisodeItem}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={true}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    zIndex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#444',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  episodesTitle: {
    fontSize: 22,
    color: '#5CAD4A',
    marginBottom: 10,
  },
});

export default EpisodeList;

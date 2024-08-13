import React, { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import CharacterItem from '../CharacterCard/index';

const CharacterList = ({ characters }) => {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return (
      <FlatList
        style={styles.contentContainer}
        data={characters}
        renderItem={({ item }) => (
          <CharacterItem
            item={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
      />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});

export default CharacterList;

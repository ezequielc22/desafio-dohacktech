import React, { Suspense, useContext } from 'react';
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { FavoritesContext } from '../../contexts/FavoritesContext';

const CharacterItem = React.lazy(() => import('../CharacterCard/index'));

const CharacterList = ({ characters, loading }) => {
    const { favorites, toggleFavorite } = useContext(FavoritesContext);
  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#208D45" />}>
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
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#208D45" /> : null}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        removeClippedSubviews={true}
      />
    </Suspense>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
});

export default CharacterList;

// src/App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/CharacterDetailScreen';
import FavoriteCharactersScreen from './screens/FavoriteCharactersScreen';
import { FavoritesProvider } from './contexts/FavoritesContext';
import EpisodeDetailScreen from './screens/EpisodeDetailScreen';
import { LoadingProvider } from './contexts/LoadingContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <LoadingProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CharacterDetail" component={DetailScreen} />
            <Stack.Screen name="Favorites" component={FavoriteCharactersScreen} />
            <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </LoadingProvider>
  );
};

export default App;
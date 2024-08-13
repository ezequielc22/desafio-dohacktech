import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/CharacterDetailScreen';
import FavoriteCharactersScreen from './src/screens/FavoriteCharactersScreen';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen';
import { LoadingProvider } from './src/contexts/LoadingContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <LoadingProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Home', headerTitleAlign: 'center' }}
            />
            <Stack.Screen 
              name="CharacterDetail" 
              component={DetailScreen} 
              options={{ title: 'Character', headerTitleAlign: 'center' }}
            />
            <Stack.Screen 
              name="Favorites" 
              component={FavoriteCharactersScreen} 
              options={{ title: 'Favorites', headerTitleAlign: 'center' }}
            />
            <Stack.Screen 
              name="EpisodeDetail" 
              component={EpisodeDetailScreen} 
              options={{ title: 'Episode', headerTitleAlign: 'center' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </LoadingProvider>
  );
};

export default App;

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { FavoritesContext } from '../../../contexts/FavoritesContext';
import CharacterList from '../index';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
  });
jest.useFakeTimers();
describe('CharacterList', () => {
  const mockToggleFavorite = jest.fn();
  const mockFavorites = new Set();

  const characters = [
    {
      created: "2017-11-04T18:48:46.250Z",
      episode: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
      gender: "Male",
      id: 1,
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
      name: "Rick Sanchez",
      origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
      species: "Human",
      status: "Alive",
      type: "",
      url: "https://rickandmortyapi.com/api/character/1"
    },
    {
      created: "2017-11-04T18:50:21.651Z",
      episode: ["https://rickandmortyapi.com/api/episode/1", "https://rickandmortyapi.com/api/episode/2"],
      gender: "Male",
      id: 2,
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
      name: "Morty Smith",
      origin: { name: "unknown", url: "" },
      species: "Human",
      status: "Alive",
      type: "",
      url: "https://rickandmortyapi.com/api/character/2"
    },
    {
      created: "2017-11-04T19:09:56.428Z",
      episode: ["https://rickandmortyapi.com/api/episode/6", "https://rickandmortyapi.com/api/episode/7"],
      gender: "Female",
      id: 3,
      image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
      location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
      name: "Summer Smith",
      origin: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
      species: "Human",
      status: "Alive",
      type: "",
      url: "https://rickandmortyapi.com/api/character/3"
    }
  ];

  it('should render the character list correctly when loading is false', () => {
    render(
      <FavoritesContext.Provider value={{ favorites: mockFavorites, toggleFavorite: mockToggleFavorite }}>
        <NavigationContainer>
            <CharacterList characters={characters} loading={false} />
        </NavigationContainer>
      </FavoritesContext.Provider>
    );

    characters.forEach(character => {
      expect(screen.getByText(character.name)).toBeTruthy();
    });
    expect(screen.queryByRole('activityindicator')).toBeNull();
  });

  test('should call toggleFavorite with the correct id when CharacterItem is toggled', async () => {
    const { getAllByTestId } = render(
      <FavoritesContext.Provider value={{ favorites: mockFavorites, toggleFavorite: mockToggleFavorite }}>
            <NavigationContainer>
                <CharacterList characters={characters} loading={false} />
            </NavigationContainer>
      </FavoritesContext.Provider>
    );
    await waitFor(()=>{
        jest.advanceTimersByTime(5000);
        const buttons = getAllByTestId('fav-button')
        expect(buttons).toBeTruthy();
        fireEvent.press(buttons[1]);
    })
    await waitFor(()=>{
        expect(mockToggleFavorite).toHaveBeenCalledWith(2);
    })
  });
});

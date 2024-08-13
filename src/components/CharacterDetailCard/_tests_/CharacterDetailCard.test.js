import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FavoritesContext } from '../../../contexts/FavoritesContext';
import CharacterDetailCard from '../index';
import { NavigationContainer } from '@react-navigation/native';

const mockToggleFavorite = jest.fn();
const mockCharacter = {
  id: 1,
  name: 'Test Character',
  image: 'https://example.com/image.jpg',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  type: 'test',
  origin: { name: 'Earth' },
  episode: ['https://example.com/episode/1'],
  showText: true,
};
const renderWithContext = (character) => {
  return render(
    <FavoritesContext.Provider value={{ favorites: new Set(), toggleFavorite: mockToggleFavorite }}>
      <NavigationContainer>
        <CharacterDetailCard character={character} />
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
};

describe('CharacterDetailCard', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  beforeEach(() => {
    jest.useFakeTimers();
});

  it('renders correctly with character data', async () => {
    const { getByTestId } = renderWithContext(mockCharacter);
        await waitFor(() => {
            expect(getByTestId('container')).toBeTruthy();
        });
        await waitFor(() => {
            expect(getByTestId('name-field')).toBeTruthy();
            expect(getByTestId('status-field')).toBeTruthy();
            expect(getByTestId('species-field')).toBeTruthy();
            expect(getByTestId('gender-field')).toBeTruthy();
            expect(getByTestId('type-field')).toBeTruthy();
            expect(getByTestId('origin-field')).toBeTruthy();
        });
  });
  it('does not render TypewriterText for missing fields', () => {
    const mockCharacterWithMissingType = { ...mockCharacter, type: '' };
    const { queryByTestId } = renderWithContext(mockCharacterWithMissingType);
    expect(queryByTestId('type-field')).toBeNull();
});

  it('toggles favorite on button press', async () => {
    const { getByTestId } = renderWithContext(mockCharacter);
    const favoriteButton = getByTestId('fav-button');

    fireEvent.press(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCharacter.id);
  });

  it('renders without crashing when character is null', () => {
    const { queryByTestId } = renderWithContext(null);
    expect(queryByTestId('container')).toBeNull();
  });
  it('displays favorite icon', async () => {
    const favorites = new Set([mockCharacter.id]);
    const { getByTestId } = render(
      <FavoritesContext.Provider value={{ favorites, toggleFavorite: mockToggleFavorite }}>
        <NavigationContainer>
            <CharacterDetailCard character={mockCharacter} />
        </NavigationContainer>
      </FavoritesContext.Provider>
    );
    expect(getByTestId('fav-icon')).toBeTruthy();

  });
  it('calculates episode numbers correctly from URLs', () => {
    const { getByText } = renderWithContext(mockCharacter);

    expect(getByText('1')).toBeTruthy();
  });

  it('returns an empty array if no episodes are provided', () => {
    const mockCharacter = {
      episode: [],
    };

    const { queryByText } = renderWithContext(mockCharacter);

    expect(queryByText('1')).toBeNull();
  });

  it('handles invalid episode URLs gracefully', () => {
    const mockCharacter = {
      episode: [
        'https://example.com/episode/invalid',
        'https://example.com/episode/4',
      ],
    };

    const { getByText } = renderWithContext(mockCharacter);

    expect(getByText('4')).toBeTruthy();
  });
});

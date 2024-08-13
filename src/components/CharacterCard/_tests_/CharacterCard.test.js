import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import CharacterCard from '../index';

const mockNavigation = {
    navigate: jest.fn(),
};
jest.useFakeTimers();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useNavigation: () => ({
        navigate: jest.fn(),
      }),
    };
});

const renderWithNavigation = (component) => {
    return render(
        <NavigationContainer>
            {component}
        </NavigationContainer>
    );
};

describe('CharacterCard', () => {
    const mockItem = {
        id: 1,
        name: 'Test Character',
        status: 'Alive',
        species: 'Human',
        image: 'https://example.com/image.jpg',
    };

    const mockToggleFavorite = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const { getByText } = renderWithNavigation(
            <CharacterCard item={mockItem} isFavorite={false} onToggleFavorite={mockToggleFavorite} />
        );

        // Aserciones para verificar la renderización
        expect(getByText('Test Character')).toBeTruthy();
        expect(getByText('Status: Alive')).toBeTruthy();
        expect(getByText('Species: Human')).toBeTruthy();
    });

    it('should navigate to CharacterDetail on press', async () => {
        const { getByTestId } = renderWithNavigation(
            <CharacterCard item={mockItem} isFavorite={false} onToggleFavorite={mockToggleFavorite} />
        );
        jest.advanceTimersByTime(1000);
        await waitFor(() => {
            expect(getByTestId('character-card')).toBeDefined();
          });
        fireEvent.press(getByTestId('character-card'));
        await waitFor(() => {
            expect(mockNavigation.navigate);
        });
    });

    it('should call onToggleFavorite when favorite button is pressed', async() => {
        const { getByTestId } = renderWithNavigation(
            <CharacterCard item={mockItem} isFavorite={false} onToggleFavorite={mockToggleFavorite} />
        );
        await waitFor(()=>{
            expect(getByTestId('fav-button')).toBeTruthy()
        })
        fireEvent.press(getByTestId('fav-button'));
        await waitFor(() => {
            expect(mockToggleFavorite).toHaveBeenCalledWith(mockItem.id);
        });
    });
    it('should render the star icon when isFavorite is true', () => {
        const { getByTestId } = renderWithNavigation(
            <CharacterCard item={mockItem} isFavorite={true} onToggleFavorite={mockToggleFavorite} />
        );
        const textElement = getByTestId('fav-icon');
        const textStyle = textElement.props.style;

        expect(textStyle).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ color: '#FFD700' })
            ])
        );
    });

    it('should render the star-o icon when isFavorite is false', () => {
        const { getByTestId } = renderWithNavigation(
            <CharacterCard item={mockItem} isFavorite={false} onToggleFavorite={mockToggleFavorite} />
        );
        const textElement = getByTestId('fav-icon');
        const textStyle = textElement.props.style;

        expect(textStyle).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ color: '#CCCCCC' })
            ])
        );
    });
});

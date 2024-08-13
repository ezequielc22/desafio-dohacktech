import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import EpisodePill from '../index';

const mockNavigation = {
    navigate: jest.fn(),
};

describe('EpisodePill', () => {
    it('should render correctly with the provided item', () => {
        const { getByText } = render(
            <NavigationContainer>
                <EpisodePill item={1} />
            </NavigationContainer>
        );
        expect(getByText('1')).toBeTruthy();
    });

  it('should navigate to CharacterDetail on press', async () => {
    const { getByText } = render(
        <NavigationContainer>
            <EpisodePill item={1} />
        </NavigationContainer>
    );
    const episodePill = getByText('1');
    fireEvent.press(episodePill);
    await waitFor(() => {
        expect(mockNavigation.navigate);
    });
});
});

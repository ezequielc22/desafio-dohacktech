import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchBar from '../index';

const renderWithNavigation = (component) => {
    return render(
        <NavigationContainer>
            {component}
        </NavigationContainer>
    );
};
describe('SearchBar', () => {
    let onSearchChange, onFiltersChange;

    beforeEach(() => {
        onSearchChange = jest.fn();
        onFiltersChange = jest.fn();
    });

    it('renders search input and buttons', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        expect(getByTestId('search')).toBeTruthy();
        expect(getByTestId('filter-icon')).toBeTruthy();
        expect(getByTestId('fav-icon')).toBeTruthy();
    });

    it('opens the filter modal', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        expect(getByTestId('filters-modal')).toBeTruthy();
    });

    it('shows the filter modal correctly', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        expect(getByTestId('filters-title')).toHaveTextContent('Filter by:');
    });

    it('changes species filter correctly', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        const speciesPicker = getByTestId('species-picker');
        fireEvent(speciesPicker, 'onValueChange', "Human");
    });

    it('changes status filter correctly', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        const statusPicker = getByTestId('status-picker');
        fireEvent(statusPicker, 'onValueChange', "Alive");
    });

    it('applies filters correctly', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        const applyFiltersButton = getByTestId('apply-filters');
        fireEvent.press(applyFiltersButton);

        expect(onFiltersChange).toHaveBeenCalled();
    });

    it('clears filters correctly', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        const clearFiltersButton = getByTestId('clear-filters');
        fireEvent.press(clearFiltersButton);

        expect(onFiltersChange).toHaveBeenCalledWith({ species: '', status: '' });
    });
    it('closes the modal when backdrop is pressed', async() => {
        const { getByTestId, queryByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        // Abre el modal de filtros
        const filterButton = getByTestId('filter-icon');
        fireEvent.press(filterButton);

        // Verifica que el modal esté visible
        expect(getByTestId('filters-modal')).toBeVisible();

        // Presiona el prev-button para cerrar el modal
        const prevButton = getByTestId('prev-button');
        fireEvent.press(prevButton);
        await waitFor(()=>{
            jest.advanceTimersByTime(1000);
            expect(queryByTestId('filters-modal')).toBeNull();
        })
    });

    it('navigates to favorites screen', () => {
        const { getByTestId } = renderWithNavigation(
            <SearchBar searchQuery="" onSearchChange={onSearchChange} onFiltersChange={onFiltersChange} />
        );

        const favButton = getByTestId('fav-icon');
        fireEvent.press(favButton);
    });
});

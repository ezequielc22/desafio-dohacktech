import React, { useState, useEffect, useRef, useCallback, Suspense, lazy, useMemo } from 'react';
import { Animated, View, ActivityIndicator, Keyboard, StyleSheet } from 'react-native';
import { getCharacters } from '../services/CharacterService';
import { triggerShake } from '../helpers/animations';
import * as Haptics from 'expo-haptics';
import useDebounce from '../hooks/useDebounce';
import CharacterList from '../components/CharacterList';

// Lazy loads
const Pagination = lazy(() => import('../components/Pagination'));
const SearchBar = lazy(() => import('../components/SearchBar'));

const HomeScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [editingPage, setEditingPage] = useState(null);
  const [errorState, setErrorState] = useState(false);
  const [errorStateVisible, setErrorStateVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  /**
   * useEffect para cargar personajes cuando cambia la página, la búsqueda o los filtros.
   */
  useEffect(() => {
    loadCharacters(page, debouncedSearchQuery, filters);
  }, [page, debouncedSearchQuery, filters]);

  /**
   * useEffect para manejar la ocultación del teclado
   * y confirmar si se estaba editando la página.
   */
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (editingPage !== null) {
        handleKeyboardDismiss();
      }
    });

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [editingPage]);

  /**
   * Función para cargar los personajes con la API, usando useCallback para memorizarla
   * y evitar la recreación innecesaria.
   */
  const loadCharacters = useCallback(async (pageNumber, searchQuery = '', filters = '') => {
    if (loading || pageNumber < 1 || pageNumber > totalPages) return;
    setLoading(true);

    try {
      const data = await getCharacters(pageNumber, searchQuery, filters);
      setCharacters(data.results);
      setPage(pageNumber);
      setTotalPages(Math.ceil(data.info.count / 20));
      setInputPage('');
      setEditingPage(null);
      setErrorState(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, totalPages]);

  /**
   * Función para cambiar la página, con manejo de errores y animaciones.
   */
  const handlePageChange = useCallback((newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) {
      triggerShake(shakeAnimation, setErrorState);
      return;
    }
    setPage(newPage);
  }, [page, totalPages, shakeAnimation]);

  /**
   * Función para manejar el cambio de texto en el input de página.
   */
  const handleInputChange = useCallback((text) => {
    setInputPage(text);
  }, []);

  /**
   * Función para navegar a una página específica cuando se confirma la entrada.
   */
  const goToPage = useCallback(() => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      triggerShake(shakeAnimation, setErrorState);
      setInputPage(page.toString());
    }
  }, [inputPage, totalPages, page, shakeAnimation]);

  /**
   * Función para iniciar la edición de la página.
   */
  const handlePageEdit = useCallback((pageNum) => {
    if (pageNum === page) {
      setEditingPage(pageNum);
      setInputPage(pageNum.toString());
      setErrorStateVisible(false);
    } else {
      setPage(pageNum);
    }
  }, [page]);

  /**
   * Función para manejar la ocultación del teclado con retroalimentación háptica.
   */
  const handleKeyboardDismiss = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setInputPage(page.toString());
    setEditingPage(null);
    setErrorState(true);
    setErrorStateVisible(true);
  }, [page]);

  /**
   * Función para manejar el cambio de la búsqueda.
   */
  const handleSearchChange = useCallback((text) => {
    setPage(1); // Reinicia a la primera página cuando cambia la búsqueda
    setSearchQuery(text);
  }, []);

  /**
   * Función para manejar el cambio de los filtros.
   */
  const handleFiltersChange = useCallback((filters) => {
    setFilters(filters);
  }, []);

  /**
   * useMemo para memorizar los personajes filtrados según la búsqueda,
   * evitando cálculos innecesarios.
   */
  const filteredCharacters = useMemo(() => {
    return characters.filter(character =>
      character.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [characters, debouncedSearchQuery]);

  return (
    <View style={styles.container}>
      <Suspense fallback={<ActivityIndicator size="large" color="#208D45" />}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
        />
        <CharacterList
          characters={filteredCharacters}
          loading={loading}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePageEdit={handlePageEdit}
          inputPage={inputPage}
          handleInputChange={handleInputChange}
          goToPage={goToPage}
          editingPage={editingPage}
          errorState={errorState}
          errorStateVisible={errorStateVisible}
          shakeAnimation={shakeAnimation}
        />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2EB',
  },
});

export default HomeScreen;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { getFilterOptions } from '../../services/CharacterService';

const SearchBar = React.memo(({ searchQuery, onSearchChange, onFiltersChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({ species: '', status: '' });
  const [filterOptions, setFilterOptions] = useState({ species: [], status: [] });
  const opacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Configura las opciones del picker

  useEffect(() => {
    const loadFilterOptions = async () => {
      const options = await getFilterOptions();
      setFilterOptions(options);
    };
    loadFilterOptions();
  }, []);

  // Navega hacia la pantalla de favoritos

  const navigateToFavorites = useCallback(() => {
    navigation.navigate('Favorites');
  }, [navigation]);

  // Aplica los filtros

  const applyFilters = useCallback(() => {
    onFiltersChange({ ...filters });
    toggleModal();
  }, [filters, onFiltersChange]);

  // Limpia los filtros aplicados

  const clearFilters = useCallback(() => {
    setFilters({ species: '', status: '' });
    onFiltersChange({ species: '', status: '' });
  }, [onFiltersChange]);

  // configura la animacion de visibilidad del modal de filtros

  const toggleModal = useCallback(() => {
    if (modalVisible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    } else {
      setModalVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, opacity]);

  const getPillStyle = (filterType) => {
    return filters[filterType] ? styles.activePill : styles.inactivePill;
  };

  const handleBackdropPress = () => {
    toggleModal();
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        testID='search'
        style={styles.searchInput}
        placeholder="Search by name..."
        value={searchQuery}
        onChangeText={onSearchChange}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TouchableOpacity testID='filter-icon' onPress={toggleModal} style={styles.filterButton}>
        <Icon name="filter-alt" size={24} color="#F0F2EB" />
      </TouchableOpacity>
      <TouchableOpacity testID='fav-icon' onPress={navigateToFavorites} style={styles.favoritesButton}>
        <Icon name="star" size={24} color="#F0F2EB" />
      </TouchableOpacity>
      <Modal testID='filters-modal' visible={modalVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback testID='prev-button' onPress={handleBackdropPress}>
          <Animated.View testID='filters-card' style={[styles.modalContainer, { opacity }]}>
            <View style={styles.modalContent}>
              <Text testID='filters-title' style={styles.modalTitle}>Filter by:</Text>
              <View style={styles.pillContainer}>
                <Text testID='species-pill' style={[styles.pillText, getPillStyle('species')]}>Species: {filters.species || 'All'}</Text>
                <Text testID='status-pill' style={[styles.pillText, getPillStyle('status')]}>Status: {filters.status || 'All'}</Text>
              </View>
              <Text>Species</Text>
              <Picker
                testID='species-picker'
                selectedValue={filters.species}
                onValueChange={(itemValue) => setFilters({ ...filters, species: itemValue })}
              >
                <Picker.Item label="All" value="" />
                {filterOptions.species.map((specie) => (
                  <Picker.Item key={specie} label={specie} value={specie} />
                ))}
              </Picker>
              <Text>Status</Text>
              <Picker
                testID='status-picker'
                selectedValue={filters.status}
                onValueChange={(itemValue) => setFilters({ ...filters, status: itemValue })}
              >
                <Picker.Item label="All" value="" />
                {filterOptions.status.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
              <View style={styles.buttonContainer}>
                <TouchableOpacity testID='clear-filters' onPress={clearFilters} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear Filters</Text>
                </TouchableOpacity>
                <TouchableOpacity testID='apply-filters' onPress={applyFilters} style={styles.applyButton}>
                  <Text style={styles.buttonText}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F0F2EB',
    borderBottomWidth: 1,
    borderBottomColor: '#A7CB54',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#208D45',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#0D0D0D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#208D45',
  },
  pillContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  pillText: {
    marginRight: 10,
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#5CAD4A',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activePill: {
    backgroundColor: '#5CAD4A',
  },
  inactivePill: {
    backgroundColor: '#A7CB54',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    padding: 10,
    marginRight: 10,
  },
  clearButtonText: {
    color: '#5CAD4A', 
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#5CAD4A',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  favoritesButton: {
    padding: 10,
    backgroundColor: '#A7CB54',
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default SearchBar;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchCharacterDetails } from '../services/CharacterService';
import CharacterDetailCard from '../components/CharacterDetailCard';
import { useLoading } from '../contexts/LoadingContext';

const CharacterDetailScreen = () => {
  const route = useRoute();
  const { characterId } = route.params;
  const { setLoader } = useLoading();
  const [characterDetails, setCharacterDetails] = useState(null);

  /**
   * useCallback para memorizar la función fetchDetails y evitar su recreación en cada render.
   */
  const fetchDetails = useCallback(async () => {
    setLoader(true);

    try {
      const details = await fetchCharacterDetails(characterId);

      // Mantiene el spinner visible durante al menos 2000ms para mejorar la experiencia del usuario.
      const timeoutId = setTimeout(() => {
        setCharacterDetails(details);
        setLoader(false);
      }, 2000);
      
      // Cleanup para evitar problemas si el componente se desmonta antes de que el timeout termine.
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error('Error fetching character details:', error);
      setLoader(false);
    }
  }, [characterId, setLoader]);

  /**
   * useEffect para ejecutar fetchDetails cuando el componente se monta
   * o cuando cambia el characterId.
   */
  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  /**
   * useMemo para memorizar el componente CharacterDetailCard
   * y evitar renders innecesarios.
   */
  const characterDetailCard = useMemo(() => (
    <CharacterDetailCard character={characterDetails} />
  ), [characterDetails]);

  return (
    <View style={styles.container}>
      {characterDetailCard}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CharacterDetailScreen;

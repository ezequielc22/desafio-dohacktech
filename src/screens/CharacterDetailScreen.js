import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchCharacterDetails } from '../services/CharacterService';
import CharacterDetailCard from '../components/CharacterDetailCard/index';
import { useLoading } from '../contexts/LoadingContext';

const CharacterDetailScreen = () => {
  const route = useRoute();
  const { characterId } = route.params;
  const { setLoader } = useLoading();
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoader(true);

      try {
        const details = await fetchCharacterDetails(characterId);

        // Establece un mínimo de 2000ms antes de ocultar el spinner
        const timeoutId = setTimeout(() => {
          setCharacterDetails(details);
          setLoader(false);
        }, 2000);
        
        // Cleanup para evitar problemas si el componente se desmonta antes de que el timeout termine
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };

    fetchDetails();
  }, [characterId]);


  return (
    <View style={styles.container}>
      <CharacterDetailCard character={characterDetails} />
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

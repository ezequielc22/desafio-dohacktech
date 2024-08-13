import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EpisodeDetail from '../components/EpisodeDetail';
import { getEpisodeDetails, getCharacterDetails } from '../services/EpisodeServices';
import { useLoading } from '../contexts/LoadingContext';

const EpisodeDetailScreen = ({ route }) => {
  const { setLoader } = useLoading();
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);

  /**
   * useCallback para memorizar la función fetchEpisodeDetails
   * y evitar su recreación en cada render.
   */
  const fetchEpisodeDetails = useCallback(async () => {
    setLoader(true);
    try {
      const data = await getEpisodeDetails(episodeId);
      // Obtener detalles de los personajes en paralelo
      const characterPromises = data.characters.map(getCharacterDetails);
      const characterData = await Promise.all(characterPromises);
      
      // Mantiene el loader visible durante al menos 2000ms para mejorar la UX.
      const timeoutId = setTimeout(() => {
        setEpisode(data);
        setCharacters(characterData);
        setLoader(false);
      }, 2000);

      // Cleanup para evitar problemas si el componente se desmonta antes de que el timeout termine.
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error('Error fetching episode details:', error);
      setLoader(false);
    }
  }, [episodeId, setLoader]);

  /**
   * useEffect para ejecutar fetchEpisodeDetails cuando el componente
   * se monta o cuando cambia el episodeId.
   */
  useEffect(() => {
    fetchEpisodeDetails();
  }, [fetchEpisodeDetails]);

  /**
   * useMemo para memorizar el componente EpisodeDetail
   * y evitar renders innecesarios.
   */
  const episodeDetailComponent = useMemo(() => (
    <EpisodeDetail episode={episode} characters={characters} />
  ), [episode, characters]);

  return (
    <ScrollView style={styles.container}>
      {episodeDetailComponent}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default EpisodeDetailScreen;

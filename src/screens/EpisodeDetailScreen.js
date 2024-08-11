import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import EpisodeDetail from '../components/EpisodeDetail/index';
import { getEpisodeDetails, getCharacterDetails } from '../services/EpisodeServices';
import { useLoading } from '../contexts/LoadingContext';

const EpisodeDetailScreen = ({ route }) => {
  const { setLoader } = useLoading();
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      setLoader(true);
      try {
        const data = await getEpisodeDetails(episodeId);
        // Obtener detalles de los personajes en paralelo
        const characterPromises = data.characters.map((url) => getCharacterDetails(url));
        const characterData = await Promise.all(characterPromises);
        const timeoutId = setTimeout(() => {
          setEpisode(data);
          setCharacters(characterData);
          setLoader(false);
        }, 2000);
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    };
    fetchEpisodeDetails();
  }, [episodeId]);

  return (
    <ScrollView style={styles.container}>
      <EpisodeDetail episode={episode} characters={characters} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default EpisodeDetailScreen;

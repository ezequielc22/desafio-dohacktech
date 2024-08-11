import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getEpisodeDetails = async (episodeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/episode/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch episode details', error);
    throw error;
  }
};

export const getCharacterDetails = async (characterUrl) => {
  try {
    const response = await axios.get(characterUrl);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch character details', error);
    throw error;
  }
};
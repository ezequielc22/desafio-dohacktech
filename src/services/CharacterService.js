import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (page, searchQuery = '', filters = '') => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          name: searchQuery,
          ...filters // Asumiendo que los filtros se pasan como un objeto de parámetros
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const fetchCharacterDetails = async (characterId) => {
    const response = await axios.get(`${API_URL}/${characterId}`);
    return response.data;
  };

export const getFilterOptions = async () => {
    const response = await axios.get(`${API_URL}`);
    const characters = response.data.results;
  
    const species = [...new Set(characters.map(character => character.species))];
    const status = [...new Set(characters.map(character => character.status))];
  
    return { species, status };
  };
// services/CharacterService.js
export const getCharactersByIds = async (ids) => {
    if (!ids || ids.length === 0) {
      return []; // Retorna una lista vacía si no se proporcionan IDs
    }
  
    try {
      const response = await axios.get(`${API_URL}/${ids.join(',')}`);
      return Array.isArray(response.data) ? response.data : [response.data]; // Asegúrate de que siempre sea un array
    } catch (error) {
      console.error('Error fetching characters by IDs:', error);
      return [];
    }
  };
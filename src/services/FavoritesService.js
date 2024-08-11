// services/FavoriteService.js
import { getCharactersByIds } from './CharacterService';

export const getFavoriteCharacters = async (favoriteIds) => {
  if (!favoriteIds || favoriteIds.size === 0) {
    return []; // Retorna una lista vacía si no hay favoritos
  }

  try {
    const characters = await getCharactersByIds(Array.from(favoriteIds));
    return characters;
  } catch (error) {
    console.error('Error fetching favorite characters:', error);
    return [];
  }
};

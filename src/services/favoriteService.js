import api from '../config/api';

/**
 * Favorite Service
 * Handles client favorites (saved workers)
 */

const favoriteService = {
  /**
   * Add worker to favorites (Client only)
   * @param {number} workerId - Worker ID
   * @returns {Promise<Object>} Created favorite
   */
  addFavorite: async (workerId) => {
    const response = await api.post('/favorites', { worker_id: workerId });
    return response.data;
  },

  /**
   * Get all favorites
   * @returns {Promise<Array>} All favorites
   */
  getAllFavorites: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },

  /**
   * Get favorite by ID
   * @param {number} id - Favorite ID
   * @returns {Promise<Object>} Favorite details
   */
  getFavoriteById: async (id) => {
    const response = await api.get(`/favorites/${id}`);
    return response.data;
  },

  /**
   * Get client's favorites
   * @param {number} clientId - Client user ID
   * @returns {Promise<Array>} Client's favorite workers
   */
  getClientFavorites: async (clientId) => {
    const response = await api.get(`/favorites/client/${clientId}`);
    return response.data;
  },

  /**
   * Check if worker is favorited by client
   * @param {number} clientId - Client user ID
   * @param {number} workerId - Worker ID
   * @returns {Promise<Object>} { isFavorite: boolean, favorite: Object|null }
   */
  isWorkerFavorited: async (clientId, workerId) => {
    try {
      const response = await api.get(`/favorites/client/${clientId}/worker/${workerId}`);
      return { isFavorite: true, favorite: response.data };
    } catch (error) {
      if (error.response?.status === 404) {
        return { isFavorite: false, favorite: null };
      }
      throw error;
    }
  },

  /**
   * Update favorite
   * @param {number} id - Favorite ID
   * @param {Object} favoriteData - Updated data
   * @returns {Promise<Object>} Updated favorite
   */
  updateFavorite: async (id, favoriteData) => {
    const response = await api.patch(`/favorites/${id}`, favoriteData);
    return response.data;
  },

  /**
   * Remove from favorites
   * @param {number} id - Favorite ID
   * @returns {Promise<void>}
   */
  removeFavorite: async (id) => {
    const response = await api.delete(`/favorites/${id}`);
    return response.data;
  },

  /**
   * Toggle favorite status
   * @param {number} clientId - Client user ID
   * @param {number} workerId - Worker ID
   * @returns {Promise<Object>} { action: 'added'|'removed', favorite: Object|null }
   */
  toggleFavorite: async (clientId, workerId) => {
    const { isFavorite, favorite } = await favoriteService.isWorkerFavorited(clientId, workerId);
    
    if (isFavorite) {
      await favoriteService.removeFavorite(favorite.id);
      return { action: 'removed', favorite: null };
    } else {
      const newFavorite = await favoriteService.addFavorite(workerId);
      return { action: 'added', favorite: newFavorite };
    }
  },

  /**
   * Get favorite worker IDs for a client
   * @param {number} clientId - Client user ID
   * @returns {Promise<Array<number>>} Array of worker IDs
   */
  getFavoriteWorkerIds: async (clientId) => {
    const favorites = await favoriteService.getClientFavorites(clientId);
    return favorites.map((fav) => fav.worker_id);
  },

  /**
   * Check if worker ID is in favorites list
   * @param {Array} favorites - Array of favorites
   * @param {number} workerId - Worker ID to check
   * @returns {boolean} True if worker is favorited
   */
  isInFavorites: (favorites, workerId) => {
    return favorites.some((fav) => fav.worker_id === workerId);
  },

  /**
   * Sort favorites by date added
   * @param {Array} favorites - Array of favorites
   * @param {string} order - 'asc' or 'desc' (default: 'desc')
   * @returns {Array} Sorted favorites
   */
  sortByDate: (favorites, order = 'desc') => {
    return [...favorites].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Filter favorites by profession
   * @param {Array} favorites - Array of favorites
   * @param {number} professionId - Profession ID
   * @returns {Array} Filtered favorites
   */
  filterByProfession: (favorites, professionId) => {
    return favorites.filter((fav) => fav.worker?.profession_id === professionId);
  },

  /**
   * Filter favorites by minimum rating
   * @param {Array} favorites - Array of favorites
   * @param {number} minRating - Minimum rating (1-5)
   * @returns {Array} Filtered favorites
   */
  filterByMinRating: (favorites, minRating) => {
    return favorites.filter((fav) => fav.worker?.average_rating >= minRating);
  },

  /**
   * Get available favorite workers only
   * @param {Array} favorites - Array of favorites
   * @returns {Array} Available favorite workers
   */
  getAvailableFavorites: (favorites) => {
    return favorites.filter((fav) => fav.worker?.is_available === true);
  },
};

export default favoriteService;

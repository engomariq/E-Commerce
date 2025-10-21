import api from '../config/api';

/**
 * Profession Service
 * Handles worker professions/trades
 */

const professionService = {
  /**
   * Get all professions
   * @returns {Promise<Array>} All professions
   */
  getAllProfessions: async () => {
    const response = await api.get('/professions');
    return response.data;
  },

  /**
   * Get profession by ID
   * @param {number} id - Profession ID
   * @returns {Promise<Object>} Profession details
   */
  getProfessionById: async (id) => {
    const response = await api.get(`/professions/${id}`);
    return response.data;
  },

  /**
   * Create profession (Admin only)
   * @param {Object} professionData
   * @param {string} professionData.name - Profession name (required, Arabic)
   * @param {string} professionData.description - Description (optional, Arabic)
   * @param {boolean} professionData.is_active - Active status (default: true)
   * @returns {Promise<Object>} Created profession
   */
  createProfession: async (professionData) => {
    const response = await api.post('/professions', professionData);
    return response.data;
  },

  /**
   * Update profession (Admin only)
   * @param {number} id - Profession ID
   * @param {Object} professionData - Updated data
   * @returns {Promise<Object>} Updated profession
   */
  updateProfession: async (id, professionData) => {
    const response = await api.patch(`/professions/${id}`, professionData);
    return response.data;
  },

  /**
   * Delete profession (Admin only)
   * @param {number} id - Profession ID
   * @returns {Promise<void>}
   */
  deleteProfession: async (id) => {
    const response = await api.delete(`/professions/${id}`);
    return response.data;
  },

  /**
   * Get active professions only
   * @returns {Promise<Array>} Active professions
   */
  getActiveProfessions: async () => {
    const professions = await professionService.getAllProfessions();
    return professions.filter((profession) => profession.is_active);
  },

  /**
   * Search professions by name
   * @param {string} query - Search query (Arabic)
   * @returns {Promise<Array>} Matching professions
   */
  searchProfessions: async (query) => {
    const professions = await professionService.getAllProfessions();
    const lowerQuery = query.toLowerCase();
    return professions.filter((profession) =>
      profession.name.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Sort professions alphabetically
   * @param {Array} professions - Array of professions
   * @param {string} order - 'asc' or 'desc' (default: 'asc')
   * @returns {Array} Sorted professions
   */
  sortByName: (professions, order = 'asc') => {
    return [...professions].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'ar');
      return order === 'asc' ? comparison : -comparison;
    });
  },

  /**
   * Cache professions in localStorage
   * @param {Array} professions - Professions to cache
   * @param {number} expiryMinutes - Cache expiry in minutes (default: 60)
   */
  cacheProfessions: (professions, expiryMinutes = 60) => {
    const cacheData = {
      data: professions,
      expiry: Date.now() + expiryMinutes * 60 * 1000,
    };
    localStorage.setItem('professions_cache', JSON.stringify(cacheData));
  },

  /**
   * Get cached professions
   * @returns {Array|null} Cached professions or null if expired/not found
   */
  getCachedProfessions: () => {
    const cached = localStorage.getItem('professions_cache');
    if (!cached) return null;

    try {
      const cacheData = JSON.parse(cached);
      if (Date.now() < cacheData.expiry) {
        return cacheData.data;
      }
      localStorage.removeItem('professions_cache');
      return null;
    } catch (error) {
      localStorage.removeItem('professions_cache');
      return null;
    }
  },

  /**
   * Get professions with caching
   * @param {boolean} forceRefresh - Force refresh from API
   * @returns {Promise<Array>} Professions
   */
  getProfessionsWithCache: async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = professionService.getCachedProfessions();
      if (cached) return cached;
    }

    const professions = await professionService.getAllProfessions();
    professionService.cacheProfessions(professions);
    return professions;
  },

  /**
   * Common professions in Mosul (for reference)
   */
  commonProfessions: [
    'كهربائي', // Electrician
    'سباك', // Plumber
    'نجار', // Carpenter
    'دهان', // Painter
    'بناء', // Mason
    'ميكانيكي', // Mechanic
    'حداد', // Blacksmith
    'لحام', // Welder
    'تكييف وتبريد', // AC & Refrigeration
    'كهربائي سيارات', // Auto Electrician
    'ميكانيكي سيارات', // Auto Mechanic
    'نجار ألمنيوم', // Aluminum Carpenter
    'بلاط وسيراميك', // Tile & Ceramic
    'صيانة أجهزة منزلية', // Home Appliance Repair
  ],
};

export default professionService;

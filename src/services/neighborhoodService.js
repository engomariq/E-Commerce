import api from '../config/api';

/**
 * Neighborhood Service
 * Handles Mosul neighborhoods and areas
 */

const neighborhoodService = {
  /**
   * Get all neighborhoods
   * @returns {Promise<Array>} All neighborhoods
   */
  getAllNeighborhoods: async () => {
    const response = await api.get('/neighborhoods');
    return response.data;
  },

  /**
   * Get neighborhood by ID
   * @param {number} id - Neighborhood ID
   * @returns {Promise<Object>} Neighborhood details
   */
  getNeighborhoodById: async (id) => {
    const response = await api.get(`/neighborhoods/${id}`);
    return response.data;
  },

  /**
   * Create neighborhood (Admin only)
   * @param {Object} neighborhoodData
   * @param {string} neighborhoodData.name - Neighborhood name (required, Arabic)
   * @param {string} neighborhoodData.area - Area (required, Arabic: الساحل الأيمن | الساحل الأيسر)
   * @returns {Promise<Object>} Created neighborhood
   */
  createNeighborhood: async (neighborhoodData) => {
    const response = await api.post('/neighborhoods', neighborhoodData);
    return response.data;
  },

  /**
   * Update neighborhood (Admin only)
   * @param {number} id - Neighborhood ID
   * @param {Object} neighborhoodData - Updated data
   * @returns {Promise<Object>} Updated neighborhood
   */
  updateNeighborhood: async (id, neighborhoodData) => {
    const response = await api.patch(`/neighborhoods/${id}`, neighborhoodData);
    return response.data;
  },

  /**
   * Delete neighborhood (Admin only)
   * @param {number} id - Neighborhood ID
   * @returns {Promise<void>}
   */
  deleteNeighborhood: async (id) => {
    const response = await api.delete(`/neighborhoods/${id}`);
    return response.data;
  },

  /**
   * Get neighborhoods by area
   * @param {string} area - Area name (الساحل الأيمن | الساحل الأيسر)
   * @returns {Promise<Array>} Neighborhoods in area
   */
  getNeighborhoodsByArea: async (area) => {
    const neighborhoods = await neighborhoodService.getAllNeighborhoods();
    return neighborhoods.filter((neighborhood) => neighborhood.area === area);
  },

  /**
   * Get right side neighborhoods (الساحل الأيمن)
   * @returns {Promise<Array>} Right side neighborhoods
   */
  getRightSideNeighborhoods: async () => {
    return neighborhoodService.getNeighborhoodsByArea('الساحل الأيمن');
  },

  /**
   * Get left side neighborhoods (الساحل الأيسر)
   * @returns {Promise<Array>} Left side neighborhoods
   */
  getLeftSideNeighborhoods: async () => {
    return neighborhoodService.getNeighborhoodsByArea('الساحل الأيسر');
  },

  /**
   * Search neighborhoods by name
   * @param {string} query - Search query (Arabic)
   * @returns {Promise<Array>} Matching neighborhoods
   */
  searchNeighborhoods: async (query) => {
    const neighborhoods = await neighborhoodService.getAllNeighborhoods();
    const lowerQuery = query.toLowerCase();
    return neighborhoods.filter((neighborhood) =>
      neighborhood.name.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Sort neighborhoods alphabetically
   * @param {Array} neighborhoods - Array of neighborhoods
   * @param {string} order - 'asc' or 'desc' (default: 'asc')
   * @returns {Array} Sorted neighborhoods
   */
  sortByName: (neighborhoods, order = 'asc') => {
    return [...neighborhoods].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'ar');
      return order === 'asc' ? comparison : -comparison;
    });
  },

  /**
   * Group neighborhoods by area
   * @param {Array} neighborhoods - Array of neighborhoods
   * @returns {Object} { 'الساحل الأيمن': [], 'الساحل الأيسر': [] }
   */
  groupByArea: (neighborhoods) => {
    return neighborhoods.reduce((acc, neighborhood) => {
      const area = neighborhood.area;
      if (!acc[area]) {
        acc[area] = [];
      }
      acc[area].push(neighborhood);
      return acc;
    }, {});
  },

  /**
   * Cache neighborhoods in localStorage
   * @param {Array} neighborhoods - Neighborhoods to cache
   * @param {number} expiryMinutes - Cache expiry in minutes (default: 60)
   */
  cacheNeighborhoods: (neighborhoods, expiryMinutes = 60) => {
    const cacheData = {
      data: neighborhoods,
      expiry: Date.now() + expiryMinutes * 60 * 1000,
    };
    localStorage.setItem('neighborhoods_cache', JSON.stringify(cacheData));
  },

  /**
   * Get cached neighborhoods
   * @returns {Array|null} Cached neighborhoods or null if expired/not found
   */
  getCachedNeighborhoods: () => {
    const cached = localStorage.getItem('neighborhoods_cache');
    if (!cached) return null;

    try {
      const cacheData = JSON.parse(cached);
      if (Date.now() < cacheData.expiry) {
        return cacheData.data;
      }
      localStorage.removeItem('neighborhoods_cache');
      return null;
    } catch (error) {
      localStorage.removeItem('neighborhoods_cache');
      return null;
    }
  },

  /**
   * Get neighborhoods with caching
   * @param {boolean} forceRefresh - Force refresh from API
   * @returns {Promise<Array>} Neighborhoods
   */
  getNeighborhoodsWithCache: async (forceRefresh = false) => {
    if (!forceRefresh) {
      const cached = neighborhoodService.getCachedNeighborhoods();
      if (cached) return cached;
    }

    const neighborhoods = await neighborhoodService.getAllNeighborhoods();
    neighborhoodService.cacheNeighborhoods(neighborhoods);
    return neighborhoods;
  },

  /**
   * Mosul areas
   */
  areas: {
    RIGHT_SIDE: 'الساحل الأيمن',
    LEFT_SIDE: 'الساحل الأيسر',
  },

  /**
   * Common neighborhoods in Mosul (for reference)
   */
  commonNeighborhoods: {
    rightSide: [
      'الكرامة',
      'الوحدة',
      'المثنى',
      'الزهراء',
      'الشفاء',
      'الرفاعي',
      'الزنجيلي',
      'المهندسين',
      'الصحة',
      'الجامعة',
    ],
    leftSide: [
      'الشورة',
      'باب الطوب',
      'الدواسة',
      'باب البيض',
      'الشفاء',
      'النبي شيت',
      'الميدان',
      'باب لكش',
      'الرسالة',
      'الفاروق',
    ],
  },
};

export default neighborhoodService;

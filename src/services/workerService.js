import api, { API_BASE_URL } from '../config/api';

/**
 * Worker Service
 * Handles worker profiles, search, and portfolio management
 */

const workerService = {
  /**
   * Search and filter workers with pagination
   * @param {Object} params - Query parameters
   * @param {number} params.profession_id - Filter by profession
   * @param {number} params.neighborhood_id - Filter by neighborhood
   * @param {string} params.area - Filter by area (الساحل الأيمن | الساحل الأيسر)
   * @param {boolean} params.is_available - Only available workers
   * @param {number} params.min_rating - Minimum rating (1-5)
   * @param {string} params.search - Search in name and bio
   * @param {string} params.sort - Sort by (rating|experience|jobs|name|recent)
   * @param {string} params.order - Sort order (ASC|DESC)
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.limit - Items per page (default: 10)
   * @returns {Promise<Object>} { data: [], meta: { page, limit, total, totalPages, hasNext, hasPrev } }
   */
  searchWorkers: async (params = {}) => {
    const response = await api.get('/workers', { params });
    return response.data;
  },

  /**
   * Get worker by ID
   * @param {number} id - Worker ID
   * @returns {Promise<Object>} Worker details
   */
  getWorkerById: async (id) => {
    const response = await api.get(`/workers/${id}`);
    return response.data;
  },

  /**
   * Get worker by user ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} Worker details
   */
  getWorkerByUserId: async (userId) => {
    const response = await api.get(`/workers/user/${userId}`);
    return response.data;
  },

  /**
   * Create worker profile
   * @param {Object} workerData
   * @param {number} workerData.profession_id - Profession ID (required)
   * @param {string} workerData.bio - Bio (Arabic)
   * @param {number} workerData.experience_years - Years of experience
   * @param {string} workerData.contact_phone - Contact phone
   * @param {string} workerData.whatsapp_number - WhatsApp number
   * @param {string} workerData.facebook_url - Facebook URL
   * @param {string} workerData.instagram_url - Instagram URL
   * @param {boolean} workerData.is_available - Availability status
   * @returns {Promise<Object>} Created worker
   */
  createWorker: async (workerData) => {
    const response = await api.post('/workers', workerData);
    return response.data;
  },

  /**
   * Update worker profile
   * @param {number} id - Worker ID
   * @param {Object} workerData - Updated data
   * @returns {Promise<Object>} Updated worker
   */
  updateWorker: async (id, workerData) => {
    const response = await api.patch(`/workers/${id}`, workerData);
    return response.data;
  },

  /**
   * Delete worker profile
   * @param {number} id - Worker ID
   * @returns {Promise<void>}
   */
  deleteWorker: async (id) => {
    const response = await api.delete(`/workers/${id}`);
    return response.data;
  },

  /**
   * Upload worker profile image
   * @param {number} workerId - Worker ID
   * @param {File} imageFile - Image file (max 5MB, jpg/jpeg/png/gif/webp)
   * @returns {Promise<Object>} { profile_image: string }
   */
  uploadProfileImage: async (workerId, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post(`/workers/upload-profile-image/${workerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get full URL for profile image
   * @param {string} imagePath - Image path from API
   * @returns {string} Full image URL
   */
  getProfileImageUrl: (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  },

  /**
   * Get available workers only
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Available workers
   */
  getAvailableWorkers: async (params = {}) => {
    return workerService.searchWorkers({ ...params, is_available: true });
  },

  /**
   * Get top-rated workers
   * @param {number} limit - Number of workers to fetch
   * @returns {Promise<Object>} Top-rated workers
   */
  getTopRatedWorkers: async (limit = 10) => {
    return workerService.searchWorkers({
      sort: 'rating',
      order: 'DESC',
      limit,
      min_rating: 4.0,
    });
  },

  /**
   * Get workers by profession
   * @param {number} professionId - Profession ID
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Workers in profession
   */
  getWorkersByProfession: async (professionId, params = {}) => {
    return workerService.searchWorkers({ ...params, profession_id: professionId });
  },

  /**
   * Get workers by neighborhood
   * @param {number} neighborhoodId - Neighborhood ID
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Workers in neighborhood
   */
  getWorkersByNeighborhood: async (neighborhoodId, params = {}) => {
    return workerService.searchWorkers({ ...params, neighborhood_id: neighborhoodId });
  },

  /**
   * Get workers by area
   * @param {string} area - Area name (الساحل الأيمن | الساحل الأيسر)
   * @param {Object} params - Additional query parameters
   * @returns {Promise<Object>} Workers in area
   */
  getWorkersByArea: async (area, params = {}) => {
    return workerService.searchWorkers({ ...params, area });
  },
};

export default workerService;

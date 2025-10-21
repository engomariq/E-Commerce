import api, { API_BASE_URL } from '../config/api';

/**
 * Portfolio Service
 * Handles worker portfolio images
 */

const portfolioService = {
  /**
   * Get all portfolio items
   * @returns {Promise<Array>} Portfolio items
   */
  getAllPortfolio: async () => {
    const response = await api.get('/worker-portfolio');
    return response.data;
  },

  /**
   * Get portfolio item by ID
   * @param {number} id - Portfolio item ID
   * @returns {Promise<Object>} Portfolio item
   */
  getPortfolioById: async (id) => {
    const response = await api.get(`/worker-portfolio/${id}`);
    return response.data;
  },

  /**
   * Get portfolio items for a worker
   * @param {number} workerId - Worker ID
   * @returns {Promise<Array>} Worker's portfolio items
   */
  getWorkerPortfolio: async (workerId) => {
    const response = await api.get(`/worker-portfolio/worker/${workerId}`);
    return response.data;
  },

  /**
   * Create portfolio item
   * @param {Object} portfolioData
   * @param {number} portfolioData.worker_id - Worker ID
   * @param {string} portfolioData.image_url - Image URL
   * @param {string} portfolioData.description - Description (optional, Arabic)
   * @returns {Promise<Object>} Created portfolio item
   */
  createPortfolio: async (portfolioData) => {
    const response = await api.post('/worker-portfolio', portfolioData);
    return response.data;
  },

  /**
   * Update portfolio item
   * @param {number} id - Portfolio item ID
   * @param {Object} portfolioData - Updated data
   * @returns {Promise<Object>} Updated portfolio item
   */
  updatePortfolio: async (id, portfolioData) => {
    const response = await api.patch(`/worker-portfolio/${id}`, portfolioData);
    return response.data;
  },

  /**
   * Delete portfolio item
   * @param {number} id - Portfolio item ID
   * @returns {Promise<void>}
   */
  deletePortfolio: async (id) => {
    const response = await api.delete(`/worker-portfolio/${id}`);
    return response.data;
  },

  /**
   * Upload portfolio image
   * @param {number} workerId - Worker ID
   * @param {File} imageFile - Image file (max 10MB, jpg/jpeg/png/gif/webp)
   * @param {string} description - Optional description (Arabic)
   * @returns {Promise<Object>} Created portfolio item with image
   */
  uploadPortfolioImage: async (workerId, imageFile, description = '') => {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (description) {
      formData.append('description', description);
    }

    const response = await api.post(`/worker-portfolio/upload/${workerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Upload multiple portfolio images
   * @param {number} workerId - Worker ID
   * @param {Array<File>} imageFiles - Array of image files
   * @param {Array<string>} descriptions - Optional descriptions for each image
   * @returns {Promise<Array>} Created portfolio items
   */
  uploadMultipleImages: async (workerId, imageFiles, descriptions = []) => {
    const uploadPromises = imageFiles.map((file, index) =>
      portfolioService.uploadPortfolioImage(workerId, file, descriptions[index] || '')
    );
    return Promise.all(uploadPromises);
  },

  /**
   * Get full URL for portfolio image
   * @param {string} imagePath - Image path from API
   * @returns {string} Full image URL
   */
  getPortfolioImageUrl: (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('http') ? imagePath : `${API_BASE_URL}${imagePath}`;
  },
};

export default portfolioService;

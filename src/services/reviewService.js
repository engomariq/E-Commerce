import api from '../config/api';

/**
 * Review Service
 * Handles reviews and ratings for workers
 */

const reviewService = {
  /**
   * Create a review (Client only, for completed requests)
   * @param {Object} reviewData
   * @param {number} reviewData.request_id - Request ID (required, must be completed)
   * @param {number} reviewData.rating - Rating 1-5 (required)
   * @param {string} reviewData.comment - Comment (optional, Arabic)
   * @returns {Promise<Object>} Created review
   */
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  /**
   * Get all reviews
   * @returns {Promise<Array>} All reviews
   */
  getAllReviews: async () => {
    const response = await api.get('/reviews');
    return response.data;
  },

  /**
   * Get review by ID
   * @param {number} id - Review ID
   * @returns {Promise<Object>} Review details
   */
  getReviewById: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  /**
   * Get reviews for a worker
   * @param {number} workerId - Worker ID
   * @returns {Promise<Array>} Worker's reviews
   */
  getWorkerReviews: async (workerId) => {
    const response = await api.get(`/reviews/worker/${workerId}`);
    return response.data;
  },

  /**
   * Update review
   * @param {number} id - Review ID
   * @param {Object} reviewData
   * @param {number} reviewData.rating - Rating 1-5
   * @param {string} reviewData.comment - Comment (Arabic)
   * @returns {Promise<Object>} Updated review
   */
  updateReview: async (id, reviewData) => {
    const response = await api.patch(`/reviews/${id}`, reviewData);
    return response.data;
  },

  /**
   * Delete review
   * @param {number} id - Review ID
   * @returns {Promise<void>}
   */
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  /**
   * Calculate average rating from reviews
   * @param {Array} reviews - Array of reviews
   * @returns {number} Average rating (0 if no reviews)
   */
  calculateAverageRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(2);
  },

  /**
   * Group reviews by rating
   * @param {Array} reviews - Array of reviews
   * @returns {Object} { 5: count, 4: count, 3: count, 2: count, 1: count }
   */
  groupByRating: (reviews) => {
    const grouped = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        grouped[review.rating]++;
      }
    });
    return grouped;
  },

  /**
   * Get rating distribution percentages
   * @param {Array} reviews - Array of reviews
   * @returns {Object} { 5: percentage, 4: percentage, ... }
   */
  getRatingDistribution: (reviews) => {
    const grouped = reviewService.groupByRating(reviews);
    const total = reviews.length;
    const distribution = {};
    
    for (let rating = 5; rating >= 1; rating--) {
      distribution[rating] = total > 0 ? ((grouped[rating] / total) * 100).toFixed(1) : 0;
    }
    
    return distribution;
  },

  /**
   * Filter reviews by minimum rating
   * @param {Array} reviews - Array of reviews
   * @param {number} minRating - Minimum rating (1-5)
   * @returns {Array} Filtered reviews
   */
  filterByMinRating: (reviews, minRating) => {
    return reviews.filter((review) => review.rating >= minRating);
  },

  /**
   * Sort reviews by date
   * @param {Array} reviews - Array of reviews
   * @param {string} order - 'asc' or 'desc' (default: 'desc')
   * @returns {Array} Sorted reviews
   */
  sortByDate: (reviews, order = 'desc') => {
    return [...reviews].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Sort reviews by rating
   * @param {Array} reviews - Array of reviews
   * @param {string} order - 'asc' or 'desc' (default: 'desc')
   * @returns {Array} Sorted reviews
   */
  sortByRating: (reviews, order = 'desc') => {
    return [...reviews].sort((a, b) => {
      return order === 'desc' ? b.rating - a.rating : a.rating - b.rating;
    });
  },

  /**
   * Get recent reviews
   * @param {Array} reviews - Array of reviews
   * @param {number} limit - Number of reviews to return
   * @returns {Array} Recent reviews
   */
  getRecentReviews: (reviews, limit = 5) => {
    return reviewService.sortByDate(reviews, 'desc').slice(0, limit);
  },

  /**
   * Check if request can be reviewed
   * @param {Object} request - Request object
   * @returns {boolean} True if request can be reviewed
   */
  canReviewRequest: (request) => {
    return request.status === 'completed';
  },

  /**
   * Format rating for display (stars)
   * @param {number} rating - Rating value (1-5)
   * @returns {string} Star representation
   */
  formatRatingStars: (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
  },
};

export default reviewService;

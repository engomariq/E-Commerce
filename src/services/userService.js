import api from '../config/api';

/**
 * User Service
 * Handles user management (Admin operations)
 */

const userService = {
  /**
   * Create a new user (Admin only)
   * @param {Object} userData
   * @param {string} userData.name - Full name (Arabic)
   * @param {string} userData.email - Email (optional)
   * @param {string} userData.phone - Phone number
   * @param {string} userData.password - Password
   * @param {string} userData.role - 'client' | 'worker' | 'admin'
   * @param {number} userData.neighborhood_id - Neighborhood ID (optional)
   * @returns {Promise<Object>} Created user
   */
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  /**
   * Get all users (Admin only)
   * @returns {Promise<Array>} All users
   */
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object>} User details
   */
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  /**
   * Update user (Admin only)
   * @param {number} id - User ID
   * @param {Object} userData - Updated data
   * @returns {Promise<Object>} Updated user
   */
  updateUser: async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },

  /**
   * Delete user (Admin only)
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  /**
   * Filter users by role
   * @param {Array} users - Array of users
   * @param {string} role - Role to filter by
   * @returns {Array} Filtered users
   */
  filterByRole: (users, role) => {
    return users.filter((user) => user.role === role);
  },

  /**
   * Get clients only
   * @param {Array} users - Array of users
   * @returns {Array} Client users
   */
  getClients: (users) => {
    return userService.filterByRole(users, 'client');
  },

  /**
   * Get workers only
   * @param {Array} users - Array of users
   * @returns {Array} Worker users
   */
  getWorkers: (users) => {
    return userService.filterByRole(users, 'worker');
  },

  /**
   * Get admins only
   * @param {Array} users - Array of users
   * @returns {Array} Admin users
   */
  getAdmins: (users) => {
    return userService.filterByRole(users, 'admin');
  },

  /**
   * Search users by name
   * @param {Array} users - Array of users
   * @param {string} query - Search query
   * @returns {Array} Matching users
   */
  searchByName: (users, query) => {
    const lowerQuery = query.toLowerCase();
    return users.filter((user) => user.name.toLowerCase().includes(lowerQuery));
  },

  /**
   * Filter users by neighborhood
   * @param {Array} users - Array of users
   * @param {number} neighborhoodId - Neighborhood ID
   * @returns {Array} Users in neighborhood
   */
  filterByNeighborhood: (users, neighborhoodId) => {
    return users.filter((user) => user.neighborhood_id === neighborhoodId);
  },

  /**
   * Sort users by name
   * @param {Array} users - Array of users
   * @param {string} order - 'asc' or 'desc' (default: 'asc')
   * @returns {Array} Sorted users
   */
  sortByName: (users, order = 'asc') => {
    return [...users].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'ar');
      return order === 'asc' ? comparison : -comparison;
    });
  },

  /**
   * Sort users by creation date
   * @param {Array} users - Array of users
   * @param {string} order - 'asc' or 'desc' (default: 'desc')
   * @returns {Array} Sorted users
   */
  sortByDate: (users, order = 'desc') => {
    return [...users].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Get user statistics
   * @param {Array} users - Array of users
   * @returns {Object} Statistics
   */
  getStatistics: (users) => {
    return {
      total: users.length,
      clients: userService.getClients(users).length,
      workers: userService.getWorkers(users).length,
      admins: userService.getAdmins(users).length,
      verified: users.filter((u) => u.is_email_verified).length,
      phoneVerified: users.filter((u) => u.is_phone_verified).length,
    };
  },
};

export default userService;

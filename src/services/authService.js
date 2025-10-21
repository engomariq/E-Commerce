import api from '../config/api';

/**
 * Authentication Service
 * Handles user registration, login, logout, and profile management
 */

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.name - Full name (Arabic)
   * @param {string} userData.email - Email (optional)
   * @param {string} userData.phone - Phone number (Iraqi format)
   * @param {string} userData.password - Password (min 6 chars)
   * @param {string} userData.role - 'client' | 'worker' | 'admin'
   * @param {number} userData.neighborhood_id - Neighborhood ID (optional)
   * @returns {Promise<Object>} { access_token, user }
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Login user
   * @param {Object} credentials
   * @param {string} credentials.phone - Phone number OR email
   * @param {string} credentials.password - Password
   * @returns {Promise<Object>} { access_token, user }
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  /**
   * Change user password
   * @param {Object} passwordData
   * @param {string} passwordData.oldPassword - Current password
   * @param {string} passwordData.newPassword - New password
   * @returns {Promise<Object>}
   */
  changePassword: async (passwordData) => {
    const response = await api.patch('/auth/change-password', passwordData);
    return response.data;
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get current token from localStorage
   * @returns {string|null} JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Check if user has specific role
   * @param {string} role - Role to check ('client' | 'worker' | 'admin')
   * @returns {boolean}
   */
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user?.role === role;
  },
};

export default authService;

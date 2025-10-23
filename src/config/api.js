// API Configuration
export const API_BASE_URL = 'http://localhost:3000';

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Helper function for API calls
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Extract detailed error message from backend
      let errorMessage = 'An error occurred';
      
      if (data.message) {
        // Handle array of messages or single message
        if (Array.isArray(data.message)) {
          errorMessage = data.message.join(', ');
        } else {
          errorMessage = data.message;
        }
      }

      throw {
        status: response.status,
        message: errorMessage,
        data,
      };
    }

    return { success: true, data };
  } catch (error) {
    if (error.status) {
      return { success: false, error: error.message, status: error.status, data: error.data };
    }
    return { success: false, error: 'Network error. Please check your connection.' };
  }
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    LOGOUT: '/auth/logout',
    SEED_ADMIN: '/auth/seed-admin',
  },
  USERS: '/users',
  WORKERS: '/workers',
  PROFESSIONS: '/professions',
  NEIGHBORHOODS: '/neighborhoods',
  REQUESTS: '/requests',
  REVIEWS: '/reviews',
  FAVORITES: '/favorites',
};

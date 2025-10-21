import axios from 'axios';

// API Base URL - change this for production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable CORS credentials
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden - show access denied message
          console.error('ليس لديك صلاحية للقيام بهذا الإجراء');
          break;
        case 404:
          console.error('المورد المطلوب غير موجود');
          break;
        case 409:
          console.error('البيانات موجودة مسبقاً');
          break;
        case 500:
          console.error('خطأ في الخادم');
          break;
        default:
          console.error('حدث خطأ غير متوقع');
      }
    } else if (error.request) {
      // Network error
      console.error('خطأ في الاتصال بالشبكة');
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default api;

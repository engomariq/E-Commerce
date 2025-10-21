/**
 * Error Handler Utility
 * Provides helper functions for handling API errors
 */

/**
 * Extract error message from API error response
 * @param {Error} error - Error object from API
 * @returns {string} Error message in Arabic
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    const { data, status } = error.response;

    // Handle validation errors (array of messages)
    if (Array.isArray(data.message)) {
      return data.message.join('\n');
    }

    // Handle single error message
    if (data.message) {
      return data.message;
    }

    // Handle by status code
    switch (status) {
      case 400:
        return 'بيانات غير صحيحة. يرجى التحقق من المدخلات';
      case 401:
        return 'يجب تسجيل الدخول للمتابعة';
      case 403:
        return 'ليس لديك صلاحية للقيام بهذا الإجراء';
      case 404:
        return 'المورد المطلوب غير موجود';
      case 409:
        return 'البيانات موجودة مسبقاً';
      case 500:
        return 'خطأ في الخادم. يرجى المحاولة لاحقاً';
      default:
        return 'حدث خطأ غير متوقع';
    }
  } else if (error.request) {
    // Request made but no response
    return 'خطأ في الاتصال بالشبكة. يرجى التحقق من الاتصال بالإنترنت';
  } else {
    // Something else happened
    return error.message || 'حدث خطأ غير متوقع';
  }
};

/**
 * Check if error is authentication error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error.response?.status === 401;
};

/**
 * Check if error is authorization error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isForbiddenError = (error) => {
  return error.response?.status === 403;
};

/**
 * Check if error is not found error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isNotFoundError = (error) => {
  return error.response?.status === 404;
};

/**
 * Check if error is validation error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error.response?.status === 400;
};

/**
 * Check if error is network error
 * @param {Error} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return !error.response && error.request;
};

/**
 * Handle API error with callback
 * @param {Error} error - Error object
 * @param {Function} onError - Callback function (receives error message)
 */
export const handleApiError = (error, onError) => {
  const message = getErrorMessage(error);
  if (onError) {
    onError(message);
  }
  console.error('API Error:', message, error);
};

/**
 * Create error handler for specific component
 * @param {Function} setError - State setter for error message
 * @returns {Function} Error handler function
 */
export const createErrorHandler = (setError) => {
  return (error) => {
    const message = getErrorMessage(error);
    setError(message);
  };
};

/**
 * Validation error formatter
 * @param {Array|string} errors - Validation errors
 * @returns {Object} Formatted errors by field
 */
export const formatValidationErrors = (errors) => {
  if (typeof errors === 'string') {
    return { general: errors };
  }

  if (Array.isArray(errors)) {
    const formatted = {};
    errors.forEach((error) => {
      // Try to extract field name from error message
      const match = error.match(/^(\w+)\s/);
      const field = match ? match[1] : 'general';
      if (!formatted[field]) {
        formatted[field] = [];
      }
      formatted[field].push(error);
    });
    return formatted;
  }

  return { general: 'خطأ في التحقق من البيانات' };
};

export default {
  getErrorMessage,
  isAuthError,
  isForbiddenError,
  isNotFoundError,
  isValidationError,
  isNetworkError,
  handleApiError,
  createErrorHandler,
  formatValidationErrors,
};

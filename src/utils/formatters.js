/**
 * Formatters Utility
 * Provides helper functions for formatting data
 */

/**
 * Format date to Arabic locale
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Date(date).toLocaleDateString('ar-IQ', defaultOptions);
};

/**
 * Format date and time to Arabic locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  
  return new Date(date).toLocaleString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format relative time (e.g., "منذ 5 دقائق")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time in Arabic
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return 'الآن';
  } else if (diffMins < 60) {
    return `منذ ${diffMins} ${diffMins === 1 ? 'دقيقة' : 'دقائق'}`;
  } else if (diffHours < 24) {
    return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
  } else if (diffDays < 30) {
    return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
  } else {
    return formatDate(date);
  }
};

/**
 * Format phone number (Iraqi format)
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: 0790 123 4567
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};

/**
 * Format rating as stars
 * @param {number} rating - Rating value (0-5)
 * @param {boolean} showNumber - Show number alongside stars
 * @returns {string} Star representation
 */
export const formatRatingStars = (rating, showNumber = false) => {
  if (!rating) return '☆☆☆☆☆';
  
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const stars = '★'.repeat(fullStars) + (hasHalfStar ? '⯨' : '') + '☆'.repeat(emptyStars);
  
  return showNumber ? `${stars} (${rating.toFixed(1)})` : stars;
};

/**
 * Format number with Arabic numerals
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatArabicNumber = (num) => {
  if (num === null || num === undefined) return '';
  return num.toLocaleString('ar-IQ');
};

/**
 * Format experience years
 * @param {number} years - Years of experience
 * @returns {string} Formatted experience
 */
export const formatExperience = (years) => {
  if (!years) return 'بدون خبرة';
  if (years === 1) return 'سنة واحدة';
  if (years === 2) return 'سنتان';
  if (years <= 10) return `${years} سنوات`;
  return `${years} سنة`;
};

/**
 * Format request status to Arabic
 * @param {string} status - Request status
 * @returns {string} Status in Arabic
 */
export const formatRequestStatus = (status) => {
  const statusMap = {
    pending: 'قيد الانتظار',
    accepted: 'مقبول',
    rejected: 'مرفوض',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  };
  return statusMap[status] || status;
};

/**
 * Format user role to Arabic
 * @param {string} role - User role
 * @returns {string} Role in Arabic
 */
export const formatUserRole = (role) => {
  const roleMap = {
    client: 'عميل',
    worker: 'عامل',
    admin: 'مدير',
  };
  return roleMap[role] || role;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 بايت';
  
  const units = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

/**
 * Format URL for display
 * @param {string} url - URL to format
 * @returns {string} Formatted URL
 */
export const formatUrl = (url) => {
  if (!url) return '';
  return url.replace(/^https?:\/\/(www\.)?/, '');
};

/**
 * Get status color
 * @param {string} status - Request status
 * @returns {string} Color for status
 */
export const getStatusColor = (status) => {
  const colorMap = {
    pending: '#FFA500', // Orange
    accepted: '#4CAF50', // Green
    rejected: '#F44336', // Red
    completed: '#2196F3', // Blue
    cancelled: '#9E9E9E', // Gray
  };
  return colorMap[status] || '#000000';
};

/**
 * Get rating color
 * @param {number} rating - Rating value (1-5)
 * @returns {string} Color for rating
 */
export const getRatingColor = (rating) => {
  if (rating >= 4.5) return '#4CAF50'; // Green
  if (rating >= 3.5) return '#8BC34A'; // Light Green
  if (rating >= 2.5) return '#FFC107'; // Amber
  if (rating >= 1.5) return '#FF9800'; // Orange
  return '#F44336'; // Red
};

export default {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhoneNumber,
  formatRatingStars,
  formatArabicNumber,
  formatExperience,
  formatRequestStatus,
  formatUserRole,
  truncateText,
  formatFileSize,
  formatUrl,
  getStatusColor,
  getRatingColor,
};

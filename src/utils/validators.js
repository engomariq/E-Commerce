/**
 * Validators Utility
 * Provides validation functions for form inputs
 */

/**
 * Validate Iraqi phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  
  // Remove spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  
  // Iraqi phone format: starts with 07 and has 11 digits
  const iraqiPhoneRegex = /^07[3-9]\d{8}$/;
  
  return iraqiPhoneRegex.test(cleaned);
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('كلمة المرور مطلوبة');
    return { isValid: false, errors };
  }
  
  if (password.length < 6) {
    errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate name (Arabic)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const isValidName = (name) => {
  if (!name) return false;
  
  // Must be 2-100 characters
  if (name.length < 2 || name.length > 100) return false;
  
  return true;
};

/**
 * Validate rating
 * @param {number} rating - Rating to validate
 * @returns {boolean} True if valid (1-5)
 */
export const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  if (!url) return true; // Optional field
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {boolean} True if valid
 */
export const isValidFileSize = (file, maxSizeMB) => {
  if (!file) return false;
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} True if valid
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  if (!file) {
    return { isValid: false, error: 'لم يتم اختيار ملف' };
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!isValidFileType(file, allowedTypes)) {
    return { isValid: false, error: 'نوع الملف غير مدعوم. يرجى اختيار صورة (JPG, PNG, GIF, WEBP)' };
  }
  
  if (!isValidFileSize(file, maxSizeMB)) {
    return { isValid: false, error: `حجم الملف يجب أن يكون أقل من ${maxSizeMB} ميجابايت` };
  }
  
  return { isValid: true, error: null };
};

/**
 * Validate registration form
 * @param {Object} formData - Form data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  if (!isValidName(formData.name)) {
    errors.name = 'الاسم يجب أن يكون بين 2 و 100 حرف';
  }
  
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'البريد الإلكتروني غير صحيح';
  }
  
  if (!isValidPhone(formData.phone)) {
    errors.phone = 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 07';
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors.join(', ');
  }
  
  if (!formData.role) {
    errors.role = 'يرجى اختيار نوع الحساب';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate login form
 * @param {Object} formData - Form data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!formData.phone && !formData.email) {
    errors.identifier = 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني';
  }
  
  if (!formData.password) {
    errors.password = 'كلمة المرور مطلوبة';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate worker profile form
 * @param {Object} formData - Form data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateWorkerProfileForm = (formData) => {
  const errors = {};
  
  if (!formData.profession_id) {
    errors.profession_id = 'يرجى اختيار المهنة';
  }
  
  if (formData.experience_years && formData.experience_years < 0) {
    errors.experience_years = 'سنوات الخبرة يجب أن تكون رقماً موجباً';
  }
  
  if (formData.contact_phone && !isValidPhone(formData.contact_phone)) {
    errors.contact_phone = 'رقم الهاتف غير صحيح';
  }
  
  if (formData.whatsapp_number && !isValidPhone(formData.whatsapp_number)) {
    errors.whatsapp_number = 'رقم الواتساب غير صحيح';
  }
  
  if (formData.facebook_url && !isValidUrl(formData.facebook_url)) {
    errors.facebook_url = 'رابط الفيسبوك غير صحيح';
  }
  
  if (formData.instagram_url && !isValidUrl(formData.instagram_url)) {
    errors.instagram_url = 'رابط الإنستغرام غير صحيح';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate request form
 * @param {Object} formData - Form data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateRequestForm = (formData) => {
  const errors = {};
  
  if (!formData.worker_id) {
    errors.worker_id = 'يرجى اختيار العامل';
  }
  
  if (!formData.problem_description || formData.problem_description.trim().length === 0) {
    errors.problem_description = 'يرجى وصف المشكلة';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate review form
 * @param {Object} formData - Form data
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateReviewForm = (formData) => {
  const errors = {};
  
  if (!formData.request_id) {
    errors.request_id = 'معرف الطلب مطلوب';
  }
  
  if (!isValidRating(formData.rating)) {
    errors.rating = 'التقييم يجب أن يكون بين 1 و 5';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  isValidPhone,
  isValidEmail,
  validatePassword,
  isValidName,
  isValidRating,
  isValidUrl,
  isValidFileSize,
  isValidFileType,
  validateImageFile,
  validateRegistrationForm,
  validateLoginForm,
  validateWorkerProfileForm,
  validateRequestForm,
  validateReviewForm,
};

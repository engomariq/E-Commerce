import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest, API_ENDPOINTS } from "../config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const result = await apiRequest(API_ENDPOINTS.AUTH.PROFILE);

      if (result.success) {
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        // Token invalid or expired
        handleLogout();
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Transform data to match backend API format
      const apiData = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        role: userData.role,
        neighborhood_id: userData.city ? parseInt(userData.city) : undefined,
      };

      // Add worker-specific fields if role is worker
      if (userData.role === "worker") {
        // Only add profession_id if it's a valid number
        const professionId = userData.profession ? parseInt(userData.profession) : null;
        if (professionId && !isNaN(professionId) && professionId > 0) {
          apiData.profession_id = professionId;
        } else {
          // If no valid profession_id, set a default or handle appropriately
          apiData.profession_id = 1; // Default to first profession
        }
        
        apiData.bio = userData.description || '';
        apiData.experience_years = userData.experience ? parseInt(userData.experience) : 0;
        apiData.contact_phone = userData.phone;
        apiData.whatsapp_number = userData.phone;
      }

      const result = await apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        body: JSON.stringify(apiData),
      });

      if (result.success) {
        localStorage.setItem("access_token", result.data.access_token);
        setToken(result.data.access_token);
        setUser(result.data.user);
        setIsAuthenticated(true);
        return { success: true, data: result.data };
      } else {
        // Provide user-friendly Arabic error messages
        let errorMessage = result.error || "Registration failed";
        
        // Handle duplicate email/phone errors
        if (errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('already')) {
          errorMessage = "البريد الإلكتروني مستخدم بالفعل. الرجاء استخدام بريد إلكتروني آخر.";
        } else if (errorMessage.toLowerCase().includes('phone') && errorMessage.toLowerCase().includes('already')) {
          errorMessage = "رقم الهاتف مستخدم بالفعل. الرجاء استخدام رقم آخر.";
        } else if (errorMessage.toLowerCase().includes('duplicate') || errorMessage.toLowerCase().includes('unique')) {
          errorMessage = "هذا الحساب موجود بالفعل. الرجاء استخدام بريد إلكتروني أو رقم هاتف مختلف.";
        } else if (result.status === 400) {
          errorMessage = "البيانات المدخلة غير صحيحة. الرجاء التحقق والمحاولة مرة أخرى.";
        } else if (result.status === 500) {
          errorMessage = "حدث خطأ في الخادم. الرجاء المحاولة لاحقاً.";
        }
        
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      return { success: false, error: "خطأ في الاتصال بالشبكة. الرجاء التحقق من اتصالك بالإنترنت." };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true);

      const result = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (result.success) {
        localStorage.setItem("access_token", result.data.access_token);
        setToken(result.data.access_token);
        setUser(result.data.user);
        setIsAuthenticated(true);
        return { success: true, data: result.data };
      } else {
        // Provide user-friendly Arabic error messages
        let errorMessage = result.error || "Login failed";
        
        if (result.status === 401 || errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('incorrect')) {
          errorMessage = "البريد الإلكتروني/رقم الهاتف أو كلمة المرور غير صحيحة.";
        } else if (result.status === 404 || errorMessage.toLowerCase().includes('not found')) {
          errorMessage = "لا يوجد حساب بهذا البريد الإلكتروني أو رقم الهاتف.";
        } else if (result.status === 400) {
          errorMessage = "البيانات المدخلة غير صحيحة.";
        } else if (result.status === 500) {
          errorMessage = "حدث خطأ في الخادم. الرجاء المحاولة لاحقاً.";
        }
        
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      return { success: false, error: "خطأ في الاتصال بالشبكة. الرجاء التحقق من اتصالك بالإنترنت." };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Call backend logout endpoint (optional, since JWT is stateless)
      await apiRequest(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      handleLogout();
    }
  };

  // Handle logout locally
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Change password
  const changePassword = async (passwords) => {
    try {
      const result = await apiRequest(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: "PATCH",
        body: JSON.stringify(passwords),
      });

      if (result.success) {
        return { success: true, message: result.data.message };
      } else {
        return {
          success: false,
          error: result.error || "Password change failed",
        };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    changePassword,
    refreshProfile: fetchUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

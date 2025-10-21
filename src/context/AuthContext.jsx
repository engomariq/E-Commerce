import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (identifier, password) => {
    try {
      const isEmail = identifier.includes("@");
      
      const loginData = isEmail 
        ? { email: identifier, password }
        : { phone: identifier, password };

      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);

      const { access_token, user: userData } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "فشل تسجيل الدخول" 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.userType === "worker" ? "worker" : "client",
        neighborhood_id: userData.neighborhood_id
      });

      const { access_token, user: newUser } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error("Register error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "فشل التسجيل" 
      };
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Get profile error:", error);
      
      if (error.response?.status === 401) {
        logout();
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || "فشل جلب البيانات" 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, getProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

let registeredUsers = [];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    if (email === "admin" && password === "123") {
      const adminUser = {
        username: "admin",
        role: "admin",
        name: "المسؤول",
        email: "admin@example.com"
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" };
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      role: userData.userType === "worker" ? "worker" : "customer",
      joinDate: new Date().toISOString().split("T")[0],
      status: "active"
    };
    
    registeredUsers.push(newUser);
    
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
  };
  
  const getAllUsers = () => {
    return registeredUsers.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, getAllUsers }}
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

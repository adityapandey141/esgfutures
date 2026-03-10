"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // Set axios default header for auth
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminData");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token: newToken, admin: adminData } = response.data;

      setToken(newToken);
      setAdmin(adminData);

      // Store in localStorage
      localStorage.setItem("adminToken", newToken);
      localStorage.setItem("adminData", JSON.stringify(adminData));

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Register new admin (only for existing admins)
  const register = async (adminData) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        adminData,
      );
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get current admin profile
  const getProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      return response.data.admin;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  const value = {
    admin,
    token,
    loading,
    error,
    login,
    logout,
    register,
    getProfile,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

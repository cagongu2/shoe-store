import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import getBaseUrl from "../util/baseUrl";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvide = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const registerUser = async (email, password, username) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/v1/users/register`, {
        email,
        password,
        username
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/v1/users/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save to local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // Provide a placeholder for google sign in to avoid breaking components immediately, 
  // though it will throw an error or do nothing if called.
  const signInWithGoogle = async () => {
    throw new Error("Google Sign-In is temporarily disabled.");
  };

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    logout,
    signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate login using email
  const login = async (email) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users?email=${email}`);
      const user = response.data[0];
      if (user) {
        // Save user token (mocked)
        await SecureStore.setItemAsync('userToken', JSON.stringify(user));
        setUser(user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Simulate logout
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check if user is logged in on app load
  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        setUser(JSON.parse(token));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
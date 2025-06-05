
import { useState, useEffect, createContext, useContext } from 'react';
import { apiClient } from '../api/client';
import { User, LoginRequest, LoginResponse } from '../types/api';
import { useToast } from './use-toast';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiClient.post<LoginResponse>('/api/v1/auth/login', {
        username,
        password,
      });
      
      localStorage.setItem('access_token', response.data.access_token);
      await fetchUser();
      
      toast({
        title: "Login successful",
        description: "Welcome to X Cost!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.detail || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await apiClient.get<User>('/api/v1/auth/me');
      setUser(response.data);
    } catch (error) {
      setUser(null);
      localStorage.removeItem('access_token');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };
};

export { AuthContext };

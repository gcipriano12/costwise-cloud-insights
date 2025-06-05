
import { useState, useEffect, createContext, useContext } from 'react';
import { apiClient } from '../api/client';
import { LoginRequest, LoginResponse } from '../types/api';
import { useToast } from './use-toast';

interface User {
  username: string;
  // Dados básicos do usuário extraídos do token ou login
}

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
      
      // Criar usuário básico a partir do login bem-sucedido
      setUser({ username });
      
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
      // Se existe token, considerar usuário logado
      setUser({ username: 'admin' }); // Username padrão já que não temos endpoint /me
    }
    setLoading(false);
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

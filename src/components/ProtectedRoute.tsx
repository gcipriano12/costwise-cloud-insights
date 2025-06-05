import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log('🛡️ ProtectedRoute - loading:', loading, 'isAuthenticated:', isAuthenticated);

  // Show loading while checking authentication
  if (loading) {
    console.log('⏳ Mostrando tela de carregamento...');
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('❌ Usuário não autenticado, redirecionando para login...');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ Usuário autenticado, renderizando conteúdo protegido...');
  return <>{children}</>;
};

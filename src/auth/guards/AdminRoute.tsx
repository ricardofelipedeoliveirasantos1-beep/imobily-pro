import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ROLE_SUPER_ADMIN } from '../roles';

export function AdminRoute() {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return hasRole(ROLE_SUPER_ADMIN) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

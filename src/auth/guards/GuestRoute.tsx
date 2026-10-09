import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ROLE_SUPER_ADMIN } from '../roles';

export function GuestRoute() {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (isAuthenticated) {
    if (hasRole(ROLE_SUPER_ADMIN)) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

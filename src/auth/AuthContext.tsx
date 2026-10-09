import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthSession } from '../types/auth';
import { AuthService } from './AuthService';
import type { Permission } from './permissions';

interface AuthContextType extends AuthSession {
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession>({
    user: null,
    token: undefined,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const currentSession = AuthService.getCurrentSession();
    if (currentSession) {
      setSession({
        user: currentSession.user,
        token: currentSession.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setSession(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const { user, token } = await AuthService.login(email, pass);
    setSession({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    AuthService.logout();
    setSession({
      user: null,
      token: undefined,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const hasRole = (role: string) => AuthService.hasRole(session.user, role);
  const hasPermission = (permission: Permission) => AuthService.hasPermission(session.user, permission);

  return (
    <AuthContext.Provider value={{ ...session, login, logout, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

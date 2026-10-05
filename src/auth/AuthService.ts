import { User } from '../types/auth';
import { MOCK_USERS } from './mockAuth';
import { ROLE_PERMISSIONS, Permission } from './permissions';

const SESSION_KEY = '@imobilypro:session';

export class AuthService {
  static async login(email: string, password: string):Promise<{ user: User, token: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.passwordHash !== password) {
      throw new Error('E-mail ou senha incorretos.');
    }

    if (mockUser.status === 'SUSPENDED' || mockUser.status === 'BLOCKED') {
      throw new Error('Sua conta está suspensa. Entre em contato com o suporte.');
    }

    const { passwordHash, ...user } = mockUser;
    const token = `mock-jwt-${Date.now()}`;
    
    localStorage.setItem(SESSION_KEY, JSON.stringify({ user, token }));

    return { user, token };
  }

  static logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  static getCurrentSession(): { user: User, token: string } | null {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  static hasRole(user: User | null, role: string): boolean {
    if (!user) return false;
    return user.role === role;
  }

  static hasPermission(user: User | null, permission: Permission): boolean {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  }
}

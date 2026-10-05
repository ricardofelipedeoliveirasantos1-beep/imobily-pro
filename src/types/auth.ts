import { Role, AccountStatus } from '../auth/roles';
import { Permission } from '../auth/permissions';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: AccountStatus;
  avatarUrl?: string;
}

export interface AuthSession {
  user: User | null;
  token?: string; // Mock token
  isAuthenticated: boolean;
  isLoading: boolean;
}

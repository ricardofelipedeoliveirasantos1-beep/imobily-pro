import type { User } from '../types/auth';
import { ROLE_SUPER_ADMIN, ROLE_CORRETOR, ACCOUNT_STATUS } from './roles';

export const MOCK_USERS: Record<string, User & { passwordHash: string }> = {
  'admin@imobilypro.local': {
    id: 'admin-001',
    email: 'admin@imobilypro.local',
    name: 'Super Admin',
    role: ROLE_SUPER_ADMIN,
    status: ACCOUNT_STATUS.ACTIVE,
    passwordHash: 'admin123', // MOCK only!
  },
  'corretor@imobilypro.local': {
    id: 'corretor-001',
    email: 'corretor@imobilypro.local',
    name: 'Corretor Pro',
    role: ROLE_CORRETOR,
    status: ACCOUNT_STATUS.ACTIVE,
    passwordHash: 'corretor123', // MOCK only!
  },
  'ricardofelipedeoliveirasantos2@gmail.com': {
    id: 'admin-002',
    email: 'ricardofelipedeoliveirasantos2@gmail.com',
    name: 'Ricardo Santos',
    role: ROLE_SUPER_ADMIN,
    status: ACCOUNT_STATUS.ACTIVE,
    passwordHash: '123456',
  }
};

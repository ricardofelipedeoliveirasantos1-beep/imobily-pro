export const ROLE_SUPER_ADMIN = 'super_admin';
export const ROLE_CORRETOR = 'corretor';

export type Role = typeof ROLE_SUPER_ADMIN | typeof ROLE_CORRETOR;

export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  PENDING_EMAIL: 'PENDING_EMAIL',
  TRIAL: 'TRIAL',
  PRO: 'PRO',
  SUSPENDED: 'SUSPENDED',
  BLOCKED: 'BLOCKED',
  CANCELED: 'CANCELED'
} as const;

export type AccountStatus = keyof typeof ACCOUNT_STATUS;

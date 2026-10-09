import type { ID, Timestamps } from './common';
import type { AccountStatus, Role } from '../auth/roles';

export interface AgencyMember extends Timestamps {
  id: ID;
  agencyId: ID;
  userId: ID;
  role: Role;
  status: AccountStatus;
  creci?: string;
  phone?: string;
  avatarUrl?: string;
}

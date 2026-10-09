import type { Address, ID, Timestamps } from './common';

export const OWNER_KIND = {
  PERSON: 'person',
  COMPANY: 'company'
} as const;

export type OwnerKind = keyof typeof OWNER_KIND;

export interface Owner extends Timestamps {
  id: ID;
  agencyId: ID;
  kind: OwnerKind;
  name: string;
  document?: string; // CPF ou CNPJ
  email?: string;
  phone?: string;
  address?: Address;
  notes?: string;
}

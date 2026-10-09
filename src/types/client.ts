import type { Address, ID, Timestamps } from './common';

export interface Client extends Timestamps {
  id: ID;
  agencyId: ID;
  name: string;
  document?: string; // CPF ou CNPJ
  email?: string;
  phone?: string;
  address?: Address;
  originLeadId?: ID;
  notes?: string;
}

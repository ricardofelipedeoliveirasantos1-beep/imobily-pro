import type { ID, Timestamps } from './common';
import type { PropertyTransaction } from './property';

export const PROPOSAL_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  ANALYZING: 'analyzing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  EXPIRED: 'expired'
} as const;

export type ProposalStatus = keyof typeof PROPOSAL_STATUS;

export interface Proposal extends Timestamps {
  id: ID;
  agencyId: ID;
  propertyId: ID;
  clientId: ID;
  agentId: ID;
  transaction: PropertyTransaction;
  value: number;
  status: ProposalStatus;
  message?: string;
  validUntil: string;
}

export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  FINISHED: 'finished',
  CANCELED: 'canceled',
  BREACHED: 'breached'
} as const;

export type ContractStatus = keyof typeof CONTRACT_STATUS;

export interface Contract extends Timestamps {
  id: ID;
  agencyId: ID;
  proposalId?: ID;
  propertyId: ID;
  clientId: ID;
  agentId: ID;
  transaction: PropertyTransaction;
  value: number;
  startAt: string;
  endAt?: string;
  status: ContractStatus;
  signedAt?: string;
  documentUrl?: string;
}

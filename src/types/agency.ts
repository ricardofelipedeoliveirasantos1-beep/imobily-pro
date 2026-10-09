import type { Address, ID, Timestamps } from './common';

export const PLAN_CODE = {
  TRIAL: 'trial',
  PRO: 'pro'
} as const;

export type PlanCode = keyof typeof PLAN_CODE;

export interface Plan {
  id: ID;
  code: PlanCode;
  name: string;
  priceMonthly: number;
  maxUsers: number;
  maxProperties: number;
  features: string[];
}

export const SUBSCRIPTION_STATUS = {
  TRIAL: 'trial',
  ACTIVE: 'active',
  PAST_DUE: 'past_due',
  CANCELED: 'canceled'
} as const;

export type SubscriptionStatus = keyof typeof SUBSCRIPTION_STATUS;

export interface Subscription {
  id: ID;
  agencyId: ID;
  planId: ID;
  status: SubscriptionStatus;
  startedAt: string;
  renewsAt?: string;
  canceledAt?: string;
}

export const AGENCY_STATUS = {
  ACTIVE: 'ACTIVE',
  TRIAL: 'TRIAL',
  SUSPENDED: 'SUSPENDED',
  BLOCKED: 'BLOCKED'
} as const;

export type AgencyStatus = keyof typeof AGENCY_STATUS;

export interface Agency extends Timestamps {
  id: ID;
  name: string;
  legalName?: string;
  document?: string; // CNPJ
  email: string;
  phone?: string;
  address?: Address;
  logoUrl?: string;
  status: AgencyStatus;
  planId: ID;
}

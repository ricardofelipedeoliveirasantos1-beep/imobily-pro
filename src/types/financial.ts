import type { ID, Timestamps } from './common';

export const FINANCIAL_KIND = {
  INCOME: 'income',
  EXPENSE: 'expense'
} as const;

export type FinancialKind = keyof typeof FINANCIAL_KIND;

export const FINANCIAL_CATEGORY = {
  COMMISSION_SALE: 'commission_sale',
  COMMISSION_RENT: 'commission_rent',
  RENT_RECEIPT: 'rent_receipt',
  ADMIN_FEE: 'admin_fee',
  MARKETING: 'marketing',
  MAINTENANCE: 'maintenance',
  SALARY: 'salary',
  TAX: 'tax',
  OTHER: 'other'
} as const;

export type FinancialCategory = keyof typeof FINANCIAL_CATEGORY;

export const FINANCIAL_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELED: 'canceled'
} as const;

export type FinancialStatus = keyof typeof FINANCIAL_STATUS;

export interface FinancialTransaction extends Timestamps {
  id: ID;
  agencyId: ID;
  kind: FinancialKind;
  category: FinancialCategory;
  amount: number;
  description: string;
  dueAt: string;
  paidAt?: string;
  status: FinancialStatus;
  contractId?: ID;
  createdBy: ID;
}

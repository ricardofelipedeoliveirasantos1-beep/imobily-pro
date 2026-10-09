export type LeadStatus = 'novo' | 'qualificacao' | 'visita' | 'proposta' | 'fechado' | 'perdido';
export type LeadOrigin = 'whatsapp' | 'instagram' | 'zap' | 'vivareal' | 'site' | 'indicacao' | 'manual';
export type InterestType = 'compra' | 'locacao';

export interface LeadNote {
  id: string;
  text: string;
  created_at: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  origin: LeadOrigin;
  interest_type: InterestType;
  budget_max?: number;
  preferred_locations: string[];
  notes?: string;
  notes_history?: LeadNote[];
  linkedProperties?: string[];
  lost_reason?: string;
  status: LeadStatus;
  created_at: string;
}

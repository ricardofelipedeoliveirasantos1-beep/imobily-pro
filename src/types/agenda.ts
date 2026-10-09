import type { ID, Timestamps } from './common';

export const AGENDA_EVENT_TYPE = {
  VISIT: 'visit',
  CALL: 'call',
  MEETING: 'meeting',
  TASK: 'task',
  CONTRACT_SIGNING: 'contract_signing'
} as const;

export type AgendaEventType = keyof typeof AGENDA_EVENT_TYPE;

export const AGENDA_EVENT_STATUS = {
  SCHEDULED: 'scheduled',
  DONE: 'done',
  CANCELED: 'canceled'
} as const;

export type AgendaEventStatus = keyof typeof AGENDA_EVENT_STATUS;

export interface AgendaEvent extends Timestamps {
  id: ID;
  agencyId: ID;
  title: string;
  type: AgendaEventType;
  status: AgendaEventStatus;
  startAt: string;
  endAt: string;
  allDay: boolean;
  notes?: string;
  propertyId?: ID;
  leadId?: ID;
  clientId?: ID;
  agentId: ID;
}

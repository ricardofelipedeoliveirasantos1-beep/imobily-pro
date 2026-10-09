export type ID = string;

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DateRange {
  from: string;
  to: string;
}

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortDirection = keyof typeof SORT_DIRECTION;

export interface SortOption<Field extends string = string> {
  field: Field;
  direction: SortDirection;
}

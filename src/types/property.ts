import type { Address, ID, Timestamps } from './common';

export const PROPERTY_TYPE = {
  APARTMENT: 'apartment',
  HOUSE: 'house',
  CONDO: 'condo',
  STUDIO: 'studio',
  KITNET: 'kitnet',
  LAND: 'land',
  RURAL: 'rural',
  COMMERCIAL: 'commercial',
  WAREHOUSE: 'warehouse'
} as const;

export type PropertyType = keyof typeof PROPERTY_TYPE;

export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  RESERVED: 'reserved',
  SOLD: 'sold',
  RENTED: 'rented',
  INACTIVE: 'inactive'
} as const;

export type PropertyStatus = keyof typeof PROPERTY_STATUS;

export const PROPERTY_TRANSACTION = {
  SALE: 'sale',
  RENT: 'rent',
  SALE_AND_RENT: 'sale_and_rent',
  SEASONAL: 'seasonal'
} as const;

export type PropertyTransaction = keyof typeof PROPERTY_TRANSACTION;

export interface PropertyPhoto {
  id: ID;
  url: string;
  alt?: string;
  isCover?: boolean;
}

export interface Property extends Timestamps {
  id: ID;
  agencyId: ID;
  reference: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  transaction: PropertyTransaction;
  salePrice?: number;
  rentPrice?: number;
  iptuMonthly?: number;
  condoFeeMonthly?: number;
  areaTotal: number;
  areaUsable?: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  livingRooms: number;
  garageSpaces: number;
  features: string[];
  address: Address;
  ownerId: ID;
  agentId?: ID;
  photos: PropertyPhoto[];
  featured: boolean;
  publishedAt?: string;
}

export interface PropertyFilter {
  search?: string;
  type?: PropertyType[];
  status?: PropertyStatus[];
  transaction?: PropertyTransaction[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  city?: string;
  agentId?: ID;
  ownerId?: ID;
}

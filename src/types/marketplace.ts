import { Model } from './models';

export interface MarketplaceListing {
  id: string;
  model: Model;
  price: number;
  status: ListingStatus;
  terms: LicenseTerms;
  createdAt: Date;
}

export type ListingStatus = 'listed' | 'unlisted' | 'sold';

export interface LicenseTerms {
  type: 'personal' | 'commercial' | 'enterprise';
  duration: number; // in days
  restrictions: string[];
}

export interface PurchaseTransaction {
  id: string;
  listing: MarketplaceListing;
  buyer: string;
  price: number;
  timestamp: Date;
  status: TransactionStatus;
}

export type TransactionStatus = 'pending' | 'completed' | 'failed'; 
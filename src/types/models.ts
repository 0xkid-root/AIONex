export interface Model {
  id: string;
  name: string;
  description: string;
  version: string;
  owner: string;
  price: number;
  category: ModelCategory;
  metrics: ModelMetrics;
  status: ModelStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ModelCategory = 'nlp' | 'cv' | 'ml' | 'other';

export interface ModelMetrics {
  accuracy: number;
  latency: number;
  throughput: number;
}

export type ModelStatus = 'active' | 'inactive' | 'pending' | 'rejected'; 
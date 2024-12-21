export interface ComputingResource {
  id: string;
  provider: string;
  type: ResourceType;
  specs: ResourceSpecs;
  pricing: ResourcePricing;
  availability: ResourceAvailability;
}

export type ResourceType = 'cpu' | 'gpu' | 'tpu' | 'memory';

export interface ResourceSpecs {
  cpu?: string;
  gpu?: string;
  memory: string;
  storage: string;
  bandwidth: string;
}

export interface ResourcePricing {
  basePrice: number;
  currency: string;
  billingUnit: 'hour' | 'day' | 'month';
  minimumUsage: number;
}

export interface ResourceAvailability {
  status: 'available' | 'busy' | 'offline';
  utilization: number;
  nextAvailableSlot?: Date;
} 
export interface AIModel {
  id: string;
  name: string;
  description: string;
  owner: string;
  price: number;
  category: 'nlp' | 'cv' | 'ml' | 'other';
  performance: {
    accuracy: number;
    latency: number;
    throughput: number;
  };
  license: {
    type: 'personal' | 'commercial' | 'enterprise';
    terms: string;
    duration: number;
  };
  staking: {
    isStaked: boolean;
    stakedAmount: number;
    rewards: number;
  };
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  rentalPrice: number;
  availability: boolean;
  currentRenter?: string;
  rentalEndTime?: number;
}

export interface ComputingResource {
  id: string;
  provider: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  pricePerHour: number;
  availability: boolean;
  currentLoad: number;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  creator: string;
  status: 'active' | 'paused' | 'completed';
}

export interface WorkflowStep {
  id: string;
  agentId: string;
  action: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
} 
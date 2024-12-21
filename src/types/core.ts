export interface AIModel {
  id: string;
  name: string;
  description: string;
  version: string;
  creator: string; // wallet address
  price: {
    amount: number;
    token: string;
  };
  category: 'text' | 'image' | 'audio' | 'video' | 'multimodal';
  status: 'draft' | 'published' | 'archived';
  metrics: {
    accuracy?: number;
    performance?: number;
    efficiency?: number;
  };
  requirements: {
    minGPU: string;
    minRAM: number;
    minStorage: number;
  };
  ipfsHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComputeNode {
  id: string;
  owner: string; // wallet address
  status: 'online' | 'offline' | 'busy';
  resources: {
    gpu: string;
    ram: number;
    storage: number;
    bandwidth: number;
  };
  pricing: {
    perHour: number;
    token: string;
  };
  reputation: number;
  totalJobsCompleted: number;
  uptime: number;
  location?: string;
  lastSeen: Date;
}

export interface ComputeJob {
  id: string;
  modelId: string;
  requestor: string; // wallet address
  provider: string; // wallet address
  status: 'pending' | 'running' | 'completed' | 'failed';
  input: {
    data: string;
    type: string;
  };
  output?: {
    data: string;
    type: string;
  };
  metrics?: {
    startTime: Date;
    endTime?: Date;
    duration?: number;
    cost: number;
  };
  error?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'staking' | 'reward';
  from: string;
  to: string;
  amount: number;
  token: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
  txHash: string;
  blockNumber?: number;
}

export interface UserProfile {
  address: string;
  username?: string;
  email?: string;
  role: 'user' | 'provider' | 'admin';
  reputation: number;
  balance: {
    [key: string]: number; // token symbol -> amount
  };
  models: string[]; // model IDs
  computeNodes: string[]; // node IDs
  createdAt: Date;
  updatedAt: Date;
}

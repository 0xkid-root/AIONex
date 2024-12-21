export interface User {
  id: string;
  address: string;
  balance: string;
  isProvider: boolean;
}

export interface ComputeJob {
  id: string;
  title: string;
  description?: string;
  requirements: {
    cpu?: string;
    gpu?: string;
    memory?: string;
    storage?: string;
  };
  price: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress?: number;
  timeRemaining?: string;
}

export interface ResourceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
  storageUsage: number;
}
import { create } from 'zustand';
import { ComputeNode, ComputeJob } from '@/types/core';

interface ComputeState {
  nodes: ComputeNode[];
  jobs: ComputeJob[];
  selectedNode: ComputeNode | null;
  selectedJob: ComputeJob | null;
  isLoading: boolean;
  error: Error | null;
  nodeFilters: {
    status?: 'online' | 'offline' | 'busy';
    minGPU?: string;
    minRAM?: number;
    maxPrice?: number;
    location?: string;
  };
  jobFilters: {
    status?: ComputeJob['status'];
    provider?: string;
    requestor?: string;
    dateRange?: [Date, Date];
  };

  // Actions
  setNodes: (nodes: ComputeNode[]) => void;
  setJobs: (jobs: ComputeJob[]) => void;
  selectNode: (node: ComputeNode | null) => void;
  selectJob: (job: ComputeJob | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  addNode: (node: ComputeNode) => void;
  updateNode: (nodeId: string, updates: Partial<ComputeNode>) => void;
  removeNode: (nodeId: string) => void;
  addJob: (job: ComputeJob) => void;
  updateJob: (jobId: string, updates: Partial<ComputeJob>) => void;
  removeJob: (jobId: string) => void;
  setNodeFilters: (filters: Partial<ComputeState['nodeFilters']>) => void;
  setJobFilters: (filters: Partial<ComputeState['jobFilters']>) => void;
  clearFilters: () => void;

  // Computed
  getFilteredNodes: () => ComputeNode[];
  getFilteredJobs: () => ComputeJob[];
  getNodesByOwner: (owner: string) => ComputeNode[];
  getJobsByUser: (address: string) => ComputeJob[];
  getActiveJobs: () => ComputeJob[];
  getNodeStats: () => {
    totalNodes: number;
    onlineNodes: number;
    totalCapacity: {
      gpu: number;
      ram: number;
      storage: number;
    };
    averagePrice: number;
  };
}

export const useComputeStore = create<ComputeState>()((set, get) => ({
  // Initial state
  nodes: [],
  jobs: [],
  selectedNode: null,
  selectedJob: null,
  isLoading: false,
  error: null,
  nodeFilters: {},
  jobFilters: {},

  // Actions
  setNodes: (nodes) => set({ nodes }),
  
  setJobs: (jobs) => set({ jobs }),
  
  selectNode: (node) => set({ selectedNode: node }),
  
  selectJob: (job) => set({ selectedJob: job }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
  
  updateNode: (nodeId, updates) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      ),
    })),
  
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    })),
  
  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, job],
    })),
  
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
    })),
  
  removeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== jobId),
    })),
  
  setNodeFilters: (filters) =>
    set((state) => ({
      nodeFilters: { ...state.nodeFilters, ...filters },
    })),
  
  setJobFilters: (filters) =>
    set((state) => ({
      jobFilters: { ...state.jobFilters, ...filters },
    })),
  
  clearFilters: () =>
    set({
      nodeFilters: {},
      jobFilters: {},
    }),

  // Computed functions
  getFilteredNodes: () => {
    const { nodes, nodeFilters } = get();
    
    return nodes.filter((node) => {
      if (nodeFilters.status && node.status !== nodeFilters.status) {
        return false;
      }
      if (nodeFilters.minGPU && node.resources.gpu < nodeFilters.minGPU) {
        return false;
      }
      if (nodeFilters.minRAM && node.resources.ram < nodeFilters.minRAM) {
        return false;
      }
      if (nodeFilters.maxPrice && parseFloat(node.pricing.perHour) > nodeFilters.maxPrice) {
        return false;
      }
      if (nodeFilters.location && node.location !== nodeFilters.location) {
        return false;
      }
      return true;
    });
  },

  getFilteredJobs: () => {
    const { jobs, jobFilters } = get();
    
    return jobs.filter((job) => {
      if (jobFilters.status && job.status !== jobFilters.status) {
        return false;
      }
      if (jobFilters.provider && job.provider !== jobFilters.provider) {
        return false;
      }
      if (jobFilters.requestor && job.requestor !== jobFilters.requestor) {
        return false;
      }
      if (jobFilters.dateRange) {
        const [start, end] = jobFilters.dateRange;
        const jobDate = job.metrics.startTime;
        if (jobDate < start || jobDate > end) {
          return false;
        }
      }
      return true;
    });
  },

  getNodesByOwner: (owner) => {
    return get().nodes.filter((node) => node.owner === owner);
  },

  getJobsByUser: (address) => {
    return get().jobs.filter(
      (job) => job.requestor === address || job.provider === address
    );
  },

  getActiveJobs: () => {
    return get().jobs.filter((job) => job.status === 'running');
  },

  getNodeStats: () => {
    const nodes = get().nodes;
    const onlineNodes = nodes.filter((node) => node.status === 'online');
    
    const totalCapacity = nodes.reduce(
      (acc, node) => ({
        gpu: acc.gpu + 1, // Assuming 1 GPU per node for simplicity
        ram: acc.ram + node.resources.ram,
        storage: acc.storage + node.resources.storage,
      }),
      { gpu: 0, ram: 0, storage: 0 }
    );

    const averagePrice =
      nodes.reduce((acc, node) => acc + parseFloat(node.pricing.perHour), 0) /
      nodes.length;

    return {
      totalNodes: nodes.length,
      onlineNodes: onlineNodes.length,
      totalCapacity,
      averagePrice,
    };
  },
}));

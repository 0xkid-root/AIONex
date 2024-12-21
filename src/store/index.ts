import { create } from 'zustand';
import type { User, ComputeJob } from '@/types';

interface AppState {
  user: User | null;
  jobs: ComputeJob[];
  setUser: (user: User | null) => void;
  addJob: (job: ComputeJob) => void;
  removeJob: (jobId: string) => void;
  updateJob: (jobId: string, updates: Partial<ComputeJob>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  jobs: [],
  setUser: (user) => set({ user }),
  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  removeJob: (jobId) => set((state) => ({ 
    jobs: state.jobs.filter(job => job.id !== jobId) 
  })),
  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    )
  }))
})); 
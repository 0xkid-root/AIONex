import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ComputeJob } from '@/types';

interface JobContextType {
  jobs: ComputeJob[];
  createJob: (job: Omit<ComputeJob, 'id' | 'status'>) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<ComputeJob[]>([]);

  const createJob = useCallback(async (job: Omit<ComputeJob, 'id' | 'status'>) => {
    const newJob: ComputeJob = {
      ...job,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    setJobs(prev => [...prev, newJob]);
  }, []);

  const cancelJob = useCallback(async (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  }, []);

  return (
    <JobContext.Provider value={{ jobs, createJob, cancelJob }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
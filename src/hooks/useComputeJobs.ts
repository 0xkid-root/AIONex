import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from './useToast';
import { ComputeJob } from '@/types/core';
import { useWeb3 } from '@/contexts/Web3Context';

export function useComputeJobs() {
  const [jobs, setJobs] = useState<ComputeJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { marketplace } = useContracts();
  const { toast } = useToast();
  const { address } = useWeb3();

  useEffect(() => {
    loadJobs();
  }, [marketplace, address]);

  const loadJobs = async () => {
    if (!marketplace || !address) return;

    try {
      setIsLoading(true);
      const jobCount = await marketplace.getJobCount();
      const loadedJobs: ComputeJob[] = [];

      for (let i = 0; i < jobCount.toNumber(); i++) {
        const jobId = await marketplace.jobIds(i);
        const job = await marketplace.getJob(jobId);
        
        // Only load jobs related to the current user
        if (job.requestor === address || job.provider === address) {
          loadedJobs.push({
            id: job.id,
            modelId: job.modelId,
            requestor: job.requestor,
            provider: job.provider,
            status: getJobStatus(job),
            input: {
              data: job.inputData,
              type: job.inputType,
            },
            output: job.completed ? {
              data: job.outputData,
              type: job.outputType,
            } : undefined,
            metrics: {
              startTime: new Date(job.startTime.toNumber() * 1000),
              endTime: job.endTime.toNumber() > 0 ? new Date(job.endTime.toNumber() * 1000) : undefined,
              duration: job.endTime.toNumber() > 0 ? job.endTime.sub(job.startTime).toNumber() : undefined,
              cost: ethers.utils.formatEther(job.cost),
            },
            error: job.error || undefined,
          });
        }
      }

      setJobs(loadedJobs);
    } catch (error) {
      console.error('Failed to load compute jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load compute jobs',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (
    modelId: string,
    provider: string,
    input: { data: string; type: string },
    estimatedCost: string
  ) => {
    if (!marketplace) {
      throw new Error('Marketplace not initialized');
    }

    try {
      const jobId = ethers.utils.id(Date.now().toString());
      const costWei = ethers.utils.parseEther(estimatedCost);
      
      const tx = await marketplace.createJob(
        jobId,
        modelId,
        provider,
        input.data,
        input.type,
        { value: costWei }
      );
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Compute job created successfully',
        variant: 'success',
      });

      await loadJobs();
      return jobId;
    } catch (error: any) {
      console.error('Failed to create compute job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create compute job',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const completeJob = async (
    jobId: string,
    output: { data: string; type: string }
  ) => {
    if (!marketplace) {
      throw new Error('Marketplace not initialized');
    }

    try {
      const tx = await marketplace.completeJob(jobId, output.data, output.type);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Job completed successfully',
        variant: 'success',
      });

      await loadJobs();
    } catch (error: any) {
      console.error('Failed to complete job:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to complete job',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const failJob = async (jobId: string, reason: string) => {
    if (!marketplace) {
      throw new Error('Marketplace not initialized');
    }

    try {
      const tx = await marketplace.failJob(jobId, reason);
      await tx.wait();

      toast({
        title: 'Job Failed',
        description: reason,
        variant: 'destructive',
      });

      await loadJobs();
    } catch (error: any) {
      console.error('Failed to mark job as failed:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to mark job as failed',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const getJobsByUser = (userAddress: string) => {
    return jobs.filter(
      job => job.requestor === userAddress || job.provider === userAddress
    );
  };

  const getActiveJobs = () => {
    return jobs.filter(job => job.status === 'running');
  };

  const getJobStatus = (job: any): ComputeJob['status'] => {
    if (!job.started) return 'pending';
    if (job.completed && job.error) return 'failed';
    if (job.completed) return 'completed';
    return 'running';
  };

  return {
    jobs,
    isLoading,
    createJob,
    completeJob,
    failJob,
    getJobsByUser,
    getActiveJobs,
    refreshJobs: loadJobs,
  };
}

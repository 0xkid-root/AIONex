import { useState, useEffect } from 'react';
import type { ComputeJob } from '@/types';

export function useJobStatus(jobId: string) {
  const [job, setJob] = useState<ComputeJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Implement job status fetching logic here
        setJob({
          id: jobId,
          status: 'running',
          requirements: {
            gpu: 'RTX 3080',
            memory: '32GB',
            storage: '500GB'
          },
          price: '10',
          duration: 3600,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch job status'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, [jobId]);

  return { job, isLoading, error };
}
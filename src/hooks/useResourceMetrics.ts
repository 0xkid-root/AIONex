import { useState, useEffect } from 'react';

interface ResourceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  gpuUsage: number;
  storageUsage: number;
}

export function useResourceMetrics(providerId: string) {
  const [metrics, setMetrics] = useState<ResourceMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    gpuUsage: 0,
    storageUsage: 0
  });

  useEffect(() => {
    // Simulate real-time metrics
    const interval = setInterval(() => {
      setMetrics({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        gpuUsage: Math.random() * 100,
        storageUsage: Math.random() * 100
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [providerId]);

  return metrics;
}
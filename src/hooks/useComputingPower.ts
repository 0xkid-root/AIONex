import { useQuery } from '@tanstack/react-query';
import type { ComputingResource } from '@/types/computing';

async function fetchComputingPower(): Promise<ComputingResource[]> {
  // This will be replaced with actual API call
  return [
    {
      id: '1',
      name: 'High-Performance GPU Server',
      providerId: '0x1234...5678',
      specs: {
        cpu: '32 Core AMD EPYC',
        memory: '128GB',
        storage: '2TB NVMe'
      },
      status: 'available',
      pricePerHour: '10'
    },
    // Add more mock data...
  ];
}

export function useComputingPower() {
  return useQuery({
    queryKey: ['computing-power'],
    queryFn: fetchComputingPower
  });
} 
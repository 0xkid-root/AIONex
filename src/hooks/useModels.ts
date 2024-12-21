import { useQuery } from '@tanstack/react-query';
import type { AIModel } from '@/types/models';

async function fetchModels(): Promise<AIModel[]> {
  // This will be replaced with actual API call
  return [
    {
      id: '1',
      name: 'GPT-3 Fine-tuned Model',
      description: 'A fine-tuned GPT-3 model for specific domain tasks',
      creator: '0x1234...5678',
      price: 1000,
      accuracy: 95,
      tags: ['NLP', 'GPT', 'Language Model'],
      license: 'commercial',
      ipfsHash: 'QmX...',
      created: new Date(),
      updated: new Date()
    },
    // Add more mock models...
  ];
}

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: fetchModels
  });
} 
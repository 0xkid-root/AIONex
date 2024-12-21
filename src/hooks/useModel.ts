import { useQuery } from '@tanstack/react-query';
import type { AIModel } from '@/types/models';

async function fetchModel(modelId: string | undefined): Promise<AIModel | null> {
  if (!modelId) return null;
  
  // This will be replaced with actual API call
  return {
    id: modelId,
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
  };
}

export function useModel(modelId: string | undefined) {
  return useQuery({
    queryKey: ['model', modelId],
    queryFn: () => fetchModel(modelId),
    enabled: !!modelId
  });
} 
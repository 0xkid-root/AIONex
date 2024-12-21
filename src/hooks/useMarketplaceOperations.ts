import { useEffect, useState } from 'react';
import { useMarketplace } from './useContracts';
import { useStore } from '@/store/useStore';
import { useWeb3 } from '@/contexts/Web3Context';

export function useMarketplaceOperations() {
  const marketplaceContract = useMarketplace();
  const { setModels } = useStore();
  const { signer } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listModel = async (metadata: string, price: number, licenseTerms: string) => {
    if (!marketplaceContract || !signer) return;
    
    try {
      setLoading(true);
      const tx = await marketplaceContract.listModel(metadata, price, licenseTerms);
      await tx.wait();
      await fetchModels();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const buyModel = async (modelId: number, price: number) => {
    if (!marketplaceContract || !signer) return;
    
    try {
      setLoading(true);
      const tx = await marketplaceContract.buyModel(modelId, { value: price });
      await tx.wait();
      await fetchModels();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async () => {
    if (!marketplaceContract) return;
    
    try {
      setLoading(true);
      const modelCount = await marketplaceContract.modelCounter();
      const models = [];
      
      for (let i = 1; i <= modelCount; i++) {
        const model = await marketplaceContract.getModel(i);
        if (model.isListed) {
          models.push(model);
        }
      }
      
      setModels(models);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [marketplaceContract]);

  return {
    listModel,
    buyModel,
    loading,
    error,
  };
} 
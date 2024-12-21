import { createContext, useContext, useCallback } from 'react';
import { useStore } from '@/store';
import type { AIModel, ModelLicense } from '@/types/models';

interface ModelContextType {
  listModel: (model: Omit<AIModel, 'id' | 'created' | 'updated'>) => Promise<void>;
  purchaseModel: (modelId: string, licenseType: ModelLicense['type']) => Promise<void>;
  rentModel: (modelId: string, duration: number) => Promise<void>;
  validateModel: (modelId: string) => Promise<boolean>;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const { addModel, updateModel } = useStore();

  const listModel = useCallback(async (model: Omit<AIModel, 'id' | 'created' | 'updated'>) => {
    try {
      // Here we'll add IPFS upload and smart contract interaction
      const newModel: AIModel = {
        ...model,
        id: Math.random().toString(36).substr(2, 9),
        created: new Date(),
        updated: new Date()
      };
      addModel(newModel);
    } catch (error) {
      console.error('Failed to list model:', error);
      throw error;
    }
  }, [addModel]);

  const purchaseModel = useCallback(async (modelId: string, licenseType: ModelLicense['type']) => {
    try {
      // Implement smart contract interaction for purchase
      console.log(`Purchasing model ${modelId} with ${licenseType} license`);
    } catch (error) {
      console.error('Failed to purchase model:', error);
      throw error;
    }
  }, []);

  const rentModel = useCallback(async (modelId: string, duration: number) => {
    try {
      // Implement smart contract interaction for rental
      console.log(`Renting model ${modelId} for ${duration} days`);
    } catch (error) {
      console.error('Failed to rent model:', error);
      throw error;
    }
  }, []);

  const validateModel = useCallback(async (modelId: string) => {
    try {
      // Implement model validation logic
      return true;
    } catch (error) {
      console.error('Failed to validate model:', error);
      return false;
    }
  }, []);

  return (
    <ModelContext.Provider value={{
      listModel,
      purchaseModel,
      rentModel,
      validateModel
    }}>
      {children}
    </ModelContext.Provider>
  );
}

export const useModels = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModels must be used within a ModelProvider');
  }
  return context;
}; 
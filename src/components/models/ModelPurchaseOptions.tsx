import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useModels } from '@/contexts/ModelContext';
import type { AIModel } from '@/types/models';

interface ModelPurchaseOptionsProps {
  model: AIModel;
}

export function ModelPurchaseOptions({ model }: ModelPurchaseOptionsProps) {
  const { purchaseModel } = useModels();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      await purchaseModel(model.id, model.license);
    } catch (error) {
      console.error('Failed to purchase model:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        size="lg"
        onClick={handlePurchase}
        disabled={isPurchasing}
      >
        {isPurchasing ? 'Processing...' : `Buy for ${model.price} AION`}
      </Button>
      <Button size="lg" variant="outline">
        Try Demo
      </Button>
    </div>
  );
} 
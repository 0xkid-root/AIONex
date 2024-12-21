import { Model } from '@/types/marketplace';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMarketplaceOperations } from '@/hooks/useMarketplaceOperations';
import { ethers } from 'ethers';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  const { buyModel, loading } = useMarketplaceOperations();

  const handleBuy = async () => {
    await buyModel(model.id, model.price);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{model.metadata.name}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {model.metadata.category.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{model.metadata.description}</p>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Accuracy</span>
          <span className="font-medium">{model.metadata.accuracy}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Framework</span>
          <span className="font-medium">{model.metadata.framework}</span>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t">
        <span className="text-lg font-medium">
          {ethers.utils.formatEther(model.price)} ETH
        </span>
        <Button
          onClick={handleBuy}
          disabled={loading}
          size="sm"
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </Button>
      </div>
    </Card>
  );
} 
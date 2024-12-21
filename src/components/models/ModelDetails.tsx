import { motion } from 'framer-motion';
import { Tag, Download, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIModel } from '@/types/models';
import { useModels } from '@/contexts/ModelContext';
import { formatAddress } from '@/lib/utils';

interface ModelDetailsProps {
  model: AIModel;
}

export function ModelDetails({ model }: ModelDetailsProps) {
  const { purchaseModel, rentModel } = useModels();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{model.name}</h2>
          <p className="text-gray-500">Created by {formatAddress(model.creator)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-indigo-600" />
          <span className="text-xl font-bold">{model.price} AION</span>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>{model.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm">Accuracy</div>
          <div className="text-2xl font-bold">{model.accuracy}%</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm">License</div>
          <div className="text-2xl font-bold capitalize">{model.license}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-gray-500 text-sm">Created</div>
          <div className="text-2xl font-bold">
            {new Date(model.created).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={() => purchaseModel(model.id, model.license)}
          className="flex-1"
        >
          Purchase Model
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => rentModel(model.id, 30)}
          className="flex-1"
        >
          Rent Model
        </Button>
      </div>
    </div>
  );
} 
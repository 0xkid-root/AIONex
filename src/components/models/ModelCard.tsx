import { motion } from 'framer-motion';
import { Tag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIModel } from '@/types/models';
import { formatAddress } from '@/lib/utils';

interface ModelCardProps {
  model: AIModel;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{model.name}</h3>
          <p className="text-sm text-gray-500">by {formatAddress(model.creator)}</p>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium">{model.price} AION</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{model.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{model.accuracy}% Accuracy</span>
        </div>
        <Button size="sm">View Details</Button>
      </div>
    </motion.div>
  );
} 
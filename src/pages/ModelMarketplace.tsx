import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModels } from '@/hooks/useModels';
import type { AIModel } from '@/types';

export function ModelMarketplace() {
  const { models, isLoading } = useModels();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Model Marketplace</h1>
        <Button>List Model</Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models?.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
}

function ModelCard({ model }: { model: AIModel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{model.name}</h3>
          <p className="text-sm text-gray-500">{model.creator}</p>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium">{model.price} AION</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">{model.description}</p>
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
        <div className="text-sm">
          <span className="text-gray-500">Accuracy:</span>
          <span className="ml-1 font-medium">{model.accuracy}%</span>
        </div>
        <Button size="sm">View Details</Button>
      </div>
    </motion.div>
  );
} 
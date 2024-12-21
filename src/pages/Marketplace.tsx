import { useState, useEffect } from 'react';
import { useMarketplace } from '@/hooks/useContracts';
import { SearchAndFilterBar } from '@/components/marketplace/SearchAndFilterBar';
import { ModelCard } from '@/components/marketplace/ModelCard';
import { DynamicPricingWidget } from '@/components/marketplace/DynamicPricingWidget';
import { useStore } from '@/store/useStore';
import { mockModels } from '@/mocks/data';

export function Marketplace() {
  const { setModels, models } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ 
    category: 'all', 
    priceRange: [0, 1000], 
    accuracy: 80, 
    availability: true 
  });

  useEffect(() => {
    // Initialize with mock data
    setModels(mockModels);
  }, []);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleFilter = (newFilters: any) => setFilters(newFilters);

  const filteredModels = models.filter(model => {
    if (searchQuery && !model.metadata.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.category !== 'all' && model.metadata.category !== filters.category) {
      return false;
    }
    const priceInEth = Number(model.price) / 1e18; // Convert wei to ETH
    if (priceInEth < filters.priceRange[0] || priceInEth > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">AI Model Marketplace</h1>
      <SearchAndFilterBar onSearch={handleSearch} onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      <DynamicPricingWidget resourceId="resource-1" />
    </div>
  );
}
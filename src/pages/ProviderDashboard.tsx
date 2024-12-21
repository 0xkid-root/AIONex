import { useEffect } from 'react';
import { useModelStore } from '@/store/slices/modelSlice';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { ActiveJobs } from '@/components/dashboard/ActiveJobs';
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';

export function ProviderDashboard() {
  const { models, setModels } = useModelStore();

  useEffect(() => {
    // Load provider's models
    const loadModels = async () => {
      try {
        // Fetch models from API/contract
        const response = await fetch('/api/provider/models');
        const data = await response.json();
        setModels(data);
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    };

    loadModels();
  }, [setModels]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Provider Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricsCard
          title="Total Earnings"
          value="1,234.56 AION"
          change={+15.2}
          trend="up"
        />
        <MetricsCard
          title="Active Models"
          value={models.length.toString()}
          change={+2}
          trend="up"
        />
        <MetricsCard
          title="Resource Usage"
          value="78%"
          change={-5}
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActiveJobs />
        <ResourceUsage />
      </div>
    </div>
  );
}
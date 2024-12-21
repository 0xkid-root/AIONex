import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModelStore } from '@/store/slices/modelSlice';
import { ModelStaking } from '@/components/ai/ModelStaking';
import { DynamicPricingWidget } from '@/components/marketplace/DynamicPricingWidget';

export function ModelDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { selectedModel, selectModel, models } = useModelStore();

  useEffect(() => {
    const model = models.find(m => m.id === id);
    if (model) {
      selectModel(model);
    }
  }, [id, models, selectModel]);

  if (!selectedModel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{selectedModel.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Model Details</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600 mb-4">{selectedModel.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{selectedModel.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="font-medium">{selectedModel.version}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-medium">{selectedModel.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{selectedModel.status}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <DynamicPricingWidget resourceId={selectedModel.id} />
          <div className="mt-6">
            <ModelStaking model={selectedModel} />
          </div>
        </div>
      </div>
    </div>
  );
} 
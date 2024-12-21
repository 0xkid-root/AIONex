import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModels } from '@/contexts/ModelContext';
import type { AIModel, ModelLicense } from '@/types/models';

interface ModelLicensingWidgetProps {
  model: AIModel;
}

const LICENSE_TYPES: { type: ModelLicense['type']; features: string[] }[] = [
  {
    type: 'personal',
    features: [
      'Single user access',
      'Non-commercial use only',
      'No redistribution',
      'Basic support'
    ]
  },
  {
    type: 'commercial',
    features: [
      'Multiple user access',
      'Commercial use allowed',
      'Limited redistribution',
      'Priority support'
    ]
  },
  {
    type: 'enterprise',
    features: [
      'Unlimited users',
      'Full commercial rights',
      'Redistribution allowed',
      'Premium support',
      'Custom modifications'
    ]
  }
];

export function ModelLicensingWidget({ model }: ModelLicensingWidgetProps) {
  const { purchaseModel } = useModels();
  const [selectedLicense, setSelectedLicense] = useState<ModelLicense['type']>('personal');

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold">Licensing Options</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LICENSE_TYPES.map(({ type, features }) => (
          <motion.div
            key={type}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-xl border-2 cursor-pointer ${
              selectedLicense === type
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200'
            }`}
            onClick={() => setSelectedLicense(type)}
          >
            <h3 className="text-xl font-semibold capitalize mb-4">{type}</h3>
            <ul className="space-y-3 mb-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              variant={selectedLicense === type ? 'default' : 'outline'}
              onClick={() => purchaseModel(model.id, type)}
            >
              Select {type}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
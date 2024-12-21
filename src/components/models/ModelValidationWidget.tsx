import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { useModelValidation } from '@/hooks/useModelValidation';
import type { AIModel } from '@/types/models';

interface ModelValidationWidgetProps {
  model: AIModel;
}

export function ModelValidationWidget({ model }: ModelValidationWidgetProps) {
  const { validateModel, isValidating } = useModelValidation();
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
  } | null>(null);

  useEffect(() => {
    const runValidation = async () => {
      const result = await validateModel(model);
      setValidationResult(result);
    };
    runValidation();
  }, [model, validateModel]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold">Model Validation</h2>
      </div>

      {isValidating ? (
        <div className="text-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Shield className="h-8 w-8 text-indigo-600" />
          </motion.div>
          <p className="mt-4 text-gray-600">Validating model...</p>
        </div>
      ) : validationResult ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {validationResult.isValid ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            )}
            <span className="font-medium">
              {validationResult.isValid
                ? 'Model validation successful'
                : 'Model validation failed'}
            </span>
          </div>

          {validationResult.errors.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Validation Issues:</h4>
              <ul className="list-disc list-inside space-y-1">
                {validationResult.errors.map((error) => (
                  <li key={error} className="text-sm text-yellow-800">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
} 
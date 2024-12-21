import { useState, useCallback } from 'react';
import type { AIModel } from '@/types/models';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function useModelValidation() {
  const [isValidating, setIsValidating] = useState(false);

  const validateModel = useCallback(async (model: AIModel): Promise<ValidationResult> => {
    setIsValidating(true);
    try {
      const errors: string[] = [];

      // Validate model structure
      if (!model.ipfsHash) {
        errors.push('Model file is required');
      }

      // Validate accuracy claims
      if (model.accuracy > 100 || model.accuracy < 0) {
        errors.push('Accuracy must be between 0 and 100');
      }

      // Validate price
      if (model.price <= 0) {
        errors.push('Price must be greater than 0');
      }

      // Here we would add more complex validation:
      // - Model performance testing
      // - Security scanning
      // - License verification

      return {
        isValid: errors.length === 0,
        errors
      };
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    validateModel,
    isValidating
  };
} 
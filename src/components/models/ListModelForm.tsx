import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useModels } from '@/contexts/ModelContext';
import type { AIModel } from '@/types/models';

const modelSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  accuracy: z.number().min(0).max(100),
  license: z.enum(['personal', 'commercial', 'enterprise']),
  tags: z.array(z.string())
});

type ModelFormData = z.infer<typeof modelSchema>;

export function ListModelForm() {
  const { listModel } = useModels();
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ModelFormData>({
    resolver: zodResolver(modelSchema)
  });

  const onSubmit = async (data: ModelFormData) => {
    try {
      setIsUploading(true);
      // Here we'll add IPFS upload logic
      const ipfsHash = 'QmX...'; // Placeholder
      
      await listModel({
        ...data,
        creator: '0x...', // Will come from wallet
        ipfsHash,
      });
    } catch (error) {
      console.error('Failed to list model:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Model Name</label>
        <Input {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea {...register('description')} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (AION)</label>
          <Input type="number" {...register('price', { valueAsNumber: true })} />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Accuracy (%)</label>
          <Input type="number" {...register('accuracy', { valueAsNumber: true })} />
          {errors.accuracy && (
            <p className="text-sm text-red-500">{errors.accuracy.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'List Model'}
      </Button>
    </form>
  );
} 
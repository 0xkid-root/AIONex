import { create } from 'zustand';
import { Model } from '@/types/models';

interface ModelState {
  models: Model[];
  selectedModel: Model | null;
  isLoading: boolean;
  error: string | null;
  setModels: (models: Model[]) => void;
  selectModel: (model: Model) => void;
  addModel: (model: Model) => void;
  updateModel: (id: string, updates: Partial<Model>) => void;
  removeModel: (id: string) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],
  selectedModel: null,
  isLoading: false,
  error: null,
  setModels: (models) => set({ models }),
  selectModel: (model) => set({ selectedModel: model }),
  addModel: (model) => set((state) => ({ models: [...state.models, model] })),
  updateModel: (id, updates) => set((state) => ({
    models: state.models.map((model) =>
      model.id === id ? { ...model, ...updates } : model
    ),
  })),
  removeModel: (id) => set((state) => ({
    models: state.models.filter((model) => model.id !== id),
  })),
})); 
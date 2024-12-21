import { create } from 'zustand';
import { AIModel } from '@/types/core';

interface ModelState {
  models: AIModel[];
  selectedModel: AIModel | null;
  isLoading: boolean;
  error: Error | null;
  filters: {
    category?: string;
    status?: string;
    priceRange?: [number, number];
    creator?: string;
  };
  searchQuery: string;

  // Actions
  setModels: (models: AIModel[]) => void;
  selectModel: (model: AIModel | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  addModel: (model: AIModel) => void;
  updateModel: (modelId: string, updates: Partial<AIModel>) => void;
  removeModel: (modelId: string) => void;
  setFilters: (filters: Partial<ModelState['filters']>) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;

  // Computed
  getFilteredModels: () => AIModel[];
  getModelsByCategory: (category: string) => AIModel[];
  getModelsByCreator: (creator: string) => AIModel[];
  getSortedModels: (sortBy: keyof AIModel) => AIModel[];
}

export const useModelStore = create<ModelState>()((set, get) => ({
  // Initial state
  models: [],
  selectedModel: null,
  isLoading: false,
  error: null,
  filters: {},
  searchQuery: '',

  // Actions
  setModels: (models) => set({ models }),
  
  selectModel: (model) => set({ selectedModel: model }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  addModel: (model) =>
    set((state) => ({
      models: [...state.models, model],
    })),
  
  updateModel: (modelId, updates) =>
    set((state) => ({
      models: state.models.map((model) =>
        model.id === modelId ? { ...model, ...updates } : model
      ),
    })),
  
  removeModel: (modelId) =>
    set((state) => ({
      models: state.models.filter((model) => model.id !== modelId),
    })),
  
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  clearFilters: () => set({ filters: {}, searchQuery: '' }),

  // Computed functions
  getFilteredModels: () => {
    const { models, filters, searchQuery } = get();
    
    return models.filter((model) => {
      // Apply category filter
      if (filters.category && model.category !== filters.category) {
        return false;
      }

      // Apply status filter
      if (filters.status && model.status !== filters.status) {
        return false;
      }

      // Apply price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (model.price.amount < min || model.price.amount > max) {
          return false;
        }
      }

      // Apply creator filter
      if (filters.creator && model.creator !== filters.creator) {
        return false;
      }

      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          model.name.toLowerCase().includes(query) ||
          model.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  },

  getModelsByCategory: (category) => {
    return get().models.filter((model) => model.category === category);
  },

  getModelsByCreator: (creator) => {
    return get().models.filter((model) => model.creator === creator);
  },

  getSortedModels: (sortBy) => {
    return [...get().models].sort((a, b) => {
      if (typeof a[sortBy] === 'string') {
        return (a[sortBy] as string).localeCompare(b[sortBy] as string);
      }
      if (typeof a[sortBy] === 'number') {
        return (a[sortBy] as number) - (b[sortBy] as number);
      }
      return 0;
    });
  },
}));

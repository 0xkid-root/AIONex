import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIModel, ComputeNode, ComputeJob } from '@/types/core';

interface AppState {
  // User preferences
  theme: 'light' | 'dark';
  sidebar: {
    isOpen: boolean;
    width: number;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };

  // Cache
  modelCache: {
    [id: string]: AIModel;
  };
  nodeCache: {
    [id: string]: ComputeNode;
  };
  jobCache: {
    [id: string]: ComputeJob;
  };

  // Filters and search
  filters: {
    modelCategory?: string;
    modelStatus?: string;
    nodeStatus?: string;
    dateRange?: [Date, Date];
    priceRange?: [number, number];
  };
  searchQuery: string;

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  updateNotificationSettings: (settings: Partial<AppState['notifications']>) => void;
  cacheModel: (model: AIModel) => void;
  cacheNode: (node: ComputeNode) => void;
  cacheJob: (job: ComputeJob) => void;
  clearCache: () => void;
  setFilters: (filters: Partial<AppState['filters']>) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      theme: 'light',
      sidebar: {
        isOpen: true,
        width: 280,
      },
      notifications: {
        enabled: true,
        sound: true,
        desktop: false,
      },
      modelCache: {},
      nodeCache: {},
      jobCache: {},
      filters: {},
      searchQuery: '',

      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleSidebar: () =>
        set((state) => ({
          sidebar: { ...state.sidebar, isOpen: !state.sidebar.isOpen },
        })),
      
      setSidebarWidth: (width) =>
        set((state) => ({
          sidebar: { ...state.sidebar, width },
        })),
      
      updateNotificationSettings: (settings) =>
        set((state) => ({
          notifications: { ...state.notifications, ...settings },
        })),
      
      cacheModel: (model) =>
        set((state) => ({
          modelCache: { ...state.modelCache, [model.id]: model },
        })),
      
      cacheNode: (node) =>
        set((state) => ({
          nodeCache: { ...state.nodeCache, [node.id]: node },
        })),
      
      cacheJob: (job) =>
        set((state) => ({
          jobCache: { ...state.jobCache, [job.id]: job },
        })),
      
      clearCache: () =>
        set({
          modelCache: {},
          nodeCache: {},
          jobCache: {},
        }),
      
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
    }),
    {
      name: 'aionex-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebar: state.sidebar,
        notifications: state.notifications,
      }),
    }
  )
);

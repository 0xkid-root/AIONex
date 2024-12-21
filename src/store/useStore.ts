import create from 'zustand';
import { ethers } from 'ethers';

interface StoreState {
  // Wallet State
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  
  // Marketplace State
  models: any[];
  agents: any[];
  computingResources: any[];
  
  // User State
  userProfile: any | null;
  userTransactions: any[];
  
  // Actions
  setAccount: (account: string | null) => void;
  setChainId: (chainId: number | null) => void;
  setModels: (models: any[]) => void;
  setAgents: (agents: any[]) => void;
  setComputingResources: (resources: any[]) => void;
  setUserProfile: (profile: any) => void;
  setUserTransactions: (transactions: any[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial State
  account: null,
  chainId: null,
  isConnected: false,
  models: [],
  agents: [],
  computingResources: [],
  userProfile: null,
  userTransactions: [],
  
  // Actions
  setAccount: (account) => set({ account, isConnected: !!account }),
  setChainId: (chainId) => set({ chainId }),
  setModels: (models) => set({ models }),
  setAgents: (agents) => set({ agents }),
  setComputingResources: (resources) => set({ computingResources: resources }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setUserTransactions: (transactions) => set({ userTransactions: transactions }),
})); 
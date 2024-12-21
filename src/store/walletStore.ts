import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletTransaction {
  hash: string;
  timestamp: number;
  type: 'send' | 'receive' | 'contract';
  status: 'pending' | 'success' | 'failed';
  value?: string;
  to?: string;
  from?: string;
}

interface WalletState {
  recentTransactions: WalletTransaction[];
  preferredWallet: string | null;
  networkPreferences: {
    chainId: number;
    rpcUrl?: string;
  };
  addTransaction: (tx: WalletTransaction) => void;
  updateTransaction: (hash: string, updates: Partial<WalletTransaction>) => void;
  setPreferredWallet: (wallet: string | null) => void;
  setNetworkPreferences: (prefs: { chainId: number; rpcUrl?: string }) => void;
  clearTransactions: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      recentTransactions: [],
      preferredWallet: null,
      networkPreferences: {
        chainId: 1, // Mainnet by default
      },

      addTransaction: (tx) =>
        set((state) => ({
          recentTransactions: [tx, ...state.recentTransactions].slice(0, 10), // Keep last 10 transactions
        })),

      updateTransaction: (hash, updates) =>
        set((state) => ({
          recentTransactions: state.recentTransactions.map((tx) =>
            tx.hash === hash ? { ...tx, ...updates } : tx
          ),
        })),

      setPreferredWallet: (wallet) =>
        set({ preferredWallet: wallet }),

      setNetworkPreferences: (prefs) =>
        set({ networkPreferences: prefs }),

      clearTransactions: () =>
        set({ recentTransactions: [] }),
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        preferredWallet: state.preferredWallet,
        networkPreferences: state.networkPreferences,
      }),
    }
  )
);

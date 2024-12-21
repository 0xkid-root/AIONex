import { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/toast';
import { UserProfile } from '../types/user';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  user: UserProfile | null;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

interface WalletProviderProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  primaryWallet: any; // Replace `any` with the correct type from `DynamicContext`
  handleLogOut: () => Promise<void>;
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  disconnect: () => void;
}

export function WalletProvider({
  children,
  navigate,
  primaryWallet,
  handleLogOut,
  isConnected,
  address,
  balance,
  chainId,
  disconnect,
}: WalletProviderProps) {
  const [user] = useState<UserProfile | null>(null);

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      await handleLogOut();
      disconnect();
      navigate('/');

      toast({
        title: "Success",
        description: "Wallet disconnected",
        variant: "success",
      });
    } catch (error: any) {
      console.error('Failed to disconnect:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to disconnect",
        variant: "destructive",
      });
    }
  };

  // Handle network switching
  const switchNetwork = async (targetChainId: number) => {
    try {
      if (!primaryWallet) return;

      await primaryWallet.switchNetwork(targetChainId);

      toast({
        title: "Success",
        description: "Network switched successfully",
        variant: "success",
      });
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to switch network",
        variant: "destructive",
      });
    }
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      balance,
      chainId,
      user,
      disconnect: handleDisconnect,
      switchNetwork,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
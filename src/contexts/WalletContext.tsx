import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';
import { UserProfile } from '../types/user';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAccount, useBalance, useDisconnect, useChainId } from 'wagmi';

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

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const { address: wagmiAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  
  const [user] = useState<UserProfile | null>(null);

  // Get balance using Wagmi hook
  const { data: balanceData } = useBalance({
    address: wagmiAddress,
  });

  // Format balance to maintain compatibility with previous implementation
  const formattedBalance = balanceData ? balanceData.formatted : null;

  // Handle disconnection
  const disconnect = async () => {
    try {
      await handleLogOut();
      wagmiDisconnect();
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
      address: wagmiAddress ?? null,
      balance: formattedBalance,
      chainId: chainId ?? null,
      user,
      disconnect,
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
import { createContext, useContext } from 'react';
import { useStore } from '@/store/useStore';
import { toast } from '@/components/ui/toast';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAccount, useChainId, useDisconnect } from 'wagmi';

interface Web3ContextType {
  isConnected: boolean;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { handleLogOut } = useDynamicContext();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  
  const { setAccount, setChainId } = useStore();

  // Update store when account or chainId changes
  if (address && isConnected) {
    setAccount(address);
    setChainId(chainId);
  }

  const disconnect = async () => {
    try {
      await handleLogOut();
      wagmiDisconnect();
      
      // Clear store
      setAccount(null);
      setChainId(null);

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

  return (
    <Web3Context.Provider 
      value={{ 
        isConnected,
        disconnect
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
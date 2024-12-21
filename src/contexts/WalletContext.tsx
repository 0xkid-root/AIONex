import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/toast';
import { UserProfile } from '@/types/user';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  user: UserProfile | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Initialize wallet connection
  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Check if already connected
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            const network = await provider.getNetwork();

            setIsConnected(true);
            setAddress(address);
            setBalance(ethers.utils.formatEther(balance));
            setChainId(network.chainId);
            setSigner(signer);
          }
        } catch (error) {
          console.error('Failed to initialize wallet:', error);
        }
      }
    };

    initWallet();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnect();
    } else {
      // Account changed
      const newAddress = accounts[0];
      const newBalance = await provider?.getBalance(newAddress);
      setAddress(newAddress);
      setBalance(newBalance ? ethers.utils.formatEther(newBalance) : null);
    }
  };

  const handleChainChanged = (newChainId: string) => {
    setChainId(parseInt(newChainId));
    // Reload the page as recommended by MetaMask
    window.location.reload();
  };

  const connect = async () => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "Please install MetaMask to connect",
        variant: "destructive",
      });
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setIsConnected(true);
      setProvider(provider);
      setSigner(signer);
      setAddress(address);
      setBalance(ethers.utils.formatEther(balance));
      setChainId(network.chainId);

      toast({
        title: "Success",
        description: "Wallet connected successfully",
        variant: "success",
      });
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(null);
    setChainId(null);
    setSigner(null);
    navigate('/');

    toast({
      title: "Success",
      description: "Wallet disconnected",
      variant: "success",
    });
  };

  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added to MetaMask
        toast({
          title: "Error",
          description: "Please add this network to MetaMask",
          variant: "destructive",
        });
      } else {
        console.error('Failed to switch network:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to switch network",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      address,
      balance,
      chainId,
      provider,
      signer,
      user,
      connect,
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
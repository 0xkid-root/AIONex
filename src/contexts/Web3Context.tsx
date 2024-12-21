import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useStore } from '@/store/useStore';

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const { setAccount, setChainId } = useStore();

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const connect = async () => {
    if (provider) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        const { chainId } = await provider.getNetwork();
        setAccount(address);
        setChainId(chainId);
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAccount(null);
    setChainId(null);
  };

  return (
    <Web3Context.Provider value={{ provider, signer, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error('useWeb3 must be used within a Web3Provider');
  return context;
}; 
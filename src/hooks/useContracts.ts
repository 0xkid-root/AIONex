import { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/useToast';

const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;

// Temporary ABI until we compile the contracts
const MARKETPLACE_ABI = [
  "function listModel(string memory name, string memory description, uint256 price) external",
  "function purchaseModel(uint256 modelId) external payable",
  "function registerNode(string memory name, string memory specs) external",
  "function createJob(uint256 modelId, string memory params) external payable",
];

const TOKEN_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transfer(address recipient, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
];

export function useMarketplace() {
  const { provider, signer } = useWeb3();
  const { toast } = useToast();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      if (!provider || !signer || !MARKETPLACE_ADDRESS) {
        setIsLoading(false);
        return;
      }

      try {
        const marketplaceContract = new ethers.Contract(
          MARKETPLACE_ADDRESS,
          MARKETPLACE_ABI,
          signer
        );
        
        setContract(marketplaceContract);
      } catch (error) {
        console.error('Failed to initialize marketplace contract:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize marketplace contract',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, [provider, signer]);

  return {
    contract,
    isLoading,
  };
}

export function useAgentRental() {
  const { provider, signer } = useWeb3();
  const { toast } = useToast();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initContract = async () => {
      if (!provider || !signer || !TOKEN_ADDRESS) {
        setIsLoading(false);
        return;
      }

      try {
        const tokenContract = new ethers.Contract(
          TOKEN_ADDRESS,
          TOKEN_ABI,
          signer
        );
        
        setContract(tokenContract);
      } catch (error) {
        console.error('Failed to initialize token contract:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize token contract',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, [provider, signer]);

  return {
    contract,
    isLoading,
  };
}

export function useContracts() {
  const marketplace = useMarketplace();
  const token = useAgentRental();

  return {
    marketplace: marketplace.contract,
    token: token.contract,
    isLoading: marketplace.isLoading || token.isLoading,
  };
}
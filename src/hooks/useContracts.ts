import { useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '@/contracts/config';
import { useWeb3 } from '@/contexts/Web3Context';

export function useContract(contractName: keyof typeof CONTRACT_ABIS) {
  const [contract, setContract] = useState<Contract | null>(null);
  const { signer } = useWeb3();

  useEffect(() => {
    if (signer) {
      const newContract = new ethers.Contract(
        CONTRACT_ADDRESSES[contractName],
        CONTRACT_ABIS[contractName],
        signer
      );
      setContract(newContract);
    }
  }, [signer, contractName]);

  return contract;
}

export function useMarketplace() {
  return useContract('MARKETPLACE');
}

export function useAgentRental() {
  return useContract('AGENT_RENTAL');
}

export function useBase() {
  return useContract('BASE');
} 
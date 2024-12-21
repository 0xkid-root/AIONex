import React from 'react';
import { useChainId, useConfig } from 'wagmi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useToast } from '../../hooks/use-toast';
import { mainnet, sepolia } from 'wagmi/chains';
import { switchChain } from 'wagmi/actions';

export function NetworkSwitcher() {
  const chainId = useChainId();
  const config = useConfig();
  const { toast } = useToast();

  const chains = [mainnet, sepolia];

  const handleNetworkSwitch = async (value: string) => {
    try {
      const chain = chains.find((c) => c.id.toString() === value);
      if (!chain) return;
      
      await switchChain(config, { chainId: chain.id });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error switching network",
        description: error?.message || "Failed to switch network",
      });
    }
  };

  return (
    <Select
      value={chainId?.toString()}
      onValueChange={handleNetworkSwitch}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Network" />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()}>
            {chain.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
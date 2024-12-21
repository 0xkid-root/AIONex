import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from './useToast';
import { ComputeNode } from '@/types/core';
import { useWeb3 } from '@/contexts/Web3Context';

export function useComputeNodes() {
  const [nodes, setNodes] = useState<ComputeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { marketplace } = useContracts();
  const { toast } = useToast();
  const { signer } = useWeb3();

  useEffect(() => {
    loadNodes();
  }, [marketplace]);

  const loadNodes = async () => {
    if (!marketplace) return;

    try {
      setIsLoading(true);
      const nodeCount = await marketplace.getComputeNodeCount();
      const loadedNodes: ComputeNode[] = [];

      for (let i = 0; i < nodeCount.toNumber(); i++) {
        const nodeId = await marketplace.nodeIds(i);
        const node = await marketplace.getComputeNode(nodeId);
        loadedNodes.push({
          id: node.id,
          owner: node.owner,
          status: node.active ? 'online' : 'offline',
          resources: {
            gpu: node.gpuType,
            ram: node.ram.toNumber(),
            storage: node.storage.toNumber(),
            bandwidth: node.bandwidth.toNumber(),
          },
          pricing: {
            perHour: ethers.utils.formatEther(node.pricePerHour),
            token: 'ETH',
          },
          reputation: node.reputation.toNumber(),
          totalJobsCompleted: node.totalJobs.toNumber(),
          uptime: 100, // TODO: Implement uptime tracking
          lastSeen: new Date(),
        });
      }

      setNodes(loadedNodes);
    } catch (error) {
      console.error('Failed to load compute nodes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load compute nodes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const registerNode = async (
    nodeId: string,
    pricePerHour: number,
    resources: ComputeNode['resources']
  ) => {
    if (!marketplace || !signer) {
      throw new Error('Marketplace not initialized or wallet not connected');
    }

    try {
      const priceWei = ethers.utils.parseEther(pricePerHour.toString());
      const tx = await marketplace.registerComputeNode(nodeId, priceWei, resources);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Compute node registered successfully',
        variant: 'success',
      });

      await loadNodes();
    } catch (error: any) {
      console.error('Failed to register compute node:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to register compute node',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateNodeStatus = async (nodeId: string, isOnline: boolean) => {
    if (!marketplace || !signer) {
      throw new Error('Marketplace not initialized or wallet not connected');
    }

    try {
      const tx = await marketplace.updateNodeStatus(nodeId, isOnline);
      await tx.wait();

      toast({
        title: 'Success',
        description: `Node status updated to ${isOnline ? 'online' : 'offline'}`,
        variant: 'success',
      });

      await loadNodes();
    } catch (error: any) {
      console.error('Failed to update node status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update node status',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const getNodesByOwner = (ownerAddress: string) => {
    return nodes.filter(node => node.owner.toLowerCase() === ownerAddress.toLowerCase());
  };

  const getAvailableNodes = () => {
    return nodes.filter(node => node.status === 'online');
  };

  return {
    nodes,
    isLoading,
    registerNode,
    updateNodeStatus,
    getNodesByOwner,
    getAvailableNodes,
    refreshNodes: loadNodes,
  };
}

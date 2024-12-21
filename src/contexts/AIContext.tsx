import { createContext, useContext, useState, useEffect } from 'react';
import { AIModel, AIAgent, Workflow } from '@/types/platform';
import { useWeb3 } from './Web3Context';
import { useStore } from '@/store/useStore';
import { ethers } from 'ethers';
import { useMarketplace, useAgentRental } from '@/hooks/useContracts';

interface AIContextType {
  models: AIModel[];
  agents: AIAgent[];
  workflows: Workflow[];
  loadModels: () => Promise<void>;
  loadAgents: () => Promise<void>;
  createWorkflow: (workflow: Workflow) => Promise<void>;
  executeWorkflow: (workflowId: string) => Promise<void>;
  stakeModel: (modelId: string, amount: string) => Promise<void>;
  rentAgent: (agentId: string, duration: number) => Promise<void>;
}

const AIContext = createContext<AIContextType | null>(null);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const { signer } = useWeb3();
  const marketplaceContract = useMarketplace();
  const agentRentalContract = useAgentRental();
  const { setModels: setStoreModels } = useStore();
  const [models, setModels] = useState<AIModel[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const loadModels = async () => {
    if (!marketplaceContract) return;
    try {
      const modelCount = await marketplaceContract.modelCounter();
      const fetchedModels = [];
      
      for (let i = 1; i <= modelCount.toNumber(); i++) {
        const model = await marketplaceContract.getModel(i);
        if (model.isListed) {
          fetchedModels.push(model);
        }
      }
      
      setModels(fetchedModels);
      setStoreModels(fetchedModels);
    } catch (error) {
      console.error('Failed to load models:', error);
    }
  };

  const loadAgents = async () => {
    if (!agentRentalContract) return;
    try {
      const agentCount = await agentRentalContract.agentCounter();
      const fetchedAgents = [];
      
      for (let i = 1; i <= agentCount.toNumber(); i++) {
        const agent = await agentRentalContract.getAgent(i);
        if (agent.isAvailable) {
          fetchedAgents.push(agent);
        }
      }
      
      setAgents(fetchedAgents);
    } catch (error) {
      console.error('Failed to load agents:', error);
    }
  };

  const createWorkflow = async (workflow: Workflow) => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_WORKFLOW_CONTRACT!,
        ['function createWorkflow(string name, string description, Step[] steps)'],
        signer
      );
      const tx = await contract.createWorkflow(
        workflow.name,
        workflow.description,
        workflow.steps
      );
      await tx.wait();
      setWorkflows([...workflows, workflow]);
    } catch (error) {
      console.error('Failed to create workflow:', error);
      throw error;
    }
  };

  const executeWorkflow = async (workflowId: string) => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_WORKFLOW_CONTRACT!,
        ['function executeWorkflow(string workflowId)'],
        signer
      );
      const tx = await contract.executeWorkflow(workflowId);
      await tx.wait();
      
      // Update workflow status
      setWorkflows(workflows.map(w => 
        w.id === workflowId ? { ...w, status: 'running' } : w
      ));
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      throw error;
    }
  };

  const stakeModel = async (modelId: string, amount: string) => {
    if (!signer) return;
    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_STAKING_CONTRACT!,
        ['function stakeModel(string modelId, uint256 amount)'],
        signer
      );
      const tx = await contract.stakeModel(modelId, ethers.utils.parseEther(amount));
      await tx.wait();
      
      // Update model staking info
      setModels(models.map(m => 
        m.id === modelId ? {
          ...m,
          staking: {
            ...m.staking,
            isStaked: true,
            stakedAmount: Number(amount)
          }
        } : m
      ));
    } catch (error) {
      console.error('Failed to stake model:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (signer) {
      loadModels();
      loadAgents();
    }
  }, [signer]);

  return (
    <AIContext.Provider value={{
      models,
      agents,
      workflows,
      loadModels,
      loadAgents,
      createWorkflow,
      executeWorkflow,
      stakeModel,
      rentAgent: async () => {}, // Implement if needed
    }}>
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
}; 
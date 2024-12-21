import { ContractInterface } from 'ethers';

// Contract ABIs
const BaseABI: ContractInterface = [
  "function verifyUser(address user) external",
  "function revokeUser(address user) external",
  "function pause() external",
  "function unpause() external"
];

const MarketplaceABI: ContractInterface = [
  "function listModel(string memory metadata, uint256 price, string memory licenseTerms) external",
  "function buyModel(uint256 modelId) external payable",
  "function validateModel(uint256 modelId, string memory performanceMetrics) external",
  "function hasLicense(uint256 modelId, address user) external view returns (bool)",
  "function getModel(uint256 modelId) external view returns (Model memory)",
  "struct Model(uint256 id, address owner, string metadata, uint256 price, bool isListed, string performanceMetrics, bool isValidated, string licenseTerms)"
];

const AgentRentalABI: ContractInterface = [
  "function rentAgent(uint256 agentId, uint256 duration) external payable",
  "function returnAgent(uint256 agentId) external",
  "function getAgent(uint256 agentId) external view returns (Agent memory)",
  "struct Agent(uint256 id, address owner, string metadata, uint256 price, bool isAvailable, address currentRenter, uint256 rentalEndTime)"
];

// Contract Addresses (to be updated with actual deployed addresses)
export const CONTRACT_ADDRESSES = {
  BASE: process.env.NEXT_PUBLIC_BASE_CONTRACT || '0x...',
  MARKETPLACE: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT || '0x...',
  AGENT_RENTAL: process.env.NEXT_PUBLIC_AGENT_RENTAL_CONTRACT || '0x...',
  STAKING: process.env.NEXT_PUBLIC_STAKING_CONTRACT || '0x...',
  WORKFLOW: process.env.NEXT_PUBLIC_WORKFLOW_CONTRACT || '0x...'
};

// Contract ABIs
export const CONTRACT_ABIS = {
  BASE: BaseABI,
  MARKETPLACE: MarketplaceABI,
  AGENT_RENTAL: AgentRentalABI
};

// Contract Types
export interface ContractAddresses {
  BASE: string;
  MARKETPLACE: string;
  AGENT_RENTAL: string;
  STAKING: string;
  WORKFLOW: string;
}

export interface ContractABIs {
  BASE: ContractInterface;
  MARKETPLACE: ContractInterface;
  AGENT_RENTAL: ContractInterface;
} 
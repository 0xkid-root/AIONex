// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IAIONexMarketplace {
    // Events
    event ModelListed(address indexed creator, string modelId, uint256 price);
    event ModelPurchased(address indexed buyer, string modelId, uint256 price);
    event ComputeNodeRegistered(address indexed owner, string nodeId);
    event JobCreated(string indexed jobId, address requestor, address provider);
    event JobCompleted(string indexed jobId, uint256 cost);
    event JobFailed(string indexed jobId, string reason);

    // Structs
    struct Model {
        string id;
        address creator;
        uint256 price;
        bool active;
        uint256 totalSales;
        uint256 createdAt;
    }

    struct ComputeNode {
        string id;
        address owner;
        uint256 pricePerHour;
        bool active;
        uint256 reputation;
        uint256 totalJobs;
    }

    struct Job {
        string id;
        address requestor;
        address provider;
        string modelId;
        uint256 cost;
        uint256 startTime;
        uint256 endTime;
        bool completed;
    }

    // Core functions
    function listModel(string calldata modelId, uint256 price) external;
    function purchaseModel(string calldata modelId) external payable;
    function registerComputeNode(string calldata nodeId, uint256 pricePerHour) external;
    function createJob(string calldata jobId, string calldata modelId, address provider) external payable;
    function completeJob(string calldata jobId) external;
    function failJob(string calldata jobId, string calldata reason) external;
    
    // View functions
    function getModel(string calldata modelId) external view returns (Model memory);
    function getComputeNode(string calldata nodeId) external view returns (ComputeNode memory);
    function getJob(string calldata jobId) external view returns (Job memory);
    function getModelPrice(string calldata modelId) external view returns (uint256);
    function getProviderReputation(address provider) external view returns (uint256);
    
    // Admin functions
    function updateFees(uint256 newFee) external;
    function withdrawFees() external;
    function pause() external;
    function unpause() external;
}

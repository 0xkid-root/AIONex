// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAIONexMarketplace.sol";

contract AIONexMarketplace is IAIONexMarketplace, Pausable, ReentrancyGuard, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    uint256 public platformFee = 250; // 2.5% in basis points
    
    mapping(string => Model) public models;
    mapping(string => ComputeNode) public computeNodes;
    mapping(string => Job) public jobs;
    mapping(address => uint256) public providerReputations;
    
    IERC20 public paymentToken;
    
    constructor(address _paymentToken) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        paymentToken = IERC20(_paymentToken);
    }
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }
    
    function listModel(string calldata modelId, uint256 price) external override whenNotPaused {
        require(price > 0, "Price must be greater than 0");
        require(models[modelId].creator == address(0), "Model already exists");
        
        models[modelId] = Model({
            id: modelId,
            creator: msg.sender,
            price: price,
            active: true,
            totalSales: 0,
            createdAt: block.timestamp
        });
        
        emit ModelListed(msg.sender, modelId, price);
    }
    
    function purchaseModel(string calldata modelId) external payable override whenNotPaused nonReentrant {
        Model storage model = models[modelId];
        require(model.creator != address(0), "Model does not exist");
        require(model.active, "Model is not active");
        
        uint256 fee = (model.price * platformFee) / 10000;
        uint256 creatorPayment = model.price - fee;
        
        require(paymentToken.transferFrom(msg.sender, model.creator, creatorPayment), "Creator payment failed");
        require(paymentToken.transferFrom(msg.sender, address(this), fee), "Fee payment failed");
        
        model.totalSales += 1;
        emit ModelPurchased(msg.sender, modelId, model.price);
    }
    
    function registerComputeNode(string calldata nodeId, uint256 pricePerHour) external override whenNotPaused {
        require(computeNodes[nodeId].owner == address(0), "Node already registered");
        
        computeNodes[nodeId] = ComputeNode({
            id: nodeId,
            owner: msg.sender,
            pricePerHour: pricePerHour,
            active: true,
            reputation: 0,
            totalJobs: 0
        });
        
        emit ComputeNodeRegistered(msg.sender, nodeId);
    }
    
    function createJob(string calldata jobId, string calldata modelId, address provider) external payable override whenNotPaused nonReentrant {
        require(computeNodes[modelId].owner == provider, "Invalid provider");
        require(jobs[jobId].requestor == address(0), "Job already exists");
        
        jobs[jobId] = Job({
            id: jobId,
            requestor: msg.sender,
            provider: provider,
            modelId: modelId,
            cost: 0,
            startTime: block.timestamp,
            endTime: 0,
            completed: false
        });
        
        emit JobCreated(jobId, msg.sender, provider);
    }
    
    function completeJob(string calldata jobId) external override whenNotPaused nonReentrant {
        Job storage job = jobs[jobId];
        require(job.provider == msg.sender, "Only provider can complete job");
        require(!job.completed, "Job already completed");
        
        uint256 duration = block.timestamp - job.startTime;
        uint256 cost = (duration * computeNodes[job.modelId].pricePerHour) / 3600;
        uint256 fee = (cost * platformFee) / 10000;
        uint256 providerPayment = cost - fee;
        
        require(paymentToken.transferFrom(job.requestor, job.provider, providerPayment), "Provider payment failed");
        require(paymentToken.transferFrom(job.requestor, address(this), fee), "Fee payment failed");
        
        job.completed = true;
        job.endTime = block.timestamp;
        job.cost = cost;
        
        computeNodes[job.modelId].totalJobs += 1;
        providerReputations[job.provider] += 1;
        
        emit JobCompleted(jobId, cost);
    }
    
    function failJob(string calldata jobId, string calldata reason) external override whenNotPaused {
        Job storage job = jobs[jobId];
        require(job.provider == msg.sender || job.requestor == msg.sender, "Unauthorized");
        require(!job.completed, "Job already completed");
        
        job.completed = true;
        job.endTime = block.timestamp;
        
        emit JobFailed(jobId, reason);
    }
    
    // View functions
    function getModel(string calldata modelId) external view override returns (Model memory) {
        return models[modelId];
    }
    
    function getComputeNode(string calldata nodeId) external view override returns (ComputeNode memory) {
        return computeNodes[nodeId];
    }
    
    function getJob(string calldata jobId) external view override returns (Job memory) {
        return jobs[jobId];
    }
    
    function getModelPrice(string calldata modelId) external view override returns (uint256) {
        return models[modelId].price;
    }
    
    function getProviderReputation(address provider) external view override returns (uint256) {
        return providerReputations[provider];
    }
    
    // Admin functions
    function updateFees(uint256 newFee) external override onlyAdmin {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
    
    function withdrawFees() external override onlyAdmin {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(paymentToken.transfer(msg.sender, balance), "Transfer failed");
    }
    
    function pause() external override onlyAdmin {
        _pause();
    }
    
    function unpause() external override onlyAdmin {
        _unpause();
    }
}

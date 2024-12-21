// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ResourceRegistry.sol";

contract JobManager is ReentrancyGuard {
    IERC20 public deaiToken;
    ResourceRegistry public resourceRegistry;

    struct Job {
        address consumer;
        bytes32 resourceId;
        uint256 duration;
        uint256 totalPrice;
        uint256 startTime;
        JobStatus status;
        bytes resultHash;
    }

    enum JobStatus {
        Created,
        Running,
        Completed,
        Failed,
        Cancelled
    }

    mapping(bytes32 => Job) public jobs;
    mapping(address => bytes32[]) public consumerJobs;
    mapping(address => bytes32[]) public providerJobs;

    event JobCreated(bytes32 indexed jobId, address indexed consumer, bytes32 indexed resourceId);
    event JobStarted(bytes32 indexed jobId);
    event JobCompleted(bytes32 indexed jobId, bytes resultHash);
    event JobFailed(bytes32 indexed jobId);
    event JobCancelled(bytes32 indexed jobId);

    constructor(address _deaiToken, address _resourceRegistry) {
        deaiToken = IERC20(_deaiToken);
        resourceRegistry = ResourceRegistry(_resourceRegistry);
    }

    function createJob(bytes32 resourceId, uint256 duration) external nonReentrant returns (bytes32) {
        (
            address provider,
            ,
            ,
            ,
            uint256 pricePerHour,
            bool isActive,
            
        ) = resourceRegistry.getResource(resourceId);

        require(isActive, "Resource not active");

        uint256 totalPrice = (duration * pricePerHour) / 1 hours;
        require(deaiToken.balanceOf(msg.sender) >= totalPrice, "Insufficient balance");
        require(deaiToken.allowance(msg.sender, address(this)) >= totalPrice, "Insufficient allowance");

        bytes32 jobId = keccak256(
            abi.encodePacked(msg.sender, resourceId, block.timestamp)
        );

        jobs[jobId] = Job({
            consumer: msg.sender,
            resourceId: resourceId,
            duration: duration,
            totalPrice: totalPrice,
            startTime: 0,
            status: JobStatus.Created,
            resultHash: bytes("")
        });

        consumerJobs[msg.sender].push(jobId);
        providerJobs[provider].push(jobId);

        deaiToken.transferFrom(msg.sender, address(this), totalPrice);

        emit JobCreated(jobId, msg.sender, resourceId);
        return jobId;
    }

    function startJob(bytes32 jobId) external {
        Job storage job = jobs[jobId];
        (address provider, , , , , , ) = resourceRegistry.getResource(job.resourceId);
        
        require(msg.sender == provider, "Not resource provider");
        require(job.status == JobStatus.Created, "Invalid job status");

        job.status = JobStatus.Running;
        job.startTime = block.timestamp;

        emit JobStarted(jobId);
    }

    function completeJob(bytes32 jobId, bytes memory resultHash) external {
        Job storage job = jobs[jobId];
        (address provider, , , , , , ) = resourceRegistry.getResource(job.resourceId);
        
        require(msg.sender == provider, "Not resource provider");
        require(job.status == JobStatus.Running, "Job not running");

        job.status = JobStatus.Completed;
        job.resultHash = resultHash;

        // Transfer payment to provider
        deaiToken.transfer(provider, job.totalPrice);

        emit JobCompleted(jobId, resultHash);
    }

    function failJob(bytes32 jobId) external {
        Job storage job = jobs[jobId];
        (address provider, , , , , , ) = resourceRegistry.getResource(job.resourceId);
        
        require(msg.sender == provider, "Not resource provider");
        require(job.status == JobStatus.Running, "Job not running");

        job.status = JobStatus.Failed;

        // Refund consumer
        deaiToken.transfer(job.consumer, job.totalPrice);

        emit JobFailed(jobId);
    }

    function cancelJob(bytes32 jobId) external {
        Job storage job = jobs[jobId];
        require(msg.sender == job.consumer, "Not job consumer");
        require(job.status == JobStatus.Created, "Cannot cancel job");

        job.status = JobStatus.Cancelled;

        // Refund consumer
        deaiToken.transfer(job.consumer, job.totalPrice);

        emit JobCancelled(jobId);
    }

    function getJob(bytes32 jobId) external view returns (
        address consumer,
        bytes32 resourceId,
        uint256 duration,
        uint256 totalPrice,
        uint256 startTime,
        JobStatus status,
        bytes memory resultHash
    ) {
        Job memory job = jobs[jobId];
        return (
            job.consumer,
            job.resourceId,
            job.duration,
            job.totalPrice,
            job.startTime,
            job.status,
            job.resultHash
        );
    }
}
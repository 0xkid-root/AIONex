// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ResourceRegistry is Ownable, ReentrancyGuard {
    struct ComputeResource {
        address provider;
        string gpuSpec;
        uint256 memory;
        uint256 storage;
        uint256 pricePerHour;
        bool isActive;
        uint256 reputation;
    }

    mapping(bytes32 => ComputeResource) public resources;
    mapping(address => bytes32[]) public providerResources;

    event ResourceRegistered(bytes32 indexed resourceId, address indexed provider);
    event ResourceUpdated(bytes32 indexed resourceId);
    event ResourceDeactivated(bytes32 indexed resourceId);

    constructor() Ownable(msg.sender) {}

    function registerResource(
        string memory gpuSpec,
        uint256 memory_,
        uint256 storage_,
        uint256 pricePerHour
    ) external returns (bytes32) {
        bytes32 resourceId = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, gpuSpec)
        );

        resources[resourceId] = ComputeResource({
            provider: msg.sender,
            gpuSpec: gpuSpec,
            memory: memory_,
            storage: storage_,
            pricePerHour: pricePerHour,
            isActive: true,
            reputation: 0
        });

        providerResources[msg.sender].push(resourceId);

        emit ResourceRegistered(resourceId, msg.sender);
        return resourceId;
    }

    function updateResourcePrice(bytes32 resourceId, uint256 newPrice) external {
        require(resources[resourceId].provider == msg.sender, "Not resource owner");
        require(resources[resourceId].isActive, "Resource not active");

        resources[resourceId].pricePerHour = newPrice;
        emit ResourceUpdated(resourceId);
    }

    function deactivateResource(bytes32 resourceId) external {
        require(resources[resourceId].provider == msg.sender, "Not resource owner");
        resources[resourceId].isActive = false;
        emit ResourceDeactivated(resourceId);
    }

    function getResource(bytes32 resourceId) external view returns (
        address provider,
        string memory gpuSpec,
        uint256 memory_,
        uint256 storage_,
        uint256 pricePerHour,
        bool isActive,
        uint256 reputation
    ) {
        ComputeResource memory resource = resources[resourceId];
        return (
            resource.provider,
            resource.gpuSpec,
            resource.memory,
            resource.storage,
            resource.pricePerHour,
            resource.isActive,
            resource.reputation
        );
    }
}
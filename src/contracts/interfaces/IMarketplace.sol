// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMarketplace {
    struct Model {
        uint256 id;
        address owner;
        string metadata;
        uint256 price;
        bool isListed;
        string performanceMetrics;
        bool isValidated;
        string licenseTerms;
    }

    function listModel(string memory metadata, uint256 price, string memory licenseTerms) external;
    function buyModel(uint256 modelId) external payable;
    function validateModel(uint256 modelId, string memory performanceMetrics) external;
    function hasLicense(uint256 modelId, address user) external view returns (bool);
    function getModel(uint256 modelId) external view returns (Model memory);
} 
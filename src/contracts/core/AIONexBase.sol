// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../interfaces/IBase.sol";

contract AIONexBase is IBase, AccessControl, ReentrancyGuard, Pausable {
    using SafeMath for uint256;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    mapping(address => bool) public verifiedUsers;
    
    event UserVerified(address indexed user);
    event UserRevoked(address indexed user);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    modifier onlyVerified() {
        require(verifiedUsers[msg.sender], "User not verified");
        _;
    }

    function verifyUser(address user) external override onlyRole(ADMIN_ROLE) {
        verifiedUsers[user] = true;
        emit UserVerified(user);
    }

    function revokeUser(address user) external override onlyRole(ADMIN_ROLE) {
        verifiedUsers[user] = false;
        emit UserRevoked(user);
    }

    function pause() external override onlyRole(ADMIN_ROLE) {
        _pause();
    }

    function unpause() external override onlyRole(ADMIN_ROLE) {
        _unpause();
    }
} 
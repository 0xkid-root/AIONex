// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBase {
    function verifyUser(address user) external;
    function revokeUser(address user) external;
    function pause() external;
    function unpause() external;
} 
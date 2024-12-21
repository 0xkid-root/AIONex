// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeAIToken is ERC20, Ownable {
    constructor() ERC20("DeAI Network Token", "DEAI") Ownable(msg.sender) {
        _mint(msg.sender, 1000000000 * 10 ** decimals()); // Initial supply: 1 billion tokens
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
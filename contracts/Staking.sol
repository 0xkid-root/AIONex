// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeAIStaking is ReentrancyGuard, Ownable {
    IERC20 public deaiToken;
    
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    
    mapping(address => Stake) public stakes;
    uint256 public totalStaked;
    uint256 public constant MINIMUM_STAKE = 1000 * 10**18; // 1000 DEAI tokens
    uint256 public constant LOCK_PERIOD = 7 days;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _deaiToken) Ownable(msg.sender) {
        deaiToken = IERC20(_deaiToken);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount >= MINIMUM_STAKE, "Below minimum stake amount");
        require(deaiToken.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(deaiToken.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");

        if (stakes[msg.sender].amount > 0) {
            _claimReward();
        }

        stakes[msg.sender].amount += amount;
        stakes[msg.sender].timestamp = block.timestamp;
        totalStaked += amount;

        deaiToken.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function unstake() external nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        require(block.timestamp >= userStake.timestamp + LOCK_PERIOD, "Stake is locked");

        _claimReward();

        uint256 amount = userStake.amount;
        totalStaked -= amount;
        delete stakes[msg.sender];

        deaiToken.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimReward() external nonReentrant {
        _claimReward();
    }

    function _claimReward() internal {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 reward = calculateReward(msg.sender);
        if (reward > 0) {
            deaiToken.transfer(msg.sender, reward);
            emit RewardClaimed(msg.sender, reward);
        }

        userStake.timestamp = block.timestamp;
    }

    function calculateReward(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;

        uint256 stakingDuration = block.timestamp - userStake.timestamp;
        // 10% APR, calculated per second
        return (userStake.amount * stakingDuration * 10) / (365 days * 100);
    }

    function getStakeInfo(address user) external view returns (uint256 amount, uint256 timestamp, uint256 reward) {
        Stake memory userStake = stakes[user];
        return (userStake.amount, userStake.timestamp, calculateReward(user));
    }
}
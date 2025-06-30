
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract AidToken is ERC20, Ownable, Pausable {
    mapping(address => bool) public verifiers;
    mapping(address => uint256) public aidRequests;
    
    event AidRequested(address indexed recipient, uint256 amount);
    event AidDistributed(address indexed recipient, uint256 amount);
    event VerifierAdded(address indexed verifier);
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address creator
    ) ERC20(name, symbol) {
        _mint(creator, totalSupply * 10**decimals());
        _transferOwnership(creator);
    }
    
    modifier onlyVerifier() {
        require(verifiers[msg.sender], "Not authorized verifier");
        _;
    }
    
    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;
        emit VerifierAdded(_verifier);
    }
    
    function requestAid(uint256 amount) external {
        aidRequests[msg.sender] = amount;
        emit AidRequested(msg.sender, amount);
    }
    
    function distributeAid(address recipient, uint256 amount) 
        external 
        onlyVerifier 
        whenNotPaused 
    {
        require(aidRequests[recipient] >= amount, "Invalid aid request");
        require(balanceOf(owner()) >= amount, "Insufficient funds");
        
        _transfer(owner(), recipient, amount);
        aidRequests[recipient] -= amount;
        
        emit AidDistributed(recipient, amount);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}

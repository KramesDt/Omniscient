// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Omniscient is ERC20 {
    address public owner;
    uint256 public tokenPrice; // Price in Wei (1 ether = 1e18 Wei)

    constructor(string memory _name, string memory _symbol, uint256 initialSupply, uint256 _tokenPrice) ERC20(_name, _symbol) {
        owner = msg.sender;
        tokenPrice = _tokenPrice;
        _mint(msg.sender, initialSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function setTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }
}

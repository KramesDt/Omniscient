// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OmniToken is ERC20 {
    // Token details
    string private constant _name = "Omniscient";
    string private constant _symbol = "OMNI";
    uint8 private constant _decimals = 18;
    uint256 private constant _initialSupply = 100000000 * (10**uint256(_decimals));

    constructor() ERC20(_name, _symbol) {
        _mint(msg.sender, _initialSupply);
    }
}
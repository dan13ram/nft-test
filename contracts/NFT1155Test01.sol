// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NFTC1155Test01 is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor()
        ERC1155("https://abcoathup.github.io/SampleERC1155/api/token/{id}.json")
    {
        _mint(msg.sender, GOLD, 10, "");
        _mint(msg.sender, SILVER, 20, "");
        _mint(msg.sender, THORS_HAMMER, 30, "");
        _mint(msg.sender, SWORD, 40, "");
        _mint(msg.sender, SHIELD, 60, "");
    }
}

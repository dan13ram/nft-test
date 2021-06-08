// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTC721Test01 is ERC721, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseURI;

    constructor () ERC721("Simple ERC721 Token", "SIM") {
        mint(msg.sender);
        mint(msg.sender);
        mint(msg.sender);
        mint(msg.sender);
        mint(msg.sender);
    }


    function mint(address to) public onlyOwner {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
    }

    function tokenURI(uint256) public pure override returns (string memory) {
        return "https://openmoji.org/data/color/svg/1F3F3-FE0F-200D-1F308.svg";
    }
}

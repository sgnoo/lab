pragma solidity 0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Sample is ERC721, Ownable {
    constructor() public ERC721("SAMPLE", "SMPL") {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function _mint(address to) public onlyOwner {
        mint(to, totalSupply().add(1));
    }
}

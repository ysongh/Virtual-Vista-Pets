// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PetNFT is ERC721URIStorage {
  uint private _tokenIds;

  constructor() ERC721("Virtual Vista Pets", "VVP") {}

  function mint(address _to) public returns (uint256) {
    _mint(_to, _tokenIds);
    _tokenIds++;
    return _tokenIds;
  }

  function setURL(uint256 _id, string memory _tokenURI_) public {
    _setTokenURI(_id, _tokenURI_);
  }
}
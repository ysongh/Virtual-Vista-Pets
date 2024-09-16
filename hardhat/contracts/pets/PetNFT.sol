// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PetNFT is ERC721URIStorage {
  uint private _tokenIds;

  mapping(address => Pet) public userPet;
  mapping(uint => string[]) public userPetPhotos;

  struct Pet {
    uint id;
    string name;
  }

  constructor() ERC721("Virtual Vista Pets", "VVP") {}

  function createAndMintPet(address _to, string memory _tokenURI, string memory _name) public {
    _tokenIds++;
    _mint(_to, _tokenIds);
    _setTokenURI(_tokenIds, _tokenURI);
    userPet[msg.sender] = Pet(_tokenIds, _name);
  }

  function addPhoto(uint _id, string memory _url) public {
    userPetPhotos[_id].push(_url);
  }
}
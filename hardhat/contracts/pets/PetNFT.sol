// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PetNFT is ERC721URIStorage {
  error PetNFT__NotEnoughToFeed();

  uint private _tokenIds;

  mapping(address => Pet) public userPet;
  mapping(uint => Photo[]) public userPetPhotos;

  struct Pet {
    uint id;
    string name;
    string photoURL;
    string personality;
    uint happiness;
    uint age;
  }

  struct Photo {
    string photoURL;
    string caption;
  }

  constructor() ERC721("Virtual Vista Pets", "VVP") {}

  function createAndMintPet(address _to, string memory _tokenURI, string memory _name, string memory _personality) public {
    _tokenIds++;
    _mint(_to, _tokenIds);
    _setTokenURI(_tokenIds, _tokenURI);
    userPet[msg.sender] = Pet(_tokenIds, _name, _tokenURI, _personality, 0, block.timestamp);
  }

  function addPhoto(string memory _url, string memory _caption) public {
    Pet storage currentPet = userPet[msg.sender];
    userPetPhotos[currentPet.id].push(Photo(_url, _caption));
    currentPet.happiness += 10;
  }

  function playPet() public {
    Pet storage currentPet = userPet[msg.sender];
    currentPet.happiness += 1;
  }

  function feedPet() public payable {
    if (msg.value >= 0.00001 ether) {
      revert PetNFT__NotEnoughToFeed();
    }

    Pet storage currentPet = userPet[msg.sender];
    currentPet.happiness += 10;
  }

  function getPet() public view returns (Pet memory) {
    return userPet[msg.sender];
  }

  function getPhotoFromPet(uint _id) public view returns (Photo[] memory) {
    return userPetPhotos[_id];
  }
}
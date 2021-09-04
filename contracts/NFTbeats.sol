// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTbeats is ERC721 {
  
  constructor() ERC721("NFTbeats", "BEATS") {}

  uint public tCount;
  
  mapping(address => string) artists;
  mapping(uint => Track) public tracks;

  struct Track {
    uint id;
    uint price;
    bool isListed;
    string name;
    string filecid;
    address artist;
    address payable owner;
  }
}

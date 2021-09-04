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

    event createdTrack(uint, string, address);

    function createTrack(
        string memory _name, 
        string memory _filecid
    )   external {
        require(bytes(_name).length > 0 && bytes(_filecid).length > 0, "Name and file required");
        tCount++;
        _safeMint(msg.sender, tCount);
        _setTokenURI(tCount, _filecid);
        tracks[tCount] = Track(tCount, 0, false, _name, _filecid, msg.sender, msg.sender);
        emit createdTrack(tCount, tracks[tCount].name, tracks[tCount].owner);
    }    
}

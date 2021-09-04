// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTbeats is ERC721 {
  
    constructor() ERC721("NFTbeats", "BEATS") {}

    modifier idExists(uint id) {
        require(id > 0 && id <= tCount);
        _;
    }

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

    event createdTrack(uint id, string name, address owner);
    event setTrackPrice(uint id, uint newPrice, bool listed);
    event boughtTrack(uint id, address buyer);

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

    function setPrice(
        uint _id, 
        uint _price
    )   external 
        idExists(_id)
    {
        tracks[_id].isListed = true;
        tracks[_id].price = _price;
        approve(address(this), _id);
        emit setTrackPrice(_id, tracks[_id].price, tracks[_id].isListed);
    } 
  
    function buyTrack(uint _id)
        external
        payable
        idExists(_id) 
    {
        (bool paid,) = tracks[_id].owner.call{ value: msg.value }("");
        require(paid == true, "Not sent");
        _transfer(tracks[_id].owner, msg.sender, _id);
        tracks[_id].owner = msg.sender;
        tracks[_id].isListed = false;
        emit boughtTrack(_id, msg.sender);
    }
}

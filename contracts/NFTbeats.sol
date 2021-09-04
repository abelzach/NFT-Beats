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
    uint public oCount;
    
    mapping(address => string) artists;
    mapping(uint => Track) public tracks;
    mapping(uint => Offer) public offers;

    struct Track {
        uint id;
        uint price;
        bool isListed;
        string name;
        string filecid;
        string aName;
        address artist;
        address payable owner;
    }

    struct Offer {
        uint id;
        uint trackID;
        uint offerAmount;
        address bidder;
        address auctioneer;
        bool isApproved;
    }

    event createdTrack(
        uint id, 
        string name, 
        address owner
    );

    event setTrackPrice(
        uint id, 
        uint newPrice, 
        bool listed
    );

    event offerApproved(
        uint id,
        uint trackID, 
        uint amount, 
        bool approved
    );

    event boughtTrack(
        uint id, 
        address buyer
    );

    function registerArtist(string memory _name) external {
        artists[msg.sender] = _name;
    }

    function verifyCreator(uint _id) 
        external 
        view 
        idExists(_id)
        returns (string memory, address) 
    {
        address creator = tracks[_id].artist;
        if(bytes(artists[creator]).length > 0) {
            return (artists[creator], creator);
        } else {
            return("Address not recognized", address(0));
        }
    }

    function createTrack(
        string memory _name, 
        string memory _filecid
    )   external {
        require(bytes(_name).length > 0 && bytes(_filecid).length > 0, "Name and file required");
        tCount++;
        _safeMint(msg.sender, tCount);
        _setTokenURI(tCount, _filecid);
        tracks[tCount] = Track(tCount, 0, false, _name, _filecid, artists[msg.sender], msg.sender, msg.sender);
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
        emit setTrackPrice(_id, tracks[_id].price, tracks[_id].isListed);
    } 

    function makeOffer(
        uint _tid, 
        uint _amount
    ) 
        external 
        payable 
        idExists(_tid)
    {
        require(_amount > tracks[_tid].price, "Invalid offer");
        oCount++;    
        offers[oCount] = Offer(oCount, _tid, _amount, msg.sender, tracks[_tid].owner, false);
    }

    function approveOffer(uint _id) external {
        approve(offers[_id].bidder, offers[_id].trackID);
        offers[_id].isApproved = true;
        emit offerApproved(oCount, offers[_id].trackID, offers[_id].offerAmount, offers[_id].isApproved);
    }
  
    function buyTrack(uint _id)
        external
        payable
        idExists(_id) 
    {
        (bool paid,) = tracks[_id].owner.call{ value: msg.value }("");
        require(paid == true, "Not sent");
        safeTransferFrom(tracks[_id].owner, msg.sender, _id);
        tracks[_id].owner = msg.sender;
        tracks[_id].isListed = false;
        emit boughtTrack(_id, tracks[_id].owner);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AIModelNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ModelMetadata {
        string name;
        string description;
        string ipfsHash;
        uint256 price;
        string license;
    }

    mapping(uint256 => ModelMetadata) public models;
    mapping(uint256 => bool) public modelForSale;
    mapping(uint256 => uint256) public modelPrices;

    event ModelListed(uint256 indexed tokenId, uint256 price);
    event ModelSold(uint256 indexed tokenId, address buyer, uint256 price);

    constructor() ERC721("AIONex AI Model", "AION") {}

    function mintModel(
        address creator,
        string memory tokenURI,
        ModelMetadata memory metadata
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(creator, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        models[newTokenId] = metadata;

        return newTokenId;
    }

    function listModelForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        require(price > 0, "Price must be greater than 0");

        modelForSale[tokenId] = true;
        modelPrices[tokenId] = price;

        emit ModelListed(tokenId, price);
    }

    function buyModel(uint256 tokenId) public payable {
        require(modelForSale[tokenId], "Model not for sale");
        require(msg.value >= modelPrices[tokenId], "Insufficient payment");

        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);
        
        modelForSale[tokenId] = false;
        payable(seller).transfer(msg.value);

        emit ModelSold(tokenId, msg.sender, msg.value);
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
} 
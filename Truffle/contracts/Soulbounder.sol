// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Soulbounder is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(address => bool) private _walletHasAuthToken;
    mapping(uint256 => uint256) private _tokenTypes;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);


    constructor() ERC721("Soulbounder", "SBT") {}


    function safeMint(address to, string memory uri, uint256 tokenType) public {
        require(tokenType != 0, "Invalid token type");
        
        if (tokenType == 1) {
            require(!_walletHasAuthToken[to], "Only one authentication token can be minted per wallet");
            _walletHasAuthToken[to] = true;
        }

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenTypes[tokenId] = tokenType;
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn it");
        _burn(tokenId);

        uint256 tokenType = _tokenTypes[tokenId];
        if (tokenType == 1) {
            _walletHasAuthToken[msg.sender] = false;
        }
    }


    function revoke(uint256 tokenId) external {
        _burn(tokenId);

        uint256 tokenType = _tokenTypes[tokenId];
        if (tokenType == 1) {
            _walletHasAuthToken[msg.sender] = false;
        }
    }


    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
        virtual
    {
        require(from == address(0) || to == address(0), "You can't transfer this token");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }


    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) 
        internal 
        override 
        virtual 
    {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }

    }



    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

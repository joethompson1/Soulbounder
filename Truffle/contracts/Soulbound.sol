// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Soulbound is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);


    constructor() ERC721("Soulbound", "SBT") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }




    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only token owner can burn it");
        _burn(tokenId);
    }




    function revoke(uint256 tokenId) external {
        _burn(tokenId);
    }




    /**
    * @dev Hook that is called before any token transfer. This includes minting and burning. If {ERC721Consecutive} is
    * used, the hook may be called as part of a consecutive (batch) mint, as indicated by `batchSize` greater than 1.
    *
    * Calling conditions:
    *
    * - When `from` and `to` are both non-zero, ``from``'s tokens will be transferred to `to`.
    * - When `from` is zero, the tokens will be minted for `to`.
    * - When `to` is zero, ``from``'s tokens will be burned.
    * - `from` and `to` are never both zero.
    * - `batchSize` is non-zero.
    *
    * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
    */
    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal override virtual {

        require(from == address(0) || to == address(0), "You can't transfer this token");

    }



    /**
    * @dev Hook that is called after any token transfer. This includes minting and burning. If {ERC721Consecutive} is
    * used, the hook may be called as part of a consecutive (batch) mint, as indicated by `batchSize` greater than 1.
    *
    * Calling conditions:
    *
    * - When `from` and `to` are both non-zero, ``from``'s tokens were transferred to `to`.
    * - When `from` is zero, the tokens were minted for `to`.
    * - When `to` is zero, ``from``'s tokens were burned.
    * - `from` and `to` are never both zero.
    * - `batchSize` is non-zero.
    *
    * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
    */
    function _afterTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) internal override virtual {

        if (from == address(0)) {
            emit Attest(to, firstTokenId);
        } else if (to == address(0)) {
            emit Revoke(to, firstTokenId);
        }

    }




    // The following functions are overrides required by Solidity.

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
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ESGIYearlyPerformanceNFT
 * @dev Contrat NFT représentant la performance académique annuelle d'un étudiant.
 */
contract ESGIYearlyPerformanceNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("ESGIYearlyPerformanceNFT", "ESGIPERF") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    // Événements pour suivre la création, la mise à jour et la révocation
    event PerformanceCreated(uint256 tokenId, string studentId);
    event PerformanceUpdated(uint256 tokenId, string newIpfsCID);
    event PerformanceRevoked(uint256 tokenId);


    /**
     * @dev Crée un nouveau NFT de performance annuelle.
     * @param _studentId L'identifiant de l'étudiant.
     * @param _ipfsCID Le CID des métadonnées sur IPFS.
     * @return tokenId Le tokenId du NFT créé.
     */
    function createPerformance(
        string memory _studentId,
        string memory _ipfsCID
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        tokenCounter++;
        emit PerformanceCreated(newTokenId, _studentId);
        return newTokenId;
    }

    /**
     * @dev Met à jour les métadonnées et le statut d'une performance existante.
     * @param _tokenId Le tokenId du NFT à mettre à jour.
     * @param _newIpfsCID Le nouveau CID des métadonnées.
     */
    function updatePerformance(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        _setTokenURI(_tokenId, _newIpfsCID);
        emit PerformanceUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @dev Révoque une performance en modifiant son statut.
     * @param _tokenId Le tokenId du NFT à révoquer.
     */
    function revokePerformance(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        emit PerformanceRevoked(_tokenId);
    }
}

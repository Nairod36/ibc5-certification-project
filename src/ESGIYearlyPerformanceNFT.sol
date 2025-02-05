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

    // Structure pour stocker les informations de performance annuelle
    struct PerformanceData {
        string studentId;
        string year; 
        string ipfsCID; // CID pointant vers les métadonnées sur IPFS
        string status; // Ex: "ACTIVE", "REVOKED"
        uint256 issuedDate;
        string comments;
    }

    // Mapping du tokenId vers les données de performance
    mapping(uint256 => PerformanceData) public performances;

    // Événements pour suivre la création, la mise à jour et la révocation
    event PerformanceCreated(uint256 tokenId, string studentId, string year);
    event PerformanceUpdated(uint256 tokenId, string newIpfsCID, string newStatus);
    event PerformanceRevoked(uint256 tokenId);


    /**
     * @dev Crée un nouveau NFT de performance annuelle.
     * @param _studentId L'identifiant de l'étudiant.
     * @param _year L'année académique (ex: "3rd Year").
     * @param _ipfsCID Le CID des métadonnées sur IPFS.
     * @param _comments Commentaires relatifs à la performance.
     * @return tokenId Le tokenId du NFT créé.
     */
    function createPerformance(
        string memory _studentId,
        string memory _year,
        string memory _ipfsCID,
        string memory _comments
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        performances[newTokenId] = PerformanceData({
            studentId: _studentId,
            year: _year,
            ipfsCID: _ipfsCID,
            status: "ACTIVE",
            issuedDate: block.timestamp,
            comments: _comments
        });
        tokenCounter++;
        emit PerformanceCreated(newTokenId, _studentId, _year);
        return newTokenId;
    }

    /**
     * @dev Met à jour les métadonnées et le statut d'une performance existante.
     * @param _tokenId Le tokenId du NFT à mettre à jour.
     * @param _newIpfsCID Le nouveau CID des métadonnées.
     * @param _newStatus Le nouveau statut de la performance.
     * @param _newComments Nouveaux commentaires.
     */
    function updatePerformance(
        uint256 _tokenId,
        string memory _newIpfsCID,
        string memory _newStatus,
        string memory _newComments
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        performances[_tokenId].ipfsCID = _newIpfsCID;
        performances[_tokenId].status = _newStatus;
        performances[_tokenId].comments = _newComments;
        _setTokenURI(_tokenId, _newIpfsCID);
        emit PerformanceUpdated(_tokenId, _newIpfsCID, _newStatus);
    }

    /**
     * @dev Révoque une performance en modifiant son statut.
     * @param _tokenId Le tokenId du NFT à révoquer.
     */
    function revokePerformance(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        performances[_tokenId].status = "REVOKED";
        emit PerformanceRevoked(_tokenId);
    }
}

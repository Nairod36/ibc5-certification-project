// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ESGICertificate
 * @dev Contrat NFT représentant le certificat d'un programme académique.
 */
contract ESGICertificate is ERC721URIStorage, Ownable {

    uint256 public tokenCounter;

    constructor() ERC721("ESGICertificate", "ESGI") Ownable(msg.sender) { tokenCounter = 0; }

    // Événements pour suivre la création, la mise à jour et la révocation
    event CertificateCreated(uint256 tokenId, string studentId);
    event CertificateUpdated(uint256 tokenId, string newIpfsCID);
    event CertificateRevoked(uint256 tokenId);
    
    /**
     * @dev Crée un nouveau certificat NFT.
     * @param _studentId L'identifiant de l'étudiant.
     * @param _ipfsCID Le CID des métadonnées sur IPFS.
     * @return tokenId Le tokenId du NFT créé.
     */
    function createCertificate(
        string memory _studentId,
        string memory _ipfsCID
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        tokenCounter++;
        emit CertificateCreated(newTokenId, _studentId);
        return newTokenId;
    }

    /**
     * @dev Met à jour les métadonnées et le statut d'un certificat existant.
     * @param _tokenId Le tokenId du NFT à mettre à jour.
     * @param _newIpfsCID Le nouveau CID des métadonnées.
     */
    function updateCertificate(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        _setTokenURI(_tokenId, _newIpfsCID);
        emit CertificateUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @dev Révoque un certificat en modifiant son statut.
     * @param _tokenId Le tokenId du NFT à révoquer.
     */
    function revokeCertificate(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        emit CertificateRevoked(_tokenId);
    }
}

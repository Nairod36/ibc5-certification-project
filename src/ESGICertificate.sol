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

    // Structure pour stocker les informations du certificat
    struct CertificateData {
        string studentId;
        string program;
        string yearRange;       // Ex: "2022-2025"
        string ipfsCID;         // CID pointant vers les métadonnées stockées sur IPFS
        string status;          // Ex: "ACTIVE", "SUCCESS", "REVOKED"
        uint256 certificateIssuedDate;
        string comments;
    }
    // Mapping du tokenId vers les données du certificat
    mapping(uint256 => CertificateData) public certificates;

    // Événements pour suivre la création, la mise à jour et la révocation
    event CertificateCreated(uint256 tokenId, string studentId, string program);
    event CertificateUpdated(uint256 tokenId, string newIpfsCID, string newStatus);
    event CertificateRevoked(uint256 tokenId);
    
    /**
     * @dev Crée un nouveau certificat NFT.
     * @param _studentId L'identifiant de l'étudiant.
     * @param _program Le programme d'études.
     * @param _yearRange La période du programme.
     * @param _ipfsCID Le CID des métadonnées sur IPFS.
     * @param _comments Commentaires relatifs au certificat.
     * @return tokenId Le tokenId du NFT créé.
     */
    function createCertificate(
        string memory _studentId,
        string memory _program,
        string memory _yearRange,
        string memory _ipfsCID,
        string memory _comments
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        certificates[newTokenId] = CertificateData({
            studentId: _studentId,
            program: _program,
            yearRange: _yearRange,
            ipfsCID: _ipfsCID,
            status: "ACTIVE",
            certificateIssuedDate: block.timestamp,
            comments: _comments
        });
        tokenCounter++;
        emit CertificateCreated(newTokenId, _studentId, _program);
        return newTokenId;
    }

    /**
     * @dev Met à jour les métadonnées et le statut d'un certificat existant.
     * @param _tokenId Le tokenId du NFT à mettre à jour.
     * @param _newIpfsCID Le nouveau CID des métadonnées.
     * @param _newStatus Le nouveau statut du certificat.
     * @param _newComments Nouveaux commentaires.
     */
    function updateCertificate(
        uint256 _tokenId,
        string memory _newIpfsCID,
        string memory _newStatus,
        string memory _newComments
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        certificates[_tokenId].ipfsCID = _newIpfsCID;
        certificates[_tokenId].status = _newStatus;
        certificates[_tokenId].comments = _newComments;
        _setTokenURI(_tokenId, _newIpfsCID);
        emit CertificateUpdated(_tokenId, _newIpfsCID, _newStatus);
    }

    /**
     * @dev Révoque un certificat en modifiant son statut.
     * @param _tokenId Le tokenId du NFT à révoquer.
     */
    function revokeCertificate(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        certificates[_tokenId].status = "REVOKED";
        emit CertificateRevoked(_tokenId);
    }
}

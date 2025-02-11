// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IESGINFT.sol";

/**
 * @title ESGICertificate
 * @dev Contrat NFT représentant le certificat d'un programme académique.
 */
contract ESGICertificate is ERC721URIStorage, Ownable, IESGINFT {
    /// @notice Mapping des certificats émis par Token ID
    mapping(uint256 => NFTInfo) private certificates;

    /// @notice Compteur de tokens pour générer les IDs uniques des certificats
    uint256 public tokenCounter;

    /**
     * @notice Initialise le contrat et définit le propriétaire
     */
    constructor() ERC721("ESGICertificate", "ESGI") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    /// @notice Événement émis lorsqu'un certificat est créé
    /// @param tokenId Identifiant unique du certificat
    /// @param studentId Identifiant de l'étudiant associé au certificat
    event CertificateCreated(uint256 tokenId, string studentId);

    /// @notice Événement émis lorsqu'un certificat est mis à jour
    /// @param tokenId Identifiant unique du certificat mis à jour
    /// @param newIpfsCID Nouveau CID IPFS des métadonnées
    event CertificateUpdated(uint256 tokenId, string newIpfsCID);

    /// @notice Événement émis lorsqu'un certificat est révoqué
    /// @param tokenId Identifiant unique du certificat révoqué
    event CertificateRevoked(uint256 tokenId);

    /**
     * @notice Crée un nouveau certificat NFT pour un étudiant
     * @dev Le certificat est stocké sur IPFS et enregistré sous forme de NFT ERC-721
     * @param _studentId Identifiant unique de l'étudiant
     * @param _ipfsCID CID IPFS des métadonnées du certificat
     * @param _years Année(s) académique(s) concernée(s)
     * @return tokenId Identifiant du NFT créé
     */
    function createCertificate(
        string memory _studentId,
        string memory _ipfsCID,
        string memory _years
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        certificates[newTokenId] = NFTInfo({
            tokenId: newTokenId,
            studentId: _studentId,
            ipfsCID: _ipfsCID,
            year: _years
        });
        tokenCounter++;
        emit CertificateCreated(newTokenId, _studentId);
        return newTokenId;
    }

    /**
     * @notice Met à jour les métadonnées d'un certificat existant
     * @dev Seul le propriétaire du contrat peut exécuter cette fonction
     * @param _tokenId Identifiant du certificat à mettre à jour
     * @param _newIpfsCID Nouveau CID IPFS des métadonnées mises à jour
     */
    function updateCertificate(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        _setTokenURI(_tokenId, _newIpfsCID);
        certificates[_tokenId].ipfsCID = _newIpfsCID;
        emit CertificateUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @notice Révoque un certificat existant
     * @dev La révocation n'efface pas le NFT, mais le désactive sur l'application
     * @param _tokenId Identifiant du certificat à révoquer
     */
    function revokeCertificate(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        emit CertificateRevoked(_tokenId);
    }

    /**
     * @notice Récupère les informations d'un certificat spécifique
     * @param _tokenId Identifiant du certificat à récupérer
     * @return Structure NFTInfo contenant les détails du certificat
     */
    function getNFTInfos(
        uint256 _tokenId
    ) external view returns (NFTInfo memory) {
        return certificates[_tokenId];
    }

    /**
     * @notice Récupère la liste de tous les certificats créés
     * @return Tableau contenant toutes les structures NFTInfo des certificats
     */
    function getAllNFTs() external view returns (NFTInfo[] memory) {
        NFTInfo[] memory allCertificates = new NFTInfo[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            allCertificates[i] = certificates[i];
        }
        return allCertificates;
    }
}

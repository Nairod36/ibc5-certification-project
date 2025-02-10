// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ESGICertificate.sol";
import "./ESGIYearlyPerformanceNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./IESGINFT.sol";

/**
 * @title NFTFactory
 * @dev Contrat pour créer et gérer des NFTs de certificats et performances académiques.
 */
contract NFTFactory is IERC721Receiver, Ownable, IESGINFT {
    ESGICertificate private immutable ESGICertificateContract;
    ESGIYearlyPerformanceNFT private immutable ESGIYearlyContract;

    // Événements pour suivre la gestion des NFTs
    event CertificateCreated(address indexed owner, uint256 tokenId);
    event PerformanceCreated(address indexed owner, uint256 tokenId);
    event CertificateUpdated(uint256 tokenId, string newIpfsCID);
    event PerformanceUpdated(uint256 tokenId, string newIpfsCID);

    /**
     * @notice Initialise le contrat avec les adresses des contrats de certificats et performances académiques.
     * @param _esgiCertificate Adresse du contrat ESGICertificate.
     * @param _esgiYearly Adresse du contrat ESGIYearlyPerformanceNFT.
     */
    constructor(
        address _esgiCertificate,
        address _esgiYearly
    ) Ownable(msg.sender) {
        ESGICertificateContract = ESGICertificate(_esgiCertificate);
        ESGIYearlyContract = ESGIYearlyPerformanceNFT(_esgiYearly);
    }

    /**
     * @notice Crée un nouveau certificat académique en NFT.
     * @param _studentId Identifiant unique de l'étudiant.
     * @param _tokenURI CID IPFS des métadonnées associées.
     * @param _years Années couvertes par le certificat.
     * @return tokenId Identifiant unique du NFT créé.
     */
    function createCertificate(
        string memory _studentId,
        string memory _tokenURI,
        string memory _years
    ) public returns (uint256) {
        uint256 tokenId = ESGICertificateContract.createCertificate(
            _studentId,
            _tokenURI,
            _years
        );
        emit CertificateCreated(msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @notice Crée un NFT de performance académique.
     * @param _studentId Identifiant unique de l'étudiant.
     * @param _tokenURI CID IPFS des métadonnées associées.
     * @param _years Année académique concernée.
     * @return tokenId Identifiant unique du NFT créé.
     */
    function createPerformance(
        string memory _studentId,
        string memory _tokenURI,
        string memory _years
    ) public returns (uint256) {
        uint256 tokenId = ESGIYearlyContract.createPerformance(
            _studentId,
            _tokenURI,
            _years
        );
        emit PerformanceCreated(msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @notice Met à jour les métadonnées d'un certificat existant.
     * @param _tokenId Identifiant unique du certificat.
     * @param _newIpfsCID Nouveau CID IPFS des métadonnées mises à jour.
     */
    function updateCertificate(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        ESGICertificateContract.updateCertificate(_tokenId, _newIpfsCID);
        emit CertificateUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @notice Met à jour les métadonnées d'une performance académique existante.
     * @param _tokenId Identifiant unique de la performance.
     * @param _newIpfsCID Nouveau CID IPFS des métadonnées mises à jour.
     */
    function updatePerformance(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        ESGIYearlyContract.updatePerformance(_tokenId, _newIpfsCID);
        emit PerformanceUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @notice Récupère le nombre total de certificats créés.
     * @return Nombre total de certificats.
     */
    function getCertificatesCount() public view returns (uint256) {
        return ESGICertificateContract.tokenCounter();
    }

    /**
     * @notice Récupère les informations d'un certificat spécifique.
     * @param _tokenId Identifiant unique du certificat.
     * @return Structure NFTInfo contenant les détails du certificat.
     */
    function getCertInfos(
        uint256 _tokenId
    ) public view returns (NFTInfo memory) {
        return ESGICertificateContract.getNFTInfos(_tokenId);
    }

    /**
     * @notice Récupère la liste complète des certificats créés.
     * @return Tableau contenant toutes les structures NFTInfo des certificats.
     */
    function getAllCertificates() public view returns (NFTInfo[] memory) {
        return ESGICertificateContract.getAllNFTs();
    }

    /**
     * @notice Récupère le nombre total de performances académiques créées.
     * @return Nombre total de performances académiques.
     */
    function getPerformancesCount() public view returns (uint256) {
        return ESGIYearlyContract.tokenCounter();
    }

    /**
     * @notice Récupère les informations d'une performance académique spécifique.
     * @param _tokenId Identifiant unique de la performance.
     * @return Structure NFTInfo contenant les détails de la performance.
     */
    function getPerformanceInfos(
        uint256 _tokenId
    ) public view returns (NFTInfo memory) {
        return ESGIYearlyContract.getNFTInfos(_tokenId);
    }

    /**
     * @notice Récupère la liste complète des performances académiques.
     * @return Tableau contenant toutes les structures NFTInfo des performances académiques.
     */
    function getAllPerformances() public view returns (NFTInfo[] memory) {
        return ESGIYearlyContract.getAllNFTs();
    }

    /**
     * @notice Récupère le CID IPFS des métadonnées d'un certificat.
     * @param _tokenId Identifiant unique du certificat.
     * @return CID IPFS des métadonnées.
     */
    function getCertificateMetadata(
        uint256 _tokenId
    ) public view returns (string memory) {
        return ESGICertificateContract.tokenURI(_tokenId);
    }

    /**
     * @notice Récupère le CID IPFS des métadonnées d'une performance académique.
     * @param _tokenId Identifiant unique de la performance.
     * @return CID IPFS des métadonnées.
     */
    function getPerformanceMetadata(
        uint256 _tokenId
    ) public view returns (string memory) {
        return ESGIYearlyContract.tokenURI(_tokenId);
    }

    /**
     * @notice Récupère la liste complète des NFT créés (certificats et performances).
     * @return Tableau contenant toutes les structures NFTInfo des NFT.
     */
    function getAllNFTs() external view returns (NFTInfo[] memory) {
        uint256 totalCertificates = ESGICertificateContract.tokenCounter();
        uint256 totalPerformances = ESGIYearlyContract.tokenCounter();
        uint256 totalNFTs = totalCertificates + totalPerformances;

        NFTInfo[] memory allNFTs = new NFTInfo[](totalNFTs);

        for (uint256 i = 0; i < totalCertificates; i++) {
            allNFTs[i] = ESGICertificateContract.getNFTInfos(i);
        }
        for (uint256 j = 0; j < totalPerformances; j++) {
            allNFTs[totalCertificates + j] = ESGIYearlyContract.getNFTInfos(j);
        }

        return allNFTs;
    }

    /**
     * @notice Récupère les informations d'un NFT (certificat ou performance) en fonction de son ID.
     * @param _tokenId Identifiant unique du NFT.
     * @return Structure NFTInfo contenant les détails du NFT.
     */
    function getNFTInfos(
        uint256 _tokenId
    ) external view returns (NFTInfo memory) {
        if (_tokenId < ESGICertificateContract.tokenCounter()) {
            return ESGICertificateContract.getNFTInfos(_tokenId);
        } else {
            return ESGIYearlyContract.getNFTInfos(_tokenId);
        }
    }

    /**
     * @notice Fonction appelée lors de la réception d'un NFT ERC721.
     * @return Sélecteur de la fonction `onERC721Received`.
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}

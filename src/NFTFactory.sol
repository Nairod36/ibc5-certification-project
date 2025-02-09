// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ESGICertificate.sol";
import "./ESGIYearlyPerformanceNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title NFTFactory
 * @dev Contrat pour créer et gérer des NFTs à partir des contrats ERC721 existants.
 */
contract NFTFactory is IERC721Receiver, Ownable {

    ESGICertificate private immutable ESGICertificateContract;
    ESGIYearlyPerformanceNFT private immutable ESGIYearlyContract;

    // Événements pour signaler la création et la mise à jour de NFTs
    event CertificateCreated(address indexed owner, uint256 tokenId);
    event PerformanceCreated(address indexed owner, uint256 tokenId);
    event CertificateUpdated(uint256 tokenId, string newIpfsCID);
    event PerformanceUpdated(uint256 tokenId, string newIpfsCID);

    constructor(address _esgiCertificate, address _esgiYearly) Ownable(msg.sender) {
        ESGICertificateContract = ESGICertificate(_esgiCertificate);
        ESGIYearlyContract = ESGIYearlyPerformanceNFT(_esgiYearly);
    }

    /**
     * @dev Crée un nouveau certificat NFT en appelant le contrat ERC721 existant.
     * @return tokenId L'identifiant du NFT créé.
     */
    function createCertificate(string memory _studentId, string memory _tokenURI) public returns (uint256) {
        uint256 tokenId = ESGICertificateContract.createCertificate(_studentId, _tokenURI);
        emit CertificateCreated(msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Crée un NFT de performance académique en appelant le contrat ERC721 existant.
     * @return tokenId L'identifiant du NFT créé.
     */
    function createPerformance(string memory _studentId, string memory _tokenURI) public returns (uint256) {
        uint256 tokenId = ESGIYearlyContract.createPerformance(_studentId, _tokenURI);
        emit PerformanceCreated(msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Met à jour les métadonnées d'un certificat.
     */
    function updateCertificate(uint256 _tokenId, string memory _newIpfsCID) public onlyOwner {
        ESGICertificateContract.updateCertificate(_tokenId, _newIpfsCID);
        emit CertificateUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @dev Met à jour les métadonnées d'une performance académique.
     */
    function updatePerformance(uint256 _tokenId, string memory _newIpfsCID) public onlyOwner {
        ESGIYearlyContract.updatePerformance(_tokenId, _newIpfsCID);
        emit PerformanceUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @dev Récupère la liste des certificats créés.
     */
    function getCertificates() public view returns (uint256) {
        return ESGICertificateContract.tokenCounter();
    }

    /**
     * @dev Récupère la liste des performances académiques créées.
     */
    function getPerformances() public view returns (uint256) {
        return ESGIYearlyContract.tokenCounter();
    }

    /**
     * @dev Récupère les métadonnées d'un certificat.
     */
    function getCertificateMetadata(uint256 _tokenId) public view returns (string memory) {
        return ESGICertificateContract.tokenURI(_tokenId);
    }

    /**
     * @dev Récupère les métadonnées d'une performance académique.
     */
    function getPerformanceMetadata(uint256 _tokenId) public view returns (string memory) {
        return ESGIYearlyContract.tokenURI(_tokenId);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}

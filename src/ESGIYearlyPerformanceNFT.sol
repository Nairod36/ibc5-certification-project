// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IESGINFT.sol";

/**
 * @title ESGIYearlyPerformanceNFT
 * @dev Contrat NFT représentant la performance académique annuelle d'un étudiant.
 */
contract ESGIYearlyPerformanceNFT is ERC721URIStorage, Ownable, IESGINFT {
    /// @notice Mapping des performances académiques par Token ID
    mapping(uint256 => NFTInfo) private performances;

    /// @notice Compteur de tokens pour générer des IDs uniques
    uint256 public tokenCounter;

    /**
     * @notice Initialise le contrat et définit le propriétaire
     */
    constructor()
        ERC721("ESGIYearlyPerformanceNFT", "ESGIPERF")
        Ownable(msg.sender)
    {
        tokenCounter = 0;
    }

    /// @notice Événement émis lorsqu'une performance académique est créée
    /// @param tokenId Identifiant unique du NFT de performance
    /// @param studentId Identifiant de l'étudiant associé à la performance
    event PerformanceCreated(uint256 tokenId, string studentId);

    /// @notice Événement émis lorsqu'une performance académique est mise à jour
    /// @param tokenId Identifiant unique du NFT mis à jour
    /// @param newIpfsCID Nouveau CID IPFS des métadonnées
    event PerformanceUpdated(uint256 tokenId, string newIpfsCID);

    /// @notice Événement émis lorsqu'une performance académique est révoquée
    /// @param tokenId Identifiant unique du NFT révoqué
    event PerformanceRevoked(uint256 tokenId);

    /**
     * @notice Crée un NFT représentant la performance académique annuelle d'un étudiant
     * @dev Le NFT est enregistré sous forme de jeton ERC-721 et ses métadonnées sont stockées sur IPFS
     * @param _studentId Identifiant unique de l'étudiant
     * @param _ipfsCID CID IPFS des métadonnées de la performance
     * @param _year Année académique concernée
     * @return tokenId Identifiant du NFT créé
     */
    function createPerformance(
        string memory _studentId,
        string memory _ipfsCID,
        string memory _year
    ) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _ipfsCID);
        performances[newTokenId] = NFTInfo({
            tokenId: newTokenId,
            studentId: _studentId,
            ipfsCID: _ipfsCID,
            year: _year
        });
        tokenCounter++;
        emit PerformanceCreated(newTokenId, _studentId);
        return newTokenId;
    }

    /**
     * @notice Met à jour les métadonnées d'un NFT de performance académique
     * @dev Seul le propriétaire du contrat peut exécuter cette fonction
     * @param _tokenId Identifiant du NFT à mettre à jour
     * @param _newIpfsCID Nouveau CID IPFS des métadonnées mises à jour
     */
    function updatePerformance(
        uint256 _tokenId,
        string memory _newIpfsCID
    ) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        _setTokenURI(_tokenId, _newIpfsCID);
        performances[_tokenId].ipfsCID = _newIpfsCID;
        emit PerformanceUpdated(_tokenId, _newIpfsCID);
    }

    /**
     * @notice Révoque une performance académique
     * @dev La révocation n'efface pas le NFT, mais le désactive sur l'application
     * @param _tokenId Identifiant du NFT à révoquer
     */
    function revokePerformance(uint256 _tokenId) public onlyOwner {
        require(_ownerOf(_tokenId) != address(0), "Token ID n'existe pas");
        emit PerformanceRevoked(_tokenId);
    }

    /**
     * @notice Récupère les informations d'une performance académique spécifique
     * @param _tokenId Identifiant du NFT à récupérer
     * @return Structure NFTInfo contenant les détails de la performance
     */
    function getNFTInfos(
        uint256 _tokenId
    ) external view returns (NFTInfo memory) {
        return performances[_tokenId];
    }

    /**
     * @notice Récupère la liste de toutes les performances académiques enregistrées
     * @return Tableau contenant toutes les structures NFTInfo des performances
     */
    function getAllNFTs() external view returns (NFTInfo[] memory) {
        NFTInfo[] memory allPerf = new NFTInfo[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            allPerf[i] = performances[i];
        }
        return allPerf;
    }
}

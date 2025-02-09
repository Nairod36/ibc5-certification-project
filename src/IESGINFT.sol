// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title IESGINFT
 * @dev Interface standard pour les contrats NFT ESGI, définissant les structures et fonctions essentielles.
 */
interface IESGINFT {
    /**
     * @notice Structure représentant un NFT académique.
     * @dev Stocke les informations principales liées à un certificat ou une performance académique.
     * @param tokenId Identifiant unique du NFT.
     * @param studentId Identifiant unique de l'étudiant.
     * @param ipfsCID CID IPFS des métadonnées associées au NFT.
     * @param year Année académique concernée par le NFT.
     */
    struct NFTInfo {
        uint256 tokenId;
        string studentId;
        string ipfsCID;
        string year;
    }

    /**
     * @notice Récupère les informations d'un NFT spécifique.
     * @dev Fonction permettant d'obtenir les détails d'un certificat ou d'une performance académique.
     * @param _tokenId Identifiant unique du NFT à récupérer.
     * @return Structure NFTInfo contenant les détails du NFT.
     */
    function getNFTInfos(
        uint256 _tokenId
    ) external view returns (NFTInfo memory);

    /**
     * @notice Récupère la liste de tous les NFTs existants dans le contrat.
     * @dev Fonction utile pour obtenir une vue d'ensemble des certificats ou performances académiques enregistrés.
     * @return Tableau contenant toutes les structures NFTInfo des NFTs existants.
     */
    function getAllNFTs() external view returns (NFTInfo[] memory);
}

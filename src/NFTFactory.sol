// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./ESGICertificate.sol";
import "./ESGIYearlyPerformanceNFT.sol";

/**
 * @title NFTFactory
 * @dev Contrat pour déployer des contrats ESGICertificate et ESGIYearlyPerformanceNFT.
 */
contract NFTFactory {
    // Tableaux pour stocker les adresses des contrats déployés
    address[] public deployedCertificates;
    address[] public deployedPerformances;

    // Événements pour signaler le déploiement de nouveaux contrats
    event CertificateDeployed(address indexed certificateAddress);
    event PerformanceDeployed(address indexed performanceAddress);

    /**
     * @dev Déploie un nouveau contrat ESGICertificate.
     * @return address L'adresse du contrat déployé.
     */
    function deployCertificate() public returns (address) {
        ESGICertificate newCertificate = new ESGICertificate();
        deployedCertificates.push(address(newCertificate));
        emit CertificateDeployed(address(newCertificate));
        return address(newCertificate);
    }

    /**
     * @dev Déploie un nouveau contrat ESGIYearlyPerformanceNFT.
     * @return address L'adresse du contrat déployé.
     */
    function deployPerformance() public returns (address) {
        ESGIYearlyPerformanceNFT newPerformance = new ESGIYearlyPerformanceNFT();
        deployedPerformances.push(address(newPerformance));
        emit PerformanceDeployed(address(newPerformance));
        return address(newPerformance);
    }

    /**
     * @dev Récupère la liste des contrats ESGICertificate déployés.
     * @return address[] Liste des adresses des contrats déployés.
     */
    function getDeployedCertificates() public view returns (address[] memory) {
        return deployedCertificates;
    }

    /**
     * @dev Récupère la liste des contrats ESGIYearlyPerformanceNFT déployés.
     * @return address[] Liste des adresses des contrats déployés.
     */
    function getDeployedPerformances() public view returns (address[] memory) {
        return deployedPerformances;
    }
}

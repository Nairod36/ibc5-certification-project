// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/ESGICertificate.sol";
import "../src/ESGIYearlyPerformanceNFT.sol";
import "../src/NFTFactory.sol";

contract Deploy is Script {
    function run() external {
        // Charge la cle privee du proprietaire (assurez-vous d'avoir defini PRIVATE_KEY dans l'env)
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Demarre la transmission des transactions avec la cle privee
        vm.startBroadcast(deployerPrivateKey);

        // Deploiement des contrats ERC721
        ESGICertificate certificateNFT = new ESGICertificate();
        ESGIYearlyPerformanceNFT performanceNFT = new ESGIYearlyPerformanceNFT();

        console.log("ESGICertificate deploye a:", address(certificateNFT));
        console.log("ESGIYearlyPerformanceNFT deploye a:", address(performanceNFT));

        // Deploiement de la Factory avec les adresses des ERC721
        NFTFactory factory = new NFTFactory(address(certificateNFT), address(performanceNFT));

        console.log("NFTFactory deploye a:", address(factory));

        // Transfert d'ownership des ERC721 vers la Factory
        certificateNFT.transferOwnership(address(factory));
        performanceNFT.transferOwnership(address(factory));

        console.log("Ownership des ERC721 transfere a la Factory");

        // Fin de la transmission des transactions
        vm.stopBroadcast();
    }
}
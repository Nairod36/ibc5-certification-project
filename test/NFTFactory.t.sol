// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/NFTFactory.sol";
import "../src/ESGICertificate.sol";
import "../src/ESGIYearlyPerformanceNFT.sol";

contract NFTFactoryTest is Test {
    NFTFactory public factory;
    ESGICertificate public certificateContract;
    ESGIYearlyPerformanceNFT public performanceContract;
    address public deployer;
    
    function setUp() public {
        deployer = address(0x123);
        vm.startPrank(deployer);
        certificateContract = new ESGICertificate();
        performanceContract = new ESGIYearlyPerformanceNFT();
        factory = new NFTFactory(address(certificateContract), address(performanceContract));
        certificateContract.transferOwnership(address(factory));
        performanceContract.transferOwnership(address(factory));
    }

    function testFactoryCreateCertificate() public {
        string memory studentId = "12345";
        string memory tokenURI = "Qm123...";
        uint256 tokenId = factory.createCertificate(studentId, tokenURI);

        assertEq(tokenId, 0);
        assertEq(certificateContract.tokenCounter(), 1);
        assertEq(certificateContract.ownerOf(tokenId), address(factory));
        console.log("Certificate NFT created with tokenId:", tokenId);
    }

    function testFactoryCreatePerformance() public {
        string memory studentId = "12345";
        string memory tokenURI = "Qm123...";
        uint256 tokenId = factory.createPerformance(studentId, tokenURI);

        assertEq(tokenId, 0);
        assertEq(performanceContract.tokenCounter(), 1);
        assertEq(performanceContract.ownerOf(tokenId), address(factory));
        console.log("Performance NFT created with tokenId:", tokenId);
    }

    function testFactoryMultipleNFTCreations() public {
        string memory studentId1 = "12345";
        string memory studentId2 = "67890";
        string memory tokenURI1 = "Qm123...";
        string memory tokenURI2 = "Qm456...";

        uint256 cert1 = factory.createCertificate(studentId1, tokenURI1);
        uint256 cert2 = factory.createCertificate(studentId2, tokenURI2);
        uint256 perf1 = factory.createPerformance(studentId1, tokenURI1);

        assertEq(cert1, 0);
        assertEq(cert2, 1);
        assertEq(perf1, 0);
        assertEq(certificateContract.tokenCounter(), 2);
        assertEq(performanceContract.tokenCounter(), 1);
    }
}

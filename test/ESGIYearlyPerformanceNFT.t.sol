// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/ESGIYearlyPerformanceNFT.sol";

contract ESGIYearlyPerformanceNFTTest is Test {
    ESGIYearlyPerformanceNFT nft;
    address owner = address(0x1);
    address student = address(0x2);

    function setUp() public {
        nft = new ESGIYearlyPerformanceNFT();
        nft.transferOwnership(owner);
    }

    function testMinting() public {
        vm.prank(owner);
        uint256 tokenId = nft.createPerformance(
            "ESGI-0001",
            "3rd Year",
            "ipfs://Qm3rdYearMetadataIpfsCid",
            "Excellent performance"
        );
        assertEq(nft.ownerOf(tokenId), owner);
        assertEq(nft.performances(tokenId).studentId, "ESGI-0001");
    }

    function testUpdating() public {
        vm.prank(owner);
        uint256 tokenId = nft.createPerformance(
            "ESGI-0001",
            "3rd Year",
            "ipfs://Qm3rdYearMetadataIpfsCid",
            "Excellent performance"
        );
        vm.prank(owner);
        nft.updatePerformance(
            tokenId,
            "ipfs://NewCid",
            "UPDATED",
            "Updated comments"
        );
        assertEq(nft.performances(tokenId).ipfsCID, "ipfs://NewCid");
        assertEq(nft.performances(tokenId).status, "UPDATED");
    }

    function testRevoking() public {
        vm.prank(owner);
        uint256 tokenId = nft.createPerformance(
            "ESGI-0001",
            "3rd Year",
            "ipfs://Qm3rdYearMetadataIpfsCid",
            "Excellent performance"
        );
        vm.prank(owner);
        nft.revokePerformance(tokenId);
        assertEq(nft.performances(tokenId).status, "REVOKED");
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/ESGIYearlyPerformanceNFT.sol";

contract ESGIYearlyPerformanceNFTTest is Test {
    ESGIYearlyPerformanceNFT public performanceContract;
    address public owner;
    address public nonOwner;
    
    function setUp() public {
        owner = address(0x01);
        nonOwner = address(0xdead);
        performanceContract = new ESGIYearlyPerformanceNFT();
        performanceContract.transferOwnership(owner);
    }

    function testCreatePerformance() public {
        string memory studentId = "12345";
        string memory ipfsCID = "Qm123...";
        string memory year = "2022 - 2025";

        vm.prank(owner);
        uint256 tokenId = performanceContract.createPerformance(studentId, ipfsCID, year);

        assertEq(tokenId, 0);
        assertEq(performanceContract.tokenCounter(), 1);
        assertEq(performanceContract.ownerOf(tokenId), owner);
    }

    function testFailCreatePerformanceNonOwner() public {
        string memory year = "2022 - 2025";
        vm.prank(nonOwner);
        performanceContract.createPerformance("12345", "Qm123...", year);
    }

    function testUpdatePerformance() public {
        string memory ipfsCID = "Qm123...";
        string memory newIpfsCID = "Qm456...";
        string memory year = "2022 - 2025";

        vm.startPrank(owner);
        uint256 tokenId = performanceContract.createPerformance("12345", ipfsCID, year);
        performanceContract.updatePerformance(tokenId, newIpfsCID);
    }

    function testFailUpdatePerformanceNonOwner() public {
        string memory ipfsCID = "Qm123...";
        string memory year = "2022 - 2025";
        vm.prank(owner);
        uint256 tokenId = performanceContract.createPerformance("12345", ipfsCID, year);

        vm.prank(nonOwner);
        performanceContract.updatePerformance(tokenId, "Qm456...");
    }

    function testRevokePerformance() public {     
        string memory year = "2022 - 2025";   
        vm.startPrank(owner);
        uint256 tokenId = performanceContract.createPerformance("12345", "Qm123...", year);
        performanceContract.revokePerformance(tokenId);
    }

    function testFailRevokePerformanceNonOwner() public {
        string memory year = "2022 - 2025";
        vm.prank(owner);
        uint256 tokenId = performanceContract.createPerformance("12345", "Qm123...", year);
        vm.prank(nonOwner);
        performanceContract.revokePerformance(tokenId);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/ESGICertificate.sol";

contract ESGICertificateTest is Test {
    ESGICertificate public certificateContract;
    address public owner;
    address public nonOwner;
    
    function setUp() public {
        owner = address(0x01);
        nonOwner = address(0xdead);
        certificateContract = new ESGICertificate();
        certificateContract.transferOwnership(owner);
    }

    function testCreateCertificate() public {
        string memory studentId = "12345";
        string memory ipfsCID = "Qm123...";
        string memory year = "2022 - 2025";

        vm.prank(owner);
        uint256 tokenId = certificateContract.createCertificate(studentId, ipfsCID, year);

        assertEq(tokenId, 0);
        assertEq(certificateContract.tokenCounter(), 1);
        assertEq(certificateContract.ownerOf(tokenId), owner);
    }

    function testFailCreateCertificateNonOwner() public {
        vm.prank(nonOwner);
        certificateContract.createCertificate("12345", "Qm123...", "2022 - 2025");
    }

    function testUpdateCertificate() public {
        string memory ipfsCID = "Qm123...";
        string memory newIpfsCID = "Qm456...";
        string memory year = "2022 - 2025";

        vm.startPrank(owner);
        uint256 tokenId = certificateContract.createCertificate("12345", ipfsCID, year);
        certificateContract.updateCertificate(tokenId, newIpfsCID);
    }

    function testFailUpdateCertificateNonOwner() public {
        string memory ipfsCID = "Qm123...";
        string memory year = "2022 - 2025";
        vm.prank(owner);
        uint256 tokenId = certificateContract.createCertificate("12345", ipfsCID, year);

        vm.prank(nonOwner);
        certificateContract.updateCertificate(tokenId, "Qm456...");
    }

    function testRevokeCertificate() public {
        vm.startPrank(owner);
        uint256 tokenId = certificateContract.createCertificate("12345", "Qm123...", "2022 - 2025");
        certificateContract.revokeCertificate(tokenId);
    }

    function testFailRevokeCertificateNonOwner() public {
        vm.prank(owner);
        uint256 tokenId = certificateContract.createCertificate("12345", "Qm123...", "2022 - 2025");
        vm.prank(nonOwner);
        certificateContract.revokeCertificate(tokenId);
    }
}

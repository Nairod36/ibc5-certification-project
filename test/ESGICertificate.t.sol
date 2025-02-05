// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/ESGICertificate.sol";

contract ESGICertificateTest is Test {
    ESGICertificate certificate;
    address owner = address(0x1);
    address student = address(0x2);

    function setUp() public {
        certificate = new ESGICertificate();
        certificate.transferOwnership(owner);
    }

    function testMinting() public {
        vm.prank(owner);
        uint256 tokenId = certificate.createCertificate(
            "ESGI-0001",
            "Master - Ingenierie de la Blockchain",
            "2022 - 2025",
            "ipfs://QmProgramMetadataIpfsCid",
            "Final year in progress"
        );
        assertEq(certificate.ownerOf(tokenId), owner);
        assertEq(certificate.certificates(tokenId).studentId, "ESGI-0001");
    }

    function testUpdating() public {
        vm.prank(owner);
        uint256 tokenId = certificate.createCertificate(
            "ESGI-0001",
            "Master - Ingenierie de la Blockchain",
            "2022 - 2025",
            "ipfs://QmProgramMetadataIpfsCid",
            "Final year in progress"
        );
        vm.prank(owner);
        certificate.updateCertificate(
            tokenId,
            "ipfs://NewCid",
            "SUCCESS",
            "Degree Completed with Success"
        );
        assertEq(certificate.certificates(tokenId).ipfsCID, "ipfs://NewCid");
        assertEq(certificate.certificates(tokenId).programStatus, "SUCCESS");
    }

    function testRevoking() public {
        vm.prank(owner);
        uint256 tokenId = certificate.createCertificate(
            "ESGI-0001",
            "Master - Ingenierie de la Blockchain",
            "2022 - 2025",
            "ipfs://QmProgramMetadataIpfsCid",
            "Final year in progress"
        );
        vm.prank(owner);
        certificate.revokeCertificate(tokenId);
        assertEq(certificate.certificates(tokenId).programStatus, "REVOKED");
    }
}

// // src/services/blockchainService.js
// import { ethers } from 'ethers';

// // Récupérer les variables d'environnement
// const rpcUrl = process.env.REACT_APP_RPC_URL;
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS_PROGRAM;
// // Remplacez par le chemin vers votre ABI compilée
// import contractABI from '../abis/MyProgramNFT.json';

// // Initialiser le provider et le contrat
// const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
// // Pour des actions écrites, il faudra utiliser un signer (par exemple via Metamask)
// // const signer = provider.getSigner();
// const contract = new ethers.Contract(contractAddress, contractABI, provider);

// export async function createNFT(studentId, program) {
//   // Exemple d'appel : il faut connecter le signer pour envoyer une transaction
//   // const contractWithSigner = contract.connect(signer);
//   // const tx = await contractWithSigner.createNFT(studentId, program);
//   // return tx.wait();
//   return Promise.resolve(`NFT créé pour ${studentId} - ${program}`); // Simulation
// }

// export async function updateNFT(tokenId, newData) {
//   return Promise.resolve(`NFT ${tokenId} mis à jour avec ${newData}`);
// }

// export async function revokeNFT(tokenId) {
//   return Promise.resolve(`NFT ${tokenId} révoqué`);
// }

// export async function fetchNFTDetails(tokenId) {
//   // Exemple : vous récupérez des informations depuis le contrat
//   // const details = await contract.getNFTDetails(tokenId);
//   // return details;
//   return Promise.resolve({
//     studentId: "ESGI-0001",
//     program: "Master - Ingénierie de la Blockchain",
//     status: "ACTIVE",
//     ipfsCID: "ipfs://QmExampleCID"
//   });
// }

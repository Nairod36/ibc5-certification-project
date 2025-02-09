import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import NFTFactoryABIFile from "../abis/NFTFactory.json";
const NFTFactoryABI = NFTFactoryABIFile.abi || NFTFactoryABIFile;

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const contracts = {
  NFTFactory: {
    abi: NFTFactoryABI,
    address: "0x41935574Eb7FA2866729c518b7a5Bafffad0a370",
  },
};

import { createConfig, http } from "wagmi";
import { mainnet, sepolia, avalancheFuji } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import NFTFactoryABIFile from "../abis/NFTFactory.json";

const NFTFactoryABI = NFTFactoryABIFile.abi || NFTFactoryABIFile;

// Définir la chaîne Avalanche Subnet Local
const avalancheSubnetLocal = {
  id: 43112,
  name: "Avalanche Subnet Local",
  network: "avalanche-subnet-local",
  nativeCurrency: {
    decimals: 18,
    name: "AVAX",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: {
      http: [
        "http://127.0.0.1:57908/ext/bc/2YaN2MjEEFLC8sJ83dYGveuckXFsfHY6BGLHw3KnrUd9GyDa2F/rpc",
      ],
    },
  },
};

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, sepolia, avalancheFuji, avalancheSubnetLocal],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [avalancheFuji.id]: http(),
      [avalancheSubnetLocal.id]: http(),
    },
    appName: "Mon DApp",
  })
);

export const contracts = {
  NFTFactory: {
    abi: NFTFactoryABI,
    address: "0x711d3ACf4087e5A1CD549C3E136b831aDea80735",
  },
};
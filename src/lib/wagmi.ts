import { mainnet, sepolia } from 'wagmi/chains';
import { createConfig } from 'wagmi';
import { metaMask, walletConnect, injected } from 'wagmi/connectors';
import { usePublicClient } from 'wagmi'


// Configure chains with providers
const chains = [mainnet, sepolia];



// Create Wagmi config
export const config = createConfig({
  autoConnect: true, // Automatically connect to the last used wallet
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      chains,

    }),
  ],
  publicClient,
  webSocketPublicClient,
});

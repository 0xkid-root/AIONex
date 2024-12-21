import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Routes } from '@/routes';
import { ToastProvider } from '@/components/ui/toast';
import { WalletProvider } from './contexts/WalletContext';
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "ac4a784c-06b7-449c-8125-37bd9c40ec4d",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <BrowserRouter>
              <WalletProvider>
                <ToastProvider>
                  <AuthProvider>
                    <Layout>
                      <Routes />
                    </Layout>
                  </AuthProvider>
                </ToastProvider>
              </WalletProvider>
            </BrowserRouter>
            <DynamicWidget />
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiConfig>
    </DynamicContextProvider>
  );
}
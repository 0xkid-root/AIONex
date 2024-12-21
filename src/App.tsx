import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Routes } from '@/routes';
import { ToastProvider } from '@/components/ui/toast';
import { WalletProvider } from './contexts/WalletContext';
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiConfig, useAccount, useBalance, useDisconnect, useChainId } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useNavigate } from 'react-router-dom';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();
function WalletProviderWrapper() {
  const navigate = useNavigate();
  const { primaryWallet, handleLogOut } = useDynamicContext();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address });

  const balance = balanceData ? balanceData.formatted : null;

  // Convert `undefined` to `null` for `address`
  const addressOrNull = address || null;

  return (
    <WalletProvider
      navigate={navigate}
      primaryWallet={primaryWallet}
      handleLogOut={handleLogOut}
      isConnected={isConnected}
      address={addressOrNull} // Pass `null` if `address` is `undefined`
      balance={balance}
      chainId={chainId}
      disconnect={disconnect}
    >
      <ToastProvider>
        <AuthProvider>
          <Layout>
            <Routes />
          </Layout>
        </AuthProvider>
      </ToastProvider>
    </WalletProvider>
  );
}

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
              <WalletProviderWrapper />
              <DynamicWidget />
            </BrowserRouter>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiConfig>
    </DynamicContextProvider>
  );
}
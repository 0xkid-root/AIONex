// import { WagmiConfig } from 'wagmi';
import { WagmiProvider } from 'wagmi'

import { config } from '@/lib/wagmi';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Routes } from '@/routes';
import { ToastProvider } from '@/components/ui/toast';

export default function App() {
  return (
    <WagmiProvider config={config}>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <Layout>
              <Routes />
            </Layout>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </WagmiProvider>
  );
}

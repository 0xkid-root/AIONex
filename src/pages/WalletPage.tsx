import React from 'react';
import { useAccount } from 'wagmi';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { WalletInfo } from '@/components/wallet/WalletInfo';
import { NetworkSwitcher } from '@/components/wallet/NetworkSwitcher';
import { TransactionHistory } from '@/components/wallet/TransactionHistory';

export function WalletPage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Connect Your Wallet</h1>
          <p className="mb-8 text-gray-600">
            Connect your wallet to access the AIONex platform
          </p>
          <WalletConnect />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wallet</h1>
        <NetworkSwitcher />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WalletInfo />
        <TransactionHistory />
      </div>
    </div>
  );
}

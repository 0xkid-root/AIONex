import React from 'react';
import { useConnect } from 'wagmi';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Loader2 } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';
import { injected, metaMask, coinbaseWallet } from '@wagmi/connectors';

export function WalletConnect() {
  const { connectAsync, status, connectors } = useConnect();
  const isLoading = status === 'pending'; // Changed from 'connecting' to 'pending'

  const handleConnect = async (connector: any) => {
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              variant="outline"
              disabled={!connector.ready}
              onClick={() => handleConnect(connector)}
            >
              {isLoading && connector.uid === connector.uid && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {connector.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
import React from 'react';
import { useAccount } from 'wagmi';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { formatAddress } from '@/lib/utils';

export function ConnectWallet() {
  const { address } = useAccount();
  const { isAuthenticated, login, logout, isLoading } = useAuth();

  const handleAuth = async () => {
    if (isAuthenticated) {
      await logout();
    } else {
      await login();
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoading}
      variant={isAuthenticated ? "outline" : "default"}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : isAuthenticated ? (
        formatAddress(address || '')
      ) : (
        'Connect Wallet'
      )}
    </Button>
  );
}
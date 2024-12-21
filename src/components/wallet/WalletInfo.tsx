import React from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExternalLink, Copy } from 'lucide-react';
import { formatAddress, getEtherscanLink } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { mainnet } from 'wagmi/chains';

export function WalletInfo() {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  const { toast } = useToast();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: 'Address copied',
        description: 'Wallet address copied to clipboard',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={copyAddress}
              >
                <Copy className="h-4 w-4 mr-2" />
                {address ? formatAddress(address) : 'Not connected'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => address && window.open(getEtherscanLink(address, 'address'), '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span>{balance?.formatted} {balance?.symbol}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
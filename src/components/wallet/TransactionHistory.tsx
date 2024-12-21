import React from 'react';
import { useWalletStore } from '../../store/walletStore';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatAddress, getEtherscanLink } from '../../lib/utils';
import { ArrowUpRight, ArrowDownRight, Code } from 'lucide-react';
import { format } from 'date-fns';

export function TransactionHistory() {
  const transactions = useWalletStore((state) => state.recentTransactions);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'receive':
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case 'contract':
        return <Code className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No transactions yet
            </p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.hash}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  {getTransactionIcon(tx.type)}
                  <div>
                    <a
                      href={getEtherscanLink(tx.hash, 'tx')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </a>
                    <div className="text-xs text-gray-500">
                      {tx.type === 'send' ? 'To: ' : 'From: '}
                      {formatAddress(tx.type === 'send' ? tx.to! : tx.from!)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {tx.value} ETH
                  </div>
                  <div className="text-xs text-gray-500">
                    {format(tx.timestamp, 'MMM d, yyyy HH:mm')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

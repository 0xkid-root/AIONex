import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/contexts/AuthContext';
import { getEtherscanLink, shortenTxHash } from '@/lib/utils';

interface TransactionState {
  isLoading: boolean;
  error: Error | null;
  txHash: string | null;
}

export function useWalletTransaction() {
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    error: null,
    txHash: null,
  });
  
  const { toast } = useToast();
  const { user } = useAuth();

  const handleTransaction = async (
    transactionFn: () => Promise<string>,
    options: {
      pendingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) => {
    const {
      pendingMessage = 'Transaction pending...',
      successMessage = 'Transaction successful!',
      errorMessage = 'Transaction failed',
    } = options;

    try {
      setState({ ...state, isLoading: true, error: null });
      
      toast({
        title: 'Pending',
        description: pendingMessage,
        variant: 'default',
      });

      const txHash = await transactionFn();
      setState({ isLoading: false, error: null, txHash });

      const etherscanLink = getEtherscanLink(txHash, 'tx');
      toast({
        title: 'Success',
        description: (
          <div>
            {successMessage}{' '}
            <a 
              href={etherscanLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Etherscan ({shortenTxHash(txHash)})
            </a>
          </div>
        ),
        variant: 'success',
      });

      return txHash;
    } catch (error: any) {
      setState({ isLoading: false, error, txHash: null });
      toast({
        title: 'Error',
        description: error.message || errorMessage,
        variant: 'destructive',
      });
      throw error;
    }
  };

  return {
    ...state,
    handleTransaction,
  };
}

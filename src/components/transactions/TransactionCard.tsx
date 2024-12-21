import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'purchase' | 'rent' | 'stake' | 'unstake';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  from: string;
  to: string;
  hash: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  onExport?: () => void;
}

export function TransactionCard({ transaction, onExport }: TransactionCardProps) {
  const isIncoming = transaction.to === '0x...'; // Replace with user's address

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {isIncoming ? (
            <div className="p-2 bg-green-100 rounded-full">
              <ArrowDownRight className="h-5 w-5 text-green-600" />
            </div>
          ) : (
            <div className="p-2 bg-red-100 rounded-full">
              <ArrowUpRight className="h-5 w-5 text-red-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold capitalize">{transaction.type}</h3>
            <p className="text-sm text-gray-500">
              {isIncoming ? 'From' : 'To'}: {formatAddress(isIncoming ? transaction.from : transaction.to)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">
            {isIncoming ? '+' : '-'}{transaction.amount} AION
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {transaction.status}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => window.open(`https://etherscan.io/tx/${transaction.hash}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          {onExport && (
            <Button size="sm" variant="outline" onClick={onExport}>
              Export
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 
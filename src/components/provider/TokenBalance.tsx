import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const transactions = [
  {
    type: 'received',
    amount: '+250 DEAI',
    from: 'Job Completion',
    time: '2h ago'
  },
  {
    type: 'sent',
    amount: '-100 DEAI',
    from: 'Withdrawal',
    time: '1d ago'
  }
];

export function TokenBalance() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Wallet className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold">Token Balance</h2>
        </div>
        <Button variant="outline" size="sm">Withdraw</Button>
      </div>

      <div className="text-3xl font-bold mb-6">
        1,234.56 DEAI
      </div>

      <div className="space-y-4">
        {transactions.map((tx, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              {tx.type === 'received' ? (
                <ArrowDownRight className="h-4 w-4 text-green-500 mr-2" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-red-500 mr-2" />
              )}
              <div>
                <div className="text-sm font-medium">{tx.from}</div>
                <div className="text-xs text-gray-500">{tx.time}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              tx.type === 'received' ? 'text-green-600' : 'text-red-600'
            }`}>
              {tx.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
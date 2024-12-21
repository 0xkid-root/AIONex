import { Link } from 'react-router-dom';
import { Network, Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { formatAddress } from '@/lib/utils';

export function TopNav() {
  const { user, connect, disconnect, isConnecting } = useWallet();

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Network className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">DeAI Network</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </motion.div>

            <Link to="/settings">
              <motion.div whileHover={{ rotate: 90 }}>
                <Settings className="h-6 w-6 text-gray-500" />
              </motion.div>
            </Link>

            {user ? (
              <Button
                variant="outline"
                onClick={disconnect}
              >
                {formatAddress(user.address)}
              </Button>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
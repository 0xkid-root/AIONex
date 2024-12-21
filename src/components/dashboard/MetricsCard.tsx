import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: number | string;
  trend: 'up' | 'down' | 'stable';
  icon?: LucideIcon;
}

export function MetricsCard({ title, value, change, trend, icon: Icon }: MetricsCardProps) {
  const changeValue = typeof change === 'number' ? `${change > 0 ? '+' : ''}${change}%` : change;
  
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && (
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
        )}
      </div>
      
      <div className="flex items-baseline">
        <motion.p 
          className="text-2xl font-semibold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {value}
        </motion.p>
        <div className="flex items-center ml-2">
          <TrendIcon className={`w-4 h-4 mr-1 ${
            trend === 'up' ? 'text-green-600' : 
            trend === 'down' ? 'text-red-600' : 
            'text-gray-500'
          }`} />
          <motion.p 
            className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {changeValue}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';

interface PriceData {
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface DynamicPricingWidgetProps {
  resourceId: string;
  onNotifyPrice?: (price: number) => void;
}

export function DynamicPricingWidget({ resourceId, onNotifyPrice }: DynamicPricingWidgetProps) {
  const [priceData, setPriceData] = useState<PriceData>({
    current: 100,
    previous: 95,
    change: 5.26,
    trend: 'up'
  });
  const [isNotifying, setIsNotifying] = useState(false);
  const { toast, success, error } = useToast();

  useEffect(() => {
    // Simulated price updates - replace with real-time data
    const interval = setInterval(() => {
      const random = Math.random();
      const change = (random - 0.5) * 10;
      const newPrice = priceData.current + change;
      
      setPriceData({
        current: newPrice,
        previous: priceData.current,
        change: (change / priceData.current) * 100,
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [priceData]);

  const handleNotifyPrice = () => {
    setIsNotifying(true);
    onNotifyPrice?.(priceData.current);
    toast({
      title: 'Price Alert Set',
      description: `You'll be notified when the price changes significantly.`,
    });
    setIsNotifying(false);
  };

  const handlePriceUpdate = async () => {
    try {
      // Price update logic
      success({
        title: 'Price Updated',
        description: 'The price has been updated successfully'
      });
    } catch (err) {
      error({
        title: 'Error',
        description: 'Failed to update price'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold">Current Price</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={handleNotifyPrice}
          disabled={isNotifying}
        >
          <Bell className="h-4 w-4 mr-2" />
          Set Alert
        </Button>
      </div>

      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={priceData.current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-4xl font-bold mb-2"
          >
            {priceData.current.toFixed(2)} AION
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2">
          {priceData.trend === 'up' ? (
            <TrendingUp className="h-5 w-5 text-green-600" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-600" />
          )}
          <span className={`text-sm font-medium ${
            priceData.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {priceData.change > 0 ? '+' : ''}{priceData.change.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-500 mb-2">Price History (24h)</div>
        {/* Add price chart here */}
      </div>
    </div>
  );
} 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStaking } from '@/hooks/useStaking';
import type { AIModel } from '@/types/models';

interface ModelStakingWidgetProps {
  model: AIModel;
}

export function ModelStakingWidget({ model }: ModelStakingWidgetProps) {
  const { stakeModel, unstakeModel, getStakingRewards } = useStaking();
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    try {
      setIsStaking(true);
      await stakeModel(model.id, parseFloat(stakeAmount));
    } catch (error) {
      console.error('Failed to stake model:', error);
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-bold">Staking</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Stake Your Model</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount (AION)</label>
              <Input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter stake amount"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleStake}
              disabled={isStaking || !stakeAmount}
            >
              {isStaking ? 'Staking...' : 'Stake Model'}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">APY</span>
            </div>
            <div className="text-2xl font-bold">12.5%</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span className="font-medium">Lock Period</span>
            </div>
            <div className="text-2xl font-bold">30 Days</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
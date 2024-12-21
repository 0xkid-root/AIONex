import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAI } from '@/contexts/AIContext';
import { AIModel } from '@/types/platform';
import { toast } from '@/components/ui/toast';
import { Model } from '@/types/models';

interface ModelStakingProps {
  model: Model;
}

export function ModelStaking({ model }: ModelStakingProps) {
  const { stakeModel } = useAI();
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStake = async () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid stake amount",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await stakeModel(model.id, stakeAmount);
      toast({
        title: "Staking Successful",
        description: `Successfully staked ${stakeAmount} AION tokens`,
        variant: "success",
      });
      setStakeAmount('');
    } catch (error: any) {
      toast({
        title: "Staking Failed",
        description: error.message || "Failed to stake tokens",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Stake Model</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Stake Amount</label>
          <Input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            placeholder="Enter amount to stake"
            min="0"
            step="0.01"
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Current Rewards</p>
            <p className="font-medium">{model.staking.rewards} AION</p>
          </div>
          <Button
            onClick={handleStake}
            disabled={loading || !stakeAmount || Number(stakeAmount) <= 0}
          >
            {loading ? 'Staking...' : 'Stake Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
} 
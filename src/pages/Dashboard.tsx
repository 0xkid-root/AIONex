import { useWallet } from '@/contexts/WalletContext';
import { ActiveJobs } from '@/components/dashboard/ActiveJobs';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { ResourceUsage } from '@/components/dashboard/ResourceUsage';
import { MetricsCard } from '@/components/dashboard/MetricsCard';
import { Cpu, HardDrive, Server, DollarSign } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockMetrics, mockChartData } from '@/mocks/data';
import type { ChartDataPoint } from '@/types/dashboard';

export function Dashboard() {
  const { user } = useWallet();

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        <p className="text-gray-600">
          Please connect your wallet to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <Tabs defaultValue="metrics">
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Active Models"
              value={mockMetrics.activeModels.toString()}
              change="10%"
              trend="up"
              icon={Server}
            />
            <MetricsCard
              title="Computing Power"
              value={`${mockMetrics.computingPower}%`}
              change="5%"
              trend="up"
              icon={Cpu}
            />
            <MetricsCard
              title="Storage Used"
              value={mockMetrics.storageUsed}
              change="8%"
              trend="down"
              icon={HardDrive}
            />
            <MetricsCard
              title="AION Balance"
              value={mockMetrics.balance}
              change="15%"
              trend="up"
              icon={DollarSign}
            />
          </div>
        </TabsContent>
        <TabsContent value="activity">
          <ActivityChart data={mockChartData} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceUsage />
        </TabsContent>
      </Tabs>

      <ActiveJobs />
    </div>
  );
}
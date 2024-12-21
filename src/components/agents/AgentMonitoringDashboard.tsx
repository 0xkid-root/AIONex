import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Memory, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { AIAgent } from '@/types/agents';

interface AgentMonitoringDashboardProps {
  agent: AIAgent;
}

interface MetricData {
  timestamp: number;
  cpu: number;
  memory: number;
  tasks: number;
}

export function AgentMonitoringDashboard({ agent }: AgentMonitoringDashboardProps) {
  const [metrics, setMetrics] = useState<MetricData[]>([]);

  useEffect(() => {
    // Simulated metrics - replace with real monitoring data
    const interval = setInterval(() => {
      const now = Date.now();
      const newMetric: MetricData = {
        timestamp: now,
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        tasks: Math.floor(Math.random() * 10)
      };
      setMetrics(prev => [...prev.slice(-20), newMetric]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Monitoring Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">CPU Usage</span>
          </div>
          <div className="text-2xl font-bold">
            {metrics[metrics.length - 1]?.cpu.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Memory className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">Memory Usage</span>
          </div>
          <div className="text-2xl font-bold">
            {metrics[metrics.length - 1]?.memory.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            <span className="font-medium">Active Tasks</span>
          </div>
          <div className="text-2xl font-bold">
            {metrics[metrics.length - 1]?.tasks}
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#4f46e5"
              name="CPU Usage"
            />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="#16a34a"
              name="Memory Usage"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 
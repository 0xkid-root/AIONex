import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Cpu, Memory, HardDrive, Activity } from 'lucide-react';
import { useResourceMetrics } from '@/hooks/useResourceMetrics';

export function ResourceMetrics() {
  const chartRef = useRef(null);
  const metrics = useResourceMetrics('provider-1');

  useEffect(() => {
    gsap.from(chartRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, []);

  return (
    <div ref={chartRef} className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Resource Utilization</h2>
        <div className="flex items-center text-sm text-green-600">
          <Activity className="h-4 w-4 mr-1" />
          Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResourceCard
          icon={Cpu}
          title="CPU Usage"
          value={metrics.cpuUsage}
          unit="%"
          color="blue"
        />
        <ResourceCard
          icon={Memory}
          title="Memory"
          value={metrics.memoryUsage}
          unit="%"
          color="purple"
        />
        <ResourceCard
          icon={Cpu}
          title="GPU Usage"
          value={metrics.gpuUsage}
          unit="%"
          color="green"
        />
        <ResourceCard
          icon={HardDrive}
          title="Storage"
          value={75}
          unit="%"
          color="orange"
        />
      </div>
    </div>
  );
}

interface ResourceCardProps {
  icon: any;
  title: string;
  value: number;
  unit: string;
  color: string;
}

function ResourceCard({ icon: Icon, title, value, unit, color }: ResourceCardProps) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg border p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-500">{title}</span>
      </div>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xl font-semibold">
              {value.toFixed(1)}{unit}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]}`}
          />
        </div>
      </div>
    </motion.div>
  );
}
import { motion } from 'framer-motion';
import { Cpu, Memory, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ComputingResource } from '@/types/computing';

interface ComputingPowerCardProps {
  resource: ComputingResource;
}

export function ComputingPowerCard({ resource }: ComputingPowerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold">{resource.name}</h3>
          <p className="text-sm text-gray-500">Provider ID: {resource.providerId}</p>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
          {resource.status}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Cpu className="h-4 w-4 text-gray-400" />
          <span>{resource.specs.cpu}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Memory className="h-4 w-4 text-gray-400" />
          <span>{resource.specs.memory} RAM</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <HardDrive className="h-4 w-4 text-gray-400" />
          <span>{resource.specs.storage} Storage</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500">Price:</span>
          <span className="ml-1 font-medium">{resource.pricePerHour} AION/hr</span>
        </div>
        <Button size="sm">Rent Now</Button>
      </div>
    </motion.div>
  );
} 
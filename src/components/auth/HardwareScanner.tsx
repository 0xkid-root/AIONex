import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Memory, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HardwareSpecs {
  cpu: string;
  gpu: string;
  memory: string;
  storage: string;
}

export function HardwareScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [specs, setSpecs] = useState<HardwareSpecs | null>(null);

  const scanHardware = async () => {
    setIsScanning(true);
    // Simulate hardware scanning
    setTimeout(() => {
      setSpecs({
        cpu: 'AMD Ryzen 9 5950X',
        gpu: 'NVIDIA RTX 3080',
        memory: '32GB DDR4',
        storage: '2TB NVMe SSD'
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {!specs ? (
        <Button
          onClick={scanHardware}
          disabled={isScanning}
          className="w-full"
        >
          {isScanning ? 'Scanning Hardware...' : 'Scan Hardware'}
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 text-sm">
            <Cpu className="h-4 w-4" />
            <span>CPU: {specs.cpu}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Cpu className="h-4 w-4" />
            <span>GPU: {specs.gpu}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Memory className="h-4 w-4" />
            <span>Memory: {specs.memory}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <HardDrive className="h-4 w-4" />
            <span>Storage: {specs.storage}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
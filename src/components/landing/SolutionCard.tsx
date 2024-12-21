import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface SolutionCardProps {
  title: string;
  description: string;
  demo: React.ReactNode;
}

export function SolutionCard({ title, description, demo }: SolutionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="solution-card"
    >
      <Card className="overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
        </div>
        {demo}
      </Card>
    </motion.div>
  );
} 
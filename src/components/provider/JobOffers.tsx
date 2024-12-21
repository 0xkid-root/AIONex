import { motion } from 'framer-motion';
import { Clock, DollarSign, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobOffers = [
  {
    id: '1',
    title: 'Large Language Model Training',
    requirements: {
      gpu: 'NVIDIA RTX 3080',
      memory: '32GB',
      duration: '24h'
    },
    price: '500',
    deadline: '2h'
  },
  // Add more job offers...
];

export function JobOffers() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Matching Job Offers</h2>
      <div className="space-y-4">
        {jobOffers.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{job.title}</h3>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Cpu className="h-4 w-4 mr-1" />
                  {job.requirements.gpu}
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                {job.price} DEAI
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Expires in {job.deadline}
              </div>
              <Button size="sm">Accept Job</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
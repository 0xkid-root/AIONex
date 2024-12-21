import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const jobs = [
  {
    id: '1',
    title: 'Image Classification Training',
    status: 'running',
    progress: 65,
    timeRemaining: '2h 30m'
  },
  {
    id: '2',
    title: 'NLP Model Fine-tuning',
    status: 'completed',
    progress: 100,
    timeRemaining: '0'
  },
  {
    id: '3',
    title: 'Data Preprocessing',
    status: 'failed',
    progress: 45,
    timeRemaining: '0'
  }
];

export function ActiveJobs() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Active Jobs</h3>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">{job.title}</h4>
              <StatusBadge status={job.status} />
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {job.progress}%
                  </span>
                </div>
                {job.status === 'running' && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="h-3 w-3 mr-1" />
                    {job.timeRemaining}
                  </div>
                )}
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    running: { color: 'bg-blue-100 text-blue-800', icon: Clock },
    completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
    failed: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <span className={`px-2 py-1 rounded-full text-xs flex items-center ${config.color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}